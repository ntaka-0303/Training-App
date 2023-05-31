import React, { useState } from "react";
import { MenuData } from "../types/MenuData";
import { StartButton } from "../Components/MovePageButtonComponents";
import { PageBase } from "../Components/PageBaseComponent";
import { TrainingMenuGetterComponent } from "../Components/TrainingMenuGetterComponent";
import { TrainingMenuViewerComponent } from "../Components/TrainingMenuViewerComponent";


const TrainingMenuReference: React.FC = () => {
  const [showMenuData, setShowMenuData] = useState<MenuData[]>([]);

  return (
    <PageBase
      title="トレーニングメニュー参照"
      main={[
        <TrainingMenuGetterComponent
          showMenuData={showMenuData}
          setShowMenuData={setShowMenuData}
        />,
        <TrainingMenuViewerComponent
          showMenuData={showMenuData}
        />,
      ]}
      buttons={[
        <StartButton />
      ]}
    /> 
  );
};

export default TrainingMenuReference;