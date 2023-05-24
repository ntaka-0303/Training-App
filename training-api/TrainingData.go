package main

type TrainingData struct {
	Date       string `json:"date"`
	Site       string `json:"site"`
	Discipline string `json:"discipline"`
	Sets       string `json:"sets"`
	Weight     string `json:"weight"`
	Reps       string `json:"reps"`
	Remarks    string `json:"remarks"`
}
