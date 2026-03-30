import React from "react";
import { motion } from "framer-motion";
import { getSection } from "../state/contentStore";

const About = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeScaleVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const about = getSection("about") || {};

  return (
    <section id="About" className="py-20 bg-gray-50">
      <div className="container px-4">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Side - Personal Intro */}
          <motion.div variants={fadeUpVariant}>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {about.p1 || (
                <>
                  I was born in Nigeria and lived there for the younger part of my life. I enjoy working
                  with computers, programming, and using software to solve real-world problems, such as
                  auditing accounts, detecting fraud, and building websites and applications.
                </>
              )}
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {about.p2 || (
                <>
                  I have knowledge in <strong>Computer Software Development, Graphics Technology, Computer Hardware,
                  Operating Systems, and Computer Engineering</strong>.
                </>
              )}
            </p>
          </motion.div>

          {/* Right Side - Skills & Services */}
          <motion.div variants={fadeScaleVariant}>
            <h3 className="text-2xl font-semibold mb-3">Skills & Technologies:</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {(about.skills || [
                "GW Basic, QBasic, VisualBasic",
                "PHP, Python, JavaScript, React.js, Node.js, FastAPI",
                "AI Development, Data Analysis",
                "Web & Mobile Applications, School Project Write-ups",
              ]).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-3">Benefits of Hiring Me:</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {(about.benefits || [
                "Available 7 days a week",
                "Free website/software maintenance for up to a month",
                "Responsive and mobile-friendly websites",
                "SEO-friendly websites and optimization",
                "Server management and website maintenance",
              ]).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <p className="text-gray-600 font-medium">
              {about.footer || "100% customer satisfaction | Perfect 5-star reviews | Good communication (24/7)"}
            </p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-10"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
