import { GlossaryText } from '../ui/GlossaryText.jsx';

/**
 * Shared wrapper for every isometric diagram. Standardizes title, caption,
 * SVG viewport, and centring.
 */
export function DiagramFrame({ title, caption, children }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 sm:p-5">
      <div className="text-xs font-semibold text-textSub mb-3 uppercase tracking-wider">{title}</div>
      <div className="bg-bg rounded-lg p-2 overflow-x-auto">
        <svg
          viewBox="0 0 420 280"
          className="w-full max-w-[480px] block mx-auto"
          role="img"
          aria-label={title}
        >
          {children}
        </svg>
      </div>
      {caption && (
        <div className="text-xs text-textMuted mt-2.5 leading-relaxed">
          <GlossaryText text={caption} />
        </div>
      )}
    </div>
  );
}
