import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import portfolio1 from "../assets/works/work1.png";
import portfolio2 from "../assets/works/work2.png";
import portfolio3 from "../assets/works/work3.png";

const SeeMoreWork = () => {
  const ref = useRef(null);

  const projects = [
    { title: "My WebSite", description: "Images description of My WebSite", image: portfolio1, link: "/portfolio/1" },
    { title: "Ogun State Aper Form", description: "An interactive dashboard with charts and analytics of staffs.", image: portfolio2, link: "/portfolio/2" },
    { title: "Multimedia Portfolio", description: "A webpage that showcases projects using a table, images, video, and audio.", image: portfolio3, link: "#" },
    // { title: "Contact-Form", description: "Detailed description of project 4.", image: portfolio4, link: "/portfolio/4" },
    // { title: "Creative Project 5", description: "Detailed description of project 5.", image: portfolio5, link: "/portfolio/5" },
    // { title: "Creative Project 6", description: "Detailed description of project 6.", image: portfolio6, link: "/portfolio/6" },
    // { title: "Creative Project 7", description: "Detailed description of project 7.", image: portfolio7, link: "/portfolio/7" },
    // { title: "Creative Project 8", description: "Detailed description of project 8.", image: portfolio8, link: "/portfolio/8" },
    // { title: "Creative Project 9", description: "Detailed description of project 9.", image: portfolio9, link: "/portfolio/9" },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">My Full Portfolio</h1>
          <p className="text-gray-600">Explore more of my design and development work.</p>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              <Link to={project.link}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeeMoreWork;
