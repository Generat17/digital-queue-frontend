import React, { ChangeEvent, useEffect, useState } from "react";

import ResponsibilityStore from "@store/ResponsibilityStore";
import { observer } from "mobx-react-lite";
import "./Responsibilities.scss";

// Создаем объект mobX store
const responsibilityStore = new ResponsibilityStore();

const Responsibilities: React.FC<any> = () => {
  const [hideBody, setHideBody] = useState<boolean>(true);
  const [hideUpdateWindow, setHideUpdateWindow] = useState<boolean>(false);
  const [hideAddWindow, setHideAddWindow] = useState<boolean>(false);
  const [hideRemoveWindow, setHideRemoveWindow] = useState<boolean>(false);

  const [selectedResponsibilityId, setSelectedResponsibilityId] =
    useState<number>(-1);
  const [valueResponsibilityName, setValueResponsibilityName] =
    useState<string>("");

  useEffect(() => {
    responsibilityStore.getResponsibilityList().then();
  }, [hideBody]);

  return (
    <>
      {hideRemoveWindow && (
        <div className="removeWindow">
          <div>
            <h1>
              Вы уверены, что хотите удалить запись с ID:{" "}
              {selectedResponsibilityId}
            </h1>
            <div className="response">
              <div
                className="buttonYes"
                onClick={() => {
                  setHideRemoveWindow(false);
                  responsibilityStore
                    .removeResponsibility(selectedResponsibilityId)
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
                  <th>Название услуги</th>
                </tr>
                <tr>
                  <th>{selectedResponsibilityId}</th>
                  <th>
                    <input
                      type="text"
                      value={valueResponsibilityName}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setValueResponsibilityName(event.target.value);
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
                  setValueResponsibilityName("");
                }}
              >
                Назад
              </div>
              <div
                className="saveButton"
                onClick={() => {
                  setHideUpdateWindow(false);
                  responsibilityStore
                    .updateResponsibility(
                      selectedResponsibilityId,
                      valueResponsibilityName
                    )
                    .then(() => {
                      setHideBody(true);
                    });
                  setValueResponsibilityName("");
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
            <h1>Введите название новой обязанности: </h1>
            <input
              type="text"
              value={valueResponsibilityName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValueResponsibilityName(event.target.value);
              }}
            />

            <div className="control">
              <div
                className="cancelButton"
                onClick={() => {
                  setHideBody(true);
                  setHideAddWindow(false);
                  setValueResponsibilityName("");
                }}
              >
                Назад
              </div>

              <div
                className="saveButton"
                onClick={() => {
                  setHideAddWindow(false);
                  responsibilityStore
                    .addResponsibility(valueResponsibilityName)
                    .then(() => {
                      setHideBody(true);
                    });
                  setValueResponsibilityName("");
                }}
              >
                Добавить
              </div>
            </div>
          </div>
        </div>
      )}
      {hideBody && (
        <div className="workstation-admin-content-body-responsibilities">
          <table className="workstation-admin-content-body-responsibilities-table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Название услуги</th>
                <th></th>
                <th></th>
              </tr>
              {responsibilityStore.list.map((it) => (
                <tr>
                  <th>{it.id}</th>
                  <th>{it.name}</th>
                  <th
                    className="delete"
                    onClick={() => {
                      setHideBody(false);
                      setSelectedResponsibilityId(it.id);
                      setHideRemoveWindow(true);
                    }}
                  >
                    Удалить
                  </th>
                  <th
                    className="update"
                    onClick={() => {
                      setHideBody(false);
                      setSelectedResponsibilityId(it.id);
                      setValueResponsibilityName(it.name);
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
            className="workstation-admin-content-body-responsibilities-button-add"
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

export default observer(Responsibilities);
