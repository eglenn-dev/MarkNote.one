"use server";
import { createUserIfUnique } from "@/models/accounts-model";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (password !== confirmPassword) {
        console.log(
            "Passwords do not match",
            `${password} | ${confirmPassword}`
        );
        throw new Error("Passwords do not match");
    }
    if (
        password.length < 8 ||
        !/\d/.test(password) ||
        !/[!@#$%^&*]/.test(password)
    ) {
        throw new Error(
            "Password must be at least 8 characters long and contain at least one number and one special character"
        );
    }

    if (!formData.get("email") || !formData.get("name")) {
        throw new Error("Email and name are required");
    }

    await createUserIfUnique(
        formData.get("email")?.toString() || "",
        formData.get("name")?.toString() || "",
        formData.get("password")?.toString() || ""
    );
    await login(formData);
    redirect("/home");
}
