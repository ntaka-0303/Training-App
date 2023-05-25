import React from "react";
import { TrainingRegistrationButton, TrainingRecordReferenceButton, TrainingMenuSettingButton, TrainingMenuReferenceButton } from "./Components/movePageButtonComponents";

const Start: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">筋トレ管理</h1>
      <div className="flex flex-wrap gap-4">
        <TrainingRegistrationButton />
        <TrainingRecordReferenceButton />
        <TrainingMenuSettingButton />
        <TrainingMenuReferenceButton />
      </div>
    </div>
  );
};

export default Start;
