package repository

import (
	"io/ioutil"
	"strconv"
)

const menui_id_seq_file_path = "./repository/data/menu_id_seq.txt"

func ReadMenuIdSeq() (int, error) {
	// レコードを読み込み
	data, err := ioutil.ReadFile(menui_id_seq_file_path)
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

func WriteMenuIdSeq(seq int) error {
	// レコードを文字列に変換
	data := strconv.Itoa(seq)

	// レコードを書き込み
	err := ioutil.WriteFile(menui_id_seq_file_path, []byte(data), 0664)
	if err != nil {
		return err
	}

	return nil
}

func ReadAndIncrMenuIdSeq() (int, error) {
	// シーケンスを取得
	seq, err := ReadMenuIdSeq()
	if err != nil {
		return 0, err
	}

	// シーケンスをインクリメント
	seq++

	// シーケンスを書き込み
	err = WriteMenuIdSeq(seq)
	return seq, err
}
