"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      },
    });

    return { success: true, message: "Signed In Successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to sign in" };
  }
};

export const signUpUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return { success: true, message: "Signed Up Successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to sign up" };
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user?.id ?? null;
  } catch (error) {
    console.error("Failed to get user session", error);
    return null;
  }
};
