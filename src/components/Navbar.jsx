import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import logoImage from '../assets/idimg.jpg';

// Ensure Bootstrap JS is loaded (for Collapse)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const navItems = ['home', 'work', 'portfolio', 'resume', 'about', 'contact'];

// Hook to control sticky visibility
const useStickyNav = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible;
};

const Navbar = () => {
  const isSticky = useStickyNav();

  // Toggle Collapse manually on hamburger click
  const toggleMenu = () => {
    const menu = document.getElementById('rock-navigation');
    const collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(menu);
    if (menu.classList.contains('show')) {
      collapseInstance.hide();
    } else {
      collapseInstance.show();
    }
  };

  // Auto-close menu on nav link click (mobile only)
  const handleNavClick = () => {
    const menu = document.getElementById('rock-navigation');
    if (menu?.classList.contains('show')) {
      const collapseInstance = window.bootstrap.Collapse.getInstance(menu);
      if (collapseInstance) collapseInstance.hide();
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top shadow-sm transition ${
        isSticky ? 'bg-white opacity-100' : 'bg-transparent opacity-0 pointer-events-none'
      }`}
    >
      <div className="container">
        <a className="navbar-brand fw-bold fs-3 text-dark" href="#">
          <img src={logoImage} alt="Logo" width="100%" height="50" className="me-2" />
          {/* McProlific Tech */}
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="rock-navigation">
          <ul className="navbar-nav ms-auto text-uppercase">
            {navItems.map((item) => (
              <li className="nav-item" key={item}>
                <Link
                  activeClass="active"
                  to={item}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link fw-bold text-dark"
                  onClick={handleNavClick}
                >
                  {item.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
