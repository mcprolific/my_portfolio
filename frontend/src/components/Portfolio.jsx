import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import portfolio1 from "../assets/portfolios/s1.jpg";
import portfolio2 from "../assets/portfolios/s2.jpg";
import portfolio3 from "../assets/portfolios/s3.jpg";

const Portfolio = () => {
  const ref = useRef(null);

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

  const projects = [
    {
      title: "Portfolio 1",
      description: "A short description of portfolio item 1.",
      image: portfolio1,
      link: "/portfolio/1"
    },
    {
      title: "Portfolio 2",
      description: "A short description of portfolio item 2.",
      image: portfolio2,
      link: "/portfolio/2"
    },
    {
      title: "Portfolio 3",
      description: "A short description of portfolio item 3.",
      image: portfolio3,
      link: "/portfolio/3"
    },
  ];

  return (
    <section id="portfolio" ref={ref} className="py-20 bg-white fade-slide-up">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">Portfolio</h2>
          <p className="text-gray-600 mt-2">Curated highlights from recent builds</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {projects.map((project, i) => (
            <Link to={project.link} key={i} className="group block bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-[1.02] transition"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/portfolio-more" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
