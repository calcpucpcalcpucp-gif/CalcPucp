"use server";

import { generateAdminCode } from "@/services/adminCode.service";
import { redirect } from "next/navigation";

export const generateAdminAction = async (form: FormData) => {
  const password = form.get("password")! as string;
  if (process.env["PASSWORD"] == password) {
    const code = await generateAdminCode();
    redirect(`/code/${code}`);
  }
};
