import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Start from './pages/Start';
import TrainingRegistration from './pages/TrainingRegistration';
import TrainingRecordReference from './pages/TrainingRecordReference';
import TrainingMenuSetting from './pages/TrainingMenuSetting';
import TrainingMenuReference from './pages/TrainingMenuReference';
import TrainingGraph from './pages/TrainingGraph';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/training-registration" element={<TrainingRegistration />} />
        <Route path="/training-record-reference" element={<TrainingRecordReference />} />
        <Route path="/training-menu-setting" element={<TrainingMenuSetting />} />
        <Route path="/training-menu-reference" element={<TrainingMenuReference />} />
        <Route path="/training-graph" element={<TrainingGraph />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
