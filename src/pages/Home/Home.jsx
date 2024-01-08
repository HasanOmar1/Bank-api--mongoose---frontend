import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useBankData } from "../../Context/bankData";
import Users from "../../components/Users/Users";
import AddClientModal from "../../components/Dialog/Dialog";
import { useCreateUser } from "../../Context/createUser";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import FailedToCreateClientModal from "../../components/Dialog/FailedToCreateClientModal/FailedToCreateClientModal";

export default function Home() {
  const [data, setData] = useState([]);
  const { getUsers, sortByHighCash, sortByLowCash, fetchData } = useBankData();
  const { currentUser, setCurrentUser } = useCreateUser();
  const navigate = useNavigate();
  const dialogRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token) {
      fetchData();
    }
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
  }, []);

  useEffect(() => {
    if (getUsers) {
      setData(getUsers);
    }
  }, [getUsers]);

  function handleAddClient() {
    dialogRef.current.showModal();
  }

  function handleLogOut() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <main className="Home page">
      <div className="welcome-msg">
        <h2>
          Welcome <span className="current-user-name">{currentUser.name}</span>{" "}
          to the global bank
        </h2>
      </div>
      {getUsers.length > 0 ? (
        <>
          <div className="accounts-info">
            <button onClick={handleLogOut} className="sign-out">
              <FontAwesomeIcon icon={faChevronLeft} className="back-icon" />
              Sign out
            </button>
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
