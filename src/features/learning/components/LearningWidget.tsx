import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CourseCard from "./CourseCard";
import CourseDialog from "./CourseDialog";
import courses from "../courses";
import { useLearningProgress } from "../useLearningProgress";
import type { Course } from "../types";
import { useState } from "react";
interface Props {
  metricKeysNeedingAttention?: string[]; // e.g., ["TDS", "pH"]
}

export default function LearningWidget({ metricKeysNeedingAttention = [] }: Props) {
  const { progressMap, markLessonComplete, saveQuizScore, getCompletionPercent } = useLearningProgress();

  const recommended: Course[] = (() => {
    if (!metricKeysNeedingAttention.length) return courses.slice(0, 3);
    const prioritized = courses
      .map((c) => ({ c, score: c.tags.some((t) => metricKeysNeedingAttention.includes(t)) ? 1 : 0 }))
      .sort((a, b) => b.score - a.score)
      .map((x) => x.c);
    return prioritized.slice(0, 3);
  })();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);

  function openCourse(course: Course) {
    setSelected(course);
    setOpen(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning & Training</CardTitle>
        <CardDescription>Recommended for you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {recommended.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              progress={progressMap[c.id]}
              completion={getCompletionPercent(c)}
              onOpen={openCourse}
            />
          ))}
        </div>
      </CardContent>

      {selected && (
        <CourseDialog
          open={open}
          onOpenChange={setOpen}
          course={selected}
          completed={progressMap[selected.id]?.completedLessonIds || []}
          onToggleLesson={(lessonId) => markLessonComplete(selected.id, lessonId)}
          onQuizSubmit={(score) => saveQuizScore(selected.id, score)}
        />
      )}
    </Card>
  );
}
