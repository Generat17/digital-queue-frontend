import React from "react";

import Input from "./components/Input";

import "./LogIn.scss";

type LogInProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;

  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;

  workstationId: string;

  onClick: () => void;
};

const LogIn: React.FC<LogInProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  workstationId,
  onClick,
}) => {
  return (
    <div className="workstation-login">
      <div className="workstation-login-header">
        <h1>Авторизация в рабочей станции ID:{workstationId}</h1>
      </div>
      <div className="workstation-login-content">
        <h2>Введите ваш логин:</h2>
        <Input
          placeholder="username"
          name={"loginInput"}
          setInputValue={setUsername}
          inputValue={username}
          type="text"
          key="loginInput"
        />
        <h2>Введите ваш пароль:</h2>
        <Input
          placeholder="password"
          name={"passwordInput"}
          setInputValue={setPassword}
          inputValue={password}
          type="password"
          key="passwordInput"
        />
        <div className="workstation-login-content-button">
          <button onClick={onClick}>Войти</button>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
