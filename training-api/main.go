package main

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"

	"training-api/apiHandler"
)

const log_file_path = "/var/log/training-api.log"

// APIのエントリーポイント
func main() {
	loggingSettings()
	mux := http.NewServeMux()

	mux.HandleFunc("/registerTraining", apiHandler.RegisterTrainingHandler)

	mux.HandleFunc("/getTraining", apiHandler.GetTrainingHandler)

	mux.HandleFunc("/setMenu", apiHandler.SetMenuHandler)

	mux.HandleFunc("/getMenu", apiHandler.GetMenuHandler)

	mux.HandleFunc("/getPower", apiHandler.GetPowerHandler)

	c := cors.AllowAll()
	handler := c.Handler(mux)

	log.Fatal(http.ListenAndServe(":8000", handler))
}

func loggingSettings() {
	logfile, _ := os.OpenFile(log_file_path, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	multiLogFile := io.MultiWriter(os.Stdout, logfile)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.SetOutput(multiLogFile)
}
