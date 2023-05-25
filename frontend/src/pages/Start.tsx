import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate();
  
    const handleTrainingRegistrationClick = () => {
      navigate('/training-registration');
    };

    const handleTrainingRecordReferenceClick = () => {
      navigate('/training-record-reference');
    };

    const handleTrainingMenuSettingClick = () => {
      navigate('training-menu-setting');
    };

    const handleTrainingMenuReferenceClick = () => {
      navigate('training-menu-reference');
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8">Training Management Application</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingRegistrationClick}>
            Training Registration
          </button>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingRecordReferenceClick}>
            Training Record Reference
          </button>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingMenuSettingClick}>
            Training Menu Setting
          </button>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingMenuReferenceClick}>
            Training Menu Reference
          </button>
        </div>
      </div>
    );
}

export default Start;