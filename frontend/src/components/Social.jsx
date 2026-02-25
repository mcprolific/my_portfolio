import React from "react";
import githubLogo from "../assets/githubLogo.png"; 
import linkedinLogo from "../assets/linkedinLogo.png"; 
import twitterLogo from "../assets/twitterLogo.png"; 

const Social = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/", icon: githubLogo },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/saka-idris-906a0b256", icon: linkedinLogo },
    { name: "Twitter", url: "https://x.com/prolificmcp/", icon: twitterLogo },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-center space-x-8">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-110">
            <img src={link.icon} alt={link.name} className="w-20 h-20 object-contain rounded hover:shadow-xl" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Social;
