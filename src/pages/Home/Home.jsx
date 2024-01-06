import React, { useRef } from "react";
import "./Home.css";
import { useBankData } from "../../Context/bankData";
import Users from "../../components/Users/Users";
import AddClientModal from "../../components/dialog/dialog";

export default function Home() {
  const { getUsers } = useBankData();
  // console.log(getUsers);

  const dialogRef = useRef();

  function handleAddClient() {
    dialogRef.current.showModal();
  }

  return (
    <main className="Home page">
      <div className="welcome-msg">
        <h2>Welcome to the global bank</h2>
      </div>
      <div className="accounts-info">
        <h3 className="list-title">List of our Clients</h3>
        <div className="new-client-container">
          <button className="add-client" onClick={handleAddClient}>
            Add new Client
          </button>
        </div>
        {getUsers.length > 0 ? (
          <div className="users-container">
            <Users />
          </div>
        ) : (
          <h2>Loading data...</h2>
        )}
        <AddClientModal ref={dialogRef} />
      </div>
    </main>
  );
}
