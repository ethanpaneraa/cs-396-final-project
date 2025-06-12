"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StaticAsciiBackground from "@/app/components/static-ascii-background";
import QuizImage from "@/app/components/simulation/quiz-image";
import QuizEdge from "@/app/components/simulation/quiz-edge";
import PurposeModal from "@/app/components/simulation/purpose-modal";
import CongratsModal from "@/app/components/simulation/congrats-modal";
import SimulationForm from "@/app/components/simulation/simulation-form";
import Header from "@/app/components/navigaton/header";

export default function SimulationPage() {
  const [step, setStep] = useState(0);

  return (
    <>
      <Header />
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <StaticAsciiBackground />
        </div>
        <div className="absolute inset-0 bg-white/60" />

        {step === 0 && <PurposeModal onNext={() => setStep(1)} />}
        {step === 1 && <QuizImage onCorrect={() => setStep(2)} />}
        {step === 2 && <QuizEdge onNext={() => setStep(3)} />}
        {step === 3 && <CongratsModal onProceed={() => setStep(4)} />}

        {step === 4 && (
          <motion.div
            key="simulation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 p-8 font-mono max-w-6xl mx-auto"
          >
            <div className="bg-white border-2 border-black p-6 shadow-lg mt-28">
              <h1 className="text-3xl font-bold mb-6 text-black">
                █ SECURITY TEST CONSOLE █
              </h1>
              <div className="border border-black p-4 bg-black text-white mb-6">
                <p>&gt; System initialized…</p>
                <p>&gt; Loading edge detection modules…</p>
                <p>&gt; Ready for adversarial testing.</p>
                <p className="mt-2 text-yellow-400">
                  &gt; WARNING: Test results may reveal critical
                  vulnerabilities.
                </p>
              </div>
              <SimulationForm />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
