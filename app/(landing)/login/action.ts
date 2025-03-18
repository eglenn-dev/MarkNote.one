"use server";
import { login } from "@/lib/auth";

export async function loginAction(formData: FormData) {
    if (!formData.get("email") || !formData.get("password")) {
        throw new Error("Please fill in all fields");
    }
    try {
        await login(formData);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}
