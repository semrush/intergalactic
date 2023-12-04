Package for migrate from `@semcore/ui` to the `intg`.

It has two scripts:
- `intg-check-imports`: to find all old imports in your project except manually installed and stay in package.json dependencies.
- `intg-patch-imports`: to replace all old imports to the new - `intg`.

By default, both commands will check files in your `src` folder, but you could set baseDir manually as and agr: `intg-check-imports src/check/only/here`