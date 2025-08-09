export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  title: string;
  content?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: Level;
  durationMins: number;
  tags: string[];
  lessons: Lesson[];
  quiz?: {
    questions: QuizQuestion[];
  };
}

export interface CourseProgress {
  courseId: string;
  completedLessonIds: string[];
  quizScore?: number; // 0-100
}

export type ProgressMap = Record<string, CourseProgress>;
