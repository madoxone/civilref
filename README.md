# CivilRef.ca — Backend Package

This folder turns CivilRef from a prototype with hardcoded data into a real
platform where engineers contribute data and admins approve it before it goes live.

## What's in here

| File | What it is | What you do with it |
|------|-----------|---------------------|
| **SETUP-GUIDE.docx** | Step-by-step walkthrough | **Read this first.** Written for a first-timer. |
| `01_schema.sql` | Builds the database tables | Paste into Supabase SQL Editor, run first |
| `02_security.sql` | Sets the security rules | Run second |
| `03_seed.sql` | Loads your starting data | Run third |
| `admin-dashboard.jsx` | The admin/contributor tool | Paste in your 2 Supabase keys, then deploy |

## The 60-second overview

1. **Create a free Supabase project** (your database lives there).
2. **Run the 3 SQL files** in order — this builds everything.
3. **Paste your 2 keys** into `admin-dashboard.jsx`.
4. **Sign up, make yourself admin**, and you have a working contributor + review system.

## How the data flows

```
Engineer submits a value  →  saved as "pending" (not live)
        ↓
Verifier/admin reviews it in the queue  →  approve or reject
        ↓
On approval: goes live, stamped with verifier's name + credential + date
        ↓
Every action recorded in an audit log (nothing changes silently)
```

This is what makes the "verified by P.Eng." badges in the main app **real** instead
of cosmetic — they reflect an actual credentialed person who reviewed an actual
submission against an actual source.

## Roles

- **engineer** — can submit data (starts as pending)
- **verifier** — can also approve/reject submissions and resolve flags
- **admin** — can also manage people, verify credentials, and assign roles

## The one remaining step

Wiring the *main app* to read from this database (instead of its hardcoded data)
is the final piece — described in Part 5 of the setup guide. It's the smallest
part and the one place a developer's help is most useful. The database, security,
and entire contributor/admin system are already done.

## Cost

Everything here runs on free tiers (Supabase free tier, and free hosting like
Vercel or Netlify for the dashboard). You can start at $0 and only pay if you
grow past the generous free limits.
