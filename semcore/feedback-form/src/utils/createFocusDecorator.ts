import createFocusDecoratorImport from 'final-form-focus';

/**
 * `final-form-focus` ships only CJS for Node (no `exports` field), so in native ESM
 * environments (e.g. Astro/Vite SSR) the default import resolves to the whole
 * `module.exports` object (`{ default, getFormInputs }`) instead of the function.
 */
export const createFocusDecorator: typeof createFocusDecoratorImport =
  (createFocusDecoratorImport as unknown as { default?: typeof createFocusDecoratorImport })
    .default ?? createFocusDecoratorImport;
