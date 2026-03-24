import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, context: Context) {
  try {
    const { id } = await context.params;

    const data = await req.json();

    return NextResponse.json({ message: `Actualizado el id ${id}` });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  const { id } = await context.params;
  return NextResponse.json({ message: `Borrado ${id}` });
}
