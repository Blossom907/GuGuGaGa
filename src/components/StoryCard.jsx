import { motion } from "framer-motion";

export default function StoryCard({ image, alt = "message" }) {
  return (
    <motion.div
      whileHover={{ y: -4, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="bg-white/80 backdrop-blur-md rounded-[28px] p-4 sm:p-5
                 shadow-[0_18px_50px_-12px_rgba(168,85,247,0.25)]
                 ring-1 ring-white/60"
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="w-full block rounded-2xl"
      />
    </motion.div>
  );
}
