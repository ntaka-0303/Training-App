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
		log.Println("Error decoding request body")
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

	// 既存のトレーニングデータの最大のトレーニングIDを取得
	var maxId int
	for _, training := range existingTrainingArray {
		if training.Id > maxId {
			maxId = training.Id
		}
	}

	// トレーニングIDを設定
	training.Id = maxId + 1

	// 既存のトレーニングデータに新しいトレーニングデータを追加
	trainingArray := append(existingTrainingArray, training)

	// ファイルにトレーニングデータを書き込む
	err = repository.WriteTraining(trainingArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Powerの登録
	err = RegisterPower(training.Id, training.Sets, training.Weight, training.Reps)
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

func RegisterPower(trainingId int, sets int, weight float32, reps int) error {
	// powerを設定
	var power types.Power
	power.TrainingId = trainingId
	power.Power = weight * float32(reps) * float32(sets)

	// ファイルから既存のトレーニングデータを読み込む
	existingPowerArray, err := repository.ReadPower()
	if err != nil {
		return err
	}

	// 既存のトレーニングデータに新しいトレーニングデータを追加
	powerArray := append(existingPowerArray, power)

	// ファイルにトレーニングデータを書き込む
	err = repository.WritePower(powerArray)
	if err != nil {
		return err
	}

	return nil
}

func GetPower(w http.ResponseWriter, r *http.Request) {
	// ファイルからトレーニングデータを読み込む
	powerRecords, err := repository.ReadPower()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// トレーニングデータをJSONとしてエンコードしてレスポンスボディに書き込む
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(powerRecords)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}
