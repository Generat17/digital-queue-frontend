import React from "react";

import "./Menu.scss";
import { IClient } from "@models/IClient";
import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";
import { observer } from "mobx-react-lite";

type MenuProps = {
  employee: IEmployee;
  workstation: IWorkstation;
  onClickButtonLogout: () => void;
  getClient: () => void;
  client: IClient;
};

const Menu: React.FC<MenuProps> = ({
  employee,
  workstation,
  onClickButtonLogout,
  getClient,
  client,
}) => {
  return (
    <div className="workstation-menu" key="workstation-menu">
      <div className="workstation-menu-header" key="workstation-menu-header">
        <div className="workstation-menu-header-name">Личный кабинет</div>
        <div
          className="workstation-menu-header-workstation-name"
          key="workstation-menu-header-workstation-name"
        >
          {workstation.workstation_name}
        </div>
        <div className="workstation-menu-header-employee-name">
          {employee.first_name} {employee.second_name}
        </div>
        <button
          onClick={onClickButtonLogout}
          className="workstation-menu-header-button-logout"
          key="workstation-menu-header-button-logout"
        >
          Выйти
        </button>
      </div>
      <div className="workstation-menu-content">
        <div className="workstation-menu-content-info">
          <h2>Общая информация</h2>
          <table className="workstation-menu-content-info-table">
            <tbody>
              <tr>
                <th>ID сотрудника</th>
                <th>{employee.employee_id}</th>
              </tr>
              <tr>
                <th>Username</th>
                <th>{employee.username}</th>
              </tr>
              <tr>
                <th>Имя</th>
                <th>{employee.first_name}</th>
              </tr>
              <tr>
                <th>Фамилия</th>
                <th>{employee.second_name}</th>
              </tr>
              <tr>
                <th>Должность</th>
                <th>{employee.position}</th>
              </tr>
              <tr>
                <th>Статус</th>
                <th>{employee.status}</th>
              </tr>
              <tr>
                <th>ID рабочей станции</th>
                <th>{workstation.workstation_id}</th>
              </tr>
              <tr>
                <th>Название рабочей станции</th>
                <th>{workstation.workstation_name}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="workstation-menu-footer">
        <button onClick={getClient}>Получить клиента</button>
        <h1>{client.number_ticket}</h1>
        <h1>{client.service_ticket}</h1>
      </div>
    </div>
  );
};

export default observer(Menu);
