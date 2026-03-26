import { CoursesList } from "@/features/mobile/components/home-view/CoursesList";

export default function Home() {
  return (
    <div className="min-h-screen pb-24  pt-6 max-w-lg px-6 mx-auto">
      <header className="mb-8 animate-fade-in ">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl">Mis Cursos</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Registra y calcula tus notas automáticamente
        </p>
      </header>
      <CoursesList />
    </div>
  );
}
