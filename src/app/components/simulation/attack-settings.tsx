import React from "react";

interface AttackInfo {
  type: string;
  displayName: string;
}
interface Props {
  attackTypes: Record<string, AttackInfo>;
  currentLevel: string;
  onLevelChange: (newLevel: string) => void;
}

export default function AttackSettings({
  attackTypes,
  currentLevel,
  onLevelChange,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold border-b-2 pb-2">
        ⚡ ATTACK CONFIGURATION
      </h3>

      <div>
        <label className="block text-sm font-bold mb-1">
          Attack Level & Type:
        </label>
        <div className="space-y-2">
          {Object.entries(attackTypes).map(([level, info]) => (
            <label key={level} className="flex items-start">
              <input
                type="radio"
                name="attackLevel"
                value={level}
                checked={currentLevel === level}
                onChange={() => onLevelChange(level)}
                className="mt-1 mr-3"
              />
              <div>
                <span className="font-semibold">{info.displayName}</span>
                <span className="text-xs block">
                  Level: {level.replace("_", " ")}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
