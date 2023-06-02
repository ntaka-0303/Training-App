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
