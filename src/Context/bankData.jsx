import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const bankDataContext = createContext();

export default function BankDataProvider({ children }) {
  const [getUsers, setGetUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //  GET
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank"
      );
      // console.log(response.data);
      setGetUsers(response.data);
    } catch (error) {
      console.log(`Error fetching data`, error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank/${id}`
      );
      console.log(response.data);
      //   setGetUserById(response.data);
    } catch (error) {
      console.log(`Error fetching data`, error);
    }
  };

  const filterCashByMoreThan = async (cash) => {
    try {
      const response = await axios.get(
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank/filter-cash/more-than?cash=${cash}`
      );
      console.log(response.data);
      //   setGetCashMoreThan(response.data);
    } catch (error) {
      console.log(`Error fetching data`, error);
    }
  };

  const filterCashByLessThan = async (cash) => {
    try {
      const response = await axios.get(
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank/filter-cash/less-than?cash=${cash}`
      );
      console.log(response.data);
      //   setGetCashMoreThan(response.data);
    } catch (error) {
      console.log(`Error fetching data`, error);
    }
  };

  // POST - CREATE

  const createUser = async (user) => {
    try {
      const response = await axios.post(
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank`,
        user
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error creating user`, error);
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
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank/deposit-cash/${userId}?cash=${amount}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error depositing cash`, error);
    }
  };
  // depositCash(1, 10);

  const updateCredit = async (userId, credit) => {
    try {
      const response = await axios.put(
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank/update-credit/${userId}?credit=${credit}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error updating credit`, error);
    }
  };
  // updateCredit(1, 800);

  const withdrawMoney = async (userId, money) => {
    try {
      const response = await axios.put(
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank/withdraw/${userId}?money=${money}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error updating credit`, error);
    }
  };
  // withdrawMoney(1, 10);

  const transferMoney = async (senderId, recipientId, money) => {
    try {
      const response = await axios.put(
        `https://fine-gray-giraffe-tie.cyclic.app/api/v1/bank/transfer/from/${senderId}/to/${recipientId}?money=${money}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error updating credit`, error);
    }
  };
  // transferMoney(1, 2, 1);

  return (
    <bankDataContext.Provider
      value={{
        getUsers,
        getUserById,
        filterCashByMoreThan,
        filterCashByLessThan,
        createUser,
        depositCash,
        updateCredit,
        withdrawMoney,
        transferMoney,
      }}
    >
      {children}
    </bankDataContext.Provider>
  );
}

export const useBankData = () => useContext(bankDataContext);
