import React from "react";
import { PageBase } from "../Components/PageBaseComponent";
import { StartComponent } from "../Components/StartComponent";

const Start: React.FC = () => {
  return (
    <PageBase
      title="筋トレ管理"
      main={[<StartComponent />]}
      buttons={[]}
    />
  );
};

export default Start;
