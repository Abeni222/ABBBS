import { motion } from "framer-motion";
import type { Subject } from "../types";

interface SubjectCardProps {
  subject: Subject;
  onSelect: (id: string) => void;
  index: number;
}

export default function SubjectCard({ subject, onSelect, index }: SubjectCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(subject.id)}
      className={`group relative w-full overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 text-left shadow-xl ${subject.glow} backdrop-blur-xl transition-shadow hover:shadow-2xl`}
    >
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${subject.gradient} opacity-30 blur-2xl transition-transform duration-500 group-hover:scale-125`}
      />
      <div className="relative z-10">
        <div
          className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.gradient} text-3xl shadow-lg`}
        >
          {subject.icon}
        </div>
        <h3 className="mb-1 text-xl font-extrabold text-slate-800">{subject.name}</h3>
        <p className="mb-4 text-sm text-slate-500">{subject.tagline}</p>
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="rounded-full bg-slate-100 px-2.5 py-1">
            {subject.flashcards.length} flashcards
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1">
            {subject.quiz.length} quiz Qs
          </span>
        </div>
        <div
          className={`mt-5 inline-flex items-center gap-1 text-sm font-bold ${subject.accent} opacity-0 transition-opacity group-hover:opacity-100`}
        >
          Start learning <span aria-hidden>→</span>
        </div>
      </div>
    </motion.button>
  );
}
