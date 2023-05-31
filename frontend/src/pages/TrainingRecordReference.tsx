import React, {useState} from 'react';
import { TrainingRecordGetterComponent } from '../Components/TrainingRecordGetterComponent';
import { TrainingRecordViewerComponent } from '../Components/TrainingRecordViewerComponent';
import { StartButton, TrainingRegistrationButton } from '../Components/MovePageButtonComponents';
import { PageBase } from '../Components/PageBaseComponent';
import { ShowTrainingData } from '../types/ShowTrainingData';

const TrainingDataReference = () => {

  const [showTrainingData, setShowTrainingData] = useState<ShowTrainingData[]>([]);
  return (
    <PageBase
      title="トレーニング記録参照"
      main={[
      <TrainingRecordGetterComponent
        showTrainingData={showTrainingData}
        setShowTrainingData={setShowTrainingData}
      />,
      <TrainingRecordViewerComponent
        showTrainingData={showTrainingData}
      />
      ]}
      buttons={[
      <TrainingRegistrationButton/>,
      <StartButton/>
      ]}
    />
  );
};

export default TrainingDataReference;
