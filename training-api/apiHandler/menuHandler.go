package apiHandler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"training-api/service"
	"training-api/types"
)

func SetMenuHandler(w http.ResponseWriter, r *http.Request) {
	// メニューIDを取得
	id, err := service.GetMenuId()
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}

	// リクエストボディをJSONとしてデコード
	var menu types.Menu
	err = json.NewDecoder(r.Body).Decode(&menu)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}

	err = service.SetMenu(id, menu)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}

	fmt.Fprintln(w, "Menu data registered successfully")
}

func GetMenuHandler(w http.ResponseWriter, r *http.Request) {
	// メニューデータを取得
	menuRecords, err := service.GetMenu()
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}

	// メニューデータをJSONとしてエンコードしてレスポンスボディに書き込む
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(menuRecords)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}
}
