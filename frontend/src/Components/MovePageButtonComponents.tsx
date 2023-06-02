import React from "react";
import { useNavigate } from "react-router-dom";

// スタート画面へ戻るボタン
export const StartButton: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/");
  };

  return (
  <button onClick={handleStartClick} className="px-4 py-2 mt-4 bg-gray-300 hover:bg-gray-400 rounded">
    戻る
  </button>
  );
};

// 登録ボタン
export const RegisterButton: React.FC = () => {
  return (
    <button type="submit" className="px-4 py-2 bg-indigo-900 hover:bg-indigo-600 text-white rounded">
      登録
    </button>
  );
};

// トレーニング登録画面へ移動するボタン
export const TrainingRegistrationButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingRegistrationClick = () => {
    navigate("/training-registration");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingRegistrationClick}>
      トレーニング登録
    </button>
  );
};

// トレーニング記録参照画面へ移動するボタン
export const TrainingRecordReferenceButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingRecordReferenceClick = () => {
    navigate("/training-record-reference");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingRecordReferenceClick}>
      トレーニング記録参照
    </button>
  );
};

// トレーニングメニュー設定画面へ移動するボタン
export const TrainingMenuSettingButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingMenuSettingClick = () => {
    navigate("/training-menu-setting");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingMenuSettingClick}>
      トレーニングメニュー設定
    </button>
  );
};

// トレーニングメニュー参照画面へ移動するボタン
export const TrainingMenuReferenceButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingMenuReferenceClick = () => {
    navigate("/training-menu-reference");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingMenuReferenceClick}>
      トレーニングメニュー参照
    </button>
  );
};

// トレーニンググラフ画面へ移動するボタン
export const TrainingGraphButton: React.FC = () => {
  const navigate = useNavigate();

  const handleTrainingGraphClick = () => {
    navigate("/training-graph");
  };

  return (
    <button className="px-4 py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded" onClick={handleTrainingGraphClick}>
      トレーニンググラフ
    </button>
  );
};

