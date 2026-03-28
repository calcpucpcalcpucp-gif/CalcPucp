"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation"; // Cambiado de redirect
import { useStore } from "../../store/useStore";
import { CourseCard } from "./CourseCard";
import { useEffect, useRef } from "react";

export const CoursesList = () => {
  const router = useRouter();
  const { courses, removeCourse, updateTemplates } = useStore();

  const lastSyncedIds = useRef<string>("");

  useEffect(() => {
    if (courses.length === 0) return;

    const currentIdsKey = courses
      .map((c) => c.template.id)
      .sort()
      .join(",");

    if (lastSyncedIds.current === currentIdsKey) return;

    const syncCourses = async () => {
      try {
        const templateIds = Array.from(
          new Set(courses.map((c) => c.template.id)),
        );

        const response = await fetch("/api/updateTemplates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseIds: templateIds }),
        });

        if (!response.ok) throw new Error("Error al sincronizar");

        const updatedTemplates = await response.json();

        lastSyncedIds.current = currentIdsKey;

        updateTemplates(updatedTemplates);
      } catch (error) {
        console.error("Error en la sincronización:", error);
      }
    };

    syncCourses();
  }, [courses, updateTemplates]);

  return (
    <>
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-5">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-center text-sm max-w-60 mb-6">
            Aún no tienes cursos. Importa uno con un código o crea tu propia
            plantilla.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/mobile/import")}
            >
              Importar
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
