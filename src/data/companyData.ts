import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Boxes,
  Braces,
  ChartNoAxesCombined,
  Code2,
  Compass,
  Database,
  Eye,
  FileStack,
  Gauge,
  GitBranch,
  Globe,
  LayoutGrid,
  Link2,
  MessagesSquare,
  PackageSearch,
  Repeat2,
  ScanSearch,
  ServerCog,
  Settings2,
  Share2,
  ShoppingCart,
  Target,
  TrendingUp,
  Unplug,
  Users,
  Workflow,
  Wrench,
} from 'lucide-react';

export const brand = {
  name: 'LABSITE.ID',
  tagline: 'Your Business Problem Solver',
  subtitle:
    'Perusahaan solusi digital yang berdedikasi membantu UMKM dan bisnis lokal memecahkan berbagai tantangan bisnis melalui pemanfaatan teknologi.',
} as const;

export const vision = {
  title: 'Visi',
  statement:
    'Menjadi penyedia solusi masalah bisnis terpercaya bagi UMKM di Indonesia melalui pemanfaatan teknologi dan solusi digital yang inovatif, relevan, dan berorientasi pada pertumbuhan.',
} as const;

export type Mission = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const missions: readonly Mission[] = [
  {
    icon: ScanSearch,
    title: 'Identifikasi Masalah Nyata',
    description:
      'Kami memulai dengan memahami kondisi bisnis Anda secara mendalam, bukan menawarkan teknologi di muka.',
  },
  {
    icon: Wrench,
    title: 'Solusi Kustom',
    description:
      'Setiap solusi dirancang khusus mengikuti karakter, proses, dan skala bisnis Anda.',
  },
  {
    icon: Settings2,
    title: 'Teknologi Fungsional',
    description:
      'Kami memilih teknologi yang benar-benar bekerja dan menjawab kebutuhan, bukan teknologi demi tren.',
  },
  {
    icon: Repeat2,
    title: 'Transformasi Digital',
    description:
      'Proses manual diubah menjadi alur digital yang efisien, terukur, dan mudah dipelihara.',
  },
  {
    icon: BadgeCheck,
    title: 'Mitra Jangka Panjang',
    description:
      'Kami tumbuh bersama bisnis Anda melalui dukungan berkelanjutan setelah sistem berjalan.',
  },
] as const;

export type FocusStage = {
  step: string;
  icon: LucideIcon;
  name: string;
  description: string;
};

export const focus = {
  headline: 'Identify → Solve → Build → Grow',
  stages: [
    {
      step: '01',
      icon: ScanSearch,
      name: 'Identify',
      description:
        'Kami petakan bagian bisnis Anda yang berjalan lambat, kacau, atau menyulitkan pengambilan keputusan.',
    },
    {
      step: '02',
      icon: Target,
      name: 'Solve',
      description:
        'Setiap masalah dipetakan ke solusi yang paling masuk akal, terukur, dan bisa dikerjakan dengan cepat.',
    },
    {
      step: '03',
      icon: Boxes,
      name: 'Build',
      description:
        'Solusi dibangun sebagai sistem nyata: website, aplikasi internal, database, dashboard, atau otomasi.',
    },
    {
      step: '04',
      icon: TrendingUp,
      name: 'Grow',
      description:
        'Sistem yang sudah berjalan menjadi dasar ekspansi: efisiensi, jangkauan, dan keputusan berbasis data.',
    },
  ] as FocusStage[],
} as const;

export const belief = {
  quote:
    'Technology Should Solve Problems, Not Create More. We provide the technology that the business actually needs.',
  points: [
    'Teknologi hanya bernilai jikarame masalah yang diselesaikan lebih besar dari beban yang ditambahkan.',
    'Satu sistem yang dipakai setiap hari lebih berguna daripada sepuluh aplikasi yang tidak pernah dibuka.',
    'Solusi harus bisa dipakai tim bisnis sendiri, bukan hanya tim teknis.',
  ],
} as const;

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
      'Bisnis hanya mengandalkan media sosial atau dari mulut ke mulut, tanpa identitas digital yang bisa dipercaya calon pembeli.',
    impact: 'Prospek baru sulit menemukan Anda, dan kredibilitas sulit dibuktikan.',
    solution:
      'Website perusahaan yang profesional, cepat, dan SEO-ready, dilengkapi Business Profile sehingga calon pelanggan menemukan Anda lewat pencarian dan langsung percaya.',
    pillars: ['presence'],
    span: 2,
  },
  {
    id: 'inefficient-operations',
    icon: Gauge,
    title: 'Inefficient Operations',
    symptom:
      'Pekerjaan operasional masih manual: dicatat di kertas, dikirim lewat chat pribadi, atau diinput berulang di banyak tempat.',
    impact: 'Waktu terbuang, kesalahan input, dan biaya tenaga kerja naik seiring transaksi bertambah.',
    solution:
      'Digital workflow dan online forms memindahkan proses manual ke alur terstruktur yang tercatat otomatis dan bisa diaudit.',
    pillars: ['process'],
    span: 1,
  },
  {
    id: 'disorganized-information',
    icon: FileStack,
    title: 'Disorganized Information',
    symptom:
      'Data transaksi, pelanggan, dan produk tersebar di chat, spreadsheet, dan catatan pribadi yang berbeda-beda.',
    impact: 'Keputusan bisnis diambil dari data yang tidak lengkap atau sudah usang.',
    solution:
      'Database system terpusat dengan data management yang rapi, sehingga ada satu sumber kebenaran untuk seluruh tim.',
    pillars: ['systems', 'process'],
    span: 1,
  },
  {
    id: 'customer-acquisition',
    icon: Users,
    title: 'Customer Acquisition',
    symptom:
      'Promosi masih berupa tebakan, tidak ada jalur penjualan yang jelas dari orang tertarik menjadi pelanggan.',
    impact: 'Anggaran marketing terbuang tanpa umpan balik yang bisa diukur.',
    solution:
      'Landing page terarah, business profile yang kuat, dan customer management system agar alur продажи bisa dilacak.',
    pillars: ['presence', 'systems'],
    span: 1,
  },
  {
    id: 'poor-internal-systems',
    icon: ServerCog,
    title: 'Poor Internal Systems',
    symptom:
      'Belum ada sistem manajemen internal tempat semua bagian bekerja dari data yang sama.',
    impact: 'Data antar bagian bentrok, bahkan laporan yang saling bertentangan.',
    solution:
      'Management system, dashboard, dan internal tools terpadu yang memberi satu gambaran kondisi bisnis ke seluruh tim.',
    pillars: ['systems'],
    span: 2,
  },
  {
    id: 'disconnected-processes',
    icon: Unplug,
    title: 'Disconnected Processes',
    symptom:
      'Antara penjualan, stok, pembayaran, dan pelaporan tidak terhubung, sehingga tiap tahap diisi ulang manual.',
    impact: 'Informasi tidak sinkron dan pekerjaan yang sama dikerjakan dua kali.',
    solution:
      'API integration dan data integration menghubungkan antar sistem dan channel, termasuk WhatsApp, sehingga data mengalir otomatis.',
    pillars: ['automation', 'systems'],
    span: 1,
  },
  {
    id: 'lack-of-digital-strategy',
    icon: Compass,
    title: 'Lack of Digital Strategy',
    symptom:
      'Teknologi dibeli karena ikut tren tanpa peta jalan, sehingga tidak ada arah antara biaya dan manfaat.',
    impact: 'Investasi teknologi menjadi beban, bukan pendorong pertumbuhan.',
    solution:
      'Enam tahap metodologi kami, dari Discover sampai Optimize, memastikan teknologi dibangun berdasarkan diagnosis dan bukan tebakan.',
    pillars: ['presence', 'process', 'systems', 'automation'],
    span: 1,
  },
] as const;

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
      'Kami duduk bersama tim Anda untuk memahami proses kerja, data, dan kendala yang benar-benar terjadi di lapangan.',
    deliverable: 'Dokumen kebutuhan bisnis dan peta masalah',
    duration: 'Tahap 1',
  },
  {
    id: 'diagnose',
    step: '02',
    icon: ScanSearch,
    name: 'Diagnose',
    description:
      'Masalah dianalisis dan diprioritaskan berdasarkan dampak bisnis, bukan berdasarkan tren teknologi.',
    deliverable: 'Analisis akar masalah dan daftar prioritas',
    duration: 'Tahap 2',
  },
  {
    id: 'design',
    step: '03',
    icon: LayoutGrid,
    name: 'Design',
    description:
      'Solusi dan alur kerja didesain bersama Anda sebelum satu baris kode ditulis, termasuk simulasi alur pengguna.',
    deliverable: 'Desain sistem, alur kerja, dan prototype',
    duration: 'Tahap 3',
  },
  {
    id: 'develop',
    step: '04',
    icon: Code2,
    name: 'Develop',
    description:
      'Sistem dibangun dengan standar kualitas yang jelas, diuji pada alur nyata, dan dokumentasinya diserahkan.',
    deliverable: 'Website, aplikasi, database, atau sistem yang berjalan',
    duration: 'Tahap 4',
  },
  {
    id: 'deploy',
    step: '05',
    icon: Globe,
    name: 'Deploy',
    description:
      'Sistem dijalankan pada lingkungan produksi dengan domain, hosting, dan integrasi yang sudah disiapkan.',
    deliverable: 'Sistem aktif dan siap digunakan',
    duration: 'Tahap 5',
  },
  {
    id: 'optimize',
    step: '06',
    icon: TrendingUp,
    name: 'Optimize',
    description:
      'Performa dipantau dan diperbaiki berdasarkan pemakaian nyata, lalu backlog perbaikan langsung dikerjakan.',
    deliverable: 'Laporan perbaikan dan rencana pengembangan berikutnya',
    duration: 'Tahap 6',
  },
] as const;

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
      'Membuat bisnis Anda mudah ditemukan, dipercaya, dan menghasilkan calon pelanggan baru.',
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
      'Sistem inti yang menyimpan data bisnis dan menyediakan gambaran kondisi usaha yang bisa ditindaklanjuti.',
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
    label: 'Tailored Solutions',
    detail: 'Setiap sistem dibangun khusus untuk masalah bisnis Anda',
  },
  {
    id: 'stages',
    count: 6,
    suffix: '-Stage',
    label: 'Methodology',
    detail: 'Dari diagnosis sampai optimasi berkelanjutan',
  },
  {
    id: 'partner',
    value: 'End-to-End',
    label: 'Partner',
    detail: 'Dari perencanaan, pembangunan, hingga pendampingan',
  },
] as const;

export type DiagnosticOption = {
  id: string;
  label: string;
  headline: string;
  recommendation: string;
  pillar: string;
};

export const diagnosticOptions: readonly DiagnosticOption[] = [
  {
    id: 'manual-ops',
    label: 'Operasional Manual',
    headline: 'Pekerjaan berulang masih dikerjakan di kertas dan chat.',
    recommendation:
      'Digital Workflow dan Online Forms memindahkan pencatatan manual ke alur terstruktur yang tercatat otomatis.',
    pillar: 'Process Digitalization',
  },
  {
    id: 'weak-presence',
    label: 'Penjualan & Digital Presence',
    headline: 'Prospek baru sulit menemukan dan tidak yakin tentang bisnis Anda.',
    recommendation:
      'Company Website yang profesional dan SEO-ready, ditambah Landing Page terarah untuk menaikkan konversi.',
    pillar: 'Digital Presence',
  },
  {
    id: 'messy-records',
    label: 'Pencatatan & Stok Berantakan',
    headline: 'Data tersebar di beberapa tempat dan sering tidak sinkron.',
    recommendation:
      'Database System terpusat dengan Inventory System sehingga ada satu sumber kebenaran untuk seluruh tim.',
    pillar: 'Business Systems',
  },
  {
    id: 'disconnected-tools',
    label: 'Proses Terputus antar Tim',
    headline: 'Penjualan, stok, dan laporan tidak saling terhubung.',
    recommendation:
      'API Integration dan Automated Reporting membuat data mengalir antar sistem tanpa input ulang manual.',
    pillar: 'Automation & Integration',
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

export const contactInfo = {
  phone: '+62 812-0000-0000',
  email: 'hello@labsite.id',
  address: 'Indonesia',
  website: 'https://labsite.id',
  // TODO: isi dengan tautan resmi LABSITE.ID (Instagram, LinkedIn, WhatsApp)
  socials: [] as readonly { label: string; url: string; icon: LucideIcon }[],
} as const;

export const navLinks = [
  { id: 'about', label: 'Tentang' },
  { id: 'focus', label: 'Fokus' },
  { id: 'problems', label: 'Masalah' },
  { id: 'approach', label: 'Metode' },
  { id: 'solutions', label: 'Solusi' },
  { id: 'work', label: 'Portofolio' },
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
