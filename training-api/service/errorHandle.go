package service

import (
	"log"
	"net/http"
)

func ErrorHandle(w http.ResponseWriter, err error) {
	log.Printf("Error: %v", err)
	http.Error(w, "Internal Server Error", http.StatusInternalServerError)
}
