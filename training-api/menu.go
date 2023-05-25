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
	// Decode the request body into a MenuData struct
	var menuData MenuData
	err := json.NewDecoder(r.Body).Decode(&menuData)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	// Read the existing data from the JSON file
	existingMenuDataArray, err := readMenu()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Append the new menu data to the array
	menuDataArray := append(existingMenuDataArray, menuData)

	// Write the updated menu data to the JSON file
	err = writeMenu(menuDataArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, "Menu data registered successfully")
}

func getMenu(w http.ResponseWriter, r *http.Request) {
	// Read the existing data from the JSON file
	menuDataArray, err := readMenu()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Encode the menu data array into JSON
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(menuDataArray)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

func readMenu() ([]MenuData, error) {
	// Open the menu file
	file, err := os.OpenFile(menuFilePath, os.O_RDONLY|os.O_CREATE, 0664)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Read the existing data from the JSON file
	var menuDataArray []MenuData
	err = json.NewDecoder(file).Decode(&menuDataArray)
	if err != nil && err != io.EOF {
		return nil, err
	}

	return menuDataArray, nil
}

func writeMenu(menuDataArray []MenuData) error {
	// Open the menu file
	file, err := os.Create(menuFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// Write the updated menu data to the JSON file
	err = json.NewEncoder(file).Encode(menuDataArray)
	if err != nil {
		return err
	}

	return nil
}
