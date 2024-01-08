import React, { useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { useBankData } from "../../Context/bankData";

export default function Users() {
  const { getUsers, deleteUser } = useBankData();

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
            <Link to={`/data/${info.id}`} state={info}>
              <button>More Info</button>
            </Link>

            <hr className="line" />
            <h4 className="delete-user" onClick={() => deleteUser(info.id)}>
              X
            </h4>
          </div>
        );
      })}
    </div>
  );
}
