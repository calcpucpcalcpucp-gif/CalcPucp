"use client";
import { Home, PlusCircle, Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, redirect } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const tabs = [
  { path: "/home", icon: Home, label: "Inicio", admin: true },
  { path: "/import", icon: Search, label: "Buscar", admin: true },
  { path: "/craete", icon: PlusCircle, label: "Create", admin: true },
];

export function BottomNav() {
  const location = usePathname();
  const code = useStore((e) => e.adminCode);
  const setCode = useStore((e) => e.setAdminCode);
  const router = useRouter();

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const result = await fetch("/api/validAdmin", {
          method: "POST", // Cambiado a POST para enviar body
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!result.ok) {
          setCode(undefined);
          return;
        }
      } catch (error) {
        console.error("Error validando:", error);
      }
    };

    if (code) {
      validateAdmin();
    }
  }, [code, router]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass safe-bottom border-t border-border/60">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs
          .filter((item) => item.admin && code != null)
          .map(({ path, icon: Icon, label }) => {
            const active = location === path;
            return (
              <button
                key={path}
                onClick={() => redirect(path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200",
                  active
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", active && "stroke-[2.5]")} />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          })}
      </div>
    </nav>
  );
}
