package apiHandler

import (
	"net/http"

	"training-api/service"
)

func RegisterTrainingHandler(w http.ResponseWriter, r *http.Request) {
	service.RegisterTraining(w, r)
}

func GetTrainingHandler(w http.ResponseWriter, r *http.Request) {
	service.GetTraining(w, r)
}
