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
	// Decode the request body into a TrainingData struct
	var trainingData TrainingData
	err := json.NewDecoder(r.Body).Decode(&trainingData)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// Read the existing data from the JSON file
	existingTrainingDataArray, err := readTraining()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Append the new training data to the array
	trainingDataArray := append(existingTrainingDataArray, trainingData)

	// Write the updated training data to the JSON file
	err = writeTraining(trainingDataArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Training data registered successfully")
}

func getTraining(w http.ResponseWriter, r *http.Request) {
	// Read the training records from the JSON file
	trainingRecords, err := readTraining()
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

func readTraining() ([]TrainingData, error) {
	// Open the JSON file
	file, err := os.Open(trainingFilePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Read the training records from the JSON file
	var trainingRecords []TrainingData
	err = json.NewDecoder(file).Decode(&trainingRecords)
	if err != nil {
		return nil, err
	}

	return trainingRecords, nil
}

func writeTraining(trainingRecords []TrainingData) error {
	// Open the JSON file
	file, err := os.Create(trainingFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// Write the updated training data to the JSON file
	err = json.NewEncoder(file).Encode(trainingRecords)
	if err != nil {
		return err
	}

	return nil
}
