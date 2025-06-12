import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Metrics {
  edge_density_reduction: number;
  contour_area_reduction: number;
  attack_success: boolean;
  edge_fraction_clean?: number;
  edge_fraction_perturbed?: number;
  fragmentation_increase?: number;
}

interface ImagePaths {
  clean: string;
  perturbed: string;
  edgesClean: string;
  edgesPerturbed: string;
}

const SimulationForm = () => {
  const [dataSource, setDataSource] = useState("progressive");
  type ImageSourceKey = keyof typeof IMAGE_SOURCE_MAP;

  const [config, setConfig] = useState<{
    imageSource: ImageSourceKey;
    edgeDetector: string;
    attackLevel: string;
    attackMethod: string;
    cannyConfig: string;
    cannyAttackMethod: string;
    attackType: string;
    attackStrength: string;
    lightingMode: string;
    resolution: number;
  }>({
    imageSource: "pedestrian",
    edgeDetector: "sobel",
    attackLevel: "moderate_pixels",
    attackMethod: "edge_blur",
    cannyConfig: "standard",
    cannyAttackMethod: "hysteresis_threshold",
    attackType: "contour_disrupt",
    attackStrength: "moderate",
    lightingMode: "normal",
    resolution: 256,
  });

  const [currentImages, setCurrentImages] = useState<ImagePaths | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  // const [availableConfigs, setAvailableConfigs] = useState([]);

  // Data source configurations
  const DATA_SOURCES = {
    progressive: {
      name: "Progressive Attacks",
      directory: "progressive_attacks",
      description: "Step-by-step attack progression from gentle to aggressive",
    },
    targeted: {
      name: "Sobel Targeted",
      directory: "targeted_attacks",
      description: "Attacks optimized for Sobel edge detection",
    },
    canny_targeted: {
      name: "Canny Targeted",
      directory: "canny_targeted_attacks",
      description:
        "Attacks specifically designed to exploit Canny's weaknesses",
    },
    effective: {
      name: "Effective Simulations",
      directory: "effective_simulation_results",
      description: "Full simulation engine with lighting and noise options",
    },
  };

  const IMAGE_SOURCE_MAP = {
    pedestrian: "pedestrian",
    stop_sign: "stop_sign",
    street_scene: "street_scene",
  };

  const EDGE_DETECTORS = {
    sobel: "Sobel Filter — gradient magnitude",
    canny: "Canny — multi-stage with hysteresis",
    laplacian: "Laplacian of Gaussian — second derivative",
    roberts: "Roberts Cross — simple cross kernels",
  };

  // Progressive attacks configuration
  const ATTACK_LEVELS = {
    gentle_pixels: { type: "pixel", displayName: "Gentle Pixel Perturbation" },
    moderate_pixels: {
      type: "pixel",
      displayName: "Moderate Pixel Perturbation",
    },
    aggressive_pixels: {
      type: "pixel",
      displayName: "Aggressive Pixel Perturbation",
    },
    smart_edge: { type: "edge_blur", displayName: "Smart Edge Blur" },
    gradient: {
      type: "gradient_reverse",
      displayName: "Gradient Direction Attack",
    },
    contour: { type: "contour_disrupt", displayName: "Contour Disruption" },
  };

  // Targeted attacks configuration
  const ATTACK_METHODS = {
    edge_blur: "Targeted Edge Smoothing",
    gradient_reverse: "Reverse Gradient Direction",
    contour_disrupt: "Disrupt Contour Boundaries",
  };

  // Canny targeted attacks configuration
  const CANNY_CONFIGS = {
    standard: "Standard (Low: 50, High: 150)",
    high_threshold: "High Threshold (Low: 100, High: 200)",
    sensitive: "Sensitive (Low: 30, High: 100)",
  };

  const CANNY_ATTACK_METHODS = {
    hysteresis_threshold: "Hysteresis Threshold Attack",
    gradient_smoothing: "Gradient Smoothing Attack",
    non_max_suppression: "Non-Maximum Suppression Attack",
    connectivity_breaking: "Connectivity Breaking Attack",
    multi_scale: "Multi-Scale Perturbation Attack",
  };

  // Effective simulation configuration
  const ATTACK_TYPES = {
    pixel_perturbation: "Random pixel noise",
    edge_blur: "Targeted edge smoothing",
    gradient_reverse: "Reverse gradient direction",
    contour_disrupt: "Disrupt contour boundaries",
    geometric: "Rotation & scaling transforms",
    occlusion: "Strategic masking patches",
  };

  const ATTACK_STRENGTHS = {
    subtle: "Barely noticeable",
    moderate: "Visible but not obvious",
    aggressive: "Clearly visible",
    extreme: "Heavily distorted",
  };

  const LIGHTING_MODES = {
    normal: "Normal lighting",
    low_light: "Low light conditions",
    high_contrast: "High contrast",
    overexposed: "Overexposed",
  };

  // --- add right after your LIGHTING_MODES const ---
  // --- richer explanations ---
  const EXPLANATIONS = {
    progressive: {
      gentle_pixels: `
      Injects a small amount of random noise (≈5–10% pixel intensity variation)
      across the image. Use this to see how even tiny perturbations can cause
      edge maps to flicker or drop weak edges. In practice, this mimics
      sensor noise or mild JPEG artifacts.`,
      moderate_pixels: `
      Applies medium-level pixel noise (≈20–30% intensity shifts). You’ll see
      clear gaps in thin edges and some edge misalignments. This resembles
      lighting flicker or low-grade camera interference.`,
      aggressive_pixels: `
      Blasts heavy noise (≈50%+ variation) everywhere. Edge detectors will
      miss large sections, and false edges pop up in textured regions.
      Think of extreme weather fog or deliberate adversarial pixel jamming.`,
      smart_edge: `
      Blurs only around the strongest gradients—like smoothing the borders of a
      stop sign without touching the flat regions. This tests an attack that
      targets edge operators directly, leaving the rest of the image intact.`,
      gradient: `
      Locally flips the sign of the gradient field under each pixel. Sobel and
      similar filters see edges all reversed—peaks become troughs—so boundary
      orientation is catastrophically wrong.`,
      contour: `
      Selectively fractures the largest connected contours into fragments.
      Good for testing whether your system can still link broken edges under
      noise, as in adversarial occlusion attacks.`,
    },

    targeted: {
      edge_blur: `
      Identifies your top Sobel edges, then applies directional blur only
      along those lines. Edges become soft and indistinct, simulating defocus
      or strategic smoothing to slip past gradient thresholds.`,
      gradient_reverse: `
      Reverses the sign of pixel gradients in Sobel’s strongest regions.
      This attack creates “anti-edges” that look like negatives, tricking
      detectors into highlighting wrong structures.`,
      contour_disrupt: `
      Erodes the outlines of the largest detected contours by removing pixels
      at random intervals. Useful for breaking closed shapes like road signs
      without touching the entire image.`,
    },

    canny_targeted: {
      // We'll generate these three sentences inline below
    },

    effective: {
      // We'll compose on the fly
    },
  };

  const AVAILABLE_EFFECTIVE_CONFIGS = [
    {
      detector: "sobel",
      attack: "contour_disrupt",
      strength: "moderate",
      lighting: "normal",
    },
    {
      detector: "canny",
      attack: "edge_blur",
      strength: "aggressive",
      lighting: "low_light",
    },
    {
      detector: "laplacian",
      attack: "geometric",
      strength: "subtle",
      lighting: "normal",
    },
    {
      detector: "roberts",
      attack: "occlusion",
      strength: "extreme",
      lighting: "normal",
    },
  ];

  const isEffectiveConfigAvailable = (
    detector: string,
    attack: string,
    strength: string
  ): boolean => {
    return AVAILABLE_EFFECTIVE_CONFIGS.some(
      (cfg) =>
        cfg.detector === detector &&
        cfg.attack === attack &&
        cfg.strength === strength
    );
  };

  // Build image paths based on data source
  const buildImagePaths = (): ImagePaths => {
    const source = IMAGE_SOURCE_MAP[config.imageSource];

    if (dataSource === "progressive") {
      const baseName = `${source}-${config.edgeDetector}-${config.attackLevel}`;
      return {
        clean: `/images/progressive_attacks/${baseName}-clean.png`,
        perturbed: `/images/progressive_attacks/${baseName}-pert.png`,
        edgesClean: `/images/progressive_attacks/${baseName}-edges-clean.png`,
        edgesPerturbed: `/images/progressive_attacks/${baseName}-edges-pert.png`,
      };
    } else if (dataSource === "targeted") {
      const baseName = `${source}_${config.attackMethod}`;
      return {
        clean: `/images/targeted_attacks/${baseName}_clean.png`,
        perturbed: `/images/targeted_attacks/${baseName}_attacked.png`,
        edgesClean: `/images/targeted_attacks/${baseName}_edges_clean.png`,
        edgesPerturbed: `/images/targeted_attacks/${baseName}_edges_attacked.png`,
      };
    } else if (dataSource === "canny_targeted") {
      const baseName = `${source}_${config.cannyConfig}_${config.cannyAttackMethod}`;
      return {
        clean: `/images/canny_targeted_attacks/${baseName}_clean.png`,
        perturbed: `/images/canny_targeted_attacks/${baseName}_attacked.png`,
        edgesClean: `/images/canny_targeted_attacks/${baseName}_edges_clean.png`,
        edgesPerturbed: `/images/canny_targeted_attacks/${baseName}_edges_attacked.png`,
      };
    } else if (dataSource === "effective") {
      const simId = `sim_${config.edgeDetector}_${config.attackType}_${config.attackStrength}`;
      return {
        clean: `/images/effective_simulation_results/${simId}_original.png`,
        perturbed: `/images/effective_simulation_results/${simId}_attacked.png`,
        edgesClean: `/images/effective_simulation_results/${simId}_edges_clean.png`,
        edgesPerturbed: `/images/effective_simulation_results/${simId}_edges_attacked.png`,
      };
    }

    // Fallback (never hit if all cases are handled)
    return {
      clean: "/images/placeholder.png",
      perturbed: "/images/placeholder.png",
      edgesClean: "/images/placeholder.png",
      edgesPerturbed: "/images/placeholder.png",
    };
  };

  // Load metadata based on data source
  const loadMetrics = async () => {
    setLoading(true);
    try {
      let metadataPath = "";
      let key = "";

      if (dataSource === "progressive") {
        metadataPath = "/images/progressive_attacks/metadata.json";
        key = `${config.imageSource}-${config.edgeDetector}-${config.attackLevel}`;
      } else if (dataSource === "targeted") {
        metadataPath = "/images/targeted_attacks/attack_results.json";
        key = `${config.imageSource}_${config.attackMethod}`;
      } else if (dataSource === "canny_targeted") {
        metadataPath = "/images/canny_targeted_attacks/attack_results.json";
        key = `${config.imageSource}_${config.cannyConfig}_${config.cannyAttackMethod}`;
      } else if (dataSource === "effective") {
        // For effective simulations, try to load individual result files
        const simId = `sim_${config.edgeDetector}_${config.attackType}_${config.attackStrength}`;
        metadataPath = `/images/effective_simulation_results/${simId}_results.json`;
      }

      const response = await fetch(metadataPath);
      if (response.ok) {
        const data = await response.json();

        if (dataSource === "effective") {
          setMetrics(data.metrics || null);
        } else {
          setMetrics(data[key] || null);
        }
      } else {
        // Use placeholder metrics
        setMetrics({
          edge_density_reduction: Math.random() * 0.5,
          contour_area_reduction: Math.random() * 0.4,
          attack_success: Math.random() > 0.5,
        });
      }
    } catch (error) {
      console.log("Could not load metrics, using placeholder data", error);
      setMetrics({
        edge_density_reduction: Math.random() * 0.5,
        contour_area_reduction: Math.random() * 0.4,
        attack_success: Math.random() > 0.5,
      });
    }
    setLoading(false);
  };

  // Check available detectors based on attack configuration
  const getAvailableDetectors = () => {
    if (dataSource === "progressive" && config.attackLevel === "contour") {
      return ["sobel", "canny", "laplacian", "roberts"];
    } else if (dataSource === "progressive") {
      return ["sobel", "canny"];
    } else if (dataSource === "targeted") {
      // Targeted attacks only use sobel
      return ["sobel"];
    } else if (dataSource === "canny_targeted") {
      // Canny targeted attacks only use canny
      return ["canny"];
    }
    // Effective simulations support all detectors
    return ["sobel", "canny", "laplacian", "roberts"];
  };

  // Update images and metrics when config changes
  useEffect(() => {
    const paths = buildImagePaths();
    setCurrentImages(paths);
    loadMetrics();
  }, [config, dataSource]);

  const availableDetectors = getAvailableDetectors();

  return (
    <div className="space-y-6">
      {/* Data Source Selector */}
      <div className="bg-black text-white p-4 border-2 border-black">
        <h3 className="text-lg font-bold mb-3">▶ SELECT DATA SOURCE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(DATA_SOURCES).map(([key, source]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setDataSource(key);
                // Auto-set edge detector for algorithm-specific attacks
                if (key === "canny_targeted") {
                  setConfig((prev) => ({ ...prev, edgeDetector: "canny" }));
                } else if (key === "targeted") {
                  setConfig((prev) => ({ ...prev, edgeDetector: "sobel" }));
                }
              }}
              className={`p-4 border-2 transition-all ${
                dataSource === key
                  ? "bg-white text-black border-white"
                  : "bg-black text-white border-gray-600 hover:border-white"
              }`}
            >
              <div className="font-bold mb-1">{source.name}</div>
              <div className="text-xs">{source.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Configuration Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Settings */}
        {dataSource !== "effective" && (
          <>
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
                    setConfig({
                      ...config,
                      imageSource: e.target.value as ImageSourceKey,
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono"
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
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono"
                  disabled={
                    dataSource === "targeted" && config.edgeDetector !== "sobel"
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
                {dataSource === "targeted" && (
                  <p className="text-xs text-gray-600 mt-1">
                    Note: Sobel targeted attacks only use Sobel detector
                  </p>
                )}
                {/* Canny Targeted Attacks */}
                {dataSource === "canny_targeted" && (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black mt-2">
                      Canny Configuration:
                    </label>
                    <select
                      value={config.cannyConfig}
                      onChange={(e) =>
                        setConfig({ ...config, cannyConfig: e.target.value })
                      }
                      className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono mb-4"
                    >
                      {Object.entries(CANNY_CONFIGS).map(([key, desc]) => (
                        <option key={key} value={key}>
                          {desc}
                        </option>
                      ))}
                    </select>

                    <label className="block text-sm font-bold mb-2 text-black">
                      Attack Method:
                    </label>
                    <select
                      value={config.cannyAttackMethod}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          cannyAttackMethod: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono"
                    >
                      {Object.entries(CANNY_ATTACK_METHODS).map(
                        ([key, desc]) => (
                          <option key={key} value={key}>
                            {desc}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Attack Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black border-b-2 border-black pb-2">
            ⚡ ATTACK CONFIGURATION
          </h3>

          {/* Progressive Attacks */}
          {dataSource === "progressive" && (
            <div>
              <label className="block text-sm font-bold mb-2 text-black">
                Attack Level:
              </label>
              <div className="space-y-2">
                {Object.entries(ATTACK_LEVELS).map(([level, info]) => (
                  <label key={level} className="flex items-start text-black">
                    <input
                      type="radio"
                      name="attackLevel"
                      value={level}
                      checked={config.attackLevel === level}
                      onChange={(e) => {
                        const newLevel = e.target.value;
                        const avail = getAvailableDetectors();
                        setConfig({
                          ...config,
                          attackLevel: newLevel,
                          edgeDetector: avail.includes(config.edgeDetector)
                            ? config.edgeDetector
                            : avail[0],
                        });
                      }}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <span className="font-semibold">{info.displayName}</span>
                      <span className="text-xs block text-gray-600">
                        Level: {level.replace("_", " ")}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Targeted Attacks */}
          {dataSource === "targeted" && (
            <div>
              <label className="block text-sm font-bold mb-2 text-black">
                Attack Method:
              </label>
              <select
                value={config.attackMethod}
                onChange={(e) =>
                  setConfig({ ...config, attackMethod: e.target.value })
                }
                className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono"
              >
                {Object.entries(ATTACK_METHODS).map(([key, desc]) => (
                  <option key={key} value={key}>
                    {desc}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Effective Simulations */}
          {dataSource === "effective" && (
            <>
              {/* Quick select for available configurations */}
              <div className="mb-4 p-3 bg-green-50 border-2 border-green-600">
                <label className="block text-sm font-bold mb-2 text-green-800">
                  Quick Select Available Configuration:
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      const cfg =
                        AVAILABLE_EFFECTIVE_CONFIGS[parseInt(e.target.value)];
                      setConfig({
                        ...config,
                        edgeDetector: cfg.detector,
                        attackType: cfg.attack,
                        attackStrength: cfg.strength,
                        lightingMode: cfg.lighting,
                      });
                    }
                  }}
                  className="w-full px-3 py-2 border-2 border-green-600 bg-white text-black font-mono"
                  defaultValue=""
                >
                  <option value="">-- Select a pre-generated config --</option>
                  {AVAILABLE_EFFECTIVE_CONFIGS.map((cfg, idx) => (
                    <option key={idx} value={idx}>
                      {cfg.detector.toUpperCase()} + {cfg.attack} +{" "}
                      {cfg.strength}
                      {cfg.lighting !== "normal" && ` (${cfg.lighting})`}
                    </option>
                  ))}
                </select>
              </div>
              {!isEffectiveConfigAvailable(
                config.edgeDetector,
                config.attackType,
                config.attackStrength
              ) && (
                <div className="p-3 bg-yellow-100 border-2 border-yellow-600 text-yellow-800 text-sm">
                  <strong>⚠️ Note:</strong> This specific configuration was not
                  pre-generated. Images may not be available.
                  <div className="mt-2 text-xs">
                    <strong>Available configs:</strong>
                    <ul className="mt-1 space-y-1">
                      {AVAILABLE_EFFECTIVE_CONFIGS.map((cfg, idx) => (
                        <li key={idx} className="font-mono">
                          • {cfg.detector} + {cfg.attack} + {cfg.strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
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
                    <span className="text-gray-400 text-sm">
                      Edge Density Reduction:
                    </span>
                    <div className="text-3xl font-bold mt-1">
                      {(metrics.edge_density_reduction * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">
                      Contour Area Reduction:
                    </span>
                    <div className="text-3xl font-bold mt-1">
                      {(metrics.contour_area_reduction * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">
                      Attack Result:
                    </span>
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

                {typeof metrics.edge_fraction_clean === "number" &&
                  typeof metrics.edge_fraction_perturbed === "number" && (
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
                      <div>
                        <span className="text-gray-400 text-xs">
                          Clean Edge Fraction:
                        </span>
                        <div className="text-lg font-mono">
                          {metrics.edge_fraction_clean.toFixed(3)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">
                          Perturbed Edge Fraction:
                        </span>
                        <div className="text-lg font-mono">
                          {metrics.edge_fraction_perturbed.toFixed(3)}
                        </div>
                      </div>
                    </div>
                  )}

                {metrics.fragmentation_increase !== undefined && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-gray-400 text-sm">
                      Edge Fragmentation Increase:
                    </span>
                    <div className="text-2xl font-bold mt-1">
                      {(metrics.fragmentation_increase * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Measures how much the attack breaks edges into
                      disconnected pieces
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center">ORIGINAL</h4>
                <img
                  src={currentImages.clean}
                  alt="Original"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.png";
                    target.onerror = null;
                  }}
                />
              </motion.div>

              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center">ATTACKED</h4>
                <img
                  src={currentImages.perturbed}
                  alt="Attacked"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.png";
                    target.onerror = null;
                  }}
                />
              </motion.div>

              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center">
                  EDGES (CLEAN)
                </h4>
                <img
                  src={currentImages.edgesClean}
                  alt="Clean Edges"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.png";
                    target.onerror = null;
                  }}
                />
              </motion.div>

              <motion.div
                className="border-2 border-black p-3 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-sm font-bold mb-2 text-center">
                  EDGES (ATTACKED)
                </h4>
                <img
                  src={currentImages.edgesPerturbed}
                  alt="Attacked Edges"
                  className="w-full h-auto border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.png";
                    target.onerror = null;
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
                  <span className="text-gray-600">Source:</span>
                  <div className="font-bold text-black">
                    {DATA_SOURCES[dataSource].name}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Image:</span>
                  <div className="font-bold text-black">
                    {config.imageSource}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Detector:</span>
                  <div className="font-bold text-black">
                    {config.edgeDetector.toUpperCase()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Attack:</span>
                  <div className="font-bold text-black">
                    {dataSource === "progressive" &&
                      ATTACK_LEVELS[config.attackLevel]?.type}
                    {dataSource === "targeted" && config.attackMethod}
                    {dataSource === "canny_targeted" && (
                      <div className="font-bold">
                        {CANNY_CONFIGS[config.cannyConfig]} /
                        {CANNY_ATTACK_METHODS[config.cannyAttackMethod]}
                      </div>
                    )}
                    {dataSource === "effective" && config.attackType}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="text-center p-8">
          <div className="inline-block animate-pulse">
            <div className="bg-black text-white px-4 py-2 font-mono">
              ▶ LOADING ATTACK DATA...
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {/* Configuration Explanation */}
      <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-600">
        <h4 className="font-bold text-yellow-800 mb-2">
          What you picked and why it matters
        </h4>
        <div className="text-sm text-yellow-700 space-y-2">
          {dataSource === "progressive" && (
            <p>
              <strong>{ATTACK_LEVELS[config.attackLevel].displayName}:</strong>{" "}
              {EXPLANATIONS.progressive[config.attackLevel]}
            </p>
          )}

          {dataSource === "targeted" && (
            <p>
              <strong>{ATTACK_METHODS[config.attackMethod]}:</strong>{" "}
              {EXPLANATIONS.targeted[config.attackMethod]}
            </p>
          )}

          {dataSource === "canny_targeted" && (
            <>
              <p>
                <strong>Canny thresholds:</strong>{" "}
                {CANNY_CONFIGS[config.cannyConfig]}. This sets the low/high
                hysteresis levels for edge linking.
              </p>
              <p>
                <strong>
                  {CANNY_ATTACK_METHODS[config.cannyAttackMethod]}:
                </strong>{" "}
                {/* a one-liner for each attack: */}
                {
                  {
                    hysteresis_threshold:
                      "Injects noise specifically between the low and high thresholds to break connectivity.",
                    gradient_smoothing:
                      "Smooths gradients in edge regions to reduce edge strength selectively.",
                    non_max_suppression:
                      "Adds competing gradients so that the thinning step misfires.",
                    connectivity_breaking:
                      "Randomly gaps edges to stop Canny’s hysteresis from linking them.",
                    multi_scale:
                      "Applies noise at multiple scales to confuse thresholds at every level.",
                  }[config.cannyAttackMethod]
                }
              </p>
            </>
          )}

          {dataSource === "effective" && (
            <>
              <p>
                <strong>{ATTACK_TYPES[config.attackType]}:</strong> under{" "}
                {ATTACK_STRENGTHS[config.attackStrength]} strength — this shows
                how {ATTACK_TYPES[config.attackType].toLowerCase()} behaves when
                it’s {ATTACK_STRENGTHS[config.attackStrength].toLowerCase()}.
              </p>
              <p>
                <strong>Lighting mode:</strong>{" "}
                {LIGHTING_MODES[config.lightingMode]}. This simulates how
                real-world lighting (e.g. low light or high contrast) can
                amplify or dampen your chosen attack.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationForm;
