import React, { ChangeEvent } from "react";

import "./Input.scss";

type InputProps = {
  placeholder?: string;
  name: string;
  type: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  name,
  inputValue,
  setInputValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);
  return (
    <input
      className={name}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    ></input>
  );
};
export default Input;
