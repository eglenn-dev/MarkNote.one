"use server";
import { login } from "@/lib/auth";

export async function loginAction(formData: FormData) {
    if (!formData.get("email") || !formData.get("password")) {
        throw new Error("Email and password are required");
    }
    await login(formData);
}
