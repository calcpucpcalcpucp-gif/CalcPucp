import { IsLogedAction } from "@/actions/authActions";
import { CreateCourseForm } from "@/features/mobile/components/create-view/CreateCourseForm";
import { redirect } from "next/navigation";

export default async function CreateCoursePage() {
  const isLogged = await IsLogedAction();

  if (!isLogged) {
    redirect("/mobile/home");
  }

  return <CreateCourseForm />;
}
