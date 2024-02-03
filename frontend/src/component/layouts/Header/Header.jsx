import React, { useState } from "react";
import logo from "../../images/logoDark.png";
import "./header.scss";
import { ImSearch } from "react-icons/im";
import { FaArrowLeft } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiCartAlt } from "react-icons/bi";
import Search from "../../Product/Search.jsx";
import { useSelector } from "react-redux";
import UserOption from "./UserOption.jsx";
import ThemeToggle from "../../other/ThemeToggle.js";
const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [menuIsActive, setMenuIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);

  const toggleMenu = () => {
    setMenuIsActive(!menuIsActive);
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
        {menuIsActive && <div className="overlay" onClick={closeMenu}></div>}
        <div className={`menu ${menuIsActive ? "is-active" : ""}`} id="menu">
          <div>
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
              <li className="menu-item">
                <a className="menu-link" href="/contact" onClick={closeMenu}>
                  Contact
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" href="/about" onClick={closeMenu}>
                  About
                </a>
              </li>
              <li>
                <a className="menu-link " href="/login" onClick={closeMenu}>
                  <p>
                    <RiAccountCircleFill className="icon" />
                  </p>
                </a>
              </li>
              {/* <li>
              <ThemeToggle />
            </li> */}
              <div className="topOpt">
                {/* <li className="menu-item">
                {isAuthenticated ? (
                  <UserOption />
                ) : (
                  <a className="menu-link " href="/login" onClick={closeMenu}>
                    <p>
                      <RiAccountCircleFill className="icon" />
                    </p>
                  </a>
                )}
              </li> */}
                <li className="menu-item">
                  <a className="menu-link" href="/cart" onClick={closeMenu}>
                    <p>
                      <BiCartAlt className="icon" />
                    </p>
                  </a>
                </li>
              </div>
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
      <nav>
        <div>
          {isAuthenticated ? (
            <ul className="menu-inner">
              <li className="menu-item">
                <a className="menu-link" href="/" onClick={closeMenu}>
                  Dashboard
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" href="/products" onClick={closeMenu}>
                  Orders
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" href="/contact" onClick={closeMenu}>
                  Profile
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link" href="/about" onClick={closeMenu}>
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
