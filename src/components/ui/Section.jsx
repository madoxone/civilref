/**
 * A titled section card. `n` is the optional small numeric badge in the header.
 */
export function Section({ n, title, color, children, action }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        {n && (
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
            style={{
              background: `${color}24`,
              border: `1px solid ${color}55`,
              color,
            }}
          >
            {n}
          </div>
        )}
        <span className="text-xs font-semibold text-textSub uppercase tracking-wider flex-1">{title}</span>
        {action}
      </div>
      <div className="bg-surface border border-border rounded-xl p-4 sm:p-5">{children}</div>
    </div>
  );
}
