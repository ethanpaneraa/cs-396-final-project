"use client";

import React, { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext(): void;
}

export const QuizEdge: FC<Props> = ({ onNext }) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handle = (answer: boolean) => {
    if (answer) {
      setAnsweredCorrectly(true);
      setFeedback(
        "✅ CORRECT: Visual pattern recognition confirmed.\n" +
          "The image above is the Sobel edge map of the original photo." +
          "It highlights gradients where pixel intensity changes sharply. " +
          "This is literally what the computer ‘sees’ when it runs edge detection which you can think of as " +
          "a matrix of high-contrast lines that trace contours and shapes."
      );
    } else {
      setFeedback("❌ ERROR: Human form still detectable in edge data.");
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
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black text-white p-4 mb-6 border border-black"
        >
          <p>&gt; EDGE DETECTION ANALYSIS PHASE</p>
          <p>&gt; Processing visual data...</p>
          <p>&gt; Human input required.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="border-2 border-black p-2 mb-4 bg-white inline-block">
            <img
              src="/images/source_images/sample_edge_outline.png"
              alt="Edge outline"
              className="mx-auto w-96 border border-black"
            />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-2xl font-bold text-black mb-2"
          >
            Do you still see a human in this image?
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex space-x-4 justify-center mb-6"
        >
          <motion.button
            onClick={() => handle(true)}
            whileHover={{
              scale: 1.02,
              backgroundColor: "#6b7280",
              color: "#fff",
              borderColor: "#6b7280",
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-black bg-black text-white hover:bg-gray-500 hover:border-gray-500 transition-all duration-200 font-bold text-lg"
          >
            [ YES ]
          </motion.button>
          <motion.button
            onClick={() => handle(false)}
            whileHover={{
              scale: 1.02,
              backgroundColor: "#6b7280",
              color: "#fff",
              borderColor: "#6b7280",
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-black bg-black text-white hover:bg-gray-500 hover:border-gray-500 transition-all duration-200 font-bold text-lg"
          >
            [ NO ]
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-black text-white p-4 text-center border border-black whitespace-pre-wrap"
            >
              <p className="font-bold">&gt; SYSTEM RESPONSE:</p>
              <p>{feedback}</p>

              {answeredCorrectly && (
                <motion.button
                  onClick={onNext}
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 px-6 py-2 bg-white text-black border-2 border-black font-bold text-base hover:bg-black hover:text-white transition"
                >
                  [ PROCEED TO SIMULATION ]
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuizEdge;
