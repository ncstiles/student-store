import * as React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  return (
    <nav id="navbar" className="navbar">
      <div className="navbar-contents">
        <Logo />
        <div className="page-links">
          <a onClick={() => nav("/")} href="#home-top">
            <span className="nav-text">Home</span>
          </a>
          <a onClick={() => nav("/orders")} href="#order-history">
            <span className="nav-text">Previous Orders</span>
          </a>
          <a onClick={() => nav("/")} href="#about">
            <span className="nav-text">About</span>
          </a>
          <a onClick={() => nav("/")} href="#contact">
            <span className="nav-text">Contact</span>
          </a>
          <a onClick={() => nav("/")} href="#content-top">
            <span className="nav-text">Browse</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
