package utils

import (
	"strconv"

	"github.com/jackc/pgx/v5/pgtype"
)

func StringToPgV5Int8(s string) (pgtype.Int8, error) {
    sInt, err := strconv.Atoi(s)
    if err != nil {
        return pgtype.Int8{}, err
    }
    return pgtype.Int8 {
        Int64: int64(sInt),
        Valid: true,
    }, nil

}
