import React from "react";
import "./Home.css";
import { useBankData } from "../../Context/bankData";
import Users from "../../components/Users/Users";

export default function Home() {
  const { getUsers } = useBankData();
  console.log(getUsers);

  return (
    <main className="Home page">
      <div className="welcome-msg">
        <h2>Welcome to the global bank</h2>
      </div>
      <div className="accounts-info">
        <h3 className="list-title">List of our Clients</h3>
        {getUsers.length > 0 ? (
          <>
            <Users />
          </>
        ) : (
          <h2>Loading data...</h2>
        )}
      </div>
    </main>
  );
}
