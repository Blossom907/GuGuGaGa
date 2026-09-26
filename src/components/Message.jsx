import { motion } from "framer-motion";

export default function Message({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="text-center text-[clamp(21px,4vw,34px)] font-extrabold leading-relaxed
                 px-3 py-6 text-dream-800"
    >
      {children}
    </motion.div>
  );
}
