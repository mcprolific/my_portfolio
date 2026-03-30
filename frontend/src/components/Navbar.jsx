import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/mcp.png";

const navItems = [
  { name: "Home", type: "scroll" },
  { name: "Work", type: "scroll" },
  { name: "Resume", type: "scroll" },
  { name: "About", type: "scroll" },
  { name: "Contact", type: "scroll" },
];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [location.pathname]);

  const scrollToId = (id) => {
    let el = document.getElementById(id);
    if (!el) el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToSection = (id) => {
    setActive(id);
    setIsOpen(false);

    if (location.pathname === "/") {
      scrollToId(id);
      return;
    }

    navigate("/");
    setTimeout(() => {
      scrollToId(id);
    }, 350);
  };

  const handlePageClick = (url, name) => {
    setActive(name);
    setIsOpen(false);
    navigate(url);
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isSticky ? "bg-white/70 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => {
            setActive("Home");
            setIsOpen(false);
            if (location.pathname !== "/") {
              navigate("/");
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3"
          aria-label="Go to home"
        >
          <img src={logo} alt="logo" className="h-11 w-11 rounded-full object-cover" />
          <span className="font-semibold text-lg text-gray-800">McProlific</span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = active === item.name;

            return (
              <li key={item.name}>
                {item.type === "scroll" ? (
                  <button
                    onClick={() => goToSection(item.name)}
                    className={`capitalize text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-gray-100/70"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <button
                    onClick={() => handlePageClick(item.url, item.name)}
                    className={`capitalize text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-gray-100/70"
                    }`}
                  >
                    {item.name}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl p-1 rounded"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-max-height duration-300 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            const isActive = active === item.name;

            return (
              <li key={item.name}>
                {item.type === "scroll" ? (
                  <button
                    onClick={() => goToSection(item.name)}
                    className={`w-full text-left py-2 px-3 rounded transition ${
                      isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <button
                    onClick={() => handlePageClick(item.url, item.name)}
                    className={`w-full text-left py-2 px-3 rounded transition ${
                      isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
