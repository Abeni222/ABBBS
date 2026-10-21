import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Subject } from "../types";
import { shuffleArray } from "../utils/shuffle";

interface FlashcardDeckProps {
  subject: Subject;
  onBack: () => void;
  onSwitchToQuiz: () => void;
}

export default function FlashcardDeck({ subject, onBack, onSwitchToQuiz }: FlashcardDeckProps) {
  const [cards, setCards] = useState(() => shuffleArray(subject.flashcards));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [review, setReview] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState(1);

  const card = cards[index];
  const progress = useMemo(() => ((index + 1) / cards.length) * 100, [index, cards.length]);
  const isDone = index >= cards.length;

  function goNext(markKnown?: boolean) {
    if (markKnown !== undefined && card) {
      setKnown((prev) => {
        const next = new Set(prev);
        if (markKnown) next.add(card.id);
        else next.delete(card.id);
        return next;
      });
      setReview((prev) => {
        const next = new Set(prev);
        if (!markKnown) next.add(card.id);
        else next.delete(card.id);
        return next;
      });
    }
    setDirection(1);
    setFlipped(false);
    setTimeout(() => setIndex((i) => i + 1), 120);
  }

  function goPrev() {
    if (index === 0) return;
    setDirection(-1);
    setFlipped(false);
    setTimeout(() => setIndex((i) => Math.max(0, i - 1)), 120);
  }

  function restart(onlyReview = false) {
    const source = onlyReview ? subject.flashcards.filter((c) => review.has(c.id)) : subject.flashcards;
    setCards(shuffleArray(source.length ? source : subject.flashcards));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setReview(new Set());
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-600">
            ✓ {known.size} known
          </span>
          <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-500">
            ↻ {review.size} review
          </span>
        </div>
      </div>

      {!isDone && (
        <>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>
              Card {index + 1} / {cards.length}
            </span>
            <span className={subject.accent}>{subject.name}</span>
          </div>
          <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${subject.gradient}`}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>

          <div className="relative mx-auto h-80 w-full [perspective:1600px] sm:h-96">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={card.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60, rotateY: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setFlipped((f) => !f)}
              >
                <motion.div
                  className="relative h-full w-full [transform-style:preserve-3d]"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Front */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br ${subject.gradient} p-8 text-center shadow-2xl [backface-visibility:hidden]`}
                  >
                    <span className="mb-4 text-4xl">{subject.icon}</span>
                    <p className="text-xl font-bold text-white drop-shadow-sm sm:text-2xl">
                      {card.front}
                    </p>
                    <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/80">
                      Tap to reveal answer
                    </span>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/60 bg-white p-8 text-center shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  >
                    <span className="mb-4 text-3xl">💡</span>
                    <p className="text-lg font-semibold text-slate-700 sm:text-xl">{card.back}</p>
                    <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Tap to flip back
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={goPrev}
              disabled={index === 0}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm transition hover:border-slate-300 disabled:opacity-30"
            >
              ← Prev
            </button>
            <button
              onClick={() => goNext(false)}
              className="rounded-full bg-rose-100 px-5 py-2 text-sm font-bold text-rose-600 shadow-sm transition hover:bg-rose-200"
            >
              😅 Still learning
            </button>
            <button
              onClick={() => goNext(true)}
              className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-600 shadow-sm transition hover:bg-emerald-200"
            >
              ✅ I know this
            </button>
          </div>
        </>
      )}

      {isDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center rounded-3xl border border-white/60 bg-white/80 p-10 text-center shadow-xl backdrop-blur-xl"
        >
          <div className="mb-3 text-5xl">🎉</div>
          <h2 className="mb-2 text-2xl font-black text-slate-800">Deck complete!</h2>
          <p className="mb-6 text-slate-500">
            You knew <span className="font-bold text-emerald-600">{known.size}</span> out of{" "}
            {cards.length} cards.{" "}
            {review.size > 0 && (
              <>
                <span className="font-bold text-rose-500">{review.size}</span> marked for review.
              </>
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => restart(false)}
              className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-200 transition hover:scale-105"
            >
              🔀 Shuffle & restart
            </button>
            {review.size > 0 && (
              <button
                onClick={() => restart(true)}
                className="rounded-full bg-rose-100 px-5 py-2.5 text-sm font-bold text-rose-600 shadow-sm transition hover:bg-rose-200"
              >
                ↻ Review tricky cards
              </button>
            )}
            <button
              onClick={onSwitchToQuiz}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:border-violet-300 hover:text-violet-600"
            >
              🎯 Take the quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
