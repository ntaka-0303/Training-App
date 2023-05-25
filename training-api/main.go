package main

import (
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	// Register API handler
	mux.HandleFunc("/register", registerHandler)

	c := cors.AllowAll()
	handler := c.Handler(mux)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
