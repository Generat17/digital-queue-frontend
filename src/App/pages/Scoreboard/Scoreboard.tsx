import React, { useEffect } from "react";

import ScoreboardStore from "@store/ScoreboardStore";
import { observer } from "mobx-react-lite";
import "./Scoreboard.scss";

// Создаем объект mobX store
const scoreboardStore = new ScoreboardStore();

const Scoreboard: React.FC<any> = () => {
  const [counter, setCounter] = React.useState<number>(0);

  useEffect(() => {
    setTimeout(() => setCounter(counter + 3), 3000);
  }, [counter]);

  useEffect(() => {
    scoreboardStore.getScoreboardList().then();
  }, [counter]);

  return (
    <div className="content" key="content">
      <div className="header" key="header">
        <h2>Номер талона</h2>
        <h2>Услуга</h2>
        <h2 className="number">Номер окна</h2>
      </div>
      <div className="queue">
        {scoreboardStore.queue.map((it) => (
          <div key={it.id} className="queue-item">
            <h1>{it.id}</h1>
            <h2>{it.service}</h2>
            <h3>{it.workstation === -1 ? "Ожидайте" : it.workstation}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Scoreboard);
