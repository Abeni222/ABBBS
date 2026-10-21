import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Subject } from "../types";
import { shuffleArray } from "../utils/shuffle";
import { fireSmallBurst } from "../utils/confetti";
import QuizResult, { type AnsweredQuestion } from "./QuizResult";

interface PreparedQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  subject: Subject;
  onBack: () => void;
  onFlashcards: () => void;
  onStreakChange: (streak: number) => void;
}

const TIME_PER_QUESTION = 20;

function prepareQuestions(subject: Subject): PreparedQuestion[] {
  const shuffledQuestions = shuffleArray(subject.quiz);
  return shuffledQuestions.map((q) => {
    const optionsWithIndex = q.options.map((opt, i) => ({ opt, i }));
    const shuffledOptions = shuffleArray(optionsWithIndex);
    const correctIndex = shuffledOptions.findIndex((o) => o.i === q.answerIndex);
    return {
      id: q.id,
      question: q.question,
      options: shuffledOptions.map((o) => o.opt),
      correctIndex,
      explanation: q.explanation,
    };
  });
}

export default function Quiz({ subject, onBack, onFlashcards, onStreakChange }: QuizProps) {
  const [questions, setQuestions] = useState<PreparedQuestion[]>(() => prepareQuestions(subject));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const isAnswered = selected !== null;

  useEffect(() => {
    onStreakChange(streak);
  }, [streak, onStreakChange]);

  useEffect(() => {
    if (isAnswered || finished) return;
    if (timeLeft <= 0) {
      handleSelect(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isAnswered, finished]);

  function handleSelect(optionIndex: number | null) {
    if (isAnswered) return;
    setSelected(optionIndex);
    const correct = optionIndex === current.correctIndex;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      fireSmallBurst();
    } else {
      setStreak(0);
    }
    setAnswered((prev) => [
      ...prev,
      {
        question: current.question,
        options: current.options,
        correctIndex: current.correctIndex,
        selectedIndex: optionIndex,
        explanation: current.explanation,
      },
    ]);
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      setFinished(true);
      onStreakChange(0);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setTimeLeft(TIME_PER_QUESTION);
  }

  function handleRetry() {
    setQuestions(prepareQuestions(subject));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setAnswered([]);
    setTimeLeft(TIME_PER_QUESTION);
    setFinished(false);
  }

  const progress = useMemo(() => ((index + (isAnswered ? 1 : 0)) / questions.length) * 100, [index, isAnswered, questions.length]);

  if (finished) {
    return (
      <QuizResult
        subject={subject}
        score={score}
        total={questions.length}
        answered={answered}
        onRetry={handleRetry}
        onBack={onBack}
        onFlashcards={onFlashcards}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
        >
          ← Back
        </button>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-600">
          Score: {score}/{questions.length}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>
          Question {index + 1} / {questions.length}
        </span>
        <span className={subject.accent}>{subject.name}</span>
      </div>
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${subject.gradient}`}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Timer bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200/70">
          <motion.div
            className={`h-full rounded-full ${
              timeLeft <= 5 ? "bg-rose-500" : "bg-gradient-to-r from-amber-400 to-orange-400"
            }`}
            animate={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </div>
        <span className={`text-xs font-bold tabular-nums ${timeLeft <= 5 ? "text-rose-500" : "text-slate-400"}`}>
          {timeLeft}s
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:p-8"
        >
          <h2 className="mb-6 text-lg font-bold text-slate-800 sm:text-xl">{current.question}</h2>

          <div className="space-y-3">
            {current.options.map((opt, i) => {
              const isCorrectOpt = i === current.correctIndex;
              const isSelectedOpt = i === selected;
              let style =
                "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50 text-slate-700";
              if (isAnswered) {
                if (isCorrectOpt) {
                  style = "border-emerald-400 bg-emerald-50 text-emerald-700";
                } else if (isSelectedOpt) {
                  style = "border-rose-400 bg-rose-50 text-rose-700";
                } else {
                  style = "border-slate-200 bg-white text-slate-400";
                }
              }
              return (
                <motion.button
                  key={i}
                  whileHover={!isAnswered ? { scale: 1.015 } : {}}
                  whileTap={!isAnswered ? { scale: 0.985 } : {}}
                  disabled={isAnswered}
                  onClick={() => handleSelect(i)}
                  className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold shadow-sm transition ${style}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrectOpt && <span>✅</span>}
                  {isAnswered && isSelectedOpt && !isCorrectOpt && <span>❌</span>}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  <span className="font-bold text-slate-600">Why: </span>
                  {current.explanation}
                </div>
                <button
                  onClick={handleNext}
                  className="mt-5 w-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-200 transition hover:scale-[1.02]"
                >
                  {index + 1 >= questions.length ? "See results 🎉" : "Next question →"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
