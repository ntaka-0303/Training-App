package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/register", registerHandler)
	http.ListenAndServe(":8000", nil)
}
