import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Menu from './pages/Menu';
import TrainingRegistration from './pages/TrainingRegistration';
import TrainingRecordReference from './pages/TrainingRecordReference';
import DisciplineSetting from './pages/DisciplineSetting';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/training-registration" element={<TrainingRegistration />} />
        <Route path="/training-record-reference" element={<TrainingRecordReference />} />
        <Route path="/discipline-setting" element={<DisciplineSetting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
