import { useState } from "react";
import { motion } from "framer-motion";

import FloatingEmojis from "./components/FloatingEmojis";
import Hero from "./components/Hero";
import StoryCard from "./components/StoryCard";
import Message from "./components/Message";
import Question from "./components/Question";
import Footer from "./components/Footer";
import MusicToggle from "./components/MusicToggle";

import useInView from "./hooks/useInView";
import useBackgroundMusic from "./hooks/useBackgroundMusic";

import { stories } from "./data/stories";

function RevealStory({ story }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="my-5"
    >
      <StoryCard image={story.image} />
      {story.message && <Message>{story.message}</Message>}
    </motion.div>
  );
}

export default function App() {
  const [forgiven, setForgiven] = useState(false);
  const { isPlaying, toggle } = useBackgroundMusic("/music/bg.mp3", {
    volume: 0.32,
  });

  return (
    <div className="relative min-h-screen text-dream-800 overflow-x-hidden">
      <FloatingEmojis />
      <MusicToggle isPlaying={isPlaying} onToggle={toggle} />

      <main className="relative max-w-[900px] mx-auto px-4 pt-6 pb-20 z-[2]">
        <Hero />

        {stories.map((story, i) => (
          <RevealStory key={i} story={story} />
        ))}

        <Question onYes={() => setForgiven(true)} />

        {forgiven && <Footer />}
      </main>
    </div>
  );
}
