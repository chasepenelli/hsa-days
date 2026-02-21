# Supplement Tracking Feature

## Overview

The "I'm Using This" supplement tracking feature allows authenticated subscribers to indicate which supplements they're currently giving their dogs. This creates two valuable outputs:

1. **Community signal** — other visitors see anonymous aggregate counts ("Used by X families") providing social proof
2. **Business intelligence** — proprietary demand signal data for a future HSA-branded supplement product line

## Architecture

### Database

**Table: `subscriber_supplements`**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| subscriber_id | uuid (FK) | References `subscribers.id` |
| supplement_slug | text | Matches slug from `SUPPLEMENTS` array |
| started_at | timestamptz | When user started tracking |
| stopped_at | timestamptz | NULL = currently active |
| notes | text | Reserved for future use |
| created_at | timestamptz | Row creation time |
| updated_at | timestamptz | Last modification |

**Constraint:** `UNIQUE(subscriber_id, supplement_slug)` — one record per user per supplement.

**Indexes:**
- `idx_sub_supps_slug_active` — partial index on `supplement_slug WHERE stopped_at IS NULL` for fast aggregate queries
- `idx_sub_supps_subscriber` — for user-specific lookups

### Row Level Security

All four CRUD policies restrict access to `auth.uid() = subscriber_id`. Users can only see and modify their own records.

### Aggregate Function

`get_supplement_usage_counts()` is a `SECURITY DEFINER` function that bypasses RLS to return anonymous aggregate counts only:

```sql
SELECT supplement_slug, COUNT(*) as active_count
FROM subscriber_supplements
WHERE stopped_at IS NULL
GROUP BY supplement_slug;
```

No PII is exposed — only slug + count pairs.

### API Route

**`/api/supplements/track`**

- **GET** — Returns authenticated user's active supplement records
- **POST** — Accepts `{ supplement_slug, action: "start" | "stop" }`
  - `start`: Upserts record with `stopped_at: null`
  - `stop`: Sets `stopped_at: now()` on the active record
  - Returns the updated record + current aggregate count for that slug

### Frontend

- Server page fetches aggregate counts (for all visitors) and user's active slugs (authenticated only)
- Client component manages optimistic state updates
- Toggle button in expanded card view; usage badge in collapsed header
- Non-authenticated visitors see counts but no toggle (shows "Sign in to track")

## Privacy

- Individual tracking data is protected by RLS — only the owning user can see their records
- Public-facing counts are anonymous aggregates only
- No PII is included in aggregate queries
- Users can stop tracking at any time (sets `stopped_at`)

## Example BI Queries

Most popular supplements:
```sql
SELECT supplement_slug, COUNT(*) as users
FROM subscriber_supplements WHERE stopped_at IS NULL
GROUP BY supplement_slug ORDER BY users DESC;
```

Adoption over time:
```sql
SELECT date_trunc('week', started_at) as week, supplement_slug, COUNT(*)
FROM subscriber_supplements
GROUP BY week, supplement_slug ORDER BY week;
```

Common supplement combinations:
```sql
SELECT a.supplement_slug, b.supplement_slug, COUNT(*) as co_usage
FROM subscriber_supplements a
JOIN subscriber_supplements b ON a.subscriber_id = b.subscriber_id
WHERE a.stopped_at IS NULL AND b.stopped_at IS NULL
  AND a.supplement_slug < b.supplement_slug
GROUP BY a.supplement_slug, b.supplement_slug
ORDER BY co_usage DESC LIMIT 20;
```
