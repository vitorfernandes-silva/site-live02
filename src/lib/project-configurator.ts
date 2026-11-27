export type PlatformId =
  | "shopify"
  | "nuvemshop"
  | "tray"
  | "wix"
  | "outra"
  | "lancamento";

export type RevenueBandId =
  | "ate-30k"
  | "30k-80k"
  | "80k-200k"
  | "200k-500k"
  | "acima-500k";

export type ChallengeId =
  | "atrair-clientes"
  | "criativos-fracos"
  | "baixa-conversao"
  | "pouca-recompra"
  | "sem-clareza";

export type PillarId = "trafego" | "criativos" | "cro" | "crm" | "growth";

export type AddonId =
  | "creator-tiktok"
  | "ugc-curadoria"
  | "lancamento-colecao"
  | "setup-tracking-erp";

export type MaturityStageId = "estruturacao" | "tracao" | "escala" | "expansao";

export interface PlatformOption {
  id: PlatformId;
  label: string;
}

export interface RevenueBandOption {
  id: RevenueBandId;
  label: string;
  hint: string;
  score: number;
}

export interface ChallengeOption {
  id: ChallengeId;
  title: string;
  subtitle: string;
}

export interface PillarOption {
  id: PillarId;
  title: string;
  shortDesc: string;
  color: string;
}

export interface AddonOption {
  id: AddonId;
  title: string;
  shortDesc: string;
  badge?: string;
}

export interface MaturityStageConfig {
  id: MaturityStageId;
  index: number;
  name: string;
  tagline: string;
  description: string;
  nextStep: string;
  idealFor: string[];
}

export interface OnboardingState {
  brandName: string;
  siteOrInstagram: string;
  platform: PlatformId | "";
  revenueBand: RevenueBandId | "";
  challenges: ChallengeId[];
  pillars: PillarId[];
  addons: AddonId[];
  contactName: string;
  whatsapp: string;
  email: string;
  notes: string;
}

export interface OnboardingEvaluation {
  maturityStage: MaturityStageConfig;
  idealForTags: string[];
  insight: string;
  selectedPillars: PillarOption[];
  selectedAddons: AddonOption[];
  selectedChallenges: ChallengeOption[];
  revenueBand?: RevenueBandOption;
  platform?: PlatformOption;
}

export interface OnboardingBriefingPayload {
  protocol: string;
  submittedAt: string;
  brand: {
    brandName: string;
    siteOrInstagram: string;
    platform: string;
    revenueBand: string;
  };
  contact: {
    name: string;
    whatsapp: string;
    email: string;
    notes: string;
  };
  configuration: {
    challenges: string[];
    pillars: { id: PillarId; title: string }[];
    addons: { id: AddonId; title: string }[];
    maturityStage: {
      id: MaturityStageId;
      name: string;
      tagline: string;
    };
    idealForTags: string[];
    insight: string;
  };
}

export const PLATFORMS: PlatformOption[] = [
  { id: "shopify", label: "Shopify" },
  { id: "nuvemshop", label: "Nuvemshop" },
  { id: "tray", label: "Tray" },
  { id: "wix", label: "Wix" },
  { id: "outra", label: "Outra plataforma" },
  { id: "lancamento", label: "Ainda vou lançar" },
];

export const REVENUE_BANDS: RevenueBandOption[] = [
  {
    id: "ate-30k",
    label: "Até R$ 30 mil / mês",
    hint: "Iniciando ou estruturando o canal online",
    score: 0,
  },
  {
    id: "30k-80k",
    label: "R$ 30 mil a R$ 80 mil / mês",
    hint: "Já vende com recorrência e busca previsibilidade",
    score: 1,
  },
  {
    id: "80k-200k",
    label: "R$ 80 mil a R$ 200 mil / mês",
    hint: "Operação validada pronta para escalar",
    score: 2,
  },
  {
    id: "200k-500k",
    label: "R$ 200 mil a R$ 500 mil / mês",
    hint: "Marca em expansão focada em margem e LTV",
    score: 3,
  },
  {
    id: "acima-500k",
    label: "Acima de R$ 500 mil / mês",
    hint: "Operação madura para escala multicanal",
    score: 4,
  },
];

export const CHALLENGES: ChallengeOption[] = [
  {
    id: "atrair-clientes",
    title: "Custo alto para atrair compradoras",
    subtitle: "ROAS instável, CAC alto ou dependência de promoções",
  },
  {
    id: "criativos-fracos",
    title: "Criativos que não convertem no feed",
    subtitle: "Falta de vídeos e anúncios que valorizem caimento e estilo",
  },
  {
    id: "baixa-conversao",
    title: "Visitas que não viram pedidos pagos",
    subtitle: "Atritos na vitrine, página de produto ou checkout",
  },
  {
    id: "pouca-recompra",
    title: "Clientes compram 1 vez e não voltam",
    subtitle: "Falta de fluxos de WhatsApp, e-mail e ações de base VIP",
  },
  {
    id: "sem-clareza",
    title: "Falta de previsibilidade e margem",
    subtitle: "Lançamentos sem meta clara ou pouca visão do lucro real",
  },
];

export const PILLARS: PillarOption[] = [
  {
    id: "trafego",
    title: "Gestão de Tráfego Pago",
    shortDesc: "Campanhas no Meta & Google Ads guiadas por curva ABC de peças.",
    color: "#D8AD7B",
  },
  {
    id: "criativos",
    title: "Criativos de Alta Conversão",
    shortDesc: "Direção criativa de moda com foco em caimento, tecido e desejo.",
    color: "#CF7A86",
  },
  {
    id: "cro",
    title: "Otimização de Conversões (CRO)",
    shortDesc: "Melhorias em vitrine, página de produto, velocidade e checkout.",
    color: "#6BA889",
  },
  {
    id: "crm",
    title: "Fidelização e CRM",
    shortDesc: "Fluxos de WhatsApp, e-mail e base VIP para girar estoque sem mídia.",
    color: "#D9824C",
  },
  {
    id: "growth",
    title: "Gestão de Crescimento",
    shortDesc: "Metas semanais, lançamentos, ticket médio e margem líquida.",
    color: "#7C9EC4",
  },
];

export const ADDONS: AddonOption[] = [
  {
    id: "creator-tiktok",
    title: "Creator Economy & TikTok Shop",
    shortDesc: "Programa de afiliadas, embaixadoras e vendas recorrentes no TikTok Shop.",
    badge: "Em alta",
  },
  {
    id: "ugc-curadoria",
    title: "Curadoria Creators & UGC",
    shortDesc: "Seleção de criadoras, roteiros e direção para gerar UGC autêntico.",
  },
  {
    id: "lancamento-colecao",
    title: "Sprint de Lançamento de Coleção",
    shortDesc: "Pré-aquecimento VIP, mídia e vitrine alinhados para esgotar drops.",
  },
  {
    id: "setup-tracking-erp",
    title: "Tracking, Plataforma & BI",
    shortDesc: "Pixel, API de Conversões e integração limpa com ERP e JAGWAR OS.",
  },
];

export const MATURITY_STAGES: MaturityStageConfig[] = [
  {
    id: "estruturacao",
    index: 0,
    name: "Estruturação da Operação",
    tagline: "Organizar a fundação antes de acelerar investimento",
    description:
      "Momento ideal para alinhar sua loja, rastreamento e primeiras campanhas ou criativos — evitando desperdício de verba enquanto construímos base no JAGWAR OS.",
    nextStep:
      "Validar peças campeãs por curva ABC, organizar os criativos de entrada e acompanhar as primeiras entregas no JAGWAR OS gratuito.",
    idealFor: ["Organização de base", "Curva ABC inicial", "JAGWAR OS gratuito"],
  },
  {
    id: "tracao",
    index: 1,
    name: "Tração & Conversão",
    tagline: "Transformar visitantes qualificados em receita previsível",
    description:
      "Sua marca já tem validação de produto e agora precisa conectar tráfego qualificado, criativos que param o scroll e experiência de compra fluida para elevar o ROAS.",
    nextStep:
      "Implantar cadência semanal de testes criativos aliada a ajustes de página de produto, oferta e checkout.",
    idealFor: ["Aumento de ROAS", "Testes criativos semanais", "Destravar conversão"],
  },
  {
    id: "escala",
    index: 2,
    name: "Escala Previsível",
    tagline: "Crescer faturamento protegendo margem líquida e LTV",
    description:
      "Estágio ideal para orquestrar aquisição, recompra em base e metas semanais de crescimento — girando novas coleções com menos dependência de mídia paga cara.",
    nextStep:
      "Integrar aquisição contínua com fluxos de WhatsApp/e-mail e calendário de lançamentos acompanhado ao vivo no JAGWAR OS.",
    idealFor: ["Recompra & LTV", "Margem por coleção", "Metas semanais"],
  },
  {
    id: "expansao",
    index: 3,
    name: "Expansão Omnichannel & Creator Economy",
    tagline: "Ecossistema completo: loja, criadoras, TikTok Shop e marketplaces",
    description:
      "Arquitetura desenhada para marcas prontas para dominar múltiplos canais — unindo performance full-funnel, programa de afiliadas, embaixadoras e operação no TikTok Shop.",
    nextStep:
      "Ativar sua rede de criadoras e embaixadoras junto à operação de mídia, com aprovações em 1 clique e leitura de ROI no JAGWAR OS.",
    idealFor: ["Creator Economy", "TikTok Shop ativo", "Escala multicanal"],
  },
];

export function evaluateOnboarding(state: OnboardingState): OnboardingEvaluation {
  const revenueBand = REVENUE_BANDS.find((r) => r.id === state.revenueBand);
  const platform = PLATFORMS.find((p) => p.id === state.platform);
  const selectedPillars = PILLARS.filter((p) => state.pillars.includes(p.id));
  const selectedAddons = ADDONS.filter((a) => state.addons.includes(a.id));
  const selectedChallenges = CHALLENGES.filter((c) => state.challenges.includes(c.id));

  const revScore = revenueBand?.score ?? 1;
  const hasCreatorAddon =
    state.addons.includes("creator-tiktok") || state.addons.includes("ugc-curadoria");
  const hasGrowth = state.pillars.includes("growth");
  const hasCrm = state.pillars.includes("crm");
  const hasCro = state.pillars.includes("cro");
  const hasCriativos = state.pillars.includes("criativos");
  const hasTrafego = state.pillars.includes("trafego");
  const pillarCount = selectedPillars.length;

  let stageIndex = 1;

  if (state.platform === "lancamento" && revScore === 0 && pillarCount <= 2) {
    stageIndex = 0;
  } else if (
    (hasCreatorAddon && (revScore >= 2 || pillarCount >= 3)) ||
    (revScore >= 3 && pillarCount >= 3) ||
    pillarCount >= 5
  ) {
    stageIndex = 3;
  } else if (
    revScore >= 2 ||
    pillarCount >= 3 ||
    (hasGrowth && (hasCrm || hasTrafego))
  ) {
    stageIndex = 2;
  } else if (revScore === 0 && pillarCount <= 2 && !hasCreatorAddon) {
    stageIndex = 0;
  } else {
    stageIndex = 1;
  }

  const maturityStage = MATURITY_STAGES[stageIndex];

  const tags = new Set<string>(maturityStage.idealFor);
  if (platform) tags.add(platform.label);
  if (state.addons.includes("creator-tiktok")) tags.add("TikTok Shop");
  if (state.addons.includes("ugc-curadoria")) tags.add("Curadoria UGC");
  if (state.addons.includes("lancamento-colecao")) tags.add("Drops & Coleções");
  if (state.addons.includes("setup-tracking-erp")) tags.add("Tracking & BI");
  if (hasCrm) tags.add("Base VIP & Recompra");
  tags.add("JAGWAR OS gratuito");

  const idealForTags = Array.from(tags).slice(0, 6);

  let insight =
    "Sua seleção equilibra execução prática com visibilidade de metas e aprovações em tempo real no JAGWAR OS gratuito.";

  if (state.challenges.includes("baixa-conversao") && !hasCro) {
    insight =
      "Você apontou baixa conversão na loja como gargalo. Na nossa reunião de diagnóstico, vamos priorizar ajustes de vitrine e checkout (CRO) junto aos pilares escolhidos.";
  } else if (state.challenges.includes("pouca-recompra") && !hasCrm) {
    insight =
      "Como recompra está entre seus desafios, incluir réguas simples de WhatsApp e pós-compra vai aliviar rapidamente o custo de aquisição na mídia paga.";
  } else if (state.addons.includes("creator-tiktok") && !hasCriativos) {
    insight =
      "Ao ativar Creator Economy & TikTok Shop, os próprios vídeos das afiliadas podem alimentar seus melhores anúncios pagos e multiplicar o alcance da coleção.";
  } else if (hasTrafego && hasCriativos && hasCro) {
    insight =
      "Combinação de alto impacto: alinhar tráfego, criativos de moda e CRO evita desperdiçar cliques qualificados e acelera o retorno já nas primeiras semanas.";
  } else if (hasCreatorAddon) {
    insight =
      "Sua configuração conecta a marca diretamente à Creator Economy — gerando demanda orgânica, prova social e vendas recorrentes com aprovações centralizadas no JAGWAR OS.";
  }

  return {
    maturityStage,
    idealForTags,
    insight,
    selectedPillars,
    selectedAddons,
    selectedChallenges,
    revenueBand,
    platform,
  };
}

export function createBriefingMeta(): { protocol: string; submittedAt: string } {
  const now = new Date();
  const msPart = String(now.getTime()).slice(-4);
  const protocol = `JGW-${msPart}`;
  const submittedAt = now.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return { protocol, submittedAt };
}

export function formatBriefingSummaryText(payload: OnboardingBriefingPayload): string {
  const lines: string[] = [
    `JAGWAR — DIAGNÓSTICO DE PROJETO (${payload.protocol})`,
    `Data: ${payload.submittedAt}`,
    ``,
    `MARCA & CONTATO`,
    `Marca: ${payload.brand.brandName}`,
    `Plataforma: ${payload.brand.platform}`,
    `Faturamento: ${payload.brand.revenueBand}`,
    `Site / Instagram: ${payload.brand.siteOrInstagram || "Não informado"}`,
    `Responsável: ${payload.contact.name}`,
    `WhatsApp: ${payload.contact.whatsapp}`,
    `E-mail: ${payload.contact.email}`,
    ``,
    `MOMENTO DE NEGÓCIO IDEAL`,
    `${payload.configuration.maturityStage.name} — ${payload.configuration.maturityStage.tagline}`,
    ``,
    `DESAFIOS PRIORITÁRIOS`,
    ...payload.configuration.challenges.map((c) => `- ${c}`),
    ``,
    `PILARES ESCOLHIDOS`,
    ...payload.configuration.pillars.map((p) => `- ${p.title}`),
  ];

  if (payload.configuration.addons.length > 0) {
    lines.push(``);
    lines.push(`ACELERADORES`);
    payload.configuration.addons.forEach((a) => lines.push(`- ${a.title}`));
  }

  lines.push(``);
  lines.push(`JAGWAR OS: Incluso gratuitamente`);

  if (payload.contact.notes) {
    lines.push(``);
    lines.push(`OBSERVAÇÕES`);
    lines.push(payload.contact.notes);
  }

  return lines.join("\n");
}
