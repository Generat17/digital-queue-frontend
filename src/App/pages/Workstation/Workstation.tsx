import React from "react";

import { useParams } from "react-router-dom";

import LogIn from "./components/LogIn";

type WorkstationProps = {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

const Workstation: React.FC<WorkstationProps> = ({
  accessToken,
  setAccessToken,
}) => {
  const workstation = useParams();
  return (
    <div>
      <h1>workstation page</h1>
      <LogIn
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        workstation={workstation}
      />
      <h1>Ваш токен: {accessToken}</h1>
    </div>
  );
};

export default Workstation;
