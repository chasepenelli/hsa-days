#!/usr/bin/env zsh
set -euo pipefail

# Generate monochrome (black and white) versions of all icons
# Uses the same watercolor/ink style but in single-color palettes

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h}"
ICON_DIR="$PROJECT_ROOT/public/illustrations/icons"

# Load API key
if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  if [[ -f "$PROJECT_ROOT/.env.local" ]]; then
    OPENROUTER_API_KEY=$(grep '^OPENROUTER_API_KEY=' "$PROJECT_ROOT/.env.local" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    export OPENROUTER_API_KEY
  fi
fi

if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  echo "ERROR: OPENROUTER_API_KEY not set."
  exit 1
fi

command -v jq >/dev/null 2>&1 || { echo "ERROR: jq required"; exit 1; }

MODEL="google/gemini-3.1-flash-image-preview"

BLACK_SYSTEM='You are an illustration artist. Create images using ONLY black, dark gray, and charcoal tones on a fully TRANSPARENT background. Same hand-drawn pen-and-ink line art with soft watercolor wash fills — loose, flowing watercolor washes with visible wet-on-wet bleeding. Thin confident ink lines as structural skeleton. But ALL colors must be monochromatic black/dark gray. No color at all — only varying shades of black and gray watercolor washes with black ink lines. Maintain the same hand-painted watercolor texture and quality. No text, no watermarks.'

WHITE_SYSTEM='You are an illustration artist. Create images using ONLY white, light gray, and soft off-white tones on a fully TRANSPARENT background. Same hand-drawn pen-and-ink line art with soft watercolor wash fills — loose, flowing watercolor washes with visible wet-on-wet bleeding. Thin confident ink lines as structural skeleton, but in white/light gray instead of dark. ALL colors must be monochromatic white/light gray. No dark colors at all — only varying shades of white and pale gray watercolor washes with white ink lines. Maintain the same hand-painted watercolor texture and quality. No text, no watermarks.'

# Format: NAME|PROMPT
ICONS=(
  'icon-paw-print|Icon: A single dog paw print. Four toe pads and one larger heel pad. Soft drop shadow beneath. Clean, immediately recognizable silhouette.'
  'icon-flower-ornament|Icon: A delicate single flower with thin curling stems and small leaves. Very fine pen lines. Decorative ornament style — symmetrical, elegant.'
  'icon-heart|Icon: A simple heart shape with slightly imperfect, overlapping hand-drawn pen outlines. The multiple overlapping strokes give it a casual, sketch-like warmth.'
  'icon-pencil|Icon: A single pencil, slightly angled, with a sharpened tip. Clean and simple. Represents writing and journaling.'
  'icon-arrow-left|Icon: A left-pointing arrow with a slightly curved, hand-drawn line quality. Simple chevron or arrow shape — a navigation indicator.'
  'icon-arrow-right|Icon: A right-pointing arrow with a slightly curved, hand-drawn line quality. Mirror of the left arrow — simple navigation indicator.'
  'icon-checkmark|Icon: A single checkmark (tick mark) in hand-drawn ink. Confident single stroke with a slight bounce at the end. Represents completion and success.'
  'icon-camera|Icon: A simple camera viewed from the front. Rectangular body with a circular lens in the center and a small flash bump on top.'
  'icon-clock|Icon: A simple round analog clock face with minimal hour markers and two hands (hour and minute).'
  'icon-close|Icon: A simple X shape (close/dismiss). Two crossing lines in hand-drawn ink with a slight curve. Minimal — no circle around it.'
  'icon-community|Icon: Three to four simplified human figures standing close together in a small group. Figures should be gender-neutral, minimal facial detail.'
  'icon-dog-person|Icon: A simplified person kneeling or crouching next to a small dog (Corgi-like shape). Both figures in profile view.'
  'icon-download|Icon: A downward-pointing arrow with a horizontal line beneath it (standard download symbol). Hand-drawn lines with slight imperfection.'
  'icon-email-signup|Icon: An envelope (mail icon) with a small upward arrow or sparkle emerging from it. Represents signing up to receive emails.'
  'icon-food-bowl|Icon: A round dog food bowl seen from a slight above angle. Small bone shape or paw print detail on the side of the bowl.'
  'icon-house|Icon: A simple house shape — triangular roof, rectangular body, small door in center. Clean silhouette.'
  'icon-journal|Icon: An open book or journal lying flat, pages spread. Delicate cursive squiggles on the pages suggesting handwritten text.'
  'icon-lightbulb|Icon: A classic lightbulb shape with a screw base. Small radiating lines around the bulb suggesting gentle light.'
  'icon-morning-nudge|Icon: A sunrise — half circle of sun peeking above a horizon line with small radiating beams.'
  'icon-read-reflect|Icon: An open book with a small heart floating above the pages. The heart is subtle and small.'
  'icon-scroll-arrow|Icon: A downward-pointing arrow or chevron, inviting the viewer to scroll down. Hand-drawn ink lines, slightly bouncy.'
  'icon-share|Icon: A share symbol — an upward-pointing arrow emerging from an open box or tray shape.'
  'icon-shield|Icon: A shield shape with a small cross or heart inside it.'
  'icon-star|Icon: A five-pointed star with slightly rounded points, hand-drawn feel.'
  'icon-supplement|Icon: A small supplement bottle or vitamin jar with a simple label area.'
  'icon-upload-cloud|Icon: A fluffy cloud shape with an upward-pointing arrow inside or emerging from it.'
  'icon-calendar|Icon: A calendar page or small desk calendar with a grid of small dots or marks suggesting dates. A subtle paw print watermark on the calendar face.'
)

generate_mono() {
  local name="$1"
  local color="$2"
  local base_prompt="$3"

  local outdir="$ICON_DIR/$color"
  local outfile="$outdir/$name.png"

  mkdir -p "$outdir"

  if [[ -f "$outfile" ]]; then
    echo "  SKIP  $color/$name.png (exists)"
    return 0
  fi

  local sys_prompt color_note
  if [[ "$color" == "black" ]]; then
    sys_prompt="$BLACK_SYSTEM"
    color_note="Rendered entirely in black and dark gray watercolor washes with black ink outlines. Monochromatic — no color, only black/charcoal/gray tones."
  else
    sys_prompt="$WHITE_SYSTEM"
    color_note="Rendered entirely in white and light gray watercolor washes with white ink outlines. Monochromatic — no dark colors, only white/pale gray tones."
  fi

  local prompt="$base_prompt $color_note Same hand-drawn watercolor texture."

  echo "  GEN   $color/$name.png"

  local payload
  payload=$(jq -n \
    --arg model "$MODEL" \
    --arg system "$sys_prompt" \
    --arg prompt "$prompt" \
    '{model: $model, messages: [{role: "system", content: $system}, {role: "user", content: $prompt}], modalities: ["image"], image_config: {aspect_ratio: "1:1"}}')

  local response
  response=$(curl -s "https://openrouter.ai/api/v1/chat/completions" \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -H "Content-Type: application/json" \
    -H "HTTP-Referer: https://hsadays.com" \
    -H "X-Title: HSA Days Mono Icons" \
    -d "$payload" --max-time 120)

  local err_check
  err_check=$(echo "$response" | jq -r '.error.message // empty' 2>/dev/null)
  if [[ -n "$err_check" ]]; then
    echo "  ERROR $name — $err_check"
    return 1
  fi

  local data_url
  data_url=$(echo "$response" | jq -r '.choices[0].message.images[0].image_url.url // empty' 2>/dev/null)
  if [[ -z "$data_url" ]]; then
    data_url=$(echo "$response" | jq -r '.choices[0].message.content[0].image_url.url // empty' 2>/dev/null)
  fi

  if [[ -z "$data_url" ]]; then
    echo "  ERROR $name — Could not extract image"
    return 1
  fi

  local base64_data
  base64_data=$(echo "$data_url" | sed 's|^data:image/[^;]*;base64,||')
  echo "$base64_data" | base64 -d > "$outfile" 2>/dev/null

  if [[ -f "$outfile" ]] && file "$outfile" | grep -qiE 'image|PNG'; then
    local size
    size=$(du -h "$outfile" | cut -f1)
    echo "  OK    $color/$name.png ($size)"
  else
    echo "  ERROR $name — Invalid image"
    rm -f "$outfile"
    return 1
  fi
}

# ── Main ─────────────────────────────────────────────────────────────────────
COLOR="${1:-both}"

echo ""
echo "HSA Days — Monochrome Icon Generator"
echo "Color: $COLOR"
echo "──────────────────────────────────────"
echo ""

errors=0

for entry in "${ICONS[@]}"; do
  name="${entry%%|*}"
  prompt="${entry#*|}"

  if [[ "$COLOR" == "black" || "$COLOR" == "both" ]]; then
    generate_mono "$name" "black" "$prompt" || ((errors++))
  fi

  if [[ "$COLOR" == "white" || "$COLOR" == "both" ]]; then
    generate_mono "$name" "white" "$prompt" || ((errors++))
  fi
done

echo ""
echo "──────────────────────────────────────"
echo "Done. Errors: $errors"

if [[ $errors -gt 0 ]]; then
  exit 1
fi
