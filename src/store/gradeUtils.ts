import type {
  CourseTemplate,
  StudentGrade,
  GradeGroup,
  GradeComponent,
} from "./types";
import { v4 as uuid } from "uuid";
export function computeGroupAverage(
  group: GradeGroup,
  grades: StudentGrade[]
): number | null {
  const values = group.components
    .map((c) => grades.find((g) => g.componentId === c.id)?.value)
    .filter((v): v is number => v !== null);

  if (values.length === 0) return null;

  if (group.aggregation === "lowest-drop" && values.length > 1) {
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
    createdAt: template.createdAt,
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
export function createComponent(
  type: GradeComponent["type"],
  index: number
): GradeComponent {
  const labels: Record<string, string> = {
    pc: "PC",
    pd: "PD",
    exam: "Examen",
    custom: "Eval",
  };
  return { id: uuid(), name: `${labels[type]} ${index + 1}`, type };
}
