import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const bankDataContext = createContext();

export default function BankDataProvider({ children }) {
  const [getUsers, setGetUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  //  GET
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank"
      );
      // console.log(response.data);
      setGetUsers(response.data);
    } catch (error) {
      // console.log(`Error fetching data`, error);
      setErrorMsg(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank/${id}`
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      // console.log(`Error fetching data`, error);
      setErrorMsg(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const filterCashByMoreThan = async (cash) => {
    try {
      const response = await axios.get(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank/filter-cash/more-than?cash=${cash}`
      );
      console.log(response.data);
      fetchData();
      //   setGetCashMoreThan(response.data);
    } catch (error) {
      // console.log(`Error fetching data`, error);
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };

  const filterCashByLessThan = async (cash) => {
    try {
      const response = await axios.get(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank/filter-cash/less-than?cash=${cash}`
      );
      console.log(response.data);
      fetchData();
      //   setGetCashMoreThan(response.data);
    } catch (error) {
      // console.log(`Error fetching data`, error);
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };

  // POST - CREATE

  const createUser = async (user) => {
    try {
      const response = await axios.post(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank`,
        user
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      // console.log(`Error creating user`, error);
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };

  // createUser({
  //   id: getUsers.length + 1,
  //   name: "Shrek",
  //   email: "shrek@gmail.com",
  //   cash: 200,
  //   credit: 400,
  //   isActive: false,
  // });

  // Update - PUT
  const depositCash = async (userId, amount) => {
    try {
      const response = await axios.put(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank/deposit-cash/${userId}?cash=${amount}`
      );
      await fetchData();
      console.log(response.data);
    } catch (error) {
      // console.log(`Error depositing cash`, error);
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };
  // depositCash(1, 10);

  const updateCredit = async (userId, credit) => {
    try {
      const response = await axios.put(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank/update-credit/${userId}?credit=${credit}`
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      // console.log(`Error updating credit`, error);
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };
  // updateCredit(1, 800);

  const withdrawMoney = async (userId, money) => {
    try {
      const response = await axios.put(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank/withdraw/${userId}?money=${money}`
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      // console.log(`Error updating credit`, error);
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };
  // withdrawMoney(1, 10);

  const transferMoney = async (senderId, recipientId, money) => {
    try {
      const response = await axios.put(
        `  https://bank-api-backend-using-mongoose.onrender.com/api/v1/bank/transfer/from/${senderId}/to/${recipientId}?money=${money}`
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);

      // console.log(`Error sending money`, error);
    }
  };
  // transferMoney(1, 2, 1);

  return (
    <bankDataContext.Provider
      value={{
        getUsers,
        fetchData,
        getUserById,
        filterCashByMoreThan,
        filterCashByLessThan,
        createUser,
        depositCash,
        updateCredit,
        withdrawMoney,
        transferMoney,
        errorMsg,
        setErrorMsg,
      }}
    >
      {children}
    </bankDataContext.Provider>
  );
}

export const useBankData = () => useContext(bankDataContext);
