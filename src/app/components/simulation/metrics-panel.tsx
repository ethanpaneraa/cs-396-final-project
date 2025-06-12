import React from "react";

interface Metrics {
  edge_density_reduction: number;
  contour_area_reduction: number;
  attack_success: boolean;
  edge_fraction_clean?: number;
  edge_fraction_perturbed?: number;
}
interface Props {
  metrics: Metrics;
}

export default function MetricsPanel({ metrics }: Props) {
  return (
    <div className="bg-black text-white p-6 border-2">
      <h3 className="text-xl font-bold mb-4">
        █ ATTACK EFFECTIVENESS METRICS █
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span className="text-black text-sm">Edge Density Reduction:</span>
          <div className="text-3xl font-bold mt-1">
            {(metrics.edge_density_reduction * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <span className="text-black text-sm">Contour Area Reduction:</span>
          <div className="text-3xl font-bold mt-1">
            {(metrics.contour_area_reduction * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <span className="text-black text-sm">Attack Result:</span>
          <div
            className={`text-3xl font-bold mt-1 ${
              metrics.attack_success ? "text-red-500" : "text-green-500"
            }`}
          >
            {metrics.attack_success ? "⚠️ SUCCESS" : "✓ DEFENDED"}
          </div>
        </div>
      </div>
      {metrics.edge_fraction_clean !== undefined && (
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
          <div>
            <span className="text-black text-xs">Clean Edge Fraction:</span>
            <div className="text-lg font-mono">
              {metrics.edge_fraction_clean!.toFixed(3)}
            </div>
          </div>
          <div>
            <span className="text-black text-xs">Perturbed Edge Fraction:</span>
            <div className="text-lg font-mono">
              {metrics.edge_fraction_perturbed!.toFixed(3)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
