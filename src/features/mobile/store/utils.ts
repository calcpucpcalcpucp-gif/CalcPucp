import {
  CourseTemplate,
  GradeComponent,
  GradeGroup,
  StudentGrade,
} from "../types/type";

export function initGrades(template: CourseTemplate): StudentGrade[] {
  return template.groups.flatMap((g) =>
    g.components.map((c) => ({ componentId: c.id, value: null }))
  );
}

export function computeGroupAverage(
  group: GradeGroup,
  grades: StudentGrade[]
): number | null {
  const values = group.components
    .map((c) => grades.find((g) => g.componentId === c.id)?.value ?? 0)
    .filter((v): v is number => v !== null);

  if (values.length === 0) return null;

  if (group.aggregation === "LOWEST_DROP" && values.length > 1) {
    const sorted = [...values].sort((a, b) => a - b);
    sorted.shift();
    return sorted.reduce((a, b) => a + b, 0) / sorted.length;
  }

  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function computeFinalGrade(
  template: CourseTemplate,
  grades: StudentGrade[]
): number | null {
  let total = 0;
  let weightSum = 0;

  for (const group of template.groups) {
    const avg = computeGroupAverage(group, grades);
    if (avg !== null) {
      total += avg * group.weight;
      weightSum += group.weight;
    }
  }

  return weightSum > 0 ? total / weightSum : null;
}

export function getGradeColor(grade: number): string {
  if (grade >= 16) return "text-grade-excellent";
  if (grade >= 13) return "text-grade-good";
  if (grade >= 10.5) return "text-grade-average";
  return "text-grade-poor";
}

export function encodeTemplate(template: CourseTemplate): string {
  const data = {
    id: template.id,
    name: template.name,
    code: template.code,
    groups: template.groups,
    createAt: template.createAt,
    shareCode: template.shareCode,
  };
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export function decodeTemplate(code: string): CourseTemplate | null {
  try {
    return JSON.parse(decodeURIComponent(atob(code)));
  } catch {
    return null;
  }
}
export function createComponent(name: string): GradeComponent {
  return { id: Date.now(), name };
}
