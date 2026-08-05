import type { NSButton } from '@semcore/button';

type Use = NonNullable<NSButton.Props['use']>;

// Allowed `theme` per `use`. Mirrors SButton[theme='<use>-<theme>'] in
// semcore/button/src/component/Button/button.shadow.css. First entry = default.
export const THEMES: Record<Use, NSButton.Props['theme'][]> = {
  primary: ['info', 'success', 'brand', 'danger', 'invert'],
  secondary: ['muted', 'invert', 'info'],
  tertiary: ['muted', 'invert', 'info'],
};

export const themeFor = (args: any): NSButton.Props['theme'] => {
  const use: Use = args.use ?? 'primary';
  const picked = args[`theme_${use}`];
  return THEMES[use].includes(picked) ? picked : THEMES[use][0];
};

export const themeArg = (use: Use) => ({
  name: `theme (${use})`,
  control: { type: 'select' as const },
  options: THEMES[use],
  if: { arg: 'use', eq: use },
});
