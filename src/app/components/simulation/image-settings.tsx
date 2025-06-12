import React from "react";

interface Props {
  config: { imageSource: string; edgeDetector: string };
  onChange: (
    updates: Partial<{ imageSource: string; edgeDetector: string }>
  ) => void;
  detectors: Record<string, string>;
  availableDetectors: string[];
}

export default function ImageSettings({
  config,
  onChange,
  detectors,
  availableDetectors,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold border-b-2 pb-2">
        ▶ IMAGE & DETECTION SETTINGS
      </h3>

      <div>
        <label className="block text-sm font-bold mb-1">Source Image:</label>
        <select
          value={config.imageSource}
          onChange={(e) => onChange({ imageSource: e.target.value })}
          className="w-full px-3 py-2 border-2 bg-white font-mono focus:outline-none"
        >
          <option value="pedestrian">Pedestrian Crossing</option>
          <option value="stop_sign">Stop Sign</option>
          <option value="street_scene">Street Scene</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1">
          Edge Detection Algorithm:
        </label>
        <select
          value={config.edgeDetector}
          disabled={!availableDetectors.includes(config.edgeDetector)}
          onChange={(e) => onChange({ edgeDetector: e.target.value })}
          className="w-full px-3 py-2 border-2 bg-white font-mono focus:outline-none"
        >
          {Object.entries(detectors).map(([key, desc]) => (
            <option
              key={key}
              value={key}
              disabled={!availableDetectors.includes(key)}
            >
              {key.toUpperCase()} — {desc}
            </option>
          ))}
        </select>
        {!availableDetectors.includes(config.edgeDetector) && (
          <p className="text-xs text-red-600 mt-1">
            Note: {config.edgeDetector} not available for this attack level
          </p>
        )}
      </div>
    </div>
  );
}
