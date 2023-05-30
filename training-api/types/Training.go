package types

type Training struct {
	Id      int    `json:"id" csv:"id"`
	Date    string `json:"date" csv:"date"`
	MenuID  int    `json:"menuId" csv:"menuId"`
	Sets    string `json:"sets" csv:"sets"`
	Weight  string `json:"weight" csv:"weight"`
	Reps    string `json:"reps" csv:"reps"`
	Remarks string `json:"remarks" csv:"remarks"`
}
