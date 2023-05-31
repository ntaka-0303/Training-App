import React from 'react';
import { PageBase } from "../Components/PageBaseComponent";
import { TrainingRegistrationComponent } from "../Components/TrainingRegistraionConmponent";
import { StartButton, TrainingMenuSettingButton } from "../Components/MovePageButtonComponents";

const TrainingRegistration: React.FC = () => {
  return (
    <PageBase
      title="トレーニング登録"
      main={[<TrainingRegistrationComponent/>]}
      buttons={[<TrainingMenuSettingButton />, <StartButton />]}
    />
  );
};

export default TrainingRegistration;
