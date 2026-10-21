import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Subject } from "../types";
import { fireConfetti } from "../utils/confetti";

export interface AnsweredQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null;
  explanation: string;
}

interface QuizResultProps {
  subject: Subject;
  score: number;
  total: number;
  answered: AnsweredQuestion[];
  onRetry: () => void;
  onBack: () => void;
  onFlashcards: () => void;
}

export default function QuizResult({ subject, score, total, answered, onRetry, onBack, onFlashcards }: QuizResultProps) {
  const pct = Math.round((score / total) * 100);

  useEffect(() => {
    if (pct >= 60) fireConfetti();
  }, [pct]);

  const message =
    pct === 100
      ? "Perfect score! You're a legend! 🏆"
      : pct >= 80
      ? "Excellent work! Almost flawless! 🌟"
      : pct >= 60
      ? "Nice job! Solid understanding. 👏"
      : pct >= 40
      ? "Good attempt — a bit more practice! 📚"
      : "Keep going! Flashcards will help a lot. 💪";

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10"
      >
        <div
          className={`absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br ${subject.gradient} opacity-30 blur-3xl`}
        />
        <div className="relative z-10">
          <span className="text-5xl">{pct >= 60 ? "🎉" : "📘"}</span>
          <h2 className="mt-3 text-2xl font-black text-slate-800 sm:text-3xl">Quiz Complete!</h2>
          <p className="mt-1 text-slate-500">{message}</p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
            className={`mx-auto my-8 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br ${subject.gradient} shadow-2xl`}
          >
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
              <span className="text-3xl font-black text-slate-800">{pct}%</span>
              <span className="text-xs font-semibold text-slate-400">
                {score}/{total} correct
              </span>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onRetry}
              className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-200 transition hover:scale-105"
            >
              🔁 Try again
            </button>
            <button
              onClick={onFlashcards}
              className="rounded-full bg-indigo-100 px-5 py-2.5 text-sm font-bold text-indigo-600 shadow-sm transition hover:bg-indigo-200"
            >
              🗂️ Review flashcards
            </button>
            <button
              onClick={onBack}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:border-violet-300 hover:text-violet-600"
            >
              🏠 All subjects
            </button>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 space-y-3">
        <h3 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-400">
          Review your answers
        </h3>
        {answered.map((a, i) => {
          const isCorrect = a.selectedIndex === a.correctIndex;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-2xl border p-4 shadow-sm ${
                isCorrect ? "border-emerald-200 bg-emerald-50/70" : "border-rose-200 bg-rose-50/70"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-lg">{isCorrect ? "✅" : "❌"}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{a.question}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Correct answer:{" "}
                    <span className="font-bold text-emerald-600">{a.options[a.correctIndex]}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-slate-500">
                      Your answer:{" "}
                      <span className="font-bold text-rose-500">
                        {a.selectedIndex !== null ? a.options[a.selectedIndex] : "No answer"}
                      </span>
                    </p>
                  )}
                  <p className="mt-1.5 text-xs italic text-slate-400">{a.explanation}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
