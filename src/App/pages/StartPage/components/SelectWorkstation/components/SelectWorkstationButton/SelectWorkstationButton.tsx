import React from "react";

import "./SelectWorkstationButton.scss";
import { WorkstationModel } from "@store/models/workstationModel";

type SelectWorkstationButtonProps = {
  item: WorkstationModel;
};

const SelectWorkstationButton: React.FC<SelectWorkstationButtonProps> = ({
  item,
}) => {
  return (
    <div className="selectWorkstationButton">
      <h2>{item.workstationName}</h2>
    </div>
  );
};

export default SelectWorkstationButton;
