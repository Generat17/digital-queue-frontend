import React, { useEffect, useState } from "react";

import WaitStore from "@store/WaitStore";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams, Link } from "react-router-dom";

import "./Wait.scss";

const waitStore = new WaitStore();

const Wait: React.FC<any> = () => {
  const { service } = useParams();
  const [counter, setCounter] = React.useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (service !== undefined) {
      waitStore.getTicket(service).then();
    }
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter == 0) {
      navigate(`/reception`);
    }
  }, [counter]);

  return (
    <div className="content" key="content">
      <div className="coupon" key="coupon">
        <h4>Номер вашего талона: </h4>
        <h2>{waitStore.ticketNumber}</h2>
      </div>
      <Link to="/reception" className="linkBackBtn">
        <div className="backBtn" key="backBtn">
          <h2>Перейти в главное меню</h2>
        </div>
      </Link>
      <div className="timer" key="timer">
        <h4>Автоматический переход в главное меню через: </h4>
        <h3>{counter} сек.</h3>
      </div>
    </div>
  );
};

export default observer(Wait);
