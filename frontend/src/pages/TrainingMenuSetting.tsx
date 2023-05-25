import React, { useState } from 'react';
import { StartButton } from "./Components/movePageButtonComponents";
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

      // Send the menuData to the API endpoint
      await axios.post('/setMenu', menuData);

      // Clear the form inputs
      setPart('');
      setDiscipline('');

      // Show success message or perform any other necessary actions
      console.log('Menu setup successful');
    } catch (error) {
      // Handle error
      console.error('Menu setup failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Menu Setup</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Part"
          value={part}
          onChange={(event) => setPart(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Discipline"
          value={discipline}
          onChange={(event) => setDiscipline(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded">
          Submit
        </button>
      </form>
      <StartButton/>
    </div>
  );
};

export default TrainingMenuSetting;