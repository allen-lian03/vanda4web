package main

import (
	"fmt"
	"vanda4web/webapi/vanda4web/database"
)

func main() {
	fmt.Println("Hello GO!!!")
	store := database.NewDbStore()
	sess, err := store.Open()
	if err != nil {
		fmt.Printf("Error: %s.", err)
		return
	}

	defer sess.Close()
	fmt.Println("Connection!!!")
}
