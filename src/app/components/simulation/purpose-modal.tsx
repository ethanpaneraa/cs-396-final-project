import React, { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  onNext(): void;
}

export const PurposeModal: FC<Props> = ({ onNext }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 font-mono">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white border-4 border-black p-6 shadow-2xl max-w-xl mx-4 max-h-[90vh] overflow-y-auto"
    >
      <div className="text-center mb-4">
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-sm font-bold leading-none text-black"
        >
          {`╔══════════════════════════════════════╗
║    SECURITY TEST CONSOLE v2.1         ║
╚══════════════════════════════════════╝`}
        </motion.pre>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="leading-relaxed text-sm text-black space-y-4 mb-6"
      >
        <p>
          Welcome, Safety Engineer. You&apos;ve been hired by{" "}
          <strong>VisionSafe Systems</strong>, an autonomous vehicle startup
          developing “DriveGuard”, a next generation edge-detection module that
          spots pedestrians and road signs in real time. Your job: validate
          DriveGuard&apos;s robustness before it ships in over 100,000 cars next
          quarter.
        </p>
        <p>
          Edge detection is the first line of defense in a car&apos;s vision
          pipeline. When it breaks—through tiny visual perturbations in paint or
          digital noise—the vehicle can misinterpret a stop sign, drift into the
          wrong lane, or fail to see a pedestrian. In this lab, you&apos;ll
          configure classic operators like Sobel and Canny, tweak thresholds and
          resolutions, then deploy adversarial attacks—subtle pixel flips and
          targeted blurs—to probe the model&apos;s blind spots.
        </p>
        <p>
          Think of yourself as the red-team: your goal is to find every weakness
          so that DriveGuard&apos;s blue-team can fortify it with preprocessing,
          adversarial training, and robust feature extraction. What you learn
          here could save lives on the highway.
        </p>
        <p>
          Before we begin, we need to make sure that you can identity common
          objects and scenarios. Please proceed to the next step to verify your
          visual recognition skills.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="text-center"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white text-black border-2 border-black font-bold text-base transition-all duration-200"
        >
          [ INITIALIZE SYSTEM ]
        </motion.button>
      </motion.div>
    </motion.div>
  </div>
);

export default PurposeModal;
