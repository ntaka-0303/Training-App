package main

import (
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	// トレーニング記録API
	mux.HandleFunc("/registerTraining", registerTraining)

	// トレーニング取得API
	mux.HandleFunc("/getTraining", getTraining)

	// メニュー設定API
	mux.HandleFunc("/setMenu", setMenu)

	// メニュー取得API
	mux.HandleFunc("/getMenu", getMenu)

	c := cors.AllowAll()
	handler := c.Handler(mux)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
