import React, { forwardRef } from "react";
import { useCreateUser } from "../../Context/createUser";

const FailedCreating = forwardRef(function Dialog({ children }, ref) {
  const { failedCreating, setFailedCreating } = useCreateUser();

  function closeDialog() {
    setFailedCreating("");
  }

  return (
    <dialog ref={ref} className="error-dialog">
      <form method="dialog">
        <h2>{failedCreating}</h2>
        <button className="close-dialog" onClick={closeDialog}>
          Close
        </button>
      </form>
    </dialog>
  );
});

export default FailedCreating;
