import React from "react";
import "./UserDetails.css";
import { useLocation } from "react-router-dom";

export default function UserDetails() {
  const { state } = useLocation();
  console.log(`state : `, state);

  return <main className="UserDetails page">UserDetail</main>;
}
