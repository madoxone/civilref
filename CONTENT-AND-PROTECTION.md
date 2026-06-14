# Content Protection & Admin Editing — How It Works

This document explains exactly what the content protection layer does, what it doesn't do, and how admin editing flows from the dashboard to the live site. Read this so you can answer users and contributors accurately.

## The content protection layer (deterrence, not security)

### What it does

When a user opens the platform, the following protections are active:

- **Right-click context menu is disabled** on display content (the main reference text, codes, requirements, About pages, diagrams).
- **Text selection is disabled** on display content. A user cannot drag-select a paragraph to copy it.
- **Standard copy keyboard shortcuts** (Cmd/Ctrl+C, X, A) are intercepted on display content.
- **Image and SVG drag** is disabled. A user cannot drag a diagram out of the browser.
- **Printing shows a notice instead of content.** A user who tries to print the page sees a message saying the content is not licensed for printing.
- **A session watermark** appears in the lower-right corner with a random session ID and the date. If someone screenshots the page, the watermark goes with the screenshot.

### What it explicitly doesn't do (and why)

- **Form inputs remain fully usable.** Users can still type in calculator fields, search boxes, and submission forms. Right-click works in those fields so they can paste, spell-check, and use accessibility features.
- **Screen readers still work.** We do not hide content from assistive technology. A visually-impaired user must be able to access the platform — this is required under the Accessible Canada Act and Ontario's AODA, and it's the right thing to do.
- **Developer tools are not blocked.** Blocking them is futile (the user can disable JavaScript or use a different browser) and harms developers who legitimately want to inspect the page.

### What this protection actually accomplishes

The honest answer: it sets an expectation. A user who right-clicks expecting to "save image" or who drag-selects expecting to "copy and paste into a report" gets a clear signal that the content isn't free to take. That signal, combined with the copyright notice in the disclosures and the watermark on the page, has real legal weight if someone scrapes the platform despite the signals.

What it does not do is **prevent** copying. Anyone with intent and basic browser knowledge can bypass it in under a minute. The platform's real protection is:

1. The copyright and acceptable-use clause in the Disclosures page.
2. The session watermark that travels with screenshots.
3. The audit trail of authenticated access (once Supabase is wired in).
4. Canadian copyright law and fair-dealing limits.

Tell users honestly: "We've made the content not easy to copy because it's the work of professional contributors. Please treat it as the reference it is."

---

## Admin content editing

### The architecture

The platform separates **what the user sees** from **what an admin can edit** through the database. Once Supabase is wired in:

1. The main app reads About content from the `editable_content` table at page load.
2. The admin dashboard writes to the same table via the "Edit content" tab.
3. Every save is recorded in `audit_log` with the admin's name, the section edited, and a timestamp.

This means an admin can update the Overview of the Utilities About page on a Tuesday morning, and any user who loads the page after that moment sees the new text. No code change, no redeploy.

### Who can do what

| Role | About-page editing |
|------|-------------------|
| **Public visitor** | Read only. Sees only `status = 'published'` rows. |
| **Engineer** | Read only. Cannot edit About content directly (they can submit *new* codes and requirements through the regular submission flow). |
| **Verifier** | Read only on About pages. (They review submissions in other tables.) |
| **Admin** | Full edit access. Every change is logged. |

About-page editing is admin-only by design. The submission/review queue exists for codes and requirements where you want multiple engineers contributing data. About pages are more like editorial content — one or two people should own them.

### How an admin edits a section, step by step

1. Sign in to the admin dashboard with an admin account.
2. Click "Edit content" in the top navigation.
3. Pick the discipline (Utilities, Traffic, Structural, Civil, Construction).
4. Each section appears as its own card with a text area: Headline, Overview, Scope of work, Common project types, Key standards bodies, Career paths, Further reading.
5. Edit the section's text in the text area.
6. Click "Save section." The change is immediate.
7. The next user to load that discipline's About page in the main app sees the new text.

The save is per-section, not per-page. An admin can update one section now and leave the others for later. There's no draft state — if you save something, it's live.

### Bringing your friend in

The flow for getting your friend involved:

1. They register an account in the admin dashboard.
2. You promote them to `admin` from the People tab (or directly in the Supabase Table Editor by changing their `role` from `engineer` to `admin`).
3. They sign in, go to "Edit content," and write the About pages section by section.
4. Their name appears in the audit log next to every edit, so you have a clear record.

If you'd rather have them as a `verifier` (who submits content for your approval rather than publishing directly), that's a different flow — let me know and I'll add a "pending About content" review queue.

### What if Supabase isn't wired in yet?

Until the main app is wired to Supabase, About content lives in the `ABOUT_CONTENT` constant inside `civilref-ca-v6.jsx`. Your friend can edit that constant directly (it's plain text in `[brackets]` placeholders) and you redeploy.

Once the wiring step is complete, that constant becomes a fallback — the live data is whatever's in the database, and your friend edits it through the dashboard instead of through the code file.

The migration file `04_editable_content.sql` creates the table and pre-loads empty rows for every section, so the admin dashboard has something to work with from day one.

---

## What I still cannot do for you

To be clear about the production gap:

- I cannot create the Supabase project. You need to do that (see SETUP-GUIDE.docx).
- I cannot deploy the apps to a real domain. Vercel/Netlify deployment is a separate step.
- I cannot guarantee the database integration works on the first try without you running it and reporting errors.
- I cannot replace the need for a Canadian privacy lawyer to review the policy and terms of use before public launch.

Everything I can build in code is now built. The remaining work is the infrastructure setup, which I'll walk you through one screen at a time when you're ready.
