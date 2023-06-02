package main

import (
	"log"
	"net/http"

	"github.com/rs/cors"

	"training-api/apiHandler"
)

// APIのエントリーポイント
func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/registerTraining", apiHandler.RegisterTrainingHandler)

	mux.HandleFunc("/getTraining", apiHandler.GetTrainingHandler)

	mux.HandleFunc("/setMenu", apiHandler.SetMenuHandler)

	mux.HandleFunc("/getMenu", apiHandler.GetMenuHandler)

	c := cors.AllowAll()
	handler := c.Handler(mux)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
