import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import courses from "@/features/learning/courses";
import CourseCard from "@/features/learning/components/CourseCard";
import CourseDialog from "@/features/learning/components/CourseDialog";
import { useLearningProgress } from "@/features/learning/useLearningProgress";
import { useState } from "react";
import type { Course } from "@/features/learning/types";

const Learning = () => {
  const { progressMap, getCompletionPercent, markLessonComplete, saveQuizScore } = useLearningProgress();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);

  const openCourse = (c: Course) => { setSelected(c); setOpen(true); };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((c, i) => ({
      "@type": "Course",
      position: i + 1,
      name: c.title,
      description: c.description,
      provider: { "@type": "Organization", name: "KarbonLedger" }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Learning & Training Hub – KarbonLedger CETP</title>
        <meta name="description" content="Courses, quizzes, certificates, and leaderboards for CETP operators." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/learning'} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Learning & Training Hub</h1>
          <p className="text-muted-foreground max-w-2xl">Boost CETP operations through focused micro-courses and quick quizzes.</p>

          <div className="grid gap-4 md:grid-cols-3 mt-8">
            {courses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                progress={progressMap[c.id]}
                completion={getCompletionPercent(c)}
                onOpen={openCourse}
              />
            ))}
          </div>
        </section>
      </main>

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
    </div>
  );
};

export default Learning;
