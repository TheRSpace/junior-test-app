import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../assets/Navbar.scss";
import logo from "../assets/logo.svg";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to={"/"} className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} className="navbar-logo-img" alt="logo" onClick={closeMobileMenu} />
          Junior Test App
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink to={"/"} className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
              HOME
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/add/products"} className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
              ADD
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
