export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface SubjectTheme {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  gradient: string; // tailwind gradient classes
  glow: string; // box shadow / ring color classes
  accent: string; // text accent color
  bg: string; // soft background tint
}

export interface Subject extends SubjectTheme {
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export type ViewState =
  | { screen: "home" }
  | { screen: "mode"; subjectId: string }
  | { screen: "flashcards"; subjectId: string }
  | { screen: "quiz"; subjectId: string };
