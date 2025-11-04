// app/admin/actions/revalidateCache.ts
"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAllCache() {
  try {
    // Revalidează toate paginile principale
    revalidatePath("/"); // homepage
    revalidatePath("/country"); 
    revalidatePath("/region"); 
    revalidatePath("/takeoff"); 
    revalidatePath("/landing"); 

    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return { success: false, error };
  }
}
