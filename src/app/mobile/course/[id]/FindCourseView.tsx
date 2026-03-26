"use client";
import { Input } from "@/components/ui/input";
import { useStore } from "@/features/mobile/store/useStore";
import {
  computeFinalGrade,
  computeGroupAverage,
  getGradeColor,
} from "@/features/mobile/store/utils";
import { cn } from "@/lib/utils";

import { ChevronLeft } from "lucide-react";
import { permanentRedirect } from "next/navigation";

export const FindCourseView = ({ id }: { id: number }) => {
  const course = useStore((s) => s.courses.find((c) => c.id == id));

  const updateGrade = useStore((s) => s.updateGrade);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-muted-foreground">Curso no encontrado</p>
      </div>
    );
  }

  const { template, grades } = course;
  const finalGrade = computeFinalGrade(template, grades);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <button
        onClick={() => permanentRedirect("/")}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>

      <div className="animate-fade-in mb-6">
        <h1 className="text-xl">{template.name}</h1>
        <p className="text-xs text-muted-foreground">{template.code}</p>
      </div>

      <div className="glass rounded-2xl p-6 text-center mb-6 animate-scale-in">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
          Nota Final
        </p>
        <span
          className={cn(
            "font-display text-5xl font-bold",
            finalGrade !== null
              ? getGradeColor(finalGrade)
              : "text-muted-foreground",
          )}
        >
          {finalGrade !== null ? finalGrade.toFixed(1) : "—"}
        </span>
        <p className="text-xs text-muted-foreground mt-2">
          {template.groups
            .map((g) => `${g.name}: ${(g.weight * 100).toFixed(0)}%`)
            .join(" · ")}
        </p>
      </div>

      <div className="space-y-4">
        {template.groups.map((group, gi) => {
          const groupAvg = computeGroupAverage(group, grades);
          return (
            <div
              key={"" + group.id}
              className="glass rounded-2xl p-4 animate-slide-up"
              style={{
                animationDelay: `${gi * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-display text-sm font-semibold">
                    {group.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    Peso: {(group.weight * 100).toFixed(0)}% ·{" "}
                    {group.aggregation === "LOWEST_DROP"
                      ? "Elimina menor"
                      : "Promedio"}
                  </p>
                </div>
                {groupAvg !== null && (
                  <span
                    className={cn(
                      "font-display text-lg font-bold",
                      getGradeColor(groupAvg),
                    )}
                  >
                    {groupAvg.toFixed(1)}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {group.components.map((comp) => {
                  const grade = grades.find((g) => g.componentId == comp.id);
                  return (
                    <div key={"" + comp.id} className="flex items-center gap-3">
                      <span className="text-sm text-secondary-foreground flex-1">
                        {comp.name}
                      </span>
                      <Input
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={20}
                        value={grade?.value?.toString() ?? "0"}
                        onChange={(e) => {
                          const val =
                            e.target.value === ""
                              ? null
                              : Math.min(
                                  20,
                                  Math.max(0, parseFloat(e.target.value)),
                                );
                          if (id) updateGrade(id, comp.id, val);
                        }}
                        placeholder="—"
                        className="w-20 h-9 text-center text-sm font-display font-semibold"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
