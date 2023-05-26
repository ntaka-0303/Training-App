package service

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"training-api/repository"
	"training-api/types"
)

func RegisterTraining(w http.ResponseWriter, r *http.Request) {
	// トレーニングデータをJSONとしてデコード
	var training types.Training
	err := json.NewDecoder(r.Body).Decode(&training)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// ファイルから既存のトレーニングデータを読み込む
	existingTrainingArray, err := repository.ReadTraining()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// 既存のトレーニングデータに新しいトレーニングデータを追加
	trainingArray := append(existingTrainingArray, training)

	// ファイルにトレーニングデータを書き込む
	err = repository.WriteTraining(trainingArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Training data registered successfully")
}

func GetTraining(w http.ResponseWriter, r *http.Request) {
	// ファイルからトレーニングデータを読み込む
	trainingRecords, err := repository.ReadTraining()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// トレーニングデータをJSONとしてエンコードしてレスポンスボディに書き込む
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(trainingRecords)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}
