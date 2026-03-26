import { CoursesList } from "@/features/mobile/components/home-view/CoursesList";

export default function Home() {
  return (
    <div className="max-h-[calc(100vh-3rem)] mx-auto py-5 grid grid-rows-[5rem_1fr]">
      <header className="mb-8 animate-fade-in ml-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl">Mis Cursos</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Registra y calcula tus notas automáticamente
        </p>
      </header>
      <div className="px-8">
        <CoursesList />
      </div>
    </div>
  );
}
