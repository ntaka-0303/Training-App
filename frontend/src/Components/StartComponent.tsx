import React from "react";
import { TrainingRegistrationButton, 
         TrainingRecordReferenceButton,
         TrainingMenuSettingButton,
         TrainingMenuReferenceButton,
         TrainingGraphButton
       } from "../Components/MovePageButtonComponents";

export const StartComponent: React.FC = () => {
    return (
        <div className="flex flex-col-2 gap-4">
          <TrainingRegistrationButton/>
          <TrainingRecordReferenceButton />
          <TrainingMenuSettingButton />
          <TrainingMenuReferenceButton />
          <TrainingGraphButton />
        </div>
    );
};
