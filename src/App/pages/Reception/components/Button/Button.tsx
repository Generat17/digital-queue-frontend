import React from "react";

import "./Button.scss";
import { ResponsibilityModel } from "@store/models/responsibilityModel";

type ButtonProps = {
  item: ResponsibilityModel;
};

const Button: React.FC<ButtonProps> = ({ item }) => {
  return (
    <div className="button">
      <h2>{item.name}</h2>
    </div>
  );
};

export default Button;
