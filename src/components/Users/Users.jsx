import React, { useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { useBankData } from "../../Context/bankData";

export default function Users() {
  const { getUsers } = useBankData();

  return (
    <div className="Users">
      {getUsers.map((info) => {
        return (
          <div className="data" key={info.id}>
            <p>
              ID: <span className="info">{info.id}</span>
            </p>
            <hr className="line" />
            <p>
              Name: <span className="info">{info.name}</span>
            </p>
            <hr className="line" />
            <p>
              Email: <span className="info">{info.email}</span>
            </p>
            <hr className="line" />
            <p>
              Cash:<span className="info">{info.cash}</span>
            </p>
            <hr className="line" />
            <p>
              Credit: <span className="info">{info.credit}</span>
            </p>
            <hr className="line" />
            <p>
              Activision Status:
              <span
                className={`active ${info.isActive === true ? "green" : "red"}`}
              >
                {info.isActive.toString()}
              </span>
            </p>
            <hr className="line" />
            <Link to={`${info.id}`} state={info}>
              <button>More Info</button>
            </Link>
          </div>
        );
      })}
      {/* <div className="data">
        <p>
          ID: <span className="info">{id}</span>
        </p>
        <hr className="line" />
        <p>
          Name: <span className="info">{name}</span>
        </p>
        <hr className="line" />
        <p>
          Email: <span className="info">{email}</span>
        </p>
        <hr className="line" />
        <p>
          Cash:<span className="info">{cash}</span>
        </p>
        <hr className="line" />
        <p>
          Credit: <span className="info">{credit}</span>
        </p>
        <hr className="line" />
        <p>
          Activision Status:
          <span className={`active ${isActive === true ? "green" : "red"}`}>
            { isActive.toString() }
          </span>
        </p>
        <hr className="line" />
        <Link to={to} state={state}>
          <button>More Info</button>
        </Link>
      </div> */}
    </div>
  );
}
