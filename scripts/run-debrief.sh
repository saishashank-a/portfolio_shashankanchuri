#!/bin/bash
# Morning Debrief research runner — single-repo edition for GitHub Actions
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DATE=$(date +%Y-%m-%d)
LOG_DIR="$REPO_ROOT/logs"
LOG="$LOG_DIR/${DATE}.log"
OUTPUT_DIR="$REPO_ROOT/output"

mkdir -p "$OUTPUT_DIR" "$LOG_DIR"

HAIKU="claude-haiku-4-5-20251001"
SONNET="claude-sonnet-4-6"
CLAUDE_FLAGS="--dangerously-skip-permissions --output-format text"

log() {
  echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"
}

log "════════════════════════════════════════════════════"
log "Morning Debrief run: $DATE"
log "════════════════════════════════════════════════════"

rm -f "$OUTPUT_DIR"/*.md "$OUTPUT_DIR"/debrief.html
log "Cleared previous outputs"

run_agent() {
  local domain=$1
  local model=$2
  local start
  start=$(date +%s)
  log "  → [$domain] starting with $model"
  if claude -p "$(cat "$SCRIPT_DIR/agents/${domain}.md")" \
      --model "$model" $CLAUDE_FLAGS \
      > "$OUTPUT_DIR/${domain}.md" \
      2>> "$LOG_DIR/${domain}-${DATE}.err"; then
    local elapsed bytes
    elapsed=$(($(date +%s) - start))
    bytes=$(wc -c < "$OUTPUT_DIR/${domain}.md" | tr -d ' ')
    if [ "$bytes" -lt 100 ]; then
      log "  ✗ [$domain] too short ($bytes bytes) — treating as failure"
      rm -f "$OUTPUT_DIR/${domain}.md"
    else
      log "  ✓ [$domain] done in ${elapsed}s ($bytes bytes)"
    fi
  else
    log "  ✗ [$domain] FAILED — stderr:"
    cat "$LOG_DIR/${domain}-${DATE}.err" | tee -a "$LOG" || true
    rm -f "$OUTPUT_DIR/${domain}.md"
  fi
}

log "Checking Claude auth..."
claude --version 2>&1 | tee -a "$LOG" || true

log "Launching 8 research agents in parallel..."
run_agent "geopolitics" "$HAIKU"  &
run_agent "ai"          "$SONNET" &
run_agent "india"       "$HAIKU"  &
run_agent "markets"     "$HAIKU"  &
run_agent "stocks"      "$SONNET" &
run_agent "tech"        "$HAIKU"  &
run_agent "health"      "$HAIKU"  &
run_agent "culture"     "$HAIKU"  &
wait
log "All research agents complete"

SUCCESS_COUNT=$(ls "$OUTPUT_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
log "Research complete: $SUCCESS_COUNT/8 domains successful"

if [ "$SUCCESS_COUNT" -lt 3 ]; then
  log "FATAL: fewer than 3 domains succeeded. Aborting."
  exit 1
fi

log "Running HTML assembler..."
if (cd "$REPO_ROOT" && claude -p "$(cat "$SCRIPT_DIR/agents/assembler.md")" \
    --model "$SONNET" $CLAUDE_FLAGS \
    >> "$LOG" 2>&1); then
  log "Assembler exited cleanly"
else
  log "FATAL: assembler failed"
  exit 1
fi

if [ ! -f "$OUTPUT_DIR/debrief.html" ]; then
  log "FATAL: assembler did not produce debrief.html"
  exit 1
fi

HTML_SIZE=$(wc -c < "$OUTPUT_DIR/debrief.html" | tr -d ' ')
log "debrief.html ready ($HTML_SIZE bytes)"
log "════════════════════════════════════════════════════"
