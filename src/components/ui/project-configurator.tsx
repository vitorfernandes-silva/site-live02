"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clapperboard,
  Database,
  Gauge,
  Info,
  LayoutDashboard,
  Moon,
  Pencil,
  PhoneCall,
  Repeat,
  Rocket,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
} from "lucide-react";
import {
  ADDONS,
  AddonId,
  CHALLENGES,
  ChallengeId,
  OnboardingBriefingPayload,
  OnboardingState,
  PILLARS,
  PLATFORMS,
  PillarId,
  REVENUE_BANDS,
  createBriefingMeta,
  evaluateOnboarding,
} from "@/lib/project-configurator";
import { WhatsAppIcon, buildWhatsAppUrl } from "@/components/ui/whatsapp-float";

const INITIAL_STATE: OnboardingState = {
  brandName: "",
  siteOrInstagram: "",
  platform: "",
  revenueBand: "",
  challenges: [],
  pillars: [],
  addons: [],
  contactName: "",
  whatsapp: "",
  email: "",
  notes: "",
};

const TOTAL_STEPS = 7;

function PillarIcon({ id, size = 19 }: { id: PillarId; size?: number }) {
  const props = { size, strokeWidth: 1.8, "aria-hidden": true as const };
  switch (id) {
    case "trafego":
      return <Target {...props} />;
    case "criativos":
      return <Clapperboard {...props} />;
    case "cro":
      return <Gauge {...props} />;
    case "crm":
      return <Repeat {...props} />;
    case "growth":
      return <TrendingUp {...props} />;
  }
}

function AddonIcon({ id, size = 19 }: { id: AddonId; size?: number }) {
  const props = { size, strokeWidth: 1.8, "aria-hidden": true as const };
  switch (id) {
    case "creator-tiktok":
      return <Users {...props} />;
    case "ugc-curadoria":
      return <WandSparkles {...props} />;
    case "lancamento-colecao":
      return <Rocket {...props} />;
    case "setup-tracking-erp":
      return <Database {...props} />;
  }
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export interface ProjectConfiguratorProps {
  theme?: "dark" | "light";
}

export default function ProjectConfigurator({ theme = "dark" }: ProjectConfiguratorProps) {
  const [scheme, setScheme] = React.useState<"dark" | "light">(theme);
  const [step, setStep] = React.useState<number>(1);
  const [reachedReview, setReachedReview] = React.useState<boolean>(false);
  const [state, setState] = React.useState<OnboardingState>(INITIAL_STATE);
  const [contactErrors, setContactErrors] = React.useState<{
    contactName?: string;
    whatsapp?: string;
    email?: string;
  }>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [webhookNotice, setWebhookNotice] = React.useState<string | null>(null);
  const [submittedPayload, setSubmittedPayload] = React.useState<OnboardingBriefingPayload | null>(
    null,
  );

  const cardTopRef = React.useRef<HTMLDivElement | null>(null);

  const evaluation = React.useMemo(() => evaluateOnboarding(state), [state]);

  const scrollCardTop = () => {
    cardTopRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const toggleChallenge = (id: ChallengeId) => {
    setState((prev) => {
      if (prev.challenges.includes(id)) {
        return { ...prev, challenges: prev.challenges.filter((c) => c !== id) };
      }
      if (prev.challenges.length >= 2) {
        return { ...prev, challenges: [prev.challenges[1], id] };
      }
      return { ...prev, challenges: [...prev.challenges, id] };
    });
  };

  const togglePillar = (id: PillarId) => {
    setState((prev) => ({
      ...prev,
      pillars: prev.pillars.includes(id)
        ? prev.pillars.filter((p) => p !== id)
        : [...prev.pillars, id],
    }));
  };

  const toggleAddon = (id: AddonId) => {
    setState((prev) => ({
      ...prev,
      addons: prev.addons.includes(id)
        ? prev.addons.filter((a) => a !== id)
        : [...prev.addons, id],
    }));
  };

  const canProceed = React.useMemo(() => {
    switch (step) {
      case 1:
        return state.brandName.trim().length >= 2 && Boolean(state.platform);
      case 2:
        return Boolean(state.revenueBand);
      case 3:
        return state.challenges.length >= 1;
      case 4:
        return state.pillars.length >= 1;
      case 5:
        return true;
      case 6:
        return (
          state.contactName.trim().length >= 2 &&
          state.whatsapp.replace(/\D/g, "").length >= 10 &&
          isValidEmail(state.email)
        );
      case 7:
        return true;
      default:
        return false;
    }
  }, [step, state]);

  const jumpToStep = (target: number) => {
    setContactErrors({});
    setStep(target);
    scrollCardTop();
  };

  const goBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      scrollCardTop();
    }
  };

  const goNext = () => {
    if (!canProceed || step >= TOTAL_STEPS) return;
    setStep((s) => s + 1);
    scrollCardTop();
  };

  const handleContactNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: typeof contactErrors = {};
    if (state.contactName.trim().length < 2) {
      errors.contactName = "Informe seu nome.";
    }
    if (state.whatsapp.replace(/\D/g, "").length < 10) {
      errors.whatsapp = "Informe um WhatsApp válido com DDD.";
    }
    if (!isValidEmail(state.email)) {
      errors.email = "Informe um e-mail válido.";
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setReachedReview(true);
    setStep(7);
    scrollCardTop();
  };

  const handleFinalSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setWebhookNotice(null);

    const { protocol, submittedAt } = createBriefingMeta();

    const payload: OnboardingBriefingPayload = {
      protocol,
      submittedAt,
      brand: {
        brandName: state.brandName.trim(),
        siteOrInstagram: state.siteOrInstagram.trim(),
        platform: evaluation.platform?.label ?? "Não informada",
        revenueBand: evaluation.revenueBand?.label ?? "Não informada",
      },
      contact: {
        name: state.contactName.trim(),
        whatsapp: state.whatsapp.trim(),
        email: state.email.trim(),
        notes: state.notes.trim(),
      },
      configuration: {
        challenges: evaluation.selectedChallenges.map((c) => c.title),
        pillars: evaluation.selectedPillars.map((p) => ({ id: p.id, title: p.title })),
        addons: evaluation.selectedAddons.map((a) => ({ id: a.id, title: a.title })),
        maturityStage: {
          id: evaluation.maturityStage.id,
          name: evaluation.maturityStage.name,
          tagline: evaluation.maturityStage.tagline,
        },
        idealForTags: evaluation.idealForTags,
        insight: evaluation.insight,
      },
    };

    const webhookUrl = process.env.NEXT_PUBLIC_BRIEFING_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          setWebhookNotice(
            "Diagnóstico gerado com sucesso, mas o webhook externo retornou erro. Você pode copiar o resumo abaixo.",
          );
        }
      } catch {
        setWebhookNotice(
          "Diagnóstico gerado na tela. Caso queira salvar ou enviar manualmente, use o botão Copiar resumo.",
        );
      }
    }

    setSubmitting(false);
    setSubmittedPayload(payload);
    scrollCardTop();
  };

  const progressPct = submittedPayload ? 100 : Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="onb-root" data-scheme={scheme}>
      <style>{ONB_CSS}</style>

      {/* Top Minimal Header */}
      <header className="onb-top">
        <div className="onb-top-in">
          <Link href="/" className="onb-back-link">
            <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>Voltar ao site</span>
          </Link>

          <Link href="/" className="onb-logo-wrap" aria-label="JAGWAR">
            <Image
              src="/images/logos-jagwar/logo_textobranco_horizontal_transparente.png"
              alt="JAGWAR"
              width={1670}
              height={378}
              priority
              className="onb-logo onb-logo-light"
            />
            <Image
              src="/images/logos-jagwar/logo_textoescuro_horizontal_transparente.png"
              alt="JAGWAR"
              width={1670}
              height={378}
              priority
              className="onb-logo onb-logo-dark"
            />
          </Link>

          <button
            type="button"
            className="onb-theme-btn"
            onClick={() => setScheme((s) => (s === "dark" ? "light" : "dark"))}
            aria-label={scheme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
          >
            {scheme === "dark" ? (
              <Sun size={16} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Moon size={16} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Centered SaaS Onboarding Modal Card */}
      <main className="onb-shell">
        <div
          ref={cardTopRef}
          className="onb-modal"
          role="region"
          aria-label="Configuração guiada do projeto JAGWAR"
        >
          {/* Progress bar at very top of modal */}
          <div className="onb-progress-track" aria-hidden="true">
            <div className="onb-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>

          {!submittedPayload ? (
            <>
              {/* Modal Meta Header */}
              <div className="onb-modal-meta">
                <div className="onb-step-badge">
                  <span className="onb-mark-mini" aria-hidden="true">
                    <Image
                      src="/images/logos-jagwar/favicon.png"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </span>
                  <span>
                    Passo {step} de {TOTAL_STEPS}
                  </span>
                </div>
                {reachedReview && step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    className="onb-jump-review"
                    disabled={!canProceed}
                    onClick={() => jumpToStep(TOTAL_STEPS)}
                  >
                    Voltar ao resumo
                  </button>
                ) : step === 1 ? (
                  <span className="onb-time-pill">~1 minuto</span>
                ) : (
                  <span className="onb-time-pill">{progressPct}% concluído</span>
                )}
              </div>

              {/* Active Step Body (1 screen at a time) */}
              <div key={step} className="onb-step-body">
                {step === 1 ? (
                  <div className="onb-step-stack">
                    <h1 className="onb-h1">Vamos começar pela sua marca</h1>
                    <p className="onb-lead">
                      Em poucos passos rápidos vamos estruturar o briefing do seu e-commerce para a nossa reunião.
                    </p>

                    <div className="onb-field">
                      <label htmlFor="onb-brand">Nome da marca ou loja *</label>
                      <input
                        id="onb-brand"
                        type="text"
                        placeholder="Ex.: Atelier Lumière"
                        value={state.brandName}
                        onChange={(e) =>
                          setState((s) => ({ ...s, brandName: e.target.value }))
                        }
                      />
                    </div>

                    <div className="onb-field">
                      <label htmlFor="onb-site">Site ou @Instagram (opcional)</label>
                      <input
                        id="onb-site"
                        type="text"
                        placeholder="sualoja.com.br ou @suamarca"
                        value={state.siteOrInstagram}
                        onChange={(e) =>
                          setState((s) => ({ ...s, siteOrInstagram: e.target.value }))
                        }
                      />
                    </div>

                    <div className="onb-field">
                      <span className="onb-label">Qual plataforma vocês usam hoje? *</span>
                      <div className="onb-pill-grid">
                        {PLATFORMS.map((plat) => {
                          const active = state.platform === plat.id;
                          return (
                            <button
                              key={plat.id}
                              type="button"
                              aria-pressed={active}
                              className="onb-plat-pill"
                              data-active={active ? "" : undefined}
                              onClick={() =>
                                setState((s) => ({ ...s, platform: plat.id }))
                              }
                            >
                              <span>{plat.label}</span>
                              {active ? <Check size={14} strokeWidth={2.4} aria-hidden="true" /> : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="onb-step-stack">
                    <h1 className="onb-h1">Qual o faturamento mensal atual?</h1>
                    <p className="onb-lead">
                      Essa resposta calibra o nível de estrutura que faz sentido agora — sem preços fechados.
                    </p>

                    <div className="onb-choice-list" role="radiogroup" aria-label="Faixa de faturamento">
                      {REVENUE_BANDS.map((band) => {
                        const active = state.revenueBand === band.id;
                        return (
                          <button
                            key={band.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            className="onb-choice-card"
                            data-active={active ? "" : undefined}
                            onClick={() =>
                              setState((s) => ({ ...s, revenueBand: band.id }))
                            }
                          >
                            <span className="onb-radio-dot" aria-hidden="true">
                              {active ? <span /> : null}
                            </span>
                            <span className="onb-choice-text">
                              <strong>{band.label}</strong>
                              <small>{band.hint}</small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="onb-step-stack">
                    <h1 className="onb-h1">Qual é o maior gargalo hoje?</h1>
                    <p className="onb-lead">
                      Escolha <strong>1 ou 2 desafios</strong> que mais travam suas vendas no momento.
                    </p>

                    <div className="onb-choice-list">
                      {CHALLENGES.map((ch) => {
                        const active = state.challenges.includes(ch.id);
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            aria-pressed={active}
                            className="onb-choice-card"
                            data-active={active ? "" : undefined}
                            onClick={() => toggleChallenge(ch.id)}
                          >
                            <span className="onb-check-box" aria-hidden="true">
                              {active ? <Check size={13} strokeWidth={2.6} /> : null}
                            </span>
                            <span className="onb-choice-text">
                              <strong>{ch.title}</strong>
                              <small>{ch.subtitle}</small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="onb-step-stack">
                    <h1 className="onb-h1">Quais pilares quer no projeto?</h1>
                    <p className="onb-lead">
                      Selecione um ou mais pilares da JAGWAR que você deseja ativar na operação.
                    </p>

                    <div className="onb-choice-list">
                      {PILLARS.map((pil) => {
                        const active = state.pillars.includes(pil.id);
                        return (
                          <button
                            key={pil.id}
                            type="button"
                            aria-pressed={active}
                            className="onb-choice-card onb-choice-pillar"
                            data-active={active ? "" : undefined}
                            style={{ "--p-accent": pil.color } as React.CSSProperties}
                            onClick={() => togglePillar(pil.id)}
                          >
                            <span className="onb-ico-box" aria-hidden="true">
                              <PillarIcon id={pil.id} size={18} />
                            </span>
                            <span className="onb-choice-text">
                              <strong>{pil.title}</strong>
                              <small>{pil.shortDesc}</small>
                            </span>
                            <span className="onb-check-box" aria-hidden="true">
                              {active ? <Check size={13} strokeWidth={2.6} /> : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 5 ? (
                  <div className="onb-step-stack">
                    <h1 className="onb-h1">Quer incluir aceleradores?</h1>
                    <p className="onb-lead">
                      Etapa opcional. Escolha se quiser somar frentes como Creator Economy e TikTok Shop.
                    </p>

                    <div className="onb-choice-list">
                      {ADDONS.map((addon) => {
                        const active = state.addons.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            aria-pressed={active}
                            className="onb-choice-card onb-choice-addon"
                            data-active={active ? "" : undefined}
                            onClick={() => toggleAddon(addon.id)}
                          >
                            <span className="onb-ico-box onb-ico-gold" aria-hidden="true">
                              <AddonIcon id={addon.id} size={18} />
                            </span>
                            <span className="onb-choice-text">
                              <span className="onb-choice-head-row">
                                <strong>{addon.title}</strong>
                                {addon.badge ? (
                                  <span className="onb-hot-pill">{addon.badge}</span>
                                ) : null}
                              </span>
                              <small>{addon.shortDesc}</small>
                            </span>
                            <span className="onb-check-box" aria-hidden="true">
                              {active ? <Check size={13} strokeWidth={2.6} /> : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="onb-os-banner">
                      <LayoutDashboard size={16} strokeWidth={1.9} aria-hidden="true" />
                      <span>
                        <strong>JAGWAR OS gratuito</strong> já vem incluso em todas as configurações.
                      </span>
                    </div>
                  </div>
                ) : null}

                {step === 6 ? (
                  <form id="onb-contact-form" className="onb-step-stack" onSubmit={handleContactNext} noValidate>
                    <h1 className="onb-h1">Onde podemos entrar em contato?</h1>
                    <p className="onb-lead">
                      Preencha seus dados de contato. Na próxima tela você revisa tudo antes de enviar.
                    </p>

                    <div className="onb-field">
                      <label htmlFor="onb-name">Seu nome *</label>
                      <input
                        id="onb-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Como podemos te chamar?"
                        value={state.contactName}
                        onChange={(e) => {
                          setState((s) => ({ ...s, contactName: e.target.value }));
                          setContactErrors((er) => ({ ...er, contactName: undefined }));
                        }}
                        aria-invalid={Boolean(contactErrors.contactName)}
                      />
                      {contactErrors.contactName ? (
                        <span className="onb-error">{contactErrors.contactName}</span>
                      ) : null}
                    </div>

                    <div className="onb-field">
                      <label htmlFor="onb-whatsapp">WhatsApp com DDD *</label>
                      <input
                        id="onb-whatsapp"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(11) 99999-9999"
                        value={state.whatsapp}
                        onChange={(e) => {
                          setState((s) => ({ ...s, whatsapp: e.target.value }));
                          setContactErrors((er) => ({ ...er, whatsapp: undefined }));
                        }}
                        aria-invalid={Boolean(contactErrors.whatsapp)}
                      />
                      {contactErrors.whatsapp ? (
                        <span className="onb-error">{contactErrors.whatsapp}</span>
                      ) : null}
                    </div>

                    <div className="onb-field">
                      <label htmlFor="onb-email">E-mail corporativo *</label>
                      <input
                        id="onb-email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@suamarca.com.br"
                        value={state.email}
                        onChange={(e) => {
                          setState((s) => ({ ...s, email: e.target.value }));
                          setContactErrors((er) => ({ ...er, email: undefined }));
                        }}
                        aria-invalid={Boolean(contactErrors.email)}
                      />
                      {contactErrors.email ? (
                        <span className="onb-error">{contactErrors.email}</span>
                      ) : null}
                    </div>

                    <div className="onb-field">
                      <label htmlFor="onb-notes">Algum detalhe extra? (opcional)</label>
                      <textarea
                        id="onb-notes"
                        rows={2}
                        placeholder="Ex.: lançamento de coleção previsto, meta nos próximos 90 dias..."
                        value={state.notes}
                        onChange={(e) =>
                          setState((s) => ({ ...s, notes: e.target.value }))
                        }
                      />
                    </div>
                  </form>
                ) : null}

                {step === 7 ? (
                  <div className="onb-step-stack">
                    <h1 className="onb-h1">Revise antes de enviar</h1>
                    <p className="onb-lead">
                      Confira suas respostas abaixo. Se quiser ajustar algo, toque em Editar.
                    </p>

                    <div className="onb-review-list">
                      <div className="onb-review-row">
                        <div className="onb-review-body">
                          <span className="onb-review-label">Marca &amp; Plataforma</span>
                          <strong className="onb-review-val">
                            {state.brandName.trim()} · {evaluation.platform?.label}
                          </strong>
                          {state.siteOrInstagram.trim() ? (
                            <small className="onb-review-sub">{state.siteOrInstagram.trim()}</small>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          className="onb-review-edit"
                          onClick={() => jumpToStep(1)}
                        >
                          <Pencil size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Editar</span>
                        </button>
                      </div>

                      <div className="onb-review-row">
                        <div className="onb-review-body">
                          <span className="onb-review-label">Faturamento mensal</span>
                          <strong className="onb-review-val">
                            {evaluation.revenueBand?.label}
                          </strong>
                        </div>
                        <button
                          type="button"
                          className="onb-review-edit"
                          onClick={() => jumpToStep(2)}
                        >
                          <Pencil size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Editar</span>
                        </button>
                      </div>

                      <div className="onb-review-row">
                        <div className="onb-review-body">
                          <span className="onb-review-label">Maior gargalo hoje</span>
                          <strong className="onb-review-val">
                            {evaluation.selectedChallenges.map((c) => c.title).join(" · ")}
                          </strong>
                        </div>
                        <button
                          type="button"
                          className="onb-review-edit"
                          onClick={() => jumpToStep(3)}
                        >
                          <Pencil size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Editar</span>
                        </button>
                      </div>

                      <div className="onb-review-row">
                        <div className="onb-review-body">
                          <span className="onb-review-label">Pilares escolhidos</span>
                          <div className="onb-review-chips">
                            {evaluation.selectedPillars.map((p) => (
                              <span key={p.id} className="onb-review-chip">
                                {p.title}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="onb-review-edit"
                          onClick={() => jumpToStep(4)}
                        >
                          <Pencil size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Editar</span>
                        </button>
                      </div>

                      <div className="onb-review-row">
                        <div className="onb-review-body">
                          <span className="onb-review-label">Aceleradores</span>
                          {evaluation.selectedAddons.length > 0 ? (
                            <div className="onb-review-chips">
                              {evaluation.selectedAddons.map((a) => (
                                <span key={a.id} className="onb-review-chip onb-review-chip-gold">
                                  {a.title}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <strong className="onb-review-val onb-review-muted">
                              Nenhum acelerador selecionado
                            </strong>
                          )}
                          <small className="onb-review-os">JAGWAR OS gratuito incluso</small>
                        </div>
                        <button
                          type="button"
                          className="onb-review-edit"
                          onClick={() => jumpToStep(5)}
                        >
                          <Pencil size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Editar</span>
                        </button>
                      </div>

                      <div className="onb-review-row">
                        <div className="onb-review-body">
                          <span className="onb-review-label">Seus dados de contato</span>
                          <strong className="onb-review-val">
                            {state.contactName.trim()} · {state.whatsapp.trim()}
                          </strong>
                          <small className="onb-review-sub">{state.email.trim()}</small>
                          {state.notes.trim() ? (
                            <small className="onb-review-sub">“{state.notes.trim()}”</small>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          className="onb-review-edit"
                          onClick={() => jumpToStep(6)}
                        >
                          <Pencil size={12} strokeWidth={2} aria-hidden="true" />
                          <span>Editar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Sticky Thumb-Friendly Modal Footer */}
              <div className="onb-modal-foot">
                {step > 1 ? (
                  <button type="button" className="onb-btn-back" onClick={goBack}>
                    <ArrowLeft size={15} strokeWidth={1.9} aria-hidden="true" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <span />
                )}

                {step < 6 ? (
                  <button
                    type="button"
                    className="onb-btn-next"
                    disabled={!canProceed}
                    onClick={goNext}
                  >
                    <span>
                      {step === 5 && state.addons.length === 0
                        ? "Pular por enquanto"
                        : "Continuar"}
                    </span>
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </button>
                ) : step === 6 ? (
                  <button
                    type="submit"
                    form="onb-contact-form"
                    className="onb-btn-next"
                  >
                    <span>Revisar resumo</span>
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="onb-btn-next onb-btn-submit"
                    disabled={submitting}
                    onClick={handleFinalSubmit}
                  >
                    <Sparkles size={15} strokeWidth={2} aria-hidden="true" />
                    <span>{submitting ? "Enviando..." : "Confirmar e enviar"}</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            /* FINAL SCREEN: MINIMALIST THANK-YOU STATE */
            <div className="onb-thanks">
              <span className="onb-thanks-ico" aria-hidden="true">
                <PhoneCall size={26} strokeWidth={1.8} />
              </span>

              <span className="onb-thanks-pill">
                Protocolo {submittedPayload.protocol}
              </span>

              <h1 className="onb-thanks-h1">
                Obrigado, {submittedPayload.contact.name.split(" ")[0]}!
              </h1>

              <p className="onb-thanks-p">
                Recebemos as informações da <strong>{submittedPayload.brand.brandName}</strong>. Um dos nossos consultores entrará em contato em até <strong>4 horas</strong> para agendar a sua reunião.
              </p>

              {webhookNotice ? (
                <div className="onb-notice">
                  <Info size={15} strokeWidth={1.9} aria-hidden="true" />
                  <p>{webhookNotice}</p>
                </div>
              ) : null}

              <a
                href={buildWhatsAppUrl(
                  `Olá! Acabei de preencher meu briefing no site da JAGWAR (Protocolo ${submittedPayload.protocol}) para a marca ${submittedPayload.brand.brandName}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="onb-thanks-wa"
              >
                <WhatsAppIcon size={20} />
                <span>Falar agora no WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const ONB_CSS = `
.onb-root {
  --onb-bg: #F5F0E8;
  --onb-card: #FCF9F4;
  --onb-surface: #EFE4D4;
  --onb-ink: #0A0A09;
  --onb-ink2: #463F32;
  --onb-line: rgba(70, 63, 50, 0.16);
  --onb-accent: #C48F56;
  --onb-accent-soft: #D8AD7B;
  --onb-sans: "Inter Display", "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(900px 480px at 50% 0%, rgba(196, 143, 86, 0.15), transparent 70%), var(--onb-bg);
  color: var(--onb-ink);
  font-family: var(--onb-sans);
  -webkit-font-smoothing: antialiased;
}
.onb-root[data-scheme="dark"] {
  --onb-bg: #0A0A09;
  --onb-card: #141312;
  --onb-surface: #1C1A17;
  --onb-ink: #F5F0E8;
  --onb-ink2: #A39B8F;
  --onb-line: rgba(239, 228, 212, 0.14);
  background:
    radial-gradient(880px 440px at 50% -4%, rgba(196, 143, 86, 0.18), transparent 72%),
    var(--onb-bg);
}
.onb-root *, .onb-root *::before, .onb-root *::after { box-sizing: border-box; }
.onb-root :where(button, input, textarea) { font: inherit; color: inherit; }

/* Minimal Top Bar */
.onb-top {
  height: 60px;
  border-bottom: 1px solid var(--onb-line);
  background: color-mix(in oklab, var(--onb-bg) 82%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  z-index: 40;
}
.onb-top-in {
  max-width: 960px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.onb-back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--onb-ink2);
  text-decoration: none;
  padding: 7px 10px;
  border-radius: 999px;
  transition: color 0.2s, background 0.2s;
}
.onb-back-link:hover { color: var(--onb-ink); background: var(--onb-surface); }
.onb-logo-wrap { display: inline-flex; align-items: center; }
.onb-logo { height: 22px; width: auto; object-fit: contain; display: block; }
.onb-logo-light { display: none; }
.onb-logo-dark { display: block; }
.onb-root[data-scheme="dark"] .onb-logo-light { display: block; }
.onb-root[data-scheme="dark"] .onb-logo-dark { display: none; }
.onb-theme-btn {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--onb-line);
  background: var(--onb-card);
  color: var(--onb-ink2);
  display: grid;
  place-items: center;
  cursor: pointer;
}
.onb-theme-btn:hover { border-color: var(--onb-accent); color: var(--onb-ink); }

/* Centered Modal Shell */
.onb-shell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 36px) 16px;
}
.onb-modal {
  width: 100%;
  max-width: 560px;
  border-radius: 22px;
  border: 1px solid var(--onb-line);
  background: var(--onb-card);
  box-shadow: 0 32px 80px -28px rgba(0, 0, 0, 0.65);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: max-width 0.35s ease;
}
.onb-modal[data-wide] { max-width: 650px; }

.onb-progress-track {
  height: 3.5px;
  width: 100%;
  background: color-mix(in oklab, var(--onb-ink2) 18%, transparent);
}
.onb-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #C48F56, #D8AD7B);
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.onb-modal-meta {
  padding: 18px 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.onb-step-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--onb-ink2);
}
.onb-mark-mini {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  overflow: hidden;
  display: block;
  border: 1px solid rgba(216, 173, 123, 0.35);
}
.onb-mark-mini img { width: 100%; height: 100%; object-fit: cover; display: block; }
.onb-time-pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  background: color-mix(in oklab, var(--onb-accent) 14%, transparent);
  border: 1px solid rgba(216, 173, 123, 0.28);
  color: var(--onb-accent-soft);
}
.onb-root:not([data-scheme="dark"]) .onb-time-pill { color: #7D5327; }
.onb-jump-review {
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  border: 1px solid rgba(216, 173, 123, 0.35);
  background: rgba(196, 143, 86, 0.14);
  color: var(--onb-accent-soft);
  cursor: pointer;
}
.onb-jump-review:disabled { opacity: 0.4; cursor: not-allowed; }
.onb-root:not([data-scheme="dark"]) .onb-jump-review { color: #7D5327; }

/* Review List (Step 7) */
.onb-review-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.onb-review-row {
  padding: 12px 14px;
  border-radius: 13px;
  border: 1px solid var(--onb-line);
  background: color-mix(in oklab, var(--onb-surface) 38%, transparent);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.onb-review-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.onb-review-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--onb-ink2);
}
.onb-review-val {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  word-break: break-word;
}
.onb-review-muted {
  color: var(--onb-ink2);
  font-weight: 500;
}
.onb-review-sub {
  font-size: 12.5px;
  color: var(--onb-ink2);
  line-height: 1.35;
  word-break: break-word;
}
.onb-review-os {
  font-size: 11.5px;
  font-weight: 600;
  color: #6BA889;
  margin-top: 2px;
}
.onb-review-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 2px;
}
.onb-review-chip {
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 550;
  border: 1px solid var(--onb-line);
  background: var(--onb-card);
  color: var(--onb-ink);
}
.onb-review-chip-gold {
  border-color: rgba(216, 173, 123, 0.38);
  background: rgba(196, 143, 86, 0.14);
  color: var(--onb-accent-soft);
}
.onb-root:not([data-scheme="dark"]) .onb-review-chip-gold { color: #7D5327; }
.onb-review-edit {
  flex: none;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--onb-line);
  background: var(--onb-card);
  color: var(--onb-ink2);
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.onb-review-edit:hover {
  border-color: var(--onb-accent-soft);
  color: var(--onb-ink);
}

/* Step Content & Entrance */
@keyframes onbFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.onb-step-body {
  padding: 18px 24px 22px;
  animation: onbFade 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.onb-step-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.onb-h1 {
  margin: 0;
  font-size: clamp(22px, 4vw, 27px);
  font-weight: 650;
  letter-spacing: -0.025em;
  line-height: 1.15;
}
.onb-lead {
  margin: -4px 0 4px;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--onb-ink2);
}
.onb-lead strong { color: var(--onb-ink); }

/* Inputs (16px font prevents iOS Safari zoom) */
.onb-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.onb-field label, .onb-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--onb-ink2);
}
.onb-field input, .onb-field textarea {
  width: 100%;
  min-height: 48px;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid var(--onb-line);
  background: color-mix(in oklab, var(--onb-surface) 45%, var(--onb-bg));
  font-size: 16px;
  color: var(--onb-ink);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.onb-field textarea { min-height: 76px; resize: vertical; }
.onb-field input:focus, .onb-field textarea:focus {
  outline: none;
  border-color: var(--onb-accent-soft);
  box-shadow: 0 0 0 3px rgba(216, 173, 123, 0.16);
}
.onb-field input[aria-invalid="true"] { border-color: #D46A6A; }
.onb-error { font-size: 12px; color: #E07A7A; }

/* Platform Pills */
.onb-pill-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.onb-plat-pill {
  min-height: 48px;
  padding: 10px 13px;
  border-radius: 12px;
  border: 1px solid var(--onb-line);
  background: color-mix(in oklab, var(--onb-surface) 35%, transparent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
  font-weight: 550;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.onb-plat-pill:hover { border-color: rgba(216, 173, 123, 0.45); }
.onb-plat-pill[data-active] {
  border-color: var(--onb-accent-soft);
  background: rgba(196, 143, 86, 0.14);
  color: var(--onb-ink);
}
.onb-plat-pill[data-active] svg { color: var(--onb-accent-soft); }

/* Choice Cards */
.onb-choice-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.onb-choice-card {
  width: 100%;
  min-height: 54px;
  padding: 13px 14px;
  border-radius: 14px;
  border: 1px solid var(--onb-line);
  background: color-mix(in oklab, var(--onb-surface) 32%, transparent);
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}
.onb-choice-card:hover { border-color: rgba(216, 173, 123, 0.45); }
.onb-choice-card[data-active] {
  border-color: var(--onb-accent-soft);
  background: rgba(196, 143, 86, 0.12);
}
.onb-choice-pillar[data-active] {
  border-color: var(--p-accent);
  background: color-mix(in oklab, var(--p-accent) 12%, transparent);
}
.onb-choice-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.onb-choice-head-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.onb-choice-text strong { font-size: 14.5px; font-weight: 600; line-height: 1.25; }
.onb-choice-text small { font-size: 12.5px; color: var(--onb-ink2); line-height: 1.35; }

.onb-radio-dot {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  border: 1.5px solid var(--onb-ink2);
  display: grid;
  place-items: center;
  flex: none;
}
.onb-choice-card[data-active] .onb-radio-dot { border-color: var(--onb-accent-soft); }
.onb-radio-dot span {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--onb-accent-soft);
}

.onb-check-box {
  width: 21px;
  height: 21px;
  border-radius: 7px;
  border: 1.5px solid var(--onb-line);
  display: grid;
  place-items: center;
  flex: none;
  color: #0A0A09;
}
.onb-choice-card[data-active] .onb-check-box {
  border-color: var(--onb-accent-soft);
  background: var(--onb-accent-soft);
}
.onb-choice-pillar[data-active] .onb-check-box {
  border-color: var(--p-accent);
  background: var(--p-accent);
}

.onb-ico-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: color-mix(in oklab, var(--p-accent) 16%, transparent);
  color: var(--p-accent);
  flex: none;
}
.onb-ico-gold {
  background: rgba(196, 143, 86, 0.16);
  color: var(--onb-accent-soft);
}
.onb-hot-pill {
  padding: 2px 7px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: rgba(216, 173, 123, 0.2);
  color: var(--onb-accent-soft);
}

.onb-os-banner {
  margin-top: 4px;
  padding: 11px 13px;
  border-radius: 12px;
  border: 1px solid rgba(107, 168, 137, 0.35);
  background: rgba(107, 168, 137, 0.1);
  color: #7CC09D;
  font-size: 12.5px;
  display: flex;
  align-items: center;
  gap: 9px;
}
.onb-root:not([data-scheme="dark"]) .onb-os-banner { color: #2B6B4D; }
.onb-os-banner svg { flex: none; }

/* Sticky Footer Inside Modal */
.onb-modal-foot {
  padding: 14px 24px 18px;
  border-top: 1px solid var(--onb-line);
  background: color-mix(in oklab, var(--onb-card) 92%, transparent);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: sticky;
  bottom: 0;
}
.onb-btn-back {
  min-height: 46px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--onb-line);
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 550;
  color: var(--onb-ink2);
  cursor: pointer;
}
.onb-btn-back:hover { color: var(--onb-ink); border-color: var(--onb-ink2); }
.onb-btn-next {
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  border: 1px solid rgba(216, 173, 123, 0.65);
  background: linear-gradient(135deg, #D8AD7B 0%, #C48F56 100%);
  color: #0A0A09;
  font-size: 14.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 10px 26px -10px rgba(196, 143, 86, 0.7);
  transition: transform 0.2s, opacity 0.2s;
}
.onb-btn-next:disabled { opacity: 0.38; cursor: not-allowed; box-shadow: none; }
.onb-btn-next:not(:disabled):hover { transform: translateY(-1px); }

/* Minimalist Final Thank-You State */
.onb-thanks {
  padding: clamp(36px, 7vw, 56px) clamp(20px, 5vw, 36px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  animation: onbFade 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.onb-thanks-ico {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(196, 143, 86, 0.14);
  border: 1px solid rgba(216, 173, 123, 0.42);
  color: var(--onb-accent-soft);
  box-shadow: 0 12px 32px -12px rgba(196, 143, 86, 0.45);
  margin-bottom: 4px;
}
.onb-root:not([data-scheme="dark"]) .onb-thanks-ico { color: #8C6438; }
.onb-thanks-pill {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: color-mix(in oklab, var(--onb-accent) 12%, transparent);
  border: 1px solid rgba(216, 173, 123, 0.28);
  color: var(--onb-accent-soft);
}
.onb-root:not([data-scheme="dark"]) .onb-thanks-pill { color: #7D5327; }
.onb-thanks-h1 {
  margin: 0;
  font-size: clamp(24px, 4.5vw, 30px);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.15;
}
.onb-thanks-p {
  margin: 0;
  max-width: 40ch;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--onb-ink2);
}
.onb-thanks-p strong { color: var(--onb-ink); font-weight: 600; }
.onb-notice {
  width: 100%;
  text-align: left;
  padding: 11px 13px;
  border-radius: 12px;
  border: 1px solid var(--onb-line);
  background: var(--onb-surface);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: var(--onb-ink2);
}
.onb-notice p { margin: 0; }
.onb-thanks-wa {
  margin-top: 8px;
  min-height: 50px;
  padding: 0 26px;
  border-radius: 999px;
  border: 0;
  background: #25D366;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  box-shadow: 0 12px 28px -8px rgba(37, 211, 102, 0.55);
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
}
.onb-thanks-wa:hover {
  background: #1EBE5D;
  transform: translateY(-1px);
  box-shadow: 0 14px 32px -6px rgba(37, 211, 102, 0.68);
}

@media (max-width: 600px) {
  .onb-shell {
    padding: 0;
    align-items: stretch;
  }
  .onb-modal {
    max-width: none;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
    min-height: calc(100dvh - 60px);
    box-shadow: none;
  }
  .onb-modal-meta { padding: 16px 18px 0; }
  .onb-step-body { padding: 16px 18px 24px; flex: 1; }
  .onb-modal-foot { padding: 12px 18px 16px; }
  .onb-thanks { flex: 1; justify-content: center; }
  .onb-thanks-wa { width: 100%; max-width: 320px; }
  .onb-btn-next { flex: 1; }
}
`;
