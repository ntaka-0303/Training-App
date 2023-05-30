package types

type Menu struct {
	Id         int    `json:"id" csv:"id"`
	Part       string `json:"part" csv:"part"`
	Discipline string `json:"discipline" csv:"discipline"`
}
