"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { decodeTemplate } from "@/store/gradeUtils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function ImportCourse() {
  const importCourse = useStore((s) => s.importCourse);
  const [code, setCode] = useState("");

  const handleImport = () => {
    const trimmed = code.trim();
    if (!trimmed) {
      toast.error("Pega el código del curso");
      return;
    }

    const template = decodeTemplate(trimmed);
    if (!template) {
      toast.error("Código inválido. Verifica que esté completo.");
      return;
    }

    importCourse(template);
    toast.success(`"${template.name}" importado correctamente`);
    redirect("/home");
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      <button
        onClick={() => redirect("/home")}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>

      <div className="animate-fade-in">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
          <Download className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-xl mb-1">Importar Curso</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Pega el código que te compartió tu profesor o compañero
        </p>

        <div className="glass rounded-2xl p-4 mb-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Pega aquí el código del curso..."
          />
        </div>

        <Button
          onClick={handleImport}
          className="w-full text-primary-foreground border-0"
          size="lg"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" /> Importar Curso
        </Button>
      </div>
    </div>
  );
}
