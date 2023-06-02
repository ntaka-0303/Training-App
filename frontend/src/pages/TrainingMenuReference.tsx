import React, { useState } from "react";
import { Menu } from "../types/Menu";
import { StartButton } from "../Components/MovePageButtonComponents";
import { PageBase } from "../Components/PageBaseComponent";
import { TrainingMenuGetterComponent } from "../Components/TrainingMenuGetterComponent";
import { TrainingMenuViewerComponent } from "../Components/TrainingMenuViewerComponent";


const TrainingMenuReference: React.FC = () => {
  const [showMenu, setShowMenu] = useState<Menu[]>([]);

  return (
    <PageBase
      title="トレーニングメニュー参照"
      main={[
        <TrainingMenuGetterComponent
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />,
        <TrainingMenuViewerComponent
          showMenu={showMenu}
        />,
      ]}
      buttons={[
        <StartButton />
      ]}
    /> 
  );
};

export default TrainingMenuReference;