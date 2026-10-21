import type { Subject } from "../types";
import { anthropologyFlashcards, anthropologyQuiz } from "./anthropology";
import { globalTrendsFlashcards, globalTrendsQuiz } from "./globalTrends";
import { economicsFlashcards, economicsQuiz } from "./economics";
import { entrepreneurshipFlashcards, entrepreneurshipQuiz } from "./entrepreneurship";
import { emergingTechFlashcards, emergingTechQuiz } from "./emergingTech";

export const subjects: Subject[] = [
  {
    id: "anthropology",
    name: "Anthropology",
    tagline: "Explore human culture, society & evolution",
    icon: "🗿",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    glow: "shadow-orange-300/60",
    accent: "text-orange-600",
    bg: "bg-orange-50",
    flashcards: anthropologyFlashcards,
    quiz: anthropologyQuiz,
  },
  {
    id: "global-trends",
    name: "Global Trends",
    tagline: "Understand the forces shaping our world",
    icon: "🌍",
    gradient: "from-sky-400 via-cyan-400 to-teal-400",
    glow: "shadow-sky-300/60",
    accent: "text-sky-600",
    bg: "bg-sky-50",
    flashcards: globalTrendsFlashcards,
    quiz: globalTrendsQuiz,
  },
  {
    id: "economics",
    name: "Economics",
    tagline: "Master markets, money & decisions",
    icon: "📈",
    gradient: "from-emerald-400 via-green-400 to-lime-400",
    glow: "shadow-emerald-300/60",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    flashcards: economicsFlashcards,
    quiz: economicsQuiz,
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    tagline: "Build, launch & scale new ventures",
    icon: "🚀",
    gradient: "from-fuchsia-400 via-pink-400 to-rose-400",
    glow: "shadow-fuchsia-300/60",
    accent: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
    flashcards: entrepreneurshipFlashcards,
    quiz: entrepreneurshipQuiz,
  },
  {
    id: "emerging-tech",
    name: "Emerging Tech",
    tagline: "Discover AI, blockchain & the future",
    icon: "🤖",
    gradient: "from-violet-400 via-purple-400 to-indigo-400",
    glow: "shadow-violet-300/60",
    accent: "text-violet-600",
    bg: "bg-violet-50",
    flashcards: emergingTechFlashcards,
    quiz: emergingTechQuiz,
  },
];

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}
