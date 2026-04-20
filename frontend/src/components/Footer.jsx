import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-8 px-4 animate-fade-in-up"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm">
            Email:{" "}
            <a href="mailto:indexprolific@gmail.com" className="text-primary hover:text-orange-400 transition underline-offset-2 hover:underline">
              indexprolific@gmail.com
            </a>
          </p>
          <p className="text-sm">
            Phone:{" "}
            <a href="tel:+2348133274250" className="text-primary hover:text-orange-400 transition underline-offset-2 hover:underline">
              +234 813 327 4250
            </a>
          </p>
        </div>

        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm font-medium">Follow us:</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <a href="https://web.facebook.com/IndexMcProlific/" className="text-primary hover:text-orange-400 transition underline-offset-2 hover:underline">Facebook</a>
            <a href="https://x.com/prolificmcp" className="text-primary hover:text-orange-400 transition underline-offset-2 hover:underline">Twitter</a>
            <a href="https://www.linkedin.com/in/saka-idris-906a0b256" className="text-primary hover:text-orange-400 transition underline-offset-2 hover:underline">LinkedIn</a>
            <a href="https://wa.me/2348133274250" className="text-primary hover:text-orange-400 transition underline-offset-2 hover:underline" target="_blank" rel="noreferrer">Chat</a>
            <a href="https://www.nairaland.com/mcprolific" className="text-primary hover:text-orange-400 transition underline-offset-2 hover:underline">Nairaland</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; 2026{" "}
        <a href="https://www.ncc.gov.ng/" className="text-primary hover:text-orange-400 underline-offset-2 hover:underline">McP</a>
        . All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
