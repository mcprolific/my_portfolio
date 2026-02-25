import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Typewritter = ({ words = [], delay = 450, pauseTime = 4000 }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex % words.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, delay, pauseTime]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={wordIndex + "-" + displayText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        {displayText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="ml-1"
        >
          |
        </motion.span>
      </motion.span>
    </AnimatePresence>
  );
};

export default Typewritter;
