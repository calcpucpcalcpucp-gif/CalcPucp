export interface GradeComponent {
  id: number;
  name: string;
}

export interface GradeGroup {
  id: number;
  name: string;
  weight: number;
  components: GradeComponent[];
  aggregation: "AVERAGE" | "SUM" | "LOWEST_DROP";
}

export interface CourseTemplate {
  id: number;
  name: string;
  code: string;
  groups: GradeGroup[];
  createAt: Date;
  shareCode: string;
}

export interface StudentGrade {
  componentId: number;
  value: number | null;
}

export interface StudentCourse {
  id: number;
  templateId: number;
  template: CourseTemplate;
  grades: StudentGrade[];
  importedAt: number;
}

export interface Admin {
  id: string;
  code: string;
  createAt: Date;
  templates: CourseTemplate[];
}
