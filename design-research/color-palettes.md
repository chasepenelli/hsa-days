# Color Palettes & Extended System

## Core Assessment

**The existing palette is fundamentally right. Extend, don't replace.**

The sage/gold/terracotta/cream system is confirmed as a resonant, tested combination in wellness, memorial, and emotional design contexts. Multiple reference sources (CreativeBooster, color-hex.com, Pinterest collections, Figma color guides) validate this exact combination.

---

## Current Palette

| Token | Value | Role |
|-------|-------|------|
| sage | #5B7B5E | Primary — headings, CTAs, accents |
| gold | #C4A265 | Secondary — labels, quotes, ornaments |
| terracotta | #D4856A | Tertiary — activities, warmth |
| cream | #F5F0EA | Section backgrounds |
| warm-white | #FAF8F5 | Page background |

---

## Proposed Extensions

| New Token | Value | Use |
|-----------|-------|-----|
| `warm-black` | #2C2420 | Heading text — not pure black, much warmer |
| `warm-ink` | #3D302B | Body text on cream/warm-white |
| `sage-light` | #A3B89B | Hover states, subtle borders, decorative elements |
| `sage-mist` | #D4DDD4 | Backgrounds for sidebar/aside areas |
| `gold-dark` | #A07840 | Gold text on light backgrounds (accessibility-safe) |
| `terracotta-deep` | #A85C47 | High-contrast CTAs, links on light bg |
| `mauve` | #C4A0A0 | Bridging accent between terracotta and cream |
| `warm-shadow` | rgba(44,36,32,0.08) | Card elevation shadows |
| `surface-alt` | #EDE8E1 | Alternative card/section background |

---

## Grain/Texture Recommendation

Apply a very subtle CSS SVG noise overlay to the `warm-white` and `cream` backgrounds. Opacity 2-4%. This gives surfaces a tactile, paper-like quality that clinical flat colors lack.

This is a confirmed 2024-2025 trend that directly serves the warm, handcrafted aesthetic. The site already uses an `feTurbulence` filter for paper grain — refine its opacity and frequency rather than adding a new texture system.

Tools: [fffuel.co nnnoise generator](https://fffuel.co/nnnoise/), CSS `feTurbulence`

---

## Color Theory Notes

- **Sage green** in color psychology: growth, healing, safety, nature. Perfect for a health journey.
- **Gold** signals warmth, wisdom, value — appropriate for quotes and "treasure" moments in the content.
- **Terracotta** is grounded, earthy, human — appropriate for activities, the body, tactile actions.
- **Avoid pure black (#000)** — warm-black (#2C2420) feels more intimate and less harsh on cream backgrounds.
- **Avoid pure white (#FFF)** — the existing warm-white (#FAF8F5) is correct. Pure white feels clinical.
