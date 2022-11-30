import React, { useEffect, useState } from "react";

import AuthStore from "@store/AuthStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import LogIn from "./components/LogIn";
import Menu from "./components/Menu";

const authStore = new AuthStore();

export const Workstation: React.FC<any> = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { workstationID } = useParams();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore
        .checkAuth(workstationID!, localStorage.getItem("employeeId")!)
        .then((r) => undefined);
    }
  }, [workstationID]);

  if (authStore.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!authStore.isAuth) {
    return (
      <LogIn
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        workstationId={workstationID!}
        onClick={() => authStore.login(username, password, workstationID!)}
      />
    );
  }

  return (
    <Menu
      employee={authStore.user}
      workstation={authStore.workstation}
      onClickButtonLogout={() => authStore.logout()}
      getClient={() => authStore.getClient()}
      confirmClient={() =>
        authStore.confirmClient(authStore.client.number_queue)
      }
      endClient={() => authStore.endClient()}
      client={authStore.client}
    />
  );
};

export default observer(Workstation);
