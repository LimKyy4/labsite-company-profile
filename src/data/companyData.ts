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

/* ============================================================================
   BRAND — positioning: Professional IT Engineering Partner
   ========================================================================== */

export const brand = {
  name: 'LABSITE.ID',
  tagline: 'Your Business Problem Solver',
  role: 'Professional IT Engineering Partner',
  subtitle:
    'Kami mentransformasi operasional bisnis yang berantakan menjadi sistem digital yang otomatis, andal, dan terukur. Setiap sistem direkayasa khusus — bukan ditempel dari template.',
} as const;

/** Short engineering micro-copy injected at high-trust points across the page. */
export const engineeringMarks: readonly string[] = [
  'Zero-Bloat Architecture',
  '100% Type-Safe Code',
  'Built for High Scale',
  'Enterprise-Grade Security',
] as const;

/** Header readout. Rendered verbatim as a live operational status line. */
export const systemStatus = {
  label: 'System Status',
  state: 'All Engines Operational',
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
  text: string;
};

export const systemLogs: readonly SystemLogEntry[] = [
  { tag: 'DIAGNOSTIC', text: 'Zero latency verified across all endpoints' },
  { tag: 'DEPLOY', text: 'High-concurrency system shipped to production' },
  { tag: 'SECURITY', text: 'Dependency audit clean — zero critical findings' },
  { tag: 'METRIC', text: 'Workflow automation cut manual input by 92%' },
  { tag: 'LOG', text: 'Schema migration completed with zero downtime' },
  { tag: 'DIAGNOSTIC', text: 'Type-safe build passed with 0 TypeScript errors' },
  { tag: 'METRIC', text: 'Dashboard load time held under 120ms at peak' },
  { tag: 'SECURITY', text: 'Auth layer hardened against session replay' },
] as const;

export const vision = {
  title: 'Visi',
  statement:
    'Menjadi mitra rekayasa sistem yang terbukti bagi bisnis Indonesia: setiap sistem yang kami bangun wajib dibuktikan dengan angka, bukan janji.',
} as const;

export type Mission = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const missions: readonly Mission[] = [
    {
      icon: ScanSearch,
      title: 'Diagnosis Sebelum Solusi',
      description:
        'Kami memetakan hambatan operasional Anda lebih dulu. Teknologi hanya dipilih setelah masalahnya terukur.',
    },
  {
    icon: Binary,
    title: 'Custom-Built, Bukan Turunan',
    description:
      'Setiap baris kode ditulis khusus mengikuti proses, data, dan skala bisnis Anda. Nol template, nol plugin mangkuk.',
  },
  {
    icon: Settings2,
    title: 'Stack yang earning its keep',
    description:
      'Kami memilih teknologi yang wajib ada dan membuang sisanya. Dependency yang tidak menambah nilai tidak pernah masuk build.',
  },
  {
    icon: Repeat2,
    title: 'Otomasi yang Terbukti',
    description:
      'Pekerjaan berulang dipindah ke alur digital otomatis yang tercatat, bisa diaudit, dan tidak bergantung satu orang.',
  },
  {
    icon: BadgeCheck,
    title: 'Pendampingan Pasca-Launch',
    description:
      'Sistem yang berjalan adalah awal hubungan, bukan akhir. Monitoring, perbaikan, dan pengembangan lanjutan kami urus.',
  },
] as const;

export type FocusStage = {
  step: string;
  icon: LucideIcon;
  name: string;
  description: string;
};

export const focus = {
  headline: 'IDENTIFY → SOLVE → BUILD → SCALE',
  stages: [
    {
      step: '01',
      icon: ScanSearch,
      name: 'Identify',
      description:
        'Kami audit alur kerja, data, dan titik gesekan yang médicos，那 memotong produktivitas tim Anda.',
    },
    {
      step: '02',
      icon: Target,
      name: 'Solve',
      description:
        'Setiap hambatan dipetakan ke solusi paling masuk akal yang terukur, terukur, dan bisa dikerjakan cepat.',
    },
    {
      step: '03',
      icon: Boxes,
      name: 'Build',
      description:
        'Solusi dibangun sebagai sistem nyata: web, aplikasi internal, database, dashboard, dan otomasi.',
    },
    {
      step: '04',
      icon: TrendingUp,
      name: 'Scale',
      description:
        'Sistem yang berjalan menjadi fondasi ekspansi: efisiensi, jangkauan, dan keputusan berbasis data.',
    },
  ] as FocusStage[],
} as const;

export const belief = {
  quote:
    'Software should eliminate operational drag, not relocate it. Every line we ship has to earn its runtime.',
  points: [
    'Tekologi bernilai hanya jika beban yang dihilangkan lebih besar dari beban yang ditambahkan.',
    'Satu sistem yang dipakai setiap hari lebih berharga dari sepuluh aplikasi yang tidak pernah dibuka.',
    'Sistem harus bisa dioperasikan tim bisnis sendiri, bukan hanya tim teknis kami.',
  ],
} as const;

/* ============================================================================
   SECTION INDEX — mandated Swiss micro-index labels
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
  contact: { index: '06', label: 'CONTACT_GATEWAY' },
} as const;

/* ============================================================================
   COMMON DIAGNOSTICS
   ========================================================================== */

export type SolutionPillarId = 'presence' | 'process' | 'systems' | 'automation';

export type Problem = {
  id: string;
  icon: LucideIcon;
  title: string;
  symptom: string;
  impact: string;
  solution: string;
  pillars: SolutionPillarId[];
  span: 1 | 2;
};

export const problems: readonly Problem[] = [
  {
    id: 'poor-digital-presence',
    icon: Eye,
    title: 'Poor Digital Presence',
    symptom:
      'Bisnis Anda hanya hidup di media sosial dan dari mulut ke mulut. Tidak ada identitas digital yang bisa dipercaya calon pembeli.',
    impact: 'Prospek baru tidak menemukan Anda, dan kredibilitas tidak bisa dibuktikan secara teknis.',
    solution:
      'Website korporat yang cepat, SEO-ready, dan dilengkapi business profile terstruktur — sehingga mesin pencari dan calon pelanggan menemukan Anda, lalu langsung memercayai.',
    pillars: ['presence'],
    span: 2,
  },
  {
    id: 'inefficient-operations',
    icon: Gauge,
    title: 'Inefficient Operations',
    symptom:
      'Pekerjaan operasional masih manual: dicatat di kertas, dikirim lewat chat pribadi, atau diinput ulang di banyak tempat.',
    impact: 'Waktu terbuang, kesalahan input naik, dan biaya tenaga kerja meledak seiring transaksi bertambah.',
    solution:
      'Digital workflow dan online forms memindahkan proses manual ke alur terstruktur yang tercatat otomatis, bisa diaudit, dan tidak bergantung satu orang.',
    pillars: ['process'],
    span: 1,
  },
  {
    id: 'disorganized-information',
    icon: FileStack,
    title: 'Disorganized Information',
    symptom:
      'Data transaksi, pelanggan, dan produk tersebar di chat, spreadsheet, dan catatan pribadi yang tidak saling terhubung.',
    impact: 'Keputusan bisnis diambil dari data tidak lengkap atau sudah usang.',
    solution:
      'Database system terpusat dengan skema yang rapi dan data management konsisten — satu sumber kebenaran untuk seluruh tim.',
    pillars: ['systems', 'process'],
    span: 1,
  },
  {
    id: 'customer-acquisition',
    icon: Users,
    title: 'Customer Acquisition',
    symptom:
      'Promosi masih berupa tebakan. Tidak ada jalur penjualan yang jelas dari orang tertarik menjadi pelanggan.',
    impact: 'Anggararan marketing terbuang tanpa umpan balik yang bisa diukur.',
    solution:
      'Landing page terarah, business profile kuat, dan customer management system agar alur penjualan bisa dilacak ujung ke ujung.',
    pillars: ['presence', 'systems'],
    span: 1,
  },
  {
    id: 'poor-internal-systems',
    icon: ServerCog,
    title: 'Poor Internal Systems',
    symptom:
      'Belum ada sistem manajemen internal tempat seluruh tim bekerja dari satu sumber data yang sama.',
    impact: 'Data antar bagian bentrok, bahkan laporan yang saling bertentangan.',
    solution:
      'Management system, dashboard, dan internal tools terpadu yang memberi satu gambaran kondisi bisnis real-time ke seluruh tim.',
    pillars: ['systems'],
    span: 2,
  },
  {
    id: 'disconnected-processes',
    icon: Unplug,
    title: 'Disconnected Processes',
    symptom:
      'Penjualan, stok, pembayaran, dan pelaporan tidak terhubung, sehingga tiap tahap diisi ulang manual.',
    impact: 'Informasi tidak sinkron dan pekerjaan yang sama dikerjakan dua kali.',
    solution:
      'API dan data integration menghubungkan antar sistem dan channel — termasuk WhatsApp — sehingga data mengalir otomatis tanpa input ulang.',
    pillars: ['automation', 'systems'],
    span: 1,
  },
  {
    id: 'lack-of-digital-strategy',
    icon: Compass,
    title: 'Lack of Digital Strategy',
    symptom:
      'Teknologi dibeli karena ikut tren tanpa peta jalan, sehingga tidak ada arah antara biaya dan manfaat.',
    impact: 'Investasi teknologi berubah jadi beban, bukan pendorong pertumbuhan.',
    solution:
      'Enam tahap delivery protocol kami, dari Discover sampai Optimize, memastikan teknologi dibangun berdasarkan diagnosis dan bukan tebakan.',
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
  name: string;
  description: string;
  deliverable: string;
  duration: string;
};

export const approach: readonly ApproachStage[] = [
  {
    id: 'discover',
    step: '01',
    icon: Compass,
    name: 'Discover',
    description:
      'Kami duduk bersama tim Anda memetakan proses kerja, data, dan kendala yang benar-benar terjadi di lapangan — bukan yang tertulis di proposal.',
    deliverable: 'Dokumen kebutuhan bisnis dan peta masalah',
    duration: 'Tahap 1',
  },
  {
    id: 'diagnose',
    step: '02',
    icon: ScanSearch,
    name: 'Diagnose',
    description:
      'Masalah dianalisis dan diprioritaskan berdasarkan dampak bisnis serta effort-to-fix, bukan berdasarkan tren teknologi.',
    deliverable: 'Analisis akar masalah dan daftar prioritas',
    duration: 'Tahap 2',
  },
  {
    id: 'design',
    step: '03',
    icon: LayoutGrid,
    name: 'Design',
    description:
      'Arsitektur, skema data, dan alur kerja disimulasikan bersama Anda sebelum satu baris kode ditulis — termasuk simulasi alur pengguna.',
    deliverable: 'Desain sistem, alur kerja, dan prototype',
    duration: 'Tahap 3',
  },
  {
    id: 'develop',
    step: '04',
    icon: Code2,
    name: 'Develop',
    description:
      'Sistem dibangun dengan standar kualitas jelas, type-safe, diuji pada alur nyata, dan dokumentasinya diserahkan utuh.',
    deliverable: 'Website, aplikasi, database, atau sistem yang berjalan',
    duration: 'Tahap 4',
  },
  {
    id: 'deploy',
    step: '05',
    icon: Globe,
    name: 'Deploy',
    description:
      'Sistem dijalankan di environment produksi dengan domain, hosting, dan integrasi yang sudah disiapkan serta ter-hardening.',
    deliverable: 'Sistem aktif dan siap digunakan',
    duration: 'Tahap 5',
  },
  {
    id: 'optimize',
    step: '06',
    icon: TrendingUp,
    name: 'Optimize',
    description:
      'Performa dipantau dan diperbaiki berdasarkan pemakaian nyata, lalu backlog perbaikan langsung dikerjakan tanpa nego.',
    deliverable: 'Laporan perbaikan dan rencana pengembangan berikutnya',
    duration: 'Tahap 6',
  },
] as const;

/* ============================================================================
   CODE MANIFESTO — [ 03 // CODE_MANIFESTO ]
   ========================================================================== */

export type ManifestoPillar = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string;
  proof: readonly string[];
};

export const manifesto: readonly ManifestoPillar[] = [
  {
    id: 'zero-template',
    icon: Terminal,
    title: 'Zero Template Policy',
    tagline: 'Custom-built from zero',
    body:
      'Setiap baris kode ditulis khusus mengikuti proses unik bisnis Anda. Tidak ada CMS generik, tidak ada tema instan, tidak ada plugin mangkuk yang menambah beban dan menambah celah.',
    proof: ['No CMS bloat', 'Hand-written markup', 'Zero theme debt'],
  },
  {
    id: 'speed-security',
    icon: ShieldCheck,
    title: 'Built for Speed & Security',
    tagline: 'Lean architecture, hardened surface',
    body:
      'Arsitektur ringan, bebas bloatware, dependency diminimalkan, dan setiap endpoint dilindungi praktik keamanan standar industri. Cepat dimuat dan sulit ditembus.',
    proof: ['Minimal dependencies', 'Hardened endpoints', 'Audited builds'],
  },
  {
    id: 'scalable-infra',
    icon: Rocket,
    title: 'Scalable Infrastructure',
    tagline: 'Ready to grow with you',
    body:
      'Sistem dirancang siap bertumbuh seiring berkembangnya skala bisnis klien: skema data yang rapi, API yang stabil, dan arsitektur yang menyerap lonjakan beban.',
    proof: ['Schema-first data', 'Stable API surface', 'Load-tested logic'],
  },
] as const;

/** Word-strip for the manifesto section's infinite marquee. */
export const manifestoMarquee: readonly string[] = [
  'Zero-Bloat Architecture',
  '100% Type-Safe Code',
  'Built for High Scale',
  'Enterprise-Grade Security',
  'Audit-Ready Logging',
  'Schema-First Data',
  'API-First Integration',
] as const;

/* ============================================================================
   ARCHITECTURE SOLUTIONS
   ========================================================================== */

export type SolutionPillar = {
  id: SolutionPillarId;
  icon: LucideIcon;
  name: string;
  summary: string;
  features: { icon: LucideIcon; name: string; detail: string }[];
};

export const solutions: readonly SolutionPillar[] = [
  {
    id: 'presence',
    icon: Globe,
    name: 'Digital Presence',
    summary:
      'Membangun identitas digital yang ditemukan mesin pencari, dipercaya calon pembeli, dan menghasilkan pipeline nyata.',
    features: [
      { icon: Globe, name: 'Company Website', detail: 'Website korporat lengkap dengan struktur halaman yang jelas dan profesional.' },
      { icon: Target, name: 'Landing Page', detail: 'Halaman yang fokus konversi untuk kampanye, promosi, atau uji pasar.' },
      { icon: PackageSearch, name: 'Product Catalog', detail: 'Katalog produk terstruktur dengan filter dan kategori yang mudah dinavigasi.' },
      { icon: BadgeCheck, name: 'Business Profile', detail: 'Profil bisnis lengkap dengan informasi, kredibilitas, dan cara menghubungi Anda.' },
      { icon: ChartNoAxesCombined, name: 'SEO-ready Website', detail: 'Struktur teknis dan meta yang disiapkan agar mudah ditemukan mesin pencari.' },
    ],
  },
  {
    id: 'process',
    icon: Workflow,
    name: 'Process Digitalization',
    summary:
      'Memindahkan pekerjaan manual ke alur digital yang tercatat, terukur, dan tidak menggantung di satu orang.',
    features: [
      { icon: Workflow, name: 'Digital Workflow', detail: 'Alur kerja terdefinisi dengan PIC, status, dan titik serah terima yang jelas.' },
      { icon: MessagesSquare, name: 'Online Forms', detail: 'Formulir intake yang menggantikan input via chat atau kertas.' },
      { icon: Share2, name: 'Digital Administration', detail: 'Administrasi harian yang tersimpan rapi dan mudah ditelusuri kembali.' },
      { icon: FileStack, name: 'Data Management', detail: 'Pengelolaan data terpusat dengan struktur dan penamaan yang konsisten.' },
      { icon: Braces, name: 'Internal Tools', detail: 'Alat bantu internal untuk pekerjaan yang sering diulang sehari-hari.' },
    ],
  },
  {
    id: 'systems',
    icon: Database,
    name: 'Business Systems',
    summary:
      'Sistem inti yang menyimpan data bisnis dan menyediakan gambaran kondisi usaha yang bisa langsung ditindaklanjuti.',
    features: [
      { icon: Settings2, name: 'Management System', detail: 'Sistem master untuk operasional bisnis yang tercatat dan terstruktur.' },
      { icon: Gauge, name: 'Dashboard', detail: 'Ringkasan metrik penting dalam satu tampilan untuk keputusan cepat.' },
      { icon: Database, name: 'Database System', detail: 'Skema database yang dirancang agar data dapat dipakai ulang tanpa redundansi.' },
      { icon: Boxes, name: 'Inventory System', detail: 'Pelacakan stok masuk dan keluar dengan riwayat yang dapat ditelusuri.' },
      { icon: Users, name: 'Customer Management System', detail: 'Data pelanggan tersimpan rapi beserta riwayat interaksi dan statusnya.' },
    ],
  },
  {
    id: 'automation',
    icon: GitBranch,
    name: 'Automation & Integration',
    summary:
      'Menghapus pekerjaan berulang dan menyambungkan sistem yang selama ini harus dicocokkan secara manual.',
    features: [
      { icon: Repeat2, name: 'Workflow Automation', detail: 'Proses berulang diotomatisasi agar tidak dikerjakan manual setiap kali.' },
      { icon: Link2, name: 'API Integration', detail: 'Penghubung antar sistem internal dan eksternal melalui antarmuka yang stabil.' },
      { icon: MessagesSquare, name: 'WhatsApp Integration', detail: 'Koneksi WhatsApp ke alur bisnis agar komunikasi lebih cepat dan tercatat.' },
      { icon: GitBranch, name: 'Data Integration', detail: 'Penyatuan data dari beberapa sumber menjadi satu alur yang konsisten.' },
      { icon: ChartNoAxesCombined, name: 'Automated Reporting', detail: 'Laporan periodik dibuat otomatis tanpa menghimpun angka secara manual.' },
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
  label: string;
  headline: string;
  recommendation: string;
  pillar: SolutionPillarId;
};

export const diagnosticOptions: readonly DiagnosticOption[] = [
  {
    id: 'manual-ops',
    label: 'Operasional Manual',
    headline: 'Pekerjaan berulang masih dikerjakan di kertas dan chat.',
    recommendation:
      'Digital Workflow dan Online Forms memindahkan pencatatan manual ke alur terstruktur yang tercatat otomatis.',
    pillar: 'process',
  },
  {
    id: 'weak-presence',
    label: 'Penjualan & Digital Presence',
    headline: 'Prospek baru sulit menemukan dan tidak yakin tentang bisnis Anda.',
    recommendation:
      'Company Website yang profesional dan SEO-ready, ditambah Landing Page terarah untuk menaikkan konversi.',
    pillar: 'presence',
  },
  {
    id: 'messy-records',
    label: 'Pencatatan & Stok Berantakan',
    headline: 'Data tersebar di beberapa tempat dan sering tidak sinkron.',
    recommendation:
      'Database System terpusat dengan Inventory System sehingga ada satu sumber kebenaran untuk seluruh tim.',
    pillar: 'systems',
  },
  {
    id: 'disconnected-tools',
    label: 'Proses Terputus antar Tim',
    headline: 'Penjualan, stok, dan laporan tidak saling terhubung.',
    recommendation:
      'API Integration dan Automated Reporting membuat data mengalir antar sistem tanpa input ulang manual.',
    pillar: 'automation',
  },
] as const;

/** Business-scale stepper. Each step adjusts the recommended engineering depth. */
export type ScaleStep = {
  id: string;
  label: string;
  range: string;
  depth: string;
  modules: readonly string[];
};

export const scaleSteps: readonly ScaleStep[] = [
  {
    id: 'solo',
    label: 'Solo / Pemula',
    range: '1 pengguna',
    depth: 'Fokus: satu sistem inti yang ringan.',
    modules: ['Company Website', 'Basic CRM'],
  },
  {
    id: 'small',
    label: 'UMKM Kecil',
    range: '2–10 pengguna',
    depth: 'Fokus: digitalisasi alur harian.',
    modules: ['Online Forms', 'Inventory System', 'Auto-Reporting'],
  },
  {
    id: 'mid',
    label: 'UMKM Bertumbuh',
    range: '10–50 pengguna',
    depth: 'Fokus: sistem terpadu & otomasi.',
    modules: ['Management System', 'Dashboard', 'API Integration'],
  },
  {
    id: 'large',
    label: 'Skala Besar',
    range: '50–200 pengguna',
    depth: 'Fokus: integrasi & high availability.',
    modules: ['Multi-branch Sync', 'WhatsApp API', 'Automated Reporting'],
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    range: '200+ pengguna',
    depth: 'Fokus: arsitektur terdistribusi & security.',
    modules: ['Scalable Infra', 'Access Control', 'Custom Integrations'],
  },
] as const;

/* ============================================================================
   LIVE ARCHITECTURE VIEWER — node graph that lights up per diagnostic.
   ========================================================================== */

export type ArchNode = {
  id: string;
  label: string;
  role: string;
  icon: LucideIcon;
};

export type ArchFlow = {
  id: string;
  /** Maps a diagnostic option id to the ordered node ids that light up. */
  path: readonly string[];
  caption: string;
};

export const archNodes: readonly ArchNode[] = [
  { id: 'client', label: 'Client App', role: 'Web & mobile', icon: Globe },
  { id: 'api', label: 'API Layer', role: 'Type-safe contract', icon: Waypoints },
  { id: 'auth', label: 'Access Control', role: 'Role & permission', icon: Fingerprint },
  { id: 'workflow', label: 'Workflow Engine', role: 'Rules & automation', icon: Workflow },
  { id: 'db', label: 'Database', role: 'Single source of truth', icon: Database },
  { id: 'notify', label: 'Notification Hub', role: 'WA / email / push', icon: Zap },
  { id: 'dashboard', label: 'Dashboard', role: 'Metric & reporting', icon: Gauge },
  { id: 'cdn', label: 'Edge Delivery', role: 'Cache & asset CDN', icon: Network },
] as const;

export const archFlows: readonly ArchFlow[] = [
  {
    id: 'manual-ops',
    path: ['client', 'api', 'workflow', 'db', 'notify'],
    caption: 'Form intake → workflow otomatis → database → notifikasi. Input manual hilang.',
  },
  {
    id: 'weak-presence',
    path: ['cdn', 'client', 'api', 'db', 'dashboard'],
    caption: 'Edge-delivered website → SEO content → analytics database → dashboard konversi.',
  },
  {
    id: 'messy-records',
    path: ['client', 'api', 'auth', 'db', 'dashboard'],
    caption: 'Satu schema terpusat dengan access control → semua angka dashboard sinkron.',
  },
  {
    id: 'disconnected-tools',
    path: ['client', 'api', 'workflow', 'notify', 'db'],
    caption: 'API mengintegrasikan kanal → workflow otomatis → data mengalir tanpa input ulang.',
  },
] as const;

/* ============================================================================
   FEATURED PROJECTS
   ========================================================================== */

export type Project = {
  id: string;
  name: string;
  industry: string;
  category: string;
  icon: LucideIcon;
  summary: string;
  challenges: string[];
  solutions: string[];
  liveUrl: string;
  stack: string[];
  preview: ProjectPreview;
};

export const projects: readonly Project[] = [
  {
    id: 'memotive-id',
    name: 'MEMOTIVE.ID',
    industry: 'Automotive',
    category: 'Automotive Platform',
    icon: ShoppingCart,
    summary:
      'Marketplace mobil bekas di Bogor yang mengubah kredibilitas dan pengelolaan stok menjadi proses digital yang terukur.',
    challenges: [
      'Low Customer Trust',
      'Stock Management',
      'Product Discovery',
      'Lack of Professional Digital Presence',
    ],
    solutions: [
      'Professional Automotive Website',
      'Digital Stock Management',
      'Vehicle Filtering System',
      'Professional UI/UX',
    ],
    liveUrl: 'https://memotive.infinityfreeapp.com/?i=1',
    stack: ['Website', 'Inventory', 'Filter System', 'UI/UX'],
    preview: {
      headline: 'Katalog unit dengan filter dan stok real-time',
      blocks: [
        { id: 'body', name: 'Unit Tersedia', metric: '48' },
        { id: 'transmission', name: 'Transmisi', metric: 'Automatic' },
        { id: 'year', name: 'Tahun Produksi', metric: '2020-2024' },
        { id: 'price', name: 'Rentang Harga', metric: 'Rp 80-350jt' },
      ],
    },
  },
  {
    id: 'seblak-kuy',
    name: 'SEBLAK KUY',
    industry: 'F&B School-Based Business',
    category: 'F&B Management & POS',
    icon: ShoppingCart,
    summary:
      'Sistem manajemen usaha kuliner berbasis sekolah yang menyatukan pemesanan, stok, pembayaran, dan laporan penjualan.',
    challenges: [
      'Ordering Problem',
      'Stock Management',
      'Profit Visibility',
      'Payment Issues',
    ],
    solutions: [
      'Online Ordering System',
      'Stock In & Stock Out System',
      'QRIS Payment Verification',
      'Automated Sales & Stock Update',
    ],
    liveUrl: 'https://seblak-kuy.infinityfreeapp.com/?i=1',
    stack: ['Online Ordering', 'POS', 'QRIS', 'Reporting'],
    preview: {
      headline: 'Pemesanan online dengan verifikasi pembayaran QRIS',
      blocks: [
        { id: 'orders', name: 'Pesanan Hari Ini', metric: '32' },
        { id: 'revenue', name: 'Omzet Terkonfirmasi', metric: 'Rp 1,4jt' },
        { id: 'stock', name: 'Stok Keluar', metric: '18' },
        { id: 'qris', name: 'QRIS Terverifikasi', metric: '29' },
      ],
    },
  },
] as const;

export type HeroStat =
  | { id: string; count: number; suffix: string; label: string; detail: string }
  | { id: string; value: string; label: string; detail: string };

export const heroStats: readonly HeroStat[] = [
  {
    id: 'tailored',
    count: 100,
    suffix: '%',
    label: 'Custom-Built',
    detail: 'Setiap sistem ditulis khusus untuk masalah bisnis Anda',
  },
  {
    id: 'stages',
    count: 6,
    suffix: '-STAGE',
    label: 'Delivery Protocol',
    detail: 'Diagnose sampai optimize, dengan deliverable tiap tahap',
  },
  {
    id: 'partner',
    value: 'End-to-End',
    label: 'Engineering Partner',
    detail: 'Arsitektur, build, deploy, dan pendampingan berkelanjutan',
  },
] as const;

export type PreviewBlock = {
  id: string;
  name: string;
  metric: string;
};

export type ProjectPreview = {
  headline: string;
  blocks: readonly PreviewBlock[];
};

/* ============================================================================
   CONTACT
   ========================================================================== */

export const contactInfo = {
  phone: '+62 812-0000-0000',
  email: 'hello@labsite.id',
  address: 'Indonesia',
  website: 'https://labsite.id',
  // TODO: isi dengan tautan resmi LABSITE.ID (Instagram, LinkedIn, WhatsApp)
  socials: [] as readonly { label: string; url: string; icon: LucideIcon }[],
} as const;

export const navLinks = [
  { id: 'about', label: 'Partner' },
  { id: 'focus', label: 'Prinsip' },
  { id: 'problems', label: 'Diagnosis' },
  { id: 'approach', label: 'Metode' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'solutions', label: 'Arsitektur' },
  { id: 'work', label: 'Kasus' },
  { id: 'contact', label: 'Kontak' },
] as const;

export const problemTypes = [
  'Digital Presence',
  'Operational Efficiency',
  'Data & Documentation',
  'Customer & Marketing',
  'Internal Systems',
  'Automation & Integration',
  'Others',
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
