import { motion } from "framer-motion";
import type { Subject } from "../types";

interface ModeSelectProps {
  subject: Subject;
  onPickFlashcards: () => void;
  onPickQuiz: () => void;
  onBack: () => void;
}

export default function ModeSelect({ subject, onPickFlashcards, onPickQuiz, onBack }: ModeSelectProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
      >
        ← Back to subjects
      </button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col items-center text-center"
      >
        <div
          className={`mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${subject.gradient} text-4xl shadow-xl`}
        >
          {subject.icon}
        </div>
        <h1 className="text-3xl font-black text-slate-800 sm:text-4xl">{subject.name}</h1>
        <p className="mt-2 max-w-md text-slate-500">{subject.tagline}</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPickFlashcards}
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 text-left shadow-xl backdrop-blur-xl"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-sky-300 to-indigo-300 opacity-40 blur-2xl" />
          <div className="relative z-10">
            <div className="mb-3 text-4xl">🗂️</div>
            <h2 className="mb-2 text-xl font-extrabold text-slate-800">Flashcards</h2>
            <p className="text-sm text-slate-500">
              Flip through {subject.flashcards.length} vivid cards at your own pace. Tap to reveal
              the answer and mark what you know.
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">
              Start flashcards →
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPickQuiz}
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 text-left shadow-xl backdrop-blur-xl"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-fuchsia-300 to-rose-300 opacity-40 blur-2xl" />
          <div className="relative z-10">
            <div className="mb-3 text-4xl">🎯</div>
            <h2 className="mb-2 text-xl font-extrabold text-slate-800">Randomized Quiz</h2>
            <p className="text-sm text-slate-500">
              Test yourself with {subject.quiz.length} shuffled questions & answers. Get instant
              feedback and a final score with confetti!
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-fuchsia-600">
              Start quiz →
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
