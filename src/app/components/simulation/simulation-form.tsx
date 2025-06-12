"use client";

import React, { useState, useEffect } from "react";
import ImageSettings from "@/app/components/simulation/image-settings";
import AttackSettings from "@/app/components/simulation/attack-settings";
import MetricsPanel from "@/app/components/simulation/metrics-panel";
import ImageGallery from "@/app/components/simulation/image-gallery";
import ConfigSummary from "@/app/components/simulation/config-summary";
import { motion, AnimatePresence } from "framer-motion";

// ----- Constants & Helpers -----
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

interface CurrentImages {
  clean: string;
  perturbed: string;
  edgesClean: string;
  edgesPerturbed: string;
}

const buildImagePaths = (
  source: string,
  detector: string,
  level: string
): CurrentImages => {
  const baseName = `${source}-${detector}-${level}`;
  return {
    clean: `/images/progressive_attacks/${baseName}-clean.png`,
    perturbed: `/images/progressive_attacks/${baseName}-pert.png`,
    edgesClean: `/images/progressive_attacks/${baseName}-edges-clean.png`,
    edgesPerturbed: `/images/progressive_attacks/${baseName}-edges-pert.png`,
  };
};

const getAvailableDetectors = (level: string): string[] =>
  level === "contour"
    ? ["sobel", "canny", "laplacian", "roberts"]
    : ["sobel", "canny"];

// ----- Parent Component -----
const SimulationForm: React.FC = () => {
  const [config, setConfig] = useState({
    imageSource: "pedestrian",
    edgeDetector: "sobel",
    attackLevel: "moderate_pixels",
    attackType: ATTACK_TYPES_BY_LEVEL["moderate_pixels"].type,
  });
  const [currentImages, setCurrentImages] = useState<CurrentImages | null>(
    null
  );
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load metrics on config change
  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/images/progressive_attacks/metadata.json");
      if (res.ok) {
        const data = await res.json();
        const key = `${config.imageSource}-${config.edgeDetector}-${config.attackLevel}`;
        setMetrics(data[key] || null);
      }
    } catch {
      setMetrics(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    setCurrentImages(
      buildImagePaths(
        IMAGE_SOURCE_MAP[config.imageSource],
        config.edgeDetector,
        config.attackLevel
      )
    );
    fetchMetrics();
  }, [config]);

  const availableDetectors = getAvailableDetectors(config.attackLevel);

  // Unique key to trigger AnimatePresence on each config change
  const animationKey = `${config.imageSource}-${config.edgeDetector}-${config.attackLevel}`;

  return (
    <div className="space-y-6 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageSettings
          config={{
            imageSource: config.imageSource,
            edgeDetector: config.edgeDetector,
          }}
          onChange={(upd) => setConfig({ ...config, ...upd })}
          detectors={EDGE_DETECTORS}
          availableDetectors={availableDetectors}
        />

        <AttackSettings
          attackTypes={ATTACK_TYPES_BY_LEVEL}
          currentLevel={config.attackLevel}
          onLevelChange={(level) => {
            const avail = getAvailableDetectors(level);
            setConfig({
              ...config,
              attackLevel: level,
              attackType: ATTACK_TYPES_BY_LEVEL[level].type,
              edgeDetector: avail.includes(config.edgeDetector)
                ? config.edgeDetector
                : avail[0],
            });
          }}
        />
      </div>

      <AnimatePresence exitBeforeEnter>
        {!loading && currentImages && metrics && (
          <motion.div
            key={animationKey}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "tween", duration: 0.4 }}
            className="bg-gray-900 p-4 rounded border border-gray-700 text-white"
          >
            <pre className="ascii-header mb-4">
              ▶ Example Results for {animationKey}
            </pre>
            <MetricsPanel metrics={metrics} />
            <ImageGallery images={currentImages} />
            <ConfigSummary
              config={config as any}
              attackTypes={ATTACK_TYPES_BY_LEVEL}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="text-center font-mono text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default SimulationForm;
