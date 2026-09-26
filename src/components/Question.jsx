import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { burstLoveConfetti } from "../utils/confetti";

const NO_TAUNTS = [
  "No please 🥲",
  "Please na yaar... 🥺",
  "Tu naraz hai kya? 🥺💔",
  "Maan jao na... 🥺",
  "Dil se sorry bol raha hoon... 💗",
  "Ek last mauka do... 🙏",
  "Theek hai... jaanta hoon tu maaf kar degi 💜",
];

// Each stage changes the No button's position while hovering
const NO_HOVER_MOTION = [
  { x: 0, y: 0 }, // stage 0 → no dodge
  { x: 0, y: 0 }, // stage 1 → still (first click happened)
  { x: 40, y: 0 }, // stage 2 → nudges right on hover
  { x: 80, y: 0 }, // stage 3 → slides further right
  { x: -70, y: 0 }, // stage 4 → jumps left
  { x: 0, y: 30 }, // stage 5 → dips down
  { x: 0, y: 0 }, // stage 6 → "slides toward Yes" (handled below)
];

export default function Question({ onYes }) {
  const [noCount, setNoCount] = useState(0);
  const [answered, setAnswered] = useState(false);

  const stage = Math.min(noCount, NO_TAUNTS.length - 1);
  const gaveUp = noCount >= NO_TAUNTS.length - 1;
  const noScale = Math.max(1 - noCount * 0.06, 0.7);

  // On the 6th attempt (stage 6), the No button drifts toward Yes.
  // On the 7th attempt (gaveUp), it fades & becomes unclickable.
  const dodge = NO_HOVER_MOTION[stage] ?? { x: 0, y: 0 };

  const handleNoClick = () => {
    if (gaveUp) return; // 7th attempt — No gives up, does nothing
    setNoCount((c) => c + 1);
  };

  const handleYes = () => {
    setAnswered(true);
    burstLoveConfetti();

    // soft chime
    try {
      const a = new Audio("/sounds/yes.mp3");
      a.volume = 0.5;
      a.play().catch(() => {});
    } catch {}

    onYes?.();
  };

  return (
    <section className="relative text-center px-4 py-12 z-[2]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-[clamp(30px,7vw,52px)] font-extrabold mb-8
                   text-dream-800"
      >
        Do you forgive me? 🥺
      </motion.h2>

      <div className="flex justify-center items-center gap-5 flex-wrap min-h-[80px]">
        {/* YES — gently pulsing to invite the click */}
        <motion.button
          onClick={handleYes}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.94 }}
          className="rounded-full px-10 py-4 text-xl font-bold text-white
                     bg-gradient-to-r from-pinky-500 to-dream-500
                     glow-pink cursor-pointer"
        >
          Yes 💗
        </motion.button>

        {/* NO — playful, dodging, shrinking, eventually gives up */}
        <AnimatePresence mode="wait">
          {!gaveUp ? (
            <motion.button
              key="no-alive"
              onClick={handleNoClick}
              onHoverStart={() => {}}
              // Hover motion (safe dodge). Click still works because we
              // don't actually teleport far away — just a nudge.
              whileHover={{
                ...dodge,
                transition: { type: "spring", stiffness: 240, damping: 18 },
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: noScale }}
              className="rounded-full px-10 py-4 text-xl font-bold text-dream-800
                         bg-white/80 backdrop-blur-md ring-1 ring-dream-200
                         shadow-[0_10px_30px_-10px_rgba(168,85,247,0.35)]
                         cursor-pointer select-none"
            >
              {NO_TAUNTS[stage]
                .replace(/^No /, "")
                .replace(/^Theek hai\.\.\. /, "") || "No 😭"}
              <span className="sr-only">No</span>
            </motion.button>
          ) : (
            <motion.div
              key="no-gone"
              initial={{ opacity: 1, scale: noScale }}
              animate={{ opacity: 0, scale: 0.4, y: 20 }}
              transition={{ duration: 0.9, ease: "easeIn" }}
              className="rounded-full px-10 py-4 text-xl font-bold text-dream-400
                         bg-white/40 backdrop-blur-md ring-1 ring-dream-200
                         cursor-not-allowed select-none"
            >
              No 😭
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Taunt message that swaps with each No attempt */}
      <AnimatePresence mode="wait">
        {noCount > 0 && !answered && (
          <motion.p
            key={noCount}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="mt-6 text-lg sm:text-xl font-semibold text-dream-700"
          >
            {NO_TAUNTS[stage]}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Final promise, only after Yes */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
            className="mt-8 text-[26px] font-bold
                       bg-gradient-to-r from-pinky-500 via-dream-500 to-lav-300
                       bg-clip-text text-transparent"
          >
            Thank you 🥺❤️ I promise, ab dhyaan rakhunga.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
