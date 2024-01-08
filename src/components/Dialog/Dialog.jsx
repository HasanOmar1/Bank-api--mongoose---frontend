import React, { useRef, useState } from "react";
import "./Dialog.css";
import { forwardRef } from "react";
import { useBankData } from "../../Context/bankData";
import FailedToCreateClientModal from "./FailedToCreateClientModal/FailedToCreateClientModal";

const dialogModal = forwardRef(function Dialog({ children }, ref) {
  const [emailExists, setEmailExists] = useState();
  const { addClient, getUsers } = useBankData();

  const nameRef = useRef();
  const emailRef = useRef();
  const cashRef = useRef();
  const creditRef = useRef();
  const statusRef = useRef();

  const getIdsOfUsers = getUsers.map((user) => user.id);
  const sortedIds = getIdsOfUsers.sort((a, b) => b - a);

  function handleCreateClient() {
    const findEmail = getUsers.map(
      (data) => data.email === emailRef.current.value
    );
    const checkIfIncludes = findEmail.includes(true);
    setEmailExists(checkIfIncludes);

    if (
      nameRef.current.value.length !== 0 &&
      emailRef.current.value.length !== 0
    ) {
      addClient({
        id: sortedIds[0] + 1,
        name: nameRef.current.value,
        email: emailRef.current.value,
        cash: cashRef.current.value === "" ? 0 : cashRef.current.value,
        credit: creditRef.current.value === "" ? 0 : creditRef.current.value,
        isActive: statusRef.current.checked === true ? true : false,
      });
    }
  }

  return (
    <dialog ref={ref} className="create-dialog">
      <form method="dialog">
        <div className="input-container">
          {emailExists && (
            <FailedToCreateClientModal>
              Email already Used
            </FailedToCreateClientModal>
          )}
          <input type="text" placeholder="Name" ref={nameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="number" placeholder="Cash" ref={cashRef} />
          <input type="number" placeholder="Credit" ref={creditRef} />
          <div className="active-status">
            <label htmlFor="activisionStatus">Activision status</label>
            <input type="checkbox" id="activisionStatus" ref={statusRef} />
          </div>
        </div>
        <button className="close-dialog" onClick={handleCreateClient}>
          Create
        </button>
        <button className="x">X</button>
      </form>
    </dialog>
  );
});

export default dialogModal;
