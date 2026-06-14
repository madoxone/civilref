import { useState } from 'react';

/**
 * Shown the first time someone arrives. Stays in session memory only for now
 * (every new tab shows it again). Once you wire auth, persist the dismissal
 * to the user record so it's truly once-per-account.
 */
export function FirstVisitBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="fvb-title"
      className="fixed bottom-5 left-5 right-5 max-w-[560px] mx-auto bg-surface border border-blue/30 rounded-xl px-5 py-4 z-[300] shadow-2xl"
    >
      <div className="flex items-center gap-2.5 mb-2">
        <i className="ti ti-info-circle text-sm text-blue" />
        <span id="fvb-title" className="text-[14px] font-semibold text-text">
          Quick orientation before you dive in
        </span>
      </div>
      <div className="text-xs text-textSub leading-relaxed mb-3">
        This is a reference, not a stamp. We don't sign off on your design. What we do is give you a clean starting
        point. The badges tell you how much to trust each entry. <span className="text-green">Green</span> means a real
        P.Eng. reviewed it, <span className="text-amber">amber</span> means it's been checked but has caveats,
        <span className="text-textMuted"> grey</span> means nobody has reviewed it yet. The city's current criteria
        always win. The rest is in the menu.
      </div>
      <button
        onClick={() => setOpen(false)}
        className="bg-blue border-none text-white px-4 py-2 rounded-md text-[13px] font-medium cursor-pointer min-h-[40px]"
      >
        Got it
      </button>
    </div>
  );
}
