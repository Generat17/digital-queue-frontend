import React, { ChangeEvent, useEffect, useState } from "react";

import ResponsibilityStore from "@store/ResponsibilityStore";
import WorkstationStore from "@store/WorkstationStore";
import { observer } from "mobx-react-lite";

import "./Workstations.scss";

// Создаем объект mobX store
const workstationStore = new WorkstationStore();
const responsibilityStore = new ResponsibilityStore();

const Workstations: React.FC<any> = () => {
  const [hideBody, setHideBody] = useState<boolean>(true);
  const [hideUpdateWindow, setHideUpdateWindow] = useState<boolean>(false);
  const [hideAddWindow, setHideAddWindow] = useState<boolean>(false);
  const [hideRemoveWindow, setHideRemoveWindow] = useState<boolean>(false);

  const [selectedWorkstationId, setSelectedWorkstationId] =
    useState<number>(-1);
  const [valueWorkstationName, setValueWorkstationName] = useState<string>("");

  useEffect(() => {
    responsibilityStore.getResponsibilityList().then();
  }, []);

  useEffect(() => {
    workstationStore.getWorkstationList().then();
  }, [hideBody]);

  return (
    <>
      {hideRemoveWindow && (
        <div className="removeWindow">
          <div>
            <h1>
              Вы уверены, что хотите удалить запись с ID:{" "}
              {selectedWorkstationId}
            </h1>
            <div className="response">
              <div
                className="buttonYes"
                onClick={() => {
                  setHideRemoveWindow(false);
                  workstationStore
                    .removeWorkstation(selectedWorkstationId)
                    .then(() => {
                      setHideBody(true);
                    });
                }}
              >
                <h2>Да</h2>
              </div>
              <div
                className="buttonNo"
                onClick={() => {
                  setHideBody(true);
                  setHideRemoveWindow(false);
                }}
              >
                <h2>Нет</h2>
              </div>
            </div>
          </div>
        </div>
      )}
      {hideUpdateWindow && (
        <div className="updateWindow">
          <div>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Название рабочей станции</th>
                </tr>
                <tr>
                  <th>{selectedWorkstationId}</th>
                  <th>
                    <input
                      type="text"
                      value={valueWorkstationName}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setValueWorkstationName(event.target.value);
                      }}
                    />
                  </th>
                </tr>
              </tbody>
            </table>
            <div className="control">
              <div
                className="cancelButton"
                onClick={() => {
                  setHideUpdateWindow(false);
                  setHideBody(true);
                  setValueWorkstationName("");
                }}
              >
                Назад
              </div>
              <div
                className="saveButton"
                onClick={() => {
                  setHideUpdateWindow(false);
                  workstationStore
                    .updateWorkstation(
                      selectedWorkstationId,
                      valueWorkstationName
                    )
                    .then(() => {
                      setHideBody(true);
                    });
                  setValueWorkstationName("");
                }}
              >
                Сохранить
              </div>
            </div>
          </div>
        </div>
      )}
      {hideAddWindow && (
        <div className="addWindow">
          <div>
            <h1>Введите название новой рабочей станции: </h1>
            <input
              type="text"
              value={valueWorkstationName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValueWorkstationName(event.target.value);
              }}
            />

            <div className="control">
              <div
                className="cancelButton"
                onClick={() => {
                  setHideBody(true);
                  setHideAddWindow(false);
                  setValueWorkstationName("");
                }}
              >
                Назад
              </div>

              <div
                className="saveButton"
                onClick={() => {
                  setHideAddWindow(false);
                  workstationStore
                    .addWorkstation(valueWorkstationName)
                    .then(() => {
                      setHideBody(true);
                    });
                  setValueWorkstationName("");
                }}
              >
                Добавить
              </div>
            </div>
          </div>
        </div>
      )}
      {hideBody && (
        <div className="workstation-admin-content-body-workstations">
          <table className="workstation-admin-content-body-workstations-table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Название услуги</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              {workstationStore.list.map((it) => (
                <tr>
                  <th>{it.workstationId}</th>
                  <th>{it.workstationName}</th>
                  <th>
                    <select>
                      {it.responsibilityListName?.map((el) => (
                        <option>{el}</option>
                      ))}
                    </select>
                  </th>
                  <th
                    className="delete"
                    onClick={() => {
                      setHideBody(false);
                      setSelectedWorkstationId(it.workstationId);
                      setHideRemoveWindow(true);
                    }}
                  >
                    Удалить
                  </th>
                  <th
                    className="update"
                    onClick={() => {
                      setHideBody(false);
                      setSelectedWorkstationId(it.workstationId);
                      setValueWorkstationName(it.workstationName);
                      setHideUpdateWindow(true);
                    }}
                  >
                    Изменить
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="workstation-admin-content-body-workstations-button-add"
            onClick={() => {
              setHideBody(false);
              setHideAddWindow(true);
            }}
          >
            Добавить новую запись
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Workstations);
