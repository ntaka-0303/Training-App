package repository

import (
	"io/ioutil"
	"strconv"
)

const training_id_seq_file_path = "./repository/data/training_id_seq.txt"

func ReadTrainingIdSeq() (int, error) {
	// レコードを読み込み
	data, err := ioutil.ReadFile(training_id_seq_file_path)
	if err != nil {
		return 0, err
	}

	if len(data) == 0 {
		return 0, nil
	}

	// レコードをintに変換
	seq, err := strconv.Atoi(string(data))
	if err != nil {
		return 0, err
	}

	return seq, nil
}

func WriteTrainingIdSeq(seq int) error {
	// レコードを文字列に変換
	data := strconv.Itoa(seq)

	// レコードを書き込み
	err := ioutil.WriteFile(training_id_seq_file_path, []byte(data), 0664)
	if err != nil {
		return err
	}

	return nil
}

func ReadAndIncrTrainingIdSeq() (int, error) {
	// シーケンスを取得
	seq, err := ReadTrainingIdSeq()
	if err != nil {
		return 0, err
	}

	// シーケンスをインクリメント
	seq++

	// シーケンスを書き込み
	err = WriteTrainingIdSeq(seq)
	return seq, err
}
