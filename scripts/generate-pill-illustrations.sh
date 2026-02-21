#!/usr/bin/env bash
set -euo pipefail

# ── HSA Days Pill Illustration Generator ────────────────────────────────────
# Generates 111 personalized word pill illustrations via OpenRouter FLUX API,
# removes backgrounds using rembg, and converts to WebP.
#
# Usage:
#   ./scripts/generate-pill-illustrations.sh                     # Generate all missing
#   ./scripts/generate-pill-illustrations.sh --force             # Regenerate everything
#   ./scripts/generate-pill-illustrations.sh --only belly_rubs   # Single pill
#   ./scripts/generate-pill-illustrations.sh --skip-rembg        # Skip background removal
#
# Requires: OPENROUTER_API_KEY env var, jq, rembg, cwebp

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PILLS_DIR="$PROJECT_ROOT/public/illustrations/pills"
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
      echo "Usage: $0 [--model flux.2-pro] [--force] [--only SLUG] [--skip-rembg]"
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

command -v cwebp >/dev/null 2>&1 || { echo "ERROR: cwebp required (brew install webp)"; exit 1; }

# ── Style prefixes by color ─────────────────────────────────────────────────
# Colors cycle through sage/gold/terracotta based on category
SAGE_PREFIX="Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks, centered subject, simple composition —"
GOLD_PREFIX="Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, warm golden ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks, centered subject, simple composition —"
TERRA_PREFIX="Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted terracotta ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks, centered subject, simple composition —"

# ── Pill manifest ────────────────────────────────────────────────────────────
# Format: SLUG|COLOR|PROMPT_SUFFIX
# COLOR: sage, gold, terra

PILLS=(
  # ── Activities & Adventures (sage) ──────────────────────────────────────────
  'long_walks|sage|a happy dog and person walking together on a trail, seen from behind, autumn light, peaceful'
  'hiking|sage|a dog bounding ahead on a hiking trail through trees, adventurous and joyful'
  'beach_days|sage|a dog splashing at the edge of the ocean waves, sandy beach, carefree'
  'swimming|sage|a dog paddling happily in calm water, ripples around them, joyful swim'
  'car_rides|sage|a dog with head out a car window, ears blowing in the wind, pure bliss'
  'camping|sage|a dog sitting by a small campfire, tent in background, cozy outdoor evening'
  'running|sage|a person and dog running together, dynamic movement, morning energy'
  'bike_rides|sage|a dog trotting alongside a bicycle wheel, happy pace, sunny day'
  'boating|sage|a dog standing proudly at the bow of a small boat, wind in fur'
  'snow_play|sage|a dog leaping through fresh snow, powder flying, winter wonderland'
  'exploring|sage|a curious dog sniffing along a new path, tail up, discovering'
  'sunset_walks|sage|a dog and person silhouetted walking into a warm sunset, peaceful end of day'

  # ── Play & Toys (gold) ─────────────────────────────────────────────────────
  'tennis_ball|gold|a dog fixated on a fuzzy tennis ball, intense focus, playful anticipation'
  'frisbee|gold|a dog leaping to catch a frisbee mid-air, athletic and joyful'
  'tug_of_war|gold|a dog gripping a rope toy, playful tug stance, determined and happy'
  'squeaky_toys|gold|a dog proudly holding a squeaky toy in mouth, pleased expression'
  'rope_toys|gold|a knotted rope toy with a dog paw resting on it, playful still life'
  'sticks|gold|a dog carrying an oversized stick proudly, silly and endearing'
  'puzzle_toys|gold|a dog nosing at a puzzle toy, concentrated and clever'
  'chew_bones|gold|a dog contentedly gnawing on a bone, relaxed and happy'
  'plush_friends|gold|a dog snuggled up with a worn plush toy, sweet and tender'
  'balls|gold|a dog surrounded by several balls of different sizes, paradise'
  'hide_and_seek|gold|a dog peeking from behind furniture, playful eyes, game time'

  # ── Comfort & Cuddles (terra) ───────────────────────────────────────────────
  'snuggles|terra|a dog curled up against a person on a couch, warm and cozy, intimate'
  'belly_rubs|terra|a dog lying on its back with paws up, blissful belly rub moment'
  'lap_dog|terra|a dog curled up contentedly in someones lap, small and snug'
  'spooning|terra|a person and dog spooning together in bed, peaceful sleep'
  'holding_paws|terra|a human hand gently holding a dog paw, tender connection'
  'forehead_kisses|terra|a person leaning down to kiss a dogs forehead, gentle love'
  'blanket_burrowing|terra|a dog nose peeking out from under a cozy blanket, hiding and snug'
  'chest_naps|terra|a dog sleeping on someones chest, peaceful breathing, trust'
  'back_scratches|terra|a hand scratching behind a dogs ears, pure contentment'
  'being_carried|terra|a small dog being carried in loving arms, safe and secure'
  'leaning_on_you|terra|a dog leaning its full weight against a persons leg, quiet devotion'

  # ── Daily Rituals (sage) ────────────────────────────────────────────────────
  'morning_stretches|sage|a dog doing a big stretch with front paws forward, morning routine'
  'breakfast_time|sage|a dog sitting eagerly by a food bowl, morning anticipation'
  'welcome_home|sage|a dog rushing to the door with wagging tail, pure excitement'
  'evening_walk|sage|a dog and person walking in soft evening light, end of day ritual'
  'bedtime_routine|sage|a dog circling on a bed before lying down, nesting ritual'
  'coffee_companion|sage|a dog sitting beside a coffee mug on the floor, morning company'
  'wfh_buddy|sage|a dog lying under a desk near someones feet, loyal office companion'
  'mail_time|sage|a dog perking up at the sound of the mailbox, alert and curious'
  'window_watching|sage|a dog gazing out a window, chin on the sill, watching the world'
  'doorbell_bark|sage|a dog mid-bark at the front door, alert and protective'
  'post_walk_nap|sage|a dog collapsed in a satisfied heap after a walk, spent and happy'

  # ── Food & Treats (gold) ────────────────────────────────────────────────────
  'treat_obsessed|gold|a dog sitting perfectly, eyes locked on a treat held above, intense focus'
  'peanut_butter|gold|a dog licking peanut butter from a spoon, eyes closed in bliss'
  'cheese|gold|a dog sniffing toward a piece of cheese, nose twitching, hopeful'
  'banana|gold|a dog gently taking a piece of banana from a hand, careful and eager'
  'ice_cream|gold|a dog licking an ice cream cone, summer treat, happy tongue'
  'puppuccino|gold|a dog with whipped cream on nose from a small cup, cafe treat'
  'birthday_cake|gold|a dog with a small birthday hat near a dog-friendly cake, celebration'
  'carrots|gold|a dog crunching on a whole carrot, healthy snacking, satisfied'
  'watermelon|gold|a dog eating a slice of watermelon, juicy summer moment'
  'begging|gold|a dog sitting at a dinner table edge, hopeful eyes looking up'
  'food_bowl_dance|gold|a dog doing a happy spin near a food bowl, mealtime excitement'

  # ── Personality Traits (terra) ──────────────────────────────────────────────
  'old_soul|terra|a dog with wise gentle eyes and grey muzzle, dignified and knowing'
  'goofball|terra|a dog with tongue out and silly expression, pure goofiness'
  'gentle_giant|terra|a large dog being very gentle with something small, careful and sweet'
  'firecracker|terra|a small energetic dog mid-bounce, sparky and vivacious'
  'stubborn_sweetie|terra|a dog sitting firmly and refusing to move, adorably defiant'
  'velcro_dog|terra|a dog pressed right against a persons side, inseparable'
  'independent|terra|a dog walking confidently alone, self-assured and free-spirited'
  'drama_royalty|terra|a dog with an exaggerated dramatic expression, diva moment'
  'protector|terra|a dog standing alert and watchful, guardian stance, noble'
  'social_butterfly|terra|a dog happily greeting everyone, tail wagging, friendly'
  'shy_sweetheart|terra|a dog peeking shyly from behind a persons legs, timid but sweet'

  # ── Favorite Places (sage) ──────────────────────────────────────────────────
  'the_couch|sage|a dog sprawled contentedly across a couch cushion, claiming territory'
  'your_bed|sage|a dog curled up in the center of a human bed, pillows around'
  'backyard|sage|a dog lying in grass in a backyard, dappled sunlight, relaxed'
  'under_table|sage|a dog curled up under a dining table, cozy cave underneath'
  'sunny_spots|sage|a dog lying in a warm patch of sunlight on the floor, basking'
  'kitchen_floor|sage|a dog sprawled on cool kitchen tiles, content and present'
  'dog_park|sage|a dog running freely in an open park space, unleashed joy'
  'the_car|sage|a dog settled in the back seat of a car, ready for adventure'
  'front_porch|sage|a dog resting on a front porch, watching the neighborhood'
  'fireplace|sage|a dog curled up by a glowing fireplace, warm and drowsy'
  'the_garden|sage|a dog sniffing flowers in a garden, curious and gentle'
  'their_bed|sage|a dog in their own cozy dog bed, perfectly nestled'

  # ── Social Life (gold) ──────────────────────────────────────────────────────
  'park_friends|gold|two dogs playing together at a park, joyful chase'
  'sibling_love|gold|two dogs lying side by side, sibling bond, peaceful together'
  'grandmas_fave|gold|a dog being spoiled by an elderly person, extra treats and love'
  'neighbor_friend|gold|a dog greeting someone over a fence, friendly neighborhood moment'
  'kids_bestie|gold|a dog and child playing together, gentle and watchful'
  'cat_friend|gold|a dog and cat sitting near each other peacefully, unlikely friends'
  'the_mailman|gold|a dog excitedly watching the mail carrier approach, daily ritual'
  'daycare|gold|several dogs playing together in a group, social and happy'
  'play_dates|gold|two dogs meeting nose to nose, friendly introduction'
  'the_greeter|gold|a dog at the front door welcoming a visitor, enthusiastic host'
  'strangers_fave|gold|a dog being petted by a stranger on the street, instant friends'

  # ── Seasonal Fun (terra) ────────────────────────────────────────────────────
  'fall_leaves|terra|a dog playing in a pile of autumn leaves, colors flying'
  'snow_zoomies|terra|a dog doing zoomies in fresh snow, wild and free'
  'puddle_jumping|terra|a dog splashing through a rain puddle, wet and happy'
  'spring_flowers|terra|a dog sitting among spring wildflowers, gentle and pretty'
  'sprinklers|terra|a dog running through lawn sprinklers, summer fun'
  'holiday_photos|terra|a dog wearing a festive bandana, holiday portrait, cute'
  'pumpkin_season|terra|a dog sitting next to a pumpkin, autumn scene'
  'christmas_morning|terra|a dog near wrapped presents, holiday morning excitement'
  'rain_dancing|terra|a dog standing happily in the rain, embracing the weather'
  'autumn_hikes|terra|a dog on a trail with fall foliage around, crisp air'
  'beach_summer|terra|a dog running on a beach, summer energy, waves behind'

  # ── Quirks & Habits (sage) ──────────────────────────────────────────────────
  'head_tilt|sage|a dog doing the classic head tilt, one ear up, curious expression'
  'zoomies|sage|a dog mid-zoomie with legs blurred by speed, silly and wild'
  'tail_chasing|sage|a dog spinning to chase its own tail, dizzy and silly'
  'side_eye|sage|a dog giving dramatic side eye, suspicious and funny'
  'sleeping_upside_down|sage|a dog sleeping on its back with paws in the air, ridiculous comfort'
  'bed_hogger|sage|a dog sprawled across an entire bed, taking up all the space'
  'toy_hoarder|sage|a dog surrounded by a pile of hoarded toys, possessive and proud'
  'army_crawl|sage|a dog doing an army crawl across the floor, sneaky and cute'
  'talking_back|sage|a dog with mouth open mid-bark, sassy conversation'
  'dream_running|sage|a dog twitching in sleep, legs moving, chasing dream rabbits'
  'butt_wiggles|sage|a dog doing a full body wiggle, butt wagging with no tail control'
)

# ── Generate function ────────────────────────────────────────────────────────
generate_pill() {
  local slug="$1"
  local color="$2"
  local prompt_suffix="$3"

  local raw_file="$PILLS_DIR/raw/$slug.png"
  local rembg_file="$PILLS_DIR/raw/$slug-nobg.png"
  local final_file="$PILLS_DIR/$slug.webp"

  # Skip if final exists (unless --force)
  if [[ -f "$final_file" && "$FORCE" != true ]]; then
    echo "  SKIP  $slug.webp (exists)"
    return 0
  fi

  # Pick style prefix based on color
  local prefix="$SAGE_PREFIX"
  case "$color" in
    gold)  prefix="$GOLD_PREFIX" ;;
    terra) prefix="$TERRA_PREFIX" ;;
  esac

  local prompt="$prefix $prompt_suffix"

  mkdir -p "$PILLS_DIR/raw" "$PILLS_DIR"

  echo "  GEN   $slug.webp"

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
    -H "X-Title: HSA Days Pills" \
    -d "$payload" \
    --max-time 120)

  local http_code
  http_code=$(echo "$response" | tail -1)
  local body
  body=$(echo "$response" | sed '$d')

  if [[ "$http_code" != "200" ]]; then
    echo "  ERROR $slug — HTTP $http_code"
    echo "$body" | jq -r '.error.message // .error // "Unknown error"' 2>/dev/null || echo "$body"
    return 1
  fi

  # Extract base64 image
  local data_url=""
  data_url=$(echo "$body" | jq -r '.choices[0].message.content[0].image_url.url // empty' 2>/dev/null)
  [[ -z "$data_url" ]] && data_url=$(echo "$body" | jq -r '.choices[0].message.images[0].image_url.url // empty' 2>/dev/null)
  [[ -z "$data_url" ]] && data_url=$(echo "$body" | jq -r '.choices[0].message.content // empty' 2>/dev/null)

  if [[ -z "$data_url" ]]; then
    echo "  ERROR $slug — Could not extract image"
    echo "$body" | jq '.' 2>/dev/null | head -10
    return 1
  fi

  local base64_data
  base64_data=$(echo "$data_url" | sed 's|^data:image/[^;]*;base64,||')
  echo "$base64_data" | base64 -d > "$raw_file" 2>/dev/null

  if ! file "$raw_file" | grep -qiE 'image|PNG|JPEG'; then
    echo "  ERROR $slug — Not a valid image"
    rm -f "$raw_file"
    return 1
  fi

  # Remove background
  local src_for_webp="$raw_file"
  if [[ "$SKIP_REMBG" != true ]]; then
    echo "  REMBG $slug (removing background...)"
    "$REMBG" i "$raw_file" "$rembg_file" 2>/dev/null
    if [[ -f "$rembg_file" ]]; then
      src_for_webp="$rembg_file"
    else
      echo "  WARN  $slug — rembg failed, using raw"
    fi
  fi

  # Convert to WebP
  cwebp -q 85 "$src_for_webp" -o "$final_file" 2>/dev/null
  if [[ -f "$final_file" ]]; then
    local size
    size=$(du -h "$final_file" | cut -f1)
    echo "  OK    $slug.webp ($size)"
  else
    echo "  ERROR $slug — cwebp conversion failed"
    return 1
  fi
}

# ── Main ─────────────────────────────────────────────────────────────────────
echo ""
echo "HSA Days — Pill Illustration Generator"
echo "Model: ${MODEL##*/}  |  Force: $FORCE  |  Rembg: $( [[ "$SKIP_REMBG" == true ]] && echo "skip" || echo "enabled")"
echo "──────────────────────────────────────"
echo ""

errors=0

for entry in "${PILLS[@]}"; do
  IFS='|' read -r slug color prompt_suffix <<< "$entry"

  if [[ -n "$ONLY" && "$slug" != "$ONLY" ]]; then
    continue
  fi

  if ! generate_pill "$slug" "$color" "$prompt_suffix"; then
    ((errors++))
  fi

  # Brief pause to avoid rate limits
  sleep 0.5
done

echo ""
echo "──────────────────────────────────────"
echo "Done. Errors: $errors"
echo "Output: $PILLS_DIR/"
echo ""

[[ $errors -gt 0 ]] && exit 1 || exit 0
