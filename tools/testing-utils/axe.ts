import { AxeCore, configureAxe } from 'vitest-axe';

export const axe: (
  html: Element | string,
  additionalOptions?: AxeCore.RunOptions,
) => Promise<AxeCore.AxeResults> = configureAxe({
  globalOptions: {
    rules: [{ id: 'tabindex', enabled: false }],
  },
});
