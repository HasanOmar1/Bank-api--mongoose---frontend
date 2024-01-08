import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const bankDataContext = createContext();

export default function BankDataProvider({ children }) {
  const [getUsers, setGetUsers] = useState([]);
  const [currentClient, setCurrentClient] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  //  GET
  const fetchData = async () => {
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_BASE_URL}/bank`
      );
      // console.log(response.data);
      setGetUsers(response.data);
    } catch (error) {
      // console.log(`Error fetching data`, error);
      setErrorMsg(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  const filterCashByMoreThan = async (cash) => {
    try {
      const response = await axios.get(
        `   ${
          import.meta.env.VITE_BASE_URL
        }/bank/filter-cash/more-than?cash=${cash}`
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      // console.log(`Error fetching data`, error);
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };

  const filterCashByLessThan = async (cash) => {
    try {
      const response = await axios.get(
        ` ${
          import.meta.env.VITE_BASE_URL
        }/bank/filter-cash/less-than?cash=${cash}`
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      // console.log(`Error fetching data`, error);
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };

  // POST - ADD CLIENT

  const addClient = async (user) => {
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_BASE_URL}/bank`,
        user
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      // console.log(error.response.data.message);
    }
  };

  // addClient({
  //   id: getUsers.length + 1,
  //   name: "Shrek",
  //   email: "shrek@gmail.com",
  //   cash: 200, default = 0
  //   credit: 400, default = 0
  //   isActive: false,
  // });

  // Update - PUT
  const depositCash = async (userId, amount) => {
    try {
      const config = {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      // console.log(config.headers);
      const response = await axios.put(
        ` ${
          import.meta.env.VITE_BASE_URL
        }/bank/deposit-cash/${userId}?cash=${amount}`,
        {},
        config
      );
      fetchData();

      // console.log(response.data);
      setErrorMsg("Money has been deposited");
    } catch (error) {
      // console.log(`Error depositing cash`, error);
      setErrorMsg(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };
  // depositCash(1, 10);

  const updateCredit = async (userId, credit) => {
    try {
      const config = {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await axios.put(
        ` ${
          import.meta.env.VITE_BASE_URL
        }/bank/update-credit/${userId}?credit=${credit}`,
        {},
        config
      );
      fetchData();
      console.log(response.data);
      setErrorMsg("Credit has been updated");
    } catch (error) {
      // console.log(`Error updating credit`, error);
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };
  // updateCredit(1, 800);

  const withdrawMoney = async (userId, money) => {
    try {
      const config = {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await axios.put(
        ` ${
          import.meta.env.VITE_BASE_URL
        }/bank/withdraw/${userId}?money=${money}`,
        {},
        config
      );
      fetchData();
      setErrorMsg("Money has been withdrawn");

      console.log(response.data);
    } catch (error) {
      // console.log(`Error updating credit`, error);
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };
  // withdrawMoney(1, 10);

  const transferMoney = async (senderId, recipientId, money) => {
    try {
      const config = {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await axios.put(
        `   ${
          import.meta.env.VITE_BASE_URL
        }/bank/transfer/from/${senderId}/to/${recipientId}?money=${money}`,
        {},
        config
      );
      fetchData();
      setErrorMsg("Money has been transferred");

      console.log(response.data);
    } catch (error) {
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);

      // console.log(`Error sending money`, error);
    }
  };
  // transferMoney(1, 2, 1);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `   ${import.meta.env.VITE_BASE_URL}/bank/${userId}`
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };

  const sortByLowCash = async () => {
    try {
      const response = await axios.get(
        `   ${import.meta.env.VITE_BASE_URL}/bank/sort-low`
      );
      setGetUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortByHighCash = async () => {
    try {
      const response = await axios.get(
        `   ${import.meta.env.VITE_BASE_URL}/bank/sort-high`
      );
      setGetUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function getUserById(id) {
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_BASE_URL}/bank/${id}`
      );
      console.log(response.data);
      setCurrentClient(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <bankDataContext.Provider
      value={{
        getUsers,
        fetchData,
        filterCashByMoreThan,
        filterCashByLessThan,
        addClient,
        depositCash,
        updateCredit,
        withdrawMoney,
        transferMoney,
        errorMsg,
        setErrorMsg,
        deleteUser,
        sortByLowCash,
        sortByHighCash,
        getUserById,
        currentClient,
        setCurrentClient,
      }}
    >
      {children}
    </bankDataContext.Provider>
  );
}

export const useBankData = () => useContext(bankDataContext);
