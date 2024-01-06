import React, { useEffect, useRef, useState } from "react";
import "./UserDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useBankData } from "../../Context/bankData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "../../components/Dialog/ErrorDialog";

export default function UserDetails() {
  const [data, setData] = useState({});
  const { state } = useLocation();
  const {
    depositCash,
    withdrawMoney,
    getUsers,
    updateCredit,
    transferMoney,
    fetchData,
    errorMsg,
  } = useBankData();
  const navigate = useNavigate();
  const { id } = useParams();

  const depositRef = useRef();
  const withdrawRef = useRef();
  const updateCreditRef = useRef();
  const transferMoneyRef = useRef();
  const recipientRef = useRef();

  const errorRef = useRef();

  useEffect(() => {
    if (state) {
      setData(state);
    } else {
      const findUser = getUsers.find((info) => info.id === +id);
      console.log(findUser);
      setData(findUser);
    }
  }, [getUsers]);

  console.log(data);

  useEffect(() => {
    if (errorMsg) {
      errorRef?.current?.showModal();
    }
  }, [errorMsg]);

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
      {data ? (
        <>
          <div className="name">
            <h1>{data.name}</h1>
          </div>
          <div className="back-btns">
            <button className="back-btn home" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faChevronLeft} className="back-icon" />
              Home
            </button>
          </div>

          <div className="info">
            <div className="id">ID: {data.id}</div>
            <div className="email">Email: {data.email}</div>
            <div className="cash">Cash: {data.cash}</div>
            <div className="credit">Credit: {data.credit}</div>
          </div>

          <div className="operations">
            <form className="deposit-form" onSubmit={handleDeposit}>
              <div>
                <h3>Deposit Cash</h3>
                <input type="number" defaultValue={0} ref={depositRef} />
                <button type="submit">Deposit</button>
              </div>
            </form>

            <form className="withdraw-form" onSubmit={handleWithdraw}>
              <div>
                <h3>Withdraw Money</h3>
                <input type="number" defaultValue={0} ref={withdrawRef} />
                <button type="submit">Withdraw</button>
              </div>
            </form>

            <form className="update-credit-form" onSubmit={handleUpdateCredit}>
              <div>
                <h3>Update Credit</h3>
                <input type="number" defaultValue={100} ref={updateCreditRef} />
                <button type="submit">Update</button>
              </div>
            </form>

            <form className="transfer-form" onSubmit={handleTransferMoney}>
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
            <ErrorDialog ref={errorRef} />
          </div>
        </>
      ) : (
        <div className="not-found">
          <button
            className="not-found-back back-btn "
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="back-icon" />
            Home
          </button>
          <h2>No data found</h2>
        </div>
      )}
    </main>
  );
}
