package service

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"training-api/repository"
	"training-api/types"
)

func SetMenu(w http.ResponseWriter, r *http.Request) {
	// リクエストボディをJSONとしてデコード
	var menu types.Menu
	err := json.NewDecoder(r.Body).Decode(&menu)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// ファイルから既存のメニューデータを読み込む
	existingMenuArray, err := repository.ReadMenu()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// 既存のメニューデータの中から、メニューIDの最大値を取得
	maxId := 0
	for _, existingMenu := range existingMenuArray {
		if existingMenu.Id > maxId {
			maxId = existingMenu.Id
		}
	}

	// メニューIDを設定
	menu.Id = maxId + 1

	// 既存のメニューデータに新しいメニューデータを追加
	menuArray := append(existingMenuArray, menu)

	// ファイルにメニューデータを書き込む
	err = repository.WriteMenu(menuArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Menu data registered successfully")
}

func GetMenu(w http.ResponseWriter, r *http.Request) {
	// ファイルからメニューデータを読み込む
	// menuArray, err := repository.ReadMenu()
	menuArray, err := repository.ReadMenu()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// メニューデータをJSONとしてエンコードしてレスポンスボディに書き込む
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(menuArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}
