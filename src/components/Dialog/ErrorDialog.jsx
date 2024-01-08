import React, { forwardRef } from "react";
import { useBankData } from "../../Context/bankData";

const ErrorDialog = forwardRef(function Dialog({ children }, ref) {
  const { errorMsg, setErrorMsg } = useBankData();

  function closeDialog() {
    setErrorMsg("");
  }

  return (
    <dialog ref={ref} className="error-dialog">
      <form method="dialog">
        <h4>{errorMsg}</h4>
        <button className="x" onClick={closeDialog}>
          Close
        </button>
      </form>
    </dialog>
  );
});

export default ErrorDialog;
