import React, { useState } from "react";
import logo from "../../images/logoDark.png";
import "./header.scss";
import { ImSearch } from "react-icons/im";
import { FaArrowLeft } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiCartAlt } from "react-icons/bi";
import Search from "../../Product/Search.jsx";
import { useDispatch, useSelector } from "react-redux";
import UserOption from "./UserOption.jsx";
import ThemeToggle from "../../other/ThemeToggle.js";
import { HiOutlineLogout } from "react-icons/hi";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);

  const toggleMenu = () => {
    setMenuIsActive(!menuIsActive);
  };
  // logout
  const alert = useAlert();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  };

  const closeMenu = () => {
    setMenuIsActive(false);
  };

  const toggleSearch = () => {
    setSearchIsActive(!searchIsActive);
  };

  const closeSearch = () => {
    setSearchIsActive(false);
  };
  const navigate = useNavigate();

  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <a href="/" className="brand">
          <img src={logo} alt="Logo" />
        </a>
        <div className="burger" id="burger" onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
        {menuIsActive && (
          <div className="overlay" onClick={closeMenu}>
            {" "}
          </div>
        )}
        <div className={`menu ${menuIsActive ? "is-active" : ""} `} id="menu">
          <div>
            {menuIsActive && (
              <button className="crossBtn" onClick={closeMenu}>
                <ImCancelCircle />
              </button>
            )}
            <ul className="menu-inner">
              <li className="menu-item">
                <a className="menu-link" href="/" onClick={closeMenu}>
                  Home
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" href="/products" onClick={closeMenu}>
                  Products
                </a>
              </li>
              {isAuthenticated == true ? (
                <li className="menu-item">
                  <a className="menu-link" href="/orders" onClick={closeMenu}>
                    Orders
                  </a>
                </li>
              ) : (
                ""
              )}

              <li className="menu-item">
                <a className="menu-link" href="/about" onClick={closeMenu}>
                  About
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" href="/cart" onClick={closeMenu}>
                  <p>
                    <BiCartAlt className="icon cart-icon" />
                    <span class="cart-count">
                      {cartItems.length > 0 ? cartItems.length : ""}
                    </span>
                    {menuIsActive && " Cart"}
                  </p>
                </a>
              </li>
              {menuIsActive ? (
                <>
                  {" "}
                  <div className="overBtn">
                    {isAuthenticated ? (
                      <>
                        <li>
                          <button
                            onClick={() => {
                              navigate("/login");
                              closeMenu();
                            }}>
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="logOption "
                            onClick={closeMenu && Logout}>
                            logout <HiOutlineLogout />
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          onClick={() => {
                            navigate("/login");
                            closeMenu();
                          }}>
                          Login
                        </button>
                      </li>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <li>
                    <a className="menu-link " href="/login" onClick={closeMenu}>
                      <p>
                        <RiAccountCircleFill className="icon" />
                      </p>
                    </a>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <a className="logOption " onClick={closeMenu && Logout}>
                        <HiOutlineLogout />
                      </a>
                    </li>
                  )}
                  <div className="topOpt"></div>
                </>
              )}
            </ul>
          </div>
        </div>

        <span>
          <i className="bx bx-search search-toggle" onClick={toggleSearch}>
            <ImSearch />
          </i>
        </span>
        <div className={`search-block ${searchIsActive ? "is-active" : ""}`}>
          <form className="search-form">
            <span>
              <i
                className="bx bx-arrow-back search-cancel"
                onClick={closeSearch}>
                <FaArrowLeft />
              </i>
            </span>
            <Search />
          </form>
        </div>
      </nav>
      {user && user.role === "admin" ? (
        <ul className="subNav">
          <li>
            <a
              className="subNavTitle"
              href="/admin/dashboard"
              onClick={closeMenu}>
              Dashboard
            </a>
          </li>
        </ul>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
