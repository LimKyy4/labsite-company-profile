import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ExternalLink, Lock } from 'lucide-react';
import { projects, type Project } from '../data/companyData';
import { EDITORIAL, Hairline, Reveal, RevealGroup, RevealItem, SPRING, SwissIndex } from './ui';

type View = 'challenges' | 'solutions';

const views: { id: View; label: string }[] = [
  { id: 'challenges', label: 'Tantangan Klien' },
  { id: 'solutions', label: 'Solusi Yang Dibangun' },
];

export default function Projects() {
  const [view, setView] = useState<View>('solutions');

  return (
    <section id="work" className="surface relative py-section">
      <Hairline className="absolute inset-x-0 top-0" />

      <div className="shell">
        <Reveal>
          <SwissIndex index="05" label="FEATURED PROJECTS" />
        </Reveal>
        <Reveal delay={0.05} className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-3xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)]">
              Dua sistem yang bisa Anda coba sendiri.
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-fluid-base leading-relaxed text-[var(--text-secondary)]">
              Setiap project aktif di environment publik, jadi Anda bisa langsung membuka dan
              menilai hasilnya.
            </p>
          </div>

          <div
            role="group"
            aria-label="Mode tampilan studi kasus"
            className="inline-flex shrink-0 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] p-1"
          >
            {views.map((item) => {
              const isActive = item.id === view;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  aria-pressed={isActive}
                  className={`relative rounded-full px-5 py-2.5 text-xs font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--accent-contrast)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="project-toggle"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={SPRING}
                    />
                  ) : null}
                  <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 xl:grid-cols-2">
          {projects.map((project) => (
            <RevealItem key={project.id}>
              <ProjectShowcase project={project} view={view} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ProjectShowcase({ project, view }: { project: Project; view: View }) {
  const host = project.liveUrl.replace(/^https?:\/\//, '').replace(/\?.*$/, '');
  const items = view === 'challenges' ? project.challenges : project.solutions;

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1">
      {/* macOS window chrome */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--accent-soft)] px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#E1584E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5A03C]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#57A64A]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1">
          <Lock className="h-2.5 w-2.5 shrink-0 text-[var(--text-muted)]" strokeWidth={2.5} />
          <span className="truncate font-mono text-[11px] text-[var(--text-muted)]">{host}</span>
        </div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Buka ${project.name} di tab baru`}
          className="shrink-0 text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--accent)]"
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
        </a>
      </div>

      {/* Schematic preview of the delivered interface.
          TODO: replace with real product screenshots once available. */}
      <div className="border-b border-[var(--border)] bg-[var(--bg)] p-5">
        <p className="swiss-index">{project.preview.headline}</p>
        <div className="mt-4 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
            <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--text-muted)]">
              {project.name}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[var(--border)] sm:grid-cols-4">
            {project.preview.blocks.map((block) => (
              <div key={block.id} className="bg-[var(--bg-elevated)] px-3 py-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {block.name}
                </p>
                <p className="mt-1.5 font-display text-sm font-semibold tabular text-[var(--text-primary)]">
                  {block.metric}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2 p-3" aria-hidden>
            <div className="h-2 w-3/4 rounded-full bg-[var(--border)]" />
            <div className="h-2 w-1/2 rounded-full bg-[var(--border)]" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="h-10 rounded-md border border-[var(--border)]" />
              <div className="h-10 rounded-md border border-[var(--border)]" />
              <div className="h-10 rounded-md border border-[var(--accent)]/40 bg-[var(--accent-soft)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="chip">{project.industry}</span>
          <span className="swiss-index">{project.category}</span>
        </div>

        <h3 className="mt-6 font-display text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {project.name}
        </h3>
        <p className="mt-3 max-w-[58ch] text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.summary}
        </p>

        <div className="mt-7 min-h-[10.5rem] rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
          <p className="swiss-index">
            {view === 'challenges' ? 'Tantangan yang ditemukan' : 'Yang kami bangun'}
          </p>
          <AnimatePresence mode="wait">
            <motion.ul
              key={`${project.id}-${view}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.26, ease: EDITORIAL }}
              className="mt-4 space-y-2.5"
            >
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  {view === 'challenges' ? (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B4483A]" strokeWidth={1.6} />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.6} />
                  )}
                  {item}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="chip normal-case tracking-normal">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--bg)] p-5">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary w-full text-xs"
        >
          Kunjungi Website Live
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}
