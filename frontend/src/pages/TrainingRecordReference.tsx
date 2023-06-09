import React, {useState} from 'react';
import { TrainingGetterComponent } from '../Components/TrainingGetterComponent';
import { TrainingRecordViewerComponent } from '../Components/TrainingRecordViewerComponent';
import { StartButton, TrainingRegistrationButton } from '../Components/MovePageButtonComponents';
import { PageBase } from '../Components/PageBaseComponent';
import { ShowTraining } from '../types/ShowTraining';

const TrainingReference = () => {

  const [trainingExtracted, setTrainingExtracted] = useState<ShowTraining[]>([]);
  return (
    <PageBase
      title="トレーニング記録参照"
      main={[
      <TrainingGetterComponent
        trainingExtracted={trainingExtracted}
        setTrainingExtracted={setTrainingExtracted}
        isMenuSelected={false}
        setIsMenuSelected={() => {}}
      />,
      <TrainingRecordViewerComponent
        trainingExtracted={trainingExtracted}
      />
      ]}
      buttons={[
      <TrainingRegistrationButton/>,
      <StartButton/>
      ]}
    />
  );
};

export default TrainingReference;
