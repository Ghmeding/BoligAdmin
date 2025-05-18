package chatService

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
}

type Message struct {
	Type int    `json: "type"`
	User string `json: "user`
	Body string `json: "body`
}

func (c *Client) Read() {
	defer func() {
		fmt.Println("Unregistering")
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			// We break the loop since an eror was encountered
			return
		}
		message := Message{
			Type: messageType,
			User: string(p),
			Body: string(p),
		}
		c.Pool.Broadcast <- message
		fmt.Println("Message received:%+v\n" + c.ID)
	}
}
