import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaDatabase } from "react-icons/fa";
import resumePDF from "../assets/CV/CV_Saka_Idris_Ajayi.pdf";
import { getSection } from "../state/contentStore";

const Resume = () => {
  const defaultItems = [
    {
      title: "Frontend Developer",
      icon: <FaReact className="text-blue-600 w-6 h-6" />,
      description: "Experience with React, PHP Script, and building responsive websites.",
      skills: [
        { name: "HTML5 & CSS3", level: 92 },
        { name: "PHP Script", level: 99 },
        { name: "JavaScript", level: 81 },
        { name: "React", level: 61 },
        { name: "Bootstrap", level: 67 },
        { name: "Tailwind CSS", level: 43 },
      ],
    },
    {
      title: "Backend Developer",
      icon: <FaNodeJs className="text-green-600 w-6 h-6" />,
      description: "Experience with Node.js, Express, FastAPI, and building REST APIs.",
      skills: [
        { name: "Node.js", level: 93 },
        { name: "Express", level: 91 },
        { name: "FastAPI", level: 60 },
        { name: "MongoDB", level: 96 },
      ],
    },
    {
      title: "Data Analyst",
      icon: <FaPython className="text-yellow-600 w-6 h-6" />,
      description: "Experience in Python, SQL, and data visualization tools.",
      skills: [
        { name: "Python", level: 64 },
        { name: "SQL", level: 77 },
        { name: "Power BI", level: 32 },
        { name: "Excel", level: 99 },
        { name: "Data Cleaning", level: 94 },
        { name: "Statistical Analysis", level: 100 },
      ],
    },
    {
      title: "AI Developer",
      icon: <FaDatabase className="text-purple-600 w-6 h-6" />,
      description: "Developing and deploying AI models using Python, performing data transformation, and implementing automation solutions.",
      skills: [
        { name: "Machine Learning", level: 39 },
        { name: "Deep Learning", level: 26 },
        { name: "NLP (Transformers)", level: 48 },
        { name: "Computer Vision", level: 73 },
        { name: "Annotations", level: 89 },
        { name: "Model Evaluation", level: 50 },
      ],
    },
  ];
  const store = getSection("resume");
  const resumeItems = store?.items?.length ? store.items : defaultItems;

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="Resume" className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-10">
          <motion.h2
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Resume
          </motion.h2>
          <p className="text-gray-600 mt-2">Experience snapshot and skill levels</p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {resumeItems.map((item, index) => (
            <motion.div key={index} className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2" variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              {/* Skills */}
              {item.skills.map((skill, i) => (
                <div key={i} className="mb-3">
                  <p className="text-gray-700 font-semibold">{skill.name}</p>
                  <div className="w-full bg-gray-300 h-2 rounded">
                    <div
                      className="bg-orange-500 h-2 rounded"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Download Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href={resumePDF}
            target="_blank"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
