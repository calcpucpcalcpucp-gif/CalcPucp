import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initGrades } from "./utils";
import { Admin, CourseTemplate, StudentCourse } from "../types/type";

interface CoursesStore {
  courses: StudentCourse[];
  addCourse: (template: CourseTemplate) => void;
  removeCourse: (id: number) => void;
  updateGrade: (
    courseId: number,
    componentId: number,
    value: number | null,
  ) => void;
  updateTemplates: (updatedTemplates: CourseTemplate[]) => void;
}

interface AdminStore {
  admin?: Admin;
  setAdmin: (admin: Admin) => void;
  addTemplate: (template: CourseTemplate) => void;
  removeTemplate: (id: number) => void;
}

type AppStore = AdminStore & CoursesStore;

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      setAdmin: (admin) => set(() => ({ admin })),

      addTemplate: (template) =>
        set((state) => {
          if (!state.admin) return state;
          return {
            admin: {
              ...state.admin,
              templates: [...state.admin.templates, template],
            },
          };
        }),

      removeTemplate: (id: number) =>
        set((state) => {
          if (!state.admin) return state;
          return {
            admin: {
              ...state.admin,
              templates: state.admin.templates.filter((t) => t.id !== id),
            },
          };
        }),

      courses: [],
      addCourse: (template) =>
        set((state) => {
          const exists = state.courses.some(
            (c) => c.templateId === template.id,
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
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),
      updateGrade: (courseId, componentId, value) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id == courseId
              ? {
                  ...c,
                  grades: c.grades.map((g) =>
                    g.componentId === componentId ? { ...g, value } : g,
                  ),
                }
              : c,
          ),
        })),

      updateTemplates: (updatedTemplates) =>
        set((state) => ({
          courses: state.courses.map((course) => {
            const updatedTemplate = updatedTemplates.find(
              (t) => t.id === course.templateId,
            );
            if (!updatedTemplate) return course;
            const newGradesStructure = initGrades(updatedTemplate);

            const mergedGrades = newGradesStructure.map((newGrade) => {
              const oldGrade = course.grades.find(
                (g) => g.componentId === newGrade.componentId,
              );
              return oldGrade
                ? { ...newGrade, value: oldGrade.value }
                : newGrade;
            });

            return {
              ...course,
              template: updatedTemplate,
              grades: mergedGrades,
            };
          }),
        })),
    }),
    { name: "store" },
  ),
);
