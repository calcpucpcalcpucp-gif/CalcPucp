import { NextResponse } from "next/server";
import { getCourseTemplates } from "@/services/course.service";

export async function GET() {
  try {
    const templates = await getCourseTemplates();
    return NextResponse.json(templates, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener los templates" },
      { status: 500 },
    );
  }
}
