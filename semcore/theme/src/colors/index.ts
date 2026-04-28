import { ColorScale } from './ColorScale.ts';

const colorNames = ['gray', 'red', 'orange', 'yellow', 'salad', 'green', 'blue', 'violet', 'violet-dusty', 'pink'] as const;
const lightnessNames = [50, 75, 100, 200, 300, 400, 450, 500, 600, 700, 800] as const;

export type Colors = typeof colorNames[number];
export type Lightness = typeof lightnessNames[number];

// =============================================================================
// Base color scales
export const baseColors: Record<Colors, ColorScale> = {
  'gray': new ColorScale(['oklch(0.94 0.002 180)', 'oklch(0.40 0.004 140)', 'oklch(0.22 0.01 140)'], 'p3'),
  'violet-dusty': new ColorScale(
    ['oklch(0.94 0.003 180)', 'oklch(0.40 0.008 140)', 'oklch(0.22 0.02 140)'],
    'p3', // Need to convert mint name to violet-dusty for the final CSS
  ),
  'red': new ColorScale(
    [
      'oklch(0.98 0.02 5)',
      'oklch(0.90 0.07 13)',
      'oklch(0.82 0.13 20)',
      'oklch(0.74 0.19 22)',
      'oklch(0.66 0.23 24)',
      'oklch(0.50 0.20 28)',
      'oklch(0.22 0.09 28)',
    ],
    'p3',
  ),
  'orange': new ColorScale(
    [
      'oklch(0.99 0.02 88)',
      'oklch(0.88 0.13 68)',
      'oklch(0.74 0.19 53)',
      'oklch(0.66 0.20 48)',
      'oklch(0.55 0.18 44)',
      'oklch(0.45 0.15 42)',
      'oklch(0.22 0.07 42)',
    ],
    'p3',
  ),
  'yellow': new ColorScale(
    [
      'oklch(0.99 0.05 110)',
      'oklch(0.90 0.13 92)',
      'oklch(0.82 0.18 80)',
      'oklch(0.74 0.17 72)',
      'oklch(0.64 0.16 64)',
      'oklch(0.54 0.14 60)',
      'oklch(0.29 0.08 57)',
    ],
    'p3',
  ),
  'salad': new ColorScale(
    [
      'oklch(0.98 0.04 124)',
      'oklch(0.90 0.12 136)',
      'oklch(0.82 0.19 143)',
      'oklch(0.74 0.23 146)',
      'oklch(0.64 0.22 147)',
      'oklch(0.29 0.12 147)',
    ],
    'p3',
  ),
  'green': new ColorScale(
    [
      'oklch(0.99 0.03 182)',
      'oklch(0.90 0.11 175)',
      'oklch(0.82 0.15 170)',
      'oklch(0.74 0.17 170)',
      'oklch(0.63 0.16 170)',
      'oklch(0.52 0.14 170)',
    ],
    'p3',
  ),
  'blue': new ColorScale(['oklch(0.64 0.18 278)', 'oklch(0.54 0.2 278)', 'oklch(0.22 0.12 278)'], 'p3'),
  'violet': new ColorScale(['oklch(0.74 0.17 303)', 'oklch(0.55 0.27 296)'], 'p3'),
  'pink': new ColorScale(['oklch(0.90 0.10 330)', 'oklch(0.82 0.18 330)', 'oklch(0.66 0.27 330)'], 'p3'),
};

// =============================================================================
// Semantic color scales
export const semanticColors = {
  neutral: baseColors.gray,
  success: baseColors.green,
  error: baseColors.red,
  warning: baseColors.orange,
  info: baseColors.blue,
  focus: baseColors.blue,
  advertising: baseColors.violet,
  highlight: baseColors.violet,
  brand: baseColors.violet,
};

const lightnessMap = new Map<Lightness, number>();

lightnessMap.set(50, 0.97);
lightnessMap.set(75, 0.93);
lightnessMap.set(100, 0.9);
lightnessMap.set(200, 0.82);
lightnessMap.set(300, 0.74);
lightnessMap.set(400, 0.64);
lightnessMap.set(450, 0.58);
lightnessMap.set(500, 0.53);
lightnessMap.set(600, 0.4); // Maybe 0.46?
lightnessMap.set(700, 0.32); // Maybe 0.33?
lightnessMap.set(800, 0.23);

const initLightnessMap: Record<Lightness, { value: string }> = {
  50: { value: '', description: 'Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision.' },
  75: { value: '' },
  100: { value: '', description: 'Use only for light strokes and active backgrounds. Suitable for minimally visible elements.' },
  200: { value: '' },
  300: { value: '' },
  400: { value: '' },
  450: { value: '' },
  500: { value: '' },
  600: { value: '' },
  700: { value: '' },
  800: { value: '' },
};

// @ts-ignore
const initColors: Record<Colors, Record<Lightness, { value: string }>> = {};

export const colors = colorNames.reduce<Record<Colors, Record<Lightness, { value: string }>>>((acc, colorName) => {
  if (!acc[colorName]) {
    acc[colorName] = { ...initLightnessMap };
  }

  for (const [key, lightness] of lightnessMap.entries()) {
    acc[colorName][key].value = baseColors[colorName].at(lightness);
  }

  return acc;
}, initColors);

/** Primary bg */
export const L_BG_PRIMARY = 1;
export const L_BG_PRIMARY_HOVER = 0.96;
export const L_BG_PRIMARY_ACTIVE = 0.96;

/** Secondary bg */
export const L_BG_SECONDARY = 0.98;
export const L_BG_SECONDARY_HOVER = 0.96;
export const L_BG_SECONDARY_ACTIVE = 0.93;

/** Selected bg */
export const L_BG_SELECTED = 0.96;
export const L_BG_SELECTED_HOVER = 0.9;

/** Background levels */
export const L_BG_LIGHT = 0.96;
export const L_BG_MEDIUM = 0.88; // Midlight?
export const L_BG_STRONG = 0.64; // Heavy? Dark?

export const L_BG_SKELETON = 0.9;

/** Button bg         | ⚠️ APCA 60+ under white */
export const L_BG_BUTTON = 0.64;
export const L_BG_BUTTON_HOVER = 0.6;
export const L_BG_BUTTON_ACTIVE = 0.58;

/** Button strong bg         | ⚠️ APCA 60+ under white */
export const L_BG_BUTTON_STRONG = 0.23;
export const L_BG_BUTTON_STRONG_HOVER = 0.32;
export const L_BG_BUTTON_STRONG_ACTIVE = 0;

/** Text primary      | ⚠️ APCA 90+ on secondary bg */
export const L_TEXT_PRIMARY = 0.23;
/** Text secondary    | ⚠️ APCA 60+ on secondary bg ?? */
export const L_TEXT_SECONDARY = 0.53;
export const L_TEXT_SECONDARY_HOVER = 0.4;
/** Text placeholder  | ⚠️ APCA 30+ on secondary bg */
export const L_TEXT_PLACEHOLDER = 0.64;

// ICONS. Need lighter levels than text, cause they are too thick now.
/** Icon primary    | ⚠️ APCA 45+ on secondary bg */
export const L_ICON_NON_INTERACTIVE = 0.6;
export const L_ICON_PRIMARY = 0.58;
export const L_ICON_PRIMARY_HOVER = 0.53; // Delete with minor
/** Icon secondary    | ⚠️ APCA 30+ on secondary bg */
export const L_ICON_SECONDARY = 0.78;
export const L_ICON_SECONDARY_HOVER = 0.74; // Delete with minor

/** Border primary    | ⚠️ APCA 15+ on secondary bg */
export const L_BORDER_PRIMARY = 0.88; // inputs, buttons, table header, tab-line, divider
/** Border secondary */
export const L_BORDER_SECONDARY = 0.95; // divider, cell borders, card header
/** Border active */
export const L_BORDER_ACTIVE = 0.74; // notice borders, focused inputs
/** Border focus      | ⚠️ APCA 30 on secondary bg */
export const L_BORDER_FOCUS = 0.7;

// =============================================================================
// Invert levels

/** Primary bg */
export const L_INV_BG_PRIMARY = 0.23;
export const L_INV_BG_PRIMARY_HOVER = 0.36;
export const L_INV_BG_PRIMARY_ACTIVE = 0.4;

/** Secondary bg */
export const L_INV_BG_SECONDARY = 0.23;
export const L_INV_BG_SECONDARY_HOVER = 0.26;
export const L_INV_BG_SECONDARY_ACTIVE = 0.3;

/** Skeleton bg */
export const L_INV_BG_SKELETON = 0.3;

/** Button bg         | ⚠️ APCA 60+ under white */
export const L_INV_BG_BUTTON = 1;
export const L_INV_BG_BUTTON_HOVER = 0.96;
export const L_INV_BG_BUTTON_ACTIVE = 0.94;

/** Background levels */
export const L_INV_BG_LIGHT = 0.45;
export const L_INV_BG_MEDIUM = 0.56;

/** Text primary      | ⚠️ APCA 90+ on secondary bg */
export const L_INV_TEXT_PRIMARY = 1;
/** Text secondary    | ⚠️ APCA 60+ on secondary bg ?? */
export const L_INV_TEXT_SECONDARY = 0.75;
export const L_INV_TEXT_SECONDARY_HOVER = 0.85;

/** Icon primary    | ⚠️ APCA 60+ on secondary bg */
export const L_INV_ICON_PRIMARY = 0.7;
export const L_INV_ICON_PRIMARY_HOVER = 0.65;

/** Border primary    | ⚠️ APCA 15+ on secondary bg */
export const L_INV_BORDER_PRIMARY = 0.6; // inputs, buttons, table header
/** Border secondary */
export const L_INV_BORDER_SECONDARY = 0.7;
/** Border active */
export const L_INV_BORDER_ACTIVE = 0.7;
/** Border focus      | ⚠️ APCA 30 on secondary bg */
export const L_INV_BORDER_FOCUS = 0.75;
