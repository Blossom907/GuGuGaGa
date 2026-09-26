import { floatingEmojis } from "../data/stories";

export default function FloatingEmojis() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {floatingEmojis.map(({ emoji, left, delay }, i) => (
        <div
          key={i}
          style={{ left, animationDelay: delay }}
          className="absolute bottom-[-60px] text-[28px] opacity-60 animate-floatUp"
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
