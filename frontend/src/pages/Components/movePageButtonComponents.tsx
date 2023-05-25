import React from "react";
import { useNavigate } from "react-router-dom";

export const StartButton: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/");
  };

  return (
  <button onClick={handleStartClick} className="px-4 py-2 mt-4 bg-gray-300 hover:bg-gray-400 rounded">
    Return to Start
  </button>
  );
};

export const RegisterButton: React.FC = () => {
  return (
    <button type="submit" className="px-4 py-2 bg-indigo-900 hover:bg-indigo-600 text-white rounded">
      Register
    </button>
  );
};

export const TrainingRegistrationButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingRegistrationClick = () => {
    navigate("/training-registration");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingRegistrationClick}>
      Training Registration
    </button>
  );
};

export const TrainingRecordReferenceButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingRecordReferenceClick = () => {
    navigate("/training-record-reference");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingRecordReferenceClick}>
      Training Record Reference
    </button>
  );
};

export const TrainingMenuSettingButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingMenuSettingClick = () => {
    navigate("/training-menu-setting");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingMenuSettingClick}>
      Training Menu Setting
    </button>
  );
};

export const TrainingMenuReferenceButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingMenuReferenceClick = () => {
    navigate("/training-menu-reference");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingMenuReferenceClick}>
      Training Menu Reference
    </button>
  );
};
