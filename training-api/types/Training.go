package types

type Training struct {
	Date       string `json:"date" csv:"date"`
	Part       string `json:"part" csv:"part"`
	Discipline string `json:"discipline" csv:"discipline"`
	Sets       string `json:"sets" csv:"sets"`
	Weight     string `json:"weight" csv:"weight"`
	Reps       string `json:"reps" csv:"reps"`
	Remarks    string `json:"remarks" csv:"remarks"`
}
