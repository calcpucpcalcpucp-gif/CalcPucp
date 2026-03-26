import { useEffect, useState, useMemo } from "react";
import { CourseTemplate } from "../types/type";
import { useStore } from "../store/useStore";

export const useLoadCoursesTemplates = () => {
  const currentCourses = useStore((e) => e.courses);
  const [templates, setTemplates] = useState<CourseTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadRawTemplates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/templates");
        const data = (await response.json()) as CourseTemplate[];
        setTemplates(data);
      } catch (error) {
        console.error("Error loading templates", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRawTemplates();
  }, []);
  const filteredCourses = useMemo(() => {
    const available = templates.filter((item) => {
      return !currentCourses.some(
        (currItem) => currItem.template.id === item.id,
      );
    });
    if (!searchQuery) return available;

    const lowerQuery = searchQuery.toLowerCase();
    return available.filter((course) =>
      `${course.name} ${course.code}`.toLowerCase().includes(lowerQuery),
    );
  }, [templates, currentCourses, searchQuery]);

  const filterCourses = (query: string) => {
    setSearchQuery(query);
  };

  return {
    courses: filteredCourses,
    filterCourses,
    isLoading,
  };
};
