import React from "react";
import "./Header.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  header: string;
}

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("jwtToken");
      navigate('/');
    } catch (error) {
      //TODOD: handle error...
    }
  };
  return (
    <div className="header">
      <h2>{"BOLIGADMIN.DK"}</h2>
      <div></div>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Header;
