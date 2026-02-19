# Safety Policy & Audit Logs

The Finance Data Governance OS installer (`fgos-kit`) is designed with a **Safety First** philosophy. It is built to be used in enterprise environments where data integrity and auditability are critical.

## Core Safety Principles

1.  **Non-Destructive by Default**: The installer will never overwrite existing files in `.agent/` without your explicit permission (`--overwrite` flag).
2.  **Incremental Updates**: If `.agent/` exists, the installer enters **Merge Mode**. It adds missing files (new agents/skills) but **skips** any file that already exists to preserve your customizations.
3.  **Consent-First**: Unless running in CI mode (`--yes`), the installer will always ask for confirmation before making changes.
3.  **Audit Trails**: Every execution generates a detailed log file (Markdown and JSON) documenting exactly what was done.
4.  **Automatic Backups**: Before overwriting any content, a timestamped backup of the previous version is created automatically.

## Audit Logs

Audit logs are stored in `.agent/_audit/`.

-   **Markdown Log (`install-log-ID.md`)**: Human-readable report of the plan, execution steps, and any errors.
-   **JSON Log (`install-log-ID.json`)**: Machine-readable record for integration with centralized logging systems.

## Usage Modes

### Safe Mode (Default / Incremental)
```bash
npx @fabioforest/fgos-kit init
```
-   Checks if `.agent/` exists.
-   **If not exists**: Creates full structure.
-   **If exists**: Scans for missing files and adds them (Smart Merge). **Existing files are preserved.**

### Simulation Mode (Dry Run)
```bash
npx @fabioforest/fgos-kit init --dry-run
```
-   Shows exactly what would happen (file downloads, extractions, copies).
-   **Does not touch the disk.**

### Overwrite Mode (with Backup)
```bash
npx @fabioforest/fgos-kit init --overwrite
```
-   Detects existing `.agent/`.
-   Backs it up to `.agent.bak-YYYYMMDD-HHMMSS`.
-   Replaces content with the new version.
-   Logs the backup location in the audit trail.

### CI/CD Mode (Non-interactive)
```bash
npx @fabioforest/fgos-kit init --yes --overwrite
```
-   Skips interactive prompts.
-   Useful for automated pipelines.
