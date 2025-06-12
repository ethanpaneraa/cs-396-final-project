import React from "react";

interface Config {
  imageSource: string;
  edgeDetector: string;
  attackType: string;
  attackLevel: string;
}
interface AttackInfo {
  type: string;
  displayName: string;
}
interface Props {
  config: Config;
  attackTypes: Record<string, AttackInfo>;
}

export default function ConfigSummary({ config, attackTypes }: Props) {
  const attackName = attackTypes[config.attackLevel]?.type ?? config.attackType;

  return (
    <div className="border-2 p-4 bg-gray-50">
      <h4 className="font-bold mb-3">Current Configuration:</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-mono">
        <div>
          <span>Source:</span>
          <div className="font-bold">{config.imageSource}</div>
        </div>
        <div>
          <span>Detector:</span>
          <div className="font-bold">{config.edgeDetector.toUpperCase()}</div>
        </div>
        <div>
          <span>Attack:</span>
          <div className="font-bold">{attackName}</div>
        </div>
        <div>
          <span>Level:</span>
          <div className="font-bold">{config.attackLevel}</div>
        </div>
      </div>
    </div>
  );
}
