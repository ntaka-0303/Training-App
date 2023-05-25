package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

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

func register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var trainingData TrainingData
	err := json.NewDecoder(r.Body).Decode(&trainingData)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// Write the training data to the JSON file
	err = writeTrainingData(trainingData)
	if err != nil {
		log.Fatal("Error writing training data:", err)
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

func get(w http.ResponseWriter, r *http.Request) {

	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Read the training records from the JSON file
	var trainingRecords []TrainingData
	err = json.NewDecoder(file).Decode(&trainingRecords)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Send the training records as a JSON response
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(trainingRecords)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}
