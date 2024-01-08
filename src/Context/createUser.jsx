import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const createUserContext = createContext();

export default function CreateUserProvider({ children }) {
  const [failedCreating, setFailedCreating] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const navigate = useNavigate();

  //create acc
  const createUser = async (user) => {
    try {
      const response = await axios.post(
        `  ${import.meta.env.VITE_BASE_URL}/users/create`,
        user
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      setFailedCreating(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };
  // createUser({ name: "FirstUser", email: "wew@gmail.com", password: "Hello" });

  //login
  const loginUser = async (user) => {
    try {
      const response = await axios.post(
        `  ${import.meta.env.VITE_BASE_URL}/users/login`,
        user
      );
      if (!response) {
        setFailedCreating(`Failed to connect to server`);
      }
      console.log(response.data);
      setCurrentUser(response.data);
      navigate("/data");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      // console.log(error.response.data.message);
      setFailedCreating(error.response.data.message);
    }
  };

  //get data
  const fetchUsers = async () => {
    try {
      const config = {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await axios.get(
        `  ${import.meta.env.VITE_BASE_URL}/users`,
        {},
        config
      );
      console.log(response.data);
      setActiveUsers(response.data);
    } catch (error) {
      setFailedCreating(error.response.data.message);
      // console.log(error);
    }
  };

  return (
    <createUserContext.Provider
      value={{
        createUser,
        failedCreating,
        setFailedCreating,
        fetchUsers,
        activeUsers,
        loginUser,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </createUserContext.Provider>
  );
}

export const useCreateUser = () => useContext(createUserContext);
