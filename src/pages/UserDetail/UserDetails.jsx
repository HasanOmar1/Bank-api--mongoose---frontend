import React, { useEffect } from "react";
import "./UserDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useBankData } from "../../Context/bankData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Operations from "../../components/Operations/Operations";

export default function UserDetails() {
  const { getUserById, currentClient } = useBankData();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById(id);
  }, []);

  return (
    <main className="UserDetails page">
      {currentClient ? (
        <>
          <div className="name">
            <h1>{currentClient.name}</h1>
          </div>
          <div className="back-btns">
            <button className="back-btn home" onClick={() => navigate("/data")}>
              <FontAwesomeIcon icon={faChevronLeft} className="back-icon" />
              Home
            </button>
          </div>

          <div className="info">
            <div className="id">ID: {currentClient.id}</div>
            <div className="email">Email: {currentClient.email}</div>
            <div className="cash">Cash: {currentClient.cash}</div>
            <div className="credit">Credit: {currentClient.credit}</div>
          </div>
          <Operations />
        </>
      ) : (
        <div className="not-found">
          <button
            className="not-found-back back-btn "
            onClick={() => navigate("/data")}
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
