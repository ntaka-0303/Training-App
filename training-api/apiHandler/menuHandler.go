package apiHandler

import (
	"net/http"

	"training-api/service"
)

func SetMenuHandler(w http.ResponseWriter, r *http.Request) {
	service.SetMenu(w, r)
}

func GetMenuHandler(w http.ResponseWriter, r *http.Request) {
	service.GetMenu(w, r)
}
