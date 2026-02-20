# HSA Days - Complete Project Handoff Document

> Last updated: February 20, 2026

---

## What Is HSA Days?

HSA Days is a 30-day guided companion for dog owners whose dogs have been diagnosed with hemangiosarcoma (HSA), an aggressive cancer of the blood vessel walls. It was inspired by the real journey of Graffiti, a tri-color corgi diagnosed in November 2025, and the massive social media community that rallied around his story (93K+ likes on a single post).

The website provides daily reflections, journaling prompts, practical tips, activities, and community support — structured as a "book you live through" rather than a medical resource.

**Production URL:** https://hsadays.com
**Creator:** The owners of @bradythecorgi / @bradyandgraffiti on Instagram/Facebook

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x (inline theme) |
| Database | Supabase (PostgreSQL) | - |
| Auth | Supabase Auth (magic links) | via @supabase/ssr 0.8.0 |
| Hosting | Vercel | - |
| Email | Kit (formerly ConvertKit) | API v4 |
| OG Images | @vercel/og | 0.8.6 |
| Share Cards | html-to-image | 1.11.13 |
| Offline Storage | idb-keyval (IndexedDB) | 6.2.2 |
| Analytics | Plausible | Self-hosted |
| E-commerce | Shopify Storefront API | - |

---

## Project Structure

```
/Users/home/HSADays/hsa-days-website/
├── public/
│   ├── fonts/                    # Lora & Inter .ttf for OG image rendering
│   ├── icons/                    # PWA icons (192, 512, maskable)
│   ├── images/                   # Static images
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service worker (offline support)
├── src/
│   ├── app/
│   │   ├── globals.css           # Design system (colors, fonts, animations)
│   │   ├── layout.tsx            # Root layout (fonts, metadata, PWA)
│   │   ├── page.tsx              # Landing page (/)
│   │   ├── gate/page.tsx         # Password gate
│   │   ├── login/page.tsx        # Magic link login
│   │   ├── welcome/page.tsx      # Post-signup onboarding wizard
│   │   ├── about/page.tsx        # About page
│   │   ├── order/page.tsx        # Pre-order / Shopify integration
│   │   ├── community/
│   │   │   ├── page.tsx          # Community stories listing
│   │   │   └── share/page.tsx    # Story submission form
│   │   ├── days/
│   │   │   ├── page.tsx          # 30-day journey index (chapters)
│   │   │   └── [number]/
│   │   │       ├── page.tsx      # Individual day page
│   │   │       └── share/page.tsx # Share card generation
│   │   ├── resources/
│   │   │   ├── page.tsx          # Resources hub
│   │   │   ├── food/page.tsx     # Nutrition guides
│   │   │   ├── home/page.tsx     # Home care tips
│   │   │   └── supplements/page.tsx
│   │   ├── admin/page.tsx        # Admin dashboard (stats + moderation)
│   │   └── api/
│   │       ├── gate/route.ts           # Password verification
│   │       ├── subscribe/route.ts      # Email signup + Kit integration
│   │       ├── onboarding/route.ts     # Onboarding completion
│   │       ├── journal/route.ts        # Journal CRUD
│   │       ├── progress/route.ts       # Day progress tracking
│   │       ├── media/route.ts          # Photo upload/delete
│   │       ├── stories/route.ts        # Community story submission
│   │       ├── admin/stories/route.ts  # Story moderation (admin only)
│   │       ├── auth/
│   │       │   ├── callback/route.ts   # OAuth/magic link callback
│   │       │   └── logout/route.ts     # Logout
│   │       ├── og/day/[number]/route.tsx # Dynamic OG images (edge)
│   │       └── chronicle/export/route.ts # Social media CSV export
│   ├── components/
│   │   ├── layout/               # Header, Footer
│   │   ├── sections/             # Landing page sections (Hero, Features, etc.)
│   │   ├── days/                 # Day page components (DayContent, JournalEditor, MediaGallery, etc.)
│   │   ├── forms/                # SignupForm, JournalEditor
│   │   ├── share/                # Share card system (templates, generator, modal)
│   │   └── ui/                   # OfflineIndicator, PWAInstallPrompt, ServiceWorkerRegistration
│   ├── hooks/
│   │   └── useScrollReveal.ts    # Intersection Observer for scroll animations
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts         # Browser Supabase client
│       │   ├── server.ts         # Server Supabase client
│       │   └── middleware.ts     # Session refresh middleware
│       └── offline/
│           ├── journal-store.ts  # IndexedDB journal persistence
│           └── sync.ts           # Background sync for offline entries
├── middleware.ts                 # Password gate + Supabase session refresh
├── next.config.ts                # Next.js config (minimal)
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies & scripts
└── .env.local                    # Environment variables (NOT committed)
```

---

## Environment Variables

Create a `.env.local` file with these variables:

```bash
# ── Supabase (REQUIRED) ──────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://ktkvqoaskukndgxhutzg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# ── Kit / ConvertKit (Email Newsletter) ───────────────────────────────
KIT_API_KEY=<your-kit-api-key>
KIT_API_SECRET=<your-kit-api-secret>
KIT_FORM_ID=<form-id>              # Signup form
KIT_SEQUENCE_ID=<sequence-id>      # 30-day drip sequence

# ── Shopify (E-commerce) ─────────────────────────────────────────────
NEXT_PUBLIC_SHOPIFY_DOMAIN=bradyandgraffiti.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=<storefront-token>

# ── Site Configuration ────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://hsadays.com   # or http://localhost:3000 locally
SITE_PASSWORD=hsadays2026                  # Remove to disable password gate

# ── Analytics (Optional) ─────────────────────────────────────────────
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=hsadays.com
```

These must also be set in the **Vercel dashboard** under Project Settings > Environment Variables for production.

---

## Supabase Database Schema

**Supabase Project URL:** https://supabase.com/dashboard (project: HSADAYS)
**Database URL:** ktkvqoaskukndgxhutzg.supabase.co

### Tables

#### `daily_content` (30 rows) — The Heart of the App
The 30-day guided content. Each row is one day.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| day_number | int (1-30) | Unique, constrained |
| title | text | Day title (e.g., "The Word", "What I Would Miss") |
| subtitle | text | Day subtitle |
| category | text | One of: Reflection, Understanding, Activity, Practical, Connection |
| quote | text | Featured quote for the day |
| quote_author | text | Quote attribution |
| reflection_intro | text | Opening paragraph(s) of the day's reflection |
| reflection_body | text | Main body of the reflection (paragraphs separated by \n\n) |
| activity_title | text | Title of the day's activity |
| activity_description | text | Activity instructions |
| journal_prompt | text | Guided journal prompt |
| practical_tip_title | text | Title of practical tip |
| practical_tip | text | Practical tip content |
| bonus_content | text | Optional bonus material |
| image_url | text | Optional image |
| email_excerpt | text | Excerpt for Kit email sequence |

**Important:** The daily content was enriched on Feb 20, 2026 to weave in real social media moments from Graffiti's journey. Days 5, 22, 27, 29 had heavy revisions. Days 3, 9, 12, 14, 16, 23, 25, 30 had moderate enrichments. See "Content Enrichment" section below.

#### `subscribers` (auth-linked) — User Accounts

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Links to Supabase Auth user ID |
| email | text | Unique |
| name | text | Optional |
| dog_name | text | Their dog's name |
| signup_source | text | "website", "magic_link", "safety_net" |
| kit_subscriber_id | text | Kit/ConvertKit subscriber ID |
| has_digital_access | bool | Default true |
| has_preordered | bool | Default false |
| current_day | int | Progress tracking (0-30) |
| is_admin | bool | Admin privileges |
| diagnosis_date | date | When their dog was diagnosed |
| cancer_stage | text | Optional staging info |
| pet_photo_path | text | Uploaded pet photo |
| onboarding_completed | bool | Has completed welcome wizard |

#### `journal_entries` — User Journal Entries

| Column | Type | Description |
|--------|------|-------------|
| subscriber_id | uuid | FK to subscribers |
| day_number | int | Which day this entry belongs to |
| prompt_type | text | Default "daily" |
| entry_text | text | The journal entry content |

#### `user_day_progress` — Day Completion Tracking

| Column | Type | Description |
|--------|------|-------------|
| subscriber_id | uuid | FK to subscribers |
| day_number | int (1-30) | Which day |
| started_at | timestamptz | When they first viewed the day |
| completed_at | timestamptz | When they marked it complete |

#### `day_media` — User Photo Uploads

| Column | Type | Description |
|--------|------|-------------|
| subscriber_id | uuid | FK to subscribers |
| day_number | int (1-30) | Which day |
| file_path | text | Supabase Storage path |
| file_type | text | MIME type |
| file_name | text | Original filename |
| file_size | int | Bytes |
| sort_order | int | Custom ordering |

Storage bucket: `day-memories` (path pattern: `{subscriber_id}/{day_number}/{filename}`)

#### `community_stories` — User-Submitted Stories

| Column | Type | Description |
|--------|------|-------------|
| subscriber_id | uuid | FK to subscribers |
| dog_name | text | Their dog's name |
| dog_breed | text | Optional |
| story_text | text | Their story |
| is_approved | bool | Admin moderation flag |

#### `social_media_chronicle` (409 rows) — Social Media Archive

Internal reference table cataloging every Instagram, Facebook, and Substack post from the Brady & Graffiti accounts. Used for content planning and enriching daily_content with real moments.

| Column | Type | Description |
|--------|------|-------------|
| platform | text | "instagram", "facebook", "substack" |
| post_date | timestamptz | When it was posted |
| post_url | text | Link to original post |
| caption_text | text | Post caption/text |
| full_content | text | Full post content (for Substack) |
| likes_count | int | Engagement |
| comments_count | int | Engagement |
| shares_count | int | Engagement |
| post_type | text | "Carousel", "Reel", "post", etc. |
| hashtags | text[] | Array of hashtags |

**RLS:** Enabled on all tables except `social_media_chronicle` (internal-only).

### Migrations (in order)

1. `initial_schema_and_seed` — Core tables + 30 days of content
2. `create_day_media_table` — Photo uploads
3. `create_day_memories_storage_bucket` — Supabase Storage bucket
4. `add_admin_support` — is_admin flag + admin RLS policies
5. `fix_is_admin_search_path` — Security fix
6. `add_admin_delete_community_stories` — Admin can delete stories
7. `add_subscribers_insert_policy` — Allow self-registration
8. `add_journal_unique_constraint_and_subscriber_trigger` — One entry per day + auto-create subscriber on auth
9. `add_onboarding_columns_to_subscribers` — diagnosis_date, cancer_stage, pet_photo_path, onboarding_completed
10. `create_pet_photos_storage_bucket` — Storage for onboarding pet photos
11. `create_social_media_chronicle` — Social media archive table

---

## API Routes Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/gate` | Password gate check. Body: `{ password }`. Sets `site_access` cookie (30 days). |
| GET | `/api/auth/callback` | Supabase magic link / OAuth callback. Creates subscriber if new. Redirects to `/welcome` or `/days`. |
| GET | `/api/auth/logout` | Clears session. |

### User Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/subscribe` | Signup. Body: `{ email, name?, dog_name? }`. Creates auth user, subscriber record, sends magic link, subscribes to Kit. |
| POST | `/api/onboarding` | Saves onboarding data (diagnosis_date, cancer_stage, pet_photo). |
| GET | `/api/journal?day=N` | Fetch journal entry for day N. |
| POST | `/api/journal` | Save/update journal. Body: `{ day_number, prompt_type, entry_text }`. |
| GET | `/api/progress` | Fetch all progress records for current user. |
| POST | `/api/progress` | Mark day complete. Body: `{ day_number, completed: bool }`. |
| GET | `/api/media?day=N` | Fetch media for day N. |
| POST | `/api/media` | Upload photo (multipart/form-data). |
| DELETE | `/api/media?id=UUID` | Delete a photo. |
| POST | `/api/stories` | Submit community story. Body: `{ dog_name, dog_breed?, story_text }`. |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/api/admin/stories` | Moderate story. Body: `{ story_id, action: "approve" | "reject" }`. Requires `is_admin = true`. |

### Content / Assets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/og/day/[number]` | Dynamic OG image (1200x630). Edge runtime. Cached 1hr. |
| GET | `/api/chronicle/export` | CSV export of social_media_chronicle table. |

---

## Design System

### Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Sage | #5B7B5E | `--sage` | Primary accent, buttons, headers |
| Sage Light | #7A9A7D | `--sage-light` | Hover states |
| Sage Dark | #3E5740 | `--sage-dark` | Deep accents |
| Gold | #C4A265 | `--gold` | Secondary accent, highlights |
| Gold Light | #D4B87A | `--gold-light` | Soft accents |
| Terracotta | #D4856A | `--terracotta` | Tertiary accent, activity badges |
| Terracotta Light | #E2A08A | `--terracotta-light` | Soft accents |
| Warm White | #FAF8F5 | `--warm-white` | Main background |
| Cream | #F5F0EA | `--cream` | Card backgrounds |
| Cream Deep | #EDE8E0 | `--cream-deep` | Deeper card backgrounds |
| Text | #2D2D2D | `--text` | Primary text |
| Text Muted | #6B6B6B | `--text-muted` | Secondary text |

### Fonts

| Role | Font Family | Weight | CSS Variable |
|------|------------|--------|-------------|
| Headings | Lora (serif) | 400-700 | `--font-serif` |
| Body | Inter (sans) | 300-600 | `--font-sans` |

Loaded via `next/font/google` in `layout.tsx`.

### Key Animations

Defined in `globals.css` via `@keyframes`:
- `fadeInUp`, `fadeIn`, `scaleIn` — Entry animations
- `gentlePulse`, `breathe` — Ambient effects
- `checkIn` — Day completion celebration
- `heartbeat` — Hero accent
- `reveal`, `reveal-scale`, `reveal-stagger` — Scroll-triggered (via `useScrollReveal` hook)
- `shimmer` — Card hover effect
- `journal-lined` — Ruled-line texture for journal textarea
- `paper-texture` — Subtle grain overlay

---

## Key Features

### 1. 30-Day Guided Journey
- Content stored in Supabase `daily_content` table
- Organized into 5 chapters (weeks)
- Each day has: reflection, quote, activity, journal prompt, practical tip
- Milestone celebrations at days 7, 14, 21, 30
- Category color coding (Reflection, Understanding, Activity, Practical, Connection)

### 2. Personal Journaling
- One entry per day per user
- Offline-capable via IndexedDB (`idb-keyval`)
- Auto-syncs when back online
- Saved to Supabase `journal_entries` table

### 3. Photo Memories
- Upload photos per day via Supabase Storage (`day-memories` bucket)
- Gallery view with lightbox
- Custom sort order
- Delete capability

### 4. Share Cards
- Client-side image generation via `html-to-image`
- Templates: DailyCompletion, Milestone, Memory, QuoteOnly
- Sizes: Instagram (1080x1080), Twitter (1200x630)
- Web Share API integration + download fallback

### 5. OG Images
- Dynamic generation per day via `@vercel/og` (Edge runtime)
- 1200x630px with sage/gold gradient design
- Includes title, category, quote, day number
- Custom fonts (Lora, Inter) loaded from `/public/fonts/`

### 6. PWA / Offline Support
- Service worker caches static assets
- Journal entries persist in IndexedDB when offline
- Background sync on reconnection
- Installable as native app (manifest.json)

### 7. Email Integration (Kit/ConvertKit)
- Signup triggers Kit form submission
- 30-day email drip sequence
- Subscriber ID linked to Supabase user record

### 8. Password Gate
- Protects entire site during pre-launch
- Set `SITE_PASSWORD` env var to enable
- Remove the variable to disable
- Cookie-based (30-day persistence)

### 9. Admin Dashboard
- Stats: total signups, journal entries, active users
- Community story moderation (approve/reject)
- Requires `is_admin = true` on subscriber record

---

## Content Enrichment History

### February 20, 2026 — Social Media Enrichment

The 30 days of content were enriched with real moments from Graffiti's social media journey (409 posts cataloged in `social_media_chronicle`). The approach was **enrichment, not reorganization** — day themes and titles stayed the same while real moments were woven in as grounding details.

**Graffiti's journey timeline:** Day 1 = November 25, 2025 (diagnosis). Day 30 = December 24, 2025.

#### Level C (Heavy Revision) — 4 Days

| Day | Title | What Changed |
|-----|-------|-------------|
| 5 | What I Would Miss | reflection_intro + reflection_body: Community rallied to find Aminocaproic Acid medication (33.5K IG likes). Love list now connected to community buying more time. |
| 22 | The Paw Print | subtitle, reflection_intro, reflection_body, journal_prompt: Reframed paw print as act born from constant fear of tumor rupturing (26.5K IG), not a craft project. New subtitle: "Holding what you're afraid to lose". |
| 27 | The Favorite Day | reflection_intro, reflection_body, quote, activity_description, journal_prompt, practical_tip: Complete rewrite. Most terrifying night (vomiting, almost ER, 93K IG likes). "Favorite day" = morning after a scare. New quote (Lincoln). New emergency signs practical tip. |
| 29 | The Notebook So Far | reflection_intro, reflection_body, journal_prompt: Enriched with Day 27-29 arc (terror to relief). Ultrasound confirmed tumor had NOT ruptured (38.6K IG). "Not" = most important word in the notebook. |

#### Level B (Moderate Enrichment) — 8 Days

| Day | Title | What Changed |
|-----|-------|-------------|
| 3 | The Rabbit Hole | reflection_body: Added going-public moment (sharing diagnosis post, 30K IG). |
| 9 | The Photo Walk | reflection_body: Added HSA paradox paragraph (looking fine while in danger, 35.9K IG). |
| 12 | The First Follow-Up | reflection_body + practical_tip: Added real supplement list (Yunnan Baiyao, ACA, Turkey Tail, Curcumin, sardines). |
| 14 | Two Weeks | reflection_body: Added photo shoot milestone (wasn't sure he'd make it, 7.5K FB). |
| 16 | The Video | reflection_body: Added safety modifications context (no jumping, low couches, 22K IG). |
| 23 | The Slow Walk | reflection_body: Added 20-day milestone + origin story memory (26.8K IG). |
| 25 | The Bad Day | reflection_body: Added "yesterday was fine" opener — bad days come without warning. |
| 30 | What Comes Next | reflection_body: Added care team gratitude paragraph (VEG team, ER staff). |

#### Level A (No Changes) — 18 Days

Days 1, 2, 4, 6, 7, 8, 10, 11, 13, 15, 17, 18, 19, 20, 21, 24, 26, 28.

### Content Guidelines (for future edits)

- **Voice:** First-person as Graffiti's owner — intimate, warm, honest, occasionally wry
- **Tone:** Never saccharine. Real pain, real hope, real humor
- **Structure:** Paragraphs separated by `\n\n` in reflection_body
- **Universal:** Content must serve ANY dog owner, not just replay Graffiti's specific story
- **No:** hashtags, emoji, social media language, engagement numbers
- **Continuity:** Preserve cross-day references ("the notebook from Day 8", "the list from Day 5")

---

## Deployment

### Git Workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production. Auto-deploys to Vercel. |
| `develop` | Development. Merge to `main` when ready to deploy. |

### Deploying

1. Work on `develop` branch
2. Test locally with `npm run dev`
3. Build check: `npm run build`
4. Merge `develop` into `main`
5. Vercel auto-deploys from `main`
6. Verify at https://hsadays.com

### Vercel Project

- **Project ID:** prj_DDy9BWFKuF1TBZhbvBlhnDvAsi7O
- **Org ID:** team_HD3SrDGQGEN86EOpvSHs8yYZ
- **Project Name:** hsa-days-website
- All environment variables must be set in Vercel dashboard

### After Deploying

- Check key pages: `/`, `/days`, `/days/27`, `/days/5`
- Verify OG images render correctly (use social share preview tools)
- Monitor Supabase logs for errors

---

## Local Development

```bash
# Clone and install
cd /Users/home/HSADays/hsa-days-website
npm install

# Set up environment
cp .env.example .env.local   # Then fill in values

# Run dev server
npm run dev                   # http://localhost:3000

# Build for production
npm run build

# Lint
npm run lint
```

### Password Gate

During development, the site requires a password (set via `SITE_PASSWORD`). To bypass locally, either:
- Enter the password at `/gate`
- Remove `SITE_PASSWORD` from `.env.local`

---

## External Services

### Supabase
- **Dashboard:** https://supabase.com/dashboard
- **Project:** HSADAYS
- **Region:** (check dashboard)
- **Key tables:** daily_content, subscribers, journal_entries, user_day_progress, day_media, community_stories, social_media_chronicle
- **Storage buckets:** day-memories, pet-photos
- **Auth:** Magic links (email-based, passwordless)

### Kit (ConvertKit)
- **Dashboard:** https://app.kit.com
- **Integration:** API v4
- **Used for:** Email signup, 30-day drip sequence
- **API calls in:** `/api/subscribe/route.ts`

### Shopify
- **Store:** bradyandgraffiti.myshopify.com
- **Integration:** Storefront API (read-only)
- **Used for:** Pre-order / purchase page at `/order`

### Vercel
- **Dashboard:** https://vercel.com
- **Project:** hsa-days-website
- **Domains:** hsadays.com
- **Edge Functions:** OG image generation

### Plausible Analytics
- **Domain:** hsadays.com
- **Integration:** Script tag in layout (if NEXT_PUBLIC_PLAUSIBLE_DOMAIN set)

---

## Common Tasks

### Update daily content
Edit directly in Supabase dashboard or via SQL:
```sql
UPDATE daily_content
SET reflection_body = 'new content here'
WHERE day_number = 5;
```

### Add a new admin user
```sql
UPDATE subscribers SET is_admin = true WHERE email = 'user@example.com';
```

### Export social media chronicle
Hit `GET /api/chronicle/export` — returns CSV.

### Moderate community stories
Visit `/admin` on the site (requires `is_admin = true`).

### Check database advisories
Use Supabase MCP tools:
```
mcp__claude_ai_HSADAYS__get_advisors({ type: "security" })
mcp__claude_ai_HSADAYS__get_advisors({ type: "performance" })
```

---

## Onboarding Prompt for New Developers / AI Assistants

Use this prompt to get any new person or AI assistant up to speed on this project:

```
You are taking over development of HSA Days, a Next.js 16 web application
at /Users/home/HSADays/hsa-days-website.

HSA Days is a 30-day guided companion for dog owners whose dogs have been
diagnosed with hemangiosarcoma (HSA). It was inspired by the real journey
of Graffiti, a corgi diagnosed in November 2025.

Key facts:
- Next.js 16 with App Router, React 19, TypeScript, Tailwind CSS 4
- Backend: Supabase (PostgreSQL + Auth + Storage). MCP project name: HSADAYS
- Deployed on Vercel from the `main` branch. Development on `develop`.
- Production URL: hsadays.com
- Site has a password gate (SITE_PASSWORD env var)

The app has:
- 30 days of guided content stored in `daily_content` Supabase table
- User auth via Supabase magic links
- Personal journaling with offline support (IndexedDB)
- Photo uploads per day (Supabase Storage)
- Share card generation (html-to-image)
- Dynamic OG images (@vercel/og, edge runtime)
- PWA with service worker
- Email integration with Kit (ConvertKit)
- Admin dashboard for story moderation
- Community story submissions

Design system:
- Colors: sage (#5B7B5E), gold (#C4A265), terracotta (#D4856A),
  cream (#F5F0EA), warm-white (#FAF8F5)
- Fonts: Lora (serif headings), Inter (sans body)
- All defined as CSS variables in globals.css

Content voice:
- First-person as a dog owner — intimate, warm, honest, occasionally wry
- Never saccharine. Real pain, real hope, real humor
- Universal: serves any dog owner, not just Graffiti's specific story
- No emoji, hashtags, or social media language in content

Read PROJECT_HANDOFF.md for the complete project documentation including
database schema, API routes, environment variables, deployment process,
and content enrichment history.
```

---

## Social Media Chronicle Context

The `social_media_chronicle` table contains 409 cataloged posts:
- **200 Instagram posts** (from @bradythecorgi)
- **200 Facebook posts** (from Brady and Graffiti page)
- **9 Substack posts** (newsletter)

These were cataloged to:
1. Enrich the daily content with real moments from the journey
2. Track engagement patterns for content planning
3. Serve as an institutional knowledge base of the brand's social presence

Key viral moments:
- **93.2K likes** (IG) — Day 27: Terrifying vomiting night, almost ER
- **38.6K likes** (IG) — Day 29: Ultrasound confirmed tumor hadn't ruptured
- **35.9K likes** (IG) — Day 9: "Still doing incredibly well" update
- **33.5K likes** (IG) — Day 5: Community found Aminocaproic Acid medication
- **30.2K likes** (IG) — Day 3: Public diagnosis announcement

---

## Troubleshooting

### OG images not rendering
- Check that font files exist in `/public/fonts/` (Lora-SemiBold.ttf, Inter-Regular.ttf)
- Verify the edge function can reach Supabase (check env vars in Vercel)

### Journal entries not saving
- Check Supabase RLS policies on `journal_entries` table
- Verify user is authenticated (check `subscribers` table)
- If offline, check IndexedDB via browser DevTools > Application > IndexedDB

### Password gate loop
- Clear cookies for the domain
- Check `SITE_PASSWORD` env var matches what you're entering
- The `/gate`, `/api/gate`, `/welcome`, `/api/onboarding` paths are exempt from the gate

### Build failures
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all env vars are set (build can fail if Supabase calls happen at build time)

### Supabase connection issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and keys in `.env.local`
- Check Supabase dashboard for project status
- Run `mcp__claude_ai_HSADAYS__get_logs({ service: "api" })` to check API logs
