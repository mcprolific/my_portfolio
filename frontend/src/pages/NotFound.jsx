import React from "react";
import { motion } from "framer-motion";

const NotFound = () => (
  <motion.div
    className="min-h-[60vh] flex items-center justify-center p-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center">
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        404 — Page not found
      </motion.h1>
      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Looks like you are lost.{" "}
        <a href="/" className="text-primary underline">
          Go back home
        </a>
      </motion.p>
    </div>
  </motion.div>
);

export default NotFound;
