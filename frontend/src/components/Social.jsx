import React from "react";
import githubLogo from "../assets/githubLogo.png"; 
import linkedinLogo from "../assets/linkedinLogo.png"; 
import twitterLogo from "../assets/twitterLogo.png"; 
import { getSection } from "../state/contentStore";

const Social = () => {
  const s = getSection("social") || {};
  const socialLinks = [
    { name: "GitHub", url: s.github || "https://github.com/", icon: githubLogo },
    { name: "LinkedIn", url: s.linkedin || "https://www.linkedin.com/in/saka-idris-906a0b256", icon: linkedinLogo },
    { name: "Twitter", url: s.twitter || "https://x.com/prolificmcp/", icon: twitterLogo },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto flex justify-center gap-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all"
            aria-label={link.name}
          >
            <img
              src={link.icon}
              alt={link.name}
              className="w-9 h-9 object-contain opacity-80 group-hover:opacity-100 transition"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Social;
