import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/idimg.jpg';

const Header = () => (
    <header className="navbar navbar-expand-lg navbar-black px-3 bg-white  ">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" width="100%" height="50" className="me-2" />
        {/* <span>Student Portal</span> */}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/">🏠 Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/">Project</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/">News</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">📄 About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">📞 Contact</Link>
          </li>
        </ul>
      </div>
    </header>
);

export default Header;
