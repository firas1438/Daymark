import { motion } from "framer-motion";

export default function PatternBackground({ className = "" }) {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {/* mosaic sandy background */}
      <div className="absolute inset-0 bg-[var(--color-peach)]"></div>

      {/* decorative floating patterns */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute h-48 w-48 bg-[var(--color-sandy-brown)]/10 top-1/4 -left-24"
          animate={{ x: [0, 20, 0], y: [0, 30, 0], scale: [1, 1.05, 1], rotate: [0, 5, 0], }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", }}
        />
        <motion.div
          className="absolute h-64 w-64 rounded-full bg-[var(--color-pigment-green)]/10 bottom-1/3 -right-32"
          animate={{ x: [0, -20, 0], y: [0, -15, 0], scale: [1, 1.1, 1], rotate: [0, -5, 0], }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2, }}
        />
        <motion.div
          className="absolute h-32 w-32 bg-[var(--color-sandy-brown)]/10 top-2/3 left-1/4 rounded-lg"
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1], }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", }}
        />
      </div>
    </div>
  );
}
