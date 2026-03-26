"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CourseTemplate, GradeGroup } from "@/features/mobile/types/type";
import { CreatedCourseView } from "./CreatedCourseView";
import { Input } from "@/components/ui/input";
import { CourseGroup } from "./CourseGroup";
import { Button } from "@/components/ui/button";
import { LogOutAction } from "@/actions/authActions";
import {
  CreateCourseTemplateAction,
  UpdateCourseTemplateAction,
} from "@/actions/courseTemplateAction";
import { v4 as uuid } from "uuid";

export function CreateCourseForm({
  template,
  edit,
}: {
  template?: CourseTemplate;
  edit?: boolean;
}) {
  const [name, setName] = useState(template?.name ?? "");
  const [code, setCode] = useState(template?.code ?? "");

  const [groups, setGroups] = useState<GradeGroup[]>(template?.groups ?? []);

  const [created, setCreated] = useState<CourseTemplate | null>(null);

  const totalWeight = groups.reduce((s, g) => s + g.weight, 0);

  const addGroup = () =>
    setGroups((gs) => [
      ...gs,
      {
        id: Date.now(),
        name: "Nuevo Grupo",
        weight: 0,
        components: [],
        aggregation: "AVERAGE",
      },
    ]);

  const handleCreate = async () => {
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

    const newTemplate: CourseTemplate = {
      id: template?.id ?? Date.now(),
      name: name.trim(),
      code: code.trim().toUpperCase() || "",
      groups,
      createAt: template?.createAt ?? new Date(),
      shareCode: template?.shareCode ?? uuid(),
    };
    if (edit) {
      console.log(newTemplate);
      await UpdateCourseTemplateAction(newTemplate);
      toast.success("Curso actualizado exitosamente");
      redirect("/mobile/adminLibrary");
      return;
    }
    await CreateCourseTemplateAction(newTemplate);
    toast.success("Curso creado exitosamente");
    setCreated(newTemplate);
  };

  const handleLogOut = async () => {
    await LogOutAction();
  };

  if (created) {
    return <CreatedCourseView shareCode={created.shareCode} />;
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto min-w-80">
      <div className="flex justify-between items-center h-10">
        {!edit && (
          <>
            <button
              onClick={() => redirect("/mobile/home")}
              className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
            >
              <ChevronLeft className="w-4 h-4" /> Volver
            </button>
            <Button variant="destructive" onClick={handleLogOut}>
              Log out
            </Button>
          </>
        )}
      </div>

      <h1 className="text-xl mb-6">{edit ? "Editar" : "Crear"} Curso</h1>

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
        {edit ? "Actualizar " : "Crear y Compartir"}
      </Button>
    </div>
  );
}
