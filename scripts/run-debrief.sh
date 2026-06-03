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
CLAUDE_FLAGS="--dangerously-skip-permissions --output-format text"
AGENT_TIMEOUT=360  # per-agent cap (s); 124 = killed

log() {
  echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"
}

log "════════════════════════════════════════════════════"
log "Morning Debrief run: $DATE"
log "════════════════════════════════════════════════════"

rm -f "$OUTPUT_DIR"/*.md
log "Cleared previous outputs"

run_agent() {
  local domain=$1
  local model=$2
  local start status
  start=$(date +%s)
  log "  → [$domain] starting with $model"
  timeout "$AGENT_TIMEOUT" claude -p "$(cat "$SCRIPT_DIR/agents/${domain}.md")" \
    --model "$model" $CLAUDE_FLAGS \
    > "$OUTPUT_DIR/${domain}.md" \
    2>> "$LOG_DIR/${domain}-${DATE}.err"
  status=$?
  if [ "$status" -eq 0 ]; then
    local elapsed bytes
    elapsed=$(($(date +%s) - start))
    bytes=$(wc -c < "$OUTPUT_DIR/${domain}.md" | tr -d ' ')
    if [ "$bytes" -lt 100 ]; then
      log "  ✗ [$domain] too short ($bytes bytes) — treating as failure"
      rm -f "$OUTPUT_DIR/${domain}.md"
    else
      log "  ✓ [$domain] done in ${elapsed}s ($bytes bytes)"
    fi
  elif [ "$status" -eq 124 ]; then
    log "  ✗ [$domain] TIMED OUT after ${AGENT_TIMEOUT}s — treating as failure"
    rm -f "$OUTPUT_DIR/${domain}.md"
  else
    log "  ✗ [$domain] FAILED (exit $status) — stderr:"
    cat "$LOG_DIR/${domain}-${DATE}.err" 2>/dev/null | tee -a "$LOG" || true
    rm -f "$OUTPUT_DIR/${domain}.md"
  fi
}

log "Checking Claude auth..."
claude --version 2>&1 | tee -a "$LOG" || true

log "Launching 9 research agents in parallel..."
run_agent "geopolitics"   "$HAIKU"  &
run_agent "ai"            "$HAIKU"  &
run_agent "india"         "$HAIKU"  &
run_agent "markets"       "$HAIKU"  &
run_agent "stocks_india"  "$HAIKU"  &
run_agent "stocks_world"  "$HAIKU"  &
run_agent "tech"          "$HAIKU"  &
run_agent "health"        "$HAIKU"  &
run_agent "culture"       "$HAIKU"  &
wait
log "All research agents complete"

SUCCESS_COUNT=$(ls "$OUTPUT_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
log "Research complete: $SUCCESS_COUNT/9 domains successful"

if [ "$SUCCESS_COUNT" -lt 3 ]; then
  log "FATAL: fewer than 3 domains succeeded. Aborting."
  exit 1
fi

# NOTE: no HTML assembler step. publish-brief.mjs parses output/*.md directly
# into src/data/debrief.json (the site renders that). The old assembler wrote an
# unused output/debrief.html and its failure falsely aborted the whole run.
log "Research done — handing off to publish-brief.mjs"
log "════════════════════════════════════════════════════"
