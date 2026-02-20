# HSA Days Illustrations

Sketchy, cute, 1-2 color hand-drawn ink illustrations for the HSA Days website.

## Style Guide

- **Aesthetic**: Hand-drawn ink sketch, minimal line art, editorial book illustration
- **Colors**: Dark ink line work + ONE accent color per illustration from the palette
- **Background**: White / cream (#FAF8F5)
- **Feel**: Warm, intimate, cute — like illustrations in a beautiful hardcover journal
- **Avoid**: Photorealistic, 3D, anime, cartoon, neon, dark backgrounds, text/words in the image

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Sage | #5B7B5E | Hero, journey phases 3-5, day activities, final CTA |
| Gold | #C4A265 | About/Graffiti portrait, journey phase 2, day 2 |
| Terracotta | #D4856A | Journey phase 1, day 1 header, day 3 header |

---

## Asset Manifest

### Home Page — `home/`

| File | Section | Aspect | Accent | Description |
|------|---------|--------|--------|-------------|
| `home-hero.png` | Hero background | 16:9 | sage | Person sitting on floor with a small corgi, quiet intimate moment |
| `home-about-graffiti.png` | About portrait frame | 3:4 | gold | Portrait of a welsh corgi (Graffiti), warm and expressive |
| `home-journey-phase1.png` | Timeline: "The Shock" | 1:1 | terracotta | Phone face-down on vet paperwork |
| `home-journey-phase2.png` | Timeline: "Building Ground" | 1:1 | gold | Coffee mug, coiled leash, morning light |
| `home-journey-phase3.png` | Timeline: "The Emotions" | 1:1 | sage | Crumpled tissue beside an open journal |
| `home-journey-phase4.png` | Timeline: "Going Deeper" | 1:1 | sage | Pen resting on a filled journal page |
| `home-journey-phase5.png` | Timeline: "Finding Meaning" | 1:1 | sage | Paw print and footprint side by side on a path |
| `home-cta-paws.png` | Final CTA decoration | 16:9 | sage | Scattered paw prints, whimsical and decorative |

### Journal Days — `days/`

| File | Section | Aspect | Accent | Description |
|------|---------|--------|--------|-------------|
| `day01-header.png` | Day 1 header: "The Word" | 16:9 | terracotta | Car keys on a vet receipt, windshield view |
| `day01-activity.png` | Day 1 activity card | 1:1 | sage | Phone set aside on floor, dog leash coiled nearby |
| `day02-header.png` | Day 2 header: "The Morning After" | 16:9 | gold | Morning light through window, coffee cup on sill |
| `day02-activity.png` | Day 2 activity card | 1:1 | gold | Hand writing on back of an envelope |
| `day03-header.png` | Day 3 header: "The Rabbit Hole" | 16:9 | terracotta | Laptop with many browser tabs, notebook beside it |
| `day03-activity.png` | Day 3 activity card | 1:1 | sage | Small notebook with handwritten lines, pen resting on it |

---

## Placement Notes

### Home Page

- **Hero** (`Hero.tsx`): Currently has CSS gradient orbs + floating paw emoji. The illustration would sit behind/beneath the headline text at reduced opacity or as a large background element.
- **About** (`About.tsx`): There's an explicit 4:5 portrait frame placeholder (currently showing a dog emoji). This illustration drops directly into that frame.
- **Journey Timeline** (`JourneyTimeline.tsx`): 5 phase cards currently have only text. Each 1:1 spot illustration goes inside the colored dot/card area.
- **Final CTA** (`FinalCTA.tsx`): Currently has floating paw emoji at 10% opacity. The paw prints illustration replaces those emoji as a refined background element.

### Day Pages

- **Day Header** (`DayContent.tsx`): The sage gradient header area. The header illustration sits as a low-opacity background image behind the day title and subtitle.
- **Activity Card** (`DayContent.tsx`): The activity section has a sage-tinted card. The spot illustration sits inline or as a small visual accent within the card.

---

## Generation

Illustrations are generated using `scripts/generate-illustrations.sh`, which calls the OpenRouter API with FLUX.2 Max/Pro models from Black Forest Labs.

### Setup

Set your OpenRouter API key (add to `.env.local`, which is gitignored):

```
OPENROUTER_API_KEY=sk-or-v1-...
```

Or export in your shell:

```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
```

### Commands

```bash
./scripts/generate-illustrations.sh                    # Generate all missing
./scripts/generate-illustrations.sh --force            # Regenerate everything
./scripts/generate-illustrations.sh --only home-hero   # Single illustration
./scripts/generate-illustrations.sh --model flux.2-pro # Use cheaper model for all
./scripts/generate-illustrations.sh --only day04-header --prompt "Custom prompt"
```

### Model Assignments

- **FLUX Max** (highest quality): Hero images, portrait, day headers
- **FLUX Pro** (fast/cheaper): Journey phases, activity cards, CTA paws

### Adding Future Days

Add entries to the `ILLUSTRATIONS` array in `scripts/generate-illustrations.sh`:

```
'day04-header|days|16:9|max|Your prompt here...'
'day04-activity|days|1:1|pro|Your prompt here...'
```
