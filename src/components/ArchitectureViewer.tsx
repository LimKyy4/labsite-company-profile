import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Radio, Waypoints } from 'lucide-react';
import { archFlows, archNodes, diagnosticOptions } from '../data/companyData';
import { useReducedMotion } from '../hooks';
import { EDITORIAL, SPRING_TAP } from './ui';

/**
 * Live Architecture Viewer.
 *
 * Pick a business problem; the node graph lights the exact path that problem
 * would travel through our stack. Three decisions shaped it:
 *
 * 1. The path comes from `archFlows` in the data layer, so adding a node or a
 *    flow is a data edit, never a layout edit.
 * 2. One flex track does both orientations — a column with a downward
 *    connector on tablet, a row with a rightward connector from `xl`. No
 *    absolutely positioned overlay, so nothing can drift off the nodes at a
 *    breakpoint and nothing can overflow the viewport. `xl` rather than `lg`
 *    because five node cards need roughly 900px before their labels start
 *    truncating, and a truncated architecture diagram is worse than a stack.
 * 3. Nodes off the selected path stay visible but dimmed. Hiding them would
 *    make the graph feel like it is inventing infrastructure; showing them
 *    makes clear which parts of the stack a given problem simply does not use.
 */
export default function ArchitectureViewer() {
  const [flowId, setFlowId] = useState(archFlows[0].id);
  const reduced = useReducedMotion();
  const flow = archFlows.find((item) => item.id === flowId) ?? archFlows[0];

  const path = flow.path
    .map((id) => archNodes.find((node) => node.id === id))
    .filter(isNode);
  const idle = archNodes.filter((node) => !flow.path.includes(node.id));

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2">
          <Waypoints className="h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.6} />
          <span className="font-display text-sm font-medium tracking-tight">
            Live Architecture Viewer
          </span>
        </span>
        <span className="ml-auto flex items-center gap-2">
          <Radio className="h-3 w-3 text-[var(--accent)]" strokeWidth={2} />
          <span className="swiss-index swiss-index-nowrap">Tracing</span>
        </span>
      </header>

      <div className="border-b border-[var(--border)] px-4 py-4 sm:px-5">
        <p className="swiss-index">Pilih masalah untuk melihat alur sistem</p>
        <div role="tablist" aria-label="Pilih masalah bisnis" className="mt-3 flex flex-wrap gap-2">
          {archFlows.map((item) => {
            const active = item.id === flow.id;
            const option = diagnosticOptions.find((entry) => entry.id === item.id);
            return (
              <motion.button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFlowId(item.id)}
                whileTap={{ scale: 0.96 }}
                transition={SPRING_TAP}
                className={`rounded-full border px-3.5 py-2 text-[11px] font-medium transition-colors duration-300 ease-editorial ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                }`}
              >
                {option?.label ?? item.id}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {/* Active path. `key` on the track restarts the connector animation
            whenever the selection changes, which is the whole feedback loop. */}
        <motion.ol
          key={flow.id}
          initial="hidden"
          animate="show"
          className="flex flex-col xl:flex-row xl:items-stretch"
        >
          {path.map((node, index) => (
            <motion.li
              key={node.id}
              variants={nodeVariants}
              custom={index}
              /* Column on small screens (card, then a downward connector under
                  it); row from `xl` so the connector becomes a vertical slice
                  of the row height and its arrow centres between two nodes
                  instead of collapsing to the card's bottom edge. */
              className="flex min-w-0 flex-1 flex-col xl:flex-row xl:items-stretch"
            >
              <ArchNodeCard node={node} order={index} />
              {index < path.length - 1 ? (
                <Connector next={path[index + 1]?.label ?? ''} animated={!reduced} />
              ) : null}
            </motion.li>
          ))}
        </motion.ol>

        {/* Nodes this problem does not touch. */}
        <div className="mt-4 border-t border-[var(--border)] pt-3.5">
          <p className="swiss-index">Idle · tidak dipakai oleh alur ini</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {idle.map((node) => {
              const Icon = node.icon;
              return (
                <li
                  key={node.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[11px] text-[var(--text-muted)]"
                >
                  <Icon className="h-3 w-3 shrink-0" strokeWidth={1.8} />
                  <span className="truncate">{node.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={flow.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: EDITORIAL }}
            className="mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13px] leading-relaxed text-[var(--text-secondary)]"
          >
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={2} />
            {flow.caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

const nodeVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: EDITORIAL, delay: index * 0.055 },
  }),
};

function ArchNodeCard({
  node,
  order,
}: {
  node: (typeof archNodes)[number];
  order: number;
}) {
  const Icon = node.icon;

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-3 py-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--accent)]/40 text-[var(--accent)]">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="status-pulse" aria-hidden />
          <span className="font-mono text-[9px] uppercase leading-none tracking-[0.16em] text-[var(--accent)]">
            hop {String(order + 1).padStart(2, '0')}
          </span>
        </span>
        <span className="mt-1.5 block truncate font-mono text-[12px] font-medium leading-tight text-[var(--text-primary)]">
          {node.label}
        </span>
        <span className="mt-1 block truncate text-[10.5px] leading-tight text-[var(--text-secondary)]">
          {node.role}
        </span>
      </span>
    </div>
  );
}

/**
 * Flow connector. A hairline with a rightward arrow between two nodes on wide
 * screens, a downward arrow between two stacked nodes below `xl`. Drawn with
 * absolutely positioned spans inside a box that participates in the flex track,
 * so it never needs measuring and cannot push the layout around.
 */
function Connector({ next, animated }: { next: string; animated: boolean }) {
  return (
    <span
      role="presentation"
      aria-label={`alur ke ${next}`}
      className="relative flex h-5 shrink-0 items-center justify-center xl:h-auto xl:w-5"
    >
      <span className="relative flex h-full w-5 items-center justify-center xl:h-px xl:w-full">
        {/* Track */}
        <span className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-[var(--accent)]/40 xl:inset-x-1 xl:inset-y-auto xl:top-1/2 xl:h-px xl:w-auto xl:-translate-y-1/2" />
        {animated ? (
          <span className="absolute h-1 w-1 rounded-full bg-[var(--accent)] xl:hidden" />
        ) : null}
        <ArrowDown
          className="absolute -bottom-0.5 left-1/2 h-3 w-3 -translate-x-1/2 text-[var(--accent)] xl:hidden"
          strokeWidth={2.4}
        />
        <ArrowRight
          className="absolute -right-1 top-1/2 hidden h-3 w-3 -translate-y-1/2 text-[var(--accent)] xl:block"
          strokeWidth={2.4}
        />
      </span>
    </span>
  );
}

function isNode(
  node: (typeof archNodes)[number] | undefined,
): node is (typeof archNodes)[number] {
  return node !== undefined;
}
