import React from "react";
import { motion } from "framer-motion";

interface Images {
  clean: string;
  perturbed: string;
  edgesClean: string;
  edgesPerturbed: string;
}
interface Props {
  images: Images;
}

export default function ImageGallery({ images }: Props) {
  const items = [
    { label: "ORIGINAL", src: images.clean, alt: "Original" },
    { label: "ATTACKED", src: images.perturbed, alt: "Attacked" },
    { label: "EDGES (CLEAN)", src: images.edgesClean, alt: "Clean Edges" },
    {
      label: "EDGES (ATTACKED)",
      src: images.edgesPerturbed,
      alt: "Attacked Edges",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ label, src, alt }) => (
        <motion.div
          key={label}
          className="border-2 p-3 bg-white"
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-sm font-bold mb-2 text-center">{label}</h4>
          <img
            src={src}
            alt={alt}
            className="w-full h-auto border border-gray-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.png";
              (e.target as any).onerror = null;
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
