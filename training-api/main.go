package main

import (
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	// Register Training API
	mux.HandleFunc("/registerTraining", registerTraining)

	// Get Training API
	mux.HandleFunc("/getTraining", getTraining)

	// Menu Setting API
	mux.HandleFunc("/setMenu", setMenu)

	c := cors.AllowAll()
	handler := c.Handler(mux)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
