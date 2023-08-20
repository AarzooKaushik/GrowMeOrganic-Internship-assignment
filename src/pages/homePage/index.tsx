import React from "react";
import UserTable from "../../components/userTable";
import Department from "../../components/departments";
import {useNavigate } from "react-router-dom";
import './style.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };
  return (
    <>
    <div className="navBar">
      <button onClick={logoutHandler}>Logout</button>
    </div>
    <div className="home-container">
      <UserTable />
      <Department/>
    </div>
    </>
  );
};

export default HomePage;