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

	// Set Menu API
	mux.HandleFunc("/setMenu", setMenu)

	// Get Menu API
	mux.HandleFunc("/getMenu", getMenu)

	c := cors.AllowAll()
	handler := c.Handler(mux)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
