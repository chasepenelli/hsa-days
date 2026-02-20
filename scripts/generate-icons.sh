#!/usr/bin/env bash
set -euo pipefail

# ── HSA Days Icon Generator ─────────────────────────────────────────────────
# Generates custom hand-drawn ink sketch icons via OpenRouter FLUX API,
# then removes white backgrounds using rembg for true transparency.
#
# Usage:
#   ./scripts/generate-icons.sh                     # Generate all missing
#   ./scripts/generate-icons.sh --force              # Regenerate everything
#   ./scripts/generate-icons.sh --only icon-journal  # Single icon
#   ./scripts/generate-icons.sh --skip-rembg         # Skip background removal
#
# Requires: OPENROUTER_API_KEY env var, jq, rembg

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ICONS_DIR="$PROJECT_ROOT/public/illustrations/icons"
REMBG="/Users/home/Library/Python/3.13/bin/rembg"

# ── Defaults ─────────────────────────────────────────────────────────────────
MODEL="black-forest-labs/flux.2-pro"
FORCE=false
ONLY=""
SKIP_REMBG=false

# ── Parse flags ──────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --model)   MODEL="black-forest-labs/$2"; shift 2 ;;
    --force)   FORCE=true; shift ;;
    --only)    ONLY="$2"; shift 2 ;;
    --skip-rembg) SKIP_REMBG=true; shift ;;
    --help|-h)
      echo "Usage: $0 [--model flux.2-pro] [--force] [--only NAME] [--skip-rembg]"
      exit 0 ;;
    *) echo "Unknown flag: $1"; exit 1 ;;
  esac
done

# ── Validate ─────────────────────────────────────────────────────────────────
if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  if [[ -f "$PROJECT_ROOT/.env.local" ]]; then
    KEY=$(grep '^OPENROUTER_API_KEY=' "$PROJECT_ROOT/.env.local" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    [[ -n "$KEY" ]] && export OPENROUTER_API_KEY="$KEY"
  fi
fi

if [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  echo "ERROR: OPENROUTER_API_KEY not set."
  exit 1
fi

command -v jq >/dev/null 2>&1 || { echo "ERROR: jq required"; exit 1; }

if [[ "$SKIP_REMBG" != true ]]; then
  [[ -x "$REMBG" ]] || { echo "ERROR: rembg not found at $REMBG"; exit 1; }
fi

# ── Style prefix for all icon prompts ────────────────────────────────────────
# Icons need to be: centered, single object, very simple, clean line art
STYLE_PREFIX="Simple hand-drawn ink sketch icon, single centered object, minimal line art, thin black ink strokes, subtle muted sage green ink wash accent, white background, lots of white space around the object, no text, no watermarks, no shadows, clean and minimal —"

# ── Icon manifest ────────────────────────────────────────────────────────────
# Format: NAME|PROMPT_SUFFIX
# All icons are 1:1, generated with FLUX Pro

ICONS=(
  # ── Feature section icons ──────────────────────────────────────────────────
  'icon-journal|an open journal notebook with a few gentle lines suggesting handwritten pages, warm and inviting'
  'icon-house|a small cozy house with a simple door and window, warm and safe feeling, home symbol'
  'icon-dog-person|a person kneeling beside a small corgi dog, gentle and warm, companionship'
  'icon-star|a single hand-drawn star with gentle ink strokes, warm and encouraging'
  'icon-calendar|a simple calendar page with a few date squares suggested, gentle and organized'
  'icon-community|two people side by side with a small heart between them, connection and community'

  # ── How It Works icons ─────────────────────────────────────────────────────
  'icon-email-signup|a laptop computer with a small envelope floating above it, signing up, digital and warm'
  'icon-read-reflect|a mobile phone resting beside an open book, reading and reflecting, peaceful'
  'icon-morning-nudge|an alarm clock with gentle radiating lines suggesting a soft morning chime, not harsh'

  # ── Resources icons ────────────────────────────────────────────────────────
  'icon-supplement|a small medicine bottle or supplement jar with a leaf beside it, health and wellness'
  'icon-food-bowl|a dog food bowl with a few kibble pieces, nurturing, simple'
  'icon-shield|a simple shield shape with a small checkmark inside, protection and safety'

  # ── Day content section icons ──────────────────────────────────────────────
  'icon-pencil|a single pencil or pen at a slight angle, ready to write, creative and intentional'
  'icon-clock|a simple analog clock face showing morning time, gentle and unhurried'
  'icon-lightbulb|a simple light bulb with gentle radiating lines, idea or tip, warm glow'
  'icon-camera|a simple vintage camera from the front, capturing memories, nostalgic and warm'

  # ── Decorative icons ───────────────────────────────────────────────────────
  'icon-paw-print|a single dog paw print, simple and cute, centered'
  'icon-flower-ornament|a tiny simple flower with three petals, delicate ornamental flourish'
  'icon-scroll-arrow|a gentle downward-pointing arrow with a slight curve, inviting to scroll down'
  'icon-heart|a single hand-drawn heart shape, warm and imperfect, gentle and loving'

  # ── Onboarding icons ───────────────────────────────────────────────────────
  'icon-upload-cloud|a simple cloud shape with a small upward arrow, uploading a photo'

  # ── UI icons ───────────────────────────────────────────────────────────────
  'icon-arrow-left|a single leftward-pointing arrow, simple hand-drawn, gentle curve'
  'icon-arrow-right|a single rightward-pointing arrow, simple hand-drawn, gentle curve'
  'icon-checkmark|a single hand-drawn checkmark tick mark, confident and complete'
  'icon-close|a simple hand-drawn X mark, two crossing lines, gentle and soft'
  'icon-share|a simple share symbol, a dot with two branching lines going outward, minimal'
  'icon-download|a simple downward-pointing arrow with a horizontal line beneath it, downloading'
)

# ── Generate function ────────────────────────────────────────────────────────
generate_icon() {
  local name="$1"
  local prompt_suffix="$2"

  local raw_file="$ICONS_DIR/raw/$name.png"
  local final_file="$ICONS_DIR/$name.png"

  # Skip if final exists (unless --force)
  if [[ -f "$final_file" && "$FORCE" != true ]]; then
    echo "  SKIP  $name.png (exists)"
    return 0
  fi

  local prompt="$STYLE_PREFIX $prompt_suffix"

  mkdir -p "$ICONS_DIR/raw" "$ICONS_DIR"

  echo "  GEN   $name.png"

  local payload
  payload=$(jq -n \
    --arg model "$MODEL" \
    --arg prompt "$prompt" \
    '{
      model: $model,
      modalities: ["image"],
      messages: [{role: "user", content: $prompt}],
      image_config: {aspect_ratio: "1:1"}
    }')

  local response
  response=$(curl -s -w "\n%{http_code}" \
    "https://openrouter.ai/api/v1/chat/completions" \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -H "Content-Type: application/json" \
    -H "HTTP-Referer: https://hsadays.com" \
    -H "X-Title: HSA Days Icons" \
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

  # Extract base64 image — try multiple response shapes
  local data_url=""
  data_url=$(echo "$body" | jq -r '.choices[0].message.content[0].image_url.url // empty' 2>/dev/null)
  [[ -z "$data_url" ]] && data_url=$(echo "$body" | jq -r '.choices[0].message.images[0].image_url.url // empty' 2>/dev/null)
  [[ -z "$data_url" ]] && data_url=$(echo "$body" | jq -r '.choices[0].message.content // empty' 2>/dev/null)

  if [[ -z "$data_url" ]]; then
    echo "  ERROR $name — Could not extract image"
    echo "$body" | jq '.' 2>/dev/null | head -10
    return 1
  fi

  local base64_data
  base64_data=$(echo "$data_url" | sed 's|^data:image/[^;]*;base64,||')
  echo "$base64_data" | base64 -d > "$raw_file" 2>/dev/null

  if ! file "$raw_file" | grep -qiE 'image|PNG|JPEG'; then
    echo "  ERROR $name — Not a valid image"
    rm -f "$raw_file"
    return 1
  fi

  # Remove background
  if [[ "$SKIP_REMBG" != true ]]; then
    echo "  REMBG $name.png (removing background...)"
    "$REMBG" i "$raw_file" "$final_file" 2>/dev/null
    if [[ -f "$final_file" ]]; then
      local size
      size=$(du -h "$final_file" | cut -f1)
      echo "  OK    $name.png ($size, transparent)"
    else
      echo "  WARN  $name — rembg failed, keeping raw version"
      cp "$raw_file" "$final_file"
    fi
  else
    cp "$raw_file" "$final_file"
    local size
    size=$(du -h "$final_file" | cut -f1)
    echo "  OK    $name.png ($size, white bg)"
  fi
}

# ── Main ─────────────────────────────────────────────────────────────────────
echo ""
echo "HSA Days — Icon Generator"
echo "Model: ${MODEL##*/}  |  Force: $FORCE  |  Rembg: $( [[ "$SKIP_REMBG" == true ]] && echo "skip" || echo "enabled")"
echo "──────────────────────────────────────"
echo ""

errors=0

for entry in "${ICONS[@]}"; do
  IFS='|' read -r name prompt_suffix <<< "$entry"

  if [[ -n "$ONLY" && "$name" != "$ONLY" ]]; then
    continue
  fi

  if ! generate_icon "$name" "$prompt_suffix"; then
    ((errors++))
  fi
done

echo ""
echo "──────────────────────────────────────"
echo "Done. Errors: $errors"
echo "Output: $ICONS_DIR/"
echo ""

[[ $errors -gt 0 ]] && exit 1 || exit 0
