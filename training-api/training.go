package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type TrainingData struct {
	Date       string `json:"date"`
	Part       string `json:"part"`
	Discipline string `json:"discipline"`
	Sets       string `json:"sets"`
	Weight     string `json:"weight"`
	Reps       string `json:"reps"`
	Remarks    string `json:"remarks"`
}

const trainingFilePath = "./data/training.json"

func registerTraining(w http.ResponseWriter, r *http.Request) {
	// トレーニングデータをJSONとしてデコード
	var trainingData TrainingData
	err := json.NewDecoder(r.Body).Decode(&trainingData)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// ファイルから既存のトレーニングデータを読み込む
	existingTrainingDataArray, err := readTraining()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// 既存のトレーニングデータに新しいトレーニングデータを追加
	trainingDataArray := append(existingTrainingDataArray, trainingData)

	// ファイルにトレーニングデータを書き込む
	err = writeTraining(trainingDataArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Training data registered successfully")
}

func getTraining(w http.ResponseWriter, r *http.Request) {
	// ファイルからトレーニングデータを読み込む
	trainingRecords, err := readTraining()
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

func readTraining() ([]TrainingData, error) {
	// ファイルを開く
	file, err := os.Open(trainingFilePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// ファイルの中身をJSONとしてデコード
	var trainingRecords []TrainingData
	err = json.NewDecoder(file).Decode(&trainingRecords)
	if err != nil {
		return nil, err
	}

	return trainingRecords, nil
}

func writeTraining(trainingRecords []TrainingData) error {
	// ファイルを新規作成または上書きで開く
	file, err := os.Create(trainingFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// トレーニングデータをJSONとしてエンコードしてファイルに書き込む
	err = json.NewEncoder(file).Encode(trainingRecords)
	if err != nil {
		return err
	}

	return nil
}
