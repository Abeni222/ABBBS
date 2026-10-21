import { motion } from "framer-motion";

interface NavbarProps {
  onHome: () => void;
  subjectName?: string;
  streak: number;
}

export default function Navbar({ onHome, subjectName, streak }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={onHome}
          className="group flex items-center gap-2.5 text-left"
        >
          <motion.span
            whileHover={{ rotate: [0, -10, 10, -6, 0] }}
            transition={{ duration: 0.6 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-xl shadow-lg shadow-fuchsia-300/50"
          >
            🧠
          </motion.span>
          <span>
            <span className="block text-base font-extrabold tracking-tight text-slate-800 sm:text-lg">
              BrainSpark
            </span>
            <span className="block text-[11px] font-medium text-slate-400 sm:text-xs">
              {subjectName ? subjectName : "Learn. Play. Level up."}
            </span>
          </span>
        </button>

        <div className="flex items-center gap-3">
          {streak > 0 && (
            <motion.div
              key={streak}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-orange-200"
            >
              🔥 {streak} streak
            </motion.div>
          )}
          <button
            onClick={onHome}
            className="hidden rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-violet-300 hover:text-violet-600 sm:inline-block"
          >
            All Subjects
          </button>
        </div>
      </div>
    </header>
  );
}
