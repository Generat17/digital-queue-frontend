import React, { useState } from "react";

import AuthStoreOld from "@store/AuthStore";

import Input from "./components/Input";

//const authStore = new AuthStoreOld();

type LogInProps = {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  workstation: any;
};

const LogIn: React.FC<LogInProps> = ({
  accessToken,
  setAccessToken,
  workstation,
}) => {
  const [loginValue, setLoginValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const onClickButton = () => {
    /*if (workstation !== undefined) {
      authStore.getAccessToken(loginValue, passwordValue, workstation).then();
      setAccessToken(authStore.accessToken);
    }*/
  };

  // eslint-disable-next-line no-console
  console.log(accessToken);

  return (
    <div>
      <h1>Введите ваш логин:</h1>
      <Input
        placeholder="login"
        name={"loginInput"}
        setInputValue={setLoginValue}
        inputValue={loginValue}
        type="text"
        key="loginInput"
      />
      <h1>Введите ваш пароль:</h1>
      <Input
        placeholder="password"
        name={"passwordInput"}
        setInputValue={setPasswordValue}
        inputValue={passwordValue}
        type="password"
        key="passwordInput"
      />
      <button onClick={onClickButton}>Отправить</button>
    </div>
  );
};
export default LogIn;
