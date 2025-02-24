package utils

import (
	"time"
	"github.com/golang-jwt/jwt/v5"
)

func CreateToken(mobile string, secret string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"mobile": mobile,
		"exp": time.Now().Add(time.Hour).Unix(),
	})
    tokenString, _ := claims.SignedString([]byte(secret))
	return tokenString, nil
}

func GetMobileFromToken(tokenString string, secret string) (string, error) {
    claims := jwt.MapClaims{}
    _, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return []byte(secret), nil
    })
    if err != nil {
        return "", err
    }
    mobile := claims["mobile"].(string)
    return mobile, nil
}
