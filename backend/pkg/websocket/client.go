
package websocket

import (
	"github.com/gorilla/websocket"
	"fmt"
	"sync"
	"log"
)

type Client struct{
	ID string		
	Conn *websocket.Conn
	Pool *Pool
	mutex sync.Mutex
}

type Message struct{
	Type int `json: "type"`
	User string `json: "user`
	Body string `json: "body`
}

func(c *Client) Read(){
	defer func(){
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()
	
	for{
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil{
			log.Println(err)
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