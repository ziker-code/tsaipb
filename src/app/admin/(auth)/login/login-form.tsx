"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login, type LoginState } from "./actions";
import { inputCls } from "@/components/admin/form";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="next" value={next} />
      <label className="block text-sm font-semibold">
        Email
        <input name="email" type="email" required autoComplete="username" defaultValue={state.email} className={inputCls} />
      </label>
      <label className="block text-sm font-semibold">
        Password
        <input name="password" type="password" required autoComplete="current-password" className={inputCls} />
      </label>
      {state.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
      >
        <LogIn className="size-4" aria-hidden="true" />
        {pending ? "Memproses…" : "Masuk"}
      </button>
    </form>
  );
}
