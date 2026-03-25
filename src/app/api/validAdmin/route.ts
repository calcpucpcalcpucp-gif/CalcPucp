import { validAdminCode } from "@/services/adminCode.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    const ok = await validAdminCode(body.code);
    return NextResponse.json({ ok }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener los templates" },
      { status: 500 }
    );
  }
}
