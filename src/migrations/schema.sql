-- Jalankan file ini di Supabase Dashboard > SQL Editor.

-- 1. Tabel profil, menyimpan username (auth.users bawaan Supabase tidak
--    punya kolom username).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- User cuma boleh baca/update profil miliknya sendiri.
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Trigger: setiap kali ada user baru di auth.users (hasil signUp),
--    otomatis buat baris profiles dengan username dari metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. RPC: cari email berdasarkan username, dipakai saat login supaya
--    user bisa masuk pakai username ATAU email. security definer supaya
--    bisa dipanggil oleh anon (belum login) tanpa perlu buka akses
--    SELECT penuh ke tabel profiles.
create or replace function public.get_email_for_username(p_username text)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select email from public.profiles where username = p_username limit 1;
$$;

grant execute on function public.get_email_for_username(text) to anon, authenticated;
