package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type GetRegisterHandler struct{}
type TrainingData struct {
	Date       string `json:"date"`
	Site       string `json:"site"`
	Discipline string `json:"discipline"`
	Sets       string `json:"sets"`
	Weight     string `json:"weight"`
	Reps       string `json:"reps"`
	Remarks    string `json:"remarks"`
}

const filePath = "./data/training.json"

func registerHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var trainingData TrainingData
	if err := json.NewDecoder(r.Body).Decode(&trainingData); err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// Write the training data to the JSON file
	if err := writeTrainingData(trainingData); err != nil {
		log.Println("Error writing training data:", err)
		http.Error(w, "Error writing training data", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Training data registered successfully")
}

func writeTrainingData(trainingData TrainingData) error {

	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// Read the existing data from the JSON file
	var trainingDataArray []TrainingData
	err = json.NewDecoder(file).Decode(&trainingDataArray)
	if err != nil && err != io.EOF {
		return err
	}

	// Append the new training data to the array
	trainingDataArray = append(trainingDataArray, trainingData)

	// Write the updated training data to the JSON file
	file, err = os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	err = json.NewEncoder(file).Encode(trainingDataArray)
	if err != nil {
		return err
	}

	return nil
}
