import { generateAdminCode } from "@/services/adminCode.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await req.json();
    const password = process.env["PASSWORD"]!;
    if (data.password != password) {
      return NextResponse.json(
        { error: "Don't have permision" },
        { status: 500 }
      );
    }
    const code = await generateAdminCode();
    return NextResponse.json({ code }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear el template" },
      { status: 500 }
    );
  }
}
