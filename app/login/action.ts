"use server";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    if (!formData.get("email") || !formData.get("password")) {
        redirect("/login");
    }
    await login(formData);
}
