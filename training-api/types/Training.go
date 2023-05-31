package types

type Training struct {
	Id      int     `json:"id" csv:"id"`
	Date    string  `json:"date" csv:"date"`
	MenuID  int     `json:"menuId" csv:"menuId"`
	Sets    int     `json:"sets" csv:"sets"`
	Weight  float32 `json:"weight" csv:"weight"`
	Reps    int     `json:"reps" csv:"reps"`
	Remarks string  `json:"remarks" csv:"remarks"`
}
