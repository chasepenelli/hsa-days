#!/usr/bin/env bash
set -euo pipefail

# ── HSA Days Illustration Generator ──────────────────────────────────────────
# Uses OpenRouter API with Nano Banana 2 (Gemini 3.1 Flash Image Preview)
#
# Usage:
#   ./scripts/generate-illustrations.sh                          # Generate all missing
#   ./scripts/generate-illustrations.sh --force                  # Regenerate everything
#   ./scripts/generate-illustrations.sh --only home-hero         # Single illustration
#   ./scripts/generate-illustrations.sh --only day04-header --prompt "your prompt"
#   ./scripts/generate-illustrations.sh --category icons         # All icons
#   ./scripts/generate-illustrations.sh --category days          # All day content
#   ./scripts/generate-illustrations.sh --model google/other-model
#   ./scripts/generate-illustrations.sh --dry-run                # Show what would generate
#
# Requires: OPENROUTER_API_KEY env var, jq, base64

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ILLUST_DIR="$PROJECT_ROOT/public/illustrations"

# ── Defaults ─────────────────────────────────────────────────────────────────
DEFAULT_MODEL="google/gemini-3.1-flash-image-preview"
FORCE=false
ONLY=""
CATEGORY=""
CUSTOM_PROMPT=""
DRY_RUN=false
REMBG="/Users/home/Library/Python/3.13/bin/rembg"
USE_REMBG=false

# ── Parse flags ──────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --model)
      DEFAULT_MODEL="$2"
      shift 2
      ;;
    --force)
      FORCE=true
      shift
      ;;
    --only)
      ONLY="$2"
      shift 2
      ;;
    --category)
      CATEGORY="$2"
      shift 2
      ;;
    --prompt)
      CUSTOM_PROMPT="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --rembg)
      USE_REMBG=true
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --model MODEL      Model to use (default: google/gemini-3.1-flash-image-preview)"
      echo "  --force            Overwrite existing files"
      echo "  --only NAME        Generate only one illustration (e.g. home-hero, day01-header)"
      echo "  --category CAT     Generate all in a category (home, icons, days, food, supplements, order)"
      echo "  --prompt TEXT      Custom prompt (only with --only)"
      echo "  --dry-run          Show what would be generated without calling the API"
      echo "  --rembg            Remove background from generated images (requires rembg)"
      echo ""
      echo "Environment:"
      echo "  OPENROUTER_API_KEY   Required. Your OpenRouter API key."
      exit 0
      ;;
    *)
      echo "Unknown flag: $1"
      exit 1
      ;;
  esac
done

# ── Validate ─────────────────────────────────────────────────────────────────
if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  if [[ -f "$PROJECT_ROOT/.env.local" ]]; then
    KEY=$(grep '^OPENROUTER_API_KEY=' "$PROJECT_ROOT/.env.local" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    if [[ -n "$KEY" ]]; then
      export OPENROUTER_API_KEY="$KEY"
    fi
  fi
fi

if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  echo "ERROR: OPENROUTER_API_KEY not set."
  echo "  export OPENROUTER_API_KEY=\"sk-or-v1-...\""
  echo "  or add it to .env.local"
  exit 1
fi

command -v jq >/dev/null 2>&1 || { echo "ERROR: jq is required. Install with: brew install jq"; exit 1; }

if [[ "$USE_REMBG" == true ]]; then
  [[ -x "$REMBG" ]] || { echo "ERROR: rembg not found at $REMBG"; exit 1; }
fi

# ── Universal System Prompt ──────────────────────────────────────────────────
# This is sent as the system message for every generation to ensure style consistency.

SYSTEM_PROMPT='You are an illustration artist generating assets for "HSA Days," a 30-day guided journal for people caring for a dog with cancer. Every image you create must follow these rules exactly:

STYLE
- Loose, flowing watercolor washes with visible wet-on-wet bleeding and soft color transitions — this should feel like a real watercolor painting, not a digital illustration
- Thin, confident ink lines serve as the structural skeleton beneath translucent watercolor layers — the ink lines should be clearly visible but delicate
- Let watercolor pools, bleeds, and soft edges be prominent — color should feel like it was applied with a wet brush on textured paper
- Watercolor fills are translucent and layered, with visible paper texture bleeding through
- Subtle drop shadow or soft gray wash beneath objects to give gentle depth
- The overall feeling is warm, tender, comforting, and quietly hopeful — never clinical, cartoonish, or heavy

COLOR PALETTE (strict)
- Primary: sage green (#7A9B8D), muted olive (#8B9A7B)
- Warm accents: soft coral/peach (#D4A98A), warm tan (#C8AA82), muted gold (#B8A070)
- Neutrals: warm charcoal ink lines (#3A3A3A), light gray wash (#C5C5C5), cream paper tone (#F5F0E8)
- For the corgi character specifically: golden-tan (#C8A060) and cream-white fur with warm brown (#8B6B4A) markings
- NEVER use saturated primaries (no bright red, blue, yellow). NEVER use neon colors. NEVER use pure black fills.

BACKGROUND
- ALL images must be on a fully TRANSPARENT background (alpha channel)
- No paper texture, no colored backdrop, no gradient fill behind the subject
- The subject should float cleanly on transparency with only its own subtle drop shadow
- No border, frame, or vignette

COMPOSITION
- Center the subject within the canvas
- Leave generous breathing room / negative space around the subject (at least 15% margin on all sides)
- Single focal subject per image unless the prompt specifies a scene
- Objects should feel naturally scaled and grounded (not floating unless the prompt says otherwise)

WHAT TO AVOID
- No text, lettering, watermarks, or signatures anywhere in the image
- No photorealistic rendering — maintain the hand-drawn illustration quality throughout
- No thick outlines or bold strokes — keep line weight delicate and consistent
- No flat vector style — everything should feel hand-painted with visible watercolor texture
- No busy patterns or decorative fills inside objects — use simple, translucent washes
- No multiple art styles within a single image
- No humans with detailed facial features — when people appear, keep faces minimal (dot eyes, simple line features) in the same ink-wash style

SPECIAL NOTES FOR ICONS (when the prompt says "icon")
- Render as a single isolated object, perfectly centered
- Extra generous negative space (subject should occupy ~50-60% of the canvas)
- Slightly heavier line weight than scene illustrations for legibility at small sizes
- Simple, immediately recognizable silhouette

SPECIAL NOTES FOR SCENE ILLUSTRATIONS (when the prompt describes a scene)
- Can include multiple objects arranged in a natural composition
- Use atmospheric perspective (lighter/softer wash on distant elements)
- Ground the scene with a subtle shadow plane beneath objects
- Maintain the same ink-line + watercolor-wash technique throughout

SPECIAL NOTES FOR BANNER/HEADER FORMAT (when the prompt says "banner" or "header")
- Compose for a wide panoramic crop (roughly 16:9)
- Place the focal subject slightly off-center for visual interest
- Use negative space intentionally to leave room for potential text overlay areas

The dog in HSA Days is a Pembroke Welsh Corgi with golden-tan and white coloring, bright expressive eyes, and a sweet, gentle demeanor. When the prompt mentions "the dog," "Graffiti," or "the corgi," render this specific dog consistently.'

# ── Illustration manifest ───────────────────────────────────────────────────
# Format: NAME|SUBFOLDER|ASPECT|PROMPT
# SUBFOLDER determines the category for --category filtering

ILLUSTRATIONS=(
  # ── Home Page ──────────────────────────────────────────────────────────────
  'home-hero|home|16:9|A person sitting cross-legged on the ground, gently cradling a single Pembroke Welsh Corgi (tri-colored: golden-tan, cream-white, and warm brown markings) in their lap. The person wears a cozy sweater. Warm, tender moment between human and dog. Only one dog in the scene. Banner format, compose for wide panoramic crop. Leave space on the left side for text overlay. Emphasize loose, flowing watercolor washes with visible wet-on-wet bleeding and soft color transitions. The ink lines should be thin and confident but clearly visible as the structural skeleton beneath translucent watercolor layers.'

  'home-hero-bg|home|16:9|A very subtle, barely-visible abstract watercolor texture. Extremely soft sage green and cream washes blending gently. No objects, no shapes — just atmospheric watercolor paper texture. Banner format. This is a background layer, so keep it very light and airy.'

  'home-about-graffiti|home|3:4|A front-facing portrait of a Pembroke Welsh Corgi named Graffiti. The dog sits upright looking directly at the viewer with bright, warm eyes and a gentle smile. Golden-tan and cream-white fur rendered in pen-and-ink with rich watercolor washes. NOTE: This specific image should have a SOLID BLACK background instead of transparent, as it is displayed in a dark section of the site. Rich saturation — this is the most colorful piece in the set.'

  'home-cta-paws|home|16:9|A loose scattering of dog paw prints in very soft, translucent watercolor. Warm peach and sage tones. The paw prints should feel organic and randomly placed, like a dog walked across watercolor paper. Banner format. Very light and airy — this is a decorative background element.'

  'home-journey-phase1|home|1:1|A smartphone lying on a soft piece of paper or cloth napkin that has a subtle paw print on it. The phone screen is blank/off. Warm peach and cream tones. Icon-style single object composition, centered. Represents "signing up" for a digital journey.'

  'home-journey-phase2|home|1:1|A cozy still life: a coffee mug with steam rising and a coiled dog leash with a metal clasp, sitting on a surface together. Warm golden and amber watercolor tones. Represents receiving a meaningful email during a quiet morning moment. Icon-style single scene composition, centered.'

  'home-journey-phase3|home|1:1|A warm coffee or tea cup with gentle steam curling upward, sitting on a saucer. A few loose pages or a folded letter rest nearby. Light sage and cream tones. Represents a quiet morning reading ritual. Icon-style, centered.'

  'home-journey-phase4|home|1:1|A pair of hands writing in an open journal with a pen. A Pembroke Welsh Corgi rests its head nearby, watching peacefully. Warm sage green and tan tones. Represents the act of journaling and reflection. Scene composition, slightly wider than icon-style.'

  'home-journey-phase5|home|1:1|A closed hardcover journal or book with a sage green cover and a small paw print emblem embossed on the front. A ribbon bookmark trails from the pages. The book looks well-loved and complete. Represents a treasured keepsake. Icon-style single object, centered.'

  # ── Icons ───────────────────────────────────────────────────────────────────
  'icon-paw-print|icons|1:1|Icon: A single dog paw print. Four toe pads and one larger heel pad. Subtle sage green watercolor fill inside the paw shape. Soft gray drop shadow beneath. Clean, immediately recognizable silhouette.'

  'icon-flower-ornament|icons|1:1|Icon: A delicate single flower with thin curling stems and small leaves. Very fine pen lines. Minimal sage-gray watercolor wash on petals. Decorative ornament style — symmetrical, elegant. Used as a section divider throughout a website.'

  'icon-heart|icons|1:1|Icon: A simple heart shape with slightly imperfect, overlapping hand-drawn pen outlines. Very light sage-green watercolor wash fill. The multiple overlapping strokes give it a casual, sketch-like warmth.'

  'icon-pencil|icons|1:1|Icon: A single pencil, slightly angled, with a sharpened tip. Pen-and-ink line drawing with subtle gray-sage watercolor shading. Clean and simple. Represents writing and journaling.'

  'icon-arrow-left|icons|1:1|Icon: A left-pointing arrow with a slightly curved, hand-drawn line quality. Thin pen-ink stroke with subtle sage wash. Simple chevron or arrow shape — not a full decorative arrow, just a navigation indicator.'

  'icon-arrow-right|icons|1:1|Icon: A right-pointing arrow with a slightly curved, hand-drawn line quality. Thin pen-ink stroke with subtle sage wash. Mirror of the left arrow — simple navigation indicator.'

  'icon-checkmark|icons|1:1|Icon: A single checkmark (tick mark) in hand-drawn ink. Confident single stroke with a slight bounce at the end. Subtle sage-green watercolor glow around it. Represents completion and success.'

  'icon-camera|icons|1:1|Icon: A simple camera viewed from the front. Rectangular body with a circular lens in the center and a small flash bump on top. Pen-and-ink line drawing with light gray-sage watercolor shading. Represents photo capture.'

  'icon-clock|icons|1:1|Icon: A simple round analog clock face with minimal hour markers and two hands (hour and minute). Pen-and-ink outline with very light sage watercolor fill. Represents time or daily routine.'

  'icon-close|icons|1:1|Icon: A simple X shape (close/dismiss). Two crossing lines in hand-drawn ink with a slight curve. Minimal — no circle around it. Light gray wash at the intersection. Represents closing a dialog.'

  'icon-community|icons|1:1|Icon: Three to four simplified human figures standing close together in a small group. Pen-and-ink with sage and warm-tan watercolor. Figures should be gender-neutral, minimal facial detail. Represents community and togetherness.'

  'icon-dog-person|icons|1:1|Icon: A simplified person kneeling or crouching next to a small dog (Corgi-like shape). Both figures in profile view. Pen-and-ink with warm-tan and sage watercolor. Represents shared activities between human and dog.'

  'icon-download|icons|1:1|Icon: A downward-pointing arrow with a horizontal line beneath it (standard download symbol). Hand-drawn ink lines with slight imperfection. Light sage wash. Represents downloading or saving content.'

  'icon-email-signup|icons|1:1|Icon: An envelope (mail icon) with a small upward arrow or sparkle emerging from it. Pen-and-ink with warm peach and sage watercolor fills. Represents signing up to receive emails. Slightly more detailed than a minimal icon.'

  'icon-food-bowl|icons|1:1|Icon: A round dog food bowl seen from a slight above angle. Small bone shape or paw print detail on the side of the bowl. Pen-and-ink with sage and warm-tan watercolor. Represents nutrition and feeding.'

  'icon-house|icons|1:1|Icon: A simple house shape — triangular roof, rectangular body, small door in center. Pen-and-ink line drawing with sage watercolor fill on the roof. Represents the home/main page. Clean silhouette.'

  'icon-journal|icons|1:1|Icon: An open book or journal lying flat, pages spread. Delicate cursive squiggles on the pages suggesting handwritten text (not legible). Pen-and-ink with very light sage wash on the pages. Represents the guided journal product.'

  'icon-lightbulb|icons|1:1|Icon: A classic lightbulb shape with a screw base. Small radiating lines around the bulb suggesting gentle light. Pen-and-ink outline with warm-gold watercolor glow inside the bulb. Represents tips, ideas, and practical insights.'

  'icon-morning-nudge|icons|1:1|Icon: A sunrise — half circle of sun peeking above a horizon line with small radiating beams. Warm peach and gold watercolor for the sun, sage for the ground line. Represents a morning email notification or daily nudge.'

  'icon-read-reflect|icons|1:1|Icon: An open book with a small heart floating above the pages. Pen-and-ink with sage and warm-peach watercolor. The heart is subtle and small. Represents reading and emotional reflection.'

  'icon-scroll-arrow|icons|1:1|Icon: A downward-pointing arrow or chevron, inviting the viewer to scroll down. Hand-drawn ink lines, slightly bouncy. Very light sage wash. Decorative scroll-down indicator for hero sections.'

  'icon-share|icons|1:1|Icon: A share symbol — an upward-pointing arrow emerging from an open box or tray shape. Hand-drawn ink with sage wash. Simple, standard share iconography.'

  'icon-shield|icons|1:1|Icon: A shield shape with a small cross or heart inside it. Pen-and-ink outline with sage-green watercolor fill. Represents safety, protection, and care guides for dog health.'

  'icon-star|icons|1:1|Icon: A five-pointed star with slightly rounded points, hand-drawn feel. Warm-gold watercolor fill with pen-ink outline. Represents something special or highlighted in the daily content.'

  'icon-supplement|icons|1:1|Icon: A small supplement bottle or vitamin jar with a simple label area. Pen-and-ink line drawing with sage and warm-tan watercolor. Represents supplements and health resources.'

  'icon-upload-cloud|icons|1:1|Icon: A fluffy cloud shape with an upward-pointing arrow inside or emerging from it. Pen-and-ink with light sage-gray watercolor on the cloud. Represents uploading a photo to the cloud.'

  'icon-calendar|icons|1:1|Icon: A calendar page or small desk calendar with a grid of small dots or marks suggesting dates. A subtle paw print watermark on the calendar face. Pen-and-ink with sage watercolor accents. Represents daily scheduling and morning emails.'

  # ── Day Content (Days 1-3) ─────────────────────────────────────────────────
  'day01-header|days|16:9|Banner/header: Car keys resting on a soft folded cloth or envelope on a table surface. Warm peach and coral watercolor tones with ink-line detail on the keys and metal ring. Represents the moment everything changes — the start of a difficult journey. Panoramic composition with space for text on the right side.'

  'day01-activity|days|1:1|A comforting scene related to the first day of a caregiving journey with a sick dog. Perhaps a hand reaching out to touch a sleeping corgi, or a quiet moment of togetherness. Warm sage and tan tones. Square composition.'

  'day02-header|days|16:9|Banner/header: Scene representing Day 2 theme of early adjustment and settling into a new normal with a sick dog. Objects and setting that evoke quiet courage. Panoramic watercolor-ink composition.'

  'day02-activity|days|1:1|Activity illustration for Day 2 of a dog cancer caregiving journey. A gentle interactive moment. Square composition in watercolor-ink style.'

  'day03-header|days|16:9|Banner/header: Scene for Day 3, exploring the theme of finding small routines and comfort in daily care. Watercolor-ink panoramic scene.'

  'day03-activity|days|1:1|Activity illustration for Day 3. A simple, heartwarming moment of care or companionship. Square watercolor-ink composition.'

  # ── Food Illustrations ─────────────────────────────────────────────────────
  'protein|food|1:1|Icon: A lean cut of meat or protein source (like a chicken breast or steak) on a small plate. Minimal pen-and-ink with very light sage-gray watercolor wash. Represents protein as a nutritional category.'

  'chicken|food|1:1|Icon: A whole roasted chicken or chicken leg quarter. Pen-and-ink line drawing with warm-tan and light sage watercolor. Clean, appetizing.'

  'fish|food|1:1|Icon: A whole fish lying on its side. Simple, clean pen-and-ink line drawing with very subtle gray-sage watercolor shading along the body. Minimal detail — gill line, eye, tail fin.'

  'egg|food|1:1|Icon: A single egg, slightly tilted. Clean pen-and-ink outline with a very faint warm-cream watercolor fill and subtle shadow beneath. Simple and elegant.'

  'organ-meats|food|1:1|Icon: A small plate or cutting board with sliced organ meat (liver). Pen-and-ink with warm brownish-red and sage watercolor tones. Represents organ meats as a nutritional food.'

  'blueberries|food|1:1|Icon: A small cluster of blueberries (5-7 berries) with a tiny leaf. Pen-and-ink outlines with subtle blue-purple and sage-green watercolor. Fresh and natural feeling.'

  'leafy-greens|food|1:1|Icon: A bundle of leafy greens (like kale or chard) with curly, ruffled edges. Pen-and-ink with sage-green watercolor wash on the leaves. Represents vegetables and leafy greens.'

  'broccoli|food|1:1|Icon: A single broccoli floret with a short stem. Pen-and-ink with green watercolor on the crown and lighter sage on the stem. Fresh and natural.'

  'bone-broth|food|1:1|Icon: A small bowl of warm broth with gentle steam wisps rising. Pen-and-ink with warm golden-tan watercolor for the broth and sage for the bowl. Comforting and nourishing.'

  'pumpkin|food|1:1|Icon: A small pumpkin with subtle ridges and a short stem. Pen-and-ink outline with warm orange-tan watercolor fill. Autumnal and natural.'

  'warm-bowl|food|1:1|Icon: A round food bowl from a slight above angle with steam curling up. Contents suggest a warm prepared meal. Pen-and-ink with warm-tan and sage watercolor. Represents prepared meals and warm feeding.'

  'healthy-fats|food|1:1|Icon: A small collection representing healthy fats — perhaps an avocado half and a small bottle of oil. Pen-and-ink with sage-green and golden watercolor accents.'

  'whole-foods|food|1:1|Icon: A small arrangement of natural whole foods — a carrot, an apple, and a leafy green. Pen-and-ink with gentle multicolor watercolor (greens, oranges, reds all muted). Represents a whole-foods approach.'

  'small-meals|food|1:1|Icon: Two or three small food bowls of different sizes arranged together, suggesting portioned meals. Pen-and-ink with sage and tan watercolor. Represents feeding in small portions.'

  'grains|food|1:1|Icon: A few stalks of wheat or grain with drooping seed heads. Pen-and-ink with warm golden watercolor on the grain heads. Represents grains and carbohydrates.'

  'corn|food|1:1|Icon: A single ear of corn, partially husked to reveal kernels. Pen-and-ink with warm golden-yellow watercolor on the kernels and sage-green on the husk. Represents corn as a food ingredient.'

  'sugar|food|1:1|Icon: A small sugar bowl or sugar cubes with a few loose crystals. Pen-and-ink with white-gray watercolor. Slightly understated to suggest this is a food to limit. Represents sugar and sweeteners.'

  'processed-treats|food|1:1|Icon: A few commercial dog biscuits or processed treats. Pen-and-ink with warm-tan watercolor. Generic, simple shapes. Represents processed treats that should be limited.'

  'raw-meat|food|1:1|Icon: A raw cut of red meat on a cutting surface. Pen-and-ink with subtle reddish-tan watercolor. Represents raw meat as a food to approach with caution.'

  'hand-feeding|food|1:1|Icon: A human hand offering food to a small dog mouth. The dog looks up gently. Pen-and-ink with warm-tan and sage watercolor. Represents hand-feeding as a caregiving technique. Slightly more scene-like than other food icons.'

  # ── Supplement Banners ─────────────────────────────────────────────────────
  'blood-support|supplements|21:9|Banner: A windowsill or shelf arrangement of small supplement bottles, jars, and a potted herb plant. Pen-and-ink with very subtle sage-gray watercolor. Represents blood support supplements. Panoramic composition. Peaceful, apothecary-like feel.'

  'anti-cancer|supplements|21:9|Banner: A gentle arrangement of supplement bottles, a mortar and pestle, and dried herbs on a shelf. Pen-and-ink with sage and warm watercolor. Represents anti-cancer supplements. Hopeful and natural — not clinical. Panoramic composition.'

  'immune-support|supplements|21:9|Banner: Supplement bottles and small potted plants arranged on a windowsill with soft light streaming through. Pen-and-ink with sage-green and cream watercolor. Represents immune support. Panoramic, warm and inviting.'

  'liver-organ|supplements|21:9|Banner: A collection of supplement capsules, a small dropper bottle, and herbs arranged on a wooden surface. Pen-and-ink with warm-tan and sage watercolor. Represents liver and organ support. Panoramic composition.'

  'quality-of-life|supplements|21:9|Banner: A cozy arrangement of supplement bottles alongside a soft blanket and a dog toy, suggesting comfort and quality of life. Pen-and-ink with warm sage and peach watercolor. Panoramic. The most emotionally warm of the supplement banners.'

  # ── Order Page ─────────────────────────────────────────────────────────────
  'order-hero-lifestyle|order|16:9|Banner/header: A warm lifestyle scene — a journal resting on a cozy blanket or table next to a cup of coffee, with soft morning light. A corgi rests nearby. Inviting and aspirational. Panoramic.'

  'order-product-mockup|order|3:4|A closed hardcover journal at a slight 3/4 angle. Sage green linen cover with a small embossed paw print in the center. A ribbon bookmark in sage green trails from between the pages. The book has visible page edges showing quality paper. Pen-and-ink with rich sage-green and cream watercolor. This is the hero product image — it must look premium and desirable.'

  'order-inside-reflection|order|1:1|An open journal spread showing a reflection page. One side has watercolor-style lined areas for writing, the other has a soft illustration. Pen-and-ink with sage and cream watercolor. Represents the journaling experience.'

  'order-inside-prompt|order|1:1|An open journal page showing a daily prompt — a few lines of text (represented as squiggles) with decorative watercolor elements around the margins. A small illustrated icon in the corner. Represents the daily prompt feature.'

  'order-inside-activity|order|1:1|An open journal page showing an activity section — a checkbox-style list and a small illustration of a person with a dog. Pen-and-ink with sage watercolor accents. Represents daily activities.'

  'order-inside-resources|order|1:1|An open journal page with a resources section — small icons of a book, shield, and food bowl with lines of text (squiggles). Organized, helpful layout. Pen-and-ink with sage accents.'

  'order-inside-keepsakes|order|1:1|An open journal spread showing a keepsakes area — a photo frame outline, a space for a paw print impression, and pressed flower outlines. Represents preserving memories. Warm peach and sage watercolor.'

  'order-inside-binding|order|1:1|A close-up view of a journal spine and binding, showing quality stitching and thick cream pages. Pen-and-ink detail drawing with sage and warm-tan watercolor. Represents craftsmanship and durability.'

  'order-lifestyle-morning|order|16:9|Banner: A morning scene — hands holding a warm cup of coffee next to an open journal on a table. Soft morning light. A dog leash hangs on a hook in the background. Warm, cozy atmosphere. Panoramic.'

  'order-lifestyle-writing|order|1:1|A person hands writing in an open journal with a pen. Close-up of the writing action. Warm sage and tan watercolor tones. Represents active engagement with the journal. Square composition.'

  'order-lifestyle-couch|order|3:4|A cozy couch scene — a person curled up reading/writing in a journal with a corgi resting beside them. Warm blanket, soft light. Pen-and-ink with sage, peach, and warm-tan watercolor. Portrait orientation.'

  'order-lifestyle-complete|order|16:9|Banner: A completed journal displayed on a shelf or mantle like a treasured keepsake, alongside a framed photo and a small plant. Warm, nostalgic feeling. The journal is the completed HSA Days book. Panoramic.'

  'order-why-physical|order|3:4|A pair of hands holding a closed journal against their chest, hugging it close. Emotional, intimate. Pen-and-ink with warm sage and peach watercolor. Represents the tactile, emotional value of a physical journal vs digital. Portrait orientation.'

  # ── Resources ──────────────────────────────────────────────────────────────
  'hsa-hub-hero|resources|16:9|Banner/header: A warm veterinary scene — a golden-tan Pembroke Welsh Corgi lying on an exam table, a veterinarian gloved hands resting gently on the dog side. Medical equipment softly visible in the background (stethoscope, clipboard). Warm sage and cream tones. The mood is attentive and caring, not alarming. Panoramic format, space on the left for text overlay.'

  'hsa-hub-the-disease|resources|1:1|Icon-scene: An abstract representation of blood vessels — thin, branching ink lines in a loose organic network pattern, with a single dark spot at one branching point suggesting a mass. Translucent watercolor fills in sage green and warm terracotta. No text. Should read as blood vessel biology at a glance. Centered, generous negative space.'

  'hsa-hub-diagnosis|resources|1:1|Icon-scene: A small ultrasound probe or handheld scanner sitting on a soft cloth, with a loose suggestion of a scan image floating nearby — abstract rounded shapes. Pen-and-ink with sage-gray watercolor. Should read as medical imaging or diagnosis. Centered, generous negative space.'

  'hsa-hub-treatment|resources|1:1|Icon-scene: A small medicine bottle with a label (no text) next to a single syringe and a few capsule pills arranged on a cloth. Warm sage and cream watercolor. Represents the idea of treatment options. Centered, generous negative space.'

  'hsa-hub-breed-risks|resources|1:1|Icon-scene: Three dog silhouettes side by side — a Golden Retriever, a German Shepherd, and a Labrador Retriever — rendered as loose ink sketches with very light sage watercolor wash fills. All three dogs facing forward, gently grouped together. Centered, square format.'

  'hsa-hub-research|resources|1:1|Icon-scene: A small microscope viewed from a slight three-quarter angle, with a few loose circular shapes around it suggesting cells or petri dishes. Pen-and-ink with sage and gold watercolor. Represents scientific research and hope. Centered.'

  'hsa-hub-vet-questions|resources|1:1|Icon-scene: Two figures — one seated (the owner) and one standing (the vet in a white coat) — in a loose conversation scene. Both figures are minimal, dot eyes and simple ink lines. A dog sits near the owner feet. Warm sage and tan watercolor. Represents talking to your oncologist. Square format, centered.'

  'emergency-hero|resources|16:9|Banner/header: An urgent but calm composition — a dog first aid bag (soft fabric bag with a cross symbol on it) sitting on a surface, with a dog leash, a small flashlight, and a folded piece of paper nearby. Terracotta and warm cream watercolor. Panoramic. Conveys readiness and preparation without alarm.'

  'emergency-gum-check|resources|1:1|Icon-scene: A gentle close-up of a dog mouth from the side — a human hand with one finger gently lifting the dog lip to reveal the gum area. The ink lines are delicate and the gums are shown in a soft pink wash. Represents the gum color check technique. Warm terracotta and cream tones. Centered, square.'

  'emergency-crisis-scene|resources|1:1|Icon-scene: A corgi lying on its side on a blanket, a human hand resting gently on the dog side in a reassuring gesture. The mood is serious but tender — this represents monitoring a dog in distress. Ink lines delicate, watercolor in muted sage and warm-gray tones. Centered, square.'

  'emergency-kit|resources|1:1|Icon-scene: A small open bag with emergency supplies spilling out neatly — a thermometer, a roll of bandage, a small bottle, and some cotton pads. Pen-and-ink with sage and terracotta watercolor accents. Represents the emergency kit. Centered, square.'

  'emergency-monitoring|resources|1:1|Icon-scene: An owner sitting beside a resting corgi, both looking calm. The owner has a small notebook or phone in hand, suggesting they are logging observations. Warm sage and tan watercolor. Represents daily monitoring practice. Centered, square.'

  'financial-hero|resources|16:9|Banner/header: A warm, community-feeling scene — two pairs of hands joined together (one reaching to help another), with a small dog paw resting on top. Warm sage and gold watercolor. The mood is supportive and hopeful, not desperate. Panoramic format, space for text.'

  'financial-grants|resources|1:1|Icon-scene: A clipboard with a form on it (represented as horizontal squiggle lines, not real text), next to a small envelope and a pen. Pen-and-ink with gold and sage watercolor. Represents the application process. Centered, square.'

  'financial-tips|resources|1:1|Icon-scene: A single lightbulb with a warm golden glow, rendered in pen-and-ink with translucent gold watercolor wash inside the bulb. Small radiating lines around it. Represents practical tips and insights. Centered, square.'
)

# ── Generate function ────────────────────────────────────────────────────────
generate_image() {
  local name="$1"
  local subfolder="$2"
  local aspect="$3"
  local prompt="$4"

  local outdir="$ILLUST_DIR/$subfolder"
  local outfile="$outdir/$name.png"

  # Skip if exists (unless --force)
  if [[ -f "$outfile" && "$FORCE" != true ]]; then
    echo "  SKIP  $subfolder/$name.png (exists, use --force to overwrite)"
    return 0
  fi

  # Use custom prompt if provided (only for --only mode)
  if [[ -n "$CUSTOM_PROMPT" ]]; then
    prompt="$CUSTOM_PROMPT"
  fi

  if [[ "$DRY_RUN" == true ]]; then
    echo "  DRY   $subfolder/$name.png  (aspect: $aspect)"
    echo "        Prompt: ${prompt:0:100}..."
    return 0
  fi

  mkdir -p "$outdir"

  echo "  GEN   $subfolder/$name.png  (model: ${DEFAULT_MODEL##*/}, aspect: $aspect)"

  # Build JSON payload with system prompt
  local payload
  payload=$(jq -n \
    --arg model "$DEFAULT_MODEL" \
    --arg system "$SYSTEM_PROMPT" \
    --arg prompt "$prompt" \
    --arg aspect "$aspect" \
    '{
      model: $model,
      messages: [
        {role: "system", content: $system},
        {role: "user", content: $prompt}
      ],
      modalities: ["image"],
      image_config: {aspect_ratio: $aspect}
    }')

  # Call OpenRouter API
  local response
  response=$(curl -s -w "\n%{http_code}" \
    "https://openrouter.ai/api/v1/chat/completions" \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -H "Content-Type: application/json" \
    -H "HTTP-Referer: https://hsadays.com" \
    -H "X-Title: HSA Days Illustrations" \
    -d "$payload" \
    --max-time 120)

  local http_code
  http_code=$(echo "$response" | tail -1)
  local body
  body=$(echo "$response" | sed '$d')

  if [[ "$http_code" != "200" ]]; then
    echo "  ERROR $name — HTTP $http_code"
    echo "$body" | jq -r '.error.message // .error // "Unknown error"' 2>/dev/null || echo "$body"
    return 1
  fi

  # Extract base64 image data — try multiple response shapes
  local data_url=""

  # Shape 1: images array (Gemini models)
  data_url=$(echo "$body" | jq -r '.choices[0].message.images[0].image_url.url // empty' 2>/dev/null)

  # Shape 2: content array with image_url
  if [[ -z "$data_url" ]]; then
    data_url=$(echo "$body" | jq -r '.choices[0].message.content[0].image_url.url // empty' 2>/dev/null)
  fi

  # Shape 3: inline_data in content parts
  if [[ -z "$data_url" ]]; then
    local mime_type b64_data
    mime_type=$(echo "$body" | jq -r '.choices[0].message.content[0].inline_data.mime_type // empty' 2>/dev/null)
    b64_data=$(echo "$body" | jq -r '.choices[0].message.content[0].inline_data.data // empty' 2>/dev/null)
    if [[ -n "$b64_data" ]]; then
      data_url="data:${mime_type:-image/png};base64,$b64_data"
    fi
  fi

  # Shape 4: raw content string (data URL)
  if [[ -z "$data_url" ]]; then
    data_url=$(echo "$body" | jq -r '.choices[0].message.content // empty' 2>/dev/null)
  fi

  if [[ -z "$data_url" ]]; then
    echo "  ERROR $name — Could not extract image from response"
    echo "$body" | jq '.' 2>/dev/null | head -20
    return 1
  fi

  # Strip data URL prefix if present, decode base64
  local base64_data
  base64_data=$(echo "$data_url" | sed 's|^data:image/[^;]*;base64,||')

  echo "$base64_data" | base64 -d > "$outfile" 2>/dev/null

  # Verify file is a valid image
  if [[ -f "$outfile" ]] && file "$outfile" | grep -qiE 'image|PNG|JPEG|bitmap'; then
    local size
    size=$(du -h "$outfile" | cut -f1)
    echo "  OK    $subfolder/$name.png ($size)"
  else
    echo "  ERROR $name — Decoded file is not a valid image"
    rm -f "$outfile"
    return 1
  fi

  # Optionally remove background
  if [[ "$USE_REMBG" == true && -f "$outfile" ]]; then
    local rembg_tmp="${outfile%.png}-nobg.png"
    echo "  REMBG $subfolder/$name.png (removing background...)"
    "$REMBG" i "$outfile" "$rembg_tmp" 2>/dev/null
    if [[ -f "$rembg_tmp" ]]; then
      mv "$rembg_tmp" "$outfile"
      echo "  OK    $subfolder/$name.png (transparent)"
    else
      echo "  WARN  $name — rembg failed, keeping opaque version"
    fi
  fi
}

# ── Main ─────────────────────────────────────────────────────────────────────
echo ""
echo "HSA Days — Illustration Generator"
echo "Model: ${DEFAULT_MODEL##*/}  |  Force: $FORCE  |  Dry run: $DRY_RUN  |  Rembg: $USE_REMBG"
if [[ -n "$CATEGORY" ]]; then
  echo "Category: $CATEGORY"
fi
if [[ -n "$ONLY" ]]; then
  echo "Only: $ONLY"
fi
echo "──────────────────────────────────────"
echo ""

errors=0
generated=0
skipped=0

for entry in "${ILLUSTRATIONS[@]}"; do
  IFS='|' read -r name subfolder aspect prompt <<< "$entry"

  # Filter by --only
  if [[ -n "$ONLY" && "$name" != "$ONLY" ]]; then
    continue
  fi

  # Filter by --category
  if [[ -n "$CATEGORY" && "$subfolder" != "$CATEGORY" ]]; then
    continue
  fi

  if generate_image "$name" "$subfolder" "$aspect" "$prompt"; then
    ((generated++))
  else
    ((errors++))
  fi
done

echo ""
echo "──────────────────────────────────────"
echo "Done. Generated: $generated  |  Errors: $errors"
echo ""

if [[ $errors -gt 0 ]]; then
  exit 1
fi
