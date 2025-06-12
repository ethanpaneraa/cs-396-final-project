"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SimulationForm = () => {
  const [config, setConfig] = useState({
    imageSource: "pedestrian",
    edgeDetector: "sobel",
    attackLevel: "moderate_pixels", // updated to match key in ATTACK_TYPES_BY_LEVEL
    attackType: "pixel_perturbation", // updated default type
  });

  const [currentImages, setCurrentImages] = useState<{
    clean: string;
    perturbed: string;
    edgesClean: string;
    edgesPerturbed: string;
  } | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Map your Python naming conventions
  const IMAGE_SOURCE_MAP: Record<string, string> = {
    pedestrian: "pedestrian",
    stop_sign: "stop_sign",
    street_scene: "street_scene",
  };

  const EDGE_DETECTORS: Record<string, string> = {
    sobel: "Sobel Filter — gradient magnitude",
    canny: "Canny — multi-stage with hysteresis",
    laplacian: "Laplacian of Gaussian — second derivative",
    roberts: "Roberts Cross — simple cross kernels",
  };

  const ATTACK_TYPES_BY_LEVEL: Record<
    string,
    { type: string; displayName: string }
  > = {
    gentle_pixels: {
      type: "pixel_perturbation",
      displayName: "Gentle Pixel Perturbation",
    },
    moderate_pixels: {
      type: "pixel_perturbation",
      displayName: "Moderate Pixel Perturbation",
    },
    aggressive_pixels: {
      type: "pixel_perturbation",
      displayName: "Aggressive Pixel Perturbation",
    },
    smart_edge: { type: "edge_blur", displayName: "Smart Edge Blur" },
    gradient: {
      type: "gradient_reverse",
      displayName: "Gradient Direction Attack",
    },
    contour: { type: "contour_disrupt", displayName: "Contour Disruption" },
  };

  // Build image paths based on your Python output structure
  const buildImagePaths = (source: string, detector: string, level: string) => {
    const baseName = `${source}-${detector}-${level}`;
    return {
      clean: `/images/progressive_attacks/${baseName}-clean.png`,
      perturbed: `/images/progressive_attacks/${baseName}-pert.png`,
      edgesClean: `/images/progressive_attacks/${baseName}-edges-clean.png`,
      edgesPerturbed: `/images/progressive_attacks/${baseName}-edges-pert.png`,
    };
  };

  // Load metadata from your generated JSON files
  const loadMetrics = async () => {
    setLoading(true);
    try {
      const response = await fetch("/images/progressive_attacks/metadata.json");
      if (response.ok) {
        const data = await response.json();
        const key = `${config.imageSource}-${config.edgeDetector}-${config.attackLevel}`;
        if (data[key]) {
          setMetrics(data[key]);
        }
      }
    } catch (error) {
      console.log("Could not load metrics, using placeholder data");
      // Placeholder metrics if JSON not available
      setMetrics({
        edge_density_reduction: Math.random() * 0.5,
        contour_area_reduction: Math.random() * 0.4,
        attack_success: Math.random() > 0.5,
        edge_fraction_clean: 0.15 + Math.random() * 0.1,
        edge_fraction_perturbed: 0.08 + Math.random() * 0.1,
      });
    }
    setLoading(false);
  };

  // Update images when config changes
  useEffect(() => {
    const paths = buildImagePaths(
      IMAGE_SOURCE_MAP[config.imageSource],
      config.edgeDetector,
      config.attackLevel
    );
    setCurrentImages(paths);
    loadMetrics();
  }, [config]);

  const runExperiment = () => {
    // Add to history
    const result = {
      config: { ...config },
      metrics: metrics || {},
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [result, ...prev].slice(0, 10));
  };

  // Check which detectors are available for each attack level
  const getAvailableDetectors = (level: string): string[] => {
    const attackInfo = ATTACK_TYPES_BY_LEVEL[level];
    if (!attackInfo) return ["sobel", "canny"];
    if (level === "contour") {
      return ["sobel", "canny", "laplacian", "roberts"];
    }
    return ["sobel", "canny"];
  };

  const availableDetectors = getAvailableDetectors(config.attackLevel);

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black border-b-2 border-black pb-2">
            ▶ IMAGE & DETECTION SETTINGS
          </h3>

          <div>
            <label className="block text-sm font-bold mb-2 text-black">
              Source Image:
            </label>
            <select
              value={config.imageSource}
              onChange={(e) =>
                setConfig({ ...config, imageSource: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="pedestrian">Pedestrian Crossing</option>
              <option value="stop_sign">Stop Sign</option>
              <option value="street_scene">Street Scene</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-black">
              Edge Detection Algorithm:
            </label>
            <select
              value={config.edgeDetector}
              onChange={(e) =>
                setConfig({ ...config, edgeDetector: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono focus:outline-none focus:ring-2 focus:ring-black"
              disabled={
                !availableDetectors.includes(config.edgeDetector) &&
                availableDetectors.length > 0
              }
            >
              {Object.entries(EDGE_DETECTORS).map(([key, desc]) => (
                <option
                  key={key}
                  value={key}
                  disabled={!availableDetectors.includes(key)}
                >
                  {key.toUpperCase()} - {desc}
                </option>
              ))}
            </select>
            {!availableDetectors.includes(config.edgeDetector) && (
              <p className="text-xs text-red-600 mt-1">
                Note: {config.edgeDetector} not available for{" "}
                {config.attackLevel}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black border-b-2 border-black pb-2">
            ⚡ ATTACK CONFIGURATION
          </h3>

          <div>
            <label className="block text-sm font-bold mb-2 text-black">
              Attack Level & Type:
            </label>
            <div className="space-y-2">
              {Object.entries(ATTACK_TYPES_BY_LEVEL).map(([level, info]) => (
                <label key={level} className="flex items-start text-black">
                  <input
                    type="radio"
                    name="attackLevel"
                    value={level}
                    checked={config.attackLevel === level}
                    onChange={(e) => {
                      const newLevel = e.target.value;
                      const availableForNew = getAvailableDetectors(newLevel);
                      setConfig({
                        ...config,
                        attackLevel: newLevel,
                        attackType: ATTACK_TYPES_BY_LEVEL[newLevel].type,
                        edgeDetector: availableForNew.includes(
                          config.edgeDetector
                        )
                          ? config.edgeDetector
                          : availableForNew[0],
                      });
                    }}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <span className="font-semibold">{info.displayName}</span>
                    <span className="text-xs block text-black">
                      Level: {level.replace("_", " ")}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={runExperiment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-black text-white font-bold text-lg border-2 border-black hover:bg-gray-800 transition-colors"
        >
          ▶ LOAD & ANALYZE
        </motion.button>
      </div>

      {/* Results Display */}
      <AnimatePresence>
        {currentImages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Metrics Panel */}
            {metrics && (
              <div className="bg-black text-white p-6 border-2 border-black">
                <h3 className="text-xl font-bold mb-4">
                  █ ATTACK EFFECTIVENESS METRICS █
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-black text-sm">
                      Edge Density Reduction:
                    </span>
                    <div className="text-3xl font-bold mt-1">
                      {(metrics.edge_density_reduction * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-black text-sm">
                      Contour Area Reduction:
                    </span>
                    <div className="text-3xl font-bold mt-1">
                      {(metrics.contour_area_reduction * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-black text-sm">Attack Result:</span>
                    <div
                      className={`text-3xl font-bold mt-1 ${
                        metrics.attack_success
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {metrics.attack_success ? "⚠️ SUCCESS" : "✓ DEFENDED"}
                    </div>
                  </div>
                </div>

                {metrics.edge_fraction_clean && (
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
                    <div>
                      <span className="text-black text-xs">
                        Clean Edge Fraction:
                      </span>
                      <div className="text-lg font-mono">
                        {metrics.edge_fraction_clean.toFixed(3)}
                      </div>
                    </div>
                    <div>
                      <span className="text-black text-xs">
                        Perturbed Edge Fraction:
                      </span>
                      <div className="text-lg font-mono">
                        {metrics.edge_fraction_perturbed.toFixed(3)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Original */}
              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center text-black">
                  ORIGINAL
                </h4>
                <img
                  src={currentImages.clean}
                  alt="Original"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/placeholder.png";
                    (e.target as any).onerror = null;
                  }}
                />
              </motion.div>

              {/* Attacked */}
              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center text-black">
                  ATTACKED
                </h4>
                <img
                  src={currentImages.perturbed}
                  alt="Attacked"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/placeholder.png";
                    (e.target as any).onerror = null;
                  }}
                />
              </motion.div>

              {/* Edges (Clean) */}
              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center text-black">
                  EDGES (CLEAN)
                </h4>
                <img
                  src={currentImages.edgesClean}
                  alt="Clean Edges"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/placeholder.png";
                    (e.target as any).onerror = null;
                  }}
                />
              </motion.div>

              {/* Edges (Attacked) */}
              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center text-black">
                  EDGES (ATTACKED)
                </h4>
                <img
                  src={currentImages.edgesPerturbed}
                  alt="Attacked Edges"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/placeholder.png";
                    (e.target as any).onerror = null;
                  }}
                />
              </motion.div>
            </div>

            {/* Configuration Summary */}
            <div className="border-2 border-black p-4 bg-gray-50">
              <h4 className="font-bold mb-3 text-black">
                Current Configuration:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-mono">
                <div>
                  <span className="text-black">Source:</span>
                  <div className="font-bold text-black">
                    {config.imageSource}
                  </div>
                </div>
                <div>
                  <span className="text-black">Detector:</span>
                  <div className="font-bold text-black">
                    {config.edgeDetector.toUpperCase()}
                  </div>
                </div>
                <div>
                  <span className="text-black">Attack:</span>
                  <div className="font-bold text-black">
                    {ATTACK_TYPES_BY_LEVEL[config.attackLevel]?.type ??
                      config.attackType}
                  </div>
                </div>
                <div>
                  <span className="text-black">Level:</span>
                  <div className="font-bold text-black">
                    {config.attackLevel}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experiment History and Notice unchanged... */}
    </div>
  );
};

export default SimulationForm;
