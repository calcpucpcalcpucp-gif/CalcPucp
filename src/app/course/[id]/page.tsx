import { FindCourseView } from "./FindCourseView";

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <FindCourseView id={id} />;
}
