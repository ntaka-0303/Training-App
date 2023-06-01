package service

import (
	"io"
	"log"
	"net/http"
	"os"
)

const log_file_path = "./var/log/training-api.log"

func ErrorHandle(w http.ResponseWriter, err error) {
	logfile, _ := os.OpenFile(log_file_path, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.SetOutput(io.MultiWriter(logfile, os.Stderr))
	log.Panicf("Error: %v", err)
	http.Error(w, "Internal Server Error", http.StatusInternalServerError)
}
