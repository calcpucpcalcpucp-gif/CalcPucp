"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { CourseTemplate } from "@/features/mobile/types/type";
import { SearchCourse } from "@/features/mobile/components/import-view/SearchCourse";
import { useStore } from "@/features/mobile/store/useStore";
import { CourseItem } from "@/features/mobile/components/import-view/CourseItem";
import { useLoadCoursesTemplates } from "@/features/mobile/hooks/useLoadTemplates";
import { QrCapture } from "@/features/mobile/components/import-view/QrCapture";
import { LoginAction } from "@/actions/authActions";
import { GetCourseTemplateByShareCodeAction } from "@/actions/courseTemplateAction";

export default function ImportForm() {
  const router = useRouter();
  const { courses, filterCourses } = useLoadCoursesTemplates();
  const [openQrCapture, setOpenQrCapture] = useState(false);
  const [query, setQuery] = useState("");

  const addCourse = useStore((e) => e.addCourse);

  const handleSearch = (query: string) => {
    filterCourses(query);
  };

  const handleAddCourse = (item: CourseTemplate) => {
    addCourse(item);
    redirect("/mobile/home");
  };

  const handleOnQr = () => {
    setOpenQrCapture(true);
  };

  const handleBack = () => {
    setOpenQrCapture(false);
  };

  const onCapture = async (text: string) => {
    setOpenQrCapture(false);
    if (text.startsWith("share-code:")) {
      const template = await GetCourseTemplateByShareCodeAction(
        text.replace("share-code:", "")
      );
      if (template) {
        addCourse(template);
        router.replace("/mobile/home");
      }
    }

    if (text.startsWith("admin:")) {
      await LoginAction(text.replace("admin:", ""));
    }
  };

  if (openQrCapture) {
    return (
      <QrCapture
        onBack={handleBack}
        onCapture={onCapture}
        open={openQrCapture}
      />
    );
  }

  return (
    <div className="max-h-[calc(100vh-3rem)] mx-auto py-5 grid grid-rows-[3rem_1fr]">
      <SearchCourse
        onSearch={handleSearch}
        onClickQr={handleOnQr}
        onChange={setQuery}
        value={query}
      />
      <div className="overflow-y-auto p-5 space-y-4">
        {courses.map((item) => (
          <CourseItem
            {...item}
            key={item.id}
            onAdd={() => handleAddCourse(item)}
          />
        ))}
      </div>
    </div>
  );
}
