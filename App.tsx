import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ModeSelect from "./components/ModeSelect";
import FlashcardDeck from "./components/FlashcardDeck";
import Quiz from "./components/Quiz";
import { getSubjectById } from "./data/subjects";
import type { ViewState } from "./types";

export default function App() {
  const [view, setView] = useState<ViewState>({ screen: "home" });
  const [streak, setStreak] = useState(0);

  const goHome = useCallback(() => {
    setStreak(0);
    setView({ screen: "home" });
  }, []);

  const subjectId = "subjectId" in view ? view.subjectId : undefined;
  const subject = subjectId ? getSubjectById(subjectId) : undefined;

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar onHome={goHome} subjectName={subject?.name} streak={streak} />

      <AnimatePresence mode="wait">
        {view.screen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Home onSelectSubject={(id) => setView({ screen: "mode", subjectId: id })} />
          </motion.div>
        )}

        {view.screen === "mode" && subject && (
          <motion.div
            key="mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ModeSelect
              subject={subject}
              onBack={goHome}
              onPickFlashcards={() => setView({ screen: "flashcards", subjectId: subject.id })}
              onPickQuiz={() => setView({ screen: "quiz", subjectId: subject.id })}
            />
          </motion.div>
        )}

        {view.screen === "flashcards" && subject && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FlashcardDeck
              subject={subject}
              onBack={() => setView({ screen: "mode", subjectId: subject.id })}
              onSwitchToQuiz={() => setView({ screen: "quiz", subjectId: subject.id })}
            />
          </motion.div>
        )}

        {view.screen === "quiz" && subject && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Quiz
              subject={subject}
              onBack={() => {
                setStreak(0);
                setView({ screen: "mode", subjectId: subject.id });
              }}
              onFlashcards={() => {
                setStreak(0);
                setView({ screen: "flashcards", subjectId: subject.id });
              }}
              onStreakChange={setStreak}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-4 text-center text-xs text-slate-400 sm:px-6">
        Built with 💜 for curious minds — flip, quiz, repeat.
      </footer>
    </div>
  );
}
