"use server";
 
import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
 
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
 
export async function joinWaitlist(formData: FormData) {
  const email = formData.get("email") as string;
 
  if (!email) return { error: "Email is required" };
 
  if (!isValidEmail(email)) return { error: "Wrong email, please enter a valid email address" };
 
  try {
    await prisma.waitlist.create({
      data: { email },
    });
 
    revalidatePath("/");
    return { success: true };
 
  } catch (error: any) {
    console.error("WAITLIST ERROR:", error);
    if (error.code === "P2002") {
      return { error: "Customer already registered!" };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
 