'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '../actions';

type LoginState = { error?: string } | undefined;

async function loginAction(_prevState: LoginState, formData: FormData) {
  const result = await login(formData);
  return result;
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Welcome Back
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form */}
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="identifier" className="text-xs font-semibold text-gray-700 sm:text-sm">
            Username or Email
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            required
            autoComplete="username"
            placeholder="Enter your username or email"
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-[#007A55] focus:bg-white focus:ring-2 focus:ring-[#007A55]/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-gray-700 sm:text-sm">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-[#007A55] focus:bg-white focus:ring-2 focus:ring-[#007A55]/20"
          />
        </div>

        {state?.error && (
          <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full rounded-lg bg-[#007A55] py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006345] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#007A55]/40 disabled:opacity-50"
        >
          {isPending ? 'Processing...' : 'Login'}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-gray-500 sm:text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-[#007A55] hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}