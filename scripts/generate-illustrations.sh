#!/usr/bin/env bash
set -euo pipefail

# ── HSA Days Illustration Generator ──────────────────────────────────────────
# Uses OpenRouter API with FLUX models from Black Forest Labs
#
# Usage:
#   ./scripts/generate-illustrations.sh                    # Generate all missing
#   ./scripts/generate-illustrations.sh --force            # Regenerate everything
#   ./scripts/generate-illustrations.sh --only home-hero   # Single illustration
#   ./scripts/generate-illustrations.sh --model flux.2-pro # Use cheaper model
#   ./scripts/generate-illustrations.sh --only day04-header --prompt "your prompt"
#
# Requires: OPENROUTER_API_KEY env var, jq, base64

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ILLUST_DIR="$PROJECT_ROOT/public/illustrations"

# ── Defaults ─────────────────────────────────────────────────────────────────
DEFAULT_MODEL="black-forest-labs/flux.2-max"
FORCE=false
ONLY=""
CUSTOM_PROMPT=""

# ── Parse flags ──────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --model)
      DEFAULT_MODEL="black-forest-labs/$2"
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
    --prompt)
      CUSTOM_PROMPT="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: $0 [--model flux.2-pro|flux.2-max] [--force] [--only NAME] [--prompt \"...\"]"
      echo ""
      echo "Flags:"
      echo "  --model MODEL   FLUX model to use (default: flux.2-max)"
      echo "  --force         Overwrite existing files"
      echo "  --only NAME     Generate only one illustration (e.g. home-hero, day01-header)"
      echo "  --prompt TEXT   Custom prompt (only with --only)"
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
  # Try loading from .env.local
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

# ── Illustration manifest ───────────────────────────────────────────────────
# Format: NAME|SUBFOLDER|ASPECT|MODEL_TIER|PROMPT
# MODEL_TIER: "max" uses flux.2-max, "pro" uses flux.2-pro (unless --model overrides)

ILLUSTRATIONS=(
  'home-hero|home|16:9|max|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a person sitting cross-legged on the floor with a small corgi dog curled up beside them, quiet intimate moment, gentle and peaceful, warm domestic scene, lots of white space'

  'home-about-graffiti|home|3:4|max|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, warm golden ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — portrait of a welsh corgi dog with expressive eyes, warm and characterful, the dog looks gentle and wise, head slightly tilted, soft golden light, centered composition'

  'home-journey-phase1|home|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted terracotta ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a mobile phone lying face-down on a piece of paper with a small paw print stamp, quiet and still composition, sense of shock and pause'

  'home-journey-phase2|home|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, warm golden ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a coffee mug with gentle steam rising next to a coiled dog leash, soft morning light falling across the scene, peaceful morning still life'

  'home-journey-phase3|home|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a crumpled tissue beside an open journal notebook, a pen nearby, emotional but gentle, quiet moment of feeling'

  'home-journey-phase4|home|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a pen resting on a journal page filled with gentle ink marks suggesting handwriting, warm and contemplative, sense of depth and reflection'

  'home-journey-phase5|home|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a single paw print and a human footprint side by side on a simple path, gentle and meaningful, sense of companionship and peace'

  'home-cta-paws|home|16:9|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — scattered dog paw prints across the composition, whimsical and decorative, varying sizes, playful trail pattern, lots of white space, delicate and light'

  'day01-header|days|16:9|max|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted terracotta ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — car keys resting on a piece of paper on a car dashboard, view suggesting looking through a windshield, quiet stunned moment, still and heavy'

  'day01-activity|days|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a mobile phone set aside face-down on a wooden floor, a coiled dog leash nearby, sense of putting distractions away, peaceful and intentional'

  'day02-header|days|16:9|max|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, warm golden ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — morning light streaming through a window onto a windowsill, a coffee cup catching the warm light, gentle dawn, hopeful but tender'

  'day02-activity|days|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, warm golden ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a hand holding a pen writing on the back of a small envelope, intimate and personal, capturing a fleeting moment, warm and gentle'

  'day03-header|days|16:9|max|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted terracotta ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — an open laptop with many browser tabs suggested at the top, a small notebook and pen beside it, sense of information overwhelm but the notebook offering grounding'

  'day03-activity|days|1:1|pro|Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks — a small notebook open with three short lines suggesting handwritten questions, a pen resting on the page, simple and intentional, sense of clarity emerging'
)

# ── Generate function ────────────────────────────────────────────────────────
generate_image() {
  local name="$1"
  local subfolder="$2"
  local aspect="$3"
  local tier="$4"
  local prompt="$5"

  local outdir="$ILLUST_DIR/$subfolder"
  local outfile="$outdir/$name.png"

  # Skip if exists (unless --force)
  if [[ -f "$outfile" && "$FORCE" != true ]]; then
    echo "  SKIP  $subfolder/$name.png (exists, use --force to overwrite)"
    return 0
  fi

  # Determine model
  local model="$DEFAULT_MODEL"
  if [[ "$tier" == "max" ]]; then
    model="black-forest-labs/flux.2-max"
  elif [[ "$tier" == "pro" ]]; then
    model="black-forest-labs/flux.2-pro"
  fi
  # --model flag overrides tier assignments
  if [[ "$DEFAULT_MODEL" != "black-forest-labs/flux.2-max" ]]; then
    model="$DEFAULT_MODEL"
  fi

  # Use custom prompt if provided (only for --only mode)
  if [[ -n "$CUSTOM_PROMPT" ]]; then
    prompt="$CUSTOM_PROMPT"
  fi

  mkdir -p "$outdir"

  echo "  GEN   $subfolder/$name.png  (model: ${model##*/}, aspect: $aspect)"

  # Build JSON payload
  local payload
  payload=$(jq -n \
    --arg model "$model" \
    --arg prompt "$prompt" \
    --arg aspect "$aspect" \
    '{
      model: $model,
      modalities: ["image"],
      messages: [{role: "user", content: $prompt}],
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

  # Extract base64 image data
  local data_url
  data_url=$(echo "$body" | jq -r '.choices[0].message.content[0].image_url.url // empty' 2>/dev/null)

  # Fallback: try alternate response shapes
  if [[ -z "$data_url" ]]; then
    data_url=$(echo "$body" | jq -r '.choices[0].message.images[0].image_url.url // empty' 2>/dev/null)
  fi
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

  # Verify file is a valid image (PNG starts with specific bytes)
  if [[ -f "$outfile" ]] && file "$outfile" | grep -qiE 'image|PNG|JPEG|bitmap'; then
    local size
    size=$(du -h "$outfile" | cut -f1)
    echo "  OK    $subfolder/$name.png ($size)"
  else
    echo "  ERROR $name — Decoded file is not a valid image"
    rm -f "$outfile"
    return 1
  fi
}

# ── Main ─────────────────────────────────────────────────────────────────────
echo ""
echo "HSA Days — Illustration Generator"
echo "Model: ${DEFAULT_MODEL##*/}  |  Force: $FORCE"
echo "──────────────────────────────────────"
echo ""

errors=0
generated=0
skipped=0

for entry in "${ILLUSTRATIONS[@]}"; do
  IFS='|' read -r name subfolder aspect tier prompt <<< "$entry"

  # If --only is set, skip non-matching
  if [[ -n "$ONLY" && "$name" != "$ONLY" ]]; then
    continue
  fi

  if generate_image "$name" "$subfolder" "$aspect" "$tier" "$prompt"; then
    if [[ -f "$ILLUST_DIR/$subfolder/$name.png" ]]; then
      # Check if it was generated this run or skipped
      if [[ "$FORCE" == true ]] || [[ ! -f "$ILLUST_DIR/$subfolder/$name.png" ]]; then
        ((generated++))
      else
        ((skipped++))
      fi
    fi
  else
    ((errors++))
  fi
done

echo ""
echo "──────────────────────────────────────"
echo "Done. Errors: $errors"
echo ""

if [[ $errors -gt 0 ]]; then
  exit 1
fi
