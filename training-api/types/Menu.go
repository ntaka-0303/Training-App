package types

type Menu struct {
	MenuID     int    `json:"menuID" csv:"menuID"`
	Part       string `json:"part" csv:"part"`
	Discipline string `json:"discipline" csv:"discipline"`
}
