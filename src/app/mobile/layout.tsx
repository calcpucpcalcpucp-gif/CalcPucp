import { IsLogedAction } from "@/actions/authActions";
import { BottomNav } from "@/features/mobile/components/layout-view/BottomNav";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const isLoged = await IsLogedAction();

  return (
    <div className="w-full h-full">
      {children}
      <BottomNav isAdmin={isLoged} />
    </div>
  );
}
