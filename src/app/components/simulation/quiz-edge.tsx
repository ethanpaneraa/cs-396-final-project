import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext(): void;
}

export const QuizEdge: FC<Props> = ({ onNext }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handle = (answer: boolean) => {
    if (answer) {
      setFeedback("✅ CORRECT: Visual pattern recognition confirmed.");
      setTimeout(onNext, 1200);
    } else {
      setFeedback("❌ ERROR: Human form still detectable in edge data.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
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
          <div className="border-2 border-black p-2 mb-3 bg-white">
            <img
              src="/images/source_images/sample_edge_outline.png"
              alt="Edge outline"
              className="mx-auto w-64 border border-black"
            />
          </div>
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm font-bold leading-none text-black mb-6"
          >
            {`╔════════════════════════════════════╗
║ COMPUTER VISION: EDGE MAP OUTPUT ║
║ Query: Human form still visible? ║
╚════════════════════════════════════╝`}
          </motion.pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex space-x-4 justify-center mb-6"
        >
          <motion.button
            onClick={() => handle(true)}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#6b7280",
              color: "#fff",
              borderColor: "#6b7280",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-black bg-black text-white hover:bg-gray-500 hover:border-gray-500 transition-all duration-200 font-bold text-base"
          >
            [ YES ]
          </motion.button>
          <motion.button
            onClick={() => handle(false)}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#6b7280",
              color: "#fff",
              borderColor: "#6b7280",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-black bg-black text-white hover:bg-gray-500 hover:border-gray-500 transition-all duration-200 font-bold text-base"
          >
            [ NO ]
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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

export default QuizEdge;
