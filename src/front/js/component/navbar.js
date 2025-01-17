import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import "../../styles/navbar.css";
import logo from "../../img/logo.png";

export const NavbarComponent = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-nav">
        <div className="nav-button-container">
          <Link to="/" className="nav-button pink-button">
            Productos
          </Link>
          <Link to="/informaciones" className="nav-button pink-button">
            Informaciones
          </Link>
          <Link to="/contacto" className="nav-button pink-button">
            Contacto
          </Link>
        </div>

        <div className="navbar-cart">
          <Link to="/carrito" className="cart-link">
            <span>Carrito</span>
            <FiShoppingCart className="cart-icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
