"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AUTH_COOKIE_NAME = "followup_auth_token";

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return { error: "Authentication is not configured on the server." };
  }

  if (email === adminEmail && password === adminPassword) {
    // 7 days expiration
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    // In a real production app with multiple users, you'd use a JWT or session ID.
    // Here we just use a secure cookie flag.
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expires,
      path: "/",
    });

    redirect("/dashboard");
  }

  return { error: "Invalid email or password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/");
}
