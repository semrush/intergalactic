import { ColorScale } from './themeBuilder/ColorScale';
import type { Theme } from './themeBuilder/themeBuilder';

// =============================================================================
// Base color scales

const gray = new ColorScale(['oklch(0.94 0.002 180)', 'oklch(0.40 0.004 140)', 'oklch(0.22 0.01 140)'], 'p3');
const mint = new ColorScale(
  ['oklch(0.94 0.003 180)', 'oklch(0.40 0.008 140)', 'oklch(0.22 0.02 140)'],
  'p3', // Need to convert mint name to violet-dusty for the final CSS
);
const red = new ColorScale(
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
);
const orange = new ColorScale(
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
);
const yellow = new ColorScale(
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
);
const salad = new ColorScale(
  [
    'oklch(0.98 0.04 124)',
    'oklch(0.90 0.12 136)',
    'oklch(0.82 0.19 143)',
    'oklch(0.74 0.23 146)',
    'oklch(0.64 0.22 147)',
    'oklch(0.29 0.12 147)',
  ],
  'p3',
);
const green = new ColorScale(
  [
    'oklch(0.99 0.03 182)',
    'oklch(0.90 0.11 175)',
    'oklch(0.82 0.15 170)',
    'oklch(0.74 0.17 170)',
    'oklch(0.63 0.16 170)',
    'oklch(0.52 0.14 170)',
  ],
  'p3',
);
const blue = new ColorScale(['oklch(0.64 0.18 278)', 'oklch(0.54 0.2 278)', 'oklch(0.22 0.12 278)'], 'p3');
// const blue = new ColorScale(
//   [
//     "oklch(0.74 0.14 264)",
//     "oklch(0.64 0.19 264)",
//     "oklch(0.54 0.23 264)",
//     "oklch(0.38 0.19 264)",
//     "oklch(0.22 0.12 264)",
//   ],
//   "p3",
// )
const violet = new ColorScale(['oklch(0.74 0.17 303)', 'oklch(0.55 0.27 296)'], 'p3');
const pink = new ColorScale(['oklch(0.90 0.10 330)', 'oklch(0.82 0.18 330)', 'oklch(0.66 0.27 330)'], 'p3');

// =============================================================================
// Semantic color scales

const neutral = gray;
const success = green;
const error = red;
const warning = orange;
const info = blue;
const focus = blue;
const advertising = violet;
const highlight = violet;
const brand = violet;

// =============================================================================
// Semantic lightness levels (to be grouped later)

/** Primary bg */
const L_BG_PRIMARY = 1;
const L_BG_PRIMARY_HOVER = 0.96;
const L_BG_PRIMARY_ACTIVE = 0.96;

/** Secondary bg */
const L_BG_SECONDARY = 0.98;
const L_BG_SECONDARY_HOVER = 0.96;
const L_BG_SECONDARY_ACTIVE = 0.93;

/** Selected bg */
const L_BG_SELECTED = 0.96;
const L_BG_SELECTED_HOVER = 0.9;

/** Background levels */
const L_BG_LIGHT = 0.96;
const L_BG_MEDIUM = 0.88; // Midlight?
const L_BG_STRONG = 0.64; // Heavy? Dark?

const L_BG_SKELETON = 0.9;

/** Button bg         | ⚠️ APCA 60+ under white */
const L_BG_BUTTON = 0.64;
const L_BG_BUTTON_HOVER = 0.6;
const L_BG_BUTTON_ACTIVE = 0.58;

/** Button strong bg         | ⚠️ APCA 60+ under white */
const L_BG_BUTTON_STRONG = 0.23;
const L_BG_BUTTON_STRONG_HOVER = 0.32;
const L_BG_BUTTON_STRONG_ACTIVE = 0;

/** Text primary      | ⚠️ APCA 90+ on secondary bg */
const L_TEXT_PRIMARY = 0.23;
/** Text secondary    | ⚠️ APCA 60+ on secondary bg ?? */
const L_TEXT_SECONDARY = 0.53;
const L_TEXT_SECONDARY_HOVER = 0.4;
/** Text placeholder  | ⚠️ APCA 30+ on secondary bg */
const L_TEXT_PLACEHOLDER = 0.64;

// ICONS. Need lighter levels than text, cause they are too thick now.
/** Icon primary    | ⚠️ APCA 45+ on secondary bg */
const L_ICON_NON_INTERACTIVE = 0.6;
const L_ICON_PRIMARY = 0.58;
const L_ICON_PRIMARY_HOVER = 0.53; // Delete with minor
/** Icon secondary    | ⚠️ APCA 30+ on secondary bg */
const L_ICON_SECONDARY = 0.78;
const L_ICON_SECONDARY_HOVER = 0.74; // Delete with minor

/** Border primary    | ⚠️ APCA 15+ on secondary bg */
const L_BORDER_PRIMARY = 0.88; // inputs, buttons, table header, tab-line, divider
/** Border secondary */
const L_BORDER_SECONDARY = 0.95; // divider, cell borders, card header
/** Border active */
const L_BORDER_ACTIVE = 0.74; // notice borders, focused inputs
/** Border focus      | ⚠️ APCA 30 on secondary bg */
const L_BORDER_FOCUS = 0.7;

// =============================================================================
// Invert levels

/** Primary bg */
const L_INV_BG_PRIMARY = 0.23;
const L_INV_BG_PRIMARY_HOVER = 0.36;
const L_INV_BG_PRIMARY_ACTIVE = 0.4;

/** Secondary bg */
const L_INV_BG_SECONDARY = 0.23;
const L_INV_BG_SECONDARY_HOVER = 0.26;
const L_INV_BG_SECONDARY_ACTIVE = 0.3;

/** Skeleton bg */
const L_INV_BG_SKELETON = 0.3;

/** Button bg         | ⚠️ APCA 60+ under white */
const L_INV_BG_BUTTON = 1;
const L_INV_BG_BUTTON_HOVER = 0.96;
const L_INV_BG_BUTTON_ACTIVE = 0.94;

/** Background levels */
const L_INV_BG_LIGHT = 0.45;
const L_INV_BG_MEDIUM = 0.56;

/** Text primary      | ⚠️ APCA 90+ on secondary bg */
const L_INV_TEXT_PRIMARY = 1;
/** Text secondary    | ⚠️ APCA 60+ on secondary bg ?? */
const L_INV_TEXT_SECONDARY = 0.75;
const L_INV_TEXT_SECONDARY_HOVER = 0.85;

/** Icon primary    | ⚠️ APCA 60+ on secondary bg */
const L_INV_ICON_PRIMARY = 0.7;
const L_INV_ICON_PRIMARY_HOVER = 0.65;

/** Border primary    | ⚠️ APCA 15+ on secondary bg */
const L_INV_BORDER_PRIMARY = 0.6; // inputs, buttons, table header
/** Border secondary */
const L_INV_BORDER_SECONDARY = 0.7;
/** Border active */
const L_INV_BORDER_ACTIVE = 0.7;
/** Border focus      | ⚠️ APCA 30 on secondary bg */
const L_INV_BORDER_FOCUS = 0.75;

// =============================================================================
// Lightness levels for base colors (to be rethought)

const L50 = 0.97;
const L75 = 0.93;
const L100 = 0.9;
const L200 = 0.82;
const L300 = 0.74;
const L400 = 0.64;
const L450 = 0.58;
const L500 = 0.53;
const L600 = 0.4; // Maybe 0.46?
const L700 = 0.32; // Maybe 0.33?
const L800 = 0.23;

// =============================================================================

export const theme: Theme = {
  baseFonts: { base: 'Inter' },

  baseColors: {
    'white': 'oklch(1 0 0)',

    'gray-50': gray.at(L50),
    'gray-75': gray.at(L75),
    'gray-100': gray.at(L100),
    'gray-200': gray.at(L200),
    'gray-300': gray.at(L300),
    'gray-400': gray.at(L400),
    'gray-450': gray.at(L450),
    'gray-500': gray.at(L500),
    'gray-600': gray.at(L600),
    'gray-700': gray.at(L700),
    'gray-800': gray.at(L800),

    'red-50': red.at(L50),
    'red-75': red.at(L75),
    'red-100': red.at(L100),
    'red-200': red.at(L200),
    'red-300': red.at(L300),
    'red-400': red.at(L400),
    'red-450': red.at(L450),
    'red-500': red.at(L500),
    'red-600': red.at(L600),
    'red-700': red.at(L700),
    'red-800': red.at(L800),

    'orange-50': orange.at(L50),
    'orange-75': orange.at(L75),
    'orange-100': orange.at(L100),
    'orange-200': orange.at(L200),
    'orange-300': orange.at(L300),
    'orange-400': orange.at(L400),
    'orange-450': orange.at(L450),
    'orange-500': orange.at(L500),
    'orange-600': orange.at(L600),
    'orange-700': orange.at(L700),
    'orange-800': orange.at(L800),

    'yellow-50': yellow.at(L50),
    'yellow-75': yellow.at(L75),
    'yellow-100': yellow.at(L100),
    'yellow-200': yellow.at(L200),
    'yellow-300': yellow.at(L300),
    'yellow-400': yellow.at(L400),
    'yellow-450': yellow.at(L450),
    'yellow-500': yellow.at(L500),
    'yellow-600': yellow.at(L600),
    'yellow-700': yellow.at(L700),
    'yellow-800': yellow.at(L800),

    'salad-50': salad.at(L50),
    'salad-75': salad.at(L75),
    'salad-100': salad.at(L100),
    'salad-200': salad.at(L200),
    'salad-300': salad.at(L300),
    'salad-400': salad.at(L400),
    'salad-450': salad.at(L450),
    'salad-500': salad.at(L500),
    'salad-600': salad.at(L600),
    'salad-700': salad.at(L700),
    'salad-800': salad.at(L800),

    'green-50': green.at(L50),
    'green-75': green.at(L75),
    'green-100': green.at(L100),
    'green-200': green.at(L200),
    'green-300': green.at(L300),
    'green-400': green.at(L400),
    'green-450': green.at(L450),
    'green-500': green.at(L500),
    'green-600': green.at(L600),
    'green-700': green.at(L700),
    'green-800': green.at(L800),

    'blue-50': blue.at(L50),
    'blue-75': blue.at(L75),
    'blue-100': blue.at(L100),
    'blue-200': blue.at(L200),
    'blue-300': blue.at(L300),
    'blue-400': blue.at(L400),
    'blue-450': blue.at(L450),
    'blue-500': blue.at(L500),
    'blue-600': blue.at(L600),
    'blue-700': blue.at(L700),
    'blue-800': blue.at(L800),

    'violet-50': violet.at(L50),
    'violet-75': violet.at(L75),
    'violet-100': violet.at(L100),
    'violet-200': violet.at(L200),
    'violet-300': violet.at(L300),
    'violet-400': violet.at(L400),
    'violet-450': violet.at(L450),
    'violet-500': violet.at(L500),
    'violet-600': violet.at(L600),
    'violet-700': violet.at(L700),
    'violet-800': violet.at(L800),

    'violet-dusty-50': mint.at(L50),
    'violet-dusty-75': mint.at(L75),
    'violet-dusty-100': mint.at(L100),
    'violet-dusty-200': mint.at(L200),
    'violet-dusty-300': mint.at(L300),
    'violet-dusty-400': mint.at(L400),
    'violet-dusty-450': mint.at(L450),
    'violet-dusty-500': mint.at(L500),
    'violet-dusty-600': mint.at(L600),
    'violet-dusty-700': mint.at(L700),
    'violet-dusty-800': mint.at(L800),

    'pink-50': pink.at(L50),
    'pink-75': pink.at(L75),
    'pink-100': pink.at(L100),
    'pink-200': pink.at(L200),
    'pink-300': pink.at(L300),
    'pink-400': pink.at(L400),
    'pink-450': pink.at(L450),
    'pink-500': pink.at(L500),
    'pink-600': pink.at(L600),
    'pink-700': pink.at(L700),
    'pink-800': pink.at(L800),
  },

  colors: {
    // Background
    'bg-primary-neutral': neutral.at(L_BG_PRIMARY),
    'bg-primary-neutral-hover': neutral.at(L_BG_PRIMARY_HOVER),
    'bg-primary-neutral-active': neutral.at(L_BG_PRIMARY_ACTIVE),
    'bg-primary-info': info.at(L_BG_STRONG),
    'bg-primary-success': success.at(L_BG_STRONG),
    'bg-primary-critical': error.at(L_BG_STRONG),
    'bg-primary-warning': warning.at(0.7),
    'bg-primary-highlight': highlight.at(L_BG_MEDIUM),
    'bg-primary-advertising': advertising.at(L_BG_STRONG), // 🔴 Not used
    'bg-primary-muted': neutral.at(L_BG_STRONG), // 🔴 Not used
    'bg-primary-invert': neutral.at(L_INV_BG_PRIMARY),
    'bg-primary-invert-hover': neutral.at(L_INV_BG_PRIMARY_HOVER),
    'bg-primary-invert-active': neutral.at(L_INV_BG_PRIMARY_ACTIVE),
    'bg-secondary-neutral': neutral.at(L_BG_SECONDARY),
    'bg-secondary-neutral-hover': neutral.at(L_BG_SECONDARY_HOVER),
    'bg-secondary-neutral-active': neutral.at(L_BG_SECONDARY_ACTIVE),
    'bg-secondary-info': info.at(L_BG_LIGHT),
    'bg-secondary-info-hover': info.at(L_BG_SECONDARY_HOVER),
    'bg-secondary-info-active': info.at(L_BG_SECONDARY_ACTIVE),
    'bg-secondary-success': success.at(L_BG_LIGHT),
    'bg-secondary-success-hover': success.at(L_BG_SECONDARY_HOVER),
    'bg-secondary-success-active': success.at(L_BG_SECONDARY_ACTIVE),
    'bg-secondary-critical': error.at(L_BG_LIGHT),
    'bg-secondary-critical-hover': error.at(L_BG_SECONDARY_HOVER),
    'bg-secondary-critical-active': error.at(L_BG_SECONDARY_ACTIVE),
    'bg-secondary-warning': warning.at(L_BG_SECONDARY),
    'bg-secondary-warning-hover': warning.at(L_BG_SECONDARY_HOVER),
    'bg-secondary-warning-active': warning.at(L_BG_SECONDARY_ACTIVE),
    'bg-secondary-highlight': highlight.at(L_BG_SECONDARY), // 🔴 Not used
    'bg-secondary-highlight-hover': highlight.at(L_BG_SECONDARY_HOVER), // 🔴 Not used
    'bg-secondary-highlight-active': highlight.at(L_BG_SECONDARY_ACTIVE), // 🔴 Not used
    'bg-secondary-advertising': advertising.at(L_BG_SECONDARY), // 🔴 Not used
    'bg-secondary-advertising-hover': advertising.at(L_BG_SECONDARY_HOVER),
    'bg-secondary-advertising-active': advertising.at(L_BG_SECONDARY_ACTIVE),
    'bg-highlight-results': highlight.at(L_BG_SECONDARY_ACTIVE), // Intended for highlighting text in search results
    'bg-highlight-focus': focus.at(L_BG_SECONDARY_ACTIVE), // Focused text in date picker and time picker inputs

    // ✅ Text
    'text-primary': neutral.opaqueAt(L_TEXT_PRIMARY),
    'text-secondary': neutral.opaqueAt(L_TEXT_SECONDARY),
    'text-placeholder': neutral.opaqueAt(L_TEXT_PLACEHOLDER),
    'text-success': success.at(L_TEXT_SECONDARY),
    'text-success-hover-active': success.at(L_TEXT_SECONDARY_HOVER),
    'text-critical': error.at(L_TEXT_SECONDARY),
    'text-critical-hover-active': error.at(L_TEXT_SECONDARY_HOVER),
    'text-primary-invert': neutral.at(L_INV_TEXT_PRIMARY),
    'text-secondary-invert': neutral.at(L_INV_TEXT_SECONDARY),
    'text-link': info.at(L_TEXT_SECONDARY),
    'text-link-hover-active': info.at(L_TEXT_SECONDARY_HOVER),
    'text-link-invert': info.at(L_INV_TEXT_SECONDARY),
    'text-link-invert-hover': info.at(L_INV_TEXT_SECONDARY_HOVER),
    'text-link-visited': violet.at(L_TEXT_SECONDARY),
    'text-hint': neutral.opaqueAt(L_TEXT_SECONDARY),
    'text-hint-hover-active': neutral.opaqueAt(L_TEXT_SECONDARY_HOVER),
    'text-hint-invert': neutral.at(L_INV_TEXT_SECONDARY),
    'text-hint-invert-hover-active': neutral.at(L_INV_TEXT_SECONDARY_HOVER),
    'text-large-secondary': '{text-secondary}',
    'text-large-info': '{text-link}',
    'text-large-info-hover-active': '{text-link-hover-active}',
    'text-large-success': '{text-success}',
    'text-large-success-hover-active': '{text-success-hover-active}',
    'text-large-critical': '{text-critical}',
    'text-large-critical-hover-active': '{text-critical-hover-active}',
    'text-advertising': advertising.at(L_TEXT_PRIMARY),

    // Border
    'border-primary': neutral.opaqueAt(L_BORDER_PRIMARY),
    'border-secondary': neutral.opaqueAt(L_BORDER_SECONDARY),
    'border-info': info.opaqueAt(L_BORDER_PRIMARY),
    'border-info-active': info.opaqueAt(L_BORDER_ACTIVE),
    'border-success': success.opaqueAt(L_BORDER_PRIMARY),
    'border-success-active': success.opaqueAt(L_BORDER_ACTIVE),
    'border-critical': error.opaqueAt(L_BORDER_PRIMARY),
    'border-critical-active': error.opaqueAt(L_BORDER_ACTIVE),
    'border-warning': warning.opaqueAt(L_BORDER_PRIMARY),
    'border-warning-active': warning.opaqueAt(L_BORDER_ACTIVE),
    'border-primary-invert': neutral.opaqueInvAt(L_INV_BORDER_PRIMARY),
    'border-secondary-invert': neutral.opaqueInvAt(L_INV_BORDER_SECONDARY),
    'border-tooltip-invert': neutral.opaqueInvAt(L_INV_BORDER_SECONDARY),
    'border-table-accent': neutral.opaqueAt(L_BORDER_PRIMARY),
    'border-date-picker-range-comparison': highlight.at(L_BORDER_ACTIVE),
    'border-critical-pattern':
      'repeating-linear-gradient(315deg, {border-critical-active} 0, {border-critical-active} 1px, transparent 0, transparent 50%)',

    // Control
    'control-switch-bg': neutral.at(L_BG_MEDIUM), // Used common BG instead of separate L for Switch
    'control-primary-info': neutral.at(L_BG_BUTTON_STRONG),
    'control-primary-info-hover': neutral.at(L_BG_BUTTON_STRONG_HOVER),
    'control-primary-info-active': neutral.at(L_BG_BUTTON_STRONG_ACTIVE),
    'control-primary-success': green.at(L_BG_BUTTON),
    'control-primary-success-hover': green.at(L_BG_BUTTON_HOVER),
    'control-primary-success-active': green.at(L_BG_BUTTON_ACTIVE),
    'control-primary-critical': error.at(L_BG_BUTTON),
    'control-primary-critical-hover': error.at(L_BG_BUTTON_HOVER),
    'control-primary-critical-active': error.at(L_BG_BUTTON_ACTIVE),
    'control-primary-brand': brand.at(L_BG_BUTTON),
    'control-primary-brand-hover': brand.at(L_BG_BUTTON_HOVER),
    'control-primary-brand-active': brand.at(L_BG_BUTTON_ACTIVE),
    'control-primary-advertising': advertising.at(L_BG_BUTTON), // Used in Wizard. Maybe gray?
    'control-primary-advertising-hover': advertising.at(L_BG_BUTTON_HOVER),
    'control-primary-advertising-active': advertising.at(L_BG_BUTTON_ACTIVE),
    'control-primary-invert': neutral.at(L_INV_BG_BUTTON),
    'control-primary-invert-hover': neutral.at(L_INV_BG_BUTTON_HOVER),
    'control-primary-invert-active': neutral.at(L_INV_BG_BUTTON_ACTIVE),
    'control-secondary-neutral': neutral.opaqueAt(L_BG_SECONDARY),
    'control-secondary-neutral-hover': neutral.opaqueAt(L_BG_SECONDARY_HOVER),
    'control-secondary-neutral-active': neutral.opaqueAt(L_BG_SECONDARY_ACTIVE),
    'control-secondary-info': info.opaqueAt(L_BG_SECONDARY),
    'control-secondary-info-hover': info.opaqueAt(L_BG_SECONDARY_HOVER),
    'control-secondary-info-active': info.opaqueAt(L_BG_SECONDARY_ACTIVE),
    'control-secondary-invert': neutral.opaqueInvAt(L_INV_BG_SECONDARY),
    'control-secondary-invert-hover': neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
    'control-secondary-invert-active': neutral.opaqueInvAt(L_INV_BG_SECONDARY_ACTIVE),
    'control-tertiary-neutral': 'transparent',
    'control-tertiary-neutral-hover': neutral.opaqueAt(L_BG_SECONDARY_HOVER),
    'control-tertiary-neutral-active': neutral.opaqueAt(L_BG_SECONDARY_ACTIVE),
    'control-tertiary-info': 'transparent',
    'control-tertiary-info-hover': info.opaqueAt(L_BG_SECONDARY_HOVER),
    'control-tertiary-info-active': info.opaqueAt(L_BG_SECONDARY_ACTIVE),
    'control-tertiary-invert': 'transparent',
    'control-tertiary-invert-hover': neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
    'control-tertiary-invert-active': neutral.opaqueInvAt(L_INV_BG_SECONDARY_ACTIVE),

    // Icon
    'icon-primary-neutral': neutral.opaqueAt(L_ICON_PRIMARY),
    'icon-primary-neutral-hover-active': neutral.opaqueAt(L_ICON_PRIMARY_HOVER),
    'icon-primary-info': info.opaqueAt(L_ICON_PRIMARY),
    'icon-primary-info-hover-active': info.opaqueAt(L_ICON_PRIMARY_HOVER),
    'icon-primary-success': success.opaqueAt(L_ICON_PRIMARY),
    'icon-primary-success-hover-active': success.opaqueAt(L_ICON_PRIMARY_HOVER),
    'icon-primary-critical': error.opaqueAt(L_ICON_PRIMARY),
    'icon-primary-critical-hover-active': error.opaqueAt(L_ICON_PRIMARY_HOVER),
    'icon-primary-warning': warning.opaqueAt(L_ICON_PRIMARY + 0.15),
    'icon-primary-warning-hover-active': warning.opaqueAt(L_ICON_PRIMARY_HOVER),
    'icon-primary-invert': neutral.opaqueInvAt(L_INV_ICON_PRIMARY),
    'icon-primary-invert-hover-active': neutral.opaqueInvAt(L_INV_ICON_PRIMARY_HOVER),
    'icon-secondary-neutral': neutral.opaqueAt(L_ICON_SECONDARY),
    'icon-secondary-neutral-hover-active': neutral.opaqueAt(L_ICON_SECONDARY_HOVER),
    'icon-secondary-info': info.opaqueAt(L_ICON_SECONDARY),
    'icon-secondary-info-hover-active': info.at(L_ICON_SECONDARY_HOVER),
    'icon-secondary-success': success.opaqueAt(L_ICON_SECONDARY),
    'icon-secondary-success-hover-active': success.opaqueAt(L_ICON_SECONDARY_HOVER),
    'icon-secondary-critical': error.opaqueAt(L_ICON_SECONDARY),
    'icon-secondary-critical-hover-active': error.opaqueAt(L_ICON_SECONDARY_HOVER),
    'icon-secondary-warning': warning.opaqueAt(L_ICON_SECONDARY),
    'icon-secondary-warning-hover-active': warning.opaqueAt(L_ICON_SECONDARY_HOVER),
    'icon-non-interactive': neutral.opaqueAt(L_ICON_NON_INTERACTIVE),

    // Illustration
    'illustration-red': red.at(0.737),
    'illustration-orange': orange.at(0.823),
    'illustration-yellow': yellow.at(0.924),
    'illustration-salad': salad.at(0.922),
    'illustration-green': green.at(0.812),
    'illustration-blue': blue.at(0.84),
    'illustration-violet': violet.at(0.709),
    'illustration-pink': pink.at(0.76),

    // Date Picker
    'date-picker-cell': neutral.at(L_BG_PRIMARY),
    'date-picker-cell-current': neutral.opaqueAt(L_BORDER_ACTIVE),
    'date-picker-cell-hover': neutral.at(L_BG_PRIMARY_HOVER),
    'date-picker-cell-range': focus.at(L_BG_SELECTED),
    'date-picker-cell-range-hover': focus.at(L_BG_SELECTED_HOVER),
    'date-picker-cell-active': focus.at(L_BG_BUTTON),
    'date-picker-cell-active-hover': focus.at(L_BG_BUTTON_HOVER),
    'date-picker-cell-current-invert': neutral.opaqueInvAt(L_INV_BORDER_PRIMARY), // TODO: Isn't used in the component, but it should be used 😵‍💫
    'date-picker-cell-comparison-active': highlight.at(L_BG_BUTTON),
    'date-picker-cell-comparison-active-hover': highlight.at(L_BG_BUTTON_HOVER),

    // Dropdown Menu
    'dropdown-menu-item': neutral.at(L_BG_PRIMARY),
    'dropdown-menu-item-hover': neutral.opaqueAt(L_BG_PRIMARY_HOVER),
    'dropdown-menu-item-selected': focus.opaqueAt(L_BG_SELECTED),
    'dropdown-menu-item-selected-hover': focus.opaqueAt(L_BG_SELECTED_HOVER),

    // Feature Popover
    'feature-popover-bg': '{bg-primary-highlight}',
    'feature-popover-dot-outer-border': '{bg-primary-highlight}',
    'feature-popover-bg-neutral': neutral.at(L_INV_BG_PRIMARY),
    'feature-popover-dot-neutral': '{bg-primary-highlight}',
    'feature-popover-dot-neutral-outer-border': '{feature-popover-dot-neutral}',

    // Progress Bar
    'progress-bar-bg': neutral.at(L_BG_LIGHT),
    'progress-bar-bg-hover': neutral.at(L_BG_MEDIUM),
    'progress-bar-bg-invert': neutral.at(L_INV_BG_LIGHT),
    'progress-bar-bg-invert-hover': neutral.at(L_INV_BG_MEDIUM),
    'progress-bar-value': highlight.at(0.74),
    'progress-bar-value-gradient':
      'linear-gradient(-45deg, oklch(from {progress-bar-value} calc(l - 0.05) c h) 25%, {progress-bar-value} 0%, {progress-bar-value} 50%, oklch(from {progress-bar-value} calc(l - 0.05) c h) 0%, oklch(from {progress-bar-value} calc(l - 0.05) c h) 75%, {progress-bar-value} 0%)',
    'progress-bar-pattern-gradient':
      'linear-gradient(-45deg, oklch(0 0 0 / 0.1) 25%, {progress-bar-bg} 0%, {progress-bar-bg} 50%, oklch(0 0 0 / 0.1) 0%, oklch(0 0 0 / 0.1) 75%, {progress-bar-bg} 0%)',
    'progress-bar-value-bg': 'oklch(1 0 0)',

    // Skeleton
    'skeleton-bg': neutral.at(L_BG_SKELETON),
    'skeleton-bg-invert': neutral.at(L_INV_BG_SKELETON),

    // Slider Rating
    'slider-rating-normal': neutral.at(L_ICON_SECONDARY),
    'slider-rating-hover-active': highlight.at(L_ICON_SECONDARY_HOVER),

    // Table
    'table-th-primary-cell': neutral.at(L_BG_SECONDARY),
    // TODO: used to display sorted column, want to make it more active
    'table-th-primary-cell-hover': neutral.at(L_BG_SECONDARY_ACTIVE), // TODO: Used both for hovered and active states. Need to be fixed 😭
    'table-th-primary-cell-active': neutral.at(L_BG_SECONDARY_ACTIVE),
    'table-th-secondary-cell': neutral.at(L_BG_PRIMARY),
    'table-th-gradient': 'linear-gradient(to right, transparent 0%, var(--gray-100) 100%)',
    'table-td-cell': neutral.at(L_BG_PRIMARY),
    'table-td-cell-hover': neutral.opaqueAt(L_BG_PRIMARY_HOVER),
    'table-td-cell-active': neutral.opaqueAt(L_BG_PRIMARY_ACTIVE),
    'table-td-cell-unread': neutral.at(L_BG_SECONDARY),
    'table-td-cell-accordion': neutral.at(L_BG_PRIMARY),
    'table-td-cell-selected': info.at(L_BG_SECONDARY),
    'table-td-cell-selected-hover': info.at(L_BG_SECONDARY_HOVER),
    'table-td-cell-selected-active': info.at(L_BG_SECONDARY_ACTIVE),
    'table-td-cell-new': success.at(L_BG_SECONDARY),
    'table-td-cell-new-hover': success.at(L_BG_SECONDARY_HOVER),
    'table-td-cell-new-active': success.at(L_BG_SECONDARY_ACTIVE),
    'table-td-cell-critical': error.at(L_BG_SECONDARY),
    'table-td-cell-critical-hover': error.at(L_BG_SECONDARY_HOVER),
    'table-td-cell-critical-active': error.at(L_BG_SECONDARY_ACTIVE),
    'table-td-cell-warning': warning.at(L_BG_SECONDARY),
    'table-td-cell-warning-hover': warning.at(L_BG_SECONDARY_HOVER),
    'table-td-cell-warning-active': warning.at(L_BG_SECONDARY_ACTIVE),

    // Brand
    'brand-primary': violet.at(0.74),
    'brand-secondary': gray.at(0.22),
    'brand-pinterest': '#bd081c',
    'brand-instagram': '#e4405f',
    'brand-youtube': '#ff0000',
    'brand-facebook': '#1877f2',
    'brand-linkedIn': '#0a66c2',
    'brand-twitter': '#1d9bf0',
    'brand-google-blue': '#1a0dab',
    'brand-google-green': '#016723',
    'brand-google-my-business': '#1a73e8',

    // Keyboard Focus (outline/color values)
    'keyboard-focus-outline': focus.opaqueAt(L_BORDER_FOCUS),
    'keyboard-focus-outline-invert': 'oklch(from var(--white) l c h / 0.7)',
    'keyboard-focus-invalid-outline': error.opaqueAt(L_BORDER_FOCUS),
    'keyboard-focus-valid-outline': success.opaqueAt(L_BORDER_FOCUS),

    // Overlay
    'overlay-primary': neutral.opaqueAt(0.74),
    'overlay-secondary': neutral.opaqueAt(0.8),
    'overlay-limitation-primary': neutral.at(L_BG_SECONDARY),
    'overlay-limitation-secondary': 'oklch(1 0 0 / 0.85)',

    // Tooltip
    'tooltip-default': neutral.at(L_BG_PRIMARY),
    'tooltip-warning': error.at(L_BG_LIGHT),
    'tooltip-invert': neutral.at(L_INV_BG_PRIMARY),

    // Neighbor Location
    'neighbor-location-neutral': 'oklch(from var(--white) l c h / 0.5)',
    'neighbor-location-invert': 'oklch(0 0 0 / 0.5)',

    // Scroll Area
    'scroll-area-shadow-left': 'linear-gradient(to right, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
    'scroll-area-shadow-right': 'linear-gradient(to left, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
    'scroll-area-shadow-top': 'linear-gradient(to bottom, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
    'scroll-area-shadow-bottom': 'linear-gradient(to top, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
    'scroll-area-dropdown-menu-left': 'linear-gradient(to right, oklch(1 0 0) 0%, transparent 100%)',
    'scroll-area-dropdown-menu-right': 'linear-gradient(to left, oklch(1 0 0) 0%, transparent 100%)',
    'scroll-area-dropdown-menu-bottom': 'linear-gradient(to top, oklch(1 0 0) 0%, transparent 100%)',
    'scroll-area-dropdown-menu-top': 'linear-gradient(to bottom, oklch(1 0 0) 0%, transparent 100%)',

    // Scroll Bar
    'scroll-bar-background': neutral.opaqueAt(L_BORDER_PRIMARY),

    // Chart (don't use orange scale)
    'chart-palette-order-1': 'var(--blue-400)',
    'chart-palette-order-2': 'var(--violet-300)',
    'chart-palette-order-3': 'var(--green-200)',
    'chart-palette-order-4': 'var(--yellow-200)',
    'chart-palette-order-5': 'var(--blue-300)',
    'chart-palette-order-6': 'var(--salad-200)',
    'chart-palette-order-7': 'var(--red-300)',
    'chart-palette-order-8': 'var(--green-400)',
    'chart-palette-order-9': 'var(--violet-200)',
    'chart-palette-order-10': 'var(--yellow-300)',
    'chart-palette-order-11': 'var(--red-400)',
    'chart-palette-order-12': 'var(--salad-300)',
    'chart-palette-order-13': 'var(--blue-200)',
    'chart-palette-order-14': 'var(--pink-400)',
    'chart-palette-order-15': 'var(--green-300)',
    'chart-palette-order-16': 'var(--violet-400)',
    'chart-palette-order-17': 'var(--blue-500)',
    'chart-palette-order-18': 'var(--pink-300)',
    'chart-palette-order-19': 'var(--yellow-400)',
    'chart-palette-order-20': 'var(--red-200)',
    'chart-palette-order-21': 'var(--salad-400)',
    'chart-palette-order-22': 'var(--yellow-500)',
    'chart-palette-order-23': 'var(--pink-200)',
    'chart-palette-order-24': 'var(--green-500)',
    'chart-palette-order-total-amount': 'var(--gray-400)',
    'chart-palette-order-other-data': 'var(--gray-200)',
    'chart-palette-order-null': 'var(--gray-100)',
    'chart-grid-line': neutral.at(L_BORDER_SECONDARY),
    'chart-grid-x-axis': neutral.at(L_BORDER_PRIMARY), // Transparency doesn't work in SVG
    'chart-grid-y-accent-hover-line': neutral.at(L_BORDER_PRIMARY),
    'chart-grid-text-label': neutral.opaqueAt(L_TEXT_SECONDARY),
    'chart-grid-bar-chart-hover': neutral.opaqueAt(L_BG_PRIMARY_HOVER),
    'chart-grid-bar-chart-base-bg': neutral.at(L_BG_LIGHT),
    'chart-grid-period-bg': neutral.at(L_BG_LIGHT), // Transparency doesn't work in SVG
    'chart-grid-period-pattern': neutral.at(L_BORDER_SECONDARY), // Transparency doesn't work in SVG
    'chart-grid-border': 'var(--white)',
    'chart-x-axis-accent-period-active': neutral.opaqueAt(L_BG_LIGHT),
    'chart-x-axis-accent-data-start-tracking': success.opaqueAt(L_BG_LIGHT),

    // Feature highlight
    'bg-primary-feature-highlight': 'var(--white)',
    'bg-primary-feature-highlight-hover-active': 'linear-gradient(90deg in oklch, var(--violet-50), var(--blue-75))',
    'bg-secondary-feature-highlight': 'linear-gradient(90deg in oklch, var(--violet-50), var(--blue-75))',
    'border-feature-highlight': 'linear-gradient(90deg in oklch, var(--violet-200), var(--blue-200))',
    'border-feature-highlight-active': 'linear-gradient(90deg in oklch, var(--violet-300), var(--blue-300))',
    'border-feature-highlight-secondary': 'linear-gradient(90deg in oklch, var(--violet-300), var(--blue-300))',
    'control-primary-feature-highlight': 'linear-gradient(90deg in oklch, var(--violet-400), var(--blue-300))',
    'control-primary-feature-highlight-hover': 'linear-gradient(90deg in oklch, var(--violet-400), var(--blue-300))',
    'control-primary-feature-highlight-active': 'linear-gradient(90deg in oklch, var(--violet-400), var(--blue-400))',
    'control-secondary-feature-highlight': 'linear-gradient(90deg in oklch, var(--violet-50), var(--blue-50))',
    'control-secondary-feature-highlight-hover': 'linear-gradient(90deg in oklch, var(--violet-100), var(--blue-100))',
    'control-secondary-feature-highlight-active': 'linear-gradient(90deg in oklch, var(--violet-100), var(--blue-100))',
    'text-feature-highlight': 'linear-gradient(90deg in oklch, var(--violet-500), var(--blue-500))',
    'text-feature-highlight-hover-active': 'linear-gradient(90deg in oklch, var(--violet-500), var(--blue-500))',
    'icon-primary-feature-highlight': highlight.at(L_ICON_PRIMARY),
    'icon-primary-feature-highlight-hover-active': highlight.at(L_ICON_PRIMARY_HOVER),
    'keyboard-focus-feature-highlight-outline': 'linear-gradient(90deg in oklch, var(--violet-300), var(--blue-400))',
  },

  shadows: {
    // Box Shadow
    'box-shadow-card': `
    0px 0px 1px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)},
    0px 1px 3px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
    'box-shadow-card-hover': `3px 3px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
    'box-shadow-dnd': `3px 3px 30px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
    'box-shadow-modal': `0px 1px 5px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
    'box-shadow-popper': `1px 1px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
    'box-shadow-float-control': `
    0px 0px 1px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)},
    0px 1px 5px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
    'box-shadow-float-control-hover': `3px 3px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
    // Keyboard Focus (shadow values)
    'keyboard-focus': '0px 0px 0px 3px {keyboard-focus-outline}',
    'keyboard-focus-invalid': '0px 0px 0px 3px {keyboard-focus-invalid-outline}',
    'keyboard-focus-valid': '0px 0px 0px 3px {keyboard-focus-valid-outline}',
    'keyboard-focus-invert': '0px 0px 0px 3px {keyboard-focus-outline-invert}',
  },

  zIndexes: {
    'z-index-deep': '-999',
    'z-index-overlay': '500',
    'z-index-modal': '900',
    'z-index-popper': '700',
    'z-index-dropdown': '750',
    'z-index-tooltip': '800',
    'z-index-notice-bubble': '999',
  },

  lineHeights: {
    'lh-800': '117%',
    'lh-700': '110%',
    'lh-600': '125%',
    'lh-500': '117%',
    'lh-400': '120%',
    'lh-300': '150%',
    'lh-200': '142%',
    'lh-100': '133%',
  },

  fontWeights: {
    'semi-bold': '600',
    'bold': '700',
    'regular': '400',
    'medium': '500',
  },

  fontSizes: {
    'fs-50': '10px',
    'fs-100': '12px',
    'fs-200': '14px',
    'fs-300': '16px',
    'fs-400': '20px',
    'fs-500': '24px',
    'fs-600': '32px',
    'fs-700': '36px',
    'fs-800': '48px',
  },

  letterSpacings: {
    compact: '0.3',
  },

  spacing: {
    'scale-indent': '4px',
    'spacing-05x': 'calc({scale-indent} * 0.5)',
    'spacing-1x': 'calc({scale-indent} * 1)',
    'spacing-2x': 'calc({scale-indent} * 2)',
    'spacing-3x': 'calc({scale-indent} * 3)',
    'spacing-4x': 'calc({scale-indent} * 4)',
    'spacing-5x': 'calc({scale-indent} * 5)',
    'spacing-6x': 'calc({scale-indent} * 6)',
    'spacing-8x': 'calc({scale-indent} * 8)',
    'spacing-10x': 'calc({scale-indent} * 10)',
    'spacing-14x': 'calc({scale-indent} * 14)',
    'spacing-20x': 'calc({scale-indent} * 20)',
    'spacing-24x': 'calc({scale-indent} * 24)',
    'spacing-30x': 'calc({scale-indent} * 30)',
  },

  sizes: {
    'form-control-s': 'calc({scale-indent} * 5)',
    'form-control-m': 'calc({scale-indent} * 7)',
    'form-control-l': 'calc({scale-indent} * 10)',
    'screen-extra-small': '320px',
    'screen-small': '768px',
    'screen-medium': '1200px',
    'screen-large': '1920px',
  },

  radii: {
    // Base radii
    'rounded-extra-small': '2px',
    'rounded-small': '4px',
    'rounded-medium': '6px',
    'rounded-large': '12px',
    'rounded-extra-large': '24px',
    // Component-specific radii
    'addon-rounded': '{rounded-small}',
    'badge-rounded': '{rounded-medium}',
    'chart-rounded': '{rounded-extra-small}',
    'counter-rounded': '{rounded-large}',
    'tag-rounded': '{rounded-extra-large}',
    'switch-rounded': '{rounded-extra-large}',
    'control-rounded': '{rounded-medium}',
    'progress-bar-rounded': '{rounded-medium}',
    'surface-rounded': 'calc({rounded-medium} + 2px)', // Notice and Card — Button isn't near the corner
    'popper-rounded': '{rounded-medium}',
    'modal-rounded': 'calc({rounded-large} + 2px)', // Added 2px for better look with Close button
  },

  durations: {
    'duration-extra-slow': '500ms',
    'duration-slow': '400ms',
    'duration-medium': '300ms',
    'duration-fast': '200ms',
    'duration-extra-fast': '100ms',
    'duration-switch': '{duration-extra-fast}',
    'duration-popper': '{duration-fast}',
    'duration-control': '{duration-fast}',
    'duration-modal': '{duration-fast}',
    'duration-accordion': '{duration-fast}',
    'duration-counter': '{duration-fast}',
  },

  borders: {},

  fonts: {},

  opacity: {
    'disabled-opacity': '0.4',
  },
};
