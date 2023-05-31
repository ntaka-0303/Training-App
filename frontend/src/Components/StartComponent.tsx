import React from "react";
import { TrainingRegistrationButton, 
         TrainingRecordReferenceButton,
         TrainingMenuSettingButton,
         TrainingMenuReferenceButton
       } from "../Components/MovePageButtonComponents";

export const StartComponent: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-4">
          <TrainingRegistrationButton/>
          <TrainingRecordReferenceButton />
          <TrainingMenuSettingButton />
          <TrainingMenuReferenceButton />
        </div>
    );
};
