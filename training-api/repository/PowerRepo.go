package repository

import (
	"bytes"
	"encoding/csv"
	"os"

	"training-api/types"

	"github.com/jszwec/csvutil"
)

const powerFilePath = "./repository/data/power.csv"

func ReadPower() ([]types.Power, error) {
	// ファイルを開く
	file, err := os.OpenFile(powerFilePath, os.O_RDONLY|os.O_CREATE, 0664)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// ファイルの中身が０件の場合は空の配列を返す
	fileInfo, err := file.Stat()
	if err != nil {
		return nil, err
	}
	if fileInfo.Size() == 0 {
		return []types.Power{}, nil
	}

	// レコードを読み込む
	readrs := csv.NewReader(file)
	records, err := readrs.ReadAll()
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
	var powerArray []types.Power
	err = csvutil.Unmarshal(b.Bytes(), &powerArray)
	if err != nil {
		return nil, err
	}

	return powerArray, nil
}

func WritePower(powerArray []types.Power) error {
	// ファイルを新規作成または上書きで開く
	file, err := os.Create(powerFilePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// データのエンコード
	b, err := csvutil.Marshal(powerArray)
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
