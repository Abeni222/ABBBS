import { motion } from "framer-motion";

const blobs = [
  { className: "bg-fuchsia-300/40 h-72 w-72", top: "5%", left: "8%", duration: 18 },
  { className: "bg-sky-300/40 h-96 w-96", top: "45%", left: "70%", duration: 22 },
  { className: "bg-amber-300/40 h-80 w-80", top: "70%", left: "15%", duration: 26 },
  { className: "bg-emerald-300/30 h-64 w-64", top: "10%", left: "60%", duration: 20 },
  { className: "bg-violet-300/30 h-72 w-72", top: "80%", left: "75%", duration: 24 },
];

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={{ top: blob.top, left: blob.left }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(100,100,120,0.08)_1px,transparent_0)] bg-[size:28px_28px]" />
    </div>
  );
}
