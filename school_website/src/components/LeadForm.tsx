"use client";

import { useState } from "react";
import Icon from "./Icon";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  options?: string[];
};

export default function LeadForm({
  fields,
  submitLabel = "Submit",
  note,
}: {
  fields: Field[];
  submitLabel?: string;
  note?: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-[28px] bg-white border border-secondary/15 shadow-[0_20px_50px_-20px_rgba(13,27,52,0.25)] p-10 text-center">
        <span className="grid place-items-center w-16 h-16 mx-auto rounded-2xl bg-secondary/15 text-secondary mb-5">
          <Icon name="mark_email_read" className="text-3xl" />
        </span>
        <h3 className="font-display text-2xl font-bold text-primary mb-2">
          Thank you!
        </h3>
        <p className="text-on-surface/75 max-w-sm mx-auto">
          Your details have been received. Our team will get back to you within
          one working day.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-secondary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
        >
          Send another <Icon name="arrow_forward" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-[28px] bg-white border border-secondary/15 shadow-[0_20px_50px_-20px_rgba(13,27,52,0.25)] p-8 md:p-10 grid sm:grid-cols-2 gap-5"
    >
      {fields.map((f) => (
        <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
            {f.label}
            {f.required && <span className="text-secondary"> *</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              required={f.required}
              rows={4}
              className="w-full rounded-xl bg-parchment/60 border border-secondary/15 px-4 py-3 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition"
            />
          ) : f.options ? (
            <select
              name={f.name}
              required={f.required}
              defaultValue=""
              className="w-full rounded-xl bg-parchment/60 border border-secondary/15 px-4 py-3 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition"
            >
              <option value="" disabled>
                Select…
              </option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              className="w-full rounded-xl bg-parchment/60 border border-secondary/15 px-4 py-3 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition"
            />
          )}
        </div>
      ))}
      <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4 pt-2">
        <button
          type="submit"
          className="magnetic btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all"
        >
          {submitLabel} <Icon name="arrow_forward" />
        </button>
        {note && <p className="text-on-surface/75 text-xs">{note}</p>}
      </div>
    </form>
  );
}
