"use client";

import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { submitEnquiry } from "@/actions/enquiries/actions";
import type { EnquiryInput } from "@/actions/enquiries/schema";
import { TOPICS } from "@/actions/enquiries/schema";

const inputClass =
  "h-12 w-full rounded-lg border border-input bg-white px-4 text-sm text-navy-900 outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-teal-400 focus:ring-0";

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    { type: "idle" } | { type: "ok" } | { type: "error"; message: string }
  >({ type: "idle" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: EnquiryInput = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      topic: String(formData.get("topic") ?? "General Enquiry") as any,
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    startTransition(async () => {
      const result = await submitEnquiry(payload);
      if (result.success) {
        setStatus({ type: "ok" });
        form.reset();
      } else {
        setStatus({ type: "error", message: result.error ?? "Something went wrong." });
      }
    });
  }

  if (status.type === "ok") {
    return (
      <div className="rounded-2xl border border-brand-teal-200 bg-brand-teal-50 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal-400/20">
          <CheckCircle2 className="h-7 w-7 text-brand-teal-600" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-navy-800">
          Thank you — your message has been received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Our team acknowledges every enquiry within one business day. For
          urgent medical or quality matters, please call{" "}
          <a
            href="tel:+8801996716929"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            +880 1996 716929
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ type: "idle" })}
          className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={labelClass}>
            Full name *
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            placeholder="Dr. Ayesha Rahman"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            placeholder="name@hospital.org"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            placeholder="+880 1XXX XXXXXX"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className={labelClass}>
            Organisation
          </label>
          <input
            id="company"
            name="company"
            maxLength={160}
            placeholder="Hospital, pharmacy or company"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="topic" className={labelClass}>
          What is your enquiry about? *
        </label>
        <select id="topic" name="topic" required className={inputClass}>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder="Please include the product name and batch number if your enquiry relates to a specific pack."
          className="w-full resize-y rounded-lg border border-input bg-white p-4 text-sm text-navy-900 outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-teal-400"
        />
      </div>

      {status.type === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{status.message}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send message
            </>
          )}
        </button>

        <p className="text-xs leading-relaxed text-muted-foreground">
          By submitting this form you agree to our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
