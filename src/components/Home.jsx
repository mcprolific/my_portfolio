import React from 'react';
import Typewritter from './Typewritter';
import { motion } from 'framer-motion';
import avatarImage from '../assets/human.png'; 

const Home = () => {
  return (
    <section id="home" className="templatemo-home py-5">
      <div className="container">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-lg-8 col-md-10">

            {/* Profile Avatar */}
            <motion.img
              src={avatarImage}
              alt="Saka Idris Profile"
              className="img-fluid rounded-circle mb-4"
              style={{ width: '140px', height: '140px', objectFit: 'cover' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Heading */}
            <motion.h1
              className="tm-home-title fw-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Saka Idris (McP)
            </motion.h1>

            {/* Typewriter Subtitle */}
            <h2 className="tm-home-subtitle mb-4">
              I'm <span className="text-primary">
                <Typewritter
                  words={[
                    'Project-Write-up',
                    'Data-Analysis',
                    'Graphic-Designer',
                    'Computer-Engineer',
                    'Front-End-Developer',
                    'Back-End-Developer',
                    'Programmer',
                    'Problem-Solver'
                  ]}
                  delay={0.08}
                  pauseTime={1500}
                />
              </span>
            </h2>

            {/* Description */}
            <p className="lead mb-4 px-md-4">
              I specialize in <strong>Project Write-up</strong>, <strong>Data Analysis</strong>, <strong>Graphic Design</strong>, and <strong>Computer Engineering</strong>. I develop full-scale solutions as a <strong>Front-End</strong> and <strong>Back-End Developer</strong>, delivering modern, responsive experiences for both <strong>Web</strong> and <strong>Mobile</strong> platforms.
            </p>

            {/* CTA Button */}
            <motion.a
              href="#work"
              className="btn btn-primary btn-lg tm-view-more-btn"
              whileHover={{ scale: 1.05 }}
              aria-label="Let's Begin"
            >
              Let's Begin
            </motion.a>

            {/* Social Icons */}
            <div className="mt-4">
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="me-3 text-dark">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="https://github.com/mcprolific" target="_blank" rel="noreferrer" className="me-3 text-dark">
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a href="mailto:indexprolific@gmail.com" className="text-dark">
                <i className="fas fa-envelope fa-lg"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
