"use client";
import { RemoveCourseTemplateAction } from "@/actions/courseTemplateAction";
import { CourseItem } from "@/features/mobile/components/import-view/CourseItem";
import { CourseTemplate } from "@/features/mobile/types/type";
import { redirect } from "next/navigation";
import { toast } from "sonner";
export const CourseList = ({
  templates,
}: {
  templates: Omit<CourseTemplate, "groups">[];
}) => {
  const handleDelete = async (id: number) => {
    await RemoveCourseTemplateAction(id);
    toast.success("Se elimino el curso  exitosamente");
  };
  const handleEdit = (id: number) => {
    redirect(`/mobile/edit/${id}`);
  };
  return (
    <div className="space-y-4 overflow-y-auto overflow-x-hidden">
      {templates.map((item) => (
        <CourseItem
          key={item.id}
          shareCode={item.shareCode}
          name={item.name}
          code={item.code}
          admin
          onDelete={() => handleDelete(item.id)}
          onEdit={() => handleEdit(item.id)}
        />
      ))}
    </div>
  );
};
