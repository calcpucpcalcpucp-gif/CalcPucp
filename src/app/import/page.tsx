"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusIcon, QrCode, Search } from "lucide-react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { CourseTemplate } from "@/store/types";

export const ImportForm = () => {
  const importCourse = useStore((s) => s.importCourse);
  const currentCourses = useStore((e) => e.courses);

  const [courses, setCourses] = useState<CourseTemplate[]>([]);
  const [searchQuery, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<CourseTemplate[]>([]);

  const [isOpenQrCapture, setIsOpenQrCapture] = useState(false);

  const handleSearch = () => {
    setFilteredCourses(
      courses
        .filter((item) => {
          return !currentCourses.some((currItem) => currItem.id == item.id);
        })
        .filter((course) =>
          `${course.name} ${course.code}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        ),
    );
  };

  const handleAddCourse = (item: CourseTemplate) => {
    importCourse(item);
    redirect("/home");
  };

  useEffect(() => {
    const callback = async () => {
      const templates = await fetch("/api/templates");
      let data = (await templates.json()) as CourseTemplate[];
      data = data.filter((item) => {
        return !currentCourses.some((currItem) => currItem.id == item.id);
      });
      setCourses(data);
    };
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isOpenQrCapture) {
    return (
      <div className="p-6">
        <button
          onClick={() => setIsOpenQrCapture(false)}
          className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
        >
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-3rem)] mx-auto py-5 grid grid-rows-[3rem_1fr]">
      <Field orientation="horizontal" className="px-3">
        <form
          className="flex w-full  gap-2 "
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Input
            value={searchQuery}
            type="search"
            placeholder="Buscar cursos..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline" className="w-9.75 h-9.75">
            <Search />
          </Button>
        </form>
        <Button
          className="w-9.75 h-9.75 flex items-center justify-center  bg-primary p-0"
          onClick={() => setIsOpenQrCapture(true)}
        >
          <QrCode className="min-w-5.75 min-h-5.75 text-white" />
        </Button>
      </Field>
      <div className="overflow-y-auto p-5 space-y-4">
        {filteredCourses.map((item) => (
          <Item variant="outline" className="min-w-0" key={item.id}>
            <ItemContent>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemDescription>{item.code}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                variant="outline"
                className="w-10 h-10"
                onClick={() => handleAddCourse(item)}
              >
                <PlusIcon className="min-w-5 min-h-5" />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
};

export default function ImportCourse() {
  return (
    <div>
      <ImportForm />
    </div>
  );
}
