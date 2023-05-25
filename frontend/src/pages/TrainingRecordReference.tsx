import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const TrainingRecordReference = () => {
  type TrainingRecord = {
    date: string;
    site: string;
    discipline: string;
    sets: number;
    weight: number;
    reps: number;
    remarks: string;
  };
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainingRecords();
  }, []);

  const fetchTrainingRecords = async () => {
    try {
      const response = await axios.get('/get');
      setTrainingRecords(response.data);
    } catch (error) {
      console.error('Error fetching training records:', error);
    }
  };

  const handleReturnToMenu = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Training Record Reference</h1>
      <table className="min-w-max bg-white border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-500 text-white rounded uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Site</th>
            <th className="py-3 px-6 text-left">Discipline</th>
            <th className="py-3 px-6 text-left">Sets</th>
            <th className="py-3 px-6 text-left">Weight</th>
            <th className="py-3 px-6 text-left">Reps</th>
            <th className="py-3 px-6 text-left">Remarks</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {trainingRecords.map((record, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-3 px-6">{record.date}</td>
              <td className="py-3 px-6">{record.site}</td>
              <td className="py-3 px-6">{record.discipline}</td>
              <td className="py-3 px-6">{record.sets}</td>
              <td className="py-3 px-6">{record.weight}</td>
              <td className="py-3 px-6">{record.reps}</td>
              <td className="py-3 px-6">{record.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleReturnToMenu} className="px-4 py-2 mt-4 bg-gray-300 hover:bg-gray-400 rounded">
        Return to Menu
      </button>
    </div>
  );
};

export default TrainingRecordReference;
