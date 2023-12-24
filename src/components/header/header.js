import React from "react";
import "./header.css";
import bookIcon from "../Asserts/book.svg";
import cartIcon from "../Asserts/cart.svg";
import personIcon from "../Asserts/person-circle.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart.cartItems);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUser = storedUserInfo.find((user) => user.isLoggedIn);

  let user_Id;

  if (loggedInUser) {
    user_Id = loggedInUser.userId;
  } else {
    alert("No user is logged in");
  }
  
  const handleLogout = (e) => {
    e.preventDefault();
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
    const updatedUsers = storedUserInfo.map((user) => ({
      ...user,
      isLoggedIn: false,
    }));
    localStorage.setItem("userInfo", JSON.stringify(updatedUsers));
    navigate("/");
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className={`navbar-brand d-flex align-items-center`} href="/books">
            <img
              src={bookIcon}
              width="32"
              height="30"
              className="d-inline-block align-top m-1"
              alt=""
            />
            <span className="book-store-name">Book Store</span>
          </a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
          <ul className="nav justify-content-end m-1 d-flex align-items-center">
            <li className="nav-item">
              <a
                className="navbar-brand position-relative"
                href="/cart"
                data-toggle="tooltip"
                title={`Cart (${cart.length})`}
              >
                <img
                  src={cartIcon}
                  width="32"
                  height="32"
                  className={`d-inline-block align-top`}
                  alt=""
                />
                <span className="position-absolute top-30 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle text-secondary`}
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={personIcon}
                  width="32"
                  height="32"
                  className="d-inline-block align-top"
                  alt=""
                />
              </a>
              <div
                className="dropdown-menu drop-down-box"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
                <a className="dropdown-item" href="/orderHistory">
                  Order History
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;