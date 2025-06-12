import React from "react";
import Link from "next/link";

const AsciiOverlay: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
    <div className="bg-white border border-gray-400 p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-lg">
      <h1 className="text-5xl font-bold text-black font-mono mb-8">
        investigating the edge
      </h1>
      <p className="text-black leading-relaxed font-mono lowercase">
        an online lab where you can navigate through edge-detector behaviors and
        uncover vulnerabilities in vision models
      </p>
      <div className="mt-8 flex space-x-4 items-center justify-center">
        <Link
          href="/about"
          className="font-mono bg-black text-white border border-white px-4 py-2 hover:bg-white hover:text-black transition"
        >
          /about
        </Link>
        <Link
          href="/simulation"
          className="font-mono bg-black text-white border border-white px-4 py-2 hover:bg-white hover:text-black transition"
        >
          /simulation
        </Link>
      </div>

      <p className="pt-4 text-sm font-mono text-black text-center">
        scroll to learn more
      </p>
    </div>
  </div>
);

export default AsciiOverlay;
