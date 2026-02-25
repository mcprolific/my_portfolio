import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Resume from "./components/Resume";
import Work from "./components/Work";

import Contact from "./components/Contact";
import Social from "./components/Social";

import SeeMoreWork from "./pages/SeeMoreWork";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
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

      <Footer />
    </div>
  );
}

export default App;
