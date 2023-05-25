import React, { useState } from 'react';
import { RegisterButton, StartButton } from "./Components/movePageButtonComponents";
import axios from '../axiosConfig';

const TrainingMenuSetting: React.FC = () => {
  const [part, setPart] = useState('');
  const [discipline, setDiscipline] = useState('');

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const menuData = {
        part,
        discipline
      };

      // トレーニングAPIでメニューを登録
      await axios.post('/setMenu', menuData);

      // インプットをクリア
      setPart('');
      setDiscipline('');

      console.log('Menu setup successful');

    } catch (error) {
      // エラー処理
      console.error('Menu setup failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">メニュー設定</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="部位"
          value={part}
          onChange={(event) => setPart(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="種目"
          value={discipline}
          onChange={(event) => setDiscipline(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <RegisterButton/>
      </form>
      <StartButton/>
    </div>
  );
};

export default TrainingMenuSetting;