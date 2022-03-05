# `@semcore/ui`

Package that reexports all components from a single point

CLI commands should be run in repo root dir.

- Run `yarn build`
- Add new components to `./semcore/ui/components.json`
- `yarn workspace @semcore/ui generate`
- `yarn update-release-changelog`
- Check out CHANGELOG.md and fix if needed
- Run `yarn pub --package ui --no-check-changelog`
