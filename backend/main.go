package main

import (
	"chatApp/services/auth"
	"chatApp/services/chatService"
	"chatApp/services/db"
	"fmt"
	"net/http"
	"os"

	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

func main() {

	/*---------------------
	 * Load env vars
	 *----------------------*/
	uri := LoadEnvVars()
	DB, err = db.ConnectToDB(uri)
	if err != nil {
		fmt.Errorf("Error: %w", err)
	}
	setupRoutes()
	http.ListenAndServe(":9000", nil)
}

func setupRoutes() {

	http.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		auth.Register(w, r)
	})

	http.HandleFunc("/chatService", func(w http.ResponseWriter, r *http.Request) {
		pool := chatService.NewPool()
		go pool.Start()
		chatService.ServeWS(pool, w, r)
	})
}

func LoadEnvVars() string {
	// Save env-vars
	dbURL := os.Getenv("DATABASE_URL")

	return dbURL
}
