"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const username = (formData.get("username") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!username || !email || !password) {
    return { error: "Semua field wajib diisi." };
  }

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return {
      error: "Username 3-20 karakter, hanya huruf, angka, dan underscore.",
    };
  }

  if (password.length < 6) {
    return { error: "Password minimal 6 karakter." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    const msg = error.message.toLowerCase();

    if (msg.includes("already registered") || msg.includes("already exists")) {
      return { error: "Email sudah terdaftar." };
    }
    if (msg.includes("duplicate") || msg.includes("unique")) {
      return { error: "Username sudah dipakai, coba yang lain." };
    }
    return { error: error.message };
  }

  // Kalau project Supabase kamu mewajibkan konfirmasi email, signUp()
  // sukses tapi belum ada session — user harus klik link di email dulu.
  if (!data.session) {
    return {
      message:
        "Registrasi berhasil! Cek spam email kamu untuk konfirmasi sebelum login.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
