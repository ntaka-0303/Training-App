package repository

import (
	"bytes"
	"encoding/csv"
	"os"

	"github.com/jszwec/csvutil"

	"training-api/types"
)

const menuFilePath = "./repository/data/menu.csv"

func ReadMenu() ([]types.Menu, error) {
	// ファイルを開く
	file, err := os.OpenFile(menuFilePath, os.O_RDONLY|os.O_CREATE, 0664)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// ファイルの中身が空の場合は空のメニューデータを返す
	fileInfo, err := file.Stat()
	if err != nil {
		return nil, err
	}
	if fileInfo.Size() == 0 {
		return []types.Menu{}, nil
	}

	// レコードを読み込む
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	// バッファを作成
	b := &bytes.Buffer{}
	err = csv.NewWriter(b).WriteAll(records)
	if err != nil {
		return nil, err
	}

	// データのデコード
	var menuArray []types.Menu
	err = csvutil.Unmarshal(b.Bytes(), &menuArray)
	if err != nil {
		return nil, err
	}

	return menuArray, nil
}

func WriteMenu(menuArray []types.Menu) error {
	// ファイルを新規作成または上書きで開く
	file, err := os.Create(menuFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// データのエンコード
	b, err := csvutil.Marshal(menuArray)
	if err != nil {
		return err
	}

	// バッファを配列に変換
	reader := csv.NewReader(bytes.NewReader(b))
	records, err := reader.ReadAll()
	if err != nil {
		return err
	}

	// ファイルに書き込む
	writer := csv.NewWriter(file)
	err = writer.WriteAll(records)
	if err != nil {
		return err
	}

	return nil
}
