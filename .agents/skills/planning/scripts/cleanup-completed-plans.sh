#!/usr/bin/env bash

# cleanup-completed-plans.sh
# Removes completed plan files from .agents/plans/

set -euo pipefail

# Determine script and plans directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../../.." && pwd)"
PLANS_DIR="${REPO_ROOT}/.agents/plans"

DRY_RUN=false
CLEAN_ALL=false

print_usage() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Clean up completed plan files in .agents/plans/

Options:
  -d, --dry-run    Show plans that would be deleted without deleting them
  -a, --all        Delete all plan files regardless of completion status
  -h, --help       Display this help message
EOF
}

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    -d|--dry-run)
      DRY_RUN=true
      shift
      ;;
    -a|--all)
      CLEAN_ALL=true
      shift
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      print_usage >&2
      exit 1
      ;;
  esac
done

if [[ ! -d "$PLANS_DIR" ]]; then
  echo "Plans directory not found at: $PLANS_DIR" >&2
  exit 1
fi

echo "Scanning plans in: ${PLANS_DIR}"

deleted_count=0
kept_count=0

# Iterate over all .md files in the plans directory
shopt -s nullglob
plan_files=("${PLANS_DIR}"/*.md)
shopt -u nullglob

if [[ ${#plan_files[@]} -eq 0 ]]; then
  echo "No plan files found in ${PLANS_DIR}."
  exit 0
fi

for file in "${plan_files[@]}"; do
  filename="$(basename "$file")"

  # Skip documentation files
  if [[ "$filename" =~ ^(README|readme)\.md$ ]]; then
    continue
  fi

  is_completed=false

  if [[ "$CLEAN_ALL" == true ]]; then
    is_completed=true
  else
    # Check if Status line indicates completion
    if grep -Ei '^[[:space:]]*[\*-]?[[:space:]]*\*\*Status:\*\*[[:space:]]*(Completed|Done|Finished)' "$file" > /dev/null 2>&1; then
      is_completed=true
    fi

    # Check if all checkboxes are checked (at least one [x] and zero [ ])
    has_checked=$(awk '/^[[:space:]]*[\*-][[:space:]]*\[[xX]\]/ { count++ } END { print count+0 }' "$file")
    has_unchecked=$(awk '/^[[:space:]]*[\*-][[:space:]]*\[[[:space:]]\]/ { count++ } END { print count+0 }' "$file")

    if [[ "$has_checked" -gt 0 && "$has_unchecked" -eq 0 ]]; then
      is_completed=true
    fi
  fi

  if [[ "$is_completed" == true ]]; then
    if [[ "$DRY_RUN" == true ]]; then
      echo "  [DRY-RUN] Would delete completed plan: $filename"
    else
      rm -f "$file"
      echo "  ✓ Deleted completed plan: $filename"
    fi
    deleted_count=$((deleted_count + 1))
  else
    echo "  • Kept active plan: $filename"
    kept_count=$((kept_count + 1))
  fi
done

echo ""
if [[ "$DRY_RUN" == true ]]; then
  echo "Dry run complete. ${deleted_count} plan(s) would be deleted, ${kept_count} active plan(s) retained."
else
  echo "Cleanup complete. ${deleted_count} plan(s) deleted, ${kept_count} active plan(s) retained."
fi
