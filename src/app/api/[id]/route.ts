import { validAdminCode } from "@/services/adminCode.service";
import {
  removeCourseTemplate,
  updateCourseTemplateStructure,
} from "@/services/course.service";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const { code, template } = await req.json();
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    if (!(await validAdminCode(code))) {
      return NextResponse.json(
        { error: "No tienes permisos" },
        { status: 403 }
      );
    }
    await updateCourseTemplateStructure(template);

    return NextResponse.json({ message: `Actualizado el id ${numericId}` });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const { code } = await req.json();
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    if (!(await validAdminCode(code))) {
      return NextResponse.json(
        { error: "No tienes permisos" },
        { status: 403 }
      );
    }

    await removeCourseTemplate(numericId);

    return NextResponse.json({
      message: `Borrado exitosamente id: ${numericId}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el recurso" },
      { status: 500 }
    );
  }
}
