import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle({ isPlaying, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 180 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full
                 bg-white/70 backdrop-blur-md border border-white/60
                 text-dream-700 font-semibold text-sm shadow-lg cursor-pointer"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isPlaying ? "on" : "off"}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="text-base"
        >
          {isPlaying ? "🎵" : "🔇"}
        </motion.span>
      </AnimatePresence>
      <span className="hidden sm:inline">
        {isPlaying ? "Music On" : "Music Off"}
      </span>
    </motion.button>
  );
}
