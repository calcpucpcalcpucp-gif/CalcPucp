import { NextRequest, NextResponse } from "next/server";
import {
  createCourseTemplate,
  getCourseTemplates,
} from "@/services/course.service";
import { validAdminCode } from "@/services/adminCode.service";

export async function GET(req: NextRequest) {
  try {
    const templates = await getCourseTemplates();
    return NextResponse.json(templates, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los templates" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.course.name || !body.course.code) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    if (!(await validAdminCode(body.code))) {
      return NextResponse.json(
        { error: "Don't have permision" },
        { status: 500 }
      );
    }

    const newTemplate = await createCourseTemplate(body.course);

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el template" },
      { status: 500 }
    );
  }
}
