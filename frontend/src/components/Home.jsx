import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typewritter from "./Typewritter";
import avatarImage from "../assets/McPImg.png";

import bg1 from "../assets/portfolios/s1.jpg";
import bg2 from "../assets/portfolios/s2.jpg";
import bg3 from "../assets/portfolios/s3.jpg";
import bg4 from "../assets/portfolios/s4.jpg";
import bg5 from "../assets/portfolios/s5.jpg";

import AICopilot from "../components/AICopilot";
import { getSection } from "../state/contentStore";

const Home = () => {
  const ref = useRef(null);
  // no local canvas; global canvas is in App.jsx

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("show");
      },
      { threshold: 0.25 }
    );

    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Background GSAP box is now provided by BoxAnimation component globally

  return (
    <>
      <section
        id="Home"
        ref={ref}
        className="relative min-h-screen flex flex-col justify-center items-center fade-slide-up overflow-hidden"
      >

        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#ffffff55] to-[#ffffff10] backdrop-blur-3xl" />

        <div className="absolute inset-0 overflow-hidden -z-5">
          <img src={bg1} className="floating-img left-10 top-10" />
          <img src={bg2} className="floating-img right-16 top-32" />
          <img src={bg3} className="floating-img left-1/4 bottom-20" />
          <img src={bg4} className="floating-img right-1/3 bottom-10" />
          <img src={bg5} className="floating-img left-1/2 top-1/3" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white/30 backdrop-blur-xl shadow-xl rounded-3xl p-8 md:p-10 border border-white/20 max-w-3xl text-center"
        >
          {(() => {
            const home = getSection("home");
            const title = home?.title || "Saka Idris (McP)";
            const desc = home?.desc || "I specialize in Project Write-up, Data Analysis, Graphic Design, Computer Engineering and AI Developer/Engineer.";
            return (
              <>
          <img
            src={avatarImage}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover mx-auto mb-6 border-4 border-white/40 shadow-lg"
          />

          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-gray-900">
            {title}
          </h1>

          <h2 className="text-xl md:text-2xl font-medium text-primary mb-4">
            I'm{" "}
            <Typewritter
              words={[
                "Project Write-up",
                "Data Analysis",
                "Graphic Designer",
                "Computer Engineer",
                "Frontend Developer",
                "Backend Developer",
                "Programmer",
                "Problem Solver",
                "AI Developer",
              ]}
              delay={0.18}
              pauseTime={1500}
            />
          </h2>

          <p className="text-center text-gray-800 max-w-2xl mb-6 px-4">
            {desc}
          </p>
              </>
            );
          })()}

          <button
            onClick={() => {
              const el = document.getElementById("Work") || document.getElementById("work");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-orange-400 text-black px-10 py-3 rounded-3xl hover:bg-orange-300 transition shadow-lg"
          >
            Let's Begin
          </button>
        </motion.div>

        

      </section>
      <AICopilot />
    </>

  );
};

export default Home;
