"use client";
import { ChevronLeft, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export const CreatedCourseView = ({ shareCode }: { shareCode: string }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(shareCode);
    toast.success("Código copiado al portapapeles");
  };

  const onBack = () => {
    redirect("/mobile/create");
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>
      <div className="text-center">
        <div className="w-16 h-16 rounded-3xl gradient-accent mx-auto flex items-center justify-center mb-4">
          <Share2 className="w-7 h-7 text-accent-foreground" />
        </div>
        <h1 className="text-xl mb-1">¡Curso Creado!</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Comparte este código con tus estudiantes
        </p>

        <div className="glass rounded-2xl p-6 mb-4">
          <QRCodeSVG
            value={`share-code:${shareCode}`}
            size={180}
            className="mx-auto mb-4"
            bgColor="transparent"
            fgColor="hsl(220,25%,10%)"
          />
          <div className="bg-secondary rounded-xl p-3 mb-3">
            <p className="text-xs text-muted-foreground font-mono break-all line-clamp-3">
              {shareCode}
            </p>
          </div>
          <Button onClick={copyCode} className="w-full" size="sm">
            Copiar Código
          </Button>
        </div>
      </div>
    </div>
  );
};
