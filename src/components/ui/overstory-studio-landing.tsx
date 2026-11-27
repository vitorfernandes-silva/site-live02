"use client"

// Overstory Studio Landing: a complete landing page for a design and
// engineering studio that works with SaaS startups. The overstory is the top
// layer of a forest, the leaves that meet the sky, and the whole page is told
// from underneath it.
//
// The hero opens on a ring of trees seen from below, closing in around a patch
// of sky as the headline rises. The canopy is generated here, not a photo: a
// seeded sky with clouds and four depth layers of branches and backlit leaves,
// drawn once to canvas. Because the layers are real depth, scrolling lifts you
// up through them (the near leaves fly past first, the far ones last) until
// you break out into open sky, which is where the page continues. Move the
// pointer and the layers shift with parallax; click the sky and a gust shakes
// the branches loose.
//
// Below it: a manifesto that writes itself in as you read, counters, a service
// index with a cursor preview, a horizontal case-study track, a tree that grows
// through the four stages of the process, quotes in the shade, pricing with a
// monthly / quarterly switch, questions, and a finale that drops you back down
// into the trees before a footer with a wordmark the size of the page.
//
// Scroll is driven by GSAP + ScrollTrigger on CSS sticky stages, so nothing is
// pinned or re-parented. Everything is drawn in this file (canopy, logos,
// product mocks, the tree) and nothing loads at runtime. Requires `gsap`.
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  BadgeDollarSign,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  Clapperboard,
  Crown,
  FlaskConical,
  Gauge,
  Image as ImageIcon,
  LayoutDashboard,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Percent,
  Repeat,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import GlassmorphismCta from "@/components/ui/glassmorphism-cta"
import { WhatsAppIcon, buildWhatsAppUrl } from "@/components/ui/whatsapp-float"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

const useIso = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

export type OvsLink = { label: string; href?: string }

export type OvsMark = "watch" | "slash" | "scribe" | "knot" | "venn" | "leaf"

export type OvsLogo = { name: string; mark?: OvsMark; type?: "sans" | "serif" | "heavy" }

export type OvsStat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }

export type OvsServiceArt = "brand" | "product" | "site" | "code" | "system"

export type OvsService = { title: string; text: string; tags: string[]; time: string; art?: OvsServiceArt }

export type OvsMock = "dashboard" | "chat" | "doc" | "mobile"

export type OvsCase = {
  client: string
  mark?: OvsMark
  kind: string
  title: string
  metric: string
  metricLabel: string
  year: string
  mock?: OvsMock
  image?: string
  badge?: string
  icon?: "affiliates" | "creators" | "os"
  imagePos?: string
  /** Two colours for the card's backdrop. */
  tint?: [string, string]
  href?: string
}

export type OvsStep = { name: string; when: string; title: string; text: string }

export type OvsQuote = { quote: string; name: string; role: string; mark?: OvsMark }

export type OvsPlan = {
  name: string
  /** Monthly price, or the fixed price when `unit` is not "/mo". `null` prints "Custom". */
  price: number | null
  /** Price per month when the quarterly switch is on. */
  quarterly?: number
  unit?: string
  text: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

export type OvsFaq = { q: string; a: string }

export type OvsSeason = "summer" | "autumn" | "blossom"

export interface OverstoryStudioLandingProps {
  brand?: string
  /** In-page links. "#work", "#services", "#process", "#pricing", "#faq" and "#contact" scroll within the page. */
  links?: OvsLink[]
  /** The small pill above the headline. `null` hides it. */
  status?: string | null
  hero?: {
    /** First line of the headline. */
    lead?: string
    /** Phrase inside `lead` highlighted with the brand accent color. */
    highlight?: string
    /** Optional prefix on the second line before the morphing word. */
    line2Lead?: string
    /** Phrase inside `line2Lead` highlighted with the brand accent color. */
    highlight2?: string
    /** The word that changes on the second line. The first one is what the page reads as. */
    words?: string[]
    /** What follows the changing word. */
    tail?: string
    desc?: string
    trusted?: string
    cue?: string
  }
  logos?: OvsLogo[]
  manifesto?: { kicker?: string; text?: string } | null
  stats?: OvsStat[] | null
  services?: { kicker?: string; title?: string; text?: string; items?: OvsService[] } | null
  work?: { kicker?: string; title?: string; items?: OvsCase[]; next?: string } | null
  process?: { kicker?: string; title?: string; steps?: OvsStep[] } | null
  quotes?: OvsQuote[] | null
  pricing?: { kicker?: string; title?: string; text?: string; plans?: OvsPlan[]; quarterlyNote?: string } | null
  faq?: { kicker?: string; title?: string; text?: string; items?: OvsFaq[] } | null
  cta?: { title?: string; text?: string; button?: string } | null
  footer?: { columns?: { title: string; links: OvsLink[] }[]; city?: string; timeZone?: string; note?: string } | null
  email?: string
  currency?: string
  /** Which canopy grows over the page: green summer leaves, autumn amber, or spring blossom. */
  season?: OvsSeason
  /**
   * The canopy photo (any URL or data URI), shot looking straight up with sky in
   * the middle. It is graded for the season and for dusk in canvas. Defaults to
   * the embedded photo; `null` (or a photo that fails to load) grows the
   * generated canopy instead.
   */
  photo?: string | null
  /** Seed for the generated canopy. Change it for a different tree ring. */
  seed?: number
  /** "auto" follows the host's `.dark` class. Dark is the same forest at dusk. */
  theme?: "auto" | "light" | "dark"
  /** Show the daylight / dusk switch in the nav. */
  themeToggle?: boolean
  /** Called by every "book a call" button. Without it they scroll to the contact section. */
  onBook?: (from: string) => void
  /** Called with a valid email from the newsletter. Return (or resolve) `false`, or throw, to show an error. */
  onSubscribe?: (email: string) => unknown
  /** Height of the hero and finale stages. A definite length, so it survives any host layout. */
  height?: string
  className?: string
}

// #region content
const DEFAULT_LINKS = [
  { label: "Serviços", href: "#services" },
  { label: "Criadores", href: "#work" },
  { label: "Próximos passos", href: "#process" },
  { label: "Escopos", href: "#pricing" },
  { label: "Dúvidas", href: "#faq" },
]

const DEFAULT_HERO = {
  lead: "Aceleramos o crescimento de e\u2011commerces",
  highlight: "e\u2011commerces",
  line2Lead: "de moda feminina com",
  highlight2: "de moda feminina",
  words: ["Previsibilidade.", "Escala.", "Margem.", "Lucro."],
  tail: "",
  desc: "Atraímos seus clientes para suas plataformas e otimizamos a jornada de compra de ponta a ponta para comprovar o ROI.",
  cue: "Role para descobrir o método",
}

type OvsPartnerLogo = {
  src: string
  darkSrc?: string
  alt: string
  category: string
  w: number
  h: number
  displayH: number
}

const DEFAULT_PARTNERS: OvsPartnerLogo[] = [
  { src: "/images/logos-marketing-partners/meta-business-partner.png", alt: "Meta Business Partner", category: "Marketing Partner", w: 786, h: 267, displayH: 38 },
  { src: "/images/logos-marketing-partners/tipdilz7wysq-3w7mlZOV5GO03vIfCpUki2.png", alt: "TikTok Marketing Partner", category: "Marketing Partner", w: 1546, h: 393, displayH: 36 },
  { src: "/images/logos-marketing-partners/72feed_1578945c8cd147dd8e7509526bc13816~mv2.png", alt: "TikTok Shop Partner", category: "Marketing Partner", w: 947, h: 263, displayH: 36 },
  { src: "/images/logos-ecommerce-partners/Shopify_Logo.png", darkSrc: "/images/logos-dark/shopify-dark.png", alt: "Shopify", category: "E-commerce Partner", w: 700, h: 180, displayH: 36 },
  { src: "/images/logos-ecommerce-partners/nuvemshop-logo-png_seeklogo-445979.png", alt: "Nuvemshop", category: "E-commerce Partner", w: 320, h: 320, displayH: 108 },
  { src: "/images/logos-ecommerce-partners/logo_tray.webp", alt: "Tray", category: "E-commerce Partner", w: 2400, h: 1260, displayH: 36 },
  { src: "/images/logos-ecommerce-partners/WIX-Logo.png", alt: "Wix", category: "E-commerce Partner", w: 3840, h: 2160, displayH: 26 },
  { src: "/images/logos-ecommerce-partners/Bling_logo_transparent.png", darkSrc: "/images/logos-dark/bling-dark.png", alt: "Bling", category: "E-commerce & ERP", w: 528, h: 257, displayH: 34 },
  { src: "/images/logos-ecommerce-partners/Phibo_ERP_logo_transparent.png", darkSrc: "/images/logos-dark/phibo-dark.png", alt: "Phibo ERP", category: "E-commerce & ERP", w: 977, h: 384, displayH: 34 },
  { src: "/images/logos-marketplaces/mercado-livre-87.png", darkSrc: "/images/logos-dark/mercado-livre-dark.png", alt: "Mercado Livre", category: "Marketplace", w: 948, h: 796, displayH: 50 },
  { src: "/images/logos-marketplaces/Shopee_logo.svg.webp", alt: "Shopee", category: "Marketplace", w: 330, h: 470, displayH: 52 },
  { src: "/images/logos-marketplaces/tiktok-shop-logo-png-scaled.png", darkSrc: "/images/logos-dark/tiktok-shop-dark.png", alt: "TikTok Shop", category: "Marketplace", w: 1474, h: 1600, displayH: 52 },
]

const DEFAULT_SERVICES = [
  { title: "Gestão de Tráfego Pago", art: "brand", time: "Meta & Google Ads", text: "Campanhas estruturadas por etapa de funil e curva ABC de produtos. Capturamos demanda qualificada, escalamos peças-desejo e mantemos sua marca presente no momento exato da decisão de compra.", tags: ["Meta Ads", "Google Ads", "Curva ABC", "Escala por funil"] },
  { title: "Criativos de Alta Conversão", art: "product", time: "Direção criativa", text: "Direção criativa pensada especificamente para o varejo de moda. Desenvolvemos anúncios em vídeo, estáticos e formatos nativos que comunicam caimento, tecido e estilo nos primeiros 3 segundos.", tags: ["Vídeos nativos", "Estáticos", "Caimento & estilo", "Testes criativos"] },
  { title: "Otimização de conversões (CRO)", art: "site", time: "Funil & checkout", text: "De nada adianta levar tráfego qualificado para uma loja com atritos. Analisamos páginas de produto, vitrines, velocidade, checkout e oferta para transformar mais visitantes em pedidos pagos.", tags: ["Páginas de produto", "Vitrines", "Velocidade", "Checkout"] },
  { title: "Fidelização e CRM", art: "code", time: "LTV & recompra", text: "O lucro real do e-commerce mora na recompra. Estruturamos fluxos automatizados de WhatsApp, e-mail e campanhas de base para aumentar o LTV e girar estoque novo sem depender apenas de mídia paga.", tags: ["WhatsApp", "E-mail marketing", "LTV", "Campanhas de base"] },
  { title: "Gestão de Crescimento", art: "system", time: "Rotina semanal", text: "Visão macro do negócio: acompanhamento de metas, planejamento de lançamentos de coleção, análise de ticket médio, margem e construção de planos de ação semanais para destravar novos patamares de receita.", tags: ["Lançamentos", "Ticket médio", "Margem líquida", "Planos semanais"] },
]

const DEFAULT_CASES: OvsCase[] = [
  {
    client: "Criação e Gestão de Afiliados e Embaixadores da Marca",
    icon: "affiliates",
    badge: "Creator Economy · TikTok Shop",
    image: "/images/pexels-liza-summer-6347594.jpg",
    imagePos: "center 22%",
    kind: "",
    year: "",
    title: "Estruturamos seu programa de afiliadas e embaixadoras para transformar criadoras em um canal recorrente de vendas, unindo o alcance da Creator Economy ao potencial explosivo do TikTok Shop.",
    metric: "TikTok Shop",
    metricLabel: "afiliadas, comissões e vendas recorrentes",
    tint: ["#EFE4D4", "#C48F56"],
  },
  {
    client: "Curadoria Creators e Conteúdo",
    icon: "creators",
    badge: "Curadoria & Direção UGC",
    image: "/images/pexels-ben-khatry-430197437-24286930.jpg",
    imagePos: "center 20%",
    kind: "",
    year: "",
    title: "Selecionamos criadoras alinhadas ao posicionamento da sua marca e conduzimos briefings, roteiros e direção criativa para gerar UGC autêntico que desperta desejo e converte no feed.",
    metric: "UGC",
    metricLabel: "curadoria, roteiros e direção criativa",
    tint: ["#F5F0E8", "#D4A16A"],
  },
  {
    client: "Plataforma JAGWAR OS gratuita",
    icon: "os",
    badge: "JAGWAR OS · Aprovações & KPIs",
    image: "/images/Dashboard premium JAGWAR para aprovações e entregas.png",
    imagePos: "left top",
    kind: "",
    year: "",
    title: "Plataforma JAGWAR OS gratuita, para auxiliar seu crescimento e acompanhar o andamento do projeto: aprove criativos com um clique, acompanhe entregas e visualize o ROI ao vivo.",
    metric: "Gratuita",
    metricLabel: "aprovações, entregas e ROI em tempo real",
    tint: ["#E5DBCC", "#7A6D57"],
  },
]

const DEFAULT_STEPS = [
  { name: "Passo 01", when: "Diagnóstico", title: "Configuração & Diagnóstico 360°", text: "Mapeamos sua precificação, contas de mídia, plataforma de e-commerce e gargalos de conversão para identificar as alavancas imediatas de ROI." },
  { name: "Passo 02", when: "JAGWAR OS", title: "Arquitetura & Acesso ao JAGWAR OS", text: "Liberamos seu acesso gratuito ao JAGWAR OS e desenhamos o plano personalizado unindo tráfego pago, criativos, CRO, fidelização e CRM." },
  { name: "Passo 03", when: "Tração", title: "Ativação de Mídia & Creator Economy", text: "Colocamos campanhas de performance no ar junto com a curadoria de creators, programa de afiliadas/embaixadoras e operação no TikTok Shop." },
  { name: "Passo 04", when: "Escala", title: "Gestão de Crescimento & Escala", text: "Acompanhamento semanal de aprovações, entregas e margem no JAGWAR OS, otimizando criativos, conversão e recompra para escalar com previsibilidade." },
]

const DEFAULT_PLANS = [
  { name: "Diagnóstico Estratégico", price: null, text: "Análise gratuita do cenário atual do seu e-commerce para mapear oportunidades reais de crescimento.", features: ["Auditoria de contas Meta & Google Ads", "Leitura do funil e taxa de conversão", "Análise de criativos atuais", "Mapeamento de fuga no checkout"], cta: "Configurar meu projeto" },
  { name: "Assessoria Full Growth", price: null, text: "Atuação integrada nas cinco alavancas para escalar marcas de moda feminina com previsibilidade.", features: ["Gestão de Tráfego Pago (Meta & Google)", "Criativos, Creator Economy & TikTok Shop", "Otimização de conversões (CRO) e CRM", "Acesso gratuito ao JAGWAR OS"], cta: "Configurar meu projeto", featured: true, badge: "Estrutura completa" },
  { name: "Escala & Ecossistema", price: null, text: "Acompanhamento contínuo para marcas em expansão que buscam previsibilidade, margem e LTV.", features: ["Arquitetura personalizada de 90 dias", "Programa de afiliadas e embaixadoras", "Integração Shopify, Nuvemshop, Tray, ERP e BI", "Gestão de Crescimento com KPIs semanais"], cta: "Configurar meu projeto" },
]

const DEFAULT_FAQ = [
  { q: "Para quem é a assessoria da JAGWAR?", a: "A JAGWAR foi desenhada para marcas de moda feminina que já possuem operação digital e buscam maturidade, previsibilidade de faturamento e crescimento sustentável — protegendo margem e posicionamento." },
  { q: "Com quais plataformas de e-commerce vocês trabalham?", a: "Atuamos no dia a dia do varejo de moda com plataformas como Shopify e Nuvemshop, além de integrações com ERP, Meta Ads, Google Ads, CRM e painéis de BI & Dados." },
  { q: "Vocês fazem apenas gestão de tráfego pago?", a: "Não. Atuamos de ponta a ponta nas cinco alavancas que determinam faturamento e lucratividade: Tráfego Pago (Meta & Google Ads), Criativos de Alta Conversão, CRO, CRM & Retenção e Gestão de Growth." },
  { q: "Como funciona o diagnóstico estratégico gratuito?", a: "Auditamos suas contas de anúncios, métricas do e-commerce, criativos atuais e pontos de fuga no checkout antes da reunião para apresentar oportunidades reais de crescimento." },
  { q: "Como é estruturado o plano de trabalho?", a: "Seguimos um roadmap em 4 etapas claras: Diagnóstico Profundo, Plano de Ação & Arquitetura para os próximos 90 dias, Implementação & Tração com rastreamento preciso e Otimização Contínua com KPIs semanais." },
  { q: "Qual é o diferencial da JAGWAR em relação a agências tradicionais?", a: "Não somos uma agência generalista com fórmulas prontas. Substituímos o achismo por inteligência de dados e foco absoluto em ROAS, margem de contribuição e lucro líquido no caixa." },
]

const DEFAULT_CTA = {
  title: "Pronto para elevar o padrão de performance da sua marca?",
  text: "Nossa equipe analisará o cenário atual do seu e-commerce antes da nossa reunião para apresentar oportunidades reais de crescimento.",
  button: "Configurar meu projeto",
}

const DEFAULT_FOOTER = {
  columns: [
    { title: "Navegação", links: [{ label: "Serviços", href: "#services" }, { label: "Criadores", href: "#work" }, { label: "Próximos passos", href: "#process" }, { label: "Escopos", href: "#pricing" }] },
    { title: "JAGWAR", links: [{ label: "Parceiros", href: "#about" }, { label: "Dúvidas", href: "#faq" }, { label: "Diagnóstico", href: "#contact" }] },
    { title: "Ecossistema", links: [{ label: "Shopify", href: "#services" }, { label: "Nuvemshop", href: "#services" }, { label: "Meta & Google Ads", href: "#services" }, { label: "CRM & BI", href: "#services" }] },
  ],
  city: "São Paulo",
  timeZone: "America/Sao_Paulo",
  note: "Mais performance para sua marca crescer mais.",
}
// #endregion content

// #region logic
type Rgb = number[]

export type OvsPalette = { shadow: Rgb; mid: Rgb; lit: Rgb; glow: Rgb; twig: Rgb; accent: string; soft: string; shape: number }

const SEASONS = {
  summer: { shadow: [20, 19, 18], mid: [70, 63, 50], lit: [196, 143, 86], glow: [239, 228, 212], twig: [38, 35, 31], accent: "#C48F56", soft: "#D8AD7B", shape: 0.42 },
  autumn: { shadow: [46, 20, 10], mid: [146, 62, 18], lit: [224, 138, 36], glow: [252, 210, 116], twig: [46, 30, 22], accent: "#a5451a", soft: "#f1b24a", shape: 0.5 },
  blossom: { shadow: [92, 44, 64], mid: [192, 102, 138], lit: [242, 176, 200], glow: [255, 230, 238], twig: [56, 38, 42], accent: "#a33a64", soft: "#f3b1c9", shape: 0.66 },
}

const SKIES = {
  light: { stops: [[0, [218, 203, 183]], [0.55, [239, 228, 212]], [1, [245, 240, 232]]], sun: [0.56, 0.28, 255, 248, 236, 0.65], cloud: [252, 249, 244, 0.9], haze: [239, 228, 212], stars: 0, leaf: 1 },
  dark: { stops: [[0, [10, 10, 9]], [0.55, [20, 19, 18]], [1, [70, 63, 50]]], sun: [0.5, 0.92, 196, 143, 86, 0.45], cloud: [163, 155, 143, 0.24], haze: [28, 26, 23], stars: 1, leaf: 0.36 },
}

/** Four depth layers, far to near. `reach` is where the leaves start, in units of the half-box ellipse. */
const LAYERS = [
  { reach: 0.6, band: 0.52, leaf: 0.011, twigs: 9, masses: 170, per: 26, haze: 0.44, blur: 0.5, res: 1.25 },
  { reach: 0.72, band: 0.58, leaf: 0.016, twigs: 8, masses: 135, per: 26, haze: 0.22, blur: 0, res: 1.25 },
  { reach: 0.86, band: 0.66, leaf: 0.023, twigs: 7, masses: 105, per: 24, haze: 0.08, blur: 0, res: 1 },
  { reach: 1.02, band: 0.86, leaf: 0.036, twigs: 6, masses: 82, per: 22, haze: 0, blur: 2.2, res: 0.8 },
]

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

function noise2(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const h = (i: number, j: number) => hash(i * 57.0 + j * 131.0)
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  return lerp(lerp(h(xi, yi), h(xi + 1, yi), u), lerp(h(xi, yi + 1), h(xi + 1, yi + 1), u), v)
}

function fbm(x: number, y: number) {
  let s = 0
  let a = 0.5
  let f = 1
  for (let i = 0; i < 5; i++) {
    s += a * noise2(x * f, y * f)
    f *= 2.03
    a *= 0.5
  }
  return s / 0.96875
}

/** The radii of the box ellipse the canopy is measured in. Phones get a taller hole. */
function ellipse(w: number, h: number) {
  return { rx: Math.max(w / 2, h * 0.34), ry: h / 2 }
}

/** Normalised distance from the centre: 0 at the middle, 1 on the ellipse. */
function distAt(x: number, y: number, w: number, h: number) {
  const e = ellipse(w, h)
  const dx = (x - w / 2) / e.rx
  const dy = (y - h / 2) / e.ry
  return Math.sqrt(dx * dx + dy * dy)
}

/** Where a layer's leaves begin at an angle: a lobed ring, different per seed, coherent across layers. */
function reachAt(theta: number, layer: number, seed: number) {
  const p1 = hash(seed + 1) * 6.283
  const p2 = hash(seed + 2) * 6.283
  const p3 = hash(seed + 3) * 6.283
  const base = LAYERS[layer].reach
  return base * (1 + 0.13 * Math.sin(3 * theta + p1 + layer * 0.55) + 0.08 * Math.sin(5 * theta + p2 - layer * 0.9) + 0.05 * Math.sin(8 * theta + p3 + layer * 1.7))
}

export type OvsLeaf = { x: number; y: number; s: number; a: number; l: number }
export type OvsTwig = { p: number[]; w: number }

/** Every branch and leaf of one layer, for a box of w by h. Deterministic for a seed. */
function canopyPlan(w: number, h: number, layer: number, seed: number) {
  const spec = LAYERS[layer]
  const rand = mulberry32(seed * 977 + layer * 7919 + 13)
  const gauss = () => (rand() + rand() + rand() - 1.5) / 0.75
  // leaves keep a minimum size, so a phone's canopy reads as dense as a desktop's
  const u = Math.max(Math.sqrt(w * h), 1000)
  const leafPx = spec.leaf * u
  const cx = w / 2
  const cy = h / 2
  const area = clamp((w * h) / (1612 * 1008), 0.62, 1.35)
  const twigs = [] as OvsTwig[]
  const clusters = [] as { x: number; y: number; r: number; n: number; d: number }[]
  // budgets: a phone gets a lighter forest than a wide screen
  const branchCap = Math.round(spec.masses * area * 0.9)
  let forks = 0

  const thetaOf = (x: number, y: number) => {
    const e = ellipse(w, h)
    return Math.atan2((y - cy) / e.ry, (x - cx) / e.rx)
  }

  // branches reach in from beyond the frame and end in clusters at the hole's edge
  const grow = (x: number, y: number, dir: number, width: number, depth: number) => {
    const pts = [x, y]
    const step = u * 0.028
    let px = x
    let py = y
    let a = dir
    const stopAt = reachAt(thetaOf(x, y), layer, seed) + 0.02 + rand() * 0.08
    for (let i = 0; i < 60; i++) {
      a += (rand() - 0.5) * 0.32
      const toC = Math.atan2(cy - py, cx - px)
      let diff = toC - a
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      a += diff * 0.08
      px += Math.cos(a) * step
      py += Math.sin(a) * step
      pts.push(px, py)
      const d = distAt(px, py, w, h)
      const here = reachAt(thetaOf(px, py), layer, seed)
      if (d < here + spec.band * 0.75 && i % 2 === 0 && clusters.length < branchCap) clusters.push({ x: px + gauss() * leafPx, y: py + gauss() * leafPx, r: leafPx * (1.9 + rand() * 1.2), n: Math.round(spec.per * (0.7 + rand() * 0.5)), d })
      if (depth < 2 && i > 3 && forks < spec.twigs * 2 && rand() < 0.16 && ++forks) grow(px, py, a + (rand() < 0.5 ? -1 : 1) * (0.45 + rand() * 0.4), width * 0.55, depth + 1)
      if (d < Math.min(stopAt, here + 0.04)) break
    }
    clusters.push({ x: px, y: py, r: leafPx * 2.8, n: Math.round(spec.per * 1.4), d: distAt(px, py, w, h) })
    twigs.push({ p: pts, w: width })
  }

  for (let i = 0; i < spec.twigs; i++) {
    const t = (i / spec.twigs) * Math.PI * 2 + rand() * 0.5
    const e = ellipse(w, h)
    const sx = cx + Math.cos(t) * e.rx * 1.55
    const sy = cy + Math.sin(t) * e.ry * 1.55
    grow(sx, sy, Math.atan2(cy - sy, cx - sx) + (rand() - 0.5) * 0.7, leafPx * (0.42 + rand() * 0.2), 0)
  }

  // masses fill the band behind the branches, with noise-shaped gaps of sky
  const want = Math.round(spec.masses * area)
  const off = hash(seed + layer) * 100
  for (let tries = 0, got = 0; got < want && tries < want * 30; tries++) {
    const x = rand() * w
    const y = rand() * h
    const d = distAt(x, y, w, h)
    const r = reachAt(thetaOf(x, y), layer, seed)
    if (d < r || d > r + spec.band) continue
    const gap = fbm(x / (u * 0.12) + off, y / (u * 0.12) - off)
    const nearEdge = 1 - (d - r) / spec.band
    if (gap < 0.36 + nearEdge * 0.12) continue
    clusters.push({ x, y, r: leafPx * (1.9 + rand() * 1.6), n: Math.round(spec.per * (0.8 + rand() * 0.5)), d })
    got++
  }

  // outer clusters first, so the sunlit edge of the hole sits on top
  clusters.sort((p, q) => q.d - p.d)
  const leaves = [] as OvsLeaf[]
  for (const c of clusters) {
    const r = reachAt(thetaOf(c.x, c.y), layer, seed)
    const depthIn = clamp((c.d - r) / spec.band, 0, 1)
    const tx = cx - c.x
    const ty = cy - c.y
    const tl = Math.hypot(tx, ty) || 1
    const group = [] as OvsLeaf[]
    for (let k = 0; k < c.n; k++) {
      const ox = gauss() * c.r * 0.55
      const oy = gauss() * c.r * 0.55
      const ol = Math.hypot(ox, oy) || 1
      const toward = (ox * tx + oy * ty) / (ol * tl)
      const l = 0.5 + 0.28 * toward * Math.min(1, ol / c.r) + (rand() - 0.5) * 0.36 - depthIn * (0.3 + layer * 0.07) + 0.08
      group.push({ x: c.x + ox, y: c.y + oy, s: leafPx * (0.72 + rand() * 0.6), a: Math.atan2(oy, ox) + (rand() - 0.5) * 1.3, l: clamp(l, 0, 1) })
    }
    group.sort((p, q) => p.l - q.l)
    for (const g of group) leaves.push(g)
  }
  return { twigs, leaves }
}

/** Shadow to mid to sunlit to glowing, then hazed toward the sky for depth. */
function leafColor(p: OvsPalette, l: number, haze: Rgb, hazeAmt: number, dim: number) {
  let c: Rgb
  if (l < 0.45) c = mix(p.shadow, p.mid, l / 0.45)
  else if (l < 0.86) c = mix(p.mid, p.lit, (l - 0.45) / 0.41)
  else c = mix(p.lit, p.glow, (l - 0.86) / 0.14)
  c = c.map((v) => v * dim)
  return mix(c, haze, hazeAmt)
}

function mix(a: Rgb, b: Rgb, t: number) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

const rgb = (c: Rgb, a = 1) => "rgba(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + "," + a + ")"

function skyAt(stops: (number | Rgb)[][], t: number) {
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1]
    const b = stops[i]
    if (t <= (b[0] as number)) return mix(a[1] as Rgb, b[1] as Rgb, (t - (a[0] as number)) / ((b[0] as number) - (a[0] as number)))
  }
  return stops[stops.length - 1][1] as Rgb
}

function formatNumber(v: number, decimals = 0) {
  const s = v.toFixed(decimals)
  const [i, d] = s.split(".")
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (d ? "." + d : "")
}

function planPrice(plan: OvsPlan, quarterly: boolean) {
  if (plan.price === null) return null
  return quarterly && plan.quarterly ? plan.quarterly : plan.price
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim())

/** Which step of the process a 0..1 progress is in. */
function stepAt(progress: number, count: number) {
  return clamp(Math.floor(progress * count), 0, count - 1)
}
// #endregion logic

/* ------------------------------------------------------------------ canvas */

function drawSky(cv: HTMLCanvasElement, w: number, h: number, scheme: "light" | "dark", seed: number) {
  const S = SKIES[scheme]
  const k = 0.32
  const W = Math.max(8, Math.round(w * k))
  const H = Math.max(8, Math.round(h * k))
  cv.width = W
  cv.height = H
  const ctx = cv.getContext("2d")
  if (!ctx) return
  const img = ctx.createImageData(W, H)
  const off = hash(seed) * 50
  const [sx, sy, sr, sg, sb, sa] = S.sun
  for (let y = 0; y < H; y++) {
    const base = skyAt(S.stops, y / (H - 1))
    for (let x = 0; x < W; x++) {
      let c = base
      const dx = x / W - sx
      const dy = (y / H - sy) * (h / w)
      const g = Math.exp(-(dx * dx + dy * dy) * 9) * sa
      c = mix(c, [sr, sg, sb], g)
      const n = fbm(x / (W * 0.16) + off, y / (H * 0.2) - off * 0.5)
      const wisp = fbm(x / (W * 0.05) - off, y / (H * 0.07) + off)
      const cloud = smoothstep(0.5, 0.82, n * 0.8 + wisp * 0.25) * S.cloud[3]
      c = mix(c, [S.cloud[0], S.cloud[1], S.cloud[2]], cloud)
      if (S.stars && hash(x * 13.1 + y * 71.7 + seed) > 0.9965) c = mix(c, [255, 250, 240], 0.75 * (1 - y / H))
      const i = (y * W + x) * 4
      img.data[i] = c[0]
      img.data[i + 1] = c[1]
      img.data[i + 2] = c[2]
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
}

function drawLayer(cv: HTMLCanvasElement, w: number, h: number, layer: number, seed: number, pal: OvsPalette, scheme: "light" | "dark") {
  const spec = LAYERS[layer]
  const S = SKIES[scheme]
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.6) * spec.res
  const W = Math.max(4, Math.round(w * dpr))
  const H = Math.max(4, Math.round(h * dpr))
  const plan = canopyPlan(w, h, layer, seed)
  const target = spec.blur > 0 ? document.createElement("canvas") : cv
  target.width = W
  target.height = H
  const ctx = target.getContext("2d")
  if (!ctx) return
  ctx.clearRect(0, 0, W, H)
  const hazeAmt = spec.haze * (scheme === "dark" ? 0.7 : 1)
  // branches
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.strokeStyle = rgb(mix(pal.twig.map((v) => v * (scheme === "dark" ? 0.5 : 1)), S.haze, hazeAmt))
  for (const t of plan.twigs) {
    const n = t.p.length / 2
    for (let i = 1; i < n; i++) {
      ctx.lineWidth = Math.max(0.6, t.w * (1 - (i / n) * 0.8)) * dpr
      ctx.beginPath()
      ctx.moveTo(t.p[(i - 1) * 2] * dpr, t.p[(i - 1) * 2 + 1] * dpr)
      ctx.lineTo(t.p[i * 2] * dpr, t.p[i * 2 + 1] * dpr)
      ctx.stroke()
    }
  }
  // leaves
  const shape = pal.shape
  const vein = layer >= 2
  for (const f of plan.leaves) {
    const c = Math.cos(f.a) * dpr
    const s = Math.sin(f.a) * dpr
    ctx.setTransform(c, s, -s, c, f.x * dpr, f.y * dpr)
    const L = f.s * 0.5
    const Wd = f.s * shape
    ctx.fillStyle = rgb(leafColor(pal, f.l, S.haze, hazeAmt, S.leaf))
    ctx.beginPath()
    ctx.moveTo(-L, 0)
    ctx.quadraticCurveTo(0, -Wd, L, 0)
    ctx.quadraticCurveTo(0, Wd, -L, 0)
    ctx.fill()
    if (f.l > 0.72) {
      ctx.fillStyle = rgb(leafColor(pal, Math.min(1, f.l + 0.16), S.haze, hazeAmt, S.leaf), 0.7)
      ctx.beginPath()
      ctx.moveTo(-L * 0.55, 0)
      ctx.quadraticCurveTo(0, -Wd * 0.5, L * 0.7, 0)
      ctx.quadraticCurveTo(0, Wd * 0.5, -L * 0.55, 0)
      ctx.fill()
    }
    if (vein && f.s > 14) {
      ctx.strokeStyle = rgb(leafColor(pal, f.l * 0.55, S.haze, hazeAmt, S.leaf), 0.55)
      ctx.lineWidth = 0.7
      ctx.beginPath()
      ctx.moveTo(-L * 0.9, 0)
      ctx.lineTo(L * 0.8, 0)
      ctx.stroke()
    }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  if (target !== cv) {
    cv.width = W
    cv.height = H
    const out = cv.getContext("2d")
    if (!out) return
    out.filter = "blur(" + spec.blur * dpr + "px)"
    out.drawImage(target, 0, 0)
    out.filter = "none"
  }
}

type CanopyProps = {
  seed: number
  scheme: "light" | "dark"
  palette: OvsPalette
  lazy?: boolean
  onReady?: () => void
  className?: string
}

/** The generated view up through the trees: a sky and four leaf layers, each nested for pointer, scroll and sway. */
function Canopy({ seed, scheme, palette, lazy, onReady, className }: CanopyProps) {
  const box = React.useRef(null as HTMLDivElement | null)
  const sky = React.useRef(null as HTMLCanvasElement | null)
  const layers = React.useRef([] as (HTMLCanvasElement | null)[])
  const ready = React.useRef(onReady)
  React.useEffect(() => {
    ready.current = onReady
  }, [onReady])

  React.useEffect(() => {
    const el = box.current
    if (!el) return
    let size = { w: 0, h: 0 }
    let job = 0
    let alive = true
    let seen = !lazy
    let drawn = false
    const draw = () => {
      cancelAnimationFrame(job)
      const w = el.clientWidth
      const h = el.clientHeight
      if (w < 2 || h < 2) return
      size = { w, h }
      // one canvas per frame, so the main thread never stalls for long
      const work = [
        () => sky.current && drawSky(sky.current, w, h, scheme, seed),
        ...LAYERS.map((_, i) => () => {
          const cv = layers.current[i]
          // the layer box is larger than the stage (see .ovs-layer), so plan for its own size
          if (cv && cv.parentElement) drawLayer(cv, cv.parentElement.clientWidth, cv.parentElement.clientHeight, i, seed, palette, scheme)
        }),
      ]
      let i = 0
      const next = () => {
        if (!alive) return
        try {
          work[i]()
        } catch {
          /* a canvas that cannot draw leaves the CSS sky behind it */
        }
        i++
        if (i < work.length) job = requestAnimationFrame(next)
        else {
          drawn = true
          el.setAttribute("data-drawn", "")
          ready.current?.()
        }
      }
      job = requestAnimationFrame(next)
    }
    const ro = new ResizeObserver(() => {
      if (!seen) return
      const w = el.clientWidth
      const h = el.clientHeight
      // mobile toolbars change the height by a little; do not regrow the forest for that
      if (drawn && Math.abs(w - size.w) < 40 && Math.abs(h - size.h) < 140) return
      draw()
    })
    ro.observe(el)
    let io: IntersectionObserver | null = null
    if (lazy) {
      io = new IntersectionObserver(
        (es) => {
          if (es.some((e) => e.isIntersecting) && !seen) {
            seen = true
            draw()
          }
        },
        { rootMargin: "900px 0px" },
      )
      io.observe(el)
    } else draw()
    return () => {
      alive = false
      cancelAnimationFrame(job)
      ro.disconnect()
      io?.disconnect()
    }
  }, [seed, scheme, palette, lazy])

  return (
    <div ref={box} className={"ovs-canopy " + (className || "")} aria-hidden="true">
      <div className="ovs-skybox" data-sky>
        <canvas ref={sky} className="ovs-cv ovs-skycv" />
      </div>
      {LAYERS.map((_, i) => (
        <div key={i} className="ovs-layer" data-layer={i}>
          <div className="ovs-zoom" data-zoom={i}>
            <div className={"ovs-sway ovs-sway-" + i}>
              <canvas ref={(c) => { layers.current[i] = c }} className="ovs-cv" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

type PhotoProps = {
  src: string
  season: OvsSeason
  scheme: "light" | "dark"
  /** Turn the photo upside down (looking up, any way round is still the sky). */
  turn?: boolean
  onReady?: () => void
  onFail?: () => void
}

/**
 * The real canopy: one photo, graded per season and scheme in canvas, plus a
 * soft-focus copy of its rim that rushes past when you rise through it. On a
 * portrait screen the photo is turned a quarter, so a phone gets a full ring
 * of trees instead of a slice of one.
 */
function PhotoCanopy({ src, turn, onReady, onFail }: PhotoProps) {
  const box = React.useRef(null as HTMLDivElement | null)
  const base = React.useRef(null as HTMLCanvasElement | null)
  const fore = React.useRef(null as HTMLCanvasElement | null)
  const cbs = React.useRef({ onReady, onFail })
  React.useEffect(() => {
    cbs.current = { onReady, onFail }
  }, [onReady, onFail])

  React.useEffect(() => {
    let alive = true
    const img = document.createElement("img")
    img.decoding = "async"
    const paint = () => {
      const cv = base.current
      const fv = fore.current
      if (!cv || !fv) return
      const W = img.naturalWidth
      const H = img.naturalHeight
      cv.width = W
      cv.height = H
      const ctx = cv.getContext("2d")
      if (!ctx) throw new Error("no 2d")
      ctx.save()
      if (turn) {
        ctx.translate(W, 0)
        ctx.scale(-1, 1)
      }
      ctx.drawImage(img, 0, 0, W, H)
      ctx.restore()
      // the rim, out of focus, for the rise
      fv.width = Math.round(W / 2)
      fv.height = Math.round(H / 2)
      const f = fv.getContext("2d")
      if (f) {
        f.filter = "blur(7px)"
        f.drawImage(cv, 0, 0, fv.width, fv.height)
        f.filter = "none"
        f.globalCompositeOperation = "destination-in"
        const gr = f.createRadialGradient(fv.width / 2, fv.height / 2, Math.min(fv.width, fv.height) * 0.22, fv.width / 2, fv.height / 2, Math.max(fv.width, fv.height) * 0.62)
        gr.addColorStop(0, "rgba(0,0,0,0)")
        gr.addColorStop(1, "rgba(0,0,0,1)")
        f.fillStyle = gr
        f.fillRect(0, 0, fv.width, fv.height)
        f.globalCompositeOperation = "source-over"
      }
      box.current?.setAttribute("data-drawn", "")
    }
    img.onload = () => {
      if (!alive) return
      try {
        paint()
        cbs.current.onReady?.()
      } catch {
        cbs.current.onFail?.()
      }
    }
    img.onerror = () => {
      if (alive) cbs.current.onFail?.()
    }
    img.src = src
    return () => {
      alive = false
      img.onload = null
      img.onerror = null
    }
  }, [src, turn])

  return (
    <div ref={box} className="ovs-canopy ovs-photo" data-photo aria-hidden="true">
      <div className="ovs-layer" data-layer={0}>
        <div className="ovs-zoom" data-zoom={0}>
          <div className="ovs-sway ovs-sway-p">
            <canvas ref={base} className="ovs-cv ovs-pcv" />
          </div>
        </div>
      </div>
      <div className="ovs-layer ovs-fore" data-layer={1}>
        <div className="ovs-zoom" data-zoom={1}>
          <canvas ref={fore} className="ovs-cv ovs-pcv" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- marks */

function ServiceTagIcon({ tag }: { tag: string }) {
  const props = { className: "ovs-svc-tag-ico", size: 14, strokeWidth: 1.8, "aria-hidden": true as const }
  switch (tag) {
    case "Meta Ads":
      return <Target {...props} />
    case "Google Ads":
      return <Search {...props} />
    case "Curva ABC":
      return <BarChart3 {...props} />
    case "Escala por funil":
      return <TrendingUp {...props} />
    case "Vídeos nativos":
      return <Clapperboard {...props} />
    case "Estáticos":
      return <ImageIcon {...props} />
    case "Caimento & estilo":
      return <Sparkles {...props} />
    case "Testes criativos":
      return <FlaskConical {...props} />
    case "Páginas de produto":
      return <LayoutTemplate {...props} />
    case "Vitrines":
      return <Store {...props} />
    case "Velocidade":
      return <Gauge {...props} />
    case "Checkout":
      return <ShoppingBag {...props} />
    case "WhatsApp":
      return <MessageCircle {...props} />
    case "E-mail marketing":
      return <Mail {...props} />
    case "LTV":
      return <Repeat {...props} />
    case "Campanhas de base":
      return <Users {...props} />
    case "Lançamentos":
      return <Rocket {...props} />
    case "Ticket médio":
      return <BadgeDollarSign {...props} />
    case "Margem líquida":
      return <Percent {...props} />
    case "Planos semanais":
      return <CalendarCheck {...props} />
    default:
      return <Sparkles {...props} />
  }
}

function CreatorCardIcon({ icon }: { icon?: OvsCase["icon"] }) {
  const props = { className: "ovs-card-ico", size: 18, strokeWidth: 1.8, "aria-hidden": true as const }
  switch (icon) {
    case "affiliates":
      return <Crown {...props} />
    case "creators":
      return <Clapperboard {...props} />
    case "os":
      return <LayoutDashboard {...props} />
    default:
      return <Sparkles {...props} />
  }
}

/** Official JAGWAR jaguar emblem. */
function BrandMark() {
  return (
    <Image
      src="/images/logos-jagwar/favicon.png"
      alt=""
      aria-hidden="true"
      width={128}
      height={128}
      className="ovs-brandmark"
    />
  )
}

function PlusCrosshair({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

/* -------------------------------------------------------------- word morph */

// a plain space inside an inline-block letter collapses to nothing
const NBSP = String.fromCharCode(160)
// the serif word is set condensed, like a compressed Didone; keep in step with .ovs-morph-word
const CONDENSE = 0.8

function WordMorph({ words, still }: { words: string[]; still: boolean }) {
  const [i, setI] = React.useState(0)
  const box = React.useRef(null as HTMLSpanElement | null)
  const word = React.useRef(null as HTMLSpanElement | null)
  const paused = React.useRef(false)
  const first = React.useRef(true)

  useIso(() => {
    const b = box.current
    const w = word.current
    if (!b || !w) return
    const width = w.offsetWidth * CONDENSE
    if (first.current || still) {
      first.current = false
      b.style.width = width + "px"
      return
    }
    const ctx = gsap.context(() => {
      gsap.to(b, { width, duration: 0.7, ease: "expo.inOut" })
      gsap.fromTo(w.children, { yPercent: 105, rotateX: -80, opacity: 0, filter: "blur(6px)" }, { yPercent: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.045, ease: "expo.out", delay: 0.12, clearProps: "filter" })
    })
    return () => ctx.revert()
  }, [i, still])

  React.useEffect(() => {
    if (still || words.length < 2) return
    const t = window.setInterval(() => {
      const w = word.current
      if (paused.current || !w || document.hidden) return
      gsap.to(w.children, {
        yPercent: -105,
        rotateX: 80,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.45,
        stagger: 0.03,
        ease: "power3.in",
        onComplete: () => setI((v) => (v + 1) % words.length),
      })
    }, 3200)
    return () => window.clearInterval(t)
  }, [still, words.length])

  // resize with the font (it scales with the viewport)
  React.useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (box.current && word.current) box.current.style.width = word.current.offsetWidth * CONDENSE + "px"
    })
    if (word.current) ro.observe(word.current)
    return () => ro.disconnect()
  }, [i])

  return (
    <span className="ovs-morph" ref={box} onPointerEnter={() => (paused.current = true)} onPointerLeave={() => (paused.current = false)}>
      <span className="ovs-morph-word" ref={word} key={i}>
        {Array.from(words[i] || "").map((ch, k) => (
          <span key={k} className="ovs-ch">
            {ch === " " ? NBSP : ch}
          </span>
        ))}
      </span>
    </span>
  )
}

/* ---------------------------------------------------------- little pieces */

function Split({ text, className, as = "h2" }: { text: string; className?: string; as?: "h2" | "h3" | "p" }) {
  const Tag = as
  const lines = text.split("\n")
  return (
    <Tag className={className} data-split>
      {lines.map((line, li) => {
        const words = line.split(" ")
        return (
          <React.Fragment key={li}>
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className="ovs-w">
                  <span data-w>{w}</span>
                </span>
                {i < words.length - 1 ? " " : null}
              </React.Fragment>
            ))}
            {li < lines.length - 1 ? <br /> : null}
          </React.Fragment>
        )
      })}
    </Tag>
  )
}

function Kicker({ text }: { n?: string; text: string }) {
  return (
    <p className="ovs-kicker" data-rv>
      <span>{text}</span>
    </p>
  )
}

/* ------------------------------------------------------- service previews */

const SERVICE_IMAGES: Record<OvsServiceArt, string> = {
  brand: "/images/services/service-01-trafego-v2.jpg",
  product: "/images/services/service-02-criativos-v2.jpg",
  site: "/images/services/service-03-cro-v2.jpg",
  code: "/images/services/service-04-crm-v2.jpg",
  system: "/images/services/service-05-growth-v2.jpg",
}

function ServiceArt({ art }: { art?: OvsServiceArt }) {
  const src = SERVICE_IMAGES[art || "system"]
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={480}
      height={320}
      className="ovs-svc-img"
    />
  )
}

/* -------------------------------------------------------------- the tree */

function GrowingTree({ seed }: { seed: number }) {
  const crown = React.useMemo(() => {
    const r = mulberry32(seed + 404)
    return Array.from({ length: 46 }, () => {
      const a = r() * Math.PI * 2
      const d = Math.sqrt(r())
      return { x: 182 + Math.cos(a) * d * 128, y: 132 + Math.sin(a) * d * 86, r: 10 + r() * 16, l: r() }
    })
  }, [seed])
  const tips = [
    [[96, 332], [262, 306]],
    [[70, 214], [292, 186], [122, 270]],
  ]
  return (
    <svg className="ovs-svg ovs-tree" viewBox="0 0 360 540" aria-hidden="true">
      <circle data-sun cx="300" cy="70" r="26" fill="var(--ovs-soft)" opacity="0.8" />
      <ellipse cx="180" cy="508" rx="130" ry="12" fill="var(--ovs-line)" />
      <g fill="none" stroke="var(--ovs-bark)" strokeLinecap="round">
        <path data-grow="0" pathLength={1} strokeWidth="9" d="M180 506 C 176 440, 188 380, 180 320 S 172 200, 182 120" />
        <path data-grow="1" pathLength={1} strokeWidth="4.5" d="M181 386 C 152 366, 122 354, 96 332" />
        <path data-grow="1" pathLength={1} strokeWidth="4.5" d="M180 356 C 210 340, 238 326, 262 306" />
        <path data-grow="2" pathLength={1} strokeWidth="3.5" d="M178 262 C 140 244, 104 238, 70 214" />
        <path data-grow="2" pathLength={1} strokeWidth="3.5" d="M182 232 C 220 216, 262 208, 292 186" />
        <path data-grow="2" pathLength={1} strokeWidth="3" d="M180 300 C 160 292, 140 286, 122 270" />
      </g>
      <g data-leaves="0">
        <path d="M180 470c-18-2-30-12-32-26 16 0 28 8 32 26z" fill="var(--ovs-accent)" />
        <path d="M181 462c16-6 30-4 38 8-14 6-28 4-38-8z" fill="var(--ovs-soft)" />
      </g>
      {tips.map((set, s) => (
        <g data-leaves={s + 1} key={s}>
          {set.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="17" fill="var(--ovs-accent)" />
              <circle cx={x + 9} cy={y - 8} r="12" fill="var(--ovs-soft)" />
              <circle cx={x - 10} cy={y - 5} r="9" fill="var(--ovs-leaf2)" />
            </g>
          ))}
        </g>
      ))}
      <g data-leaves="3">
        {crown.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={c.l > 0.66 ? "var(--ovs-soft)" : c.l > 0.33 ? "var(--ovs-leaf2)" : "var(--ovs-accent)"} opacity={0.82 + c.l * 0.18} />
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------- the page */

function Price({ value, currency, still }: { value: number; currency: string; still: boolean }) {
  const ref = React.useRef(null as HTMLSpanElement | null)
  const last = React.useRef(value)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const from = last.current
    last.current = value
    if (still || from === value) {
      el.textContent = currency + formatNumber(value)
      return
    }
    const o = { v: from }
    const t = gsap.to(o, { v: value, duration: 0.7, ease: "expo.out", onUpdate: () => (el.textContent = currency + formatNumber(Math.round(o.v))) })
    return () => {
      t.kill()
    }
  }, [value, currency, still])
  return <span ref={ref}>{currency + formatNumber(value)}</span>
}

function Clock({ timeZone }: { timeZone: string }) {
  const [t, setT] = React.useState("")
  React.useEffect(() => {
    let f: Intl.DateTimeFormat
    try {
      f = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone })
    } catch {
      f = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }
    const tick = () => setT(f.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [timeZone])
  return <time>{t || "--:--"}</time>
}

function CurrentYear() {
  const [year, setYear] = React.useState(2026)
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()))
    return () => cancelAnimationFrame(id)
  }, [])
  return <>{year}</>
}

function readScheme(theme: "auto" | "light" | "dark") {
  if (theme !== "auto") return theme
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") || document.body.classList.contains("dark") ? "dark" : "light"
}

export default function OverstoryStudioLanding({
  brand = "JAGWAR",
  links = DEFAULT_LINKS,
  status = null,
  hero,
  services,
  work,
  process,
  pricing,
  faq,
  cta = DEFAULT_CTA,
  footer = DEFAULT_FOOTER,
  email = "contato@jagwar.com.br",
  currency = "R$",
  season = "summer",
  photo = OVS_PHOTO,
  seed = 7,
  theme = "dark",
  themeToggle = true,
  onBook,
  onSubscribe,
  height = "100svh",
  className = "",
}: OverstoryStudioLandingProps) {
  const uid = "ovs" + React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const root = React.useRef(null as HTMLDivElement | null)
  const H = { ...DEFAULT_HERO, ...hero }
  const words = H.words && H.words.length ? H.words : DEFAULT_HERO.words
  const svc = services === null ? null : {
    kicker: services?.kicker || "O que fazemos",
    title: services?.title || "Uma estrutura completa\npara escalar sua loja de ponta a ponta",
    text: services?.text || "Desde a precificação até a aquisição e fidelização de clientes fornecemos serviços e soluções que farão seu negócio ir para o próximo nível.",
    items: services?.items || (DEFAULT_SERVICES as OvsService[]),
  }
  const wk = work === null ? null : {
    kicker: work?.kicker || "Conecte-se com criadores",
    title: work?.title || "Conectamos sua marca com criadores de conteúdo para surfarmos a onda da Creator Economy",
    next: work?.next || "Sua marca, no próximo nível",
    items: work?.items || (DEFAULT_CASES as OvsCase[]),
  }
  const pr = process === null ? null : { kicker: process?.kicker || "Próximos passos", title: process?.title || "Da configuração do seu projeto à escala previsível em 4 passos.", steps: process?.steps || DEFAULT_STEPS }
  const pc = pricing === null ? null : {
    kicker: pricing?.kicker || "Para quem é a JAGWAR",
    title: pricing?.title || "Desenhada para marcas de moda que buscam maturidade digital.",
    text: pricing?.text || "Análise estratégica gratuita do seu funil, anúncios e taxa de conversão antes de qualquer proposta.",
    plans: pricing?.plans || (DEFAULT_PLANS as OvsPlan[]),
    quarterlyNote: pricing?.quarterlyNote || "90 dias",
  }
  const fq = faq === null ? null : { kicker: faq?.kicker || "Dúvidas frequentes", title: faq?.title || "O que marcas de moda perguntam antes de começar.", text: faq?.text || "Prefere falar direto com o time? Copie nosso e-mail e conte sobre a sua loja.", items: faq?.items || DEFAULT_FAQ }
  const ft = footer === null ? null : {
    columns: footer?.columns || DEFAULT_FOOTER.columns,
    city: footer?.city || DEFAULT_FOOTER.city,
    timeZone: footer?.timeZone || DEFAULT_FOOTER.timeZone,
    note: footer?.note || DEFAULT_FOOTER.note,
  }
  const pal = SEASONS[season] || SEASONS.summer

  const [scheme, setScheme] = React.useState((theme === "light" ? "light" : "dark") as "light" | "dark")
  const [override, setOverride] = React.useState(null as null | "light" | "dark")
  const [still, setStill] = React.useState(false)
  const [menu, setMenu] = React.useState(false)
  const [photoFail, setPhotoFail] = React.useState(false)
  const usePhoto = !!photo && !photoFail
  const [active, setActive] = React.useState("")
  const [svcOpen, setSvcOpen] = React.useState(-1)
  const [svcHover, setSvcHover] = React.useState(0)
  const [quarterly, setQuarterly] = React.useState(false)
  const [faqOpen, setFaqOpen] = React.useState(0)
  const [copied, setCopied] = React.useState(false)
  const [mail, setMail] = React.useState("")
  const [mailState, setMailState] = React.useState("idle" as "idle" | "sending" | "done" | "error" | "invalid")
  const [caseIdx, setCaseIdx] = React.useState(0)
  const heroIn = React.useRef(null as null | (() => void))
  const heroReady = React.useRef(false)
  const gust = React.useRef(null as null | ((x: number) => void))

  // scheme: an explicit theme, else the nav switch, else the host's .dark class
  React.useEffect(() => {
    const apply = () => setScheme(override || readScheme(theme))
    apply()
    if (theme !== "auto" || override) return
    const mo = new MutationObserver(apply)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [theme, override])

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => setStill(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  const go = React.useCallback((href?: string) => (e?: React.MouseEvent) => {
    if (!href || !href.startsWith("#") || href.length < 2) return
    const el = root.current?.querySelector('[data-sec="' + href.slice(1) + '"]')
    if (!el) return
    e?.preventDefault()
    setMenu(false)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
  }, [])

  const book = (from: string) => (e: React.MouseEvent) => {
    setMenu(false)
    if (onBook) {
      e.preventDefault()
      onBook(from)
    }
  }

  // nav: solid once you leave the top, hides while you scroll down, active link follows the section in view
  React.useEffect(() => {
    const r = root.current
    if (!r) return
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const top = r.getBoundingClientRect().top + y
        r.toggleAttribute("data-solid", y > top + 40)
        r.toggleAttribute("data-navhide", y > last + 4 && y > top + 400)
        if (y < last - 4) r.removeAttribute("data-navhide")
        last = y
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.sec || "")
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    r.querySelectorAll("[data-sec]").forEach((s) => io.observe(s))
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  // phone menu: Escape closes, focus moves in and comes back
  const menuBtn = React.useRef(null as HTMLButtonElement | null)
  const sheet = React.useRef(null as HTMLDivElement | null)
  React.useEffect(() => {
    if (!menu) return
    const first = sheet.current?.querySelector("a,button") as HTMLElement | null
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false)
        menuBtn.current?.focus()
      }
      if (e.key === "Tab" && sheet.current) {
        const f = Array.from(sheet.current.querySelectorAll("a,button")) as HTMLElement[]
        if (!f.length) return
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault()
          f[f.length - 1].focus()
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault()
          f[0].focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menu])

  /* ------------------------------------------------ the scroll storyboard */
  useIso(() => {
    const r = root.current
    if (!r) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 820px)", fine: "(hover: hover) and (pointer: fine)" }, (c) => {
        const { motion, wide, fine } = c.conditions as { motion: boolean; wide: boolean; fine: boolean }
        const q = gsap.utils.selector(r)
        const heroEl = q("[data-hero]")[0] as HTMLElement
        const heroLayers = q("[data-hero] [data-layer]") as HTMLElement[]
        const heroZoom = q("[data-hero] [data-zoom]") as HTMLElement[]
        const photoMode = !!heroEl.querySelector("[data-photo]")
        const undo = [] as (() => void)[]

        if (!motion) {
          r.setAttribute("data-still", "")
          heroIn.current = null
          return () => r.removeAttribute("data-still")
        }

        /* 1. arrival: words rise, then the trees close in around the sky */
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } })
        intro
          .fromTo(q(".ovs-nav-in"), { y: -28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 0.2)
          .fromTo(q("[data-hero] .ovs-status"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.25)
          .fromTo(q("[data-hero] .ovs-line > span"), { yPercent: 115, rotate: 2.5 }, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.12 }, 0.3)
          .fromTo(q("[data-hero] .ovs-hero-desc"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.7)
          .fromTo(q("[data-hero] .ovs-cue"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.2)
        gsap.set(heroLayers, { autoAlpha: 0 })
        if (!photoMode) gsap.set(q("[data-hero] [data-sky]"), { scale: 1.08 })
        let entered = false
        heroIn.current = () => {
          if (entered) return
          entered = true
          if (photoMode) {
            // the eye adjusting: the canopy comes into focus as it settles
            gsap.set(heroLayers[1], { autoAlpha: 1 })
            gsap.fromTo(heroLayers[0], { autoAlpha: 0, scale: 1.24, rotate: -4, filter: "blur(18px) brightness(1.25)" }, { autoAlpha: 1, scale: 1, rotate: 0, filter: "blur(0px) brightness(1)", duration: 2.9, ease: "expo.out", clearProps: "filter" })
            return
          }
          gsap.to(q("[data-hero] [data-sky]"), { scale: 1, duration: 2.6, ease: "expo.out" })
          gsap.fromTo(heroLayers, { autoAlpha: 0, scale: (i: number) => 1.45 + i * 0.28, rotate: (i: number) => (i % 2 ? -6 : 6) }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 2.6, stagger: 0.14, ease: "expo.out" })
        }
        if (heroReady.current) heroIn.current()

        /* 2. rise: scroll lifts you through the layers and out into open sky */
        const rise = gsap.timeline({ scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom bottom", scrub: 0.9 } })
        const zs = [1.55, 1.95, 2.6, 3.6]
        const rs = [2, -3, 5, -9]
        if (photoMode) {
          // into the gap in the trees, with the near leaves rushing past out of focus
          rise
            .to(heroZoom[0], { scale: 2.5, rotate: 6, ease: "power2.in", duration: 1 }, 0)
            .fromTo(heroZoom[1], { scale: 1.04, opacity: 0 }, { scale: 3.6, opacity: 1, ease: "power2.in", duration: 0.7 }, 0.04)
            .to(heroZoom[1], { opacity: 0, ease: "none", duration: 0.25 }, 0.74)
        } else {
          heroZoom.forEach((z, i) => rise.to(z, { scale: zs[i], rotate: rs[i], ease: "power2.in", duration: 1 }, 0))
          rise.to(q("[data-hero] [data-sky] canvas"), { scale: 1.22, ease: "none", duration: 1 }, 0)
        }
        rise
          .to(q("[data-hero] .ovs-copy"), { y: () => -window.innerHeight * 0.16, scale: 0.92, autoAlpha: 0, filter: "blur(10px)", ease: "power1.in", duration: 0.5 }, 0.05)
          .to(q("[data-hero] .ovs-cue"), { autoAlpha: 0, duration: 0.1 }, 0)
          .fromTo(q("[data-hero] .ovs-veil"), { yPercent: 50 }, { yPercent: -50, ease: "power1.inOut", duration: 0.55 }, 0.45)
          .fromTo(q("[data-hero] .ovs-above"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.62)

        /* pointer parallax and a gust on click */
        if (fine) {
          const depth = photoMode ? [16, 48] : [8, 14, 24, 40]
          const xs = heroLayers.map((l) => gsap.quickTo(l, "x", { duration: 1.4, ease: "power3.out" }))
          const ys = heroLayers.map((l) => gsap.quickTo(l, "y", { duration: 1.4, ease: "power3.out" }))
          const cx = gsap.quickTo(q("[data-hero] .ovs-copy"), "x", { duration: 1.6, ease: "power3.out" })
          const onMove = (e: PointerEvent) => {
            const b = heroEl.getBoundingClientRect()
            const nx = (e.clientX - b.left) / b.width - 0.5
            const ny = (e.clientY - b.top) / window.innerHeight - 0.5
            heroLayers.forEach((_, i) => {
              xs[i](-nx * depth[i])
              ys[i](-ny * depth[i] * 0.7)
            })
            cx(nx * 6)
          }
          heroEl.addEventListener("pointermove", onMove)
          undo.push(() => heroEl.removeEventListener("pointermove", onMove))
        }
        gust.current = (x: number) => {
          const dir = x < 0.5 ? 1 : -1
          heroLayers.forEach((l, i) => {
            gsap.timeline()
              .to(l, { rotate: dir * (0.6 + i * 0.5), duration: 0.35 + i * 0.05, ease: "power2.out" })
              .to(l, { rotate: 0, duration: 1.6, ease: "elastic.out(1,0.35)" })
          })
          const burst = q("[data-hero] [data-fall='burst']") as HTMLElement[]
          burst.forEach((leaf, i) => {
            const b = heroEl.getBoundingClientRect()
            gsap.killTweensOf(leaf)
            gsap.fromTo(
              leaf,
              { x: b.width * (0.15 + Math.random() * 0.7), y: -40, rotate: Math.random() * 360, autoAlpha: 1 },
              { x: "+=" + (dir * (80 + Math.random() * 220)), y: window.innerHeight * (0.7 + Math.random() * 0.5), rotate: "+=" + (220 + Math.random() * 300), duration: 3.2 + Math.random() * 2, delay: i * 0.06, ease: "power1.in", onComplete: () => { gsap.set(leaf, { autoAlpha: 0 }) } },
            )
          })
        }
        undo.push(() => (gust.current = null))

        /* falling leaves, always a few in the air */
        const falling = q("[data-hero] [data-fall='idle']") as HTMLElement[]
        const fall = (leaf: HTMLElement, delay: number) => {
          const b = heroEl.getBoundingClientRect()
          gsap.fromTo(
            leaf,
            { x: b.width * Math.random(), y: -60, rotate: Math.random() * 360, autoAlpha: 0.9 },
            { y: window.innerHeight + 60, x: "+=" + (Math.random() * 240 - 120), rotate: "+=" + (Math.random() * 540 - 270), duration: 11 + Math.random() * 8, delay, ease: "none", onComplete: () => fall(leaf, Math.random() * 3) },
          )
        }
        falling.forEach((l, i) => fall(l, 1.6 + i * 2.4))
        q("[data-fall] > *").forEach((inner: Element, i: number) => gsap.to(inner, { rotateX: 70, rotateY: 30, x: i % 2 ? 16 : -16, duration: 1.4 + (i % 3) * 0.5, yoyo: true, repeat: -1, ease: "sine.inOut" }))

        /* 3. headings and blocks reveal as they arrive */
        q("[data-split]").forEach((h: Element) => {
          gsap.fromTo(h.querySelectorAll("[data-w]"), { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.045, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%", once: true } })
        })
        const rv = q("[data-rv]") as HTMLElement[]
        gsap.set(rv, { autoAlpha: 0, y: 34 })
        ScrollTrigger.batch(rv, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true }) })

        /* 4. manifesto reads itself in */
        const man = q("[data-manifesto]")[0]
        if (man) {
          gsap.fromTo(man.querySelectorAll("[data-mw]"), { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: man, start: "top 78%", end: "bottom 45%", scrub: true } })
          gsap.fromTo(man.querySelectorAll(".ovs-pic"), { scale: 0, rotate: -12 }, { scale: 1, rotate: 0, ease: "back.out(2)", duration: 0.9, stagger: 0.2, scrollTrigger: { trigger: man, start: "top 60%", once: true } })
        }
        q("[data-count]").forEach((el: Element) => {
          const e = el as HTMLElement
          const to = Number(e.dataset.count)
          const dec = Number(e.dataset.dec || 0)
          const o = { v: 0 }
          e.textContent = (e.dataset.pre || "") + formatNumber(0, dec) + (e.dataset.suf || "")
          gsap.to(o, { v: to, duration: 2.2, ease: "expo.out", scrollTrigger: { trigger: e, start: "top 88%", once: true }, onUpdate: () => (e.textContent = (e.dataset.pre || "") + formatNumber(o.v, dec) + (e.dataset.suf || "")) })
        })
        q(".ovs-stat-rule").forEach((el: Element) => gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } }))

        /* 5. services: rows draw their rules, the preview follows the cursor */
        gsap.fromTo(q(".ovs-svc-row"), { "--ovs-rule": 0 }, { "--ovs-rule": 1, duration: 1.4, stagger: 0.08, ease: "expo.inOut", scrollTrigger: { trigger: q(".ovs-svc-list")[0], start: "top 85%", once: true } })
        const list = q(".ovs-svc-list")[0] as HTMLElement | undefined
        const prev = q(".ovs-svc-prev")[0] as HTMLElement | undefined
        if (fine && list && prev) {
          const px = gsap.quickTo(prev, "x", { duration: 0.6, ease: "power3.out" })
          const py = gsap.quickTo(prev, "y", { duration: 0.6, ease: "power3.out" })
          const pr = gsap.quickTo(prev, "rotate", { duration: 0.8, ease: "power3.out" })
          let lx = 0
          const mv = (e: PointerEvent) => {
            const b = list.getBoundingClientRect()
            const x = e.clientX - b.left
            px(x + 28)
            py(e.clientY - b.top - 90)
            pr(clamp((x - lx) * 0.6, -10, 10))
            lx = x
          }
          const en = () => gsap.to(prev, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" })
          const lv = () => gsap.to(prev, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: "power3.in" })
          gsap.set(prev, { autoAlpha: 0, scale: 0.6 })
          list.addEventListener("pointermove", mv)
          list.addEventListener("pointerenter", en)
          list.addEventListener("pointerleave", lv)
          undo.push(() => {
            list.removeEventListener("pointermove", mv)
            list.removeEventListener("pointerenter", en)
            list.removeEventListener("pointerleave", lv)
          })
        }

        /* 6. work: a horizontal track on wide screens, cards that lean with the speed */
        const workEl = q("[data-work]")[0] as HTMLElement | undefined
        const track = q("[data-track]")[0] as HTMLElement | undefined
        const stage = q("[data-workstage]")[0] as HTMLElement | undefined
        if (wide && workEl && track && stage) {
          workEl.setAttribute("data-h", "")
          const dist = () => Math.max(0, track.scrollWidth - stage.clientWidth)
          const fit = () => {
            workEl.style.height = stage.offsetHeight + dist() + "px"
          }
          fit()
          ScrollTrigger.addEventListener("refreshInit", fit)
          const cards = q("[data-card]") as HTMLElement[]
          const skew = gsap.quickTo(cards, "skewX", { duration: 0.5, ease: "power3.out" })
          const slide = gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: workEl,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
              invalidateOnRefresh: true,
              onUpdate: (s) => {
                skew(clamp(s.getVelocity() / -260, -6, 6))
                setCaseIdx(stepAt(s.progress, cards.length))
                const bar = q("[data-bar]")[0] as HTMLElement | undefined
                if (bar) bar.style.transform = "scaleX(" + s.progress + ")"
              },
              onLeave: () => skew(0),
              onLeaveBack: () => skew(0),
            },
          })
          cards.forEach((card) => {
            const m = card.querySelector("[data-mock]")
            if (m) gsap.fromTo(m, { xPercent: 12, rotate: 2 }, { xPercent: -12, rotate: -2, ease: "none", scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true } })
          })
          undo.push(() => {
            ScrollTrigger.removeEventListener("refreshInit", fit)
            workEl.removeAttribute("data-h")
            workEl.style.height = ""
          })
        }

        /* 7. process: the tree grows with the steps */
        const proc = q("[data-process]")[0] as HTMLElement | undefined
        if (proc) {
          const grow = gsap.timeline({ scrollTrigger: { trigger: proc.querySelector(".ovs-steps"), start: "top 65%", end: "bottom 70%", scrub: 0.8 } })
          gsap.set(proc.querySelectorAll("[data-grow]"), { strokeDasharray: 1, strokeDashoffset: 1 })
          gsap.set(proc.querySelectorAll("[data-leaves] > *"), { scale: 0, transformOrigin: "50% 50%" })
          for (let s = 0; s < 4; s++) {
            const stems = proc.querySelectorAll('[data-grow="' + s + '"]')
            if (stems.length) grow.to(stems, { strokeDashoffset: 0, duration: 1, ease: "none" }, s)
            grow.to(proc.querySelectorAll('[data-leaves="' + s + '"] > *'), { scale: 1, duration: 0.7, stagger: s === 3 ? 0.01 : 0.12, ease: "back.out(2.2)" }, s + 0.45)
          }
          grow.fromTo(proc.querySelector("[data-sun]"), { attr: { cy: 210 } }, { attr: { cy: 70 }, duration: 4, ease: "none" }, 0)
          proc.querySelectorAll(".ovs-step").forEach((st) => ScrollTrigger.create({ trigger: st, start: "top 62%", end: "bottom 62%", toggleClass: { targets: st, className: "ovs-on" } }))
        }

        /* 8. finale: you drop back down into the trees */
        const fin = q("[data-fin]")[0] as HTMLElement | undefined
        if (fin) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: fin, start: "top 75%", end: "bottom bottom", scrub: 0.9 } })
          tl.fromTo(fin.querySelector(".ovs-window"), { "--ovs-wi": "9%", "--ovs-wr": "40px" }, { "--ovs-wi": "0%", "--ovs-wr": "0px", ease: "power2.inOut", duration: 0.6 }, 0)
          const fz = fin.querySelectorAll("[data-zoom]")
          if (fin.querySelector("[data-photo]")) {
            // the rise in reverse: down out of the sky, through the near leaves, into the ring
            tl.fromTo(fz[0], { scale: 2.4, rotate: -6 }, { scale: 1, rotate: 0, ease: "power3.out", duration: 0.9 }, 0)
            tl.fromTo(fz[1], { scale: 3.4, opacity: 1 }, { scale: 1.05, opacity: 0, ease: "power3.out", duration: 0.7 }, 0)
          } else {
            const from = [1.5, 1.9, 2.5, 3.4]
            fz.forEach((z, i) => tl.fromTo(z, { scale: from[i], rotate: i % 2 ? 6 : -6 }, { scale: 1, rotate: 0, ease: "power3.out", duration: 0.9 }, 0))
          }
          tl.fromTo(fin.querySelector(".ovs-fin-copy"), { autoAlpha: 0, y: 60, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }, 0.45)
        }

        /* 9. footer: the wordmark rises letter by letter */
        const wm = q("[data-wordmark]")[0]
        if (wm) gsap.fromTo(wm.querySelectorAll("span"), { yPercent: 105 }, { yPercent: 0, duration: 1.4, stagger: 0.05, ease: "expo.out", scrollTrigger: { trigger: wm, start: "top 98%", once: true } })

        return () => {
          heroIn.current = null
          undo.forEach((f) => f())
        }
      })
    }, r)
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
    // the storyboard is built once (and again only if the photo gives way to
    // the generated canopy); content props only change text inside it
  }, [usePhoto])

  const onHeroReady = React.useCallback(() => {
    heroReady.current = true
    heroIn.current?.()
  }, [])

  const copyEmail = () => {
    const done = () => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    }
    if (navigator.clipboard) navigator.clipboard.writeText(email).then(done, done)
    else done()
  }

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmail(mail)) {
      setMailState("invalid")
      return
    }
    setMailState("sending")
    let ok = true
    try {
      const res = onSubscribe ? await onSubscribe(mail.trim()) : await new Promise((r) => window.setTimeout(() => r(true), 700))
      if (res === false) ok = false
    } catch {
      ok = false
    }
    setMailState(ok ? "done" : "error")
    if (ok) setMail("")
  }

  const svcItems = svc?.items || []
  const style = {
    "--ovs-h": height,
    "--ovs-accent": pal.accent,
    "--ovs-soft": pal.soft,
  } as React.CSSProperties

  return (
    <div ref={root} className={"ovs-root " + className} data-scheme={scheme} data-season={season} data-photo={usePhoto ? "" : undefined} data-menu={menu ? "" : undefined} style={style}>
      <style>{OVS_CSS}</style>
      <a className="ovs-skip" href={"#" + uid + "main"}>
        Pular para o conteúdo
      </a>

      {/* ---------------------------------------------------------- nav */}
      <header className="ovs-nav">
        <div className="ovs-nav-in">
          <a className="ovs-brand" href="#top" aria-label={brand} onClick={(e) => { e.preventDefault(); root.current?.scrollIntoView({ behavior: still ? "auto" : "smooth" }) }}>
            <Image
              src="/images/logos-jagwar/logo_textobranco_horizontal_transparente.png"
              alt={brand}
              width={1670}
              height={378}
              priority
              className="ovs-brand-logo ovs-brand-logo-light"
            />
            <Image
              src="/images/logos-jagwar/logo_textoescuro_horizontal_transparente.png"
              alt={brand}
              width={1670}
              height={378}
              priority
              className="ovs-brand-logo ovs-brand-logo-dark"
            />
          </a>
          <nav className="ovs-links" aria-label="Principal">
            {links.map((l) => (
              <a key={l.label} href={l.href || "#"} onClick={go(l.href)} data-on={l.href && active === l.href.slice(1) ? "" : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ovs-nav-end">
            {themeToggle ? (
              <button type="button" className="ovs-icon-btn" onClick={() => setOverride(scheme === "dark" ? "light" : "dark")} aria-label={scheme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}>
                <svg className="ovs-svg" viewBox="0 0 24 24" aria-hidden="true">
                  {scheme === "dark" ? (
                    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                      <circle cx="12" cy="12" r="4.2" />
                      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
                    </g>
                  ) : (
                    <path d="M20 14.6A8.4 8.4 0 0 1 9.4 4a8.4 8.4 0 1 0 10.6 10.6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  )}
                </svg>
              </button>
            ) : null}
            <GlassmorphismCta
              label="Configurar meu projeto"
              size="sm"
              className="ovs-nav-cta"
              href="/configurar-projeto"
              onClick={book("nav")}
            />
            <button ref={menuBtn} type="button" className="ovs-icon-btn ovs-burger" aria-expanded={menu} aria-controls={uid + "menu"} aria-label="Menu" onClick={() => setMenu((m) => !m)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div id={uid + "menu"} ref={sheet} className="ovs-sheet" role="dialog" aria-modal="true" aria-label="Menu" data-open={menu ? "" : undefined} hidden={!menu}>
        {links.map((l, i) => (
          <a key={l.label} href={l.href || "#"} onClick={go(l.href)} style={{ "--i": i } as React.CSSProperties}>
            <span>0{i + 1}</span>
            {l.label}
          </a>
        ))}
        <GlassmorphismCta
          label="Configurar meu projeto"
          className="ovs-sheet-cta"
          href="/configurar-projeto"
          onClick={book("menu")}
          style={{ "--i": links.length } as React.CSSProperties}
        />
      </div>

      <main id={uid + "main"}>
        {/* ---------------------------------------------------------- hero */}
        <section className="ovs-hero" data-hero data-sec="top" aria-label="Introdução">
          <div
            className="ovs-stage"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a,button")) return
              const b = e.currentTarget.getBoundingClientRect()
              gust.current?.((e.clientX - b.left) / b.width)
            }}
          >
            {usePhoto ? (
              <PhotoCanopy src={photo as string} season={season} scheme={scheme} onReady={onHeroReady} onFail={() => setPhotoFail(true)} />
            ) : (
              <Canopy seed={seed} scheme={scheme} palette={pal} onReady={onHeroReady} />
            )}
            <div className="ovs-falls" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className="ovs-fall" data-fall={i < 5 ? "idle" : "burst"}>
                  <svg className="ovs-svg" viewBox="0 0 24 24" style={{ color: i % 3 ? "var(--ovs-accent)" : "var(--ovs-soft)" }}>
                    <path fill="currentColor" d="M2 12C6 5 14 3.5 22 12c-8 8.5-16 7-20 0z" />
                    <path d="M3 12h17" stroke="rgba(0,0,0,.25)" strokeWidth="0.8" />
                  </svg>
                </span>
              ))}
            </div>
            <div className="ovs-copy">
              {status ? (
                <p className="ovs-status">
                  <i />
                  {status}
                </p>
              ) : null}
              <h1 className="ovs-h1">
                <span className="ovs-line">
                  <span>
                    {H.highlight && H.lead.includes(H.highlight) ? (
                      <>
                        {H.lead.slice(0, H.lead.indexOf(H.highlight))}
                        <em className="ovs-h1-accent">{H.highlight}</em>
                        {H.lead.slice(H.lead.indexOf(H.highlight) + H.highlight.length)}
                      </>
                    ) : (
                      H.lead
                    )}
                  </span>
                </span>
                <span className="ovs-line">
                  <span>
                    {H.line2Lead ? (
                      <>
                        {H.highlight2 && H.line2Lead.includes(H.highlight2) ? (
                          <>
                            {H.line2Lead.slice(0, H.line2Lead.indexOf(H.highlight2))}
                            <em className="ovs-h1-accent">{H.highlight2}</em>
                            {H.line2Lead.slice(H.line2Lead.indexOf(H.highlight2) + H.highlight2.length)}
                          </>
                        ) : (
                          H.line2Lead
                        )}{" "}
                      </>
                    ) : null}
                    <span className="ovs-sr">{words[0]} </span>
                    <span aria-hidden="true">
                      <WordMorph words={words} still={still} />
                    </span>
                    {H.tail ? <> {H.tail}</> : null}
                  </span>
                </span>
              </h1>
              {H.desc ? <p className="ovs-hero-desc">{H.desc}</p> : null}
            </div>
            <a className="ovs-cue" href="#about" onClick={go("#about")}>
              <span className="ovs-cue-line" />
              {H.cue}
            </a>
            <div className="ovs-veil" aria-hidden="true">
              <p className="ovs-above">Precisão cirúrgica</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ partners */}
        <section className="ovs-sec ovs-manifesto ovs-partners" data-sec="about" aria-labelledby={uid + "ptn"}>
          <div className="ovs-wrap">
            <div className="ovs-head">
              <div>
                <Kicker n="01" text="Ecossistema & Parceiros" />
                <span id={uid + "ptn"}>
                  <Split text="Conectados aos principais parceiros de mídia, plataformas e marketplaces." className="ovs-h2" />
                </span>
              </div>
              <p className="ovs-lede" data-rv>
                Operamos de ponta a ponta como Marketing Partners, especialistas em e-commerce, ERPs e marketplaces para escalar marcas de moda feminina com previsibilidade.
              </p>
            </div>
            <div className="ovs-pcloud" data-rv>
              <span className="ovs-pcloud-rule ovs-pcloud-top" aria-hidden="true" />
              <div className="ovs-pgrid" role="list" aria-label="Marketing Partners, E-commerce Partners e Marketplaces">
                {DEFAULT_PARTNERS.map((p, i) => {
                  const rowD = Math.floor(i / 4)
                  const colD = i % 4
                  const rowM = Math.floor(i / 2)
                  const colM = i % 2
                  const altD = (rowD + colD) % 2 === 0
                  const altM = (rowM + colM) % 2 === 0
                  const showCrossD = rowD < 2 && colD < 3
                  const showCrossM = rowM < 5 && colM === 0
                  return (
                    <div
                      key={p.alt}
                      role="listitem"
                      className="ovs-pcell"
                      data-alt-d={altD ? "" : undefined}
                      data-alt-m={altM ? "" : undefined}
                      title={p.alt + " · " + p.category}
                    >
                      {p.darkSrc ? (
                        <>
                          <Image
                            src={p.src}
                            alt={p.alt}
                            width={p.w}
                            height={p.h}
                            className="ovs-pimg ovs-pimg-light"
                            style={{ "--ph": p.displayH + "px" } as React.CSSProperties}
                          />
                          <Image
                            src={p.darkSrc}
                            alt={p.alt}
                            width={p.w}
                            height={p.h}
                            className="ovs-pimg ovs-pimg-dark"
                            style={{ "--ph": p.displayH + "px" } as React.CSSProperties}
                          />
                        </>
                      ) : (
                        <Image
                          src={p.src}
                          alt={p.alt}
                          width={p.w}
                          height={p.h}
                          className="ovs-pimg"
                          style={{ "--ph": p.displayH + "px" } as React.CSSProperties}
                        />
                      )}
                      {showCrossD ? <PlusCrosshair className="ovs-pcross ovs-pcross-d" /> : null}
                      {showCrossM ? <PlusCrosshair className="ovs-pcross ovs-pcross-m" /> : null}
                    </div>
                  )
                })}
              </div>
              <span className="ovs-pcloud-rule ovs-pcloud-bot" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- services */}
        {svc ? (
          <section className="ovs-sec ovs-services" data-sec="services" aria-labelledby={uid + "svc"}>
            <div className="ovs-wrap">
              <div className="ovs-head">
                <div>
                  <Kicker n="02" text={svc.kicker} />
                  <span id={uid + "svc"}>
                    <Split text={svc.title} className="ovs-h2" />
                  </span>
                </div>
                <p className="ovs-lede" data-rv>
                  {svc.text}
                </p>
              </div>
              <div className="ovs-svc-list" onPointerLeave={() => setSvcHover(svcOpen >= 0 ? svcOpen : 0)}>
                <div className="ovs-svc-prev" aria-hidden="true">
                  {svcItems.map((s, i) => (
                    <div key={i} className="ovs-svc-art" data-on={i === svcHover ? "" : undefined}>
                      <ServiceArt art={s.art} />
                    </div>
                  ))}
                </div>
                {svcItems.map((s, i) => {
                  const open = svcOpen === i
                  return (
                    <div key={s.title} className="ovs-svc-row" data-open={open ? "" : undefined} onPointerEnter={() => setSvcHover(i)}>
                      <h3 className="ovs-svc-h">
                        <button type="button" aria-expanded={open} aria-controls={uid + "svc" + i} onClick={() => setSvcOpen(open ? -1 : i)} onFocus={() => setSvcHover(i)}>
                          <span className="ovs-svc-n">0{i + 1}</span>
                          <span className="ovs-svc-t">{s.title}</span>
                          <span className="ovs-svc-time">{s.time}</span>
                          <span className="ovs-plus" aria-hidden="true" />
                        </button>
                      </h3>
                      <div id={uid + "svc" + i} className="ovs-fold" role="region" aria-label={s.title}>
                        <div>
                          <div className="ovs-svc-body">
                            <div className="ovs-svc-mob-art" aria-hidden="true">
                              <ServiceArt art={s.art} />
                            </div>
                            <p>{s.text}</p>
                            <ul>
                              {s.tags.map((t) => (
                                <li key={t}>
                                  <ServiceTagIcon tag={t} />
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* ----------------------------------------------------------- work */}
        {wk ? (
          <section className="ovs-work" data-work data-sec="work" aria-labelledby={uid + "wk"}>
            <div className="ovs-work-stage" data-workstage>
              <div className="ovs-wrap ovs-work-head">
                <div>
                  <Kicker n="03" text={wk.kicker} />
                  <span id={uid + "wk"}>
                    <Split text={wk.title} className="ovs-h2" />
                  </span>
                </div>
                <div className="ovs-work-meter" aria-hidden="true">
                  <span className="ovs-work-count">
                    {String(caseIdx + 1).padStart(2, "0")} / {String(wk.items.length + 1).padStart(2, "0")}
                  </span>
                  <span className="ovs-work-track">
                    <i data-bar />
                  </span>
                </div>
              </div>
              <div className="ovs-track" data-track>
                {wk.items.map((c, i) => (
                  <article key={c.client + i} className="ovs-card" data-card style={{ "--t1": (c.tint || ["#EFE4D4", "#C48F56"])[0], "--t2": (c.tint || ["#EFE4D4", "#C48F56"])[1] } as React.CSSProperties}>
                    <a href={c.href || "#contact"} onClick={c.href ? undefined : go("#contact")} className="ovs-card-link" aria-label={c.client + ": " + c.title}>
                      <div className="ovs-card-art ovs-card-art-photo">
                        {c.image ? (
                          <Image
                            src={c.image}
                            alt={c.client}
                            fill
                            sizes="(max-width: 820px) 100vw, 760px"
                            className="ovs-card-photo"
                            style={{ objectPosition: c.imagePos || "center" }}
                          />
                        ) : null}
                        <span className="ovs-card-scrim" aria-hidden="true" />
                        {c.badge ? (
                          <span className="ovs-card-pill">
                            <CreatorCardIcon icon={c.icon} />
                            <span>{c.badge}</span>
                          </span>
                        ) : null}
                      </div>
                      <div className="ovs-card-meta">
                        <p className="ovs-card-client">
                          <span className="ovs-card-ico-box" aria-hidden="true">
                            <CreatorCardIcon icon={c.icon} />
                          </span>
                          <span>{c.client}</span>
                        </p>
                        <h3 className="ovs-card-title">{c.title}</h3>
                        <p className="ovs-card-metric">
                          <b>{c.metric}</b>
                          <span>{c.metricLabel}</span>
                        </p>
                      </div>
                    </a>
                  </article>
                ))}
                <article className="ovs-card ovs-card-next" data-card>
                  <Image
                    src="/images/img03-vertical-estoque.jpg"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 820px) 100vw, 440px"
                    className="ovs-card-next-bg"
                  />
                  <span className="ovs-card-next-scrim" aria-hidden="true" />
                  <Link href="/configurar-projeto" onClick={book("work")} className="ovs-card-link">
                    <BrandMark />
                    <span className="ovs-card-next-t">{wk.next}</span>
                    <GlassmorphismCta asSpan label="Configurar meu projeto" />
                  </Link>
                </article>
              </div>
            </div>
          </section>
        ) : null}

        {/* -------------------------------------------------------- process */}
        {pr ? (
          <section className="ovs-sec ovs-process" data-process data-sec="process" aria-labelledby={uid + "pr"}>
            <div className="ovs-wrap">
              <Kicker n="04" text={pr.kicker} />
              <span id={uid + "pr"}>
                <Split text={pr.title} className="ovs-h2 ovs-h2-wide" />
              </span>
              <div className="ovs-proc-grid">
                <div className="ovs-tree-col">
                  <div className="ovs-tree-stick">
                    <GrowingTree seed={seed} />
                  </div>
                </div>
                <ol className="ovs-steps">
                  {pr.steps.map((s, i) => (
                    <li key={s.name} className="ovs-step">
                      <p className="ovs-step-k">
                        <span>0{i + 1}</span>
                        <b>{s.name}</b>
                        <em>{s.when}</em>
                      </p>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------------------------------------------------- cta-band */}
        <section className="ovs-cta-band" data-sec="quotes" aria-labelledby={uid + "ctab"}>
          <div className="ovs-wrap">
            <div className="ovs-cta-card" data-rv>
              <div className="ovs-dapple" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="ovs-cta-card-in">
                <p className="ovs-kicker ovs-kicker-light">
                  <span>Operação real, não apenas teoria</span>
                </p>
                <h2 id={uid + "ctab"} className="ovs-cta-h">
                  Sua marca pronta para escalar com{" "}
                  <em className="ovs-cta-accent">previsibilidade e ROI comprovado.</em>
                </h2>
                <p className="ovs-cta-p">
                  Chega de investir sem clareza no retorno. Configure seu projeto com a JAGWAR, conecte sua loja à Creator Economy e acompanhe cada aprovação, entrega e resultado ao vivo no JAGWAR OS gratuito.
                </p>
                <ul className="ovs-cta-chips" aria-label="Diferenciais inclusos">
                  <li>
                    <CheckCircle2 size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span>JAGWAR OS 100% gratuito</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span>Creator Economy &amp; TikTok Shop</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span>Estratégia orientada a ROI</span>
                  </li>
                </ul>
                <div className="ovs-cta-act">
                  <GlassmorphismCta
                    label="Configurar meu projeto"
                    size="lg"
                    href="/configurar-projeto"
                    onClick={book("cta-band")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- pricing */}
        {pc ? (
          <section className="ovs-sec ovs-pricing" data-sec="pricing" aria-labelledby={uid + "pc"}>
            <div className="ovs-wrap">
              <div className="ovs-head">
                <div>
                  <Kicker n="05" text={pc.kicker} />
                  <span id={uid + "pc"}>
                    <Split text={pc.title} className="ovs-h2" />
                  </span>
                </div>
                <div className="ovs-head-side" data-rv>
                  <p className="ovs-lede">{pc.text}</p>
                  <div className="ovs-seg" role="group" aria-label="Ciclo" data-q={quarterly ? "" : undefined}>
                    <span className="ovs-seg-pill" aria-hidden="true" />
                    <button type="button" aria-pressed={!quarterly} onClick={() => setQuarterly(false)}>
                      Mensal
                    </button>
                    <button type="button" aria-pressed={quarterly} onClick={() => setQuarterly(true)}>
                      Trimestral <em>{pc.quarterlyNote}</em>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ovs-plans">
                {pc.plans.map((p) => {
                  const v = planPrice(p, quarterly)
                  return (
                    <div
                      key={p.name}
                      className="ovs-plan"
                      data-featured={p.featured ? "" : undefined}
                      data-rv
                      onPointerMove={(e) => {
                        if (still || e.pointerType !== "mouse") return
                        const b = e.currentTarget.getBoundingClientRect()
                        gsap.to(e.currentTarget, { rotateY: ((e.clientX - b.left) / b.width - 0.5) * 7, rotateX: -((e.clientY - b.top) / b.height - 0.5) * 7, duration: 0.5, ease: "power3.out", transformPerspective: 900 })
                        e.currentTarget.style.setProperty("--mx", e.clientX - b.left + "px")
                        e.currentTarget.style.setProperty("--my", e.clientY - b.top + "px")
                      }}
                      onPointerLeave={(e) => gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1,0.5)" })}
                    >
                      {p.featured ? <span className="ovs-plan-ring" aria-hidden="true" /> : null}
                      <div className="ovs-plan-in">
                        <p className="ovs-plan-name">
                          {p.name}
                          {p.badge ? <span>{p.badge}</span> : null}
                        </p>
                        <p className="ovs-plan-price">
                          {v === null ? <span>Sob consulta</span> : <Price value={v} currency={currency} still={still} />}
                          {v !== null ? <small>{p.unit === "/mo" ? "/mês" : p.unit || ""}</small> : null}
                        </p>
                        <p className="ovs-plan-text">{p.text}</p>
                        <ul>
                          {p.features.map((f) => (
                            <li key={f}>
                              <svg className="ovs-svg" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                        <GlassmorphismCta
                          label="Configurar meu projeto"
                          className="ovs-plan-cta"
                          href="/configurar-projeto"
                          onClick={book("plan:" + p.name)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* ------------------------------------------------------------ faq */}
        {fq ? (
          <section className="ovs-sec ovs-faq" data-sec="faq" aria-labelledby={uid + "fq"}>
            <div className="ovs-wrap ovs-faq-grid">
              <div>
                <Kicker n="06" text={fq.kicker} />
                <span id={uid + "fq"}>
                  <Split text={fq.title} className="ovs-h2" />
                </span>
                <div className="ovs-faq-card" data-rv>
                  <p>{fq.text}</p>
                  <button type="button" className="ovs-btn ovs-btn-line" onClick={copyEmail}>
                    <span aria-live="polite">{copied ? "E-mail copiado" : email}</span>
                  </button>
                </div>
              </div>
              <div className="ovs-acc">
                {fq.items.map((f, i) => {
                  const open = faqOpen === i
                  return (
                    <div key={f.q} className="ovs-acc-item" data-open={open ? "" : undefined} data-rv>
                      <h3>
                        <button type="button" aria-expanded={open} aria-controls={uid + "fa" + i} onClick={() => setFaqOpen(open ? -1 : i)}>
                          {f.q}
                          <span className="ovs-plus" aria-hidden="true" />
                        </button>
                      </h3>
                      <div id={uid + "fa" + i} className="ovs-fold" role="region" aria-label={f.q}>
                        <div>
                          <p>{f.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------------------------------------------------- finale */}
        {cta ? (
          <section className="ovs-fin" data-fin data-sec="contact" aria-labelledby={uid + "cta"}>
            <div className="ovs-fin-stage">
              <div className="ovs-window">
                {usePhoto ? <PhotoCanopy src={photo as string} season={season} scheme={scheme} turn /> : <Canopy seed={seed + 31} scheme={scheme} palette={pal} lazy />}
                <div className="ovs-fin-copy">
                  <h2 id={uid + "cta"} className="ovs-fin-h">
                    {cta.title || DEFAULT_CTA.title}
                  </h2>
                  <p>{cta.text || DEFAULT_CTA.text}</p>
                  <div className="ovs-fin-actions">
                    <GlassmorphismCta
                      label="Configurar meu projeto"
                      size="lg"
                      href="/configurar-projeto"
                      onClick={book("finale")}
                    />
                    <a
                      href={buildWhatsAppUrl("Olá! Vim pelo site da JAGWAR e gostaria de falar sobre o meu e-commerce.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ovs-btn ovs-btn-glass ovs-btn-xl"
                    >
                      <WhatsAppIcon size={18} />
                      <span>Falar no WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      {/* ---------------------------------------------------------- footer */}
      {ft ? (
        <footer className="ovs-foot">
          <div className="ovs-wrap">
            <div className="ovs-foot-top">
              <form className="ovs-news" onSubmit={subscribe} noValidate>
                <Image
                  src="/images/logos-jagwar/logo_textobranco_horizontal_transparente.png"
                  alt={brand}
                  width={1670}
                  height={378}
                  className="ovs-foot-logo"
                />
                <label htmlFor={uid + "mail"}>Insights de performance e growth para marcas de moda feminina.</label>
                <div className="ovs-news-row">
                  <input
                    id={uid + "mail"}
                    type="email"
                    autoComplete="email"
                    placeholder="voce@suamarca.com.br"
                    value={mail}
                    onChange={(e) => {
                      setMail(e.target.value)
                      if (mailState !== "sending") setMailState("idle")
                    }}
                    aria-invalid={mailState === "invalid" || mailState === "error"}
                    aria-describedby={uid + "mailmsg"}
                  />
                  <button type="submit" className="ovs-btn ovs-btn-lime" disabled={mailState === "sending"}>
                    {mailState === "sending" ? "Enviando" : "Inscrever-se"}
                  </button>
                </div>
                <p id={uid + "mailmsg"} className="ovs-news-msg" aria-live="polite" data-state={mailState}>
                  {mailState === "invalid" ? "Esse e-mail não parece válido." : mailState === "error" ? "Algo deu errado. Tente novamente?" : mailState === "done" ? "Inscrição confirmada. Você receberá nossos próximos conteúdos." : ""}
                </p>
              </form>
              <div className="ovs-foot-cols">
                {ft.columns.map((col) => (
                  <div key={col.title}>
                    <p>{col.title}</p>
                    <ul>
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a href={l.href || "#"} onClick={go(l.href)}>
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p>{ft.city}</p>
                  <ul>
                    <li className="ovs-clock">
                      <i />
                      <Clock timeZone={ft.timeZone} />
                    </li>
                    <li>
                      <a href={"mailto:" + email}>{email}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="ovs-wordmark" data-wordmark aria-hidden="true">
            {Array.from(brand).map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </div>
          <div className="ovs-wrap ovs-foot-bottom">
            <span>
              © <CurrentYear /> {brand} Performance &amp; Growth. Todos os direitos reservados.
            </span>
            <span>{ft.note}</span>
            <button type="button" className="ovs-top" onClick={() => root.current?.scrollIntoView({ behavior: still ? "auto" : "smooth" })}>
              Voltar ao topo
              <svg className="ovs-svg ovs-arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </footer>
      ) : null}
    </div>
  )
}

const OVS_CSS = `
.ovs-root{--ovs-ink:#0A0A09;--ovs-ink2:#463F32;--ovs-paper:#F5F0E8;--ovs-card:#FCF9F4;--ovs-mist:#EFE4D4;--ovs-line:rgba(70,63,50,.16);--ovs-bark:#463F32;--ovs-leaf2:#8C6438;--ovs-forest:#0A0A09;--ovs-hero-ink:#0A0A09;--ovs-sans:"Inter Display","Inter","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;--ovs-serif:"Bodoni Moda","Didot","Bodoni 72","Playfair Display","Libre Caslon Display","Times New Roman","Liberation Serif",serif;position:relative;min-height:var(--ovs-h);background:var(--ovs-paper);color:var(--ovs-ink);font-family:var(--ovs-sans);font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:clip;isolation:isolate;text-align:left}
.ovs-root[data-scheme="dark"]{--ovs-ink:#F5F0E8;--ovs-ink2:#A39B8F;--ovs-paper:#0A0A09;--ovs-card:#141312;--ovs-mist:#1C1A17;--ovs-line:rgba(239,228,212,.15);--ovs-bark:#8C7A5B;--ovs-leaf2:#9E7140;--ovs-forest:#070706;--ovs-hero-ink:#F5F0E8}
.ovs-root[data-season="autumn"]{--ovs-leaf2:#c9702a;--ovs-bark:#4a3020}
.ovs-root[data-season="blossom"]{--ovs-leaf2:#d98aa9;--ovs-bark:#4a3036}
.ovs-root *,.ovs-root *::before,.ovs-root *::after{box-sizing:border-box}
.ovs-root :where(h1,h2,h3,p,ul,ol,dl,dd,figure,blockquote){margin:0;padding:0}
.ovs-root :where(ul,ol){list-style:none}
.ovs-root :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.ovs-root :where(a){color:inherit;text-decoration:none}
.ovs-root :where(a,button,input):focus-visible{outline:2px solid var(--ovs-accent);outline-offset:3px;border-radius:6px}
.ovs-svg{display:block;max-width:none;flex:none}
.ovs-cv{display:block;max-width:none;width:100%;height:100%}
.ovs-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ovs-skip{position:absolute;left:16px;top:-60px;z-index:100;background:var(--ovs-ink);color:var(--ovs-paper);padding:10px 16px;border-radius:999px;transition:top .2s}
.ovs-skip:focus{top:12px}
.ovs-wrap{width:100%;max-width:1240px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}

/* nav */
.ovs-nav{position:sticky;top:0;z-index:60;height:84px;margin-bottom:-84px;display:flex;align-items:center;padding:0 clamp(12px,2.4vw,28px);transition:transform .6s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.ovs-root[data-navhide] .ovs-nav{transform:translateY(-110%)}
.ovs-nav-in{pointer-events:auto;width:100%;max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:20px;height:60px;padding:0 10px 0 18px;border-radius:999px;border:1px solid rgba(255,255,255,.5);background:rgba(245,240,232,.42);backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3);transition:background .5s,border-color .5s,box-shadow .5s;color:var(--ovs-hero-ink)}
.ovs-root[data-scheme="dark"] .ovs-nav-in{background:rgba(10,10,9,.44);border-color:rgba(239,228,212,.14)}
.ovs-root[data-solid] .ovs-nav-in{background:color-mix(in oklab,var(--ovs-paper) 78%,transparent);border-color:var(--ovs-line);box-shadow:0 10px 40px -18px rgba(10,10,9,.35);backdrop-filter:blur(18px) saturate(1.4);-webkit-backdrop-filter:blur(18px) saturate(1.4);color:var(--ovs-ink)}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-nav-in{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none;color:#F5F0E8;text-shadow:0 1px 14px rgba(0,0,0,.35)}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-nav-cta{text-shadow:none}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-links{background:rgba(10,10,9,.32);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);box-shadow:inset 0 0 0 1px rgba(239,228,212,.18)}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-links a{opacity:.92}
.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-links a[data-on]{background:rgba(239,228,212,.18)}
.ovs-brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:18px;letter-spacing:-.02em;flex:none}
.ovs-brand-logo{display:block;height:34px;width:auto;object-fit:contain}
.ovs-brand-logo-light{display:none}
.ovs-brand-logo-dark{display:block}
.ovs-root[data-scheme="dark"] .ovs-brand-logo-light,.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-brand-logo-light{display:block}
.ovs-root[data-scheme="dark"] .ovs-brand-logo-dark,.ovs-root[data-photo]:not([data-solid]):not([data-menu]) .ovs-brand-logo-dark{display:none}
.ovs-brandmark{width:26px;height:26px;border-radius:7px;object-fit:cover;display:block;flex:none}
.ovs-links{display:flex;gap:4px;margin:0 auto;padding:4px;border-radius:999px}
.ovs-links a{position:relative;padding:8px 14px;border-radius:999px;font-size:14.5px;font-weight:500;opacity:.78;transition:opacity .3s,background .4s}
.ovs-links a:hover{opacity:1}
.ovs-links a[data-on]{opacity:1;background:color-mix(in oklab,currentColor 9%,transparent)}
.ovs-nav-end{display:flex;align-items:center;gap:8px}
.ovs-icon-btn{width:42px;height:42px;border-radius:999px;display:grid;place-items:center;transition:background .3s}
.ovs-icon-btn:hover{background:color-mix(in oklab,currentColor 10%,transparent)}
.ovs-icon-btn .ovs-svg{width:19px;height:19px}
.ovs-burger{display:none;flex-direction:column;justify-content:center;align-items:center;gap:5px}
.ovs-burger span{display:block;width:18px;height:1.6px;background:currentColor;border-radius:2px;transition:transform .4s}
.ovs-burger[aria-expanded="true"] span:first-child{transform:translateY(3.3px) rotate(45deg)}
.ovs-burger[aria-expanded="true"] span:last-child{transform:translateY(-3.3px) rotate(-45deg)}
.ovs-sheet{position:fixed;inset:0;z-index:55;background:var(--ovs-paper);padding:110px 28px 40px;display:flex;flex-direction:column;gap:6px}
.ovs-sheet[hidden]{display:none}
.ovs-sheet a{font-size:clamp(34px,9vw,52px);font-weight:500;letter-spacing:-.04em;display:flex;align-items:baseline;gap:14px;animation:ovs-in .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 60ms)}
.ovs-sheet a span{font-size:13px;letter-spacing:0;color:var(--ovs-ink2)}
.ovs-sheet .ovs-btn,.ovs-sheet .ovs-sheet-cta{font-size:16px;letter-spacing:0;margin-top:24px;align-self:flex-start}
@keyframes ovs-in{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}

/* buttons */
.ovs-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:44px;padding:0 20px;border-radius:999px;font-size:14.5px;font-weight:550;white-space:nowrap;transition:background .3s,color .3s,box-shadow .3s,border-color .3s}
.ovs-btn .ovs-arrow{width:15px;height:15px;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.ovs-btn:hover .ovs-arrow{transform:translateX(4px)}
.ovs-btn-dark{background:var(--ovs-ink);color:var(--ovs-paper)}
.ovs-btn-dark:hover{box-shadow:0 12px 30px -12px color-mix(in oklab,var(--ovs-ink) 70%,transparent)}
.ovs-btn-line{border:1px solid var(--ovs-line);background:transparent}
.ovs-btn-line:hover{border-color:var(--ovs-ink)}
.ovs-btn-lime{background:var(--ovs-soft);color:#0A0A09}
.ovs-btn-lime:hover{box-shadow:0 12px 34px -10px var(--ovs-soft)}
.ovs-btn-glass{background:rgba(245,240,232,.52);border:1px solid rgba(239,228,212,.7);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#0A0A09}
.ovs-root[data-scheme="dark"] .ovs-btn-glass{background:rgba(10,10,9,.45);border-color:rgba(239,228,212,.18);color:#F5F0E8}
.ovs-btn-xl{height:56px;padding:0 28px;font-size:16px}
.ovs-btn[disabled]{opacity:.6;cursor:progress}

/* hero */
.ovs-hero{position:relative;height:calc(var(--ovs-h) * 2.3)}
.ovs-root[data-still] .ovs-hero{height:auto}
.ovs-stage{position:sticky;top:0;height:var(--ovs-h);min-height:560px;overflow:hidden;display:grid;place-items:center;color:var(--ovs-hero-ink)}
.ovs-canopy{position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#E5D7C3,#EFE4D4 60%,#F5F0E8)}
.ovs-root[data-scheme="dark"] .ovs-canopy{background:linear-gradient(180deg,#0A0A09,#141312 60%,#26231F)}
.ovs-photo{background:#463F32}
.ovs-root[data-scheme="dark"] .ovs-photo{background:#0A0A09}
.ovs-photo .ovs-layer{inset:-3%}
.ovs-photo::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,10,9,.42) 0%,rgba(245,240,232,.56) 24%,rgba(245,240,232,.60) 76%,rgba(10,10,9,.46) 100%)}
.ovs-root[data-scheme="dark"] .ovs-photo::after{background:radial-gradient(120% 95% at 50% 48%,rgba(10,10,9,.48) 20%,rgba(10,10,9,.78) 100%),linear-gradient(180deg,rgba(10,10,9,.65) 0%,rgba(10,10,9,.35) 28%,rgba(10,10,9,.35) 72%,rgba(10,10,9,.72) 100%)}
.ovs-pcv{object-fit:cover}
.ovs-fore .ovs-zoom{opacity:0}
.ovs-sway-p{animation:ovs-breathe 16s ease-in-out infinite alternate}
@keyframes ovs-breathe{0%{transform:scale(1) rotate(-.25deg)}100%{transform:scale(1.035) rotate(.35deg)}}
.ovs-skybox{position:absolute;inset:-4%;will-change:transform}
.ovs-skycv{image-rendering:auto}
.ovs-layer{position:absolute;inset:-6%;will-change:transform,opacity}
.ovs-zoom{position:absolute;inset:0;will-change:transform}
.ovs-sway{position:absolute;inset:0;transform-origin:50% 50%;animation:ovs-sway 9s ease-in-out infinite alternate}
.ovs-sway-0{animation-duration:13s}
.ovs-sway-1{animation-duration:11s;animation-direction:alternate-reverse}
.ovs-sway-2{animation-duration:9s}
.ovs-sway-3{animation-duration:7.5s;animation-direction:alternate-reverse}
@keyframes ovs-sway{0%{transform:rotate(-.45deg) scale(1.005)}50%{transform:rotate(.15deg) translate(.3%,-.2%)}100%{transform:rotate(.5deg) scale(1.012)}}
.ovs-falls{position:absolute;inset:0;pointer-events:none;perspective:600px}
.ovs-fall{position:absolute;left:0;top:0;width:22px;height:22px;opacity:0;visibility:hidden}
.ovs-fall .ovs-svg{width:22px;height:22px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.15))}
.ovs-copy{position:relative;z-index:2;text-align:center;padding:0 20px;display:flex;flex-direction:column;align-items:center;will-change:transform}
.ovs-root[data-photo] .ovs-copy::before{content:"";position:absolute;left:-14%;right:-14%;top:-24%;bottom:-26%;z-index:-1;border-radius:50%;background:radial-gradient(closest-side,rgba(245,240,232,.78),rgba(239,228,212,.42) 58%,rgba(239,228,212,0));filter:blur(14px);pointer-events:none}
.ovs-root[data-photo][data-scheme="dark"] .ovs-copy::before{background:radial-gradient(closest-side,rgba(10,10,9,.64),rgba(20,19,18,.34) 58%,rgba(10,10,9,0))}
.ovs-status{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:500;padding:7px 14px 7px 12px;border-radius:999px;background:rgba(245,240,232,.55);border:1px solid rgba(239,228,212,.75);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);margin-bottom:26px}
.ovs-root[data-scheme="dark"] .ovs-status{background:rgba(10,10,9,.45);border-color:rgba(239,228,212,.14)}
.ovs-status i{width:8px;height:8px;border-radius:50%;background:#C48F56;box-shadow:0 0 0 0 rgba(196,143,86,.6);animation:ovs-pulse 2.2s infinite}
@keyframes ovs-pulse{0%{box-shadow:0 0 0 0 rgba(196,143,86,.55)}70%{box-shadow:0 0 0 9px rgba(196,143,86,0)}100%{box-shadow:0 0 0 0 rgba(196,143,86,0)}}
.ovs-h1{font-size:clamp(26px,3.3vw,52px);line-height:1.12;letter-spacing:-.04em;font-weight:500;text-shadow:0 1px 24px rgba(245,240,232,.4)}
.ovs-root[data-scheme="dark"] .ovs-h1{text-shadow:0 2px 30px rgba(0,0,0,.35)}
.ovs-h1-accent{font-style:normal;color:var(--ovs-accent)}
.ovs-root[data-scheme="dark"] .ovs-h1-accent{color:var(--ovs-soft)}
.ovs-line{display:block;overflow:hidden;padding:.04em .08em .1em;margin:-.04em 0 -.1em}
.ovs-line>span{display:inline-block;transform-origin:0 100%}
.ovs-morph{display:inline-block;position:relative;vertical-align:bottom;font-family:var(--ovs-serif);font-weight:400;letter-spacing:.005em;transition:none;white-space:nowrap;perspective:400px}
.ovs-morph-word{display:inline-block;white-space:nowrap;transform:scaleX(.8);transform-origin:0 50%}
.ovs-ch{display:inline-block;transform-origin:50% 50% -.4em;backface-visibility:hidden}
.ovs-hero-desc{margin-top:clamp(18px,2.2vw,28px);max-width:40em;font-size:clamp(17px,1.45vw,21px);line-height:1.55;font-weight:450;color:color-mix(in oklab,var(--ovs-ink) 82%,transparent);text-shadow:0 1px 18px rgba(245,240,232,.5);text-wrap:balance}
.ovs-root[data-scheme="dark"] .ovs-hero-desc{color:rgba(245,240,232,.9);text-shadow:0 2px 22px rgba(0,0,0,.45)}
.ovs-trusted{margin-top:clamp(24px,3vw,40px);font-size:clamp(12.5px,.95vw,14px);font-weight:500;letter-spacing:-.005em;opacity:.9}
.ovs-logos{margin-top:18px;display:flex;flex-direction:column;align-items:center;gap:16px}
.ovs-logo-row{display:flex;flex-wrap:wrap;justify-content:center;column-gap:clamp(22px,2.8vw,40px);row-gap:14px}
.ovs-logo-row>span{display:flex}
.ovs-logo{display:inline-flex;align-items:center;gap:8px;font-size:clamp(16px,1.5vw,22px);line-height:1;transition:opacity .4s,transform .5s cubic-bezier(.2,.8,.2,1);cursor:default}
.ovs-logo .ovs-svg{height:1.15em;width:auto}
.ovs-logo-heavy{font-weight:700;letter-spacing:-.04em}
.ovs-logo-sans{font-weight:500;letter-spacing:-.03em}
.ovs-logo-serif{font-family:var(--ovs-serif);font-weight:400;letter-spacing:-.01em}
.ovs-logos:hover .ovs-logo{opacity:.4}
.ovs-logos .ovs-logo:hover{opacity:1;transform:translateY(-3px)}
.ovs-cue{position:absolute;z-index:2;bottom:26px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:550;padding:10px 18px 10px 14px;border-radius:999px;background:rgba(245,240,232,.48);border:1px solid rgba(239,228,212,.65);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);white-space:nowrap}
.ovs-root[data-scheme="dark"] .ovs-cue{background:rgba(10,10,9,.45);border-color:rgba(239,228,212,.14)}
.ovs-root[data-photo] .ovs-cue{background:transparent;border-color:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;color:#F5F0E8;text-shadow:0 1px 12px rgba(0,0,0,.45);font-size:11px;letter-spacing:.2em}
.ovs-cue-line{width:1px;height:18px;background:linear-gradient(currentColor,transparent);position:relative;overflow:hidden}
.ovs-cue-line::after{content:"";position:absolute;left:0;top:-40%;width:1px;height:40%;background:var(--ovs-paper);animation:ovs-drip 2.2s cubic-bezier(.6,0,.2,1) infinite}
@keyframes ovs-drip{to{top:110%}}
.ovs-veil{position:absolute;left:0;right:0;top:0;height:200%;z-index:3;pointer-events:none;transform:translateY(50%);background:radial-gradient(60% 18% at 22% 50%,var(--ovs-mist) 30%,transparent 70%),radial-gradient(50% 16% at 78% 52%,var(--ovs-mist) 30%,transparent 70%),linear-gradient(180deg,transparent 0%,color-mix(in oklab,var(--ovs-mist) 70%,transparent) 38%,var(--ovs-mist) 50%,var(--ovs-mist) 100%);display:flex;align-items:center;justify-content:center}
.ovs-above{margin-top:52%;font-family:var(--ovs-serif);font-size:clamp(28px,4vw,56px);letter-spacing:-.02em;color:var(--ovs-ink);opacity:0}
.ovs-root[data-still] .ovs-veil{display:none}

/* sections */
.ovs-sec{position:relative;padding:clamp(90px,12vw,170px) 0}
.ovs-kicker{display:flex;width:fit-content;gap:10px;align-items:center;font-size:12.5px;font-weight:500;letter-spacing:.03em;color:var(--ovs-ink);padding:7px 16px;border-radius:999px;background:color-mix(in oklab,var(--ovs-card) 58%,transparent);border:1px solid color-mix(in oklab,var(--ovs-accent) 34%,var(--ovs-line));box-shadow:0 0 18px -4px color-mix(in oklab,var(--ovs-accent) 26%,transparent),inset 0 1px 0 rgba(255,255,255,.45);backdrop-filter:blur(14px) saturate(1.3);-webkit-backdrop-filter:blur(14px) saturate(1.3);margin-bottom:24px}
.ovs-root[data-scheme="dark"] .ovs-kicker{color:rgba(245,240,232,.9);background:rgba(245,240,232,.055);border-color:rgba(216,173,123,.28);box-shadow:0 0 22px -4px rgba(196,143,86,.28),inset 0 1px 0 rgba(245,240,232,.14)}
.ovs-kicker-n{font-variant-numeric:tabular-nums;color:var(--ovs-accent);font-weight:600}
.ovs-root[data-scheme="dark"] .ovs-kicker-n{color:var(--ovs-soft)}
.ovs-kicker-light{color:rgba(245,240,232,.92);background:rgba(245,240,232,.07);border-color:rgba(216,173,123,.34);box-shadow:0 0 22px -4px rgba(196,143,86,.32),inset 0 1px 0 rgba(245,240,232,.18);margin-left:auto;margin-right:auto}
.ovs-kicker-light .ovs-kicker-n{color:var(--ovs-soft)}
.ovs-h2{font-size:clamp(34px,4.6vw,68px);line-height:1.02;letter-spacing:-.045em;font-weight:500;max-width:15em}
.ovs-h2-wide{max-width:18em}
.ovs-w{display:inline-block;overflow:hidden;vertical-align:top;padding:.06em .02em .12em;margin:-.06em -.02em -.12em}
.ovs-w>span{display:inline-block;transform-origin:0 100%}
.ovs-lede{font-size:clamp(16px,1.25vw,18.5px);color:var(--ovs-ink2);max-width:28em;line-height:1.55}
.ovs-head{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;flex-wrap:wrap;margin-bottom:clamp(44px,6vw,80px)}
.ovs-head-side{display:flex;flex-direction:column;gap:22px;align-items:flex-start}

/* manifesto & partners */
.ovs-manifesto{background:linear-gradient(180deg,var(--ovs-mist),var(--ovs-paper) 62%);padding-top:clamp(70px,9vw,130px)}
.ovs-pcloud{position:relative;margin-top:clamp(36px,4.5vw,60px)}
.ovs-pcloud-rule{position:absolute;left:50%;width:100vw;transform:translateX(-50%);height:1px;background:var(--ovs-line);pointer-events:none}
.ovs-pcloud-top{top:0}
.ovs-pcloud-bot{bottom:0}
.ovs-pgrid{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-left:1px solid var(--ovs-line);border-right:1px solid var(--ovs-line)}
.ovs-pcell{position:relative;display:flex;align-items:center;justify-content:center;min-height:132px;padding:28px 24px;border-right:1px solid var(--ovs-line);border-bottom:1px solid var(--ovs-line);background:transparent;transition:background .35s ease}
.ovs-pcell:nth-child(4n){border-right:0}
.ovs-pcell:nth-last-child(-n+4){border-bottom:0}
.ovs-pcell[data-alt-d]{background:color-mix(in oklab,var(--ovs-mist) 45%,var(--ovs-card))}
.ovs-root[data-scheme="dark"] .ovs-pcell[data-alt-d]{background:rgba(239,228,212,.045)}
.ovs-pcell:hover{background:color-mix(in oklab,var(--ovs-soft) 18%,var(--ovs-card))}
.ovs-root[data-scheme="dark"] .ovs-pcell:hover{background:rgba(196,143,86,.09)}
.ovs-pimg{display:block;width:auto;height:var(--ph,36px);max-width:160px;object-fit:contain;pointer-events:none;user-select:none;filter:grayscale(1) contrast(1.06);opacity:.76;transition:filter .4s ease,opacity .4s ease,transform .5s cubic-bezier(.2,.8,.2,1)}
.ovs-pimg-dark{display:none}
.ovs-pcell:hover .ovs-pimg{filter:grayscale(0) contrast(1);opacity:1;transform:scale(1.05)}
.ovs-root[data-scheme="dark"] .ovs-pimg{filter:brightness(0) invert(1);opacity:.82}
.ovs-root[data-scheme="dark"] .ovs-pcell:hover .ovs-pimg{filter:brightness(0) invert(1);opacity:1;transform:scale(1.05)}
.ovs-root[data-scheme="dark"] .ovs-pimg-light{display:none}
.ovs-root[data-scheme="dark"] .ovs-pimg-dark{display:block;filter:none;opacity:.86}
.ovs-root[data-scheme="dark"] .ovs-pcell:hover .ovs-pimg-dark{filter:none;opacity:1;transform:scale(1.05)}
.ovs-pcross{position:absolute;right:-11px;bottom:-11px;z-index:2;width:21px;height:21px;color:var(--ovs-accent);opacity:.65;pointer-events:none}
.ovs-pcross-m{display:none}
@media (max-width:820px){.ovs-pgrid{grid-template-columns:repeat(2,minmax(0,1fr))}.ovs-pcell{min-height:110px;padding:22px 16px;border-right:1px solid var(--ovs-line);border-bottom:1px solid var(--ovs-line);background:transparent}.ovs-pcell:nth-child(4n){border-right:1px solid var(--ovs-line)}.ovs-pcell:nth-child(2n){border-right:0}.ovs-pcell:nth-last-child(-n+4){border-bottom:1px solid var(--ovs-line)}.ovs-pcell:nth-last-child(-n+2){border-bottom:0}.ovs-pcell[data-alt-d]{background:transparent}.ovs-root[data-scheme="dark"] .ovs-pcell[data-alt-d]{background:transparent}.ovs-pcell[data-alt-m]{background:color-mix(in oklab,var(--ovs-mist) 45%,var(--ovs-card))}.ovs-root[data-scheme="dark"] .ovs-pcell[data-alt-m]{background:rgba(239,228,212,.045)}.ovs-pcross-d{display:none}.ovs-pcross-m{display:block}.ovs-pimg{height:calc(var(--ph,36px) * .84);max-width:132px}}
.ovs-man{font-size:clamp(28px,4.1vw,62px);line-height:1.14;letter-spacing:-.04em;font-weight:500;max-width:21em}
.ovs-pic{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;height:.92em;margin:0 .22em .1em 0;border-radius:999px;transform-origin:50% 50%}
.ovs-pic-team{gap:0;padding:0 .08em}
.ovs-pic-team i{width:.92em;height:.92em;border-radius:50%;display:grid;place-items:center;font-style:normal;letter-spacing:0;color:#0A0A09;border:.06em solid var(--ovs-paper);margin-left:-.18em}
.ovs-pic-team b{font-size:.27em;font-weight:650}
.ovs-pic-team i:nth-child(1){background:var(--ovs-soft);margin-left:0}
.ovs-pic-team i:nth-child(2){background:#EFE4D4}
.ovs-pic-team i:nth-child(3){background:#C48F56}
.ovs-pic-chart{width:1.9em;background:var(--ovs-accent);color:var(--ovs-soft);padding:.16em .26em}
.ovs-pic-chart .ovs-svg{width:100%;height:100%}
.ovs-pic-leaf{width:.92em;background:var(--ovs-ink);overflow:hidden}
.ovs-pic-leaf .ovs-brandmark{width:100%;height:100%;border-radius:50%}
.ovs-stats{margin-top:clamp(70px,9vw,120px);display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
.ovs-stat{position:relative;padding-top:22px;display:flex;flex-direction:column;gap:6px}
.ovs-stat-rule{position:absolute;left:0;right:0;top:0;height:1px;background:var(--ovs-ink);opacity:.2;transform-origin:0 50%}
.ovs-stat dd{font-size:clamp(40px,4.6vw,66px);letter-spacing:-.05em;font-weight:500;line-height:1;font-variant-numeric:tabular-nums}
.ovs-stat dt{font-size:14px;color:var(--ovs-ink2);max-width:15em}

/* services */
.ovs-svc-list{position:relative}
.ovs-svc-prev{position:absolute;left:0;top:0;z-index:4;width:240px;height:160px;pointer-events:none;border-radius:16px;border:1px solid var(--ovs-line);box-shadow:0 30px 60px -20px rgba(10,10,9,.45);overflow:hidden;visibility:hidden;opacity:0;background:var(--ovs-card)}
.ovs-svc-art{position:absolute;inset:0;clip-path:inset(100% 0 0 0);transition:clip-path .6s cubic-bezier(.7,0,.2,1)}
.ovs-svc-art[data-on]{clip-path:inset(0 0 0 0)}
.ovs-svc-art .ovs-svg,.ovs-svc-img{display:block;width:240px;height:160px;object-fit:cover}
.ovs-svc-mob-art{display:none}
.ovs-svc-row{--ovs-rule:1;position:relative;border-top:1px solid transparent}
.ovs-svc-row::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--ovs-line);transform:scaleX(var(--ovs-rule));transform-origin:0 50%}
.ovs-svc-row:last-child{border-bottom:1px solid var(--ovs-line)}
.ovs-svc-row::after{content:"";position:absolute;inset:0;background:color-mix(in oklab,var(--ovs-soft) 26%,transparent);transform:scaleY(0);transform-origin:50% 100%;transition:transform .55s cubic-bezier(.7,0,.2,1);z-index:-1}
.ovs-svc-row:hover::after,.ovs-svc-row[data-open]::after{transform:scaleY(1)}
.ovs-svc-h button{width:100%;display:grid;grid-template-columns:70px 1fr auto 40px;align-items:center;gap:20px;padding:clamp(22px,2.6vw,34px) 10px;text-align:left}
.ovs-svc-n{font-size:14px;color:var(--ovs-ink2);font-variant-numeric:tabular-nums}
.ovs-svc-t{font-size:clamp(26px,3.4vw,50px);letter-spacing:-.045em;font-weight:500;line-height:1.05;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.ovs-svc-row:hover .ovs-svc-t,.ovs-svc-row[data-open] .ovs-svc-t{transform:translateX(14px)}
.ovs-svc-time{font-size:14px;color:var(--ovs-ink2)}
.ovs-plus{position:relative;width:40px;height:40px;border-radius:50%;border:1px solid var(--ovs-line);transition:transform .5s cubic-bezier(.2,.8,.2,1),background .3s,border-color .3s;justify-self:end}
.ovs-plus::before,.ovs-plus::after{content:"";position:absolute;left:50%;top:50%;width:13px;height:1.6px;background:currentColor;transform:translate(-50%,-50%)}
.ovs-plus::after{transform:translate(-50%,-50%) rotate(90deg)}
.ovs-root [aria-expanded="true"] .ovs-plus{transform:rotate(135deg);background:var(--ovs-ink);color:var(--ovs-paper);border-color:var(--ovs-ink)}
.ovs-fold{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s cubic-bezier(.2,.8,.2,1)}
.ovs-fold>div{overflow:hidden;min-height:0}
.ovs-root [data-open]>.ovs-fold{grid-template-rows:1fr}
.ovs-svc-body{display:grid;grid-template-columns:70px 1fr;gap:20px;padding:0 10px 34px}
.ovs-svc-body p{grid-column:2;font-size:clamp(16px,1.3vw,19px);color:var(--ovs-ink2);max-width:34em}
.ovs-svc-body ul{grid-column:2;display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
.ovs-svc-body li{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;padding:6px 13px;border-radius:999px;background:var(--ovs-card);border:1px solid var(--ovs-line)}
.ovs-svc-tag-ico{color:var(--ovs-accent);flex:none}
.ovs-root[data-scheme="dark"] .ovs-svc-tag-ico{color:var(--ovs-soft)}

/* work */
.ovs-work{position:relative;background:var(--ovs-paper)}
.ovs-work-stage{padding:clamp(60px,8vw,110px) 0}
.ovs-work[data-h] .ovs-work-stage{position:sticky;top:0;height:var(--ovs-h);min-height:640px;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:96px 0 40px}
.ovs-work-head{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;margin-bottom:clamp(30px,4vw,48px)}
.ovs-work-head .ovs-h2{font-size:clamp(34px,4.2vw,62px)}
.ovs-work-meter{display:none;flex-direction:column;align-items:flex-end;gap:12px;min-width:180px}
.ovs-work[data-h] .ovs-work-meter{display:flex}
.ovs-work-count{font-variant-numeric:tabular-nums;font-size:14px;font-weight:500}
.ovs-work-track{width:180px;height:2px;background:var(--ovs-line);border-radius:2px;overflow:hidden}
.ovs-work-track i{display:block;height:100%;background:var(--ovs-ink);transform:scaleX(0);transform-origin:0 50%}
.ovs-track{display:flex;flex-direction:column;gap:28px;padding:0 clamp(20px,4vw,48px)}
.ovs-work[data-h] .ovs-track{flex-direction:row;width:max-content;padding-left:max(clamp(20px,4vw,48px),calc((100vw - 1240px) / 2 + 48px));padding-right:clamp(20px,4vw,48px);will-change:transform}
.ovs-card{flex:none;display:flex;flex-direction:column;width:100%;border-radius:28px;overflow:hidden;background:var(--ovs-card);border:1px solid var(--ovs-line);transform-origin:50% 100%}
.ovs-work[data-h] .ovs-card{width:min(64vw,760px);height:min(calc(var(--ovs-h) - 370px),540px);min-height:360px}
.ovs-card-link{display:flex;flex-direction:column;flex:1;min-height:0}
.ovs-card-art{position:relative;flex:1;min-height:240px;overflow:hidden;background:radial-gradient(120% 90% at 80% 10%,var(--t1),var(--t2));display:flex;align-items:center;justify-content:center;padding:28px}
.ovs-card-art-photo{padding:0;background:#141312}
.ovs-card-photo{object-fit:cover;transition:transform 1s cubic-bezier(.2,.8,.2,1)}
.ovs-card:hover .ovs-card-photo{transform:scale(1.045)}
.ovs-card-scrim{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,10,9,.08) 0%,rgba(10,10,9,.18) 58%,rgba(10,10,9,.68) 100%)}
.ovs-card-pill{position:absolute;left:20px;bottom:18px;z-index:2;display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;font-size:12px;font-weight:550;letter-spacing:.02em;color:#F5F0E8;background:rgba(10,10,9,.62);border:1px solid rgba(216,173,123,.32);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.ovs-card-pill .ovs-card-ico{width:14px;height:14px;color:var(--ovs-soft)}
.ovs-root[data-scheme="dark"] .ovs-card-art{background:radial-gradient(120% 90% at 80% 10%,color-mix(in oklab,var(--t2) 60%,#000),color-mix(in oklab,var(--t2) 22%,#000))}
.ovs-card-sun{position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;background:radial-gradient(rgba(255,255,255,.75),transparent 70%);transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.ovs-card:hover .ovs-card-sun{transform:translate(-40px,30px) scale(1.3)}
.ovs-card-meta{display:grid;grid-template-columns:1fr auto;gap:10px 26px;padding:22px 26px 24px;align-items:end}
.ovs-card-client{grid-column:1/-1;display:flex;align-items:center;gap:10px;font-weight:600;font-size:16px;line-height:1.25}
.ovs-card-ico-box{width:32px;height:32px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;flex:none;background:color-mix(in oklab,var(--ovs-accent) 14%,transparent);border:1px solid color-mix(in oklab,var(--ovs-accent) 32%,transparent)}
.ovs-root[data-scheme="dark"] .ovs-card-ico-box{background:rgba(216,173,123,.12);border-color:rgba(216,173,123,.28)}
.ovs-card-ico{color:var(--ovs-accent);flex:none}
.ovs-root[data-scheme="dark"] .ovs-card-ico{color:var(--ovs-soft)}
.ovs-card-title{font-size:clamp(15px,1.2vw,17.5px);letter-spacing:-.015em;font-weight:450;line-height:1.45;color:var(--ovs-ink2);max-width:34em}
.ovs-card-metric{text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.ovs-card-metric b{font-size:clamp(22px,2.1vw,30px);letter-spacing:-.04em;font-weight:600;line-height:1.05;color:var(--ovs-accent);white-space:nowrap}
.ovs-root[data-scheme="dark"] .ovs-card-metric b{color:var(--ovs-soft)}
.ovs-card-metric span{font-size:12px;color:var(--ovs-ink2);max-width:16em}
.ovs-card-next{position:relative;background:#0A0A09;color:#FFFFFF;border-color:rgba(239,228,212,.16)}
.ovs-work[data-h] .ovs-card-next{width:min(40vw,440px)}
.ovs-card-next-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
.ovs-card-next:hover .ovs-card-next-bg{transform:scale(1.05)}
.ovs-card-next-scrim{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(10,10,9,.62) 0%,rgba(10,10,9,.72) 55%,rgba(10,10,9,.86) 100%)}
.ovs-card-next .ovs-card-link{position:relative;z-index:2;align-items:flex-start;justify-content:space-between;padding:34px;gap:40px;min-height:300px}
.ovs-card-next .ovs-brandmark{width:64px;height:64px;border-radius:16px;box-shadow:0 12px 28px -10px rgba(10,10,9,.45);transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.ovs-card-next:hover .ovs-brandmark{transform:scale(1.06)}
.ovs-card-next-t{font-size:clamp(36px,3.6vw,56px);letter-spacing:-.05em;line-height:1;font-weight:500;color:#FFFFFF;text-shadow:0 2px 24px rgba(0,0,0,.45)}
.ovs-card-next .ovs-btn-dark{background:#F5F0E8;color:#0A0A09}
.ovs-mock{position:relative;width:min(100%,520px);border-radius:16px;background:var(--ovs-card);box-shadow:0 40px 80px -30px rgba(10,10,9,.45),0 0 0 1px rgba(0,0,0,.05);overflow:hidden;transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.ovs-card:hover .ovs-mock{transform:translateY(-8px)}
.ovs-mk-bar{display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-bottom:1px solid var(--ovs-line)}
.ovs-mk-bar i{width:8px;height:8px;border-radius:50%;background:var(--ovs-line)}
.ovs-mk-bar span{margin-left:10px;font-size:11px;color:var(--ovs-ink2)}
.ovs-mk-body{display:flex;min-height:190px}
.ovs-mk-side{width:52px;border-right:1px solid var(--ovs-line);display:flex;flex-direction:column;gap:10px;padding:14px 12px}
.ovs-mk-side span{height:8px;border-radius:4px;background:var(--ovs-line)}
.ovs-mk-side span[data-on]{background:var(--ovs-accent)}
.ovs-mk-main{flex:1;padding:16px;display:flex;flex-direction:column;gap:9px;min-width:0}
.ovs-mk-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.ovs-mk-kpis div{border:1px solid var(--ovs-line);border-radius:10px;padding:8px 10px;display:flex;flex-direction:column}
.ovs-mk-kpis span{font-size:10px;color:var(--ovs-ink2)}
.ovs-mk-kpis b{font-size:17px;letter-spacing:-.03em;font-weight:600}
.ovs-mk-chart{width:100%;height:96px}
.ovs-bubble{align-self:flex-start;max-width:82%;font-size:11.5px;line-height:1.35;padding:8px 11px;border-radius:12px 12px 12px 4px;background:var(--ovs-mist)}
.ovs-bubble-me{align-self:flex-end;background:var(--ovs-ink);color:var(--ovs-paper);border-radius:12px 12px 4px 12px}
.ovs-mk-wave{display:flex;align-items:center;gap:3px;height:32px;margin-top:2px}
.ovs-mk-wave i{flex:1;border-radius:2px;background:var(--ovs-accent);opacity:.7}
.ovs-mk-sm{font-size:10.5px;color:var(--ovs-ink2)}
.ovs-mk-h{font-size:16px;font-weight:600;letter-spacing:-.02em}
.ovs-mk-line{height:7px;border-radius:4px;background:var(--ovs-line)}
.ovs-mk-chips{display:flex;gap:6px}
.ovs-mk-chips span{font-size:10px;padding:4px 8px;border-radius:999px;background:color-mix(in oklab,var(--ovs-soft) 45%,transparent)}
.ovs-mock-phone{width:220px;border-radius:30px;padding:16px 16px 20px;display:flex;flex-direction:column;gap:8px;border:6px solid #0A0A09}
.ovs-phone-notch{width:70px;height:16px;border-radius:999px;background:#0A0A09;align-self:center;margin:-6px 0 6px}
.ovs-mk-big{font-size:24px;letter-spacing:-.04em;font-weight:600}
.ovs-phone-split{display:flex;gap:4px;height:8px;margin-bottom:6px}
.ovs-phone-split span{border-radius:4px;background:var(--ovs-accent)}
.ovs-phone-split span+span{background:#463F32}
.ovs-mk-row{display:flex;align-items:center;gap:8px;font-size:12px;padding:7px 0;border-top:1px solid var(--ovs-line)}
.ovs-mk-row i{width:9px;height:9px;border-radius:3px}
.ovs-mk-row b{margin-left:auto;font-weight:600}

/* process */
.ovs-process{background:linear-gradient(180deg,var(--ovs-paper),color-mix(in oklab,var(--ovs-soft) 14%,var(--ovs-paper)))}
.ovs-proc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,6vw,90px);margin-top:clamp(40px,6vw,80px)}
.ovs-tree-col{position:relative}
.ovs-tree-stick{position:sticky;top:max(100px,calc(50svh - 280px));height:min(560px,70svh);display:flex;align-items:center;justify-content:center}
.ovs-tree{width:auto;height:min(560px,70svh)}
.ovs-steps{display:flex;flex-direction:column}
.ovs-step{min-height:min(68svh,560px);display:flex;flex-direction:column;justify-content:center;gap:14px;opacity:.28;transition:opacity .7s;border-top:1px solid var(--ovs-line);padding:30px 0}
.ovs-step.ovs-on{opacity:1}
.ovs-root[data-still] .ovs-step{opacity:1;min-height:0}
.ovs-step-k{display:flex;align-items:baseline;gap:12px;font-size:14px}
.ovs-step-k span{color:var(--ovs-ink2);font-variant-numeric:tabular-nums}
.ovs-step-k b{font-family:var(--ovs-serif);font-weight:400;font-size:22px;color:var(--ovs-accent)}
.ovs-root[data-scheme="dark"] .ovs-step-k b{color:var(--ovs-soft)}
.ovs-step-k em{font-style:normal;margin-left:auto;color:var(--ovs-ink2)}
.ovs-step h3{font-size:clamp(34px,3.8vw,56px);letter-spacing:-.045em;font-weight:500;line-height:1}
.ovs-step p:last-child{font-size:clamp(16px,1.3vw,19px);color:var(--ovs-ink2);max-width:28em}

/* persuasive high-contrast cta band */
.ovs-cta-band{position:relative;overflow:hidden;background:#FFFFFF;padding:clamp(76px,10vw,136px) 0}
.ovs-cta-band::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 80% at 15% 15%,rgba(239,228,212,.55),transparent 65%),radial-gradient(55% 75% at 88% 85%,rgba(196,143,86,.18),transparent 65%)}
.ovs-cta-card{position:relative;overflow:hidden;border-radius:32px;background:#0A0A09;color:#F5F0E8;border:1px solid rgba(216,173,123,.28);box-shadow:0 36px 90px -28px rgba(10,10,9,.45),0 0 0 1px rgba(196,143,86,.14);padding:clamp(48px,7vw,92px) clamp(24px,5vw,76px);text-align:center}
.ovs-cta-card-in{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;max-width:860px;margin:0 auto}
.ovs-cta-h{font-size:clamp(30px,4.4vw,60px);line-height:1.06;letter-spacing:-.042em;font-weight:500;color:#F5F0E8;text-wrap:balance}
.ovs-cta-accent{font-style:normal;color:#D8AD7B}
.ovs-cta-p{margin-top:22px;font-size:clamp(16px,1.35vw,19.5px);line-height:1.58;color:rgba(245,240,232,.78);max-width:36em;text-wrap:balance}
.ovs-cta-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:28px}
.ovs-cta-chips li{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;font-size:13px;font-weight:500;color:rgba(245,240,232,.88);background:rgba(245,240,232,.05);border:1px solid rgba(216,173,123,.22)}
.ovs-cta-chips svg{color:#D8AD7B;flex:none}
.ovs-cta-act{margin-top:34px;display:flex;justify-content:center}
.ovs-dapple{position:absolute;inset:0;pointer-events:none;z-index:1}
.ovs-dapple i{position:absolute;border-radius:50%;filter:blur(50px);background:radial-gradient(var(--ovs-soft),transparent 65%);opacity:.22;mix-blend-mode:screen;animation:ovs-dap 18s ease-in-out infinite alternate}
.ovs-dapple i:nth-child(1){width:520px;height:420px;left:-120px;top:-120px}
.ovs-dapple i:nth-child(2){width:380px;height:380px;right:6%;top:20%;animation-duration:23s;animation-direction:alternate-reverse}
.ovs-dapple i:nth-child(3){width:300px;height:260px;left:35%;bottom:-80px;animation-duration:15s}
.ovs-dapple i:nth-child(4){width:200px;height:200px;right:30%;top:-40px;animation-duration:12s;opacity:.3}
@keyframes ovs-dap{0%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,40px) scale(1.15)}100%{transform:translate(-40px,70px) scale(.9)}}

/* pricing */
.ovs-seg{position:relative;display:inline-flex;padding:4px;border-radius:999px;background:var(--ovs-card);border:1px solid var(--ovs-line)}
.ovs-seg button{position:relative;z-index:1;height:38px;padding:0 18px;border-radius:999px;font-size:14px;font-weight:500;transition:color .4s;display:inline-flex;align-items:center;gap:8px}
.ovs-seg button[aria-pressed="true"]{color:var(--ovs-paper)}
.ovs-seg em{font-style:normal;font-size:11.5px;padding:2px 7px;border-radius:999px;background:var(--ovs-soft);color:#0A0A09}
.ovs-seg-pill{position:absolute;top:4px;bottom:4px;left:4px;width:96px;border-radius:999px;background:var(--ovs-ink);transition:transform .55s cubic-bezier(.7,0,.2,1),width .55s cubic-bezier(.7,0,.2,1)}
.ovs-seg[data-q] .ovs-seg-pill{transform:translateX(96px);width:calc(100% - 104px)}
.ovs-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:stretch}
.ovs-plan{position:relative;display:flex;border-radius:26px;background:var(--ovs-card);border:1px solid var(--ovs-line);transform-style:preserve-3d;overflow:hidden}
.ovs-plan::before{content:"";position:absolute;inset:0;background:radial-gradient(300px circle at var(--mx,50%) var(--my,0%),color-mix(in oklab,var(--ovs-soft) 30%,transparent),transparent 60%);opacity:0;transition:opacity .5s;pointer-events:none}
.ovs-plan:hover::before{opacity:1}
.ovs-plan[data-featured]{background:var(--ovs-forest);color:#F5F0E8;border-color:transparent}
.ovs-plan-ring{position:absolute;inset:-60%;background:conic-gradient(from 0deg,transparent 0 70%,var(--ovs-soft) 85%,transparent 100%);animation:ovs-spin 6s linear infinite;opacity:.9}
@keyframes ovs-spin{to{transform:rotate(1turn)}}
.ovs-plan-in{position:relative;flex:1;padding:30px;display:flex;flex-direction:column;gap:18px;border-radius:25px;margin:1.5px;background:inherit}
.ovs-plan[data-featured] .ovs-plan-in{background:var(--ovs-forest)}
.ovs-plan-name{display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:16px}
.ovs-plan-name span{font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;background:var(--ovs-soft);color:#0A0A09}
.ovs-plan-price{display:flex;align-items:baseline;gap:6px;font-size:clamp(40px,3.8vw,56px);letter-spacing:-.05em;font-weight:500;line-height:1;font-variant-numeric:tabular-nums}
.ovs-plan-price small{font-size:15px;letter-spacing:0;opacity:.6;font-weight:400}
.ovs-plan-text{font-size:15px;opacity:.72}
.ovs-plan ul{display:flex;flex-direction:column;gap:11px;padding:20px 0;border-top:1px solid var(--ovs-line);flex:1}
.ovs-plan[data-featured] ul{border-color:rgba(245,240,232,.15)}
.ovs-plan li{display:flex;gap:10px;font-size:14.5px;align-items:flex-start}
.ovs-plan li .ovs-svg{width:16px;height:16px;margin-top:3px;color:var(--ovs-accent)}
.ovs-root[data-scheme="dark"] .ovs-plan li .ovs-svg,.ovs-plan[data-featured] li .ovs-svg{color:var(--ovs-soft)}
.ovs-plan .ovs-btn,.ovs-plan .ovs-plan-cta{width:100%}
.ovs-plan .ovs-btn{height:50px}
.ovs-plan[data-featured] .ovs-btn-line{border-color:rgba(245,240,232,.3)}

/* faq */
.ovs-faq-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(40px,7vw,110px);align-items:start}
.ovs-faq-card{margin-top:40px;padding:26px;border-radius:22px;background:var(--ovs-card);border:1px solid var(--ovs-line);display:flex;flex-direction:column;gap:18px;align-items:flex-start}
.ovs-faq-card p{color:var(--ovs-ink2);font-size:15px}
.ovs-acc-item{border-top:1px solid var(--ovs-line)}
.ovs-acc-item:last-child{border-bottom:1px solid var(--ovs-line)}
.ovs-acc-item h3 button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:26px 0;text-align:left;font-size:clamp(18px,1.6vw,23px);letter-spacing:-.025em;font-weight:500}
.ovs-acc-item .ovs-plus{width:34px;height:34px;flex:none}
.ovs-acc-item p{padding:0 50px 28px 0;color:var(--ovs-ink2);font-size:16px;max-width:36em}

/* finale */
.ovs-fin{position:relative;height:calc(var(--ovs-h) * 1.9);background:var(--ovs-paper)}
.ovs-root[data-still] .ovs-fin{height:auto}
.ovs-fin-stage{position:sticky;top:0;height:var(--ovs-h);min-height:600px;display:grid;place-items:center}
.ovs-window{--ovs-wi:0%;--ovs-wr:0px;position:absolute;inset:0;clip-path:inset(var(--ovs-wi) round var(--ovs-wr));overflow:hidden;display:grid;place-items:center;color:var(--ovs-hero-ink)}
.ovs-fin-copy{position:relative;z-index:2;text-align:center;display:flex;flex-direction:column;align-items:center;gap:22px;padding:0 24px;max-width:980px}
.ovs-fin-h{font-size:clamp(40px,6vw,96px);line-height:1;letter-spacing:-.05em;font-weight:500;text-shadow:0 1px 30px rgba(245,240,232,.4)}
.ovs-root[data-scheme="dark"] .ovs-fin-h{text-shadow:0 2px 30px rgba(0,0,0,.4)}
.ovs-fin-copy>p{font-size:clamp(16px,1.3vw,19px);max-width:30em;font-weight:500;opacity:.85}
.ovs-fin-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px}

/* footer */
.ovs-foot{position:relative;background:var(--ovs-forest);color:#F5F0E8;padding-top:clamp(70px,8vw,110px);overflow:hidden}
.ovs-foot-top{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:60px}
.ovs-foot-logo{display:block;height:36px;width:auto;object-fit:contain;margin-bottom:24px}
.ovs-news label{display:block;font-size:clamp(22px,2vw,30px);letter-spacing:-.035em;line-height:1.15;font-weight:500;max-width:15em}
.ovs-news-row{display:flex;gap:8px;margin-top:26px;padding:6px;border-radius:999px;background:rgba(245,240,232,.07);border:1px solid rgba(245,240,232,.14);max-width:460px}
.ovs-news input{flex:1;min-width:0;background:transparent;border:0;color:inherit;font:inherit;font-size:15px;padding:0 16px;outline:none}
.ovs-news input::placeholder{color:rgba(245,240,232,.45)}
.ovs-news-row:focus-within{border-color:var(--ovs-soft)}
.ovs-news-msg{min-height:24px;margin-top:10px;font-size:14px;color:rgba(245,240,232,.7)}
.ovs-news-msg[data-state="invalid"],.ovs-news-msg[data-state="error"]{color:#f3a98f}
.ovs-news-msg[data-state="done"]{color:var(--ovs-soft)}
.ovs-foot-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.ovs-foot-cols p{font-size:13px;color:rgba(245,240,232,.5);margin-bottom:16px}
.ovs-foot-cols ul{display:flex;flex-direction:column;gap:9px}
.ovs-foot-cols a{font-size:15px;position:relative;background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .5s cubic-bezier(.2,.8,.2,1);padding-bottom:2px}
.ovs-foot-cols a:hover{background-size:100% 1px}
.ovs-clock{display:flex;align-items:center;gap:8px;font-size:15px;font-variant-numeric:tabular-nums}
.ovs-clock i{width:7px;height:7px;border-radius:50%;background:#C48F56;animation:ovs-pulse 2.2s infinite}
.ovs-wordmark{display:flex;justify-content:center;font-size:clamp(80px,20.5vw,330px);line-height:.8;letter-spacing:-.07em;font-weight:600;margin-top:clamp(60px,8vw,110px);overflow:hidden;padding:0 12px .06em;user-select:none}
.ovs-wordmark span{display:inline-block;background:linear-gradient(180deg,var(--ovs-soft),color-mix(in oklab,var(--ovs-soft) 40%,var(--ovs-forest)) 92%);-webkit-background-clip:text;background-clip:text;color:transparent;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.ovs-wordmark span:hover{transform:translateY(-6%)}
.ovs-foot-bottom{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;padding-top:22px;padding-bottom:26px;border-top:1px solid rgba(245,240,232,.12);font-size:13.5px;color:rgba(245,240,232,.6)}
.ovs-top{display:inline-flex;align-items:center;gap:8px;color:#F5F0E8;font-size:13.5px}
.ovs-top .ovs-svg{width:14px;height:14px;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.ovs-top:hover .ovs-svg{transform:translateY(-4px)}

/* responsive */
@media (max-width:1020px){.ovs-links{display:none}.ovs-burger{display:flex}.ovs-nav-in{justify-content:space-between}.ovs-plans{grid-template-columns:1fr;max-width:520px}.ovs-stats{grid-template-columns:repeat(2,1fr);row-gap:40px}.ovs-foot-top{grid-template-columns:1fr}.ovs-svc-time{display:none}.ovs-svc-h button{grid-template-columns:44px 1fr 40px}.ovs-svc-body{grid-template-columns:44px 1fr}}
@media (max-width:820px){.ovs-proc-grid{grid-template-columns:1fr}.ovs-tree-col{display:none}.ovs-step{opacity:1;min-height:0}.ovs-faq-grid{grid-template-columns:1fr}.ovs-foot-cols{grid-template-columns:repeat(2,1fr);row-gap:36px}.ovs-card-meta{grid-template-columns:1fr}.ovs-card-metric{text-align:left;align-items:flex-start}.ovs-svc-prev{display:none}.ovs-svc-mob-art{display:block;grid-column:2;width:100%;max-width:360px;aspect-ratio:3/2;border-radius:14px;overflow:hidden;border:1px solid var(--ovs-line);background:var(--ovs-card);box-shadow:0 18px 40px -18px rgba(10,10,9,.45);margin-bottom:4px}.ovs-svc-mob-art .ovs-svc-img{width:100%;height:100%;object-fit:cover}}
@media (max-width:560px){.ovs-brand-logo{height:26px}.ovs-svc-mob-art{max-width:100%}.ovs-root[data-photo] .ovs-copy::before{left:-4%;right:-4%;top:-14%;bottom:-14%}.ovs-nav-cta{display:none}.ovs-logo-row{column-gap:20px}.ovs-h1{font-size:clamp(36px,10.4vw,56px)}.ovs-quote figcaption{flex-wrap:wrap}.ovs-mock-phone{width:190px}.ovs-mk-kpis b{font-size:14px}.ovs-acc-item p{padding-right:0}}
@media (prefers-reduced-motion:reduce){.ovs-sway,.ovs-sway-p,.ovs-status i,.ovs-clock i,.ovs-dapple i,.ovs-plan-ring,.ovs-cue-line::after,.ovs-sheet a{animation:none}.ovs-dots i{animation:none;transform:scaleX(1)}.ovs-fold,.ovs-svc-art,.ovs-svc-row::after,.ovs-svc-t,.ovs-seg-pill,.ovs-nav,.ovs-mock,.ovs-card-sun{transition:none}}
`

// The canopy photo: looking up through plane trees into a gap of sky. Adobe Stock
// #303147850 (free collection), licensed through the owner's Adobe account,
// cropped, graded toward summer green and encoded as AVIF (1600 x 900).
// Pass your own with the `photo` prop.
const OVS_PHOTO = "/images/img02-horizontal-hero.jpg"
