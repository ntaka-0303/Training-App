package service

import (
	"training-api/repository"
	"training-api/types"
)

func GetMenuId() (int, error) {
	// メニューIDのシーケンスを取得
	seq, err := repository.ReadAndIncrMenuIdSeq()
	if err != nil {
		return 0, err
	}

	return seq, nil
}

func SetMenu(id int, menu types.Menu) error {
	// ファイルから既存のメニューデータを読み込む
	existingMenuArray, err := repository.ReadMenu()
	if err != nil {
		return err
	}

	// メニューIDを設定
	menu.Id = id

	// 既存のメニューデータに新しいメニューデータを追加
	menuArray := append(existingMenuArray, menu)

	// ファイルにメニューデータを書き込む
	err = repository.WriteMenu(menuArray)
	if err != nil {
		return err
	}

	return nil
}

func GetMenu() ([]types.Menu, error) {
	// ファイルからメニューデータを読み込む
	return repository.ReadMenu()
}
