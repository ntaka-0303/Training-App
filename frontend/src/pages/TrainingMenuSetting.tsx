import React from 'react';
import { PageBase } from "../Components/PageBaseComponent";
import { TrainingMenuSettingCompoent } from "../Components/TrainingMenuSettingComponent";
import { StartButton } from "../Components/MovePageButtonComponents";

const TrainingMenuSetting: React.FC = () => {
  return (
    <PageBase
      title="トレーニング登録"
      main={[<TrainingMenuSettingCompoent/>]}
      buttons={[<StartButton />]}
    />
  );
};

export default TrainingMenuSetting;