"use client";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

export const CourseList = () => {
  const { courses, removeCourse } = useStore();
  return (
    <>
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-5">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-center text-sm max-w-[240px] mb-6">
            Aún no tienes cursos. Importa uno con un código o crea tu propia
            plantilla.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => redirect("/import")}
            >
              Importar
            </Button>
            <Button size="sm" onClick={() => redirect("/create")}>
              Crear curso
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {courses.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              onRemove={removeCourse}
              index={i}
            />
          ))}
        </div>
      )}
    </>
  );
};
