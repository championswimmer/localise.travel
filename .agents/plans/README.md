# Agent Plans Directory

This directory stores active planning documents and checklists for large refactors, major features, and architectural changes in `localise.travel`.

## Guidelines

1. **When to create a plan:**
   - Any complex refactor across multiple components/stores/data files.
   - Adding major features (new languages, audio generation/TTS, new routes/views, search indexing, offline sync).
   - Upgrading core dependencies with breaking changes.

2. **File Naming Convention:**
   - Format: `YYYY-MM-DD-<short-topic-name>.md`
   - Example: `2026-08-31-add-audio-pronunciation-player.md`

3. **Checklist Tracking:**
   - Break tasks down into clear markdown checklist items:
     - `- [ ]` Pending item
     - `- [x]` Completed item
   - Update checklist items as each step is verified.

4. **Lifecycle & Cleanup:**
   - Completed plans should be removed when creating new plans.
   - Use the cleanup script provided in the planning skill:
     ```bash
     bash .agents/skills/planning/scripts/cleanup-completed-plans.sh
     ```
