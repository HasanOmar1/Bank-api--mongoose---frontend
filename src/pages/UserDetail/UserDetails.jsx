import React, { useRef, useState } from "react";
import "./UserDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useBankData } from "../../Context/bankData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function UserDetails() {
  const [depositValue, setDepositValue] = useState(0);
  const { state } = useLocation();
  const { depositCash } = useBankData();
  const navigate = useNavigate();

  const depositRef = useRef();
  // console.log(depositRef?.current?.value);
  console.log(state);

  function handleDeposit(e) {
    e.preventDefault();
    // console.log(depositRef?.current?.value);
    depositCash(state.id, depositRef?.current?.value);
  }

  return (
    <main className="UserDetails page">
      <div className="name">
        <h1>{state.name}</h1>
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} className="back-icon" />
        Back
      </button>
      <div className="info">
        <div className="id">ID: {state.id}</div>
        <div className="email">Email: {state.email}</div>
        <div className="cash">Cash: {state.cash}</div>
        <div className="credit">Credit: {state.credit}</div>
      </div>
      <div className="operations">
        <form className="deposit-form" onClick={handleDeposit}>
          <div className="deposit">
            <h3>Deposit Cash</h3>
            <input type="number" defaultValue={0} ref={depositRef} />
            <button type="submit">Deposit</button>
          </div>
        </form>
      </div>
    </main>
  );
}
