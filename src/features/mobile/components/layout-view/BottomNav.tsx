"use client";
import { Home, LibraryBig, PlusCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, redirect } from "next/navigation";
import { useStore } from "../../store/useStore";

const tabs = [
  { path: "/mobile/home", icon: Home, label: "Inicio", admin: false },
  { path: "/mobile/import", icon: Search, label: "Buscar", admin: false },
  { path: "/mobile/create", icon: PlusCircle, label: "Create", admin: true },
  {
    path: "/mobile/adminLibrary",
    icon: LibraryBig,
    label: "Gallery",
    admin: true,
  },
];

export function BottomNav({ isAdmin }: { isAdmin?: boolean }) {
  const location = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass safe-bottom border-t border-border/60">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs
          .filter((item) => !item.admin || isAdmin)
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
                    : "text-muted-foreground hover:text-foreground",
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
