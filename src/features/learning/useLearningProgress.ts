import { useCallback, useEffect, useMemo, useState } from "react";
import type { Course, CourseProgress, ProgressMap } from "./types";

const STORAGE_KEY = "learning_progress_v1";

function loadInitial(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

export function useLearningProgress() {
  const [map, setMap] = useState<ProgressMap>(() => loadInitial());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      // ignore
    }
  }, [map]);

  const getCourseProgress = useCallback(
    (courseId: string): CourseProgress => {
      return (
        map[courseId] || {
          courseId,
          completedLessonIds: [],
          quizScore: undefined,
        }
      );
    },
    [map]
  );

  const markLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setMap((prev) => {
      const existing = prev[courseId] || { courseId, completedLessonIds: [] as string[] };
      const exists = existing.completedLessonIds.includes(lessonId);
      const updated: CourseProgress = {
        ...existing,
        completedLessonIds: exists
          ? existing.completedLessonIds.filter((id) => id !== lessonId)
          : [...existing.completedLessonIds, lessonId],
      };
      return { ...prev, [courseId]: updated };
    });
  }, []);

  const saveQuizScore = useCallback((courseId: string, score: number) => {
    setMap((prev) => {
      const existing = prev[courseId] || { courseId, completedLessonIds: [] as string[] };
      const updated: CourseProgress = { ...existing, quizScore: score };
      return { ...prev, [courseId]: updated };
    });
  }, []);

  const getCompletionPercent = useCallback((course: Course): number => {
    const p = map[course.id];
    const lessonsDone = p?.completedLessonIds?.length || 0;
    const total = course.lessons.length;
    const base = total ? Math.round((lessonsDone / total) * 100) : 0;
    const quizBonus = typeof p?.quizScore === "number" ? Math.round(0.1 * p.quizScore) : 0; // small bonus
    return Math.min(100, base + quizBonus);
  }, [map]);

  const progressMap = useMemo(() => map, [map]);

  return {
    progressMap,
    getCourseProgress,
    markLessonComplete,
    saveQuizScore,
    getCompletionPercent,
  };
}
