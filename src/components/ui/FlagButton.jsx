import { useState } from 'react';

/**
 * Inline "this looks wrong" button. Opens a small note field, on submit it
 * stays in a "thanks" state for the rest of the page life.
 * Wire onSubmit to your backend when ready.
 */
export function FlagButton({ context, compact, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  function submit() {
    if (onSubmit) onSubmit({ context, note });
    setSent(true);
    setOpen(false);
  }

  if (sent) {
    return (
      <span className="text-[11px] text-amber inline-flex items-center gap-1">
        <i className="ti ti-flag-check" /> Thanks, on it.
      </span>
    );
  }

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`text-[11px] bg-transparent border border-border text-textMuted rounded-md cursor-pointer font-sans inline-flex items-center gap-1 ${
          compact ? 'px-2 py-0.5' : 'px-2.5 py-1'
        }`}
      >
        <i className="ti ti-flag" /> Looks wrong
      </button>
      {open && (
        <div className="absolute right-0 top-[2em] z-[90] w-[300px] bg-surface border border-border rounded-lg p-3.5 shadow-2xl">
          <div className="text-xs text-textSub mb-1 font-medium">Tell us what's wrong</div>
          <div className="text-[11px] text-textMuted mb-2 leading-snug">
            {context}. A P.Eng. on our review team will look at this and either fix it or get back to you.
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's off, and what should it say instead? A page or clause reference helps."
            className="w-full text-xs p-2 border border-border rounded-md bg-bg text-text resize-y min-h-[60px] font-sans outline-none"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={submit}
              className="text-xs bg-blueDim border border-blue/30 text-blue px-3.5 py-1 rounded-md cursor-pointer"
            >
              Submit
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-xs bg-transparent border border-border text-textMuted px-3.5 py-1 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
