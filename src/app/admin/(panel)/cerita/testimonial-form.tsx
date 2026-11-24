"use client";

import { useActionState, useState } from "react";
import { Field, FormError, inputCls, SubmitButton, useKeepValuesSubmit } from "@/components/admin/form";
import { ImageField } from "@/components/admin/image-field";
import type { Testimonial } from "@/lib/types";
import { saveTestimonial, type FormState } from "./actions";

export function TestimonialForm({ item }: { item?: Testimonial }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveTestimonial, {});
  const onSubmit = useKeepValuesSubmit(action);
  const [count, setCount] = useState(item?.quote.length ?? 0);

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="grid content-start gap-5 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
        <Field label="Cerita *" hint={`${count}/400 karakter. Tulis dengan kata-kata narasumber; tampil apa adanya di kartu Beranda.`}>
          <textarea
            name="quote"
            required
            rows={7}
            maxLength={400}
            defaultValue={item?.quote}
            onChange={(e) => setCount(e.target.value.length)}
            className={inputCls}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nama *">
            <input name="name" required defaultValue={item?.name} className={inputCls} />
          </Field>
          <Field label="Angkatan" hint="Contoh: TLD 27">
            <input name="batch" defaultValue={item?.batch ?? ""} className={inputCls} />
          </Field>
        </div>
        <Field label="Peran" hint="Opsional. Contoh: Staff Social Project, Alumni 2024.">
          <input name="role" defaultValue={item?.role ?? ""} className={inputCls} />
        </Field>
        <p className="text-xs text-muted">Pastikan narasumber sudah menyetujui ceritanya ditampilkan di website.</p>
      </div>

      <div className="grid content-start gap-5">
        <div className="grid gap-5 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input type="checkbox" name="is_visible" defaultChecked={item?.is_visible ?? true} className="size-4 accent-brand-700" />
            Tampilkan di Beranda
          </label>
          <Field label="Urutan tampil" hint="Angka kecil tampil lebih dulu.">
            <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} className={inputCls} />
          </Field>
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
          <ImageField name="photo_url" label="Foto narasumber (opsional)" defaultValue={item?.photo_url} folder="stories" />
          <p className="mt-2 text-xs text-muted">Tanpa foto, kartu menampilkan inisial nama.</p>
        </div>
        <FormError message={state.error} />
        <SubmitButton pending={pending} className="w-full py-3">
          {item ? "Simpan perubahan" : "Simpan cerita"}
        </SubmitButton>
      </div>
    </form>
  );
}
