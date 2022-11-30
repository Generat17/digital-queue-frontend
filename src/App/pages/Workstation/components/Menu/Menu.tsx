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
  confirmClient: () => void;
  endClient: () => void;
  client: IClient;
};

const Menu: React.FC<MenuProps> = ({
  employee,
  workstation,
  onClickButtonLogout,
  getClient,
  confirmClient,
  endClient,
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
                <th>
                  {employee.status === 1
                    ? "Свободен"
                    : employee.status === 2
                    ? "Ожидание клиента"
                    : "Работа с клиентом"}
                </th>
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
          <br /> <br />
          <h2>Текущий клиент:</h2>
          {client.number_ticket === -1 ? (
            <div>
              <h3>В данный момент клиентов - нет</h3>
            </div>
          ) : client.number_ticket === -2 ||
            client.number_ticket === undefined ? (
            <div>
              <h3>Нажмите кнопку "Получить клиента", чтобы вызвать клиента</h3>
            </div>
          ) : (
            <div>
              <h3>Номер талона: {client.number_ticket}</h3>
              <h3>Услуга: {client.service_ticket}</h3>
            </div>
          )}
        </div>
      </div>
      <div className="workstation-menu-footer">
        {employee.status === 1 ? (
          <button
            onClick={getClient}
            className="workstation-menu-footer-button-start"
          >
            <h2>Получить клиента</h2>
          </button>
        ) : employee.status === 2 ? (
          <button
            onClick={confirmClient}
            className="workstation-menu-footer-button-wait"
          >
            <h2>Клиент пришел</h2>
          </button>
        ) : (
          <button
            onClick={endClient}
            className="workstation-menu-footer-button-end"
          >
            <h2>Завершить работу с клиентом</h2>
          </button>
        )}
      </div>
    </div>
  );
};

export default observer(Menu);
