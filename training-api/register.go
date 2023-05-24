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

	// Read existing data from the JSON file
	existingData, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	var trainingDataArray []TrainingData

	if len(existingData) > 0 {
		// Parse the existing data into a slice
		err = json.Unmarshal(existingData, &trainingDataArray)
		if err != nil {
			return err
		}
	}

	// Append the new training data to the array
	trainingDataArray = append(trainingDataArray, trainingData)

	// Convert the updated array to JSON
	updatedData, err := json.Marshal(trainingDataArray)
	if err != nil {
		return err
	}

	// Write the updated data to the JSON file
	err = os.WriteFile(filePath, updatedData, 0644)
	if err != nil {
		return err
	}

	return nil
}
