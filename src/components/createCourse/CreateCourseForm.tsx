"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { createComponent, encodeTemplate } from "@/store/gradeUtils";
import type { CourseTemplate, GradeGroup, GradeComponent } from "@/store/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
//import { QRCodeSVG } from "qrcode.react";
//import { v4 as uuid } from "uuid";
import { redirect } from "next/navigation";
import { CreatedCourseView } from "@/components/createCourse/CreatedCourseView";
import { CourseGroup } from "./CourseGroup";

export function CreateCourseForm() {
  const addTemplate = useStore((s) => s.addTemplate);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [groups, setGroups] = useState<GradeGroup[]>([]);

  const [created, setCreated] = useState<CourseTemplate | null>(null);

  const totalWeight = groups.reduce((s, g) => s + g.weight, 0);

  const addGroup = () =>
    setGroups((gs) => [
      ...gs,
      {
        id: Date.now(),
        name: "Nuevo Grupo",
        weight: 0,
        components: [createComponent(0)],
        aggregation: "AVERAGE",
      },
    ]);

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Ingresa el nombre del curso");
      return;
    }
    if (Math.abs(totalWeight - 1) > 0.01) {
      toast.error("Los pesos deben sumar 100%");
      return;
    }
    if (groups.some((g) => g.components.length === 0)) {
      toast.error("Cada grupo necesita al menos un componente");
      return;
    }

    const template: CourseTemplate = {
      id: Date.now(),
      name: name.trim(),
      code: code.trim().toUpperCase() || "SIN-CÓDIGO",
      groups,
      createAt: new Date(),
      shareCode: "",
    };
    template.shareCode = encodeTemplate(template);
    addTemplate(template);
    setCreated(template);
    toast.success("Curso creado exitosamente");
  };

  if (created) {
    return <CreatedCourseView shareCode={created.shareCode} />;
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto min-w-99">
      <button
        onClick={() => redirect("/")}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>
      <h1 className="text-xl mb-6">Crear Curso</h1>

      <div className="space-y-4 mb-6 animate-fade-in">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Nombre del curso
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Cálculo I"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Código (opcional)
          </label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ej: MAT101"
          />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold">
            Grupos de Evaluación
          </h2>
          <span
            className={cn(
              "text-xs font-mono",
              Math.abs(totalWeight - 1) > 0.01
                ? "text-destructive"
                : "text-success"
            )}
          >
            {(totalWeight * 100).toFixed(0)}%
          </span>
        </div>

        {groups.map((group) => (
          <CourseGroup key={group.id} group={group} setGroups={setGroups} />
        ))}

        <Button
          variant="outline"
          onClick={addGroup}
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Agregar Grupo
        </Button>
      </div>
      <Button
        onClick={handleCreate}
        className="w-full text-primary-foreground border-0"
        size="lg"
      >
        Crear y Compartir
      </Button>
    </div>
  );
}
