package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	var trainingData TrainingData
	err = json.Unmarshal(body, &trainingData)
	if err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// Write the training data to the JSON file
	err = writeTrainingData(trainingData)
	if err != nil {
		log.Println("Error writing training data:", err)
		http.Error(w, "Error writing training data", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Training data registered successfully")
}

func writeTrainingData(trainingData TrainingData) error {
	filePath := "./data/training.json"

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
