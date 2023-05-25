import React, { useState, useEffect } from 'react';
import { StartButton, RegisterButton, TrainingMenuSettingButton } from "./Components/movePageButtonComponents";
import axios from '../axiosConfig';
import { MenuData } from './types/MenuData';
import { getToday } from './utilFunc';

const TrainingRegistration: React.FC = () => {
  const [date, setDate] = useState('');
  const [part, setPart] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [remarks, setRemarks] = useState('');
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  useEffect(() => {
    const today = getToday();
    setDate(today);

    const fetchMenuData = async () => {
      try {
        const response = await axios.get<MenuData[]>('/getMenu');
        setMenuData(response.data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trainingData = {
      date,
      part,
      discipline,
      sets,
      weight,
      reps,
      remarks,
    };

    try {
      await axios.post('/registerTraining', trainingData);

      // Clear the form inputs
      setDate(getToday());
      setPart('');
      setDiscipline('');
      setSets('');
      setWeight('');
      setReps('');
      setRemarks('');

      console.log('Training data registered successfully.');
    } catch (error) {
      // Handle error
      console.error('An error occurred while registering training data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Registration</h1>
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
          <option value="">Select Part</option>
          {Array.from(new Set(menuData.map((item) => item.part))).map((part, index) => (
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
          <option value="">Select Discipline</option>
            {Array.from(new Set(menuData.filter(item => item.part === part).map(item => item.discipline))).map((discipline, index) => (
              <option key={index} value={discipline}>
                {discipline}
              </option>
            ))}
        </select>
        <input
          type="number"
          id="sets"
          name="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          placeholder="Number of Sets"
          className="px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          id="weight"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          className="px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          id="reps"
          name="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="Number of Reps"
          className="px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          id="remarks"
          name="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Remarks"
          className="px-4 py-2 rounded"
        />
        <RegisterButton/>
      </form>
      <TrainingMenuSettingButton/>
      <StartButton/>
    </div>
  );
};

export default TrainingRegistration;
