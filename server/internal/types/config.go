package types

type Config struct {
    AppURL string
    ClientURL string
    PublicStoragePath string
    PGConnString string
    RedisConnString string
    JWTSecret string
    Host string
    Port int
    BaseURL string
}
