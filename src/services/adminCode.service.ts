import prisma from "@/lib/prisma";
import { v4 as uuid } from "uuid";

export async function generateAdminCode() {
  const code = uuid();

  await prisma.adminCode.create({
    data: {
      code,
      createAt: new Date(),
    },
  });

  return code;
}

export async function validAdminCode(code?: string) {
  if (!code) return false;

  const reseult = await prisma.adminCode.findFirst({ where: { code } });
  return reseult != null;
}
