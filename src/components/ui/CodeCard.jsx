import { VerBadge } from './VerBadge.jsx';
import { FlagButton } from './FlagButton.jsx';

export function CodeCard({ c }) {
  const borderColor = c.conf === 'high' ? '#52d09c' : c.conf === 'medium' ? '#dba94d' : '#6a83a8';

  return (
    <div
      className="rounded-xl p-3.5 mb-2 bg-surface"
      style={{ border: `1px solid ${borderColor}25` }}
    >
      <div className="mb-2">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-mono text-xs font-semibold text-blue">{c.code}</span>
          {!c.cdn && (
            <span className="text-[10px] bg-amber/15 text-amber px-2 py-0.5 rounded-full font-medium">
              International, verify your municipality adopted this edition
            </span>
          )}
        </div>
        <div className="text-[13px] text-text font-medium mb-0.5">{c.full}</div>
        <div className="text-[11px] text-textMuted mb-1.5 italic">Issued by: {c.body}</div>
        <div className="text-xs text-textSub leading-relaxed">{c.scope}</div>
        {c.flags?.map((f, i) => (
          <div key={i} className="text-[11px] text-amber bg-amber/10 rounded px-2.5 py-0.5 mt-1">
            ⚠ {f}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2.5 items-center flex-wrap">
          <VerBadge ver={c.ver} date={c.date} conf={c.conf} />
          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-textMuted no-underline inline-flex items-center gap-1"
            >
              <i className="ti ti-external-link text-[11px]" />
              {c.label}
            </a>
          )}
        </div>
        <FlagButton context={`Flagging code ${c.code}`} compact />
      </div>
    </div>
  );
}
