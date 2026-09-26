import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative text-center px-5 pt-14 pb-10 z-[2]">
      <motion.h1
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-[clamp(38px,8vw,66px)] font-extrabold mb-3
                   bg-gradient-to-r from-pinky-500 via-dream-500 to-lav-300
                   bg-clip-text text-transparent drop-shadow-sm"
      >
        I'm Sorry 🥺💗
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="text-xl text-dream-700/70 m-0 font-medium"
      >
        Bas ek chhoti si baat kehni thi...
      </motion.p>
    </section>
  );
}
