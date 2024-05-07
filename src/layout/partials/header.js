import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ApiUrl from "../../Api/Api";
import axios from "axios";
function Header({ menudata }) {
  const location = useLocation();
  const [address, setAddress] = useState(null);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('addressData');
        if (cachedData) {
          setAddress(JSON.parse(cachedData));
        } else {
          const response = await axios.get(`${ApiUrl}/get/contactDetails`);
          setAddress(response?.data?.data);
          localStorage.setItem('HomeaddressData', JSON.stringify(response?.data?.data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <header className="site-header">
        <div className="top-header-bar">
          <div className="container">
            <div className="row flex-wrap justify-content-center justify-content-lg-between align-items-lg-center">
              <div className="col-12 col-lg-8 d-none d-md-flex flex-wrap justify-content-center justify-content-lg-start mb-3 mb-lg-0">
                <div className="header-bar-email" style={{ fontSize: "13px" }}>
                  {address ? (
                    <>
                      <i
                        className="fa fa-envelope"
                        style={{ color: "#f6c93f" }}
                      ></i>
                      <a href={`mailto:${address?.email}`}>
                        <span
                          className="__cf_email__"
                          style={{ marginLeft: "0.5rem" }}
                        >
                          {address?.email}
                        </span>
                      </a>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <div
                  className="header-bar-text align-items-center justify-content-center"
                  style={{ fontSize: "13px" }}
                >
                  {address ? (
                    <>
                      <i className="fa fa-phone" style={{ color: "#f6c93f" }}></i>
                      <a href={`tel:${address?.mobile}`} style={{ marginLeft: "0.3rem" }}>
                        {address?.mobile}
                      </a>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-4 d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
                <div className="social-icons">
                  <div className="social-icon">
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook" />
                    </a>
                  </div>
                  <div className="social-icon">
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-youtube" />
                    </a>
                  </div>
                  <div className="social-icon">
                    <a href="/" target="_blank" rel="noreferrer">
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-banner">
          <Link to="/" className="site-logo">
            <img
              src="images/all-img/banner.png"
              alt="Banner"
              style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
            />
          </Link>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light custom-menu">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse header-align-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {menudata?.map((menuItem, index) => (
                <li key={index} className={`nav-item ${menuItem.children ? "dropdown" : ""}`}>
                  {menuItem.children ? (
                    <NavLink
                      to={menuItem.url}
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {menuItem.label}
                    </NavLink>
                  ) : (
                    <Link
                      to={menuItem.url}
                      className={`nav-link ${location.pathname === menuItem.url ? "active" : ""}`}
                    >
                      {menuItem.label}
                    </Link>
                  )}
                  {menuItem.children && (
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      {menuItem.children.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.url}
                          className="dropdown-item"
                          activeclassname="active"
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
