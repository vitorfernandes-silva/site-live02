"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CheckCircle2, ChevronDown, Lock } from "lucide-react";

interface FormState {
  fullName: string;
  whatsapp: string;
  email: string;
  storeLink: string;
  monthlyRevenue: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const REVENUE_OPTIONS = [
  "Até R$ 20 mil",
  "R$ 20 mil a R$ 50 mil",
  "R$ 50 mil a R$ 150 mil",
  "Acima de R$ 150 mil",
];

function formatWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function DiagnosticForm() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    whatsapp: "",
    email: "",
    storeLink: "",
    monthlyRevenue: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [revenueOpen, setRevenueOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setRevenueOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setRevenueOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      nextErrors.fullName = "Informe seu nome completo.";
    }

    const phoneDigits = form.whatsapp.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      nextErrors.whatsapp = "Informe um WhatsApp válido com DDD.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = "Informe um e-mail corporativo válido.";
    }

    if (!form.storeLink.trim() || form.storeLink.trim().length < 3) {
      nextErrors.storeLink = "Informe o link da loja ou @ do Instagram.";
    }

    if (!form.monthlyRevenue) {
      nextErrors.monthlyRevenue = "Selecione a faixa de faturamento mensal.";
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    const nextValue = field === "whatsapp" ? formatWhatsApp(value) : value;
    setForm((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 550);
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-[#C48F56]/40 bg-[#0A0A09] p-8 sm:p-10 text-left"
      >
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-[#C48F56]/40 bg-[#C48F56]/10 text-[#C48F56]">
          <CheckCircle2 className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <span className="block font-display text-[11px] font-medium uppercase tracking-[0.24em] text-[#C48F56]">
          APLICAÇÃO RECEBIDA
        </span>

        <h3 className="mt-3 font-display text-2xl font-normal leading-snug text-[#F5F0E8]">
          Diagnóstico solicitado com sucesso,{" "}
          <span className="text-[#C48F56]">
            {form.fullName.trim().split(" ")[0]}
          </span>
          .
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-[#A39B8F]">
          Nossa equipe recebeu os dados da marca{" "}
          <span className="text-[#F5F0E8] font-medium">{form.storeLink}</span> e
          iniciará uma análise preliminar do seu funil, criativos e presença
          digital. Em breve, um especialista da JAGWAR entrará em contato pelo
          WhatsApp{" "}
          <span className="text-[#F5F0E8] font-medium">{form.whatsapp}</span>{" "}
          para alinhar os próximos passos.
        </p>

        <div className="mt-8 border-t border-[rgba(239,228,212,0.12)] pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#A39B8F]">
            Faixa informada:{" "}
            <span className="text-[#EFE4D4]">{form.monthlyRevenue}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setForm({
                fullName: "",
                whatsapp: "",
                email: "",
                storeLink: "",
                monthlyRevenue: "",
              });
            }}
            className="text-xs font-display uppercase tracking-[0.18em] text-[#C48F56] transition-colors hover:text-[#D4A16A] underline underline-offset-4"
          >
            Enviar outra solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Nome completo */}
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block font-display text-[11px] uppercase tracking-[0.2em] text-[#EFE4D4]"
        >
          Nome completo *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder="Seu nome e sobrenome"
          value={form.fullName}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          className={`h-12 w-full rounded-sm border bg-[#0A0A09] px-4 text-sm text-[#F5F0E8] placeholder:text-[#6E685F] transition-colors focus:outline-none ${
            errors.fullName
              ? "border-red-400/70 focus:border-red-400"
              : "border-[#26231F] focus:border-[#C48F56]"
          }`}
        />
        {errors.fullName && (
          <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>
        )}
      </div>

      {/* WhatsApp & Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="whatsapp"
            className="mb-2 block font-display text-[11px] uppercase tracking-[0.2em] text-[#EFE4D4]"
          >
            WhatsApp (com DDD) *
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            placeholder="(11) 99999-9999"
            value={form.whatsapp}
            onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
            className={`h-12 w-full rounded-sm border bg-[#0A0A09] px-4 text-sm text-[#F5F0E8] placeholder:text-[#6E685F] transition-colors focus:outline-none ${
              errors.whatsapp
                ? "border-red-400/70 focus:border-red-400"
                : "border-[#26231F] focus:border-[#C48F56]"
            }`}
          />
          {errors.whatsapp && (
            <p className="mt-1.5 text-xs text-red-400">{errors.whatsapp}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-display text-[11px] uppercase tracking-[0.2em] text-[#EFE4D4]"
          >
            E-mail corporativo *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="nome@suamarca.com.br"
            value={form.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={`h-12 w-full rounded-sm border bg-[#0A0A09] px-4 text-sm text-[#F5F0E8] placeholder:text-[#6E685F] transition-colors focus:outline-none ${
              errors.email
                ? "border-red-400/70 focus:border-red-400"
                : "border-[#26231F] focus:border-[#C48F56]"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Link do site / Instagram */}
      <div>
        <label
          htmlFor="storeLink"
          className="mb-2 block font-display text-[11px] uppercase tracking-[0.2em] text-[#EFE4D4]"
        >
          Link do site / Instagram da marca *
        </label>
        <input
          id="storeLink"
          name="storeLink"
          type="text"
          required
          placeholder="https://www.suamarca.com.br ou @suamarca"
          value={form.storeLink}
          onChange={(e) => handleFieldChange("storeLink", e.target.value)}
          aria-invalid={Boolean(errors.storeLink)}
          className={`h-12 w-full rounded-sm border bg-[#0A0A09] px-4 text-sm text-[#F5F0E8] placeholder:text-[#6E685F] transition-colors focus:outline-none ${
            errors.storeLink
              ? "border-red-400/70 focus:border-red-400"
              : "border-[#26231F] focus:border-[#C48F56]"
          }`}
        />
        {errors.storeLink && (
          <p className="mt-1.5 text-xs text-red-400">{errors.storeLink}</p>
        )}
      </div>

      {/* Faturamento mensal (Custom Accessible Select for Obsidian Aesthetic) */}
      <div ref={selectRef}>
        <label
          id="monthlyRevenueLabel"
          htmlFor="monthlyRevenueButton"
          className="mb-2 block font-display text-[11px] uppercase tracking-[0.2em] text-[#EFE4D4]"
        >
          Faturamento mensal atual da loja *
        </label>
        <div className="relative">
          <button
            id="monthlyRevenueButton"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={revenueOpen}
            aria-labelledby="monthlyRevenueLabel monthlyRevenueButton"
            aria-describedby={
              errors.monthlyRevenue ? "monthlyRevenueError" : undefined
            }
            onClick={() => setRevenueOpen((prev) => !prev)}
            className={`flex h-12 w-full items-center justify-between rounded-sm border bg-[#0A0A09] px-4 text-left text-sm transition-colors focus:outline-none ${
              form.monthlyRevenue ? "text-[#F5F0E8]" : "text-[#6E685F]"
            } ${
              errors.monthlyRevenue
                ? "border-red-400/70 focus:border-red-400"
                : revenueOpen
                  ? "border-[#C48F56]"
                  : "border-[#26231F] focus:border-[#C48F56]"
            }`}
          >
            <span className="truncate">
              {form.monthlyRevenue || "Selecione uma faixa de faturamento"}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 text-[#C48F56] transition-transform duration-200 ${
                revenueOpen ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
            />
          </button>

          {revenueOpen && (
            <ul
              role="listbox"
              aria-labelledby="monthlyRevenueLabel"
              className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 rounded-sm border border-[#C48F56]/40 bg-[#141312] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.65)]"
            >
              {REVENUE_OPTIONS.map((option) => {
                const selected = form.monthlyRevenue === option;
                return (
                  <li
                    key={option}
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      handleFieldChange("monthlyRevenue", option);
                      setRevenueOpen(false);
                    }}
                    className={`flex cursor-pointer items-center justify-between px-4 py-3 text-sm transition-colors ${
                      selected
                        ? "bg-[#C48F56]/15 text-[#EFE4D4]"
                        : "text-[#A39B8F] hover:bg-[#1C1A17] hover:text-[#F5F0E8]"
                    }`}
                  >
                    <span>{option}</span>
                    {selected && (
                      <Check className="h-4 w-4 text-[#C48F56]" strokeWidth={1.75} />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {errors.monthlyRevenue && (
          <p id="monthlyRevenueError" className="mt-1.5 text-xs text-red-400">
            {errors.monthlyRevenue}
          </p>
        )}
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-2 inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-sm bg-[#C48F56] px-6 font-display text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0A0A09] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D4A16A] hover:shadow-[0_8px_24px_rgba(196,143,86,0.2)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span>
          {isSubmitting
            ? "Enviando solicitação..."
            : "Quero Meu Diagnóstico Estratégico"}
        </span>
        {!isSubmitting && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={1.75}
          />
        )}
      </button>

      {/* Security Microcopy */}
      <div className="flex items-center justify-center gap-2 pt-1 text-center text-xs text-[#A39B8F]">
        <Lock className="h-3.5 w-3.5 text-[#C48F56] shrink-0" strokeWidth={1.5} />
        <span>
          Seus dados estão protegidos. Sem spam, apenas análise estratégica.
        </span>
      </div>
    </form>
  );
}
