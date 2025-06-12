"use client";

import React, { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onCorrect(): void;
}

export const QuizImage: FC<Props> = ({ onCorrect }) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const options = [
    { label: "A cat sitting on a sofa", correct: false },
    { label: "A man in a blue suit walking across a street", correct: true },
    { label: "An empty road at dusk", correct: false },
    { label: "A parked car beside a curb", correct: false },
  ];

  const handle = (opt: (typeof options)[0]) => {
    if (opt.correct) {
      setFeedback("✅ CONFIRMED: Object classification successful.");
      setTimeout(onCorrect, 1200);
    } else {
      setFeedback("❌ INCORRECT: Re-analyze visual data.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 font-mono flex items-center justify-center">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white border-4 border-black p-8 shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black text-white p-4 mb-6 border border-black"
        >
          <p>&gt; VISUAL RECOGNITION SYSTEM v3.2</p>
          <p>&gt; Initializing object detection...</p>
          <p>&gt; Awaiting human verification.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="border-2 border-black p-2 mb-4 bg-white inline-block">
            <img
              src="/images/source_images/ped.jpg"
              alt="Pedestrian crossing"
              className="mx-auto w-96 border border-black"
            />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-2xl font-bold text-black mb-2"
          >
            What do you see in this picture?
          </motion.h2>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3 mb-6"
        >
          {options.map((opt, index) => (
            <motion.li
              key={opt.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <motion.button
                onClick={() => handle(opt)}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#6b7280",
                  color: "#fff",
                  borderColor: "#6b7280",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 border-2 border-black bg-black text-white hover:bg-gray-500 hover:border-gray-500 transition-all duration-200 text-left font-bold text-lg"
              >
                [ {String.fromCharCode(65 + index)} ] {opt.label}
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-black text-white p-4 text-center border border-black"
            >
              <p className="font-bold">&gt; SYSTEM RESPONSE:</p>
              <p>{feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuizImage;
