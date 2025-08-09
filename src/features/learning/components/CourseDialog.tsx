import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Course } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  course: Course;
  completed: string[];
  onToggleLesson: (lessonId: string) => void;
  onQuizSubmit: (score: number) => void;
}

export default function CourseDialog({ open, onOpenChange, course, completed, onToggleLesson, onQuizSubmit }: Props) {
  const { toast } = useToast();
  const form = useForm<Record<string, string>>();

  const questions = course.quiz?.questions || [];

  const handleSubmit = form.handleSubmit((values) => {
    if (!questions.length) return;
    const scoreRaw = questions.reduce((acc, q) => {
      const chosen = values[q.id];
      const correct = q.options[q.answerIndex];
      return acc + (chosen === correct ? 1 : 0);
    }, 0);
    const score = Math.round((scoreRaw / questions.length) * 100);
    onQuizSubmit(score);
    toast({ title: "Quiz submitted", description: `You scored ${score}%` });
  });

  const allDone = useMemo(() => completed.length >= course.lessons.length, [completed.length, course.lessons.length]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{course.title}</DialogTitle>
          <DialogDescription>
            {course.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section>
            <h4 className="mb-2 font-semibold">Lessons</h4>
            <div className="space-y-2">
              {course.lessons.map((l) => (
                <label key={l.id} className="flex items-center gap-3 text-sm">
                  <Checkbox
                    checked={completed.includes(l.id)}
                    onCheckedChange={() => onToggleLesson(l.id)}
                  />
                  <span>{l.title}</span>
                </label>
              ))}
            </div>
          </section>

          {questions.length > 0 && (
            <>
              <Separator />
              <section>
                <h4 className="mb-3 font-semibold">Quiz</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {questions.map((q) => (
                    <div key={q.id} className="space-y-2">
                      <p className="text-sm font-medium">{q.prompt}</p>
                      <div className="grid gap-2">
                        {q.options.map((opt) => (
                          <label key={opt} className="flex items-center gap-2 text-sm">
                            <input
                              className="accent-[hsl(var(--primary))]"
                              type="radio"
                              value={opt}
                              {...form.register(q.id, { required: true })}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <DialogFooter>
                    <Button type="submit" disabled={!allDone}>
                      Submit quiz
                    </Button>
                  </DialogFooter>
                </form>
              </section>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
