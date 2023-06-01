package apiHandler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"training-api/service"
	"training-api/types"
)

func RegisterTrainingHandler(w http.ResponseWriter, r *http.Request) {
	// トレーニングIDを取得
	id, err := service.GetTrainingId()
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}
	// トレーニングデータをJSONとしてデコード
	var training types.Training
	err = json.NewDecoder(r.Body).Decode(&training)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}

	// トレーニングデータを登録
	err = service.RegisterTraining(id, training)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}
	fmt.Fprintln(w, "Training data registered successfully")

	// パワーを登録
	err = service.RegisterPower(id, training)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}
	fmt.Fprintln(w, "Training power registered successfully")
}

func GetTrainingHandler(w http.ResponseWriter, r *http.Request) {
	trainingRecords, err := service.GetTraining()
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}

	// トレーニングデータをJSONとしてエンコードしてレスポンスボディに書き込む
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(trainingRecords)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}
}

func GetPowerHandler(w http.ResponseWriter, r *http.Request) {
	powerRecords, err := service.GetPower()
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}

	// トレーニングデータをJSONとしてエンコードしてレスポンスボディに書き込む
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(powerRecords)
	if err != nil {
		service.ErrorHandle(w, err)
		return
	}
}
