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

func GetPowerHandler(w http.ResponseWriter, r *http.Request) {
	service.GetPower(w, r)
}
