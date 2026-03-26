"use server";

import { CourseTemplate } from "@/features/mobile/types/type";
import {
  createCourseTemplate,
  getCourseTemplate,
  getCourseTemplateBySharedCode,
  removeCourseTemplate,
  updateCourseTemplateStructure,
} from "@/services/course.service";
import { GetAdminIdAction } from "./authActions";
import { getAdminCoursesTemplate } from "@/services/adminCode.service";
import { revalidatePath } from "next/cache";

export const CreateCourseTemplateAction = async (template: CourseTemplate) => {
  const adminId = await GetAdminIdAction();

  if (!adminId) return;
  const id = await createCourseTemplate(template, +adminId);
  return id;
};

export const GetAdminCoursesTemplateAction = async () => {
  const adminId = await GetAdminIdAction();
  if (!adminId) return;

  const templates = await getAdminCoursesTemplate(+adminId);

  return templates;
};

export const RemoveCourseTemplateAction = async (courseId: number) => {
  await removeCourseTemplate(courseId);
  revalidatePath("/mobile/adminLibrary");
};

export const GetCourseTemplateAction = async (courseId: number) => {
  const adminId = await GetAdminIdAction();
  if (!adminId) return;
  return await getCourseTemplate(courseId, +adminId);
};

export const UpdateCourseTemplateAction = async (data: CourseTemplate) => {
  await updateCourseTemplateStructure(data);
};
export const GetCourseTemplateByShareCodeAction = async (shareCode: string) => {
  return await getCourseTemplateBySharedCode(shareCode);
};
