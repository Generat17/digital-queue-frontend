import React from "react";

import { WorkstationModel } from "@store/models/workstationModel";
import { Link } from "react-router-dom";

import "./SelectWorkstation.scss";

import SelectWorkstationButton from "./components/SelectWorkstationButton";

type SelectWorkstationProps = {
  workstationList: WorkstationModel[];
};

const SelectWorkstation: React.FC<SelectWorkstationProps> = ({
  workstationList,
}) => {
  return (
    <div className="selectWorkstation">
      {workstationList.map((it) => (
        <Link to={`/workstation/${it.workstationId}`}>
          <SelectWorkstationButton item={it} />
        </Link>
      ))}
    </div>
  );
};

export default SelectWorkstation;
