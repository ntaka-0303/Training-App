package types

type Power struct {
	TrainingId int     `json:"trainingId" csv:"trainingId"`
	Power      float32 `json:"power" csv:"power"`
}
