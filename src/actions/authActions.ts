"use server";

import { findAdmin } from "@/services/adminCode.service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const LoginAction = async (code: string) => {
  const admin = await findAdmin(code);
  if (!admin) return;

  const ck = await cookies();

  ck.set("adminId", "" + admin.id, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/mobile/home");
};

export const IsLogedAction = async () => {
  const ck = await cookies();
  return !!ck.get("adminId")?.value;
};

export const LogOutAction = async () => {
  const ck = await cookies();
  ck.delete("adminId");
  redirect("/mobile/home");
};

export const GetAdminIdAction = async () => {
  const ck = await cookies();
  return ck.get("adminId")?.value as unknown as string | null;
};
