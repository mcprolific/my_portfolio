import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Work from './components/Work';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import About from './components/About';
import Social from './components/Social'; 
import Contact from './components/Contact';


const App = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Work />
      <Portfolio />
      <Resume />
      <About />
      <Social />
      <Contact />
    </>
  );
};

export default App;
