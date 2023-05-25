package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type MenuData struct {
	Part       string `json:"part"`
	Discipline string `json:"discipline"`
}

const menuFilePath = "./data/menu.json"

func setMenu(w http.ResponseWriter, r *http.Request) {
	// リクエストボディをJSONとしてデコード
	var menuData MenuData
	err := json.NewDecoder(r.Body).Decode(&menuData)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// ファイルから既存のメニューデータを読み込む
	existingMenuDataArray, err := readMenu()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// 既存のメニューデータに新しいメニューデータを追加
	menuDataArray := append(existingMenuDataArray, menuData)

	// ファイルにメニューデータを書き込む
	err = writeMenu(menuDataArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Menu data registered successfully")
}

func getMenu(w http.ResponseWriter, r *http.Request) {
	// ファイルからメニューデータを読み込む
	menuDataArray, err := readMenu()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// メニューデータをJSONとしてエンコードしてレスポンスボディに書き込む
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(menuDataArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

func readMenu() ([]MenuData, error) {
	// メニューファイルを開く
	file, err := os.OpenFile(menuFilePath, os.O_RDONLY|os.O_CREATE, 0664)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// ファイルの中身が空の場合は空のメニューデータを返す
	fileInfo, err := file.Stat()
	if err != nil {
		return nil, err
	}
	if fileInfo.Size() == 0 {
		return []MenuData{}, nil
	}

	// ファイルのデータをJSONとしてデコード
	var menuDataArray []MenuData
	err = json.NewDecoder(file).Decode(&menuDataArray)
	if err != nil && err != io.EOF {
		return nil, err
	}

	return menuDataArray, nil
}

func writeMenu(menuDataArray []MenuData) error {
	// メニューファイルを新規作成または上書きで開く
	file, err := os.Create(menuFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// メニューデータをJSONとしてエンコードしてファイルに書き込む
	err = json.NewEncoder(file).Encode(menuDataArray)
	if err != nil {
		return err
	}

	return nil
}
