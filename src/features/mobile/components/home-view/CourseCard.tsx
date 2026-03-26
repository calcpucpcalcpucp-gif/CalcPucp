import { BookOpen, QrCode, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { computeFinalGrade, getGradeColor } from "../../store/utils";
import { StudentCourse } from "../../types/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface CourseCardProps {
  course: StudentCourse;
  onRemove: (id: number) => void;
  index: number;
}

export function CourseCard({ course, onRemove, index }: CourseCardProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const finalGrade = computeFinalGrade(course.template, course.grades);
  const filledCount = course.grades.filter((g) => g.value !== null).length;
  const totalCount = course.grades.length;
  const progress = totalCount > 0 ? (filledCount / totalCount) * 100 : 0;

  return (
    <div
      className="glass rounded-2xl p-5 cursor-pointer active:scale-[0.98] transition-all duration-200 animate-fade-in group"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "backwards",
      }}
      onClick={() => redirect(`/mobile/course/${course.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold leading-tight">
              {course.template.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {course.template.code}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all max-sm:opacity-100">
          <button
            title="Ver código QR"
            onClick={(e) => {
              e.stopPropagation();
              setIsQrOpen(true);
            }}
            className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            title="Eliminar curso"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(course.id);
            }}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {filledCount}/{totalCount} notas
          </p>
          <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full gradient-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {finalGrade !== null && (
          <span
            className={cn(
              "font-display text-2xl font-bold",
              getGradeColor(finalGrade)
            )}
          >
            {finalGrade.toFixed(1)}
          </span>
        )}
      </div>
      <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
        <DialogContent
          onClick={(e) => e.stopPropagation()} // Evita que los clics dentro del modal disparen redirecciones
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              Código QR del Curso
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Escanea este código para acceder a{" "}
              <strong>{course.template.name}</strong>
            </p>
            <QRCodeSVG
              value={`share-code:${course.template.shareCode}`}
              size={180}
              className="mx-auto mb-4"
              bgColor="transparent"
              fgColor="hsl(220,25%,10%)"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
