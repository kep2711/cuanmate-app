"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "../actions";

type RegisterState = { error?: string; message?: string } | undefined;

async function registerAction(_prevState: RegisterState, formData: FormData) {
  const result = await register(formData);
  return result;
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState<
    RegisterState,
    FormData
  >(registerAction, undefined);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Create an Account
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Start tracking and managing your finance today
        </p>
      </div>

      {/* Form */}
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="username"
            className="text-xs font-semibold text-gray-700 sm:text-sm"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            minLength={3}
            maxLength={20}
            autoComplete="username"
            placeholder="Choose a unique username"
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-[#007A55] focus:bg-white focus:ring-2 focus:ring-[#007A55]/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-gray-700 sm:text-sm"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-[#007A55] focus:bg-white focus:ring-2 focus:ring-[#007A55]/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-xs font-semibold text-gray-700 sm:text-sm"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-[#007A55] focus:bg-white focus:ring-2 focus:ring-[#007A55]/20"
          />
        </div>

        {state?.error && (
          <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
            {state.error}
          </div>
        )}

        {state?.message && (
          <div className="rounded-lg bg-green-50 p-3 text-xs font-medium text-[#007A55]">
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full rounded-lg bg-[#007A55] py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006345] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#007A55]/40 disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Sign Up"}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-gray-500 sm:text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#007A55] hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
