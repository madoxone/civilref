import { PRIVACY_CONTENT } from '../data/privacy-content.js';

export function PrivacyView() {
  return (
    <div style={{ maxWidth: 720 }}>
      <h2 className="text-[22px] font-semibold text-text mb-2 tracking-tight">How we handle your data</h2>
      <p className="text-[13px] text-textSub leading-relaxed mb-2">
        The plain-English version: we collect what's needed to verify professional credentials, attribute contributions,
        and improve the tool. Nothing else. We host in Canada. We don't sell anything. You can leave any time. The legal
        details below.
      </p>
      <p className="text-xs text-textMuted leading-relaxed mb-6">{PRIVACY_CONTENT.effective}</p>
      {PRIVACY_CONTENT.sections.map((s, i) => (
        <div key={i} className="mb-6">
          <h3 className="text-[15px] font-semibold text-text mb-2">{s.h}</h3>
          <p className="text-[13px] text-textSub leading-relaxed">{s.b}</p>
        </div>
      ))}
      <div className="bg-surfaceHi border border-border rounded-xl px-4 py-4 mt-3">
        <div className="text-[13px] font-medium mb-1.5">Got a question, want your data, or want it gone?</div>
        <div className="text-xs text-textSub leading-relaxed mb-2.5">
          Write us. We answer privacy emails the same week, often the same day.
        </div>
        <a href="mailto:privacy@civilref.ca" className="text-[13px] text-blue no-underline font-medium">
          privacy@civilref.ca
        </a>
        <div className="text-[11px] text-textMuted mt-2 leading-snug">
          Still unhappy? You can take it up with the Office of the Privacy Commissioner of Canada at{' '}
          <a href="https://www.priv.gc.ca/" target="_blank" rel="noopener noreferrer" className="text-blue">priv.gc.ca</a>,
          or the Commission d'accès à l'information du Québec if you're in Quebec.
        </div>
      </div>
    </div>
  );
}
