import React, {useState} from 'react';
import { TrainingGetterComponent } from '../Components/TrainingGetterComponent';
import { TrainingGraphViewerComponent } from '../Components/TrainingGraphViewerComponent';
import { StartButton, TrainingRegistrationButton } from '../Components/MovePageButtonComponents';
import { PageBase } from '../Components/PageBaseComponent';
import { ShowTraining } from '../types/ShowTraining';

const TrainingGraph = () => {

  const [trainingExtracted, setTrainingExtracted] = useState<ShowTraining[]>([]);
  const [isMenuSelected, setIsMenuSelected] = useState<boolean>(false);
  return (
    <PageBase
      title="トレーニンググラフ"
      main={[
      <TrainingGetterComponent
        trainingExtracted={trainingExtracted}
        setTrainingExtracted={setTrainingExtracted}
        isMenuSelected={isMenuSelected}
        setIsMenuSelected={setIsMenuSelected}
      />,
      <TrainingGraphViewerComponent
        trainingExtracted={trainingExtracted}
        isMenuSelected={isMenuSelected}
      />
      ]}
      buttons={[
      <TrainingRegistrationButton/>,
      <StartButton/>
      ]}
    />
  );
};

export default TrainingGraph;
