import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppStore,
  CourseTemplate,
  StudentCourse,
  StudentGrade,
} from "./types";

function initGrades(template: CourseTemplate): StudentGrade[] {
  return template.groups.flatMap((g) =>
    g.components.map((c) => ({ componentId: c.id, value: null }))
  );
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      templates: [],
      courses: [],

      addTemplate: (template: CourseTemplate) =>
        set((state) => ({ templates: [...state.templates, template] })),

      removeTemplate: (id: number) =>
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        })),

      importCourse: (template: CourseTemplate) =>
        set((state) => {
          const exists = state.courses.some(
            (c) => c.templateId === template.id
          );
          if (exists) return state;
          const course: StudentCourse = {
            id: Date.now(),
            templateId: template.id,
            template,
            grades: initGrades(template),
            importedAt: Date.now(),
          };
          return { courses: [...state.courses, course] };
        }),

      removeCourse: (id: number) =>
        set((state) => ({ courses: state.courses.filter((c) => c.id !== id) })),

      updateGrade: (
        courseId: number,
        componentId: number,
        value: number | null
      ) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId
              ? {
                  ...c,
                  grades: c.grades.map((g) =>
                    g.componentId === componentId ? { ...g, value } : g
                  ),
                }
              : c
          ),
        })),
    }),
    { name: "calculadora-notas-storage" }
  )
);
