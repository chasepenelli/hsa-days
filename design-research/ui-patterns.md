# UI Patterns for the 30-Day Journey

## Daily Entry Card — Three States

### 1. Locked (future day)
- Day number in muted sage
- Title blurred or obscured
- Lock icon in gold
- Card opacity 60%
- Communicates: "This is coming, but not yet"

### 2. Available (today)
- Full color
- Subtle warm glow or border animation
- Day number in gold
- "Open Day N" button in terracotta
- Communicates: "This is for you, right now"

### 3. Completed
- Checkmark in sage
- Day number in muted
- "Completed Feb 12" in small Inter caption
- Card slightly dimmed but accessible
- Communicates: "You showed up"

---

## Progress Visualization

### Option A: 30-Dot Grid
Like a GitHub contribution graph — small squares in sage for complete, gold for today, empty for future. Clean, data-like, satisfying to fill in.

### Option B: Paw-Print Timeline
30 paw-print icons in a horizontal strip. Filled sage for complete, gold pulse for today, outlined for future. More emotional, more on-brand.

**Recommendation:** Option B for the main dashboard, Option A for compact views (mobile, sidebar).

---

## Journal Entry UI

- Large borderless textarea on cream background
- Lora italic placeholder text (the journal prompt)
- Auto-save indicator in small muted Inter ("Saved just now")
- No harsh form borders — the journal should feel like paper, not a form
- Generous padding inside the textarea
- Optional: faint lined-paper background pattern

---

## Emotion Check-In Widget

5 illustrated symbols in a horizontal row (not a clinical 1-5 scale). Tap to select, highlight in gold. Referenced from Grief Refuge and Reflectly.

Possible symbols:
- Heavy/overwhelmed
- Sad/tender
- Neutral/present
- Hopeful/warm
- Grateful/peaceful

---

## Pull-Quote Pattern

- Lora italic, centered
- Thin decorative line in sage above and below
- Very generous vertical padding (48-64px top and bottom)
- Gold decorative quotation mark (large, low opacity)
- Attribution in small Inter, muted

---

## Day Page Navigation

- Prev/next chevrons in footer
- Header shows "Day 14 of 30" with a thin sage progress bar
- "Mark Day Complete" as the primary action — sage button, bottom of page
- On completion: celebration message, share button, "Continue to Day X+1" link

---

## Section Transitions

- Use generous vertical spacing (80-120px) between major sections
- Alternate between warm-white and cream backgrounds
- Optional: very subtle fade-in-up animation on scroll (stagger: 100ms)
- No jarring transitions — everything should feel like turning a page
