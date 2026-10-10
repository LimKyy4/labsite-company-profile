import { tr, type Localized } from './types';

/**
 * Component-level copy.
 *
 * Kept apart from `companyData.ts` on purpose: that file is the *content*
 * model (problems, pillars, projects, manifesto — things a client would argue
 * about in a meeting), while this is the *chrome* (labels, aria strings,
 * button text, validation messages). Same bilingual discipline, different
 * review cycle: a typo in a button label should not need a content review, and
 * a reworded problem statement should not require auditing the nav.
 *
 * Rule for this file: no Indonesian may survive into the `en` side and vice
 * versa. Both sides are written per entry, never derived by machine translation
 * at runtime, so a missing pair is a type error rather than a silent fallback.
 */
export const ui = {
  /* ── Global ─────────────────────────────────────────────────────────── */
  global: {
    langSwitchLabel: tr('Bahasa', 'Language'),
    openMenu: tr('Buka menu', 'Open menu'),
    closeMenu: tr('Tutup menu', 'Close menu'),
    themeToDark: tr('Aktifkan mode gelap', 'Switch to dark mode'),
    themeToLight: tr('Aktifkan mode terang', 'Switch to light mode'),
  },

  /* ── Navbar ─────────────────────────────────────────────────────────── */
  nav: {
    aria: tr('Navigasi utama', 'Main navigation'),
    statusLabel: tr('Status Sistem', 'System Status'),
    latency: tr('Latensi', 'Latency'),
    cta: tr('Konsultasi', 'Consult'),
    drawerCta: tr('Mulai Diagnosis', 'Start Diagnosis'),
    roleShort: tr('Rekayasa TI', 'IT Engineering'),
    brandRole: tr('Mitra Rekayasa TI Profesional', 'Professional IT Engineering Partner'),
  },

  /* ── Hero ───────────────────────────────────────────────────────────── */
  hero: {
    headlineLead: tr('Kami mentransformasi operasional', 'We turn'),
    headlineAccent: tr(
      'yang berantakan menjadi sistem digital',
      'disjointed operations into digital systems',
    ),
    headlineTail: tr(
      'yang otomatis, andal, dan terukur.',
      'that run automatically, reliably, and measurably.',
    ),
    description: tr(
      'Setiap arsitektur direkayasa dari nol untuk menjamin kecepatan tinggi, keamanan kelas enterprise, dan kemudahan pengembangan tanpa beban template instan.',
      'Every architecture is engineered from the ground up to deliver high speed, enterprise-grade security, and maintainable extensibility without the bloat of off-the-shelf templates.',
    ),
    ctaPrimary: tr('Konsultasi Masalah Anda', 'Consult About Your Problem'),
    ctaSecondary: tr('Baca Code Manifesto', 'Read the Code Manifesto'),
    audienceLocal: tr('UMKM & bisnis lokal', 'SME & local business'),
    audienceDiagnose: tr('Diagnosis sebelum solusi', 'Diagnosis before solution'),
    audiencePartner: tr('Mitra jangka panjang', 'Long-term partner'),
    proofLabel: tr('Operasional yang kami serahkan', 'Operations we hand over'),
    proofRailLabel: tr('Statistik utama', 'Key figures'),
    statTailoredLabel: tr('Dibangun khusus', 'Custom-Built'),
    statTailoredDetail: tr(
      'Setiap sistem ditulis khusus untuk masalah bisnis Anda',
      'Every system is written specifically for your business problem',
    ),
    statStagesLabel: tr('Protokol Pengiriman', 'Delivery Protocol'),
    statStagesDetail: tr(
      'Dari diagnosis sampai optimasi, dengan keluaran tiap tahap',
      'From diagnose to optimize, with a deliverable per stage',
    ),
    statPartnerLabel: tr('Mitra Rekayasa', 'Engineering Partner'),
    statPartnerDetail: tr(
      'Arsitektur, pengembangan, penerapan, dan pendampingan berkelanjutan',
      'Architecture, build, deploy, and continuous support',
    ),
    statSuffixStages: tr('-TAHAP', '-STAGE'),
  },

  /* ── Scope Diagnoser ────────────────────────────────────────────────── */
  diagnoser: {
    title: tr('Pendiagnosa Cakupan', 'Scope Diagnoser'),
    live: tr('Langsung', 'Live'),
    legendProblem: tr('01 // Hambatan utama', '01 // Primary blocker'),
    legendScale: tr('02 // Skala bisnis', '02 // Business scale'),
    scaleAria: tr('Skala bisnis', 'Business scale'),
    railLabel: tr('Hambatan bisnis', 'Business blockers'),
    recommendationTitle: tr('Rekomendasi modul', 'Recommended modules'),
    stackTitle: tr('Stack untuk skala', 'Stack for scale'),
    viewDiagram: tr('Lihat diagram arsitektur', 'View the architecture diagram'),
    footnote: tr('Diagnosis instan · tanpa registrasi', 'Instant diagnosis · no sign-up'),
  },

  /* ── About ──────────────────────────────────────────────────────────── */
  about: {
    titleLead: tr('Kami tidak menjual teknologi.', 'We do not sell technology.'),
    titleTail: tr('Kami memperbaiki operasi.', 'We repair operations.'),
    description: tr(
      ' adalah mitra rekayasa sistem bagi UMKM dan bisnis lokal: diagnosis dulu, baru arsitektur, lalu kode — dengan hasil yang bisa diukur.',
      ' is a systems-engineering partner for SMEs and local businesses: diagnosis first, then architecture, then code — with results you can measure.',
    ),
    railLabel: tr('Tentang LABSITE.ID', 'About LABSITE.ID'),
    positionEyebrow: tr('Posisi Kami', 'Our Position'),
    positionHeading: tr(
      'Rekayasa Operasinya, Bukan Demo-nya',
      'Engineer The Operation, Not The Demo',
    ),
    positionBody1: tr(
      'Sistem gagal bukan karena stack-nya salah, tetapi karena dibangun tanpa diagnosis. Urutan itu kami balik: hambatan operasional dipetakan dan diukur lebih dulu.',
      'Systems fail not because the stack is wrong, but because they were built without a diagnosis. We invert that order: operational blockers are mapped and measured first.',
    ),
    positionBody2: tr(
      'Baru setelah angka masalahnya jelas, arsitektur dipilih — dan setiap keputusan arsitektur harus bisa ditunjuk ke hambatan yang mengatasinya.',
      'Only once the numbers are clear is the architecture chosen — and every architectural decision must point back to the blocker it resolves.',
    ),
    positionFocus: tr('Fokus', 'Focus'),
    positionFocusValue: tr('UMKM & lokal', 'SME & local'),
    positionApproach: tr('Pendekatan', 'Approach'),
    positionApproachValue: tr('Diagnosis dulu', 'Diagnosis first'),
    positionRelation: tr('Hubungan', 'Relationship'),
    positionRelationValue: tr('Mitra panjang', 'Long-term partner'),
    visionTitle: tr('Visi', 'Vision'),
    missionTitle: tr('Misi Kami', 'Our Mission'),
    missionChip: tr(' prinsip kerja', ' operating principles'),
  },

  /* ── Focus & Belief ─────────────────────────────────────────────────── */
  focus: {
    description: tr(
      'Empat tahap yang selalu kami jalankan, apa pun masalah yang dibawa klien — dari audit lapangan sampai sistem yang siap bertumbuh.',
      'Four stages we run regardless of the problem a client brings — from field audit through to a system ready to grow.',
    ),
    railLabel: tr('Empat tahap fokus', 'Four focus stages'),
    stagePrefix: tr('Tahap ', 'Stage '),
    methodologyLink: tr('Lihat tahap metodologinya', 'See the methodology stage'),
    beliefEyebrow: tr('Keyakinan Kami', 'Our Belief'),
    beliefQuote: tr(
      'Software harus menghilangkan beban operasional, bukan memindahkannya. Setiap baris yang kami kirim harus-convince lewat runtime-nya.',
      'Software should eliminate operational drag, not relocate it. Every line we ship has to earn its runtime.',
    ),
  },

  /* ── Problems ───────────────────────────────────────────────────────── */
  problems: {
    title: tr(
      'Tujuh hambatan yang paling sering menahan pertumbuhan.',
      'Seven blockers that most often hold growth back.',
    ),
    description: tr(
      'Gejala, dampak, dan jalur perbaikannya. Geser untuk menelusuri, ketuk kartu untuk melihat bagaimana sistem kami menyelesaikannya.',
      'Symptom, impact, and the path to a fix. Scroll to browse, tap a card to see how our systems resolve it.',
    ),
    railLabel: tr('Daftar diagnosis', 'Diagnostic index'),
    cardCta: tr('Solusi', 'Solution'),
    drawerEyebrow: tr('Diagnosis', 'Diagnosis'),
    drawerClose: tr('Tutup', 'Close'),
    drawerSymptom: tr('Gejala', 'Symptom'),
    drawerImpact: tr('Dampak bisnis', 'Business impact'),
    drawerResolution: tr('Bagaimana LABSITE.ID menyelesaikannya', 'How LABSITE.ID resolves it'),
    drawerRelated: tr('Pilar arsitektur terkait', 'Related architecture pillars'),
  },

  /* ── Approach ───────────────────────────────────────────────────────── */
  approach: {
    title: tr('Enam tahap, satu kelanjutan.', 'Six stages, one continuity.'),
    description: tr(
      'Setiap tahap punya keluaran yang jelas dan disetujui sebelum lanjut, sehingga tidak ada yang dibangun dengan asumsi.',
      'Every stage has a clear deliverable approved before the next begins, so nothing gets built on assumption.',
    ),
    railLabel: tr('Enam tahap kerja', 'Six working stages'),
    deliverable: tr('Keluaran', 'Deliverable'),
    approvalNote: tr(
      'Disetujui bersama sebelum masuk ke tahap berikutnya.',
      'Approved together before moving to the next stage.',
    ),
    stageSuffix: tr('Tahap ', 'Stage '),
  },

  /* ── Manifesto ──────────────────────────────────────────────────────── */
  manifesto: {
    eyebrow: tr('Cara kami menulis kode', 'How we write code'),
    title: tr('Tiga aturan yang tidak kami kompromikan.', 'Three rules we do not compromise.'),
    description: tr(
      'Aturan ini yang menentukan bentuk kode yang kami serahkan. Bukan preferensi estetika — ini batasan teknis yang menjaga sistem Anda tetap cepat, aman, dan bisa tumbuh.',
      'These rules determine the shape of the code we hand over. Not an aesthetic preference — these are technical constraints that keep your system fast, secure, and able to grow.',
    ),
    badgeLaneAria: tr('Klaim teknis dan batasan arsitektur', 'Technical claims and architecture constraints'),
  },

  /* ── Solutions ──────────────────────────────────────────────────────── */
  solutions: {
    title: tr('Empat pilar. Satu arsitektur.', 'Four pillars. One architecture.'),
    description: tr(
      'Setiap pilar berdiri sendiri atau digabung, tergantung masalah yang benar-benar Anda hadapi — bukan tergantung paket yang paling mahal.',
      'Each pillar stands alone or combines, depending on the problem you actually face — not on which package costs the most.',
    ),
    tabAria: tr('Pilar arsitektur', 'Architecture pillars'),
    moduleCount: tr(' modul dalam pilar ini', ' modules in this pillar'),
  },

  /* ── Architecture Viewer ─────────────────────────────────────────────── */
  architecture: {
    title: tr('Penelusur Arsitektur', 'Architecture Viewer'),
    tracing: tr('Menelusuri', 'Tracing'),
    pickProblem: tr(
      'Pilih masalah untuk melihat alur sistem',
      'Pick a problem to see the system path',
    ),
    tabAria: tr('Pilih masalah bisnis', 'Pick a business problem'),
    idleLabel: tr('Idle · tidak dipakai oleh alur ini', 'Idle · unused by this path'),
    flowTo: tr('alur ke', 'path to'),
  },

  /* ── Projects ───────────────────────────────────────────────────────── */
  projects: {
    title: tr('Dua sistem yang bisa Anda buka sendiri.', 'Two systems you can open yourself.'),
    description: tr(
      'Keduanya masih live di environment publik. Periksalah sendiri kecepatannya, alur datanya, dan apakah masalah yang Anda bawa benar-benar terjawab.',
      'Both are still live in a public environment. Check the speed, the data flow, and whether the problem you brought is genuinely answered.',
    ),
    viewAria: tr('Mode tampilan studi kasus', 'Case study view mode'),
    viewChallenges: tr('Hambatan Klien', 'Client Challenges'),
    viewSolutions: tr('Yang Kami Bangun', 'What We Built'),
    challengesHeading: tr('Hambatan yang ditemukan', 'Challenges identified'),
    solutionsHeading: tr('Yang kami bangun', 'What we built'),
    openTab: tr('Buka di tab baru', 'Open in a new tab'),
    visitSite: tr('Kunjungi Website Live', 'Visit the Live Website'),
    mockLive: tr('Stok Langsung', 'Live Stock'),
    mockSync: tr('Sinkron 0ms', 'Synced 0ms'),
    mockActivity: tr('Aktivitas terbaru', 'Latest activity'),
  },

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqTitle: tr('Pertanyaan yang paling sering muncul.', 'The questions that come up most.'),
  faqDescription: tr(
    'Cost, lock-in, timeline, dan pendampingan — dijawab terbuka sebelum Anda mengisi formulir.',
    'Cost, lock-in, timeline, and support — answered openly before you fill in a single form.',
  ),

  /* ── Contact ────────────────────────────────────────────────────────── */
  contact: {
    title: tr('Ceritakan sistemnya. Kami petakan jalurnya.', 'Describe the system. We map the route.'),
    description: tr(
      'Konsultasi awal tidak dipungut biaya. Tidak ada rekomendasi sebelum masalah Anda terpetakan.',
      'The first consultation carries no fee. No recommendation is made before your problem is mapped.',
    ),
    legendNeeds: tr('Fokus kebutuhan Anda', 'What you need'),
    labelName: tr('Nama', 'Name'),
    labelEmail: tr('Email', 'Email'),
    labelMessage: tr('Masalah bisnis Anda', 'Your business problem'),
    placeholderName: tr('Nama Anda', 'Your name'),
    placeholderEmail: tr('nama@bisnis.com', 'name@business.com'),
    placeholderMessage: tr(
      'Ceritakan kondisi bisnis saat ini dan apa yang menghambatnya.',
      'Describe your current business situation and what is holding it back.',
    ),
    errorName: tr('Nama minimal 2 karakter.', 'Name must be at least 2 characters.'),
    errorEmail: tr('Format email belum benar.', 'That email format is not valid.'),
    errorScope: tr('Pilih minimal satu fokus kebutuhan.', 'Pick at least one focus area.'),
    errorMessage: tr('Ceritakan masalahnya minimal 10 karakter.', 'Describe the problem in at least 10 characters.'),
    submit: tr('Kirim Permintaan', 'Send Request'),
    sending: tr('Mengirim', 'Sending'),
    responseNote: tr(
      'Menjawab 1x24 jam kerja · tanpa biaya konsultasi awal',
      'Replies within 1 business day · no initial consultation fee',
    ),
    sent: tr(
      'Pesan terkirim. Tim kami akan menghubungi Anda dalam 1x24 jam kerja.',
      'Message sent. Our team will contact you within 1 business day.',
    ),
    directContact: tr('Kontak langsung', 'Direct contact'),
    nextStepTitle: tr('Langkah berikutnya', 'Next steps'),
    nextSteps: [
      tr('Kami membaca deskripsi hambatan yang Anda bawa.', 'We read the blocker description you bring.'),
      tr(
        'Kami jadwalkan sesi diagnosis singkat — 30 menit.',
        'We schedule a short diagnostic session — 30 minutes.',
      ),
      tr(
        'Kami susun roadmap sistem, modul, dan estimasi kerja.',
        'We draft the system roadmap, modules, and effort estimate.',
      ),
    ],
    labelPhone: tr('Telepon', 'Phone'),
    labelRegion: tr('Wilayah', 'Region'),
    socialsSoon: tr('Tautan sosial media resmi segera hadir.', 'Official social links coming soon.'),
    footerNav: tr('Navigasi', 'Navigation'),
    footerContact: tr('Kontak', 'Contact'),
    copyright: tr('Seluruh hak cipta dilindungi.', 'All rights reserved.'),
    backToTop: tr('Kembali ke atas', 'Back to top'),
  },

  /* ── Contact scope options ──────────────────────────────────────────── */
  scopeTypes: [
    tr('Digital Presence', 'Digital Presence'),
    tr('Operational Efficiency', 'Operational Efficiency'),
    tr('Data & Documentation', 'Data & Documentation'),
    tr('Customer & Marketing', 'Customer & Marketing'),
    tr('Internal Systems', 'Internal Systems'),
    tr('Automation & Integration', 'Automation & Integration'),
    tr('Lainnya', 'Others'),
  ],

  /* ── System log ─────────────────────────────────────────────────────── */
  systemLog: {
    dismiss: tr('Tutup log', 'Dismiss log'),
  },

  /* ── Head metadata (title/description/OpenGraph) ───────────────────── */
  /* Written to the document head by LanguageProvider on every language
     switch, so crawlers and social scrapers always see the locale actually
     being served. Static Indonesian defaults live in index.html for the
     no-JS case. */
  seo: {
    title: tr(
      'LABSITE.ID — Mitra Rekayasa TI Profesional',
      'LABSITE.ID — Professional IT Engineering Partner',
    ),
    description: tr(
      'LABSITE.ID adalah mitra rekayasa sistem untuk UMKM dan bisnis lokal: diagnosis dulu, lalu arsitektur, lalu kode — custom-built, zero bloat, dan terukur.',
      'LABSITE.ID is a systems-engineering partner for SMEs and local businesses: diagnosis first, then architecture, then code — custom-built, zero bloat, and measurable.',
    ),
  },
} as const satisfies Record<string, unknown>;

export type UiDictionary = typeof ui;

/** Convenience for arrays of pairs, e.g. the contact scope chips. */
export function trAll(pairs: readonly Localized[]): readonly Localized[] {
  return pairs;
}