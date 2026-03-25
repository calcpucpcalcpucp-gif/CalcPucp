import prisma from "@/lib/prisma";
import { CourseTemplate } from "@/store/types";

export async function getCourseTemplates() {
  return await prisma.courseTemplate.findMany({
    select: {
      id: true,
      name: true,
      code: true,
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

export async function createCourseTemplate(data: CourseTemplate) {
  return await prisma.courseTemplate.create({
    data: {
      ...data,
      groups: {
        create: data.groups.map((item) => ({
          ...item,
          components: {
            create: item.components,
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
        update: data.groups.map((group) => ({
          where: { id: group.id },
          data: {
            name: group.name,
            weight: group.weight,
            aggregation: group.aggregation,
            components: group.components
              ? {
                  update: group.components.map((component) => ({
                    where: { id: component.id },
                    data: { name: component.name },
                  })),
                }
              : undefined,
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
