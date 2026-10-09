import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Binary,
  Boxes,
  Braces,
  ChartNoAxesCombined,
  Code2,
  Compass,
  Database,
  Eye,
  FileStack,
  Fingerprint,
  Gauge,
  GitBranch,
  Globe,
  LayoutGrid,
  Link2,
  MessagesSquare,
  Network,
  PackageSearch,
  Repeat2,
  Rocket,
  ScanSearch,
  ServerCog,
  Settings2,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Target,
  Terminal,
  TrendingUp,
  Unplug,
  Users,
  Waypoints,
  Workflow,
  Zap,
} from 'lucide-react';
import { tr, type Localized } from '../i18n/types';

/* ============================================================================
   BRAND — positioning: Professional IT Engineering Partner
   ========================================================================== */

export const brand = {
  name: 'LABSITE.ID',
  tagline: tr('Your Business Problem Solver', 'Your Business Problem Solver'),
  role: tr('Professional IT Engineering Partner', 'Professional IT Engineering Partner'),
  subtitle: tr(
    'Kami mentransformasi operasional bisnis yang berantakan menjadi sistem digital yang otomatis, andal, dan terukur. Setiap sistem direkayasa khusus — bukan ditempel dari template.',
    'We transform disjointed business operations into digital systems that run automatically, reliably, and measurably. Every system is purpose-engineered — never assembled from a template.',
  ),
} as const;

/**
 * Short engineering micro-copy injected at high-trust points across the page.
 * These are architecture *constraints*, not adjectives — that is what makes them
 * credible where a claim like "high quality" would read as noise.
 */
export const engineeringMarks: readonly Localized[] = [
  tr('Zero-Bloat Architecture', 'Zero-Bloat Architecture'),
  tr('100% Type-Safe Code', '100% Type-Safe Code'),
  tr('Built for High Scale', 'Built for High Scale'),
  tr('Enterprise-Grade Security', 'Enterprise-Grade Security'),
  tr('Audit-Ready Logging', 'Audit-Ready Logging'),
  tr('Schema-First Data', 'Schema-First Data'),
  tr('API-First Integration', 'API-First Integration'),
  tr('100% Tailored Solutions', '100% Tailored Solutions'),
] as const;

/** Header readout. Rendered verbatim as a live operational status line. */
export const systemStatus = {
  label: tr('Status Sistem', 'System Status'),
  state: tr('Semua Mesin Optimal', 'All Engines Operational'),
  latency: '0ms',
  region: 'ID-JKT',
} as const;

/**
 * Rotating engineering log lines surfaced as dismissible toasts. Written as
 * build-telemetry rather than sales copy so the interface reads as a running
 * system, not a brochure.
 */
export type SystemLogEntry = {
  tag: 'LOG' | 'DIAGNOSTIC' | 'DEPLOY' | 'SECURITY' | 'METRIC';
  text: Localized;
};

export const systemLogs: readonly SystemLogEntry[] = [
  {
    tag: 'DIAGNOSTIC',
    text: tr('Latensi nol terverifikasi di seluruh endpoint', 'Zero latency verified across all endpoints'),
  },
  {
    tag: 'DEPLOY',
    text: tr('Sistem konkurensi tinggi dikirim ke produksi', 'High-concurrency system shipped to production'),
  },
  {
    tag: 'SECURITY',
    text: tr('Audit dependensi bersih — nol temuan kritis', 'Dependency audit clean — zero critical findings'),
  },
  {
    tag: 'METRIC',
    text: tr('Otomasi alur kerja memangkas input manual 92%', 'Workflow automation cut manual input by 92%'),
  },
  {
    tag: 'LOG',
    text: tr('Migrasi skema selesai tanpa downtime', 'Schema migration completed with zero downtime'),
  },
  {
    tag: 'DIAGNOSTIC',
    text: tr('Build type-safe lolos dengan 0 error TypeScript', 'Type-safe build passed with 0 TypeScript errors'),
  },
  {
    tag: 'METRIC',
    text: tr('Waktu muat dashboard bertahan di bawah 120ms', 'Dashboard load time held under 120ms at peak'),
  },
  {
    tag: 'SECURITY',
    text: tr('Lapisan autentikasi diperkuat terhadap replay sesi', 'Auth layer hardened against session replay'),
  },
] as const;

export const vision = {
  title: tr('Visi', 'Vision'),
  statement: tr(
    'Menjadi mitra rekayasa sistem yang terbukti bagi bisnis Indonesia: setiap sistem yang kami bangun wajib dibuktikan dengan angka, bukan janji.',
    'To be the proven systems-engineering partner for Indonesian business: every system we build must be demonstrated with numbers, not promises.',
  ),
} as const;

export type Mission = {
  /** Stable key. Not translated — used for React keys and dismissal state. */
  id: string;
  icon: LucideIcon;
  title: Localized;
  description: Localized;
};

export const missions: readonly Mission[] = [
  {
    id: 'diagnose-first',
    icon: ScanSearch,
    title: tr('Diagnosis Sebelum Solusi', 'Diagnosis Before Solution'),
    description: tr(
      'Kami memetakan hambatan operasional Anda lebih dulu. Teknologi hanya dipilih setelah masalahnya terukur.',
      'We map your operational blockers first. Technology is only chosen once the problem has been measured.',
    ),
  },
  {
    id: 'custom-built',
    icon: Binary,
    title: tr('Dibangun khusus, bukan turunan', 'Custom-Built, Not Derived'),
    description: tr(
      'Setiap baris kode ditulis khusus mengikuti proses, data, dan skala bisnis Anda. Nol template, nol plugin mangkuk.',
      'Every line of code is written specifically for your process, data, and scale. Zero templates, zero bowl-shaped plugins.',
    ),
  },
  {
    id: 'stack-earns',
    icon: Settings2,
    title: tr('Stack yang benar-benar bekerja', 'A Stack That Earns Its Keep'),
    description: tr(
      'Kami memilih teknologi yang wajib ada dan membuang sisanya. Dependency yang tidak menambah nilai tidak pernah masuk build.',
      'We keep the technology that must be there and discard the rest. A dependency that adds no value never enters the build.',
    ),
  },
  {
    id: 'proven-automation',
    icon: Repeat2,
    title: tr('Otomasi yang terbukti', 'Automation That Proves Itself'),
    description: tr(
      'Pekerjaan berulang dipindah ke alur digital otomatis yang tercatat, bisa diaudit, dan tidak bergantung satu orang.',
      'Repetitive work moves into an automatic digital flow that is recorded, auditable, and not dependent on one person.',
    ),
  },
  {
    id: 'post-launch',
    icon: BadgeCheck,
    title: tr('Pendampingan pasca-peluncuran', 'Support After Launch'),
    description: tr(
      'Sistem yang berjalan adalah awal hubungan, bukan akhir. Monitoring, perbaikan, dan pengembangan lanjutan kami urus.',
      'A running system is the start of the relationship, not the end. Monitoring, fixes, and continued development are ours to run.',
    ),
  },
] as const;

export type FocusStage = {
  /** Stable key — not translated. */
  id: string;
  step: string;
  icon: LucideIcon;
  name: Localized;
  description: Localized;
};

export const focus = {
  headline: tr('IDENTIFY → SOLVE → BUILD → SCALE', 'IDENTIFY → SOLVE → BUILD → SCALE'),
  stages: [
    {
      id: 'identify',
      step: '01',
      icon: ScanSearch,
      name: tr('Identify', 'Identify'),
      description: tr(
        'Kami audit alur kerja, data, dan titik gesekan yang memotong produktivitas tim Anda.',
        'We audit the workflows, data, and friction points that are cutting into your team\'s productivity.',
      ),
    },
    {
      id: 'solve',
      step: '02',
      icon: Target,
      name: tr('Solve', 'Solve'),
      description: tr(
        'Setiap hambatan dipetakan ke solusi paling masuk akal yang terukur dan bisa dikerjakan cepat.',
        'Each blocker is mapped to the most sensible measurable solution that can be built quickly.',
      ),
    },
    {
      id: 'build',
      step: '03',
      icon: Boxes,
      name: tr('Build', 'Build'),
      description: tr(
        'Solusi dibangun sebagai sistem nyata: web, aplikasi internal, database, dashboard, dan otomasi.',
        'The solution is built as a real system: web, internal apps, database, dashboards, and automation.',
      ),
    },
    {
      id: 'scale',
      step: '04',
      icon: TrendingUp,
      name: tr('Scale', 'Scale'),
      description: tr(
        'Sistem yang berjalan menjadi fondasi ekspansi: efisiensi, jangkauan, dan keputusan berbasis data.',
        'A running system becomes the foundation for expansion: efficiency, reach, and data-driven decisions.',
      ),
    },
  ] as FocusStage[],
} as const;

export const belief = {
  quote: tr(
    'Software harus menghilangkan beban operasional, bukan memindahkannya. Setiap baris yang kami kirim harus dibuktikan lewat runtime-nya.',
    'Software should eliminate operational drag, not relocate it. Every line we ship has to earn its runtime.',
  ),
  points: [
    tr(
      'Tekologi bernilai hanya jika beban yang dihilangkan lebih besar dari beban yang ditambahkan.',
      'Technology is only worth it if the load it removes is heavier than the load it adds.',
    ),
    tr(
      'Satu sistem yang dipakai setiap hari lebih berharga dari sepuluh aplikasi yang tidak pernah dibuka.',
      'One system used every day is worth more than ten apps that are never opened.',
    ),
    tr(
      'Sistem harus bisa dioperasikan tim bisnis sendiri, bukan hanya tim teknis kami.',
      'A system must be operable by the business team itself, not only by our technical team.',
    ),
  ],
} as const;

/* ============================================================================
   SECTION INDEX — mandated Swiss micro-index labels.
   Deliberately language-neutral: these are protocol identifiers, not prose, so
   they stay identical in both locales and never register as mixed language.
   ========================================================================== */

export const sectionIndex = {
  hero: { index: '01', label: 'SYSTEM_INIT' },
  about: { index: 'A1', label: 'PARTNER_PROFILE' },
  focus: { index: 'A2', label: 'OPERATING_BELIEF' },
  problems: { index: '02', label: 'COMMON_DIAGNOSTICS' },
  approach: { index: 'A3', label: 'DELIVERY_PROTOCOL' },
  manifesto: { index: '03', label: 'CODE_MANIFESTO' },
  solutions: { index: '04', label: 'ARCHITECTURE_SOLUTIONS' },
  work: { index: '05', label: 'FEATURED_PROJECTS' },
  faq: { index: 'A4', label: 'ENGAGEMENT_FAQ' },
  contact: { index: '06', label: 'CONTACT_GATEWAY' },
} as const;

/* ============================================================================
   COMMON DIAGNOSTICS
   ========================================================================== */

export type SolutionPillarId = 'presence' | 'process' | 'systems' | 'automation';

export type Problem = {
  id: string;
  icon: LucideIcon;
  title: Localized;
  symptom: Localized;
  impact: Localized;
  solution: Localized;
  pillars: SolutionPillarId[];
  span: 1 | 2;
};

export const problems: readonly Problem[] = [
  {
    id: 'poor-digital-presence',
    icon: Eye,
    title: tr('Poor Digital Presence', 'Poor Digital Presence'),
    symptom: tr(
      'Bisnis Anda hanya hidup di media sosial dan dari mulut ke mulut. Tidak ada identitas digital yang bisa dipercaya calon pembeli.',
      'Your business lives only on social media and word of mouth. There is no digital identity a prospective buyer can trust.',
    ),
    impact: tr(
      'Prospek baru tidak menemukan Anda, dan kredibilitas tidak bisa dibuktikan secara teknis.',
      'New prospects never find you, and credibility cannot be demonstrated technically.',
    ),
    solution: tr(
      'Website korporat yang cepat, SEO-ready, dan dilengkapi business profile terstruktur — sehingga mesin pencari dan calon pelanggan menemukan Anda, lalu langsung memercayai.',
      'A fast, SEO-ready corporate website with a structured business profile — so search engines and prospects find you, and trust you straight away.',
    ),
    pillars: ['presence'],
    span: 2,
  },
  {
    id: 'inefficient-operations',
    icon: Gauge,
    title: tr('Inefficient Operations', 'Inefficient Operations'),
    symptom: tr(
      'Pekerjaan operasional masih manual: dicatat di kertas, dikirim lewat chat pribadi, atau diinput ulang di banyak tempat.',
      'Operational work is still manual: written on paper, sent over personal chat, or re-entered in several places.',
    ),
    impact: tr(
      'Waktu terbuang, kesalahan input naik, dan biaya tenaga kerja meledak seiring transaksi bertambah.',
      'Time is wasted, input errors rise, and labour cost explodes as transaction volume grows.',
    ),
    solution: tr(
      'Digital workflow dan online forms memindahkan proses manual ke alur terstruktur yang tercatat otomatis, bisa diaudit, dan tidak bergantung satu orang.',
      'Digital workflows and online forms move manual processes into a structured flow that is recorded automatically, auditable, and not dependent on one person.',
    ),
    pillars: ['process'],
    span: 1,
  },
  {
    id: 'disorganized-information',
    icon: FileStack,
    title: tr('Disorganized Information', 'Disorganized Information'),
    symptom: tr(
      'Data transaksi, pelanggan, dan produk tersebar di chat, spreadsheet, dan catatan pribadi yang tidak saling terhubung.',
      'Transaction, customer, and product data is scattered across chat, spreadsheets, and unconnected personal notes.',
    ),
    impact: tr(
      'Keputusan bisnis diambil dari data tidak lengkap atau sudah usang.',
      'Business decisions get made on incomplete or stale data.',
    ),
    solution: tr(
      'Database system terpusat dengan skema yang rapi dan data management konsisten — satu sumber kebenaran untuk seluruh tim.',
      'A centralised database system with a clean schema and consistent data management — one source of truth for the whole team.',
    ),
    pillars: ['systems', 'process'],
    span: 1,
  },
  {
    id: 'customer-acquisition',
    icon: Users,
    title: tr('Customer Acquisition', 'Customer Acquisition'),
    symptom: tr(
      'Promosi masih berupa tebakan. Tidak ada jalur penjualan yang jelas dari orang tertarik menjadi pelanggan.',
      'Promotion is still guesswork. There is no clear sales path from an interested person to a customer.',
    ),
    impact: tr(
      'Anggaruran marketing terbuang tanpa umpan balik yang bisa diukur.',
      'Marketing budget burns without measurable feedback.',
    ),
    solution: tr(
      'Landing page terarah, business profile kuat, dan customer management system agar alur penjualan bisa dilacak ujung ke ujung.',
      'A focused landing page, a strong business profile, and a customer management system so the sales path can be tracked end to end.',
    ),
    pillars: ['presence', 'systems'],
    span: 1,
  },
  {
    id: 'poor-internal-systems',
    icon: ServerCog,
    title: tr('Poor Internal Systems', 'Poor Internal Systems'),
    symptom: tr(
      'Belum ada sistem manajemen internal tempat seluruh tim bekerja dari satu sumber data yang sama.',
      'There is no internal management system where the whole team works from one shared data source.',
    ),
    impact: tr(
      'Data antar bagian bentrok, bahkan laporan yang saling bertentangan.',
      'Data across departments contradicts itself — even the reports disagree.',
    ),
    solution: tr(
      'Management system, dashboard, dan internal tools terpadu yang memberi satu gambaran kondisi bisnis real-time ke seluruh tim.',
      'An integrated management system, dashboard, and internal tools that give the whole team one real-time view of the business.',
    ),
    pillars: ['systems'],
    span: 2,
  },
  {
    id: 'disconnected-processes',
    icon: Unplug,
    title: tr('Disconnected Processes', 'Disconnected Processes'),
    symptom: tr(
      'Penjualan, stok, pembayaran, dan pelaporan tidak terhubung, sehingga tiap tahap diisi ulang manual.',
      'Sales, stock, payment, and reporting are not connected, so every stage is re-entered by hand.',
    ),
    impact: tr(
      'Informasi tidak sinkron dan pekerjaan yang sama dikerjakan dua kali.',
      'Information falls out of sync and the same work is done twice.',
    ),
    solution: tr(
      'API dan data integration menghubungkan antar sistem dan channel — termasuk WhatsApp — sehingga data mengalir otomatis tanpa input ulang.',
      'APIs and data integration connect the systems and channels — including WhatsApp — so data flows automatically with no re-entry.',
    ),
    pillars: ['automation', 'systems'],
    span: 1,
  },
  {
    id: 'lack-of-digital-strategy',
    icon: Compass,
    title: tr('Lack of Digital Strategy', 'Lack of Digital Strategy'),
    symptom: tr(
      'Teknologi dibeli karena ikut tren tanpa peta jalan, sehingga tidak ada arah antara biaya dan manfaat.',
      'Technology is bought because it is trending, with no roadmap, so cost and benefit have no shared direction.',
    ),
    impact: tr(
      'Investasi teknologi berubah jadi beban, bukan pendorong pertumbuhan.',
      'Technology investment turns into a burden instead of a growth driver.',
    ),
    solution: tr(
      'Enam tahap delivery protocol kami, dari Discover sampai Optimize, memastikan teknologi dibangun berdasarkan diagnosis dan bukan tebakan.',
      'Our six-stage delivery protocol, from Discover to Optimize, ensures technology is built on diagnosis rather than guesswork.',
    ),
    pillars: ['presence', 'process', 'systems', 'automation'],
    span: 1,
  },
] as const;

/* ============================================================================
   DELIVERY PROTOCOL
   ========================================================================== */

export type ApproachStage = {
  id: string;
  step: string;
  icon: LucideIcon;
  name: Localized;
  description: Localized;
  deliverable: Localized;
};

export const approach: readonly ApproachStage[] = [
  {
    id: 'discover',
    step: '01',
    icon: Compass,
    name: tr('Discover', 'Discover'),
    description: tr(
      'Kami duduk bersama tim Anda memetakan proses kerja, data, dan kendala yang benar-benar terjadi di lapangan — bukan yang tertulis di proposal.',
      'We sit with your team and map the processes, data, and constraints actually happening in the field — not the ones written in a proposal.',
    ),
    deliverable: tr(
      'Dokumen kebutuhan bisnis dan peta masalah',
      'Business requirements document and blocker map',
    ),
  },
  {
    id: 'diagnose',
    step: '02',
    icon: ScanSearch,
    name: tr('Diagnose', 'Diagnose'),
    description: tr(
      'Masalah dianalisis dan diprioritaskan berdasarkan dampak bisnis serta effort-to-fix, bukan berdasarkan tren teknologi.',
      'Problems are analysed and prioritised by business impact and effort-to-fix, not by technology trend.',
    ),
    deliverable: tr('Analisis akar masalah dan daftar prioritas', 'Root-cause analysis and prioritised list'),
  },
  {
    id: 'design',
    step: '03',
    icon: LayoutGrid,
    name: tr('Design', 'Design'),
    description: tr(
      'Arsitektur, skema data, dan alur kerja disimulasikan bersama Anda sebelum satu baris kode ditulis — termasuk simulasi alur pengguna.',
      'Architecture, data schema, and workflows are simulated with you before a single line of code is written — including a walkthrough of the user flow.',
    ),
    deliverable: tr('Desain sistem, alur kerja, dan prototipe', 'System design, workflows, and prototype'),
  },
  {
    id: 'develop',
    step: '04',
    icon: Code2,
    name: tr('Develop', 'Develop'),
    description: tr(
      'Sistem dibangun dengan standar kualitas jelas, type-safe, diuji pada alur nyata, dan dokumentasinya diserahkan utuh.',
      'The system is built to a clear quality bar, type-safe, tested against real flows, and handed over with its full documentation.',
    ),
    deliverable: tr(
      'Website, aplikasi, database, atau sistem yang berjalan',
      'A working website, application, database, or system',
    ),
  },
  {
    id: 'deploy',
    step: '05',
    icon: Globe,
    name: tr('Deploy', 'Deploy'),
    description: tr(
      'Sistem dijalankan di environment produksi dengan domain, hosting, dan integrasi yang sudah disiapkan serta diperkeras.',
      'The system runs in a production environment with domain, hosting, and integrations prepared and hardened.',
    ),
    deliverable: tr('Sistem aktif dan siap digunakan', 'A live system ready to use'),
  },
  {
    id: 'optimize',
    step: '06',
    icon: TrendingUp,
    name: tr('Optimize', 'Optimize'),
    description: tr(
      'Performa dipantau dan diperbaiki berdasarkan pemakaian nyata, lalu backlog perbaikan langsung dikerjakan tanpa nego.',
      'Performance is monitored and fixed against real usage, then the improvement backlog is worked through without negotiation.',
    ),
    deliverable: tr(
      'Laporan perbaikan dan rencana pengembangan berikutnya',
      'Improvement report and next development plan',
    ),
  },
] as const;

/* ============================================================================
   CODE MANIFESTO — [ 03 // CODE_MANIFESTO ]
   ========================================================================== */

export type ManifestoPillar = {
  id: string;
  icon: LucideIcon;
  title: Localized;
  tagline: Localized;
  body: Localized;
  proof: readonly Localized[];
};

export const manifesto: readonly ManifestoPillar[] = [
  {
    id: 'zero-template',
    icon: Terminal,
    title: tr('Kebijakan Tanpa Template', 'Zero Template Policy'),
    tagline: tr('Dibangun dari nol', 'Custom-built from zero'),
    body: tr(
      'Setiap baris kode ditulis khusus mengikuti proses unik bisnis Anda. Tidak ada CMS generik, tidak ada tema instan, tidak ada plugin mangkuk yang menambah beban dan menambah celah.',
      'Every line of code is written specifically for your unique process. No generic CMS, no instant theme, no bowl-shaped plugin that adds weight and attack surface.',
    ),
    proof: [
      tr('Tanpa CMS bloat', 'No CMS bloat'),
      tr('Markup tulis tangan', 'Hand-written markup'),
      tr('Nol utang tema', 'Zero theme debt'),
    ],
  },
  {
    id: 'speed-security',
    icon: ShieldCheck,
    title: tr('Dibangun untuk Kecepatan & Keamanan', 'Built for Speed & Security'),
    tagline: tr('Arsitektur ramping, permukaan diperkeras', 'Lean architecture, hardened surface'),
    body: tr(
      'Arsitektur ringan, bebas bloatware, dependency diminimalkan, dan setiap endpoint dilindungi praktik keamanan standar industri. Cepat dimuat dan sulit ditembus.',
      'Light architecture, free of bloatware, dependencies minimised, and every endpoint protected by industry-standard security practice. Fast to load and hard to breach.',
    ),
    proof: [
      tr('Dependency minimal', 'Minimal dependencies'),
      tr('Endpoint diperkeras', 'Hardened endpoints'),
      tr('Build ter-audit', 'Audited builds'),
    ],
  },
  {
    id: 'scalable-infra',
    icon: Rocket,
    title: tr('Infrastruktur yang Bisa Bertumbuh', 'Scalable Infrastructure'),
    tagline: tr('Siap tumbuh bersama Anda', 'Ready to grow with you'),
    body: tr(
      'Sistem dirancang siap bertumbuh seiring berkembangnya skala bisnis klien: skema data yang rapi, API yang stabil, dan arsitektur yang menyerap lonjakan beban.',
      'Systems are designed to grow with client scale: a clean data schema, a stable API surface, and an architecture that absorbs load spikes.',
    ),
    proof: [
      tr('Data skema-ter dahulu', 'Schema-first data'),
      tr('Permukaan API stabil', 'Stable API surface'),
      tr('Logika uji-beban', 'Load-tested logic'),
    ],
  },
] as const;

/**
 * Dual-lane marquee content. Each claim is an architectural constraint rather
 * than an adjective, which is the only way a scrolling badge strip stays honest
 * instead of decorative.
 */
export const techBadges: readonly Localized[] = [
  tr('100% Type-Safe Code', '100% Type-Safe Code'),
  tr('Built for High Scale', 'Built for High Scale'),
  tr('Enterprise-Grade Security', 'Enterprise-Grade Security'),
  tr('Audit-Ready Logging', 'Audit-Ready Logging'),
  tr('Schema-First Data', 'Schema-First Data'),
  tr('API-First Integration', 'API-First Integration'),
  tr('Zero-Bloat Architecture', 'Zero-Bloat Architecture'),
  tr('100% Tailored Solutions', '100% Tailored Solutions'),
] as const;

/* ============================================================================
   ARCHITECTURE SOLUTIONS
   ========================================================================== */

export type SolutionPillar = {
  id: SolutionPillarId;
  icon: LucideIcon;
  name: Localized;
  summary: Localized;
  features: { icon: LucideIcon; name: Localized; detail: Localized }[];
};

export const solutions: readonly SolutionPillar[] = [
  {
    id: 'presence',
    icon: Globe,
    name: tr('Kehadiran Digital', 'Digital Presence'),
    summary: tr(
      'Membangun identitas digital yang ditemukan mesin pencari, dipercaya calon pembeli, dan menghasilkan pipeline nyata.',
      'Building a digital identity that search engines find, prospective buyers trust, and that produces a real pipeline.',
    ),
    features: [
      {
        icon: Globe,
        name: tr('Website Perusahaan', 'Company Website'),
        detail: tr(
          'Website korporat lengkap dengan struktur halaman yang jelas dan profesional.',
          'A complete corporate website with a clear, professional page structure.',
        ),
      },
      {
        icon: Target,
        name: tr('Landing Page', 'Landing Page'),
        detail: tr(
          'Halaman yang fokus konversi untuk kampanye, promosi, atau uji pasar.',
          'A conversion-focused page for campaigns, promotions, or market testing.',
        ),
      },
      {
        icon: PackageSearch,
        name: tr('Katalog Produk', 'Product Catalog'),
        detail: tr(
          'Katalog produk terstruktur dengan filter dan kategori yang mudah dinavigasi.',
          'A structured product catalog with filters and categories that are easy to navigate.',
        ),
      },
      {
        icon: BadgeCheck,
        name: tr('Profil Bisnis', 'Business Profile'),
        detail: tr(
          'Profil bisnis lengkap dengan informasi, kredibilitas, dan cara menghubungi Anda.',
          'A complete business profile with your information, credibility, and ways to reach you.',
        ),
      },
      {
        icon: ChartNoAxesCombined,
        name: tr('Website SEO-Ready', 'SEO-ready Website'),
        detail: tr(
          'Struktur teknis dan meta yang disiapkan agar mudah ditemukan mesin pencari.',
          'Technical structure and meta prepared so search engines can find you easily.',
        ),
      },
    ],
  },
  {
    id: 'process',
    icon: Workflow,
    name: tr('Digitalisasi Proses', 'Process Digitalization'),
    summary: tr(
      'Memindahkan pekerjaan manual ke alur digital yang tercatat, terukur, dan tidak menggantung di satu orang.',
      'Moving manual work into a digital flow that is recorded, measured, and does not hang on one person.',
    ),
    features: [
      {
        icon: Workflow,
        name: tr('Alur Kerja Digital', 'Digital Workflow'),
        detail: tr(
          'Alur kerja terdefinisi dengan PIC, status, dan titik serah terima yang jelas.',
          'A defined workflow with owners, status, and clear hand-off points.',
        ),
      },
      {
        icon: MessagesSquare,
        name: tr('Formulir Online', 'Online Forms'),
        detail: tr('Formulir intake yang menggantikan input via chat atau kertas.', 'Intake forms that replace input via chat or paper.'),
      },
      {
        icon: Share2,
        name: tr('Administrasi Digital', 'Digital Administration'),
        detail: tr(
          'Administrasi harian yang tersimpan rapi dan mudah ditelusuri kembali.',
          'Daily administration stored cleanly and easy to trace back.',
        ),
      },
      {
        icon: FileStack,
        name: tr('Pengelolaan Data', 'Data Management'),
        detail: tr(
          'Pengelolaan data terpusat dengan struktur dan penamaan yang konsisten.',
          'Centralised data management with consistent structure and naming.',
        ),
      },
      {
        icon: Braces,
        name: tr('Alat Bawaan Internal', 'Internal Tools'),
        detail: tr(
          'Alat bantu internal untuk pekerjaan yang sering diulang sehari-hari.',
          'Internal utilities for work that repeats every day.',
        ),
      },
    ],
  },
  {
    id: 'systems',
    icon: Database,
    name: tr('Sistem Bisnis', 'Business Systems'),
    summary: tr(
      'Sistem inti yang menyimpan data bisnis dan menyediakan gambaran kondisi usaha yang bisa langsung ditindaklanjuti.',
      'Core systems that hold business data and give a view of the operation that can be acted on immediately.',
    ),
    features: [
      {
        icon: Settings2,
        name: tr('Sistem Manajemen', 'Management System'),
        detail: tr(
          'Sistem master untuk operasional bisnis yang tercatat dan terstruktur.',
          'A master system for business operations that is recorded and structured.',
        ),
      },
      {
        icon: Gauge,
        name: tr('Dasbor', 'Dashboard'),
        detail: tr(
          'Ringkasan metrik penting dalam satu tampilan untuk keputusan cepat.',
          'Key metrics summarised in one view for fast decisions.',
        ),
      },
      {
        icon: Database,
        name: tr('Sistem Basis Data', 'Database System'),
        detail: tr(
          'Skema database yang dirancang agar data dapat dipakai ulang tanpa redundansi.',
          'A database schema designed so data can be reused without redundancy.',
        ),
      },
      {
        icon: Boxes,
        name: tr('Sistem Inventori', 'Inventory System'),
        detail: tr(
          'Pelacakan stok masuk dan keluar dengan riwayat yang dapat ditelusuri.',
          'Inbound and outbound stock tracking with a traceable history.',
        ),
      },
      {
        icon: Users,
        name: tr('Sistem Manajemen Pelanggan', 'Customer Management System'),
        detail: tr(
          'Data pelanggan tersimpan rapi beserta riwayat interaksi dan statusnya.',
          'Customer data stored cleanly with its interaction history and status.',
        ),
      },
    ],
  },
  {
    id: 'automation',
    icon: GitBranch,
    name: tr('Otomasi & Integrasi', 'Automation & Integration'),
    summary: tr(
      'Menghapus pekerjaan berulang dan menyambungkan sistem yang selama ini harus dicocokkan secara manual.',
      'Removing repetitive work and connecting systems that previously had to be matched by hand.',
    ),
    features: [
      {
        icon: Repeat2,
        name: tr('Otomasi Alur Kerja', 'Workflow Automation'),
        detail: tr(
          'Proses berulang diotomatisasi agar tidak dikerjakan manual setiap kali.',
          'Repetitive processes automated so they are never done by hand again.',
        ),
      },
      {
        icon: Link2,
        name: tr('Integrasi API', 'API Integration'),
        detail: tr(
          'Penghubung antar sistem internal dan eksternal melalui antarmuka yang stabil.',
          'A connector between internal and external systems over a stable interface.',
        ),
      },
      {
        icon: MessagesSquare,
        name: tr('Integrasi WhatsApp', 'WhatsApp Integration'),
        detail: tr(
          'Koneksi WhatsApp ke alur bisnis agar komunikasi lebih cepat dan tercatat.',
          'WhatsApp connected into the business flow so communication is faster and recorded.',
        ),
      },
      {
        icon: GitBranch,
        name: tr('Integrasi Data', 'Data Integration'),
        detail: tr(
          'Penyatuan data dari beberapa sumber menjadi satu alur yang konsisten.',
          'Merging data from several sources into one consistent flow.',
        ),
      },
      {
        icon: ChartNoAxesCombined,
        name: tr('Pelaporan Otomatis', 'Automated Reporting'),
        detail: tr(
          'Laporan periodik dibuat otomatis tanpa menghimpun angka secara manual.',
          'Periodic reports generated automatically with no manual number-gathering.',
        ),
      },
    ],
  },
] as const;

/* ============================================================================
   SCOPE DIAGNOSER — the interactive widget in the hero.
   Selecting an operational problem + a business scale yields an
   engineering module recommendation.
   ========================================================================== */

export type DiagnosticOption = {
  id: string;
  label: Localized;
  headline: Localized;
  recommendation: Localized;
  pillar: SolutionPillarId;
};

export const diagnosticOptions: readonly DiagnosticOption[] = [
  {
    id: 'manual-ops',
    label: tr('Operasional Manual', 'Manual Operations'),
    headline: tr('Pekerjaan berulang masih dikerjakan di kertas dan chat.', 'Repetitive work is still done on paper and in chat.'),
    recommendation: tr(
      'Digital Workflow dan Online Forms memindahkan pencatatan manual ke alur terstruktur yang tercatat otomatis.',
      'Digital Workflow and Online Forms move manual recording into a structured flow that is logged automatically.',
    ),
    pillar: 'process',
  },
  {
    id: 'weak-presence',
    label: tr('Penjualan & Kehadiran Digital', 'Sales & Digital Presence'),
    headline: tr(
      'Prospek baru sulit menemukan dan tidak yakin tentang bisnis Anda.',
      'New prospects struggle to find you and are not sure about your business.',
    ),
    recommendation: tr(
      'Company Website yang profesional dan SEO-ready, ditambah Landing Page terarah untuk menaikkan konversi.',
      'A professional, SEO-ready Company Website plus a focused Landing Page to lift conversion.',
    ),
    pillar: 'presence',
  },
  {
    id: 'messy-records',
    label: tr('Pencatatan & Stok Berantakan', 'Messy Records & Stock'),
    headline: tr('Data tersebar di beberapa tempat dan sering tidak sinkron.', 'Data is scattered across places and often out of sync.'),
    recommendation: tr(
      'Database System terpusat dengan Inventory System sehingga ada satu sumber kebenaran untuk seluruh tim.',
      'A centralised Database System with an Inventory System, so the whole team has one source of truth.',
    ),
    pillar: 'systems',
  },
  {
    id: 'disconnected-tools',
    label: tr('Proses Terputus antar Tim', 'Processes Disconnected Between Teams'),
    headline: tr('Penjualan, stok, dan laporan tidak saling terhubung.', 'Sales, stock, and reporting are not connected to each other.'),
    recommendation: tr(
      'API Integration dan Automated Reporting membuat data mengalir antar sistem tanpa input ulang manual.',
      'API Integration and Automated Reporting let data flow between systems with no manual re-entry.',
    ),
    pillar: 'automation',
  },
] as const;

/** Business-scale stepper. Each step adjusts the recommended engineering depth. */
export type ScaleStep = {
  id: string;
  label: Localized;
  range: Localized;
  depth: Localized;
  modules: readonly Localized[];
};

export const scaleSteps: readonly ScaleStep[] = [
  {
    id: 'solo',
    label: tr('Solo / Pemula', 'Solo / Starting Out'),
    range: tr('1 pengguna', '1 user'),
    depth: tr('Fokus: satu sistem inti yang ringan.', 'Focus: one lightweight core system.'),
    modules: [tr('Company Website', 'Company Website'), tr('CRM Dasar', 'Basic CRM')],
  },
  {
    id: 'small',
    label: tr('UMKM Kecil', 'Small Business'),
    range: tr('2–10 pengguna', '2–10 users'),
    depth: tr('Fokus: digitalisasi alur harian.', 'Focus: digitising the daily flow.'),
    modules: [
      tr('Online Forms', 'Online Forms'),
      tr('Inventory System', 'Inventory System'),
      tr('Auto-Reporting', 'Auto-Reporting'),
    ],
  },
  {
    id: 'mid',
    label: tr('UMKM Bertumbuh', 'Growing Business'),
    range: tr('10–50 pengguna', '10–50 users'),
    depth: tr('Fokus: sistem terpadu & otomasi.', 'Focus: integrated systems & automation.'),
    modules: [
      tr('Management System', 'Management System'),
      tr('Dashboard', 'Dashboard'),
      tr('API Integration', 'API Integration'),
    ],
  },
  {
    id: 'large',
    label: tr('Skala Besar', 'Large Scale'),
    range: tr('50–200 pengguna', '50–200 users'),
    depth: tr('Fokus: integrasi & high availability.', 'Focus: integration & high availability.'),
    modules: [
      tr('Multi-branch Sync', 'Multi-branch Sync'),
      tr('WhatsApp API', 'WhatsApp API'),
      tr('Automated Reporting', 'Automated Reporting'),
    ],
  },
  {
    id: 'enterprise',
    label: tr('Enterprise', 'Enterprise'),
    range: tr('200+ pengguna', '200+ users'),
    depth: tr('Fokus: arsitektur terdistribusi & security.', 'Focus: distributed architecture & security.'),
    modules: [
      tr('Scalable Infra', 'Scalable Infra'),
      tr('Access Control', 'Access Control'),
      tr('Custom Integrations', 'Custom Integrations'),
    ],
  },
] as const;

/* ============================================================================
   LIVE ARCHITECTURE VIEWER — node graph that lights up per diagnostic.
   ========================================================================== */

export type ArchNode = {
  id: string;
  label: Localized;
  role: Localized;
  icon: LucideIcon;
};

export type ArchFlow = {
  id: string;
  /** Maps a diagnostic option id to the ordered node ids that light up. */
  path: readonly string[];
  caption: Localized;
};

export const archNodes: readonly ArchNode[] = [
  {
    id: 'client',
    label: tr('Aplikasi Klien', 'Client App'),
    role: tr('Web & mobile', 'Web & mobile'),
    icon: Globe,
  },
  {
    id: 'api',
    label: tr('Lapisan API', 'API Layer'),
    role: tr('Kontrak type-safe', 'Type-safe contract'),
    icon: Waypoints,
  },
  {
    id: 'auth',
    label: tr('Kontrol Akses', 'Access Control'),
    role: tr('Peran & izin', 'Role & permission'),
    icon: Fingerprint,
  },
  {
    id: 'workflow',
    label: tr('Mesin Alur Kerja', 'Workflow Engine'),
    role: tr('Aturan & otomasi', 'Rules & automation'),
    icon: Workflow,
  },
  {
    id: 'db',
    label: tr('Basis Data', 'Database'),
    role: tr('Satu sumber kebenaran', 'Single source of truth'),
    icon: Database,
  },
  {
    id: 'notify',
    label: tr('Pusat Notifikasi', 'Notification Hub'),
    role: tr('WA / email / push', 'WA / email / push'),
    icon: Zap,
  },
  {
    id: 'dashboard',
    label: tr('Dasbor', 'Dashboard'),
    role: tr('Metrik & pelaporan', 'Metric & reporting'),
    icon: Gauge,
  },
  {
    id: 'cdn',
    label: tr('Delivery Edge', 'Edge Delivery'),
    role: tr('Cache & CDN aset', 'Cache & asset CDN'),
    icon: Network,
  },
] as const;

export const archFlows: readonly ArchFlow[] = [
  {
    id: 'manual-ops',
    path: ['client', 'api', 'workflow', 'db', 'notify'],
    caption: tr(
      'Form intake → workflow otomatis → basis data → notifikasi. Input manual hilang.',
      'Intake form → automated workflow → database → notification. Manual input disappears.',
    ),
  },
  {
    id: 'weak-presence',
    path: ['cdn', 'client', 'api', 'db', 'dashboard'],
    caption: tr(
      'Website lewat edge → konten SEO → basis data analitik → dasbor konversi.',
      'Edge-delivered website → SEO content → analytics database → conversion dashboard.',
    ),
  },
  {
    id: 'messy-records',
    path: ['client', 'api', 'auth', 'db', 'dashboard'],
    caption: tr(
      'Satu skema terpusat dengan kontrol akses → semua angka dasbor sinkron.',
      'One centralised schema with access control → every dashboard figure stays in sync.',
    ),
  },
  {
    id: 'disconnected-tools',
    path: ['client', 'api', 'workflow', 'notify', 'db'],
    caption: tr(
      'API mengintegrasikan kanal → workflow otomatis → data mengalir tanpa input ulang.',
      'APIs integrate the channels → automated workflow → data flows with no re-entry.',
    ),
  },
] as const;

/* ============================================================================
   FEATURED PROJECTS
   ========================================================================== */

export type ProjectPreview = {
  headline: Localized;
  blocks: readonly { id: string; name: Localized; metric: string }[];
};

export type Project = {
  id: string;
  name: string;
  industry: Localized;
  category: Localized;
  icon: LucideIcon;
  summary: Localized;
  challenges: readonly Localized[];
  solutions: readonly Localized[];
  liveUrl: string;
  stack: readonly Localized[];
  preview: ProjectPreview;
};

export const projects: readonly Project[] = [
  {
    id: 'memotive-id',
    name: 'MEMOTIVE.ID',
    industry: tr('Otomotif', 'Automotive'),
    category: tr('Platform Otomotif', 'Automotive Platform'),
    icon: ShoppingCart,
    summary: tr(
      'Marketplace mobil bekas di Bogor yang mengubah kredibilitas dan pengelolaan stok menjadi proses digital yang terukur.',
      'A used-car marketplace in Bogor that turned credibility and stock management into a measurable digital process.',
    ),
    challenges: [
      tr('Rendahnya Kepercayaan Pelanggan', 'Low Customer Trust'),
      tr('Pengelolaan Stok', 'Stock Management'),
      tr('Penemuan Produk', 'Product Discovery'),
      tr('Tidak Ada Identitas Digital Profesional', 'Lack of a Professional Digital Presence'),
    ],
    solutions: [
      tr('Website Otomotif Profesional', 'Professional Automotive Website'),
      tr('Pengelolaan Stok Digital', 'Digital Stock Management'),
      tr('Sistem Filter Kendaraan', 'Vehicle Filtering System'),
      tr('UI/UX Profesional', 'Professional UI/UX'),
    ],
    liveUrl: 'https://memotive.infinityfreeapp.com/?i=1',
    stack: [
      tr('Website', 'Website'),
      tr('Inventori', 'Inventory'),
      tr('Sistem Filter', 'Filter System'),
      tr('UI/UX', 'UI/UX'),
    ],
    preview: {
      headline: tr('Katalog unit dengan filter dan stok real-time', 'Unit catalogue with filters and real-time stock'),
      blocks: [
        { id: 'body', name: tr('Unit Tersedia', 'Units Available'), metric: '48' },
        { id: 'transmission', name: tr('Transmisi', 'Transmission'), metric: 'Automatic' },
        { id: 'year', name: tr('Tahun Produksi', 'Year Built'), metric: '2020-2024' },
        { id: 'price', name: tr('Rentang Harga', 'Price Range'), metric: 'Rp 80-350jt' },
      ],
    },
  },
  {
    id: 'seblak-kuy',
    name: 'SEBLAK KUY',
    industry: tr('F&B Berbasis Sekolah', 'School-Based F&B'),
    category: tr('Manajemen F&B & POS', 'F&B Management & POS'),
    icon: ShoppingCart,
    summary: tr(
      'Sistem manajemen usaha kuliner berbasis sekolah yang menyatukan pemesanan, stok, pembayaran, dan laporan penjualan.',
      'A school-based food business management system uniting ordering, stock, payment, and sales reporting.',
    ),
    challenges: [
      tr('Masalah Pemesanan', 'Ordering Problem'),
      tr('Pengelolaan Stok', 'Stock Management'),
      tr('Visibilitas Untung', 'Profit Visibility'),
      tr('Masalah Pembayaran', 'Payment Issues'),
    ],
    solutions: [
      tr('Sistem Pemesanan Online', 'Online Ordering System'),
      tr('System Stok Masuk & Keluar', 'Stock In & Stock Out System'),
      tr('Verifikasi Pembayaran QRIS', 'QRIS Payment Verification'),
      tr('Pembaruan Penjualan & Stok Otomatis', 'Automated Sales & Stock Update'),
    ],
    liveUrl: 'https://seblak-kuy.infinityfreeapp.com/?i=1',
    stack: [tr('Pemesanan Online', 'Online Ordering'), tr('POS', 'POS'), tr('QRIS', 'QRIS'), tr('Pelaporan', 'Reporting')],
    preview: {
      headline: tr('Pemesanan online dengan verifikasi pembayaran QRIS', 'Online ordering with QRIS payment verification'),
      blocks: [
        { id: 'orders', name: tr('Pesanan Hari Ini', 'Orders Today'), metric: '32' },
        { id: 'revenue', name: tr('Omzet Terkonfirmasi', 'Confirmed Revenue'), metric: 'Rp 1,4jt' },
        { id: 'stock', name: tr('Stok Keluar', 'Stock Out'), metric: '18' },
        { id: 'qris', name: tr('QRIS Terverifikasi', 'QRIS Verified'), metric: '29' },
      ],
    },
  },
] as const;

/* ============================================================================
   HERO STATS
   ========================================================================== */

export type HeroStat =
  | { id: string; count: number; suffix: string; label: Localized; detail: Localized }
  | { id: string; value: string; label: Localized; detail: Localized };

export const heroStats: readonly HeroStat[] = [
  {
    id: 'tailored',
    count: 100,
    suffix: '%',
    label: tr('Custom-Built', 'Custom-Built'),
    detail: tr(
      'Setiap sistem ditulis khusus untuk masalah bisnis Anda',
      'Every system is written specifically for your business problem',
    ),
  },
  {
    id: 'stages',
    count: 6,
    suffix: '-STAGE',
    label: tr('Delivery Protocol', 'Delivery Protocol'),
    detail: tr(
      'Diagnose sampai optimize, dengan deliverable tiap tahap',
      'Diagnose through optimize, with a deliverable at every stage',
    ),
  },
  {
    id: 'partner',
    value: 'End-to-End',
    label: tr('Engineering Partner', 'Engineering Partner'),
    detail: tr(
      'Arsitektur, build, deploy, dan pendampingan berkelanjutan',
      'Architecture, build, deploy, and continuous support',
    ),
  },
] as const;

/* ============================================================================
   FAQ — [ A4 // ENGAGEMENT_FAQ ]
   ========================================================================== */

export const faqs: readonly { id: string; question: Localized; answer: Localized }[] = [
  {
    id: 'faq-cost',
    question: tr('Apakah konsultasi awal dipungut biaya?', 'Is the first consultation charged?'),
    answer: tr(
      'Tidak. Konsultasi awal tidak dipungut biaya dan tidak mengikat. Kami tidak memberi rekomendasi arsitektur sebelum hambatan Anda terpetakan.',
      'No. The first consultation carries no fee and no obligation. We do not recommend an architecture before your blockers are mapped.',
    ),
  },
  {
    id: 'faq-stack',
    question: tr('Apakah saya harus memakai teknologi tertentu?', 'Am I required to use a specific technology?'),
    answer: tr(
      'Tidak. Kami mulai dari masalah dan batasan Anda, lalu memilih stack yang paling masuk akal. Kalau platform Anda sekarang sudah cukup, kami bilang begitu.',
      'No. We start from your problem and constraints, then choose the stack that makes most sense. If your current platform is already sufficient, we will say so.',
    ),
  },
  {
    id: 'faq-timeline',
    question: tr('Berapa lama satu proyek berjalan?', 'How long does a project take?'),
    answer: tr(
      'Tergantung pada cakupannya. Satu sistem inti biasanya selesai dalam 3–6 minggu; integrasi multi-sistem lebih panjang. Estimasi jelas diberikan setelah tahap Diagnose.',
      'It depends on scope. A single core system usually lands in 3–6 weeks; multi-system integrations take longer. A firm estimate follows the Diagnose stage.',
    ),
  },
  {
    id: 'faq-maintenance',
    question: tr('Apakah ada pendampingan setelah sistem berjalan?', 'Is there support after the system goes live?'),
    answer: tr(
      'Ada. Sistem yang berjalan adalah awal hubungan. Monitoring, perbaikan bug, dan pengembangan lanjutan kami urus berdasarkan usage nyata.',
      'Yes. A running system is the start of the relationship. Monitoring, bug fixes, and continued development are ours, driven by real usage.',
    ),
  },
  {
    id: 'faq-data',
    question: tr('Bagaimana data bisnis saya ditangani?', 'How is my business data handled?'),
    answer: tr(
      'Data Anda milik Anda. Setiap sistem dibangun dengan skema yang rapi, akses berbasis peran, dan jejak audit untuk perubahan penting.',
      'Your data stays yours. Every system is built with a clean schema, role-based access, and an audit trail for important changes.',
    ),
  },
  {
    id: 'faq-remote',
    question: tr('Apakah bisa bekerja jarak jauh dengan tim di luar kota?', 'Can you work remotely with an out-of-town team?'),
    answer: tr(
      'Bisa. Tahap Discover dan Diagnose dijalankan lewat sesi daring terjadwal, dan Anda mendapat dokumen hasil diagnosa apa pun lokasi prosesnya.',
      'Yes. Discover and Diagnose run over scheduled online sessions, and you receive the diagnostic document regardless of where the process happens.',
    ),
  },
] as const;

/* ============================================================================
   CONTACT
   ========================================================================== */

export const contactInfo = {
  phone: '+62 812-0000-0000',
  email: 'hello@labsite.id',
  address: tr('Indonesia', 'Indonesia'),
  website: 'https://labsite.id',
  // TODO: isi dengan tautan resmi LABSITE.ID (Instagram, LinkedIn, WhatsApp)
  socials: [] as readonly { label: string; url: string; icon: LucideIcon }[],
} as const;

/**
 * Five grouped navigation categories.
 *
 * The previous eight-item menu overflowed the pill at `lg` and forced
 * 10px mono labels to butt against each other. Each entry now points at a
 * *group* of sections rather than one anchor, so the pill stays calm while the
 * scroll spy still tracks the sections underneath.
 */
export type NavLink = {
  id: string;
  index: string;
  label: Localized;
  /** Anchor used when the link is followed. */
  href: string;
  /** Every section id this category covers, for active-state tracking. */
  targets: readonly string[];
};

export const navLinks: readonly NavLink[] = [
  {
    id: 'overview',
    index: '01',
    label: tr('Ikhtisar', 'Overview'),
    href: '#about',
    targets: ['about', 'focus', 'problems'],
  },
  {
    id: 'method',
    index: '02',
    label: tr('Metode', 'Method'),
    href: '#approach',
    targets: ['approach', 'manifesto'],
  },
  {
    id: 'architecture',
    index: '03',
    label: tr('Arsitektur', 'Architecture'),
    href: '#solutions',
    targets: ['solutions'],
  },
  {
    id: 'work',
    index: '04',
    label: tr('Kasus', 'Projects'),
    href: '#work',
    targets: ['work', 'faq'],
  },
  {
    id: 'contact',
    index: '05',
    label: tr('Kontak', 'Contact'),
    href: '#contact',
    targets: ['contact'],
  },
] as const;

/**
 * Every section id on the page, in document order. The scroll spy watches this
 * list; each nav entry then claims active state if any of its targets matches.
 */
export const sectionIds: readonly string[] = [
  'hero',
  'about',
  'focus',
  'problems',
  'approach',
  'manifesto',
  'solutions',
  'work',
  'faq',
  'contact',
] as const;

/**
 * Maps a pillar id to the full pillar record. `diagnosticOptions` stores only
 * the id, so the diagnoser resolves name + icon + summary through this rather
 * than duplicating them per option.
 */
export const pillarLookup: Record<SolutionPillarId, SolutionPillar> = solutions.reduce(
  (acc, pillar) => {
    acc[pillar.id] = pillar;
    return acc;
  },
  {} as Record<SolutionPillarId, SolutionPillar>,
);