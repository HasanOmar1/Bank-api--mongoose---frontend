import React, { forwardRef } from "react";
import { useBankData } from "../../Context/bankData";

const errorDialog = forwardRef(function Dialog({ children }, ref) {
  const { errorMsg } = useBankData();
  const { setErrorMsg } = useBankData();

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

export default errorDialog;
