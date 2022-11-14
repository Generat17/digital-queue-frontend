import React from "react";

import { WorkstationModel } from "@models/workstationModel";
import { Link } from "react-router-dom";

import "./SelectWorkstation.scss";

import SelectWorkstationButton from "./components/SelectWorkstationButton";

import "./SelectWorkstation.scss";

type SelectWorkstationProps = {
  workstationList: WorkstationModel[];
};

const SelectWorkstation: React.FC<SelectWorkstationProps> = ({
  workstationList,
}) => {
  return (
    <div className="select-workstation" key="select-workstation">
      {workstationList.map((it) => (
        <Link to={`/workstation/${it.workstationId}`} key={it.workstationId}>
          <SelectWorkstationButton item={it} />
        </Link>
      ))}
    </div>
  );
};

export default SelectWorkstation;
