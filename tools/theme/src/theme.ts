import type {
  Colors,
  Lightness,
} from './colors/index.ts';
import {
  colors, semanticColors, baseColors, L_BG_PRIMARY, L_BG_PRIMARY_HOVER,
  L_BG_BUTTON,
  L_BG_BUTTON_ACTIVE, L_BG_BUTTON_HOVER, L_BG_BUTTON_STRONG, L_BG_BUTTON_STRONG_ACTIVE, L_BG_BUTTON_STRONG_HOVER, L_BG_BUTTON_BRAND, L_BG_BUTTON_BRAND_ACTIVE, L_BG_BUTTON_BRAND_HOVER,
  L_BG_BUTTON_SECONDARY, L_BG_BUTTON_SECONDARY_ACTIVE, L_BG_BUTTON_SECONDARY_HOVER,
  L_BG_LIGHT,
  L_BG_MEDIUM,
  L_BG_PRIMARY_ACTIVE,
  L_BG_SECONDARY,
  L_BG_SECONDARY_ACTIVE,
  L_BG_SECONDARY_HOVER, L_BG_SELECTED, L_BG_SELECTED_HOVER, L_BG_SKELETON,
  L_BG_STRONG, L_BORDER_ACTIVE,
  L_BORDER_FOCUS, L_BORDER_PRIMARY, L_BORDER_SECONDARY, L_ICON_NON_INTERACTIVE, L_ICON_PRIMARY,
  L_ICON_PRIMARY_HOVER, L_ICON_SECONDARY, L_ICON_SECONDARY_HOVER, L_INV_BG_BUTTON,
  L_INV_BG_BUTTON_ACTIVE, L_INV_BG_BUTTON_HOVER, L_INV_BG_LIGHT, L_INV_BG_MEDIUM,
  L_INV_BG_PRIMARY,
  L_INV_BG_PRIMARY_ACTIVE,
  L_INV_BG_PRIMARY_HOVER, L_INV_BG_SECONDARY,
  L_INV_BG_SECONDARY_ACTIVE, L_INV_BG_SECONDARY_HOVER,
  L_INV_BG_SKELETON, L_INV_BORDER_PRIMARY, L_INV_BORDER_SECONDARY, L_INV_ICON_PRIMARY,
  L_INV_ICON_PRIMARY_HOVER,
  L_INV_TEXT_PRIMARY,
  L_INV_TEXT_SECONDARY, L_INV_TEXT_SECONDARY_HOVER,
  L_TEXT_PLACEHOLDER,
  L_TEXT_PRIMARY,
  L_TEXT_SECONDARY, L_TEXT_SECONDARY_HOVER,
  L_TEXT_ACCENT,
} from './colors/index.ts';

const { neutral, brand, error, advertising, focus, highlight, info, success, warning } = semanticColors;
const { green, violet, blue, pink, gray, red, orange, salad, yellow } = baseColors;

const SCALE_INDENT = 4;

const RADII: Record<Radii, number> = {
  'extra-small': 2,
  'small': 4,
  'medium': 6,
  'large': 12,
  'extra-large': 24,
};

export const theme: Theme = {
  baseTokens: {
    colors: {
      ...colors,
      gray: {
        ...colors.gray,
        white: {
          value: '#ffffff',
        },
      },
      current: { value: 'currentColor' },
      transparent: { value: 'rgb(0 0 0 / 0)' },
      black: { value: '#000' },
      white: { value: '#fff' },
    },
    fonts: {
      base: {
        value: 'Inter',
        description: 'Base font family.',
      },
    },
    fontSizes: {
      50: {
        value: '10px',
        description: 'Use only for text in Badge component.',
      },
      100: {
        value: '12px',
        description: 'Use this font-size with caution for text in some additional messages. Always check its contrast and readability.',
      },
      200: {
        value: '14px',
      },
      300: {
        value: '16px',
      },
      400: {
        value: '20px',
      },
      500: {
        value: '24px',
      },
      600: {
        value: '32px',
      },
      700: {
        value: '36px',
      },
      800: {
        value: '48px',
      },
    },
    lineHeights: {
      100: {
        value: '133%',
        description: 'Use with font-size-100.',
      },
      200: {
        value: '142%',
        description: 'Use with font-size-200.',
      },
      300: {
        value: '150%',
        description: 'Use with font-size-300.',
      },
      400: {
        value: '120%',
        description: 'Use with font-size-400.',
      },
      500: {
        value: '117%',
        description: 'Use with font-size-500.',
      },
      600: {
        value: '125%',
        description: 'Use with font-size-600.',
      },
      700: {
        value: '110%',
        description: 'Use with font-size-700.',
      },
      800: {
        value: '117%',
        description: 'Use with font-size-800.',
      },
    },
    fontWeights: {
      'semi-bold': {
        value: '600',
        description: 'Semi-bold font weight.',
      },
      'bold': {
        value: '700',
        description: 'Bold font weight.',
      },
      'regular': {
        value: '400',
        description: 'Regular font weight.',
      },
      'medium': {
        value: '500',
        description: 'Medium font weight.',
      },
    },
    letterSpacings: {
      compact: {
        value: '0.3',
        description: 'Compact letter spacing.',
      },
    },
    spacing: {
      'scale': {
        indent: {
          value: `${SCALE_INDENT}px`,
          description: 'Base denominator of the design system.',
        },
      },
      '05': {
        value: `${SCALE_INDENT / 2}px`,
        description: '2px',
      },
      '1': {
        value: `${SCALE_INDENT}px`,
        description: '4px',
      },
      '2': {
        value: `${SCALE_INDENT * 2}px`,
        description: '8px',
      },
      '3': {
        value: `${SCALE_INDENT * 3}px`,
        description: '12px',
      },
      '4': {
        value: `${SCALE_INDENT * 4}px`,
        description: '16px',
      },
      '5': {
        value: `${SCALE_INDENT * 5}px`,
        description: '20px',
      },
      '6': {
        value: `${SCALE_INDENT * 6}px`,
        description: '24px',
      },
      '8': {
        value: `${SCALE_INDENT * 8}px`,
        description: '32px',
      },
      '10': {
        value: `${SCALE_INDENT * 10}px`,
        description: '40px',
      },
      '14': {
        value: `${SCALE_INDENT * 14}px`,
        description: '56px',
      },
      '20': {
        value: `${SCALE_INDENT * 20}px`,
        description: '80px',
      },
      '24': {
        value: `${SCALE_INDENT * 24}px`,
        description: '96px',
      },
      '30': {
        value: `${SCALE_INDENT * 30}px`,
        description: '120px',
      },
    },
    radii: Object.entries(RADII).reduce<Record<string, Value>>((acc, [key, value]) => {
      acc[key] = { value: `${value}px` };
      return acc;
    }, {}),
    breakpoints: {
      'extra-small': {
        value: '320px',
        description: 'Extra small screens (small phones).',
      },
      'small': {
        value: '768px',
        description: 'Small screens (phones and small tablets).',
      },
      'medium': {
        value: '1200px',
        description: 'Medium screens (tablets and small laptops).',
      },
      'large': {
        value: '1920px',
        description: 'Large screens (tablets and laptops).',
      },
    },
    durations: {
      'extra-slow': {
        value: '500',
        description: 'Should be used for more complex effects and larger scale animations (such as page transitions or moving objects on and offscreen)',
      },
      'slow': {
        value: '400',
        description: 'Should be used for more larger scale animations (such as page transitions)',
      },
      'medium': {
        value: '300',
        description: 'Should be used for more complex effects (such as Modal)',
      },
      'fast': {
        value: '200',
        description: 'Should be used for more complex effects (such as Dropdown or Accordion)',
      },
      'extra-fast': {
        value: '100',
        description: 'Should be used for simpler effects and relatively small-sized animations (such as fades or color changes)',
      },
    },
  },
  semanticTokens: {
    colors: {
      badge_bg_admin: {
        value: colors.blue['400'].value,
        description: 'Background color of the admin Badge.',
      },
      badge_bg_alpha: {
        value: colors.red['400'].value,
        description: 'Background color of the alpha Badge.',
      },
      badge_bg_beta: {
        value: colors.orange['400'].value,
        description: 'Background color of the beta Badge.',
      },
      badge_bg_invert: {
        value: '{baseTokens.colors.gray.white}',
        description: 'Background color of the inverted Badge.',
      },
      badge_bg_new: {
        value: colors.green['400'].value,
        description: 'Background color of the new Badge.',
      },
      badge_bg_soon: {
        value: colors.gray['400'].value,
        description: 'Background color of the soon Badge.',
      },
      badge_bg_unavailable: {
        value: colors.gray['100'].value,
        description: 'Background color of the unavailable Badge.',
      },
      badge_text_primary_DEFAULT: {
        value: '{semanticTokens.colors.text_primary_DEFAULT}',
        description: 'Primary text color for Badge.',
      },
      badge_text_primary_invert: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Inverted primary text color for Badge.',
      },
      badge_text_secondary: {
        value: '{semanticTokens.colors.text_secondary_DEFAULT}',
        description: 'Secondary text color for Badge.',
      },
      bg_highlight_focus: {
        value: focus.opaqueAt(L_BG_SECONDARY_ACTIVE),
        description: 'Focusing values in the input.',
      },
      bg_highlight_results: {
        value: highlight.at(L_BG_SECONDARY_ACTIVE),
        description: 'Highlighting the search results.',
      },
      bg_primary_advertising: {
        value: advertising.at(L_BG_STRONG),
        description: 'Accent background for the advertising banners and controls.',
      },
      bg_primary_critical: {
        value: error.at(L_BG_STRONG),
        description: 'Accent background of a message or a banner with a critical information.',
      },
      bg_primary_highlight: {
        value: highlight.at(L_BG_MEDIUM),
        description: 'Accent background of the information you want to highlight.',
      },
      bg_primary_info: {
        value: info.at(L_BG_STRONG),
        description: 'Accent background of the message with regular information.',
      },
      bg_primary_invert_DEFAULT: {
        value: neutral.at(L_INV_BG_PRIMARY),
        description: 'Inverted version of the primary background of the interface that contains the main data and information.',
      },
      bg_primary_invert_active: {
        value: neutral.at(L_INV_BG_PRIMARY_ACTIVE),
        description: 'Active (selected) state for the inverted version of the primary background of the interface that contains the main data and information.',
      },
      bg_primary_invert_hover: {
        value: neutral.at(L_INV_BG_PRIMARY_HOVER),
        description: 'Hover state for the inverted version of the primary background of the interface that contains the main data and information.',
      },
      bg_primary_muted: {
        value: neutral.at(L_BG_STRONG),
        description: 'Accented muted background for a message with regular information.',
      },
      bg_primary_neutral_DEFAULT: {
        value: neutral.at(L_BG_PRIMARY),
        description: 'Primary background of the interface which contains the main data and information.',
      },
      bg_primary_neutral_active: {
        value: neutral.at(L_BG_PRIMARY_ACTIVE),
        description: 'Active (selected) state of the primary background of the interface which contains the main data and information.',
      },
      bg_primary_neutral_hover: {
        value: neutral.at(L_BG_PRIMARY_HOVER),
        description: 'Hover state of the primary background of the interface which contains the main data and information.',
      },
      bg_primary_success: {
        value: success.at(L_BG_STRONG),
        description: 'Accent background of the message or banner with information about the successful result.',
      },
      bg_primary_warning: {
        value: warning.at(0.7),
        description: 'Accent background of a message or a banner with a warning information.',
      },
      bg_secondary_advertising_DEFAULT: {
        value: advertising.at(L_BG_SECONDARY),
        description: 'Secondary background for the advertising message you want to accent.',
      },
      bg_secondary_advertising_active: {
        value: advertising.at(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the secondary background for the advertising message you want to accent.',
      },
      bg_secondary_advertising_hover: {
        value: advertising.at(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the secondary background for the advertising message you want to accent.',
      },
      bg_secondary_critical_DEFAULT: {
        value: error.at(L_BG_LIGHT),
        description: 'Secondary background of the message with critical information you want to accent.',
      },
      bg_secondary_critical_active: {
        value: error.at(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the secondary background of the message with critical information you want to accent.',
      },
      bg_secondary_critical_hover: {
        value: error.at(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the secondary background of the message with critical information you want to accent.',
      },
      bg_secondary_highlight_DEFAULT: {
        value: highlight.at(L_BG_SECONDARY),
        description: 'Secondary background of the information you want to highlight.',
      },
      bg_secondary_highlight_active: {
        value: highlight.at(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the secondary background of the information you want to highlight.',
      },
      bg_secondary_highlight_hover: {
        value: highlight.at(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the secondary background of the information you want to highlight.',
      },
      bg_secondary_info_DEFAULT: {
        value: info.at(L_BG_LIGHT),
        description: 'Secondary background of a message with regular information.',
      },
      bg_secondary_info_active: {
        value: info.at(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the secondary background of a message with regular information.',
      },
      bg_secondary_info_hover: {
        value: info.at(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the secondary background of a message with regular information.',
      },
      bg_secondary_neutral_DEFAULT: {
        value: neutral.at(L_BG_SECONDARY),
        description: 'Secondary background of the interface which contains the main data and information.',
      },
      bg_secondary_neutral_active: {
        value: neutral.at(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the secondary background of the interface which contains the main data and information.',
      },
      bg_secondary_neutral_hover: {
        value: neutral.at(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the secondary background of the interface which contains the main data and information.',
      },
      bg_secondary_success_DEFAULT: {
        value: success.at(L_BG_LIGHT),
        description: 'Secondary background of the message with success information you want to accent.',
      },
      bg_secondary_success_active: {
        value: success.at(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the secondary background of the message with success information you want to accent.',
      },
      bg_secondary_success_hover: {
        value: success.at(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the secondary background of the message with success information you want to accent.',
      },
      bg_secondary_warning_DEFAULT: {
        value: warning.at(L_BG_SECONDARY),
        description: 'Secondary background of the message with warning information you want to accent.',
      },
      bg_secondary_warning_active: {
        value: warning.at(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the secondary background of the message with critical information you want to accent.',
      },
      bg_secondary_warning_hover: {
        value: warning.at(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the secondary background of the message with warning information you want to accent.',
      },
      border_critical_DEFAULT: {
        value: error.opaqueAt(L_BORDER_PRIMARY),
        description: 'Subtle secondary border in the critical message and invalid input field.',
      },
      border_critical_active: {
        value: error.at(L_BORDER_ACTIVE),
        description: 'Active border in the focused input field with invalid state, and active state of the other components with invalid state.',
      },
      border_critical_pattern: {
        value: 'repeating-linear-gradient(315deg, {semanticTokens.colors.border.critical.active} 0, {semanticTokens.colors.border.critical.active} 1px, transparent 0, transparent 50%)',
        description: 'Used for the invalidStatePattern utils component to mark all kinds of inputs with invalid states.',
      },
      border_info_DEFAULT: {
        value: info.opaqueAt(L_BORDER_PRIMARY),
        description: 'Subtle secondary border in the informational message.',
      },
      border_info_active: {
        value: info.at(L_BORDER_ACTIVE),
        description: 'Active border in focused input filed.',
      },
      border_primary_DEFAULT: {
        value: neutral.opaqueAt(L_BORDER_PRIMARY),
        description: 'Default stroke for interactive controls and structured surfaces.',
      },
      border_primary_invert: {
        value: neutral.opaqueInvAt(L_INV_BORDER_PRIMARY),
        description: 'Inverted version of the neutral primary border. Use it for borders on the dark or color background.',
      },
      border_secondary_DEFAULT: {
        value: neutral.opaqueAt(L_BORDER_SECONDARY),
        description: 'Secondary hairline stroke for grids, cards, and subtle dividers.',
      },
      border_secondary_invert: {
        value: neutral.opaqueInvAt(L_INV_BORDER_SECONDARY),
        description: 'Inverted version of the neutral secondary border. Use it for borders on the dark or color background.',
      },
      border_success_DEFAULT: {
        value: success.opaqueAt(L_BORDER_PRIMARY),
        description: 'Subtle secondary border in the successful message and input field.',
      },
      border_success_active: {
        value: success.at(L_BORDER_ACTIVE),
        description: 'Active border in the focused input field with valid state.',
      },
      border_warning_DEFAULT: {
        value: warning.opaqueAt(L_BORDER_PRIMARY),
        description: 'Subtle secondary border in the warning message.',
      },
      border_warning_active: {
        value: warning.at(L_BORDER_ACTIVE),
        description: 'Active border in components with warning intention.',
      },
      brand_facebook: {
        value: '#1877f2',
        description: 'Official Facebook brand fill for logos and icons in approved placements; follow the platform brand rules for size and clear space.',
      },
      brand_google_blue: { value: '#1a0dab', description: 'Google brand color for the link.' },
      brand_google_green: {
        value: '#016723',
        description: 'Google green brand color for the link.',
      },
      brand_google_my_business: {
        value: '#1a73e8',
        description: 'Official Google My Business brand fill for logos and icons in approved placements; follow Google brand guidelines for size and clear space.',
      },
      brand_gradient: {
        value: 'linear-gradient(180deg, #DCEEEB 0%, #EEE9FF 100%)',
        description: 'Brand light gradient for branded surfaces.',
      },
      brand_instagram: {
        value: '#e4405f',
        description: 'Official Instagram brand fill for logos and icons in approved placements; follow the platform brand rules for size and clear space.',
      },
      brand_linkedIn: {
        value: '#0a66c2',
        description: 'Official LinkedIn brand fill for logos and icons in approved placements; follow the platform brand rules for size and clear space.',
      },
      brand_pinterest: {
        value: '#bd081c',
        description: 'Official Pinterest brand fill for logos and icons in approved placements; follow the platform brand rules for size and clear space.',
      },
      brand_primary: {
        value: violet.at(0.74),
        description: 'Primary brand accent for logos and branded surfaces.',
      },
      brand_secondary: {
        value: gray.at(0.22),
        description: 'Secondary brand accent for paired brand treatments (secondary marks, duo-tone lockups).',
      },
      brand_twitter: {
        value: '#1d9bf0',
        description: 'Official Twitter brand fill for logos and icons in approved placements; follow the platform brand rules for size and clear space.',
      },
      brand_youtube: {
        value: '#ff0000',
        description: 'Official YouTube brand fill for logos and icons in approved placements; follow the platform brand rules for size and clear space.',
      },
      chart_data_critical: {
        value: colors.red['400'].value,
        description: 'Critical data color for charts.',
      },
      chart_data_success: {
        value: colors.green['300'].value,
        description: 'Success data color for charts.',
      },
      chart_data_warning: {
        value: colors.orange['300'].value,
        description: 'Warning data color for charts.',
      },
      chart_grid_bar_chart_base_bg: {
        value: neutral.at(L_BG_LIGHT),
        description: 'Default background color of a bar in the BarChart.',
      },
      chart_grid_bar_chart_hover: {
        value: neutral.opaqueAt(L_BG_PRIMARY_HOVER),
        description: 'Background color for the hover state of a bar on the chart grid.',
      },
      chart_grid_border: {
        value: '{baseTokens.colors.gray.white}',
        description: 'Border for distinguishing data sets and chart dots on the chart grid.',
      },
      chart_grid_line: {
        value: neutral.at(L_BORDER_SECONDARY),
        description: 'Grid and axis guide lines for charts.',
      },
      chart_grid_period_bg: {
        value: neutral.at(L_BG_LIGHT),
        description: 'Use for highlighting a period on the chart grid.',
      },
      chart_grid_period_pattern: {
        value: neutral.at(L_BORDER_SECONDARY),
        description: 'Stripe color for diagonal pattern background.',
      },
      chart_grid_text_label: {
        value: neutral.opaqueAt(L_TEXT_SECONDARY),
        description: 'Text label on the chart grid.',
      },
      chart_grid_x_axis: {
        value: neutral.at(L_BORDER_PRIMARY),
        description: 'X-axis line on the chart grid.',
      },
      chart_grid_y_accent_hover_line: {
        value: neutral.at(L_BORDER_PRIMARY),
        description: 'Accent line for the hover state on the chart grid.',
      },
      chart_palette_order_1: {
        value: colors.blue['400'].value,
        description: '1 color in the default list of colors for charts.',
      },
      chart_palette_order_2: {
        value: colors.green['200'].value,
        description: '2 color in the default list of colors for charts.',
      },
      chart_palette_order_3: {
        value: colors.violet['300'].value,
        description: '3 color in the default list of colors for charts.',
      },
      chart_palette_order_4: {
        value: colors.yellow['200'].value,
        description: '4 color in the default list of colors for charts.',
      },
      chart_palette_order_5: {
        value: colors.red['300'].value,
        description: '5 color in the default list of colors for charts.',
      },
      chart_palette_order_6: {
        value: colors.blue['200'].value,
        description: '6 color in the default list of colors for charts.',
      },
      chart_palette_order_7: {
        value: colors.pink['300'].value,
        description: '7 color in the default list of colors for charts.',
      },
      chart_palette_order_8: {
        value: colors.salad['200'].value,
        description: '8 color in the default list of colors for charts.',
      },
      chart_palette_order_9: {
        value: colors.blue['500'].value,
        description: '9 color in the default list of colors for charts.',
      },
      chart_palette_order_10: {
        value: colors.green['300'].value,
        description: '10 color in the default list of colors for charts.',
      },
      chart_palette_order_11: {
        value: colors.yellow['300'].value,
        description: '11 color in the default list of colors for charts.',
      },
      chart_palette_order_12: {
        value: colors.pink['200'].value,
        description: '12 color in the default list of colors for charts.',
      },
      chart_palette_order_13: {
        value: colors.salad['400'].value,
        description: '13 color in the default list of colors for charts.',
      },
      chart_palette_order_14: {
        value: colors.violet['200'].value,
        description: '14 color in the default list of colors for charts.',
      },
      chart_palette_order_15: {
        value: colors.red['400'].value,
        description: '15 color in the default list of colors for charts.',
      },
      chart_palette_order_16: {
        value: colors.green['400'].value,
        description: '16 color in the default list of colors for charts.',
      },
      chart_palette_order_17: {
        value: colors.blue['200'].value,
        description: '17 color in the default list of colors for charts.',
      },
      chart_palette_order_18: {
        value: colors.salad['300'].value,
        description: '18 color in the default list of colors for charts.',
      },
      chart_palette_order_19: {
        value: colors.yellow['400'].value,
        description: '19 color in the default list of colors for charts.',
      },
      chart_palette_order_20: {
        value: colors.red['200'].value,
        description: '20 color in the default list of colors for charts.',
      },
      chart_palette_order_21: {
        value: colors.yellow['500'].value,
        description: '21 color in the default list of colors for charts.',
      },
      chart_palette_order_22: {
        value: colors.violet['400'].value,
        description: '22 color in the default list of colors for charts.',
      },
      chart_palette_order_23: {
        value: colors.pink['400'].value,
        description: '23 color in the default list of colors for charts.',
      },
      chart_palette_order_24: {
        value: colors.salad['500'].value,
        description: '24 color in the default list of colors for charts.',
      },
      chart_palette_order_null: {
        value: colors.gray['100'].value,
        description: 'Use it to show null value on the chart.',
      },
      chart_palette_order_other_data: {
        value: colors.gray['200'].value,
        description: 'Use it to indicate voids, missing or some other data on the chart.',
      },
      chart_palette_order_total_amount: {
        value: colors.gray['400'].value,
        description: 'Use it to show total value on the chart.',
      },
      chart_x_axis_accent_data_start_tracking: {
        value: success.opaqueAt(L_BG_LIGHT),
        description: 'Background color for the "Start tracking" date on the X-axis of the chart grid.',
      },
      chart_x_axis_accent_period_active: {
        value: neutral.opaqueAt(L_BG_LIGHT),
        description: 'Background color for the clickable date on the X-axis of the chart grid.',
      },
      control_checkbox_bg_normal: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Background color of the Checkbox.',
      },
      control_checkbox_bg_selected: {
        value: '{semanticTokens.colors.control_primary_info_DEFAULT}',
        description: 'Background color of the checked Checkbox.',
      },
      control_checkbox_border: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Border color of the Checkbox.',
      },
      control_checkbox_checkmark: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Color of the checkmark.',
      },
      control_checkbox_button_bg_hover: {
        value: '{semanticTokens.colors.control_secondary_info_DEFAULT}',
        description: 'Hover state of the Checkbox button background.',
      },
      control_checkbox_button_bg_normal: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Normal state of the Checkbox button background.',
      },
      control_checkbox_button_bg_selected_DEFAULT: {
        value: '{semanticTokens.colors.control_secondary_info_active}',
        description: 'Selected state of the Checkbox button background.',
      },
      control_checkbox_button_bg_selected_hover: {
        value: '{semanticTokens.colors.control_secondary_info_active}',
        description: 'Hover for a selected state of the Checkbox button background.',
      },
      control_checkbox_button_border_DEFAULT: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Border color of the Checkbox button in its normal state.',
      },
      control_checkbox_button_border_selected: {
        value: '{semanticTokens.colors.border_info_active}',
        description: 'Border color of the Checkbox button in its active state.',
      },
      control_radio_bg_normal: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Background color of the Radio.',
      },
      control_radio_bg_selected: {
        value: '{semanticTokens.colors.control_primary_info}',
        description: 'Selected state of the Radio background.',
      },
      control_radio_border: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Border color of the Radio.',
      },
      control_primary_advertising_DEFAULT: {
        value: gray.at(L_INV_BG_PRIMARY),
        description: 'Background of the advertising primary control.',
      },
      control_primary_advertising_hover: {
        value: gray.at(L_INV_BG_PRIMARY_HOVER),
        description: 'Hover state of the advertising primary control.',
      },
      control_primary_advertising_active: {
        value: gray.at(L_INV_BG_PRIMARY_ACTIVE),
        description: 'Active (selected) state of the advertising primary control.',
      },
      control_primary_brand_DEFAULT: {
        value: brand.at(L_BG_BUTTON_BRAND),
        description: 'Background of the primary brand colored control.',
      },
      control_primary_brand_active: {
        value: brand.at(L_BG_BUTTON_BRAND_ACTIVE),
        description: 'Active state of the primary brand colored control.',
      },
      control_primary_brand_hover: {
        value: brand.at(L_BG_BUTTON_BRAND_HOVER),
        description: 'Hover state of the primary brand colored control.',
      },
      control_primary_critical_DEFAULT: {
        value: error.at(L_BG_BUTTON),
        description: 'Background of the primary control with danger theme.',
      },
      control_primary_critical_active: {
        value: error.at(L_BG_BUTTON_ACTIVE),
        description: 'Active (selected) state of the primary control with danger theme.',
      },
      control_primary_critical_hover: {
        value: error.at(L_BG_BUTTON_HOVER),
        description: 'Hover state of the primary control with danger theme.',
      },
      control_primary_info_DEFAULT: {
        value: neutral.at(L_BG_BUTTON_STRONG),
        description: 'Background of the regular primary control.',
      },
      control_primary_info_active: {
        value: neutral.at(L_BG_BUTTON_STRONG_ACTIVE),
        description: 'Active (selected) state of the regular primary control.',
      },
      control_primary_info_hover: {
        value: neutral.at(L_BG_BUTTON_STRONG_HOVER),
        description: 'Hover state of the regular primary control.',
      },
      control_primary_invert_DEFAULT: {
        value: neutral.at(L_INV_BG_BUTTON),
        description: 'Inverted background of the primary control.',
      },
      control_primary_invert_active: {
        value: neutral.at(L_INV_BG_BUTTON_ACTIVE),
        description: 'Active (selected) state of the inverted primary control.',
      },
      control_primary_invert_hover: {
        value: neutral.at(L_INV_BG_BUTTON_HOVER),
        description: 'Hover state of the inverted primary control.',
      },
      control_primary_success_DEFAULT: {
        value: green.at(L_BG_BUTTON),
        description: 'Background of the primary control with successful theme.',
      },
      control_primary_success_active: {
        value: green.at(L_BG_BUTTON_ACTIVE),
        description: 'Active (selected) state of the primary control with successful theme.',
      },
      control_primary_success_hover: {
        value: green.at(L_BG_BUTTON_HOVER),
        description: 'Hover state of the primary control with successful theme.',
      },
      control_secondary_info_DEFAULT: {
        value: info.opaqueAt(L_BG_SECONDARY),
        description: 'Background of the accent secondary control.',
      },
      control_secondary_info_active: {
        value: info.opaqueAt(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the accent secondary control.',
      },
      control_secondary_info_hover: {
        value: info.opaqueAt(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the accent secondary control.',
      },
      control_secondary_invert_DEFAULT: {
        value: neutral.opaqueInvAt(L_INV_BG_SECONDARY),
        description: 'Background of the inverted version of the secondary control.',
      },
      control_secondary_invert_active: {
        value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the inverted version of the secondary control.',
      },
      control_secondary_invert_hover: {
        value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
        description: 'Hover state of the inverted version of the secondary control.',
      },
      control_secondary_neutral_DEFAULT: {
        value: neutral.opaqueAt(L_BG_BUTTON_SECONDARY),
        description: 'Background of the regular secondary control.',
      },
      control_secondary_neutral_active: {
        value: neutral.opaqueAt(L_BG_BUTTON_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the regular secondary control.',
      },
      control_secondary_neutral_hover: {
        value: neutral.opaqueAt(L_BG_BUTTON_SECONDARY_HOVER),
        description: 'Hover state of the regular secondary control.',
      },
      control_select_trigger_active: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Background of the Select trigger in its active state.',
      },
      control_select_trigger_hover: {
        value: '{semanticTokens.colors.bg_primary_neutral_hover}',
        description: 'Background of the Select trigger in its hover state.',
      },
      control_select_trigger_normal: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Background of the Select trigger in its normal state.',
      },
      control_slider_bar_bg_DEFAULT: {
        value: '{semanticTokens.colors.progress_bar_bg_DEFAULT}',
        description: 'Background of the Slider bar.',
      },
      control_slider_bar_bg_hover: {
        value: '{semanticTokens.colors.progress_bar_bg_hover}',
        description: 'Hover state of the Slider bar.',
      },
      control_slider_bar_value_bg: {
        value: '{semanticTokens.colors.control_primary_info_DEFAULT}',
        description: 'Filled part of the Slider bar.',
      },
      control_slider_knob_bg_DEFAULT: {
        value: '{baseTokens.colors.gray.white}',
        description: 'Knob fill color of the Slider.',
      },
      control_slider_knob_border_DEFAULT: {
        value: '{semanticTokens.colors.control_primary_info_DEFAULT}',
        description: 'Knob border color of the Slider in its normal state.',
      },
      control_slider_knob_border_hover: {
        value: '{semanticTokens.colors.control_primary_info_hover}',
        description: 'Knob border color of the Slider in its hover state.',
      },
      control_slider_rating_icon_DEFAULT: {
        value: neutral.at(L_ICON_SECONDARY),
        description: 'Icon color for the SliderRating component in its normal state.',
      },
      control_slider_rating_icon_hover_active: {
        value: highlight.at(L_ICON_SECONDARY_HOVER),
        description: 'Icon color for the SliderRating component in its hovered and active states.',
      },
      control_switch_bg_DEFAULT: {
        value: '{semanticTokens.colors.control_secondary_neutral_DEFAULT}',
        description: 'Subtle background of the Switch control.',
      },
      control_switch_bg_info_active: {
        value: '{semanticTokens.colors.control_primary_info_DEFAULT}',
        description: 'Active background of the Switch control.',
      },
      control_switch_bg_success_active: {
        value: '{semanticTokens.colors.control_primary_success_DEFAULT}',
        description: 'Active background of the Switch control.',
      },
      control_switch_handle: {
        value: '{baseTokens.colors.gray.white}',
        description: 'Handle color of the Switch control.',
      },
      control_tertiary_info_DEFAULT: {
        value: 'transparent',
        description: 'Background of the accent and link-lookalike tertiary control.',
      },
      control_tertiary_info_active: {
        value: info.opaqueAt(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the accent and link-lookalike tertiary control.',
      },
      control_tertiary_info_hover: {
        value: info.opaqueAt(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the accent and link-lookalike tertiary control.',
      },
      control_tertiary_invert_DEFAULT: {
        value: 'transparent',
        description: 'Background of the inverted version of the tertiary control.',
      },
      control_tertiary_invert_active: {
        value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the inverted version of the tertiary control.',
      },
      control_tertiary_invert_hover: {
        value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
        description: 'Hover state of the inverted version of the tertiary control.',
      },
      control_tertiary_neutral_DEFAULT: {
        value: 'transparent',
        description: 'Background of the regular tertiary control.',
      },
      control_tertiary_neutral_active: {
        value: neutral.opaqueAt(L_BG_SECONDARY_ACTIVE),
        description: 'Active (selected) state of the regular tertiary control.',
      },
      control_tertiary_neutral_hover: {
        value: neutral.opaqueAt(L_BG_SECONDARY_HOVER),
        description: 'Hover state of the regular tertiary control.',
      },
      control_text_primary_DEFAULT: {
        value: '{semanticTokens.colors.text_primary_DEFAULT}',
        description: 'Primary text color for form controls.',
      },
      control_text_primary_invert: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Inverted primary text color for form controls.',
      },
      control_text_secondary_DEFAULT: {
        value: '{semanticTokens.colors.text_secondary_DEFAULT}',
        description: 'Secondary text color for form controls.',
      },
      control_text_secondary_invert: {
        value: '{semanticTokens.colors.text_secondary_invert}',
        description: 'Inverted secondary text color for form controls.',
      },
      control_text_tertiary: {
        value: '{semanticTokens.colors.text_secondary_DEFAULT}',
        description: 'Tertiary text color for form controls.',
      },
      date_picker_border_range_comparison: {
        value: highlight.at(L_BORDER_ACTIVE),
        description: 'Border color of the second period for the comparison mode in the DatePicker.',
      },
      date_picker_cell_DEFAULT: {
        value: neutral.at(L_BG_PRIMARY),
        description: 'Default date-picker cell background.',
      },
      date_picker_cell_active_DEFAULT: {
        value: focus.at(L_BG_BUTTON),
        description: 'Active (selected) date-picker cell background.',
      },
      date_picker_cell_active_hover: {
        value: focus.at(L_BG_BUTTON_HOVER),
        description: 'Hover for the active (selected) date-picker cell background.',
      },
      date_picker_cell_comparison_active_DEFAULT: {
        value: highlight.at(L_BG_BUTTON),
        description: 'Active (selected) date-picker cell background for comparison periods.',
      },
      date_picker_cell_comparison_active_hover: {
        value: highlight.at(L_BG_BUTTON_HOVER),
        description: 'Hover for the active (selected) date-picker cell background for comparison periods.',
      },
      date_picker_cell_current_DEFAULT: {
        value: neutral.opaqueAt(L_BORDER_ACTIVE),
        description: 'Color for marking the cell with the current date, month or year in the date-picker.',
      },
      date_picker_cell_current_invert: {
        value: neutral.opaqueInvAt(L_INV_BORDER_PRIMARY),
        description: 'Color for marking the active cell with the current date, month or year in the date-picker.',
      },
      date_picker_cell_hover: {
        value: neutral.at(L_BG_PRIMARY_HOVER),
        description: 'Hover state of the default date-picker cell background.',
      },
      date_picker_cell_range_DEFAULT: {
        value: focus.at(L_BG_SELECTED),
        description: 'Background for the cell which is included in the date range in the date-picker.',
      },
      date_picker_cell_range_hover: {
        value: focus.at(L_BG_SELECTED_HOVER),
        description: 'Hover state of the background for the cell which is included in the date range in the date-picker.',
      },
      dot_bg: {
        value: '{semanticTokens.colors.icon_primary_warning_DEFAULT}',
        description: 'Background color of the Dot.',
      },
      dot_text: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Text color of the Dot.',
      },
      dropdown_menu_item_DEFAULT: {
        value: neutral.at(L_BG_PRIMARY),
        description: 'Default background color for the list item in the dropdown-menu.',
      },
      dropdown_menu_item_hover: {
        value: neutral.opaqueAt(L_BG_PRIMARY_HOVER),
        description: 'Hover state of the default background color for the list item in the dropdown-menu.',
      },
      dropdown_menu_item_selected_DEFAULT: {
        value: focus.opaqueAt(L_BG_SELECTED),
        description: 'Active (selected) state of the default background color for the list item in the dropdown-menu.',
      },
      dropdown_menu_item_selected_box_shadow: {
        value: '{semanticTokens.colors.control_primary_info_DEFAULT}',
        description: 'Border color of the selected item in the DropdownMenu.',
      },
      dropdown_menu_item_selected_hover: {
        value: focus.opaqueAt(L_BG_SELECTED_HOVER),
        description: 'Hover state for the selected state of the default background color for the list item in the dropdown-menu.',
      },
      feature_popover_bg_accent: {
        value: '{semanticTokens.colors.bg.primary.highlight}',
        description: 'Background of the FeaturePopover with accent theme.',
      },
      feature_popover_bg_neutral: {
        value: neutral.at(L_INV_BG_PRIMARY),
        description: 'Background of the FeaturePopover with neutral theme.',
      },
      feature_popover_dot_accent: {
        value: '{semanticTokens.colors.bg_primary_highlight}',
        description: 'Fill color of the FeaturePopover.Spot with accent theme.',
      },
      feature_popover_dot_neutral: {
        value: '{semanticTokens.colors.bg.primary.highlight}',
        description: 'Fill color of the FeaturePopover.Spot with neutral theme.',
      },
      feature_popover_dot_outer_border_accent: {
        value: '{semanticTokens.colors.bg.primary.highlight}',
        description: 'Outer border color of the FeaturePopover.Spot with accent theme.',
      },
      feature_popover_dot_outer_border_neutral: {
        value: '{semanticTokens.colors.feature_popover_dot_neutral}',
        description: 'Outer border color of the FeaturePopover.Spot with neutral theme.',
      },

      feature_popover_text_DEFAULT: {
        value: '{semanticTokens.colors.text_primary_DEFAULT}',
        description: 'Text color of the FeaturePopover.',
      },
      feature_popover_text_invert: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Inverted text color of the FeaturePopover.',
      },
      footer_bg: {
        value: '{semanticTokens.colors.page.bg}',
        description: 'Background fill for the product page footer.',
      },
      header_bg: { value: '{semanticTokens.colors.page.bg}' },
      header_border_primary: { value: '{semanticTokens.colors.border.primary}' },
      header_border_secondary: { value: '{semanticTokens.colors.border.primary}' },
      icon_non_interactive: {
        value: neutral.opaqueAt(L_ICON_NON_INTERACTIVE),
        description: 'Color for the default non-interactive icon.',
      },
      icon_primary_critical_DEFAULT: {
        value: error.opaqueAt(L_ICON_PRIMARY),
        description: 'Semantic error icon.',
      },
      icon_primary_critical_hover_active: {
        value: error.opaqueAt(L_ICON_PRIMARY_HOVER),
        description: 'Red background color for the hover and active states of the primary critical icon. It’s created using a CSS filter with a brightness(0.8), applied to the red-500 color.',
      },
      icon_primary_info_DEFAULT: {
        value: info.opaqueAt(L_ICON_PRIMARY),
        description: 'Primary link-lookalike icon.',
      },
      icon_primary_info_hover_active: {
        value: info.opaqueAt(L_ICON_PRIMARY_HOVER),
        description: 'Blue background color for the hover and active states of the primary link-lookalike icon. It’s created using a CSS filter with a brightness(0.8), applied to the blue-500 color.',
      },
      icon_primary_invert_DEFAULT: {
        value: neutral.opaqueInvAt(L_INV_ICON_PRIMARY),
        description: 'Inverted version of the primary icon.',
      },
      icon_primary_invert_hover_active: {
        value: neutral.opaqueInvAt(L_INV_ICON_PRIMARY_HOVER),
        description: 'Hover and active (selected) states of the inverted version of the primary icon.',
      },
      icon_primary_neutral_DEFAULT: {
        value: neutral.opaqueAt(L_ICON_PRIMARY),
        description: 'Default icon weight on normal backgrounds—stronger emphasis than secondary icons.',
      },
      icon_primary_neutral_hover_active: {
        value: neutral.opaqueAt(L_ICON_PRIMARY_HOVER),
        description: 'Gray background color for the hover and active states of the primary neutral icon. It’s created using a CSS filter with a brightness(0.8), applied to the gray-500 color.',
      },
      icon_primary_success_DEFAULT: {
        value: success.opaqueAt(L_ICON_PRIMARY),
        description: 'Semantic success icon.',
      },
      icon_primary_success_hover_active: {
        value: success.opaqueAt(L_ICON_PRIMARY_HOVER),
        description: 'Green background color for the hover and active states of the primary success icon. It’s created using a CSS filter with a brightness(0.8), applied to the green-500 color.',
      },
      icon_primary_warning_DEFAULT: {
        value: warning.opaqueAt(L_ICON_PRIMARY + 0.15),
        description: 'Semantic warning icon.',
      },
      icon_primary_warning_hover_active: {
        value: warning.opaqueAt(L_ICON_PRIMARY_HOVER),
        description: 'Orange background color for the hover and active states of the primary warning icon. It’s created using a CSS filter with a brightness(0.8), applied to the orange-500 color.',
      },
      icon_secondary_critical_DEFAULT: {
        value: error.opaqueAt(L_ICON_SECONDARY),
        description: 'Softer error icon for dense UI or inline hints where the surface should stay calm.',
      },
      icon_secondary_critical_hover_active: {
        value: error.opaqueAt(L_ICON_SECONDARY_HOVER),
        description: 'Red background color for the hover and active states of the secondary critical icon. It’s created using a CSS filter with a brightness(0.8), applied to the red-300 color.',
      },
      icon_secondary_info_DEFAULT: {
        value: info.opaqueAt(L_ICON_SECONDARY),
        description: 'Secondary link-lookalike icon.',
      },
      icon_secondary_info_hover_active: {
        value: info.at(L_ICON_SECONDARY_HOVER),
        description: 'Blue background color for the hover and active states of the secondary link-lookalike icon. It’s created using a CSS filter with a brightness(0.8), applied to the blue-300 color.',
      },
      icon_secondary_neutral_DEFAULT: {
        value: neutral.opaqueAt(L_ICON_SECONDARY),
        description: 'De-emphasized icons for dense layouts (tables, tertiary actions).',
      },
      icon_secondary_neutral_hover_active: {
        value: neutral.opaqueAt(L_ICON_SECONDARY_HOVER),
        description: 'Gray background color for the hover and active states of the secondary neutral icon. It’s created using a CSS filter with a brightness(0.8), applied to the gray-300 color.',
      },
      icon_secondary_success_DEFAULT: {
        value: success.opaqueAt(L_ICON_SECONDARY),
        description: 'Softer success icon for dense UI or inline hints where the surface should stay calm.',
      },
      icon_secondary_success_hover_active: {
        value: success.opaqueAt(L_ICON_SECONDARY_HOVER),
        description: 'Green background color for the hover and active states of the secondary success icon. It’s created using a CSS filter with a brightness(0.8), applied to the green-300 color.',
      },
      icon_secondary_warning_DEFAULT: {
        value: warning.opaqueAt(L_ICON_SECONDARY),
        description: 'Softer warning icon for dense UI or inline hints where the surface should stay calm.',
      },
      icon_secondary_warning_hover_active: {
        value: warning.opaqueAt(L_ICON_SECONDARY_HOVER),
        description: 'Orange background color for the hover and active states of the secondary warning icon. It’s created using a CSS filter with a brightness(0.8), applied to the orange-300 color.',
      },
      illustration_blue: {
        value: blue.at(0.84),
        description: '⚠️ Use only for illustrations.',
      },
      illustration_border: {
        value: colors.gray['500'].value,
        description: 'Border color for illustrations.',
      },
      illustration_gray: {
        value: colors.gray['100'].value,
        description: 'Gray fill color for illustrations.',
      },
      illustration_green: {
        value: green.at(0.812),
        description: '⚠️ Use only for illustrations.',
      },
      illustration_orange: {
        value: orange.at(0.823),
        description: '⚠️ Use only for illustrations.',
      },
      illustration_pink: {
        value: pink.at(0.76),
        description: '⚠️ Use only for illustrations.',
      },
      illustration_red: {
        value: red.at(0.737),
        description: '⚠️ Use only for illustrations.',
      },
      illustration_salad: {
        value: salad.at(0.922),
        description: '⚠️ Use only for illustrations.',
      },
      illustration_violet: {
        value: violet.at(0.709),
        description: '⚠️ Use only for illustrations.',
      },
      illustration_yellow: {
        value: yellow.at(0.924),
        description: '⚠️ Use only for illustrations.',
      },
      keyboard_focus_invalid_outline: {
        value: error.opaqueAt(L_BORDER_FOCUS),
        description: 'Color for keyboard focus outline styles for elements with invalid state.',
      },
      keyboard_focus_invert_outline: {
        value: 'oklch(1 0 0 / 0.7)',
        description: 'Color for keyboard focus outline styles to use on the dark and color background.',
      },
      keyboard_focus_outline: {
        value: focus.opaqueAt(L_BORDER_FOCUS),
        description: 'Color for default keyboard focus outline styles.',
      },
      keyboard_focus_valid_outline: {
        value: success.opaqueAt(L_BORDER_FOCUS),
        description: 'Color for keyboard focus outline styles for elements with valid state.',
      },
      neighbor_location_invert: {
        value: 'oklch(0 0 0 / 0.5)',
        description: 'Inverted border of the components that are combined with neighbor-location property.',
      },
      neighbor_location_neutral: {
        value: 'oklch(1 0 0 / 0.5)',
        description: 'Neutral border of the components that are combined with neighbor-location property.',
      },
      notice_bubble_bg_critical: {
        value: '{semanticTokens.colors.bg_primary_critical}',
        description: 'Critical background of the NoticeBubble.',
      },
      notice_bubble_bg_info: {
        value: '{semanticTokens.colors.bg_primary_invert_DEFAULT}',
        description: 'Background of the NoticeBubble.',
      },
      overlay_limitation_primary: {
        value: `oklch(from ${neutral.at(0.97)} l c h / 0.7)`,
        description: 'Use as a primary cover of the content under the messages about limitations.',
      },
      overlay_limitation_secondary: {
        value: 'oklch(1 0 0 / 0.85)',
        description: 'Use as a secondary cover of the content under the messages about limitations.',
      },
      overlay_primary: {
        value: neutral.opaqueAt(0.74),
        description: 'Use for cover the content under the modal dialogs.',
      },
      overlay_secondary: {
        value: neutral.opaqueAt(0.8),
        description: 'Use for the secondary modal dialogs that were opened upon the other modal dialogs.',
      },
      page_bg: {
        value: neutral.at(0.97),
        description: 'Background fill for the whole product page.',
      },
      control_pills_bg_hover: {
        value: '{semanticTokens.colors.control_secondary_neutral_DEFAULT}',
        description: 'Hover state of the Pills background.',
      },
      control_pills_bg_normal: {
        value: '{semanticTokens.colors.control_secondary_neutral_DEFAULT}',
        description: 'Background of the Pills in its normal state.',
      },
      control_pills_bg_selected: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Background of the selected Pill.',
      },
      control_pills_border_DEFAULT: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Border color of the Pills in its normal state.',
      },
      progress_bar_bg_DEFAULT: {
        value: neutral.at(L_BG_LIGHT),
        description: 'Background color of the ProgressBar.',
      },
      progress_bar_bg_hover: {
        value: neutral.at(L_BG_MEDIUM),
        description: 'Hover state of the background color of the ProgressBar.',
      },
      progress_bar_bg_invert_DEFAULT: {
        value: neutral.at(L_INV_BG_LIGHT),
        description: 'Inverted version of the background color of the ProgressBar.',
      },
      progress_bar_bg_invert_hover: {
        value: neutral.at(L_INV_BG_MEDIUM),
        description: 'Hover state for the inverted version of the background color of the ProgressBar.',
      },
      progress_bar_pattern_gradient: {
        value: 'linear-gradient(-45deg, oklch(0 0 0 / 0.1) 25%, {semanticTokens.colors.progress.bar.bg} 0%, {semanticTokens.colors.progress.bar.bg} 50%, oklch(0 0 0 / 0.1) 0%, oklch(0 0 0 / 0.1) 75%, {semanticTokens.colors.progress.bar.bg} 0%)',
        description: 'Null value gradient for the ProgressBar.',
      },

      progress_bar_value_bg: {
        value: 'oklch(1 0 0)',
        description: 'Base value background for the ProgressBar. It is used to create gradients for the values.',
      },
      progress_bar_value_gradient: {
        value: `linear-gradient(-45deg, oklch(from ${highlight.at(0.74)} calc(l - 0.05) c h) 25%, ${highlight.at(0.74)} 0%, ${highlight.at(0.74)} 50%, oklch(from ${highlight.at(0.74)} calc(l - 0.05) c h) 0%, oklch(from ${highlight.at(0.74)} calc(l - 0.05) c h) 75%, ${highlight.at(0.74)} 0%)`,
        description: 'Value with gradient for the ProgressBar.',
      },
      scroll_area_dropdown_menu_bottom: {
        value: 'linear-gradient(to top, {baseTokens.colors.white} 34.38%, transparent 100%)',
        description: 'Bottom-to-top fade shadow for the ScrollArea inside the DropdownMenu.',
      },
      scroll_area_dropdown_menu_left: {
        value: 'linear-gradient(to right, {baseTokens.colors.white} 34.38%, transparent 100%)',
        description: 'Left-to-right fade shadow for the ScrollArea inside the DropdownMenu.',
      },
      scroll_area_dropdown_menu_right: {
        value: 'linear-gradient(to left, {baseTokens.colors.white} 34.38%, transparent 100%)',
        description: 'Right-to-left fade shadow for the ScrollArea inside the DropdownMenu.',
      },
      scroll_area_dropdown_menu_top: {
        value: 'linear-gradient(to bottom, {baseTokens.colors.white} 34.38%, transparent 100%)',
        description: 'Top-to-bottom fade shadow for the ScrollArea inside the DropdownMenu.',
      },
      scroll_area_shadow_bottom: {
        value: `linear-gradient(to top, oklch(from ${colors.gray['800'].value} l c h / 0.08) 20.55%, transparent 100%)`,
        description: 'Bottom-to-top fade shadow for the ScrollArea.',
      },
      scroll_area_shadow_left: {
        value: `linear-gradient(to right, oklch(from ${colors.gray['800'].value} l c h / 0.08) 20.55%, transparent 100%)`,
        description: 'Left-to-right fade shadow for the ScrollArea.',
      },
      scroll_area_shadow_right: {
        value: `linear-gradient(to left, oklch(from ${colors.gray['800'].value} l c h / 0.08) 20.55%, transparent 100%)`,
        description: 'Right-to-left fade shadow for the ScrollArea.',
      },
      scroll_area_shadow_top: {
        value: `linear-gradient(to bottom, oklch(from ${colors.gray['800'].value} l c h / 0.08) 20.55%, transparent 100%)`,
        description: 'Top-to-bottom fade shadow for the ScrollArea.',
      },
      scroll_bar_background: {
        value: neutral.opaqueAt(L_BORDER_PRIMARY),
        description: 'Background color for ScrollBar.',
      },
      sidebar_nav_bg: {
        value: '{semanticTokens.colors.page.bg}',
        description: 'Background fill for the product page sidebar.',
      },
      sidebar_nav_border: {
        value: '{semanticTokens.colors.border.primary}',
        description: 'Color for the border of the page sidebar.',
      },
      sidebar_nav_control_active: {
        value: neutral.opaqueAt(L_BG_SECONDARY_ACTIVE),
        description: 'Sidebar navigation row active background.',
      },
      sidebar_nav_control_hover: {
        value: neutral.opaqueAt(L_BG_SECONDARY_HOVER),
        description: 'Sidebar navigation row hover background.',
      },
      sidebar_nav_control_icon_active: {
        value: neutral.at(L_ICON_PRIMARY_HOVER),
        description: 'Sidebar navigation icon color for the active item.',
      },
      sidebar_nav_control_icon_normal: {
        value: neutral.at(L_ICON_PRIMARY),
        description: 'Sidebar navigation icon color.',
      },
      sidebar_nav_control_text_active: {
        value: neutral.at(L_TEXT_PRIMARY),
        description: 'Sidebar navigation label color for the active item.',
      },
      sidebar_nav_control_text_normal: {
        value: neutral.at(L_TEXT_SECONDARY),
        description: 'Sidebar navigation label color.',
      },
      skeleton_bg_DEFAULT: {
        value: neutral.at(L_BG_SKELETON),
        description: 'Default color for the Skeleton.',
      },
      skeleton_bg_invert: {
        value: neutral.at(L_INV_BG_SKELETON),
        description: 'Inverted version of the default color for the Skeleton.',
      },
      spin_bg_DEFAULT: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Track color of the Spin loader.',
      },
      spin_bg_invert: {
        value: '{semanticTokens.colors.border_primary_invert}',
        description: 'Inverted track color of the Spin loader.',
      },
      control_tab_line_border_DEFAULT: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Border color of the TabLine in its normal state.',
      },
      control_tab_line_border_active: {
        value: '{semanticTokens.colors.border_info_active}',
        description: 'Border color of the TabLine in its active state.',
      },
      control_tab_line_border_hover: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Border color of the TabLine in its hover state.',
      },
      table_border_accent: {
        value: neutral.opaqueAt(L_BORDER_PRIMARY),
        description: 'Accent borders in the Table: for the accordion in the table and for the header of the secondary table.',
      },
      table_td_cell_DEFAULT: {
        value: neutral.at(L_BG_PRIMARY),
        description: 'Background of the default cell in the Table.',
      },
      table_td_cell_accordion: {
        value: neutral.at(L_BG_PRIMARY),
        description: 'Background of the cell used for Accordion or actions row, in the Table.',
      },
      table_td_cell_active: {
        value: neutral.at(L_BG_PRIMARY_ACTIVE),
        description: 'Background of the default active cell in the Table.',
      },
      table_td_cell_critical_DEFAULT: {
        value: error.at(L_BG_SECONDARY),
        description: 'Background of the cell with critical information in the Table.',
      },
      table_td_cell_critical_active: {
        value: error.at(L_BG_SECONDARY_ACTIVE),
        description: 'Background of the active cell with critical information in the Table.',
      },
      table_td_cell_critical_hover: {
        value: error.at(L_BG_SECONDARY_HOVER),
        description: 'Background of the hovered cell with critical information in the Table.',
      },
      table_td_cell_hover: {
        value: neutral.at(L_BG_PRIMARY_HOVER),
        description: 'Background of the default hovered cell in the Table.',
      },
      table_td_cell_new_DEFAULT: {
        value: success.at(L_BG_SECONDARY),
        description: 'Background of the cell with new information in the Table.',
      },
      table_td_cell_new_active: {
        value: success.at(L_BG_SECONDARY_ACTIVE),
        description: 'Background of the active cell with new information in the Table.',
      },
      table_td_cell_new_hover: {
        value: success.at(L_BG_SECONDARY_HOVER),
        description: 'Background of the hovered cell with new information in the Table.',
      },
      table_td_cell_selected_DEFAULT: {
        value: info.at(L_BG_SECONDARY),
        description: 'Background of the selected cell in the Table.',
      },
      table_td_cell_selected_active: {
        value: info.at(L_BG_SECONDARY_ACTIVE),
        description: 'Background of the active selected cell in the Table.',
      },
      table_td_cell_selected_hover: {
        value: info.at(L_BG_SECONDARY_HOVER),
        description: 'Background of the hovered selected cell in the Table.',
      },
      table_td_cell_unread: {
        value: neutral.at(L_BG_SECONDARY),
        description: 'Background of the unread cell in the Table.',
      },
      table_td_cell_warning_DEFAULT: {
        value: warning.at(L_BG_SECONDARY),
        description: 'Background of the cell with warning information in the Table.',
      },
      table_td_cell_warning_active: {
        value: warning.at(L_BG_SECONDARY_ACTIVE),
        description: 'Background of the active cell with warning information in the Table.',
      },
      table_td_cell_warning_hover: {
        value: warning.at(L_BG_SECONDARY_HOVER),
        description: 'Background of the hovered cell with warning information in the Table.',
      },
      table_th_gradient: {
        value: `linear-gradient(to right, transparent 0%, ${colors.gray['100'].value} 100%)`,
        description: 'Background gradient for sorting icon that absolute positioned in the table head.',
      },
      table_th_primary_cell_DEFAULT: {
        value: neutral.at(L_BG_SECONDARY),
        description: 'Background of the header cell in the primary Table.',
      },
      table_th_primary_cell_active: {
        value: neutral.at(L_BG_SECONDARY_ACTIVE),
        description: 'Background of the active header cell in the primary Table.',
      },
      table_th_primary_cell_hover: {
        value: neutral.at(L_BG_SECONDARY_ACTIVE),
        description: 'Background of the hovered header cell in the primary Table.',
      },
      table_th_secondary_cell: {
        value: neutral.at(L_BG_PRIMARY),
        description: 'Background of the header cell in the secondary Table.',
      },
      tag_additional_bg_hover_active: {
        value: '{semanticTokens.colors.bg_primary_neutral_hover}',
        description: 'Hover and active states of the additional Tag background.',
      },
      tag_additional_bg_normal: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Background of the additional Tag in its normal state.',
      },
      tag_additional_border: {
        value: '{semanticTokens.colors.border_primary_DEFAULT}',
        description: 'Border color of the additional Tag.',
      },
      tag_additional_text: {
        value: '#6a6c6a',
        description: 'Text color for the additional tag.',
      },
      tag_additional_bg_invert_normal: {
        value: 'transparent',
        description: 'Additional tag on bold or dark backgrounds—minimal fill in the normal state.',
      },
      tag_additional_bg_invert_hover_active: {
        value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
        description: 'Hover and active states of the additional tag on dark backgrounds.',
      },
      tag_additional_text_invert: {
        value: neutral.opaqueInvAt(L_INV_TEXT_SECONDARY),
        description: 'Text color for the additional tag on dark backgrounds.',
      },
      tag_additional_border_invert: {
        value: '{semanticTokens.colors.border_primary_invert}',
        description: 'Inverted border color of the additional Tag.',
      },
      tag_primary_bg_hover_active: {
        value: '{semanticTokens.colors.bg_primary_neutral_hover}',
        description: 'Hover and active states of the primary Tag background.',
      },
      tag_primary_bg_normal: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Background of the primary Tag in its normal state.',
      },
      tag_primary_blue_hover_active: {
        value: '#dcd8ff',
        description: 'Blue background color for the hover and active states of the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the blue-500 color with 0.3 opacity on the white background underneath. ',
      },
      tag_primary_blue_normal: {
        value: '#e7e5ff',
        description: 'Blue background color for primary tag. It’s built with CSS filter brightness(150%) that was applied to blue-500 color with 0.2 opacity on the white background underneath.',
      },
      tag_primary_blue_text: {
        value: '#5c53d9',
        description: 'Blue text for the primary blue tag.',
      },
      tag_primary_border: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Border color of the primary Tag.',
      },
      tag_primary_gray_hover_active: {
        value: '#e2e3e2',
        description: 'Gray background color for the hover and active states of the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the gray-500 color with 0.3 opacity on the white background underneath.',
      },
      tag_primary_gray_normal: {
        value: '#ecedec',
        description: 'Gray background color for the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the gray-500 color with 0.2 opacity on the white background underneath.',
      },
      tag_primary_gray_text: {
        value: '#6a6c6a',
        description: 'Gray text for the primary gray tag.',
      },
      tag_primary_green_hover_active: {
        value: '#b3eedd',
        description: 'Green background color for the hover and active states of the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the green-500 color with 0.3 opacity on the white background underneath.',
      },
      tag_primary_green_normal: {
        value: '#ccf4e8',
        description: 'Green background color for the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the green-500 color with 0.2 opacity on the white background underneath.',
      },
      tag_primary_green_text: {
        value: '#00845f',
        description: 'Green text for the primary green tag.',
      },
      tag_primary_orange_hover_active: {
        value: '#ffceb3',
        description: 'Orange background color for the hover and active states of the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the orange-500 color with 0.3 opacity on the white background underneath.',
      },
      tag_primary_orange_normal: {
        value: '#ffdecc',
        description: 'Orange background color for the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the orange-500 color with 0.2 opacity on the white background underneath.',
      },
      tag_primary_orange_text: {
        value: '#b83c00',
        description: 'Orange text for the primary orange tag.',
      },
      tag_primary_red_hover_active: {
        value: '#ffbdbf',
        description: 'Red background color for the hover and active states of the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the red-500 color with 0.3 opacity on the white background underneath.',
      },
      tag_primary_red_normal: {
        value: '#ffd3d4',
        description: 'Red background color for the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the red-500 color with 0.2 opacity on the white background underneath.',
      },
      tag_primary_red_text: {
        value: '#c7161b',
        description: 'Red text for the primary red tag.',
      },
      tag_primary_violet_hover_active: {
        value: '#ecc5ff',
        description: 'Violet background color for the hover and active states of the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the violet-500 color with 0.3 opacity on the white background underneath.',
      },
      tag_primary_violet_normal: {
        value: '#f2d8ff',
        description: 'Violet background color for the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the violet-500 color with 0.2 opacity on the white background underneath.',
      },
      tag_primary_violet_text: {
        value: '#8029ec',
        description: 'Violet text for the primary violet tag.',
      },
      tag_primary_bg_invert_hover_active: {
        value: neutral.opaqueInvAt(L_INV_BG_PRIMARY_HOVER),
        description: 'Hover and active states of the primary tag on dark backgrounds.',
      },
      tag_primary_bg_invert_normal: {
        value: neutral.opaqueInvAt(L_INV_BG_PRIMARY),
        description: 'Primary tag on bold or dark backgrounds—translucent fill for contrast in the normal state.',
      },
      tag_primary_text_invert: {
        value: '#ffffff',
        description: 'Text color for the primary tag on dark backgrounds.',
      },
      tag_primary_yellow_hover_active: {
        value: '#fcd8b3',
        description: 'Yellow background color for the hover and active states of the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the yellow-500 color with 0.3 opacity on the white background underneath.',
      },
      tag_primary_yellow_normal: {
        value: '#fde5cc',
        description: 'Yellow background color for the primary tag. It’s created using a CSS filter with a brightness of 150%, applied to the yellow-500 color with 0.2 opacity on the white background underneath.',
      },
      tag_primary_yellow_text: {
        value: '#a35400',
        description: 'Yellow text for the primary yellow tag.',
      },
      tag_secondary_border_DEFAULT: {
        value: '{semanticTokens.colors.border_secondary_DEFAULT}',
        description: 'Border color of the secondary Tag.',
      },
      tag_secondary_border_invert: {
        value: '{semanticTokens.colors.border_secondary_invert}',
        description: 'Inverted border color of the secondary Tag.',
      },
      tag_secondary_text: {
        value: '#6a6c6a',
        description: 'Text color for the default secondary tag.',
      },
      tag_secondary_bg_hover_active: {
        value: '#f4f5f5',
        description: 'Hover and active (selected) states of the background color for the default secondary tag.',
      },
      tag_secondary_bg_normal: {
        value: '#ffffff',
        description: 'Background color for the default secondary tag.',
      },
      tag_secondary_bg_invert_hover_active: {
        value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
        description: 'Hover and active states of the secondary tag on dark backgrounds.',
      },
      tag_secondary_bg_invert_normal: {
        value: 'transparent',
        description: 'Secondary/outline tag on bold or dark backgrounds—minimal fill in the normal state.',
      },
      tag_secondary_text_invert: {
        value: neutral.opaqueInvAt(L_INV_TEXT_SECONDARY),
        description: 'Text color for the secondary tag on dark backgrounds.',
      },
      text_advertising: {
        value: advertising.at(L_TEXT_PRIMARY),
        description: 'Promotional or sponsored emphasis (ads, marketing callouts)—use sparingly so it stays noticeable.',
      },
      text_critical_DEFAULT: {
        value: error.at(L_TEXT_SECONDARY),
        description: 'Text associated with critical states and data.',
      },
      text_critical_hover_active: {
        value: error.at(L_TEXT_SECONDARY_HOVER),
        description: 'Hover and active states for the text associated with critical states and data.',
      },
      text_hint_DEFAULT: {
        value: neutral.opaqueAt(L_TEXT_SECONDARY),
        description: 'Supplementary helper text near controls (short guidance), distinct from placeholder text inside inputs.',
      },
      text_hint_hover_active: {
        value: neutral.opaqueAt(L_TEXT_SECONDARY_HOVER),
        description: 'Hover and active states of the hint link text.',
      },
      text_hint_invert_DEFAULT: {
        value: neutral.at(L_INV_TEXT_SECONDARY),
        description: 'Inverted version of the hint link text.',
      },
      text_hint_invert_hover_active: {
        value: neutral.at(L_INV_TEXT_SECONDARY_HOVER),
        description: 'Hover and active states of the inverted version of the hint link text.',
      },
      text_large_critical_DEFAULT: {
        value: error.at(L_TEXT_ACCENT),
        description: 'Text with font-size ≥20px associated with critical states and data.',
      },
      text_large_critical_hover_active: {
        value: error.at(L_TEXT_ACCENT),
        description: 'Hover and active states of the text with font-size ≥20px associated with critical states and data.',
      },
      text_large_info_DEFAULT: {
        value: info.at(L_TEXT_ACCENT),
        description: 'Link text with font-size ≥20px.',
      },
      text_large_info_hover_active: {
        value: info.at(L_TEXT_ACCENT),
        description: 'Hover and active states of the link text with font-size ≥20px.',
      },
      text_large_secondary: {
        value: '{semanticTokens.colors.text.secondary}',
        description: 'Secondary text. Use with font-size ≥20px.',
      },
      text_large_success_DEFAULT: {
        value: success.at(L_TEXT_ACCENT),
        description: 'Text with font-size ≥20px associated with success states and data.',
      },
      text_large_success_hover_active: {
        value: success.at(L_TEXT_ACCENT),
        description: 'Hover and active states of the text with font-size ≥20px associated with success states and data.',
      },
      text_link_primary_DEFAULT: {
        value: '{semanticTokens.colors.text_primary_DEFAULT}',
        description: 'Default primary link color.',
      },
      text_link_primary_hover_active: {
        value: '{semanticTokens.colors.text_primary_DEFAULT}',
        description: 'Hover and active states for the primary link.',
      },
      text_link_primary_underline: {
        value: neutral.at(0.86),
        description: 'Underline color for the primary link.',
      },
      text_link_primary_invert_DEFAULT: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Inverted version of the primary link. Use on dark and colored sbackground only.',
      },
      text_link_primary_invert_hover_active: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Hover and active states of the inverted version of the primary link. Use on dark and colored backgrounds only.',
      },
      text_link_secondary_DEFAULT: {
        value: '{semanticTokens.colors.text_secondary_DEFAULT}',
        description: 'Default secondary link color.',
      },
      text_link_secondary_hover_active: {
        value: '{semanticTokens.colors.text_secondary_DEFAULT}',
        description: 'Hover and active states for the secondary link.',
      },
      text_link_accent_DEFAULT: {
        value: info.at(L_TEXT_ACCENT),
        description: 'Default accent link color.',
      },
      text_link_accent_hover_active: {
        value: info.at(L_TEXT_ACCENT),
        description: 'Hover and active states for the accent link.',
      },
      text_link_visited: {
        value: violet.at(L_TEXT_PRIMARY),
        description: 'Visited link state so users can tell visited destinations apart from default links.',
      },
      text_placeholder: {
        value: neutral.opaqueAt(L_TEXT_PLACEHOLDER),
        description: 'Placeholder text color for inputs and fields.',
      },
      text_primary_DEFAULT: {
        value: neutral.opaqueAt(L_TEXT_PRIMARY),
        description: 'Default body and UI copy; strongest reading emphasis for primary content.',
      },
      text_primary_invert: {
        value: neutral.opaqueInvAt(L_INV_TEXT_PRIMARY),
        description: 'Inverted version of the primary text.',
      },
      text_secondary_DEFAULT: {
        value: neutral.opaqueAt(L_TEXT_SECONDARY),
        description: 'Supporting text: captions, metadata, hints in flowing copy—visually quieter than primary body text.',
      },
      text_secondary_invert: {
        value: neutral.opaqueInvAt(L_INV_TEXT_SECONDARY),
        description: 'Inverted version of the secondary text.',
      },
      text_success_DEFAULT: {
        value: success.at(L_TEXT_SECONDARY),
        description: 'Text associated with success states and data.',
      },
      text_success_hover_active: {
        value: success.at(L_TEXT_SECONDARY_HOVER),
        description: 'Hover and active states for the text associated with success states and data.',
      },
      tooltip_bg_default: {
        value: neutral.at(L_BG_PRIMARY),
        description: 'Default Tooltip background.',
      },
      tooltip_bg_invert: {
        value: neutral.at(L_INV_BG_PRIMARY),
        description: 'Inverted version of the default Tooltip background.',
      },
      tooltip_bg_warning: {
        value: error.at(L_BG_LIGHT),
        description: 'Warning Tooltip background.',
      },
      tooltip_border_invert: {
        value: neutral.opaqueInvAt(L_INV_BORDER_SECONDARY),
        description: 'Border of the Tooltip with dark theme.',
      },
      tooltip_text: {
        value: '{semanticTokens.colors.text_primary_DEFAULT}',
        description: 'Text color of the default Tooltip.',
      },
      tooltip_text_invert: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Text color of the inverted Tooltip.',
      },
      wizard_bg: {
        value: '{semanticTokens.colors.bg_primary_neutral_DEFAULT}',
        description: 'Main background of the Wizard.',
      },
      wizard_sidebar_bg: {
        value: '{semanticTokens.colors.control_primary_advertising_DEFAULT}',
        description: 'Background of the Wizard sidebar.',
      },
      wizard_sidebar_control_DEFAULT: {
        value: '{semanticTokens.colors.control_primary_advertising_DEFAULT}',
        description: 'Background of the control in the Wizard sidebar in its normal state.',
      },
      wizard_sidebar_control_active: {
        value: '{semanticTokens.colors.control_primary_advertising_active}',
        description: 'Active state of the control in the Wizard sidebar.',
      },
      wizard_sidebar_control_hover: {
        value: '{semanticTokens.colors.control_primary_advertising_hover}',
        description: 'Hover state of the control in the Wizard sidebar.',
      },
      wizard_sidebar_text_primary: {
        value: '{semanticTokens.colors.text_primary_invert}',
        description: 'Primary text color in the Wizard sidebar.',
      },
      wizard_sidebar_text_secondary: {
        value: '{semanticTokens.colors.text_secondary_invert}',
        description: 'Secondary text color in the Wizard sidebar.',
      },
    },
    opacity: {
      disabled: {
        value: '0.4',
        description: 'Use for adding opacity to elements and controls in disabled state.',
      },
    },
    shadows: {
      box_shadow_card_DEFAULT: {
        value: `0px 0px 1px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}, 0px 1px 3px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
        description: 'Default shadow of the Card.',
      },
      box_shadow_card_hover: {
        value: `3px 3px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
        description: 'Hover state for the shadow of the Card with hover state.',
      },
      box_shadow_pills_item_selected: {
        value: `0px 0px 1px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}, 0px 1px 3px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
        description: 'Shadow of the selected Pills item.',
      },
      box_shadow_dnd: {
        value: `3px 3px 30px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
        description: 'Shadow for show that element are being drag-and-drop.',
      },
      box_shadow_modal: {
        value: `0px 1px 5px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
        description: 'Default shadow if the Modal window.',
      },
      box_shadow_popper: {
        value: `1px 1px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
        description: 'Default shadow of all Poppers, Dropdowns and Tooltips.',
      },
      box_shadow_float_control_DEFAULT: {
        value: `0px 0px 1px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}, 0px 1px 5px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
      },
      box_shadow_float_control_hover: {
        value: `3px 3px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
      },
      keyboard_focus_invalid: {
        value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.invalid.outline}',
        description: 'Keyboard focus styles for elements with invalid state.',
      },
      keyboard_focus_valid: {
        value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.valid.outline}',
        description: 'Keyboard focus styles for elements with valid state.',
      },
      keyboard_focus_invert: {
        value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.invert.outline}',
        description: 'Keyboard focus styles for use on dark backgrounds.',
      },
      keyboard_focus_DEFAULT: {
        value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.outline}',
        description: 'Default keyboard focus box-shadow styles.',
      },
    },
    sizes: {
      form_control_s: {
        value: `${SCALE_INDENT * 5}px`,
        description: 'Small size of the controls. Use it for small interactive addons. Avoid using it with the main actions.',
      },
      form_control_m: {
        value: `${SCALE_INDENT * 8}px`,
        description: 'Default size of the controls.',
      },
      form_control_l: {
        value: `${SCALE_INDENT * 11}px`,
        description: 'Large size of the controls.',
      },
    },
    spacing: {
      content_inset_inline: {
        value: `${SCALE_INDENT * 3}px`,
        description: 'Horizontal inset for content inside controls and surfaces.',
      },
      content_gap_small: {
        value: `${SCALE_INDENT}px`,
        description: 'Small gap between content elements inside controls.',
      },
      content_gap_medium: {
        value: `${SCALE_INDENT * 1.5}px`,
        description: 'Medium gap between content elements inside controls.',
      },
      content_gap_large: {
        value: `${SCALE_INDENT * 2}px`,
        description: 'Large gap between content elements inside controls.',
      },
    },
    radii: {
      'addon': {
        value: `${RADII.small}px`,
        description: 'Use for rounding addons and small controls like Checkbox.',
      },
      'badge': {
        value: `${RADII.medium}px`,
        description: 'Corner radius for Badge and compact status chips—aligned with small rounded controls.',
      },
      'chart': {
        value: `${RADII['extra-small']}px`,
        description: 'Use for rounding big and small charts like bar, histogram and others.',
      },
      'checkbox': {
        value: `${RADII.medium}px`,
        description: 'Use for rounding Checkbox.',
      },
      'control': {
        value: `${RADII.medium}px`,
        description: 'Use for rounding all form controls: Button, FilterTrigger, Input, Textarea, Pills, etc.',
      },
      'counter': {
        value: `${RADII.large}px`,
        description: 'Rounding for counter/numeric capsules used as small indicators.',
      },
      'modal': {
        value: `${RADII.large + 2}px`,
        description: 'Use for rounding all kinds of big modal dialogs (e.g., Modal, Wizard).',
      },
      'pills': {
        value: `${RADII.medium}px`,
        description: 'Use for rounding Pills.',
      },
      'popper': {
        value: `${RADII.medium}px`,
        description: 'Use for rounding all kinds of poppers and dropdowns.',
      },
      'progress-bar': {
        value: `${RADII.medium}px`,
        description: 'Use for rounding bars: ProgressBar, SliderBar, etc.',
      },
      'surface': {
        value: `${RADII.medium + 2}px`,
        description: 'Use for rounding surfaces like Card, blocks, widgets, Notice, etc.',
      },
      'switch': {
        value: `${RADII['extra-large']}px`,
        description: 'Pill-shaped rounding for Switch geometry (full rounded track/thumb pattern).',
      },
      'tag': {
        value: `${RADII['extra-large']}px`,
        description: 'Corner radius for Tag (including removable tags) in dense UI.',
      },
    },
    durations: {
      switch: {
        value: '{baseTokens.durations.extra-fast}',
        description: 'Use for small controls like Switch or Slider.',
      },
      popper: {
        value: '{baseTokens.durations.fast}',
        description: 'Use for components based on popper like Tooltip, Dropdown or Filter trigger.',
      },
      control: {
        value: '{baseTokens.durations.fast}',
        description: 'Use for small controls like Checkbox or Radio.',
      },
      modal: {
        value: '{baseTokens.durations.fast}',
        description: 'Use for Modal, Fullscreen Modal, Side panel or other kind of windows.',
      },
      accordion: {
        value: '{baseTokens.durations.fast}',
        description: 'Use for Accordion.',
      },
      counter: {
        value: '{baseTokens.durations.fast}',
        description: 'Use for Summary or Counter.',
      },
    },
    zIndexes: {
      'z-index-deep': { value: '-999' },
      'z-index-overlay': { value: '500' },
      'z-index-modal': { value: '900' },
      'z-index-popper': { value: '700' },
      'z-index-dropdown': { value: '750' },
      'z-index-tooltip': { value: '800' },
      'z-index-notice-bubble': { value: '999' },
    },
  },
  featureHighlight: {
    'bg_primary_feature-highlight_DEFAULT': {
      value: '{baseTokens.colors.gray.white}',
      description: 'Primary background for highlighted controls.',
    },
    'bg_primary_feature-highlight_hover_active': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.50}, {baseTokens.colors.blue.75})',
      description: 'Primary background for hover and active (selected) state of highlighted controls.',
    },
    'bg_secondary_feature-highlight': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.50}, {baseTokens.colors.blue.75})',
      description: 'Secondary background for the highlighted message.',
    },
    'border_feature-highlight_DEFAULT': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.200}, {baseTokens.colors.blue.200})',
      description: 'Primary border for highlighted controls.',
    },
    'border_feature-highlight_active': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.300}, {baseTokens.colors.blue.300})',
      description: 'Primary border for the active state of highlighted controls.',
    },
    'border_feature-highlight_secondary': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.300}, {baseTokens.colors.blue.300})',
      description: 'Secondary border for highlighted controls.',
    },
    'control_primary_feature-highlight_DEFAULT': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.400}, {baseTokens.colors.blue.300})',
      description: 'Background of the highlighted primary control.',
    },
    'control_primary_feature-highlight_hover': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.400}, {baseTokens.colors.blue.300})',
      description: 'Hover state of the highlighted primary control.',
    },
    'control_primary_feature-highlight_active': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.400}, {baseTokens.colors.blue.400})',
      description: 'Active (selected) state of the highlighted primary control.',
    },
    'control_secondary_feature-highlight_DEFAULT': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.50}, {baseTokens.colors.blue.50})',
      description: 'Background of the highlighted secondary control.',
    },
    'control_secondary_feature-highlight_hover': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.100}, {baseTokens.colors.blue.100})',
      description: 'Hover state of the highlighted secondary control.',
    },
    'control_secondary_feature-highlight_active': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.100}, {baseTokens.colors.blue.100})',
      description: 'Active (selected) state of the highlighted secondary control.',
    },
    'text_feature-highlight_DEFAULT': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.500}, {baseTokens.colors.blue.500})',
      description: 'Text for highlighted features.',
    },
    'text_feature-highlight_hover_active': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.500}, {baseTokens.colors.blue.500})',
      description: 'Text for hover and active states of highlighted features.',
    },
    'icon_primary_feature-highlight_DEFAULT': {
      value: highlight.at(L_ICON_PRIMARY),
      description: 'Primary highlighted icon.',
    },
    'icon_primary_feature-highlight_hover_active': {
      value: highlight.at(L_ICON_PRIMARY_HOVER),
      description: 'Violet background color for the hover and active states of the primary highlighted icon. It’s created using a CSS filter with a brightness(0.8), applied to the violet-500 color.',
    },
    'keyboard_focus_feature-highlight_DEFAULT': {
      value: '3px solid {featureHighlight.keyboard.focus.feature-highlight.outline}',
      description: 'Keyboard focus styles for highlighted controls.',
    },
    'keyboard_focus_feature-highlight_outline': {
      value: 'linear-gradient(90deg in oklch, {baseTokens.colors.violet.300}, {baseTokens.colors.blue.400})',
      description: 'Color for keyboard focus outline styles for highlighted controls.',
    },
  },
  deprecates: {
    violet: {
      400: colors.violet['400'],
      500: colors.violet['500'],
    },
    blue: {
      400: colors.blue['400'],
      500: colors.blue['500'],
    },
    table: { td: { cell: { actions: { accordion: { value: '{semanticTokens.colors.table_td_cell_accordion}' } } } } },
    keyboard: { focus: { outline: { invert: { value: '{semanticTokens.colors.keyboard_focus_invert_outline}' } } } },
    border: {
      tooltip: { invert: { value: '{semanticTokens.colors.tooltip_border_invert}' } },
      table: { accent: { value: '{semanticTokens.colors.table_border_accent}' } },
      date: { picker: { range: { comparison: { value: '{semanticTokens.colors.date_picker_border_range_comparison}' } } } },
    },
    tooltip: {
      default: { value: '{semanticTokens.colors.tooltip_bg_default}' },
      invert: { value: '{semanticTokens.colors.tooltip_bg_invert}' },
      warning: { value: '{semanticTokens.colors.tooltip_bg_warning}' },
    },
    feature: {
      popover: {
        bg: {
          DEFAULT: { value: '{semanticTokens.colors.feature_popover_bg_accent}' },
        },
        dot: {
          DEFAULT: { value: '{semanticTokens.colors.feature_popover_dot_accent}' },
          outer: { border: { value: '{semanticTokens.colors.feature_popover_dot_outer_border_accent}' } },
          neutral: {
            outer: { border: { value: '{semanticTokens.colors.feature_popover_dot_outer_border_neutral}' } },
          },
        },
        accent: {
          bg: { value: '{semanticTokens.colors.feature_popover_bg_accent}' },
          dot: { outer: { border: { value: '{semanticTokens.colors.feature_popover_dot_outer_border_accent}' } } },
        },
        neutral: {
          bg: { value: '{semanticTokens.colors.feature_popover_bg_neutral}' },
          dot: { outer: { border: { value: '{semanticTokens.colors.feature_popover_dot_outer_border_neutral}' } } },
        },
      },
    },
    slider: {
      rating: {
        normal: { value: '{semanticTokens.colors.control_slider_rating_icon_DEFAULT}' },
        hover: { active: { value: '{semanticTokens.colors.control_slider_rating_icon_hover_active}' } },
      },
    },
    dot: {
      notification: {
        bg: { value: '{semanticTokens.colors.dot_bg}' },
        text: { value: '{semanticTokens.colors.dot_text}' },
      },
    },
    radio: {
      border: { value: '{semanticTokens.colors.control_radio_border}' },
      bg: {
        normal: { value: '{semanticTokens.colors.control_radio_bg_normal}' },
        selected: { value: '{semanticTokens.colors.control_radio_bg_selected}' },
      },
    },
    text: {
      link: {
        DEFAULT: { value: '{semanticTokens.colors.text_link_primary_DEFAULT}' },
        hover: { active: { value: '{semanticTokens.colors.text_link_primary_hover_active}' } },
        invert: {
          DEFAULT: { value: '{semanticTokens.colors.text_link_primary_invert_DEFAULT}' },
          hover: { value: '{semanticTokens.colors.text_link_primary_invert_hover_active}' },
        },
      },
    },
  },
};

type FontSize = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800';
type LineHeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800';
type FontWeight = 'semi-bold' | 'bold' | 'regular' | 'medium';
type Spacing = '05' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '14' | '20' | '24' | '30';
type Radii = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
type Breakpoints = 'extra-small' | 'small' | 'medium' | 'large';
type Durations = 'extra-slow' | 'slow' | 'medium' | 'fast' | 'extra-fast';

type Value<T = string> = {
  value: T;
  description?: string;
};

export type BaseTokens = {
  colors: Record<Colors, Record<Lightness, Value>> & Record<'gray', Record<'white', Value>> & Record<'white' | 'black' | 'transparent' | 'current', Value>;
  fonts: { base: Value };
  fontSizes: Record<FontSize, Value>;
  lineHeights: Record<LineHeight, Value>;
  fontWeights: Record<FontWeight, Value>;
  letterSpacings: { compact: Value };
  spacing: { scale: { indent: Value } } & Record<Spacing, Value>;
  radii: Record<Radii, Value>;
  breakpoints: Record<Breakpoints, Value>;
  durations: Record<Durations, Value>;
};

type FlattenPaths<T> = T extends object
  ? { [K in keyof T]-?: K extends string | number
      ? T[K] extends Value
        ? K
        : `${K}_${FlattenPaths<T[K]>}`
      : never
    }[keyof T]
  : '';

export type SemanticTokens = {
  colors: Record<FlattenPaths<SemanticColors>, Value>;
  opacity: {
    disabled: Value;
  };
  shadows: Record<FlattenPaths<SemanticShadows>, Value>;
  sizes: Record<`form_control_${'s' | 'm' | 'l'}`, Value>;
  spacing: {
    content_inset_inline: Value;
    content_gap_small: Value;
    content_gap_medium: Value;
    content_gap_large: Value;
  };
  radii: {
    'addon': Value;
    'badge': Value;
    'chart': Value;
    'checkbox': Value;
    'counter': Value;
    'tag': Value;
    'switch': Value;
    'control': Value;
    'progress-bar': Value;
    'surface': Value;
    'popper': Value;
    'modal': Value;
    'pills': Value;
  };
  durations: {
    switch: Value;
    popper: Value;
    control: Value;
    modal: Value;
    accordion: Value;
    counter: Value;
  };
  zIndexes: Record<string, Value>;
};

export type Theme = {
  baseTokens: BaseTokens;
  semanticTokens: SemanticTokens;
  featureHighlight: Record<FlattenPaths<FeatureHighlight>, Value>;
  deprecates: Deprecates;
};

type SemanticColors = {
  bg: {
    primary: {
      neutral: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      info: Value;
      success: Value;
      critical: Value;
      warning: Value;
      highlight: Value;
      advertising: Value;
      muted: Value;
      invert: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
    };
    secondary: {
      neutral: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      info: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      success: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      critical: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      warning: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      highlight: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      advertising: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
    };
    highlight: {
      results: Value;
      focus: Value;
    };
  };
  text: {
    primary: {
      DEFAULT: Value;
      invert: Value;
    };
    secondary: {
      DEFAULT: Value;
      invert: Value;
    };
    placeholder: Value;
    success: {
      DEFAULT: Value;
      hover: {
        active: Value;
      };
    };
    critical: {
      DEFAULT: Value;
      hover: {
        active: Value;
      };
    };
    link: {
      primary: {
        DEFAULT: Value;
      };
      primary_hover: {
        active: Value;
      };
      primary_underline: Value;
      primary_invert: {
        DEFAULT: Value;
      };
      primary_invert_hover: {
        active: Value;
      };
      secondary: {
        DEFAULT: Value;
      };
      secondary_hover: {
        active: Value;
      };
      accent: {
        DEFAULT: Value;
      };
      accent_hover: {
        active: Value;
      };
    };
    link_visited: Value;
    hint: {
      DEFAULT: Value;
      hover: {
        active: Value;
      };
      invert: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
    };
    large: {
      secondary: Value;
      info: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      success: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      critical: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
    };
    advertising: Value;
  };
  border: {
    primary: {
      DEFAULT: Value;
      invert: Value;
    };
    secondary: {
      DEFAULT: Value;
      invert: Value;
    };
    info: {
      DEFAULT: Value;
      active: Value;
    };
    success: {
      DEFAULT: Value;
      active: Value;
    };
    critical: {
      DEFAULT: Value;
      active: Value;
      pattern: Value;
    };
    warning: {
      DEFAULT: Value;
      active: Value;
    };
  };
  control: {
    switch: {
      bg: {
        DEFAULT: Value;
        info: {
          active: Value;
        };
        success: {
          active: Value;
        };
      };
      handle: Value;
    };
    slider: {
      bar: {
        bg: {
          DEFAULT: Value;
          hover: Value;
        };
        value: {
          bg: Value;
        };
      };
      knob: {
        bg: {
          DEFAULT: Value;
        };
        border: {
          DEFAULT: Value;
          hover: Value;
        };
      };
    };
    slider_rating: {
      icon: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
    };
    checkbox: {
      border: Value;
      checkmark: Value;
      bg: {
        normal: Value;
        selected: Value;
      };
      button: {
        border: {
          DEFAULT: Value;
          selected: Value;
        };
        bg: {
          normal: Value;
          hover: Value;
          selected: {
            DEFAULT: Value;
            hover: Value;
          };
        };
      };
    };
    radio: {
      border: Value;
      bg: {
        normal: Value;
        selected: Value;
      };
    };
    primary: {
      info: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      success: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      critical: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      brand: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      advertising: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      invert: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
    };
    secondary: {
      neutral: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      info: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      invert: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
    };
    tertiary: {
      neutral: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      info: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      invert: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
    };
    text: {
      primary: {
        DEFAULT: Value;
        invert: Value;
      };
      secondary: {
        DEFAULT: Value;
        invert: Value;
      };
      tertiary: Value;
    };
    select: {
      trigger: {
        normal: Value;
        hover: Value;
        active: Value;
      };
    };
    pills: {
      bg: {
        normal: Value;
        hover: Value;
        selected: Value;
      };
      border: {
        DEFAULT: Value;
      };
    };
    tab_line: {
      border: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
    };
  };
  icon: {
    primary: {
      neutral: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      info: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      success: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      critical: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      warning: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      invert: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
    };
    secondary: {
      neutral: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      info: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      success: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      critical: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
      warning: {
        DEFAULT: Value;
        hover: {
          active: Value;
        };
      };
    };
    non: {
      interactive: Value;
    };
  };
  illustration: {
    red: Value;
    orange: Value;
    yellow: Value;
    salad: Value;
    green: Value;
    blue: Value;
    violet: Value;
    pink: Value;
    gray: Value;
    border: Value;
  };
  date: {
    picker: {
      cell: {
        DEFAULT: Value;
        current: {
          DEFAULT: Value;
          invert: Value;
        };
        hover: Value;
        range: {
          DEFAULT: Value;
          hover: Value;
        };
        active: {
          DEFAULT: Value;
          hover: Value;
        };
        comparison: {
          active: {
            DEFAULT: Value;
            hover: Value;
          };
        };
      };
      border: {
        range: {
          comparison: Value;
        };
      };
    };
  };
  dropdown: {
    menu: {
      item: {
        DEFAULT: Value;
        hover: Value;
        selected: {
          DEFAULT: Value;
          hover: Value;
          box_shadow: Value;
        };
      };
    };
  };
  feature: {
    popover: {
      bg: {
        accent: Value;
        neutral: Value;
      };
      dot: {
        accent: Value;
        neutral: Value;
        outer_border: {
          accent: Value;
          neutral: Value;
        };
      };
      text: {
        DEFAULT: Value;
        invert: Value;
      };
    };
  };
  progress: {
    bar: {
      bg: {
        DEFAULT: Value;
        hover: Value;
        invert: {
          DEFAULT: Value;
          hover: Value;
        };
      };
      value: {
        gradient: Value;
        bg: Value;
      };
      pattern: {
        gradient: Value;
      };
    };
  };
  skeleton: {
    bg: {
      DEFAULT: Value;
      invert: Value;
    };
  };
  table: {
    border: {
      accent: Value;
    };
    th: {
      primary: {
        cell: {
          DEFAULT: Value;
          hover: Value;
          active: Value;
        };
      };
      secondary: {
        cell: Value;
      };
      gradient: Value;
    };
    td: {
      cell: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
        unread: Value;
        accordion: Value;
        selected: {
          DEFAULT: Value;
          hover: Value;
          active: Value;
        };
        new: {
          DEFAULT: Value;
          hover: Value;
          active: Value;
        };
        critical: {
          DEFAULT: Value;
          hover: Value;
          active: Value;
        };
        warning: {
          DEFAULT: Value;
          hover: Value;
          active: Value;
        };
      };
    };
  };
  brand: {
    primary: Value;
    secondary: Value;
    gradient: Value;
    pinterest: Value;
    instagram: Value;
    youtube: Value;
    facebook: Value;
    linkedIn: Value;
    twitter: Value;
    google: {
      blue: Value;
      green: Value;
      my: {
        business: Value;
      };
    };
  };
  keyboard: {
    focus: {
      outline: Value;
      invalid: {
        outline: Value;
      };
      valid: {
        outline: Value;
      };
      invert: {
        outline: Value;
      };
    };
  };
  overlay: {
    primary: Value;
    secondary: Value;
    limitation: {
      primary: Value;
      secondary: Value;
    };
  };
  tooltip: {
    bg: {
      default: Value;
      warning: Value;
      invert: Value;
    };
    text: Value;
    text_invert: Value;
    border: {
      invert: Value;
    };
  };
  neighbor: {
    location: {
      neutral: Value;
      invert: Value;
    };
  };
  scroll: {
    area: {
      shadow: {
        left: Value;
        right: Value;
        top: Value;
        bottom: Value;
      };
      dropdown: {
        menu: {
          left: Value;
          right: Value;
          bottom: Value;
          top: Value;
        };
      };
    };
    bar: {
      background: Value;
    };
  };
  tag: {
    primary: {
      bg: {
        normal: Value;
        hover: {
          active: Value;
        };
        invert: {
          normal: Value;
          hover: {
            active: Value;
          };
        };
      };
      border: Value;
      text_invert: Value;
      gray: {
        normal: Value;
        hover: {
          active: Value;
        };
        text: Value;
      };
      blue: {
        normal: Value;
        hover: {
          active: Value;
        };
        text: Value;
      };
      green: {
        normal: Value;
        hover: {
          active: Value;
        };
        text: Value;
      };
      orange: {
        normal: Value;
        hover: {
          active: Value;
        };
        text: Value;
      };
      red: {
        normal: Value;
        hover: {
          active: Value;
        };
        text: Value;
      };
      violet: {
        normal: Value;
        hover: {
          active: Value;
        };
        text: Value;
      };
      yellow: {
        normal: Value;
        hover: {
          active: Value;
        };
        text: Value;
      };
    };
    secondary: {
      border: {
        DEFAULT: Value;
        invert: Value;
      };
      text: Value;
      text_invert: Value;
      bg: {
        normal: Value;
        hover: {
          active: Value;
        };
        invert: {
          normal: Value;
          hover: {
            active: Value;
          };
        };
      };
    };
    additional: {
      bg: {
        normal: Value;
        hover: {
          active: Value;
        };
        invert: {
          normal: Value;
          hover: {
            active: Value;
          };
        };
      };
      border: Value;
      border_invert: Value;
      text: Value;
      text_invert: Value;
    };
  };
  chart: {
    data: {
      success: Value;
      warning: Value;
      critical: Value;
    };
    palette: {
      order: {
        1: Value;
        2: Value;
        3: Value;
        4: Value;
        5: Value;
        6: Value;
        7: Value;
        8: Value;
        9: Value;
        10: Value;
        11: Value;
        12: Value;
        13: Value;
        14: Value;
        15: Value;
        16: Value;
        17: Value;
        18: Value;
        19: Value;
        20: Value;
        21: Value;
        22: Value;
        23: Value;
        24: Value;
        total: {
          amount: Value;
        };
        other: {
          data: Value;
        };
        null: Value;
      };
    };
    grid: {
      line: Value;
      x: {
        axis: Value;
      };
      y: {
        accent: {
          hover: {
            line: Value;
          };
        };
      };
      text: {
        label: Value;
      };
      bar: {
        chart: {
          hover: Value;
          base: {
            bg: Value;
          };
        };
      };
      period: {
        bg: Value;
        pattern: Value;
      };
      border: Value;
    };
    x: {
      axis: {
        accent: {
          period: {
            active: Value;
          };
          data: {
            start: {
              tracking: Value;
            };
          };
        };
      };
    };
  };
  header: {
    bg: Value;
    border: {
      primary: Value;
      secondary: Value;
    };
  };
  page: {
    bg: Value;
  };
  footer: {
    bg: Value;
  };
  sidebar: {
    nav: {
      bg: Value;
      border: Value;
      control: {
        hover: Value;
        active: Value;
        text: {
          normal: Value;
          active: Value;
        };
        icon: {
          normal: Value;
          active: Value;
        };
      };
    };
  };
  badge: {
    bg: {
      admin: Value;
      alpha: Value;
      beta: Value;
      new: Value;
      soon: Value;
      unavailable: Value;
      invert: Value;
    };
    text: {
      primary: {
        DEFAULT: Value;
        invert: Value;
      };
      secondary: Value;
    };
  };
  dot: {
    bg: Value;
    text: Value;
  };
  notice_bubble: {
    bg: {
      critical: Value;
      info: Value;
    };
  };
  spin: {
    bg: {
      DEFAULT: Value;
      invert: Value;
    };
  };
  wizard: {
    bg: Value;
    sidebar: {
      bg: Value;
      control: {
        DEFAULT: Value;
        hover: Value;
        active: Value;
      };
      text: {
        primary: Value;
        secondary: Value;
      };
    };
  };
};

type SemanticShadows = {
  box: {
    shadow: {
      card: {
        DEFAULT: Value;
        hover: Value;
      };
      pills: {
        item: {
          selected: Value;
        };
      };
      dnd: Value;
      modal: Value;
      popper: Value;
      float: {
        control: {
          DEFAULT: Value;
          hover: Value;
        };
      };
    };
  };
  keyboard: {
    focus: {
      DEFAULT: Value;
      invalid: Value;
      valid: Value;
      invert: Value;
    };
  };
};

export type FeatureHighlight = {
  bg: {
    primary: {
      'feature-highlight': { DEFAULT: Value; hover: { active: Value } };
    };
    secondary: {
      'feature-highlight': Value;
    };
  };
  border: {
    'feature-highlight': { DEFAULT: Value; active: Value; secondary: Value };
  };
  control: {
    primary: {
      'feature-highlight': { DEFAULT: Value; active: Value; hover: Value };
    };
    secondary: {
      'feature-highlight': { DEFAULT: Value; active: Value; hover: Value };
    };
  };
  text: {
    'feature-highlight': { DEFAULT: Value; hover: { active: Value } };
  };
  icon: {
    primary: {
      'feature-highlight': { DEFAULT: Value; hover: { active: Value } };
    };
  };
  keyboard: {
    focus: {
      'feature-highlight': {
        DEFAULT: Value;
        outline: Value;
      };
    };
  };
};

type Deprecates = {
  violet: { 400: Value; 500: Value };
  blue: { 400: Value; 500: Value };
  table: { td: { cell: { actions: { accordion: Value } } } };
  keyboard: { focus: { outline: { invert: Value } } };
  border: {
    tooltip: { invert: Value };
    table: { accent: Value };
    date: { picker: { range: { comparison: Value } } };
  };
  tooltip: {
    default: Value;
    invert: Value;
    warning: Value;
  };
  feature: {
    popover: {
      bg: { DEFAULT: Value };
      dot: {
        DEFAULT: Value;
        outer: { border: Value };
        neutral: { outer: { border: Value } };
      };
      accent: {
        bg: Value;
        dot: { outer: { border: Value } };
      };
      neutral: {
        bg: Value;
        dot: { outer: { border: Value } };
      };
    };
  };
  slider: {
    rating: {
      normal: Value;
      hover: { active: Value };
    };
  };
  dot: {
    notification: {
      bg: Value;
      text: Value;
    };
  };
  radio: {
    border: Value;
    bg: {
      normal: Value;
      selected: Value;
    };
  };
  text: {
    link: {
      DEFAULT: Value;
      hover: { active: Value };
      invert: {
        DEFAULT: Value;
        hover: Value;
      };
    };
  };
};

export type BasicColorKeys = `${keyof BaseTokens['colors']}-${Lightness}`;

type ReplaceUnderscore<T extends string> = T extends `${infer Prefix}_${infer Suffix}` ? `${Prefix}-${ReplaceUnderscore<Suffix>}` : T;

export type SemanticColorKeys = Exclude<ReplaceUnderscore<FlattenPaths<SemanticColors>>, `${string}-DEFAULT`>;
