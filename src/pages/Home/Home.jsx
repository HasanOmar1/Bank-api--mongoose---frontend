import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useBankData } from "../../Context/bankData";
import Users from "../../components/Users/Users";
import AddClientModal from "../../components/dialog/dialog";
import ErrorDialog from "../../components/Dialog/ErrorDialog";

export default function Home() {
  const [data, setData] = useState([]);
  const { getUsers, sortByHighCash, sortByLowCash } = useBankData();

  const dialogRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    if (getUsers) {
      setData(getUsers);
    }
  }, [getUsers]);

  function handleAddClient() {
    dialogRef.current.showModal();
  }

  return (
    <main className="Home page">
      <div className="welcome-msg">
        <h2>Welcome to the global bank</h2>
      </div>
      {getUsers.length > 0 ? (
        <>
          <div className="accounts-info">
            <h3 className="list-title">List of our Clients</h3>

            <div className="sort-btns">
              <button onClick={() => sortByHighCash()}>
                Sort by Highest Cash
              </button>
              <button onClick={() => sortByLowCash()}>
                Sort by Lowest Cash
              </button>
            </div>

            <div className="new-client-container">
              <button className="add-client" onClick={handleAddClient}>
                Add new Client
              </button>
            </div>
            <div className="users-container">
              <Users />
            </div>
            <AddClientModal ref={dialogRef} />
          </div>
        </>
      ) : (
        <h2>Loading data...</h2>
      )}
    </main>
  );
}
