import React, { useEffect, useState } from "react";

import WorkstationStore from "@store/WorkstationStore/WorkstationStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import SelectWorkstation from "./components/SelectWorkstation";

import "./StartPage.scss";

// Создаем объект mobX store
const workstationStore = new WorkstationStore();

const StartPage: React.FC<any> = () => {
  const [buttonState, setButtonState] = useState<boolean>(false);

  useEffect(() => {
    workstationStore.getWorkstationList().then();
  }, []);

  return (
    <div className="start-page" key="start-page">
      <div className="start-page-header">
        <h1>Меню выбора сервиса</h1>
      </div>
      <div className="start-page-content">
        <div className="start-page-content-select">
          {buttonState ? (
            <div className="start-page-content-select-true">
              <h1
                onClick={() => {
                  buttonState ? setButtonState(false) : setButtonState(true);
                }}
              >
                Авторизация сотрудника
              </h1>
              <SelectWorkstation workstationList={workstationStore.list} />
            </div>
          ) : (
            <div className="start-page-content-select-false">
              <div>
                <Link to={`/scoreboard`} key="scoreboard">
                  <h1>Табло (общее информационное табло)</h1>
                </Link>
              </div>
              <div>
                <Link to={`/reception`} key="reception">
                  <h1>Киоск электронной очереди</h1>
                </Link>
              </div>

              <h1
                onClick={() => {
                  buttonState ? setButtonState(false) : setButtonState(true);
                }}
              >
                Авторизация сотрудника
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(StartPage);
