import React, { useState } from "react";
import "./Users.css";

export default function Users({ id, name, email, cash, credit, isActive }) {
  return (
    <div className="Users">
      <div className="data">
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
            {isActive.toString()}
          </span>
        </p>
        <hr className="line" />
        <button>More Info</button>
      </div>
    </div>
  );
}
