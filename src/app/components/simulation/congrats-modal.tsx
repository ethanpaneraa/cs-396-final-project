import React, { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  onProceed(): void;
}

export const CongratsModal: FC<Props> = ({ onProceed }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 font-mono">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border-4 border-black p-6 shadow-2xl max-w-md mx-4"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-center mb-4 text-black"
      >
        🎉 Congratulations! 🎉
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm leading-relaxed text-black mb-6"
      >
        You&apos;ve demonstrated that you and DriveGuard see the world the same
        way. Next, you&apos;ll step into the Security Test Console to begin real
        time experiments. Tweak parameters, launch attacks, and uncover every
        vulnerability before production rollout.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={onProceed}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded"
        >
          [ PROCEED TO SIMULATION ]
        </button>
      </motion.div>
    </motion.div>
  </div>
);

export default CongratsModal;
