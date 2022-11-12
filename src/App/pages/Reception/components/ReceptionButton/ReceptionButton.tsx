import React from "react";

import "./ReceptionButton.scss";
import { ResponsibilityModel } from "@store/models/responsibilityModel";

type ReceptionButtonProps = {
  item: ResponsibilityModel;
};

const ReceptionButton: React.FC<ReceptionButtonProps> = ({ item }) => {
  return (
    <div className="receptionButton">
      <h2>{item.name}</h2>
    </div>
  );
};

export default ReceptionButton;
