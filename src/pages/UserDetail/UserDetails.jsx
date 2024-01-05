import React, { useEffect, useRef, useState } from "react";
import "./UserDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useBankData } from "../../Context/bankData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function UserDetails() {
  const [depositValue, setDepositValue] = useState(0);
  const { state } = useLocation();
  const { depositCash, withdrawMoney, getUsers, updateCredit, transferMoney } =
    useBankData();
  const navigate = useNavigate();

  const depositRef = useRef();
  const withdrawRef = useRef();
  const updateCreditRef = useRef();
  const transferMoneyRef = useRef();
  const recipientRef = useRef();

  useEffect(() => {
    // fetchData();
  }, [getUsers]);

  function handleDeposit(e) {
    e.preventDefault();
    depositCash(state.id, depositRef?.current?.value);
  }

  function handleWithdraw(e) {
    e.preventDefault();
    withdrawMoney(state.id, withdrawRef?.current?.value);
  }

  function handleUpdateCredit(e) {
    e.preventDefault();
    updateCredit(state.id, updateCreditRef?.current?.value);
  }

  function handleTransferMoney(e) {
    e.preventDefault();
    transferMoney(
      state.id,
      recipientRef?.current?.value,
      transferMoneyRef?.current?.value
    );
  }

  return (
    <main className="UserDetails page">
      {state ? (
        <>
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
              <div>
                <h3>Deposit Cash</h3>
                <input type="number" defaultValue={0} ref={depositRef} />
                <button type="submit">Deposit</button>
              </div>
            </form>

            <form className="withdraw-form" onClick={handleWithdraw}>
              <div>
                <h3>Withdraw Cash</h3>
                <input type="number" defaultValue={0} ref={withdrawRef} />
                <button type="submit">Withdraw</button>
              </div>
            </form>

            <form className="update-credit-form" onClick={handleUpdateCredit}>
              <div>
                <h3>Update Credit</h3>
                <input type="number" defaultValue={100} ref={updateCreditRef} />
                <button type="submit">Update</button>
              </div>
            </form>

            <form className="transfer-form" onClick={handleTransferMoney}>
              <div>
                <h3>Transfer Money</h3>
                <div className="transfer-inputs">
                  <p>Send to: </p>
                  <input
                    type="number"
                    className="recipient-input"
                    placeholder="Recipient Id"
                    ref={recipientRef}
                  />
                  <p>Amount:</p>
                  <input
                    type="number"
                    defaultValue={0}
                    ref={transferMoneyRef}
                  />
                  <button type="submit">Transfer</button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <h2>Loading data...</h2>
      )}
      {/* <div className="name">
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
      </div> */}
    </main>
  );
}
