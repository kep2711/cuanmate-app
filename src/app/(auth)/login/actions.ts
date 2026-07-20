'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const identifier = (formData.get('identifier') as string)?.trim();
  const password = formData.get('password') as string;

  if (!identifier || !password) {
    return { error: 'Username/email dan password wajib diisi.' };
  }

  let email = identifier;

  // Kalau input bukan format email, anggap itu username dan cari
  // email-nya lewat RPC (lihat supabase/schema.sql: get_email_for_username).
  if (!identifier.includes('@')) {
    const { data: resolvedEmail, error: rpcError } = await supabase.rpc(
      'get_email_for_username',
      { p_username: identifier }
    );

    if (rpcError || !resolvedEmail) {
      // Jangan bocorkan apakah username-nya yang salah atau passwordnya.
      return { error: 'Username/email atau password salah.' };
    }

    email = resolvedEmail as string;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'Username/email atau password salah.' };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/login');
}
