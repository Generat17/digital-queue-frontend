import React, { createContext, useEffect, useState } from "react";

import AuthStore from "@store/AuthStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

interface AuthState {
  authStore: AuthStore;
}

const authStore = new AuthStore();

export const Context = createContext<AuthState>({ authStore });

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
  // получить store из контекста, для вложеннных компонент
  // const {authStore} = useContext(Context);

  if (authStore.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!authStore.isAuth) {
    return (
      <Context.Provider value={{ authStore }}>
        <div>
          <h1>
            {authStore.isAuth
              ? `Пользователь авторизован ${authStore.user.first_name}`
              : "АВТОРИЗУЙТЕСЬ"}
          </h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
          <button
            onClick={() => authStore.login(username, password, workstationID!)}
          >
            LogIn
          </button>
          {/*<button onClick={() => authStore.registration(username, password)}>
            Регистрация
          </button>*/}
        </div>
      </Context.Provider>
    );
  }

  return (
    <div>
      <h1>
        {authStore.isAuth
          ? `Пользователь авторизован ${authStore.user.first_name}`
          : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <button onClick={() => authStore.logout()}>Выйти</button>
    </div>
  );
};

export default observer(Workstation);
