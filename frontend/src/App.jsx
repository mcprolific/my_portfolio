import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BoxAnimation from "./components/BoxAnimation";

import Home from "./components/Home";
import About from "./components/About";
import Resume from "./components/Resume";
import Work from "./components/Work";

import Contact from "./components/Contact";
import Social from "./components/Social";

import SeeMoreWork from "./pages/SeeMoreWork";

import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { isAuthed } from "./state/contentStore";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const RequireAuth = ({ children }) => (isAuthed() ? children : <Navigate to="/admin/login" replace />);
  return (
    <div className="min-h-screen flex flex-col relative">
      <BoxAnimation />
      <div className="relative z-10">
        {!isAdminRoute && <Navbar />}

        <main className="flex-grow">
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Resume />
                  <Work />
          
                  <Contact />
                  <Social />
                </>
              }
            />

            <Route path="/see-more-work" element={<SeeMoreWork />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
}

export default App;
