"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function joinWaitlist(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) return { error: "Email is required" };

  try {
    await prisma.waitlist.create({
      data: { email },
    });

    revalidatePath("/");
    return { success: true };

  } catch (error: any) {
    console.error("WAITLIST ERROR:", error); // 👈 add this
    if (error.code === "P2002") {
      return { error: "You're already on the list!" };
    }
    return { error: "Something went wrong. Please try again." };
  }
}