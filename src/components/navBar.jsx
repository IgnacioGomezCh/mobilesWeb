import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-3">
      <Link className="navbar-brand" to="/restaurants">
        RestauranTEC
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/restaurants">
            Restaurantes
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Clientes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
