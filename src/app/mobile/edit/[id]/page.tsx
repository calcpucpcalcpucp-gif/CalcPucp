import { GetCourseTemplateAction } from "@/actions/courseTemplateAction";
import { CreateCourseForm } from "@/features/mobile/components/create-view/CreateCourseForm";
import { redirect, notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  const template = await GetCourseTemplateAction(+id);

  if (!template) {
    return notFound();
  }

  return <CreateCourseForm edit template={template} />;
}
