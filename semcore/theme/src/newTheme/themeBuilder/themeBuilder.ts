// The function creates a CSS theme
// supports {reference-name} syntax for colors
/*
Example:
const css = buildTheme({
  "bg-primary-neutral": gray.at(0.96),
  "bg-secondary-neutral": "black",
  "text-primary": "{bg-primary-neutral}",
}, "intergalactic")
*/

/** Returns CSS property lines (without `:root {}` wrapper). */
export function buildCssLines(theme: { [key: string]: string | number }, prefix?: string): string {
  const varName = (key: string) => (prefix ? `--${prefix}-${key}` : `--${key}`);

  const resolveValue = (value: string | number) =>
    String(value).replace(/\{([^}]+)\}/g, (_, ref) => `var(${varName(ref)})`);

  return Object.entries(theme)
    .map(([key, value]) => `  ${varName(key)}: ${resolveValue(value)};`)
    .join('\n');
}

/**
 * For components like primary ButtonFH that reference the palette as
 * `var(--intergalactic-violet-500)`, while the base theme steps are defined as
 * `--violet-500`. Aliases bind both names without duplicating values.
 */
export function buildIntergalacticPaletteAliasLines(baseColors: Record<string, string | number>): string {
  return Object.keys(baseColors)
    .map((key) => `  --intergalactic-${key}: var(--${key});`)
    .join('\n');
}

export function buildTheme(theme: { [key: string]: string }, prefix?: string): string {
  return `:root {\n${buildCssLines(theme, prefix)}\n}`;
}

export type Theme = {
  baseFonts: Record<string, string>; // need them separate cause they don't have prefix
  baseColors: Record<string, string>; // need them separate cause they don't have prefix

  // All tokens below will be resolved using the prefix
  colors: Record<string, string>;
  sizes: Record<string, string>;
  spacing: Record<string, string>;
  fonts: Record<string, string>;
  fontSizes: Record<string, string>;
  fontWeights: Record<string, string>;
  letterSpacings: Record<string, string>;
  lineHeights: Record<string, string>;
  radii: Record<string, string>;
  borders: Record<string, string>;
  shadows: Record<string, string>;
  opacity: Record<string, string>;
  durations: Record<string, string>;
  zIndexes: Record<string, string>;
};
