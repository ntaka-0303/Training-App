import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const TrainingRegistration: React.FC = () => {
  const [date, setDate] = useState('');
  const [site, setSite] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [remarks, setRemarks] = useState('');

  const navigate = useNavigate();

  function getToday() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const todayDate = yyyy + "-" + mm + "-" + dd;
    return todayDate;
  }

  useEffect(() => {
    const today = getToday();
    setDate(today);
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const trainingData = {
      date,
      site,
      discipline,
      sets,
      weight,
      reps,
      remarks,
    };
  
    try {
      const response = await axios.post('/register', trainingData);
  
      if (response.status === 200) {
        // Training data registered successfully
        console.log('Training data registered successfully.');
      } else {
        // Handle error response
        console.error('Failed to register training data.');
      }
    } catch (error) {
      // Handle error
      console.error('An error occurred while registering training data:', error);
    }
  
    // Clear the form inputs
    setDate(getToday());
    setSite('');
    setDiscipline('');
    setSets('');
    setWeight('');
    setReps('');
    setRemarks('');
  };

  const handleReturnToMenu = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Training Registration</h1>
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
        <input
          type="text"
          id="site"
          name="site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="Site"
          className="px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          id="discipline"
          name="discipline"
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
          placeholder="Discipline"
          className="px-4 py-2 rounded"
          required
        />
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
        <button type="submit" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded">
          Register
        </button>
      </form>
      <button onClick={handleReturnToMenu} className="px-4 py-2 mt-4 bg-gray-300 hover:bg-gray-400 rounded">
        Return to Menu
      </button>
    </div>
  );
};

export default TrainingRegistration;