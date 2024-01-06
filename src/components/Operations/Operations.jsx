import React, { useEffect, useRef } from "react";
import ErrorDialog from "../Dialog/ErrorDialog";
import { useBankData } from "../../Context/bankData";

export default function Operations() {
  const { depositCash, withdrawMoney, updateCredit, transferMoney, errorMsg } =
    useBankData();

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

  function handleDeposit(e) {
    e.preventDefault();
    depositCash(id, depositRef?.current?.value);
  }

  function handleWithdraw(e) {
    e.preventDefault();
    withdrawMoney(id, withdrawRef?.current?.value);
  }

  function handleUpdateCredit(e) {
    e.preventDefault();
    updateCredit(id, updateCreditRef?.current?.value);
  }

  function handleTransferMoney(e) {
    e.preventDefault();
    transferMoney(
      id,
      recipientRef?.current?.value,
      transferMoneyRef?.current?.value
    );
  }

  return (
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
    </div>
  );
}
