import { motion } from "framer-motion";
import { subjects } from "../data/subjects";
import SubjectCard from "./SubjectCard";

interface HomeProps {
  onSelectSubject: (id: string) => void;
}

const stats = [
  { label: "Subjects", value: "5", emoji: "📚" },
  { label: "Flashcards", value: "80+", emoji: "🗂️" },
  { label: "Quiz Questions", value: "60+", emoji: "❓" },
  { label: "Fun guaranteed", value: "100%", emoji: "✨" },
];

export default function Home({ onSelectSubject }: HomeProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-600 shadow-sm ring-1 ring-violet-100">
          🎉 Flashcards + Quizzes, reimagined
        </span>
        <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-slate-800 sm:text-6xl">
          Learn faster with{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            colorful, bite-sized
          </span>{" "}
          knowledge
        </h1>
        <p className="mx-auto max-w-xl text-base text-slate-500 sm:text-lg">
          Flip through vibrant flashcards and challenge yourself with randomized quizzes
          across Anthropology, Global Trends, Economics, Entrepreneurship, and Emerging Tech.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/60 bg-white/70 px-4 py-4 text-center shadow-md backdrop-blur-xl"
          >
            <div className="text-2xl">{s.emoji}</div>
            <div className="mt-1 text-xl font-extrabold text-slate-800">{s.value}</div>
            <div className="text-xs font-medium text-slate-400">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => (
          <SubjectCard key={subject.id} subject={subject} index={index} onSelect={onSelectSubject} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-16 max-w-2xl rounded-3xl border border-white/60 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl"
      >
        <p className="text-sm font-medium text-slate-500">
          💡 Tip: Use <span className="font-bold text-violet-600">Flashcards</span> to build
          intuition, then test yourself with a{" "}
          <span className="font-bold text-fuchsia-600">Randomized Quiz</span> — questions and
          choices shuffle every time!
        </p>
      </motion.div>
    </div>
  );
}
