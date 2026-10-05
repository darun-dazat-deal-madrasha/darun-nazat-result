# Darun Nazat Result — Supabase Integrated Package

## Already completed
- Supabase project URL configured.
- Public website uses Supabase publishable key only.
- Existing result UI preserved.
- Public result search, class-wise result, A+ and merit list now read from `result_records`.
- Public query loads in 1000-row pages, so it can handle thousands of records.
- Admin login uses Supabase Auth.
- Admin Excel import uses the existing Class-1 ... Hifz workbook structure.
- Existing Bijoy/SutonnyMJ conversion is included in the Edge Function.
- Re-importing an exam replaces its old result records, preventing stale data.
- Schedule / Publish Now / Unpublish controls included.

## One-time Supabase CLI deployment
Install/login to Supabase CLI, link the project, then run:

```bash
supabase login
supabase link --project-ref tgfyfckwvjxyfnoswzhs
supabase secrets set SUPABASE_URL=https://tgfyfckwvjxyfnoswzhs.supabase.co
supabase secrets set SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
supabase functions deploy import-excel
supabase functions deploy publish-schedule
```

**Never put `SUPABASE_SERVICE_ROLE_KEY` in the website or admin HTML.** It is only an Edge Function secret.

## Hosting
- Upload everything inside `website/` to your normal static hosting/GitHub Pages/Netlify/Vercel.
- Upload `admin.html` to a protected-looking admin URL such as `/admin.html` or a separate admin subdomain.
- The security comes from Supabase Auth + RLS; the URL itself is not the security boundary.

## Important
The public site will only show records whose exam is `published` or `scheduled` and whose `publish_at` is in the past. Draft/unpublished/future-scheduled results stay hidden by RLS.
