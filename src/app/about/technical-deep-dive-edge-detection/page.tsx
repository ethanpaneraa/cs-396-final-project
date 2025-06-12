"use client";

import Header from "@/app/components/navigaton/header";
import StaticAsciiBackground from "@/app/components/static-ascii-background";
import Link from "next/link";
import { useState } from "react";

export default function EdgeAttackLabDeepDive() {
  const [showTOC, setShowTOC] = useState(false);

  return (
    <>
      <Header />
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <StaticAsciiBackground />
        </div>
        <div className="absolute inset-0 bg-white/60" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 pt-24 font-mono text-black">
          <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-white border border-black p-4 shadow-lg max-w-xs">
              <h3 className="text-sm font-bold mb-3 border-b border-black pb-2">
                TABLE OF CONTENTS
              </h3>
              <nav className="space-y-2 text-xs">
                <a
                  href="#introduction"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → Introduction
                </a>
                <a
                  href="#images-preprocessing"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → 1 Reference Images
                </a>
                <a
                  href="#baseline-edge-maps"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → 2 Baseline Edge Maps
                </a>
                <a
                  href="#attack-library"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → 3 Attack Library
                </a>
                <a
                  href="#scoring-damage"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → 4 Scoring the Damage
                </a>
                <a
                  href="#file-naming"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → 5 Files & JSON
                </a>
                <a
                  href="#simulation-engine"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → 6 Simulation Engine
                </a>
                <a
                  href="#running-everything"
                  className="block hover:bg-gray-100 p-1 transition"
                >
                  → 7 30-Second Demo
                </a>
              </nav>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Mobile TOC toggle */}
            <div className="lg:hidden bg-white border border-black p-4 w-full shadow-lg">
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="w-full text-left font-bold text-sm bg-black text-white p-2 hover:bg-gray-800 transition"
              >
                {showTOC
                  ? "↑ HIDE TABLE OF CONTENTS"
                  : "↓ SHOW TABLE OF CONTENTS"}
              </button>
              {showTOC && (
                <nav className="mt-4 space-y-2 text-xs border-t border-black pt-4">
                  <a
                    href="#introduction"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → Introduction
                  </a>
                  <a
                    href="#images-preprocessing"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → 1 Reference Images
                  </a>
                  <a
                    href="#baseline-edge-maps"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → 2 Baseline Edge Maps
                  </a>
                  <a
                    href="#attack-library"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → 3 Attack Library
                  </a>
                  <a
                    href="#scoring-damage"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → 4 Scoring the Damage
                  </a>
                  <a
                    href="#file-naming"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → 5 Files & JSON
                  </a>
                  <a
                    href="#simulation-engine"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → 6 Simulation Engine
                  </a>
                  <a
                    href="#running-everything"
                    onClick={() => setShowTOC(false)}
                    className="block hover:bg-gray-100 p-2 transition"
                  >
                    → 7 30-Second Demo
                  </a>
                </nav>
              )}
            </div>
            <div className="bg-white border border-black p-6 w-full shadow-lg">
              <h1 className="text-4xl font-bold mb-4">
                A Technical Deep Dive into the Edge-Attack Lab
              </h1>
              <p className="text-sm text-gray-600">
                By Ethan Pineda • 7 min read
              </p>
            </div>
            <div
              id="introduction"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <p className="leading-relaxed mb-4">
                Every “broken-edge” picture you&apos;ve seen on this site came
                out of a repeatable Python pipeline. What follows are{" "}
                <strong>my personal notes</strong> on the why, the how, and the
                exact filenames the code spat out. The full source lives in a
                separate repo (see GitHub link on the home page), but lining up
                the concepts here will save you a lot of scrolling later.
              </p>
            </div>
            <div
              id="images-preprocessing"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                1 Reference Images &amp; Pre-Processing
              </h2>
              <p className="leading-relaxed mb-4">
                The lab starts with just <strong>three</strong> photos—
                <code>stop.png</code>,<code>ped.jpg</code>, and{" "}
                <code>street.jpg</code>—stored in <code>source_images/</code>. A
                helper called{" "}
                <code>load_and_resize_and_convert_to_grayscale</code> does four
                jobs in one call:
              </p>
              <ol className="list-decimal list-inside space-y-1 leading-relaxed mb-4">
                <li>Load the file with OpenCV (throws if it can&apos;t).</li>
                <li>Convert colour → 8-bit grayscale.</li>
                <li>
                  Resize to a <strong>256 {"×"} 256</strong> square with{" "}
                  <code>INTER_AREA</code> to keep lines crisp.
                </li>
                <li>Return the result as a trustworthy NumPy array.</li>
              </ol>
              <p className="leading-relaxed">
                The script seeds RNG early with <code>np.random.seed(42)</code>,
                so every run is bit-for-bit repeatable.
              </p>
            </div>
            <div
              id="baseline-edge-maps"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                2 Building Baseline Edge Maps
              </h2>
              <p className="leading-relaxed mb-4">
                For each clean frame the pipeline immediately creates two
                “ground-truth” edge maps:
                <code>sobel</code> and <code>canny</code>. Stashing them{" "}
                <em>before</em> any tampering matters because later attacks read
                the original gradients to decide exactly <em>where</em> to
                strike.
              </p>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                <li>
                  <strong>Sobel</strong> — two 3 {"×"} 3 kernels → gradient
                  magnitude → normalize 0-255.
                </li>
                <li>
                  <strong>Canny</strong> — Gaussian blur → gradient → non-max
                  suppression → dual thresholds → hysteresis (three presets:{" "}
                  <code>standard</code>, <code>high_threshold</code>,{" "}
                  <code>sensitive</code>).
                </li>
              </ul>
            </div>
            <div
              id="attack-library"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                3 Attack Library &amp; Parameterisation
              </h2>
              <p className="leading-relaxed mb-4">
                Each attack is a pure function returning a perturbed twin. A
                dispatcher maps human-friendly names to those functions.
                Strength keywords—<code>subtle</code>, <code>moderate</code>,{" "}
                <code>aggressive</code>, <code>extreme</code>—scale the math
                with a single word change.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Attack name</th>
                      <th className="border p-2 text-left">Hits</th>
                      <th className="border p-2 text-left">
                        One-liner explanation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-semibold">pixel</td>
                      <td className="border p-2">raw pixels</td>
                      <td className="border p-2">
                        Flip N random pixels by ±δ to cancel local gradients.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border p-2 font-semibold">edge_blur</td>
                      <td className="border p-2">strong-edge mask</td>
                      <td className="border p-2">
                        Blur the top 30 % Sobel magnitudes with two-pass
                        Gaussian.
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-semibold">
                        gradient_reverse
                      </td>
                      <td className="border p-2">gradient signs</td>
                      <td className="border p-2">
                        Invert steepest vectors and smear over 8-pixel
                        neighbourhood.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border p-2 font-semibold">
                        contour_disrupt
                      </td>
                      <td className="border p-2">largest contours</td>
                      <td className="border p-2">
                        Dilate → heavy blur → drill random 15-px holes in up to
                        three contours.
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-semibold">
                        hysteresis_noise
                      </td>
                      <td className="border p-2">Canny thresholds</td>
                      <td className="border p-2">
                        Inject noise living exactly between low and high
                        thresholds so weak edges never link up.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              id="scoring-damage"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">4 Scoring the Damage</h2>
              <p className="leading-relaxed mb-4">
                After re-running the detector on the perturbed image, the script
                logs three lightweight metrics:
              </p>
              <pre className="bg-gray-100 p-4 text-xs overflow-x-auto mb-4 border">
                {`edge_density_reduction = (pre_edges - post_edges) / pre_edges
contour_area_reduction = (max_pre - max_post) / max_pre
fragmentation_increase = (num_contours_post - num_contours_pre) /
                         max(1, num_contours_pre)  # Canny only`}
              </pre>
              <p className="leading-relaxed">
                An attack is deemed successful if{" "}
                <code>edge_density_reduction&nbsp;&gt;&nbsp;0.15</code>{" "}
                <em>or</em>{" "}
                <code>contour_area_reduction&nbsp;&gt;&nbsp;0.20</code>{" "}
                <em>or</em>{" "}
                <code>fragmentation_increase&nbsp;&gt;&nbsp;0.50</code> (Canny
                only). These heuristics came from dozens of pilot runs until
                they matched what my eyes called “visibly broken.”
              </p>
            </div>
            <div
              id="file-naming"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                5 File Naming, JSON, and Your Own Plots
              </h2>
              <p className="leading-relaxed mb-4">
                For every <code>(source, detector, attack)</code> triple the
                pipeline writes four PNGs plus two manifest files:
              </p>
              <pre className="bg-gray-100 p-4 text-xs overflow-x-auto mb-4 border">
                {`street_scene-sobel-edge_blur-clean.png
street_scene-sobel-edge_blur-pert.png
street_scene-sobel-edge_blur-edges-clean.png
street_scene-sobel-edge_blur-edges-pert.png`}
              </pre>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                <li>
                  <code>metadata.json</code> — raw counts (edge pixels, contour
                  areas, thresholds).
                </li>
                <li>
                  <code>attack_results.json</code> — slim scoreboard (
                  <code>attack_success</code>, reductions, etc.).
                </li>
              </ul>
              <p className="leading-relaxed">
                Plotting a success heat-map in a notebook is literally one{" "}
                <code>pandas.read_json</code> away.
              </p>
            </div>
            <div
              id="simulation-engine"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                6 Meet <code>EdgeAttackSimulationEngine</code>
              </h2>
              <p className="leading-relaxed mb-4">
                When a single script grew unwieldy, everything was wrapped in a
                class:
              </p>
              <pre className="bg-gray-100 p-4 text-xs overflow-x-auto mb-4 border">
                {`engine.configure(edge_detector_algorithm="canny",
                 adversarial_attack_type="edge_blur",
                 adversarial_attack_strength="aggressive")
summary = engine.execute_simulation_on_image("source_images/stop.png")`}
              </pre>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                <li>
                  <code>.configure()</code> flips any of 40 + dataclass
                  fields—from lighting mode to Sobel kernel size.
                </li>
                <li>
                  <code>.execute_simulation_on_image()</code> runs load → attack
                  → score and drops four PNGs + results JSON right next to them.
                </li>
              </ul>
              <p className="leading-relaxed">
                Running <em>all</em> combinations would fry my laptop for a day,
                so the public simulation only shows a curated subset.
              </p>
            </div>
            <div
              id="running-everything"
              className="bg-white border border-black p-6 w-full shadow-lg scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-4">
                7 Running Everything in 30 Seconds
              </h2>
              <pre className="bg-gray-100 p-4 text-xs overflow-x-auto mb-4 border">
                {`python targeted_attacks.py          # Sobel-centric tricks
python generic_attacks.py           # simple generic attacks
python canny_targeted_attacks.py    # five ways to break Canny
python simulation_engine.py         # all detectors, four attack classes`}
              </pre>
              <p className="leading-relaxed mb-4">
                Each script ends with <code>Successful attacks: 11/18</code>.
                Open the folder and flip through the PNG pairs—clean on the
                left, attacked on the right. The damage jumps out immediately,
                and the JSON underneath tells you <em>how much</em>.
              </p>
              <p className="leading-relaxed">
                That’s the entire “backend.” Fork it, swap in your own photos,
                craft new attacks, and see where it takes you!
              </p>
            </div>

            {/* Footer links */}
            <div className="bg-white border border-black p-6 w-full shadow-lg text-center">
              <Link
                href="/about"
                className="inline-block bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition mr-4"
              >
                ← Back to Blog
              </Link>
              <Link
                href="/simulation"
                className="inline-block bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition"
              >
                Try the Simulation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
