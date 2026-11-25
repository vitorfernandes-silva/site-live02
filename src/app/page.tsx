import React from "react";
import {
  BarChart3,
  Check,
  Gem,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { Header } from "@/components/Header";
import OrbitDeliveryHero from "@/components/ui/orbit-delivery-hero";
import { JagwarLogo } from "@/components/JagwarLogo";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { ScrollReveal } from "@/components/ScrollReveal";

const PHILOSOPHY_PILLARS = [
  {
    title: "Performance Real",
    description:
      "Foco absoluto em ROAS, margem de contribuição e lucro líquido no caixa, não em métricas de vaidade.",
    Icon: BarChart3,
  },
  {
    title: "Estratégia Inteligente",
    description:
      "Decisões guiadas por dados reais da sua loja, comportamento de compra e sazonalidade de coleção.",
    Icon: Gem,
  },
  {
    title: "Crescimento Sustentável",
    description:
      "Escala previsível que protege o posicionamento e o valor percebido da sua marca.",
    Icon: Zap,
  },
  {
    title: "Parceria de Longo Prazo",
    description:
      "Atuação próxima, transparente e comprometida com a maturidade do seu e-commerce.",
    Icon: ShieldCheck,
  },
];

const INTEGRATED_SOLUTIONS = [
  {
    number: "01",
    title: "Gestão de Tráfego Pago (Meta Ads & Google Ads)",
    description:
      "Campanhas estruturadas por etapa de funil e curva ABC de produtos. Capturamos demanda qualificada, escalamos peças-desejo e mantemos sua marca presente no momento exato da decisão de compra.",
  },
  {
    number: "02",
    title: "Produção de Criativos de Alta Conversão",
    description:
      "Direção criativa pensada especificamente para o varejo de moda. Desenvolvemos anúncios em vídeo, estáticos e formatos nativos que comunicam caimento, tecido e estilo nos primeiros 3 segundos.",
  },
  {
    number: "03",
    title: "CRO (Otimização da Taxa de Conversão)",
    description:
      "De nada adianta levar tráfego qualificado para uma loja com atritos. Analisamos páginas de produto, vitrines, velocidade, checkout e oferta para transformar mais visitantes em pedidos pagos.",
  },
  {
    number: "04",
    title: "CRM & Retenção de Clientes",
    description:
      "O lucro real do e-commerce mora na recompra. Estruturamos fluxos automatizados de WhatsApp, e-mail e campanhas de base para aumentar o LTV (Lifetime Value) e girar estoque novo sem depender apenas de mídia paga.",
  },
  {
    number: "05",
    title: "Gestão de Growth",
    description:
      "Visão macro do negócio: acompanhamento de metas, planejamento de lançamentos de coleção, análise de ticket médio, margem e construção de planos de ação semanais para destravar novos patamares de receita.",
  },
];

const ECOSYSTEM_TAGS = [
  "Shopify",
  "Nuvemshop",
  "Meta Ads",
  "Google Ads",
  "CRM & Automação",
  "BI & Dados",
];

const FOR_YOU_ITEMS = [
  'Você possui um e-commerce de moda feminina (ou vestuário/acessórios) com produto validado e deseja escalar com consistência.',
  'Busca uma assessoria estratégica que olhe para lucro, conversão e retenção, e não apenas para o botão "impulsionar".',
  "Valoriza estética refinada, comunicação transparente e acompanhamento próximo de indicadores.",
];

const NOT_FOR_YOU_ITEMS = [
  "Você procura milagres da noite para o dia sem estrutura mínima de estoque ou atendimento.",
  'Quer apenas um "apertador de botões" barato que não questiona a oferta nem a experiência do seu site.',
];

const PROCESS_STEPS = [
  {
    step: "01",
    label: "Passo 01",
    title: "Diagnóstico Profundo",
    description:
      "Auditamos suas contas de anúncios, métricas do e-commerce, criativos atuais e pontos de fuga no checkout.",
  },
  {
    step: "02",
    label: "Passo 02",
    title: "Plano de Ação & Arquitetura",
    description:
      "Desenhamos a estratégia personalizada de tráfego, criativos, CRO e CRM para os próximos 90 dias.",
  },
  {
    step: "03",
    label: "Passo 03",
    title: "Implementação & Tração",
    description:
      "Colocamos as campanhas, novos criativos e otimizações no ar com rastreamento preciso de dados.",
  },
  {
    step: "04",
    label: "Passo 04",
    title: "Otimização Contínua & Escala",
    description:
      "Acompanhamento semanal de KPIs, testes A/B constantes e realocação de verba nos produtos e públicos mais lucrativos.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A09] text-[#F5F0E8]">
      {/* 1. HEADER */}
      <Header />

      <main className="flex-1 pt-20">
        {/* 2. HERO SECTION — Interactive 3D Orbit Hero (JAGWAR Palette) */}
        <section id="inicio" className="scroll-mt-20 relative bg-[#0A0A09]">
          <OrbitDeliveryHero
            theme="dark"
            showHeader={false}
            ctaTargetId="diagnostico"
          />
        </section>

        {/* 3. O CENÁRIO ATUAL */}
        <section className="border-y border-[rgba(239,228,212,0.15)] bg-[#141312] py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <p className="font-display text-[11px] sm:text-xs font-medium uppercase tracking-[0.24em] text-[#C48F56]">
                    O GARGALO DO VAREJO DIGITAL
                  </p>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[36px] font-light leading-[1.2] tracking-[-0.015em] text-[#F5F0E8]">
                    Ter uma coleção impecável não basta se o seu tráfego não
                    converte.
                  </h2>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between gap-8 lg:border-l lg:border-[rgba(239,228,212,0.15)] lg:pl-12">
                  <p className="text-base sm:text-[17px] leading-relaxed text-[#A39B8F]">
                    A maioria das marcas de moda feminina sofre com o mesmo
                    ciclo: investem cada vez mais em anúncios genéricos, atraem
                    curiosos que não compram, perdem margem com descontos
                    excessivos e dependem de picos sazonais para fechar o mês.
                  </p>

                  <blockquote className="border-l-2 border-[#C48F56] bg-[#0A0A09]/55 px-6 py-5 text-sm sm:text-base leading-relaxed text-[#F5F0E8]">
                    Na moda, vender exige equilíbrio entre{" "}
                    <span className="font-medium text-[#EFE4D4]">
                      estética editorial
                    </span>{" "}
                    e{" "}
                    <span className="font-medium text-[#EFE4D4]">
                      precisão matemática
                    </span>
                    . Sem o alinhamento entre criativo, tráfego e experiência de
                    compra na loja, escalar apenas multiplica o prejuízo.
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 4. A FILOSOFIA JAGWAR */}
        <section
          id="metodo"
          className="scroll-mt-20 bg-[#0A0A09] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="max-w-3xl">
                <p className="font-display text-[11px] sm:text-xs font-medium uppercase tracking-[0.24em] text-[#C48F56]">
                  PRECISÃO CIRÚRGICA
                </p>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[40px] font-light leading-[1.18] tracking-[-0.015em] text-[#F5F0E8]">
                  Não corremos atrás de cliques. Damos o bote certo na audiência
                  qualificada.
                </h2>
                <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-[#A39B8F]">
                  Assim como o jaguar — predador silencioso, estratégico e letal
                  na precisão —, a JAGWAR atua no núcleo da sua operação
                  digital. Substituímos o &ldquo;achismo&rdquo; das agências
                  tradicionais por um ecossistema integrado de aquisição,
                  retenção e conversão.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <div className="mt-14 grid grid-cols-1 gap-px bg-[rgba(239,228,212,0.15)] border border-[rgba(239,228,212,0.15)] md:grid-cols-2">
                {PHILOSOPHY_PILLARS.map(({ title, description, Icon }) => (
                  <article
                    key={title}
                    className="group bg-[#141312] p-8 sm:p-10 transition-colors duration-300 hover:bg-[#191715]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-[#26231F] bg-[#0A0A09] text-[#C48F56] transition-colors duration-300 group-hover:border-[#C48F56]/50">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-6 font-display text-lg sm:text-xl font-medium text-[#F5F0E8]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#A39B8F]">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. SOLUÇÕES INTEGRADAS (EDITORIAL LIGHT CONTRAST SECTION) */}
        <section
          id="servicos"
          className="scroll-mt-20 border-y border-[#463F32]/20 bg-[#EFE4D4] py-20 sm:py-28 text-[#0A0A09]"
        >
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="grid grid-cols-1 gap-8 pb-12 border-b border-[#463F32]/20 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p className="font-display text-[11px] sm:text-xs font-medium uppercase tracking-[0.24em] text-[#463F32]">
                    O QUE FAZEMOS
                  </p>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[40px] font-normal leading-[1.18] tracking-[-0.015em] text-[#0A0A09]">
                    Uma estrutura completa para escalar seu e-commerce de ponta
                    a ponta.
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-sm sm:text-base leading-relaxed text-[#463F32]">
                    Atuamos nas cinco alavancas que determinam o faturamento e a
                    lucratividade de uma marca de moda online:
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="divide-y divide-[#463F32]/20">
              {INTEGRATED_SOLUTIONS.map((item) => (
                <ScrollReveal key={item.number}>
                  <article className="grid grid-cols-1 gap-4 py-8 sm:py-10 md:grid-cols-12 md:gap-8 items-start">
                    <div className="md:col-span-2 flex items-center gap-3">
                      <span className="font-display text-2xl sm:text-3xl font-medium tracking-wider text-[#C48F56]">
                        {item.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden md:inline-block h-px flex-1 bg-[#463F32]/20"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="font-display text-lg sm:text-xl font-medium leading-snug text-[#0A0A09]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-sm sm:text-[15px] leading-relaxed text-[#463F32]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. DIFERENCIAL COMPETITIVO */}
        <section
          id="ecossistema"
          className="scroll-mt-20 bg-[#0A0A09] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="font-display text-[11px] sm:text-xs font-medium uppercase tracking-[0.24em] text-[#C48F56]">
                    OPERAÇÃO REAL, NÃO APENAS TEORIA
                  </p>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[38px] font-light leading-[1.2] tracking-[-0.015em] text-[#F5F0E8]">
                    Vivemos a rotina do e-commerce de moda todos os dias.
                  </h2>
                  <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#A39B8F]">
                    Não somos uma agência generalista que atende dezenas de
                    nichos diferentes com fórmulas prontas. Nossa metodologia é
                    testada e validada diariamente no campo de batalha do varejo
                    de moda feminina — dominando desde a dinâmica de lançamentos
                    e reposição de grade até a integração entre plataformas
                    (Shopify, Nuvemshop), ERP e automações de atendimento.
                  </p>
                </div>

                <div className="lg:col-span-5 lg:border-l lg:border-[rgba(239,228,212,0.15)] lg:pl-12">
                  <p className="font-display text-[11px] uppercase tracking-[0.22em] text-[#A39B8F] mb-5">
                    ECOSSISTEMA INTEGRADO
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {ECOSYSTEM_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-sm border border-[#26231F] bg-[#141312] px-4 py-2.5 font-display text-xs uppercase tracking-[0.14em] text-[#EFE4D4] transition-colors duration-200 hover:border-[#C48F56]/50 hover:text-[#C48F56]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 7. PARA QUEM É A JAGWAR */}
        <section className="border-y border-[rgba(239,228,212,0.15)] bg-[#141312] py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-light leading-[1.2] tracking-[-0.015em] text-[#F5F0E8]">
                  A JAGWAR foi desenhada para marcas que buscam maturidade
                  digital.
                </h2>
              </div>

              <div className="mt-12 grid grid-cols-1 border border-[#26231F] bg-[#0A0A09] md:grid-cols-2">
                {/* Coluna 1: É para você se */}
                <div className="p-8 sm:p-10 md:border-r md:border-[rgba(239,228,212,0.15)]">
                  <div className="flex items-center justify-between border-b border-[rgba(239,228,212,0.12)] pb-5">
                    <h3 className="font-display text-sm sm:text-base font-medium uppercase tracking-[0.18em] text-[#C48F56]">
                      É para você se:
                    </h3>
                    <span className="h-2 w-2 rounded-full bg-[#C48F56]" />
                  </div>

                  <ul className="mt-7 space-y-6">
                    {FOR_YOU_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-[#C48F56]/40 bg-[#C48F56]/10 text-[#C48F56]">
                          <Check className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </span>
                        <span className="text-sm sm:text-[15px] leading-relaxed text-[#F5F0E8]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coluna 2: Não é para você se */}
                <div className="border-t border-[rgba(239,228,212,0.15)] bg-[#0A0A09]/70 p-8 sm:p-10 md:border-t-0">
                  <div className="flex items-center justify-between border-b border-[rgba(239,228,212,0.1)] pb-5">
                    <h3 className="font-display text-sm sm:text-base font-medium uppercase tracking-[0.18em] text-[#A39B8F]">
                      Não é para você se:
                    </h3>
                    <span className="h-2 w-2 rounded-full bg-[#463F32]" />
                  </div>

                  <ul className="mt-7 space-y-6">
                    {NOT_FOR_YOU_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-[#26231F] bg-[#141312] text-[#A39B8F]">
                          <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </span>
                        <span className="text-sm sm:text-[15px] leading-relaxed text-[#A39B8F]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 8. COMO FUNCIONA O NOSSO PROCESSO */}
        <section className="bg-[#0A0A09] py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="max-w-2xl">
                <p className="font-display text-[11px] sm:text-xs font-medium uppercase tracking-[0.24em] text-[#C48F56]">
                  ROADMAP DE EXECUÇÃO
                </p>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[40px] font-light leading-[1.18] tracking-[-0.015em] text-[#F5F0E8]">
                  Do diagnóstico à escala em 4 etapas claras.
                </h2>
              </div>

              <div className="relative mt-14">
                {/* Horizontal connector line on desktop */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute left-0 right-0 top-5 h-px bg-[#463F32]/70"
                />

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                  {PROCESS_STEPS.map((item) => (
                    <article
                      key={item.step}
                      className="relative flex flex-col border-l border-[#463F32]/60 pl-6 lg:border-l-0 lg:pl-0"
                    >
                      <div className="relative z-10 flex items-center gap-3 lg:mb-6">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#C48F56] bg-[#0A0A09] font-display text-xs font-medium tracking-widest text-[#C48F56]">
                          {item.step}
                        </span>
                        <span className="font-display text-[11px] uppercase tracking-[0.22em] text-[#A39B8F] lg:hidden">
                          {item.label}
                        </span>
                      </div>

                      <span className="hidden lg:block font-display text-[10px] uppercase tracking-[0.24em] text-[#C48F56]">
                        {item.label}
                      </span>

                      <h3 className="mt-3 lg:mt-2 font-display text-lg font-medium leading-snug text-[#F5F0E8]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[#A39B8F]">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 9. FORMULÁRIO DE CONVERSÃO */}
        <section
          id="diagnostico"
          className="scroll-mt-20 border-t border-[rgba(239,228,212,0.15)] bg-[#141312] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
            <ScrollReveal>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
                {/* Left Pitch Column */}
                <div className="lg:col-span-5">
                  <p className="font-display text-[11px] sm:text-xs font-medium uppercase tracking-[0.24em] text-[#C48F56]">
                    PRÓXIMO PASSO
                  </p>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[38px] font-light leading-[1.18] tracking-[-0.015em] text-[#F5F0E8]">
                    Pronto para elevar o padrão de performance da sua marca?
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[#A39B8F]">
                    Preencha os dados abaixo. Nossa equipe analisará o cenário
                    atual do seu e-commerce antes da nossa reunião para
                    apresentar oportunidades reais de crescimento.
                  </p>

                  <div className="mt-10 border-t border-[rgba(239,228,212,0.12)] pt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C48F56] shrink-0" />
                      <p className="text-xs sm:text-sm leading-relaxed text-[#A39B8F]">
                        Leitura prévia de anúncios ativos, posicionamento e
                        estrutura de loja.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C48F56] shrink-0" />
                      <p className="text-xs sm:text-sm leading-relaxed text-[#A39B8F]">
                        Reunião estratégica focada em margem, CAC, LTV e escala
                        previsível.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Highlighted Form Card */}
                <div className="lg:col-span-7">
                  <div className="rounded-sm border border-[#C48F56]/40 bg-[#141312] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <DiagnosticForm />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* 10. FOOTER */}
      <footer className="border-t border-[rgba(239,228,212,0.15)] bg-[#0A0A09] py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between pb-10 border-b border-[rgba(239,228,212,0.1)]">
            <div>
              <JagwarLogo size="md" />
              <p className="mt-4 text-sm text-[#A39B8F]">
                Mais performance para sua marca crescer mais.
              </p>
            </div>

            <nav
              aria-label="Links rápidos do rodapé"
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <a
                href="#inicio"
                className="font-display text-xs uppercase tracking-[0.18em] text-[#A39B8F] transition-colors hover:text-[#C48F56]"
              >
                Início
              </a>
              <span
                aria-hidden="true"
                className="hidden sm:inline-block h-3 w-px bg-[rgba(239,228,212,0.15)]"
              />
              <a
                href="#servicos"
                className="font-display text-xs uppercase tracking-[0.18em] text-[#A39B8F] transition-colors hover:text-[#C48F56]"
              >
                Serviços
              </a>
              <span
                aria-hidden="true"
                className="hidden sm:inline-block h-3 w-px bg-[rgba(239,228,212,0.15)]"
              />
              <a
                href="#metodo"
                className="font-display text-xs uppercase tracking-[0.18em] text-[#A39B8F] transition-colors hover:text-[#C48F56]"
              >
                Método
              </a>
              <span
                aria-hidden="true"
                className="hidden sm:inline-block h-3 w-px bg-[rgba(239,228,212,0.15)]"
              />
              <a
                href="#diagnostico"
                className="font-display text-xs uppercase tracking-[0.18em] text-[#C48F56] transition-colors hover:text-[#D4A16A]"
              >
                Agendar Diagnóstico
              </a>
            </nav>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A39B8F]/80">
            <p>
              © 2026 JAGWAR Performance &amp; Growth. Todos os direitos
              reservados.
            </p>
            <p className="font-display text-[10px] uppercase tracking-[0.22em] text-[#463F32]">
              E-COMMERCE DE MODA FEMININA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
