import React, { useState } from 'react';
import { RegisterButton } from "./MovePageButtonComponents";
import axios from '../axiosConfig';

export const TrainingMenuSettingCompoent: React.FC = () => {
  const [part, setPart] = useState('');
  const [discipline, setDiscipline] = useState('');

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const menu = {
        part,
        discipline,
      };

      // メニューを登録
      await axios.post('/setMenu', menu);

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
  );
};