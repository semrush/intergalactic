# `@semcore/ui`

Package that reexports all components from a single point

CLI commands should be run in repo root dir.

- Run `pnpm build`
- Add new components to `./semcore/ui/components.json`
- `cd semcore/ui`
- `pnpm install`
- `pnpm generate`
- `cd ../..`
- `pnpm update-release-changelog`
- Check out CHANGELOG.md and fix if needed
- Run `pnpm pub --package ui --no-check-changelog`
