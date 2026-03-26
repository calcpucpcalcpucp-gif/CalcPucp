import { GetAdminCoursesTemplateAction } from "@/actions/courseTemplateAction";
import { redirect } from "next/navigation";
import { CourseList } from "../../../features/mobile/components/adminLibrary-view/CourseList";

export default async function Page() {
  const templates = await GetAdminCoursesTemplateAction();
  if (!templates) {
    redirect("/mobile/home");
  }

  return (
    <div className="max-h-[calc(100vh-3rem)] mx-auto py-5 grid grid-rows-[5rem_1fr]">
      <header className="mb-8 animate-fade-in ml-10">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl">Mis Cursos</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Registra y calcula tus notas automáticamente
        </p>
      </header>
      <div className="px-10">
        <CourseList templates={templates} />
      </div>
    </div>
  );
}
