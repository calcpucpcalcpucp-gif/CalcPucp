import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  createCourseTemplate,
  getCourseTemplates,
} from "@/services/course.service";

export async function GET() {
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

    if (!body.name || !body.code) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const newTemplate = await createCourseTemplate(body);

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear el template" },
      { status: 500 }
    );
  }
}
