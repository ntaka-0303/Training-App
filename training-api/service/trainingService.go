package service

import (
	"training-api/repository"
	"training-api/types"
)

func GetTrainingId() (int, error) {
	// トレーニングIDのシーケンスを取得
	return repository.ReadAndIncrTrainingIdSeq()

}

func RegisterTraining(id int, training types.Training) error {
	// ファイルから既存のトレーニングデータを読み込む
	existingTrainingArray, err := repository.ReadTraining()
	if err != nil {
		return err
	}

	// トレーニングIDを設定
	training.Id = id

	// 既存のトレーニングデータに新しいトレーニングデータを追加
	trainingArray := append(existingTrainingArray, training)

	// ファイルにトレーニングデータを書き込む
	err = repository.WriteTraining(trainingArray)
	if err != nil {
		return err
	}

	return nil

}

func GetTraining() ([]types.Training, error) {
	// ファイルからトレーニングデータを読み込む
	trainingRecords, err := repository.ReadTraining()
	if err != nil {
		return nil, err
	}

	return trainingRecords, nil
}

func RegisterPower(id int, training types.Training) error {
	// powerを設定
	var power types.Power
	power.TrainingId = id
	power.Power = training.Weight * float32(training.Reps) * float32(training.Sets)

	// ファイルから既存のトレーニングデータを読み込む
	existingPowerArray, err := repository.ReadPower()
	if err != nil {
		return err
	}

	// 既存のトレーニングデータに新しいトレーニングデータを追加
	powerArray := append(existingPowerArray, power)

	// ファイルにトレーニングデータを書き込む
	err = repository.WritePower(powerArray)
	if err != nil {
		return err
	}

	return nil
}

func GetPower() ([]types.Power, error) {
	// ファイルからトレーニングデータを読み込む
	powerRecords, err := repository.ReadPower()
	if err != nil {
		return nil, err
	}

	return powerRecords, err
}
