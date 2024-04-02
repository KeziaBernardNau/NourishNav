import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <div id="whole-wheat" className="px-5">
      <nav className="navbar navbar-expand-lg d-flex justify-content-between">
        <div className="d-flex justify-content-between w-100">
        <Link
  className="navbar-brand"
  to={store.user ? "/profile" : "/"}
  style={{ fontSize: '30px', color: 'forestGreen' }}
>
  NourishNav
</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/features">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Nutrition
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Recipe">
                  Recipes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  About
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link profile-link" to="/profile">
  Profile
</Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/favorites">
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/metrics">
                      Metrics
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Log-in
                    </Link>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
