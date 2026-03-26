import prisma from "@/lib/prisma";
import { v4 as uuid } from "uuid";

export async function generateAdminCode() {
  const code = uuid();

  await prisma.admin.create({
    data: {
      code,
      createAt: new Date(),
    },
  });

  return code;
}

export async function findAdmin(code?: string) {
  if (!code) return false;

  return await prisma.admin.findUnique({
    where: { code },
    select: { id: true },
  });
}

export async function getAdminCoursesTemplate(id: number) {
  return await prisma.courseTemplate.findMany({
    where: {
      adminId: id,
    },
    select: {
      id: true,
      name: true,
      code: true,
      shareCode: true,
      createAt: true,
      groups: {
        select: {
          id: true,
          name: true,
          weight: true,
          aggregation: true,
          components: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
}
