import React, { useEffect, useRef, useState } from "react";
import "./UserDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useBankData } from "../../Context/bankData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Operations from "../../components/Operations/Operations";

export default function UserDetails() {
  const [data, setData] = useState({});
  const { getUsers } = useBankData();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const user = getUsers.find((info) => info.id === +id);
    if (user) {
      setData(user);
    } else {
      setData(null);
    }
  }, [getUsers, id]);

  return (
    <main className="UserDetails page">
      {data ? (
        <>
          <div className="name">
            <h1>{data.name}</h1>
          </div>
          <div className="back-btns">
            <button className="back-btn home" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faChevronLeft} className="back-icon" />
              Home
            </button>
          </div>

          <div className="info">
            <div className="id">ID: {data.id}</div>
            <div className="email">Email: {data.email}</div>
            <div className="cash">Cash: {data.cash}</div>
            <div className="credit">Credit: {data.credit}</div>
          </div>
          <Operations />
        </>
      ) : (
        <div className="not-found">
          <button
            className="not-found-back back-btn "
            onClick={() => navigate("/")}
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
