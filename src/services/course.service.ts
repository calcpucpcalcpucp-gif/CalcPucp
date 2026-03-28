import { CourseTemplate } from "@/features/mobile/types/type";
import prisma from "@/lib/prisma";

export async function getCourseTemplates() {
  return await prisma.courseTemplate.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      shareCode: true,
      groups: {
        select: {
          name: true,
          weight: true,
          aggregation: true,
          components: {
            select: { name: true },
          },
        },
      },
    },
  });
}

export async function getCourseTemplate(id: number, adminId: number) {
  return await prisma.courseTemplate.findUnique({
    where: { id, adminId },
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

export async function createCourseTemplate(
  data: CourseTemplate,
  adminId: number,
) {
  return await prisma.courseTemplate.create({
    data: {
      adminId: adminId,
      name: data.name,
      code: data.code,
      createAt: data.createAt,
      shareCode: data.shareCode,
      groups: {
        create: data.groups.map((item) => ({
          name: item.name,
          weight: item.weight,
          aggregation: item.aggregation,
          components: {
            create: item.components.map((item) => ({
              name: item.name,
            })),
          },
        })),
      },
    },
    include: {
      groups: { include: { components: true } },
    },
  });
}

export async function removeCourseTemplate(id: number) {
  await prisma.courseTemplate.delete({ where: { id } });
}

export async function updateCourseTemplateStructure(data: CourseTemplate) {
  const updatedTemplate = await prisma.courseTemplate.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      code: data.code,
      shareCode: data.shareCode,
      groups: {
        upsert: data.groups.map((group) => ({
          where: { id: group.id && group.id < 100_000_000 ? group.id : 0 }, // Si no hay ID, usamos 0 para forzar la creación
          create: {
            name: group.name,
            weight: group.weight,
            aggregation: group.aggregation,
            components: {
              create:
                group.components?.map((comp) => ({
                  name: comp.name,
                })) || [],
            },
          },
          update: {
            name: group.name,
            weight: group.weight,
            aggregation: group.aggregation,
            components: {
              upsert:
                group.components?.map((comp) => ({
                  where: { id: comp.id || 0 },
                  create: { name: comp.name },
                  update: { name: comp.name },
                })) || [],
            },
          },
        })),
      },
    },
    include: {
      groups: {
        include: { components: true },
      },
    },
  });

  return updatedTemplate;
}

export async function getCourseTemplateBySharedCode(shareCode: string) {
  return await prisma.courseTemplate.findUnique({
    where: { shareCode },
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

export async function getUpdatedCourseTemplates(courseIds: number[]) {
  return await prisma.courseTemplate.findMany({
    where: {
      id: {
        in: courseIds,
      },
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
