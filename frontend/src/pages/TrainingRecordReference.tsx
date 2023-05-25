import React, { useEffect, useState } from 'react';
import { StartButton } from './Components/movePageButtonComponents';
import axios from '../axiosConfig';
import { TrainingData } from './types/TrainingData';

const TrainingDataReference = () => {
  const [trainingRecords, setTrainingDatas] = useState<TrainingData[]>([]);

  useEffect(() => {
    fetchTrainingDatas();
  }, []);

  // トレーニングデータを取得
  const fetchTrainingDatas = async () => {
    try {
      const response = await axios.get('/getTraining');
      setTrainingDatas(response.data);
    } catch (error) {
      console.error('Error fetching training records:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">トレーニング記録参照</h1>
      <div className="overflow-y-scroll max-h-80">
        <table className="min-w-max bg-white border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-indigo-500 text-white rounded uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">日付</th>
              <th className="py-3 px-6 text-left">部位</th>
              <th className="py-3 px-6 text-left">種目</th>
              <th className="py-3 px-6 text-left">セット数</th>
              <th className="py-3 px-6 text-left">重量</th>
              <th className="py-3 px-6 text-left">レップ数</th>
              <th className="py-3 px-6 text-left">備考</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {trainingRecords.map((record, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-6">{record.date}</td>
                <td className="py-3 px-6">{record.part}</td>
                <td className="py-3 px-6">{record.discipline}</td>
                <td className="py-3 px-6">{record.sets}</td>
                <td className="py-3 px-6">{record.weight}</td>
                <td className="py-3 px-6">{record.reps}</td>
                <td className="py-3 px-6">{record.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StartButton/>
    </div>
  );
};

export default TrainingDataReference;
