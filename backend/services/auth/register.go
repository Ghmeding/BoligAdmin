package auth

import (
	"chatApp/services/db"
	"net/http"
)

func Register(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		errStatusCode := http.StatusMethodNotAllowed
		http.Error(w, "Invalid method", errStatusCode)
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	// check username and password value(s)
	if len(username) < 8 && len(password) < 8 {
		errStatusCode := http.StatusForbidden
		http.Error(w, "Username/Password input must be longer than 8 characters", errStatusCode)
	}

	// check if user already exists
	userExists, err := db.CheckUsernameExists(username)

	if userExists || err != nil {
		err := http.StatusConflict
		http.Error(w, "Fetching username failed ", err)
		return
	}

}
