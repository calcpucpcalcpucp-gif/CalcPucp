import { getUpdatedCourseTemplates } from "@/services/course.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseIds } = body;
    if (!courseIds || !Array.isArray(courseIds)) {
      return NextResponse.json(
        {
          error: "Falta el arreglo de 'courseIds' en el cuerpo de la petición",
        },
        { status: 400 },
      );
    }
    const updatedTemplates = await getUpdatedCourseTemplates(courseIds);
    return NextResponse.json(updatedTemplates, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar los cursos locales" },
      { status: 500 },
    );
  }
}
