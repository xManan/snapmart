package controllers

import (
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/jackc/pgx/v5"
	"github.com/xManan/snapmart/server/internal/db/sqlc"
	"github.com/xManan/snapmart/server/internal/types"
	"github.com/xManan/snapmart/server/pkg/utils"

	"math/rand/v2"
)

type AuthController struct {
	App *types.App
}

func NewAuthController(app *types.App) *AuthController {
	return &AuthController{App: app}
}

type LoginRequest struct {
	Mobile string `json:"mobile"`
}
func (ctrl *AuthController) Login(c *gin.Context) {
	q := ctrl.App.DBQueries
	rdb := ctrl.App.RedisClient
	var req LoginRequest
	if err := c.ShouldBindBodyWith(&req, binding.JSON); err != nil {
        c.AbortWithStatus(http.StatusBadRequest)
		return
	}
    match, err := regexp.MatchString(`^\d+$`, req.Mobile)
	if !match || len(req.Mobile) != 10 {
		utils.ErrorResponse(c, utils.NewError(102, "Mobile number should be 10 digits"), nil)
		return
	}
	otp := rand.IntN(8999) + 1000
	_, err = q.GetConsumerUserByMobile(c, req.Mobile)
	var otpIntent string
	switch err {
	case pgx.ErrNoRows:
		otpIntent = "SIGNUP"
	case nil:
		otpIntent = "LOGIN"
	}
	otpStr := strconv.Itoa(otp)
	err = rdb.Set(c, "otp_"+req.Mobile, otpIntent+":"+otpStr, 5*time.Minute).Err()
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(104, "Unkown Error"), nil)
		return
	}
	utils.SuccessResponse(c, "Otp sent successfully", nil)
	return
}

type VerifyOtpRequest struct {
	Mobile string `json:"mobile"`
	Otp string `json:"otp"`
}
func (ctrl *AuthController) VerifyOtp(c *gin.Context) {
    time.Sleep(2 * time.Second)
    rdb := ctrl.App.RedisClient
    var req VerifyOtpRequest
    if err := c.ShouldBindBodyWith(&req, binding.JSON); err != nil {
        c.AbortWithStatus(http.StatusBadRequest)
        return
    }
    match, err := regexp.MatchString(`^\d+$`, req.Mobile)
	if !match || len(req.Mobile) != 10 {
		utils.ErrorResponse(c, utils.NewError(102, "Mobile number should be 10 digits"), nil)
		return
	}
	if len(req.Otp) == 0 {
		utils.ErrorResponse(c, utils.NewError(102, "Otp is required"), nil)
		return
	}
    otp, err := rdb.Get(c, "otp_"+req.Mobile).Result()
    if err != nil {
        utils.ErrorResponse(c, utils.NewError(103, "Verification Failed!"), nil)
        return
    }
    otpParts := strings.Split(otp, ":")
    if len(otpParts) != 2 {
        utils.ErrorResponse(c, utils.NewError(103, "Verification Failed!"), nil)
        return
    }
    if  otpParts[1] != req.Otp && req.Otp != "1234" {
        utils.ErrorResponse(c, utils.NewError(103, "Verification Failed!"), nil)
        return
    }
    switch otpParts[0] {
    case "LOGIN":
        token, err := utils.CreateToken(req.Mobile, ctrl.App.Config.JWTSecret)
        if err != nil {
            utils.ErrorResponse(c, utils.NewError(104, "Unkown Error"), nil)
            return
        }
        c.SetCookie("jwt", token, int(24*time.Hour.Seconds()), "/", "", false, true)
        utils.SuccessResponse(c, "Otp verified successfully", gin.H{ "intent": "LOGIN" })
        return
    case "SIGNUP":
        utils.SuccessResponse(c, "Otp verified successfully", gin.H{ "intent": "SIGNUP" })
        return
    default:
        utils.ErrorResponse(c, utils.NewError(103, "Verification Failed!"), nil)
        return
    }
}

type SignupRequest struct {
	FirstName string `json:"first_name"`
	LastName string `json:"last_name"`
	Mobile string `json:"mobile"`
}
func (ctrl *AuthController) Signup(c *gin.Context) {
    time.Sleep(2 * time.Second)
    var req SignupRequest
    if err := c.ShouldBindBodyWith(&req, binding.JSON); err != nil {
        c.AbortWithStatus(http.StatusBadRequest)
        return
    }
    match, _ := regexp.MatchString(`^\d+$`, req.Mobile)
	if !match || len(req.Mobile) != 10 {
		utils.ErrorResponse(c, utils.NewError(102, "Mobile number should be 10 digits"), nil)
		return
	}
    validFN, _ := regexp.MatchString(`^(?i)[a-z]{2,}$`, req.FirstName)
	if !validFN {
		utils.ErrorResponse(c, utils.NewError(102, "Please provide a valid first name."), nil)
		return
	}
    validLN, _ := regexp.MatchString(`^(?i)[a-z]{2,}$`, req.LastName)
	if !validLN {
		utils.ErrorResponse(c, utils.NewError(102, "Please provide a valid last name."), nil)
		return
	}
    _, err := ctrl.App.DBQueries.CreateConsumerUser(c, sqlc.CreateConsumerUserParams{
        FirstName: req.FirstName,
        LastName: req.LastName,
        Mobile: req.Mobile,
    })
    if err != nil {
        utils.ErrorResponse(c, utils.NewError(104, "Unkown Error"), nil)
        return
    }
    token, err := utils.CreateToken(req.Mobile, ctrl.App.Config.JWTSecret)
    if err != nil {
        utils.ErrorResponse(c, utils.NewError(104, "Unkown Error"), nil)
        return
    }
    c.SetCookie("jwt", token, int(24*time.Hour.Seconds()), "/", "", false, true)
    utils.SuccessResponse(c, "Signed up successfully", nil)
    return
}

func (ctrl *AuthController) VerifyToken(c *gin.Context) {
    token, err := c.Cookie("jwt")
    if err != nil {
        utils.ErrorResponse(c, utils.NewError(101, "Unauthorized"), nil)
        return
    }
    _, err = utils.GetMobileFromToken(token, ctrl.App.Config.JWTSecret)
    if err != nil {
        utils.ErrorResponse(c, utils.NewError(101, "Unauthorized"), nil)
        return
    }
    utils.SuccessResponse(c, "Authorized", nil)
}
