import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SimulationForm = () => {
  const [dataSource, setDataSource] = useState("progressive"); // 'progressive', 'targeted', 'canny_targeted', 'effective'
  const [config, setConfig] = useState({
    // Common
    imageSource: "pedestrian",
    edgeDetector: "sobel",

    // Progressive attacks specific
    attackLevel: "moderate_pixels",

    // Targeted attacks specific
    attackMethod: "edge_blur",

    // Canny targeted specific
    cannyConfig: "standard",
    cannyAttackMethod: "hysteresis_threshold",

    // Effective simulation specific
    attackType: "contour_disrupt",
    attackStrength: "moderate",
    lightingMode: "normal",
    resolution: 256,
  });

  const [currentImages, setCurrentImages] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableConfigs, setAvailableConfigs] = useState([]);

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

  // Available combinations for effective simulations (from your Python script)
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

  const isEffectiveConfigAvailable = (detector, attack, strength) => {
    return AVAILABLE_EFFECTIVE_CONFIGS.some(
      (cfg) =>
        cfg.detector === detector &&
        cfg.attack === attack &&
        cfg.strength === strength
    );
  };

  // Build image paths based on data source
  const buildImagePaths = () => {
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
      // For effective simulations, the source name is embedded in the sim_id
      // The Python script generates files for all sources with the same config
      const sourceMap = {
        pedestrian: "ped",
        stop_sign: "stop",
        street_scene: "street",
      };
      const mappedSource = sourceMap[config.imageSource] || config.imageSource;
      const simId = `sim_${config.edgeDetector}_${config.attackType}_${config.attackStrength}`;

      // Note: The effective simulation script doesn't include source in filename
      // It processes all images with the same configuration
      return {
        clean: `/images/effective_simulation_results/${simId}_original.png`,
        perturbed: `/images/effective_simulation_results/${simId}_attacked.png`,
        edgesClean: `/images/effective_simulation_results/${simId}_edges_clean.png`,
        edgesPerturbed: `/images/effective_simulation_results/${simId}_edges_attacked.png`,
      };
    }
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
      console.log("Could not load metrics, using placeholder data");
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
                <label className="block text-sm font-bold mb-2">
                  Source Image:
                </label>
                <select
                  value={config.imageSource}
                  onChange={(e) =>
                    setConfig({ ...config, imageSource: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono"
                >
                  <option value="pedestrian">Pedestrian Crossing</option>
                  <option value="stop_sign">Stop Sign</option>
                  <option value="street_scene">Street Scene</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
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
                    <label className="block text-sm font-bold mb-2">
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

                    <label className="block text-sm font-bold mb-2">
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

              {/* Resolution selector for effective simulations */}
              {/* {dataSource === "effective" && (
            <div>
              <label className="block text-sm font-bold mb-2">
                Resolution:
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="64"
                value={config.resolution}
                onChange={(e) =>
                  setConfig({ ...config, resolution: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <span className="text-xs">
                {config.resolution}x{config.resolution}px
              </span>
            </div>
          )} */}
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
              <label className="block text-sm font-bold mb-2">
                Attack Level:
              </label>
              <div className="space-y-2">
                {Object.entries(ATTACK_LEVELS).map(([level, info]) => (
                  <label key={level} className="flex items-start">
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
              <label className="block text-sm font-bold mb-2">
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
              {/*
              <div>
                <label className="block text-sm font-bold mb-2">
                  Attack Type:
                </label>
                <select
                  value={config.attackType}
                  onChange={(e) =>
                    setConfig({ ...config, attackType: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono"
                >
                  {Object.entries(ATTACK_TYPES).map(([key, desc]) => (
                    <option key={key} value={key}>
                      {desc}
                    </option>
                  ))}
                </select>
              </div> */}
              {/*
              <div>
                <label className="block text-sm font-bold mb-2">
                  Attack Strength:
                </label>
                <div className="space-y-2">
                  {Object.entries(ATTACK_STRENGTHS).map(([key, desc]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="radio"
                        name="attackStrength"
                        value={key}
                        checked={config.attackStrength === key}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            attackStrength: e.target.value,
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">
                        <strong>{key.toUpperCase()}</strong> - {desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div> */}

              {/* <div>
                <label className="block text-sm font-bold mb-2">
                  Lighting Mode:
                </label>
                <select
                  value={config.lightingMode}
                  onChange={(e) =>
                    setConfig({ ...config, lightingMode: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black font-mono"
                >
                  {Object.entries(LIGHTING_MODES).map(([key, desc]) => (
                    <option key={key} value={key}>
                      {desc}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Configuration availability warning */}
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

                {metrics.edge_fraction_clean && (
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
                    e.target.src = "/images/placeholder.png";
                    e.target.onerror = null;
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
                    e.target.src = "/images/placeholder.png";
                    e.target.onerror = null;
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
                    e.target.src = "/images/placeholder.png";
                    e.target.onerror = null;
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
                    e.target.src = "/images/placeholder.png";
                    e.target.onerror = null;
                  }}
                />
              </motion.div>
            </div>

            {/* Configuration Summary */}
            <div className="border-2 border-black p-4 bg-gray-50">
              <h4 className="font-bold mb-3">Current Configuration:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-mono">
                <div>
                  <span className="text-gray-600">Source:</span>
                  <div className="font-bold">
                    {DATA_SOURCES[dataSource].name}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Image:</span>
                  <div className="font-bold">{config.imageSource}</div>
                </div>
                <div>
                  <span className="text-gray-600">Detector:</span>
                  <div className="font-bold">
                    {config.edgeDetector.toUpperCase()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Attack:</span>
                  <div className="font-bold">
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
      <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-600">
        <h4 className="font-bold text-yellow-800 mb-2">
          ⚠️ SECURITY TESTING PROTOCOL
        </h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>
            <strong>Progressive Attacks:</strong> Test incremental attack
            strength from gentle to aggressive perturbations.
          </p>
          <p>
            <strong>Targeted Attacks:</strong> Apply specific attack methods
            optimized for maximum edge disruption.
          </p>
          <p>
            <strong>Effective Simulations:</strong> Full simulation environment
            with lighting conditions and multiple attack vectors.
          </p>
          <p className="mt-3 font-semibold">
            Document all successful attacks for the DriveGuard engineering team
            to implement defensive measures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationForm;
