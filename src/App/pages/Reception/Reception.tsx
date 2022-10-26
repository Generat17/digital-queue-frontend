import React, { useEffect } from "react";
import "./Reception.scss";

import ResponsibilityStore from "@store/ResponsibilityStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Button from "./components/Button";

// Создаем объект mobX store
const responsibilityStore = new ResponsibilityStore();

const Reception: React.FC<any> = () => {
  useEffect(() => {
    responsibilityStore.getResponsibilityList().then();
  }, []);

  return (
    <div className="reception" key="reception">
      <div className="left-half" key="left-half">
        <div className="logo" key="logo">
          РЖД
        </div>
        <div className="welcome-msg" key="welcome-msg">
          Здесь можно взять талон электронной очереди
        </div>
      </div>
      <div className="right-half" key="right-half">
        <div className="inner-block" key="inner-block">
          <div className="info" key="info">
            Выберите необходимый тип услуги, возьмите ваш талон и ожидайте
            очереди
          </div>
          {responsibilityStore.list.map((it) => (
            <Link to={`/wait/${it.name}`} key={it.id + 2000}>
              <Button key={it.id} item={it} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default observer(Reception);
