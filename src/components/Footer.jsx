import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="text-center text-[22px] font-extrabold py-6
                 bg-gradient-to-r from-pinky-500 to-dream-500
                 bg-clip-text text-transparent"
    >
      Danish is all yours 💗🦋
    </motion.div>
  );
}
