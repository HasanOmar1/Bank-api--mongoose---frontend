import React, { useEffect, useRef, useState } from "react";
import ErrorDialog from "../Dialog/ErrorDialog";
import { useBankData } from "../../Context/bankData";
import { useParams } from "react-router-dom";

export default function Operations() {
  const {
    depositCash,
    withdrawMoney,
    updateCredit,
    transferMoney,
    errorMsg,
    getUserById,
  } = useBankData();
  const { id } = useParams();

  const depositRef = useRef();
  const withdrawRef = useRef();
  const updateCreditRef = useRef();
  const transferMoneyRef = useRef();
  const recipientRef = useRef();

  const errorRef = useRef();

  useEffect(() => {
    if (errorMsg) {
      errorRef?.current?.showModal();
    }
  }, [errorMsg]);

  async function handleDeposit(e) {
    try {
      e.preventDefault();
      await depositCash(id, depositRef?.current?.value);
      getUserById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWithdraw(e) {
    try {
      e.preventDefault();
      await withdrawMoney(id, withdrawRef?.current?.value);
      getUserById(id);
    } catch (error) {}
  }

  async function handleUpdateCredit(e) {
    try {
      e.preventDefault();
      await updateCredit(id, updateCreditRef?.current?.value);
      getUserById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleTransferMoney(e) {
    try {
      e.preventDefault();
      await transferMoney(
        id,
        recipientRef?.current?.value,
        transferMoneyRef?.current?.value
      );
      getUserById(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="operations">
      <>
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
              <p>Send to</p>
              <input
                type="number"
                className="recipient-input"
                placeholder="Recipient Id"
                ref={recipientRef}
              />
              <p>Amount</p>
              <input type="number" defaultValue={0} ref={transferMoneyRef} />
              <button type="submit">Transfer</button>
            </div>
          </div>
        </form>
        <ErrorDialog ref={errorRef} />
      </>
    </div>
  );
}
