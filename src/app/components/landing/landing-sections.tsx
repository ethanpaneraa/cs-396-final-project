import React from "react";
import Link from "next/link";
import StaticAsciiBackground from "@/app/components/landing/static-ascii-background";

const LandingSections: React.FC = () => (
  <section className="relative w-full overflow-hidden">
    <div className="absolute inset-0">
      <StaticAsciiBackground />
    </div>
    <div className="absolute inset-0 bg-white/60" />
    <div className="relative mx-auto max-w-4xl px-4 py-16 space-y-16 font-mono text-black">
      <div className="bg-white border border-black p-6 w-full shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Exploring Edge-Detection Model Vulnerabilities
        </h2>
        <p className="leading-relaxed mb-4">
          This online interactive lab invites you to step inside the world of
          edge-detection models—an essential building block in modern computer
          vision pipelines, powering applications from smartphone camera filters
          to critical safety systems in self-driving cars and medical imaging
          devices. By demystifying the processing stages that identify
          boundaries and contours in images, you&apos;ll see how subtle
          parameter changes can have outsized effects on performance. In
          real-world deployments, edge detection is relied upon to locate
          pedestrians, road signage, or anatomical features; any weakness here
          can cascade into misclassification, false alarms, or missed
          detections, with potentially life-altering consequences.
        </p>
        <p className="leading-relaxed mb-4">
          Through a hands-on simulation, you can tweak classic operators like
          Sobel and Canny, adjust kernel sizes, thresholds, and input
          resolutions, then launch adversarial attacks—pixel-level perturbations
          or crafted noise patches—against those settings. Watch in real time as
          a tiny adversarial pattern can warp the edge map and slip beneath
          detection thresholds, just as researchers have demonstrated that small
          stickers placed on stop signs can fool autonomous vehicles. By
          controlling these variables yourself, you&apos;ll gain a visceral
          understanding of how an attacker&apos;s minimal changes in the
          physical or digital world can exploit blind spots in even the most
          trusted vision models.
        </p>
        <p className="leading-relaxed mb-4">
          In the broader context of AI safety, edge-detection serves as one of
          many gatekeepers in visual pipelines—when it&apos;s compromised,
          downstream algorithms for classification, tracking, or scene
          reconstruction inherit those flaws. Consider medical systems that rely
          on edge maps to segment tumors or monitor surgical instruments: an
          attacker could introduce imperceptible noise patterns that hide or
          highlight regions incorrectly, risking misdiagnosis or surgical
          errors. Our interactive demo bridges this gap between theoretical
          vulnerability studies and practical scenarios, emphasizing why
          industry practitioners, regulators, and end users must collaborate to
          validate model robustness before deployment in safety-critical
          environments.
        </p>
        <p className="leading-relaxed">
          Our goal is not to alarm but to empower: by experimenting with
          adversarial noise yourself, you develop a deeper intuition for model
          limitations and the importance of designing defenses such as input
          preprocessing, adversarial training, or robust feature extraction. We
          provide accessible blog-style writeups alongside the simulation to
          unpack advanced topics—gradient-based attack algorithms,
          transferability of adversarial examples across architectures, and the
          evolving arms race between attackers and defenders. Ultimately, this
          project aims to equip students, developers, and decision-makers with
          the knowledge to ask critical questions, advocate for rigorous testing
          standards, and build computer vision systems that earn trust before
          they reach cameras in cars, hospitals, or public spaces.
        </p>
      </div>
      <div className="bg-white border border-black p-6 w-full shadow-lg space-y-2">
        <p>
          <strong>created by:</strong>{" "}
          <Link
            href="https://ethanpinedaa.dev"
            target="_blank"
            className="underline"
          >
            ethan pineda
          </Link>
        </p>
        <p>
          <strong>Class Project:</strong> COMP_SCI 396 — Communicating Computer
          Science, Northwestern University Department of Computer Science
        </p>
      </div>
      <div className="bg-white border border-black p-6 w-full shadow-lg text-center space-y-6">
        <div className="flex justify-center space-x-4">
          <Link
            href="https://github.com/ethanpaneraa/cs-396-final-project"
            target="_blank"
            className="font-mono bg-black text-white border border-white px-4 py-2 hover:bg-white hover:text-black transition"
          >
            View Project on GitHub
          </Link>
        </div>
        <div className="space-y-2">
          <p>
            Explore the simulation and learn how adversarial attacks can trick
            edge-detection models.
          </p>
          <p>Found a bug or have feedback? Let me know!</p>
          <Link
            href="https://github.com/ethanpaneraa/cs-396-final-project"
            target="_blank"
            className="inline-block font-mono bg-black text-white border border-white px-4 py-2 hover:bg-white hover:text-black transition"
          >
            Report an Issue
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default LandingSections;
