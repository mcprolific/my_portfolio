import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import work1 from "../assets/works/accounting.png";
import work2 from "../assets/works/work2.png";
import work3 from "../assets/works/work3.png";
import { getSection } from "../state/contentStore";

const Work = () => {
  const ref = useRef(null);

  const stored = getSection("work");
  const projects = stored?.projects?.length ? stored.projects : [
    {
      title: "A Smart Accounting & Project Finance Platform",
      description: "This platform helps government ministries, public institutions, private organizations, and accounting professionals manage project funds, record transactions, reconcile accounts, and generate compliant financial reports all with the support of an intelligent AI assistant.",
      image: work1,
      link: "/project-one"
    },
    {
      title: "Ogun State Aper Form",
      description: "An interactive dashboard with charts and analytics of staffs.",
      image: work2,
      link: "/project-two"
    },
    {
      title: "Multimedia Portfolio",
      description: "A webpage that showcases projects using a table, images, video, and audio.",
      image: work3,
      link: "https://sample-gallery.vercel.app/"
    },
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
    <section id="Work" ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">My Work</h2>
          <p className="text-gray-600 mt-2">Selected projects across web, data, and AI</p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-8"
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
              className="group block bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              <Link to={project.link}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-[1.02] transition"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            to="/see-more-work"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold 
                       hover:bg-orange-600 transition transform hover:scale-105"
          >
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Work;
