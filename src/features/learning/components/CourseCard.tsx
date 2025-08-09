import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Course, CourseProgress } from "../types";

interface Props {
  course: Course;
  progress?: CourseProgress;
  completion?: number;
  onOpen?: (course: Course) => void;
}

export default function CourseCard({ course, progress, completion, onOpen }: Props) {
  const actionLabel = progress && (progress.completedLessonIds.length > 0 || typeof progress.quizScore === "number") ? "Continue" : "Start";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <CardDescription>
          {Math.round(course.durationMins)} min • {course.tags.join(" · ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        {typeof completion === "number" && (
          <div className="mb-3">
            <Progress value={completion} />
            <div className="mt-1 text-xs text-muted-foreground">{completion}% complete</div>
          </div>
        )}
        <Button variant="secondary" onClick={() => onOpen?.(course)}>
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
