package main

import (
	"chatApp/services/chatService"
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Gustav's chatApp")

	setupRoutes()
	http.ListenAndServe(":9000", nil)
}

func setupRoutes() {

	http.HandleFunc("/home", func(w http.ResponseWriter, r *http.Request) {

	})

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		pool := chatService.NewPool()
		go pool.Start()
		chatService.ServeWS(pool, w, r)
	})
}
