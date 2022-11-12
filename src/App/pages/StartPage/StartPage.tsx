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

  // eslint-disable-next-line no-console
  console.log(workstationStore.list);

  return (
    <div className="startPage" key="StartPage">
      <Link to={`/scoreboard`} key="scoreboard" className="startPage-button">
        <button>
          <h1>Табло (общее информационное табло)</h1>
        </button>
      </Link>

      <Link to={`/reception`} key="reception" className="startPage-button">
        <button>
          <h1>Киоск электронной очереди</h1>
        </button>
      </Link>

      <button
        key="buttonSelectWorkstation"
        onClick={() => {
          buttonState ? setButtonState(false) : setButtonState(true);
        }}
        className="startPage-button"
      >
        Вход в систему (для сотрудников)
      </button>
      {buttonState && (
        <SelectWorkstation workstationList={workstationStore.list} />
      )}
    </div>
  );
};

export default observer(StartPage);
