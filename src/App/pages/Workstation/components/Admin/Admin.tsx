import React, { useState } from "react";

import "./Admin.scss";
import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";
import { observer } from "mobx-react-lite";

import Employees from "./components/Employees";
import Positions from "./components/Positions";
import Preview from "./components/Preview";
import Responsibilities from "./components/Responsibilities";
import Workstations from "./components/Workstations";

type AdminProps = {
  employee: IEmployee;
  workstation: IWorkstation;
  onClickButtonLogout: () => void;
};

const Admin: React.FC<AdminProps> = ({
  employee,
  workstation,
  onClickButtonLogout,
}) => {
  const [button, setButton] = useState<number>(0);

  return (
    <div className="workstation-admin" key="workstation-admin-menu">
      <div className="workstation-admin-header" key="workstation-admin-header">
        <div className="workstation-admin-header-name">Личный кабинет</div>
        <div
          className="workstation-admin-header-workstation-name"
          key="workstation-admin-header-workstation-name"
        >
          {workstation.workstation_name}
        </div>
        <div className="workstation-admin-header-employee-name">
          {employee.first_name} {employee.second_name}
        </div>
        <button
          onClick={onClickButtonLogout}
          className="workstation-admin-header-button-logout"
          key="workstation-admin-header-button-logout"
        >
          Выйти
        </button>
      </div>

      <div className="workstation-admin-content">
        <div className="workstation-admin-content-menu">
          <div
            className={`workstation-admin-content-menu-button ${
              button === 0 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setButton(0)}
          >
            Главная
          </div>
          <div
            className={`workstation-admin-content-menu-button ${
              button === 1 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setButton(1)}
          >
            Сотрудники
          </div>
          <div
            className={`workstation-admin-content-menu-button ${
              button === 2 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setButton(2)}
          >
            Рабочие станции
          </div>
          <div
            className={`workstation-admin-content-menu-button ${
              button === 3 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setButton(3)}
          >
            Обязанности
          </div>
          <div
            className={`workstation-admin-content-menu-button ${
              button === 4 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setButton(4)}
          >
            Должности
          </div>
        </div>
        <div className="workstation-admin-content-body">
          {button === 0 && <Preview />}
          {button === 1 && <Employees />}
          {button === 2 && <Workstations />}
          {button === 3 && <Responsibilities />}
          {button === 4 && <Positions />}
        </div>
      </div>

      <div className="workstation-admin-footer"></div>
    </div>
  );
};

export default observer(Admin);
