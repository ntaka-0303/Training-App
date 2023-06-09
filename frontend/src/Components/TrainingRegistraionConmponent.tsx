import React, { useState, useEffect } from 'react';
import { RegisterButton } from "../Components/MovePageButtonComponents";
import axios from '../axiosConfig';
import { Menu } from '../types/Menu';
import { DaysFunc } from '../util/DaysFunc';

export const TrainingRegistrationComponent: React.FC = () => {
  const today = DaysFunc.getToday();
  const [date, setDate] = useState('');
  const [menuId, setMenuId] = useState<number>(0);
  const [part, setPart] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [sets, setSets] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);
  const [remarks, setRemarks] = useState('');
  const [menu, setMenu] = useState<Menu[]>([]);
  const [allParts ,setAllParts] = useState<string[]>([]);
  const [disciplinesSelectedPart, setDisciplinesSelectedPart] = useState<string[]>([]);

  // 初回レンダリング時に実行
  useEffect(() => {
    // 今日の日付をセット
    setDate(today);
    
    // トレーニングAPIからメニューデータを取得
    fetchMenu();
  }, [today]);

  // トレーニングAPIのメニュー取得からメニューデータを取得
  const fetchMenu = async () => {
    try {
      const response = await axios.get('/getMenu');
      setMenu(response.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  // メニューデータが変更されたら、部位に紐づく種目をセット
  useEffect(() => {
    const allParts = Array.from(new Set(menu.map((item) => item.part)));
    setAllParts(allParts);
  }, [menu]);


  // メニューデータまたは部位が変更されたら、選択されている部位に紐づく種目をセット
  useEffect(() => {
    const disciplinesSelectedPart = Array.from(
      new Set(
        menu.filter(item => item.part === part).map(item => item.discipline)
      )
    );
    setDisciplinesSelectedPart(disciplinesSelectedPart);
  }, [menu, part]);

  // 部位と種目が選択されたら、メニューIDをセット
  useEffect(() => {
    const menuId = menu.find(
      (item) => item.part === part && item.discipline === discipline
    )?.id;

    // メニューIDが取得できなかったら処理を終了
    if (!menuId) return;
    
    // メニューIDが未定義または空文字の場合、処理を終了
    if (menuId === undefined) return;

    // メニューIDをセット
    setMenuId(menuId);
  }, [menu, part, discipline]);

  // トレーニングデータを登録
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trainingData = {
      date,
      menuId,
      sets,
      weight,
      reps,
      remarks,
    };

    try {
      //　トレーニングデータを登録
      await axios.post('/registerTraining', trainingData);

      // インプットをリセット
      setDate(today);
      setMenuId(0)
      setPart('');
      setDiscipline('');
      setSets(0);
      setWeight(0);
      setReps(0);
      setRemarks('');

      console.log('Training data registered successfully.');
    } catch (error) {
      // エラー処理
      console.error('An error occurred while registering training data:', error);
    }
  };

  return (
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 rounded"
          required
        />
        <select
          id="part"
          name="part"
          value={part}
          onChange={(e) => setPart(e.target.value)}
          className="px-4 py-2 rounded"
          required
        >
          <option value="">部位を選択</option>
          {allParts.map((part, index) => (
            <option key={index} value={part}>
              {part}
            </option>
          ))}
        </select>
        <select
          id="discipline"
          name="discipline"
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
          className="px-4 py-2 rounded"
          required
        >
          <option value="">種目を選択</option>
            {disciplinesSelectedPart.map((discipline, index) => (
              <option key={index} value={discipline}>
                {discipline}
              </option>
            ))}
        </select>
        <input
          type="number"
          id="sets"
          name="sets"
          onChange={(e) => setSets(Number(e.target.value))}
          placeholder="セット数"
          className="px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          id="weight"
          name="weight"
          onChange={(e) => {
            const value = e.target.value;
            const number = parseFloat(value);
            if (!isNaN(number)) {
              setWeight(number);
            }
          }}
          placeholder="重量"
          className="px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          id="reps"
          name="reps"
          onChange={(e) => setReps(Number(e.target.value))}
          placeholder="レップ数"
          className="px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          id="remarks"
          name="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="備考"
          className="px-4 py-2 rounded"
        />
        <RegisterButton/>
      </form>
  );
};