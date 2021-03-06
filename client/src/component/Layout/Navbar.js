import React from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuth, signout } from "../auth/helpers";

const Navbar = ({ history }) => {
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        {isAuth() && isAuth().role === "admin" && (
          <Link className="nav-link" to="/admin">
            {isAuth().name}
          </Link>
        )}
        {isAuth() && isAuth().role === "subscriber" && (
          <Link className="nav-link" to="/subscriber">
            {isAuth().name}
          </Link>
        )}
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/"
          onClick={() => {
            signout(() => {
              history.push("/");
            });
          }}
        >
          Signout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signin">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          {isAuth() ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};
export default withRouter(Navbar);
