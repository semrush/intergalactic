import type {
  Colors,
  Lightness,
} from './colors/index.ts';
import {
  colors, semanticColors, baseColors, L_BG_PRIMARY, L_BG_PRIMARY_HOVER,
  L_BG_BUTTON,
  L_BG_BUTTON_ACTIVE, L_BG_BUTTON_HOVER, L_BG_BUTTON_STRONG, L_BG_BUTTON_STRONG_ACTIVE, L_BG_BUTTON_STRONG_HOVER,
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
} from './colors/index.ts';

const { neutral, brand, error, advertising, focus, highlight, info, success, warning } = semanticColors;
const { green, violet, blue, pink, gray, red, orange, salad, yellow } = baseColors;

const SCALE_INDENT = 4;

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
      'scale-indent': {
        value: `${SCALE_INDENT}px`,
        description: 'Base denominator of the design system.',
      },
      '05x': {
        value: `${SCALE_INDENT / 2}px`,
        description: '2px',
      },
      '1x': {
        value: `${SCALE_INDENT}px`,
        description: '4px',
      },
      '2x': {
        value: `${SCALE_INDENT * 2}px`,
        description: '8px',
      },
      '3x': {
        value: `${SCALE_INDENT * 3}px`,
        description: '12px',
      },
      '4x': {
        value: `${SCALE_INDENT * 4}px`,
        description: '16px',
      },
      '5x': {
        value: `${SCALE_INDENT * 5}px`,
        description: '20px',
      },
      '6x': {
        value: `${SCALE_INDENT * 6}px`,
        description: '24px',
      },
      '8x': {
        value: `${SCALE_INDENT * 8}px`,
        description: '32px',
      },
      '10x': {
        value: `${SCALE_INDENT * 10}px`,
        description: '40px',
      },
      '14x': {
        value: `${SCALE_INDENT * 14}px`,
        description: '56px',
      },
      '20x': {
        value: `${SCALE_INDENT * 20}px`,
        description: '80px',
      },
      '24x': {
        value: `${SCALE_INDENT * 24}px`,
        description: '96px',
      },
      '30x': {
        value: `${SCALE_INDENT * 30}px`,
        description: '120px',
      },
    },
    radii: {
      'extra-small': { value: '2px' },
      'small': { value: '4px' },
      'medium': { value: '6px' },
      'large': { value: '12px' },
      'extra-large': { value: '24px' },
    },
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
      bg: {
        primary: {
          neutral: {
            DEFAULT: {
              value: neutral.at(L_BG_PRIMARY),
              description: 'Primary background of the interface which contains the main data and information.',
            },
            hover: {
              value: neutral.at(L_BG_PRIMARY_HOVER),
              description: 'Hover state of the primary background of the interface which contains the main data and information.',
            },
            active: {
              value: neutral.at(L_BG_PRIMARY_ACTIVE),
              description: 'Active (selected) state of the primary background of the interface which contains the main data and information.',
            },
          },
          info: {
            value: info.at(L_BG_STRONG),
            description: 'Accent background of the message with regular information.',
          },
          success: {
            value: success.at(L_BG_STRONG),
            description: 'Accent background of the message or banner with information about the successful result.',
          },
          critical: {
            value: error.at(L_BG_STRONG),
            description: 'Accent background of a message or a banner with a critical information.',
          },
          warning: {
            value: warning.at(0.7),
            description: 'Accent background of a message or a banner with a warning information.',
          },
          highlight: {
            value: highlight.at(L_BG_MEDIUM),
            description: 'Accent background of the information you want to highlight.',
          },
          advertising: {
            value: advertising.at(L_BG_STRONG),
            description: 'Accent background for the advertising banners and controls.',
          },
          muted: {
            value: neutral.at(L_BG_STRONG),
            description: 'Accented muted background for a message with regular information.',
          },
          invert: {
            DEFAULT: {
              value: neutral.at(L_INV_BG_PRIMARY),
              description: 'Inverted version of the primary background of the interface that contains the main data and information.',
            },
            hover: {
              value: neutral.at(L_INV_BG_PRIMARY_HOVER),
              description: 'Hover state for the inverted version of the primary background of the interface that contains the main data and information.',
            },
            active: {
              value: neutral.at(L_INV_BG_PRIMARY_ACTIVE),
              description: 'Active (selected) state for the inverted version of the primary background of the interface that contains the main data and information.',
            },
          },
        },
        secondary: {
          neutral: {
            DEFAULT: {
              value: neutral.at(L_BG_SECONDARY),
              description: 'Secondary background of the interface which contains the main data and information.',
            },
            hover: {
              value: neutral.at(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the secondary background of the interface which contains the main data and information.',
            },
            active: {
              value: neutral.at(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the secondary background of the interface which contains the main data and information.',
            },
          },
          info: {
            DEFAULT: {
              value: info.at(L_BG_LIGHT),
              description: 'Secondary background of a message with regular information.',
            },
            hover: {
              value: info.at(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the secondary background of a message with regular information.',
            },
            active: {
              value: info.at(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the secondary background of a message with regular information.',
            },
          },
          success: {
            DEFAULT: {
              value: success.at(L_BG_LIGHT),
              description: 'Secondary background of the message with success information you want to accent.',
            },
            hover: {
              value: success.at(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the secondary background of the message with success information you want to accent.',
            },
            active: {
              value: success.at(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the secondary background of the message with success information you want to accent.',
            },
          },
          critical: {
            DEFAULT: {
              value: error.at(L_BG_LIGHT),
              description: 'Secondary background of the message with critical information you want to accent.',
            },
            hover: {
              value: error.at(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the secondary background of the message with critical information you want to accent.',
            },
            active: {
              value: error.at(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the secondary background of the message with critical information you want to accent.',
            },
          },
          warning: {
            DEFAULT: {
              value: warning.at(L_BG_SECONDARY),
              description: 'Secondary background of the message with warning information you want to accent.',
            },
            hover: {
              value: warning.at(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the secondary background of the message with warning information you want to accent.',
            },
            active: {
              value: warning.at(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the secondary background of the message with critical information you want to accent.',
            },
          },
          highlight: {
            DEFAULT: {
              value: highlight.at(L_BG_SECONDARY),
              description: 'Secondary background of the information you want to highlight.',
            },
            hover: {
              value: highlight.at(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the secondary background of the information you want to highlight.',
            },
            active: {
              value: highlight.at(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the secondary background of the information you want to highlight.',
            },
          },
          advertising: {
            DEFAULT: {
              value: advertising.at(L_BG_SECONDARY),
              description: 'Secondary background for the advertising message you want to accent.',
            },
            hover: {
              value: advertising.at(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the secondary background for the advertising message you want to accent.',
            },
            active: {
              value: advertising.at(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the secondary background for the advertising message you want to accent.',
            },
          },
        },
        highlight: {
          results: {
            value: highlight.at(L_BG_SECONDARY_ACTIVE),
            description: 'Highlighting the search results.',
          },
          focus: {
            value: focus.at(L_BG_SECONDARY_ACTIVE),
            description: 'Focusing values in the input.',
          },
        },
      },
      text: {
        primary: {
          DEFAULT: {
            value: neutral.opaqueAt(L_TEXT_PRIMARY),
            description: 'Primary text.',
          },
          invert: {
            value: neutral.at(L_INV_TEXT_PRIMARY),
            description: 'Inverted version of the primary text.',
          },
        },
        secondary: {
          DEFAULT: {
            value: neutral.opaqueAt(L_TEXT_SECONDARY),
            description: 'Secondary text.',
          },
          invert: {
            value: neutral.at(L_INV_TEXT_SECONDARY),
            description: 'Inverted version of the secondary text.',
          },
        },
        placeholder: {
          value: neutral.opaqueAt(L_TEXT_PLACEHOLDER),
          description: 'Placeholder text only.',
        },
        success: {
          DEFAULT: {
            value: success.at(L_TEXT_SECONDARY),
            description: 'Text associated with success states and data.',
          },
          hover: {
            active: {
              value: success.at(L_TEXT_SECONDARY_HOVER),
              description: 'Hover and active states for the text associated with success states and data.',
            },
          },
        },
        critical: {
          DEFAULT: {
            value: error.at(L_TEXT_SECONDARY),
            description: 'Text associated with critical states and data.',
          },
          hover: {
            active: {
              value: error.at(L_TEXT_SECONDARY_HOVER),
              description: 'Hover and active states for the text associated with critical states and data.',
            },
          },
        },
        link: {
          DEFAULT: {
            value: info.at(L_TEXT_SECONDARY),
            description: 'Link text.',
          },
          hover: {
            active: {
              value: info.at(L_TEXT_SECONDARY_HOVER),
              description: 'Hover and active states for the link text.',
            },
          },
          invert: {
            DEFAULT: {
              value: info.at(L_INV_TEXT_SECONDARY),
              description: 'Inverted version of the link text. Use on dark background only.',
            },
            hover: {
              value: info.at(L_INV_TEXT_SECONDARY_HOVER),
              description: 'Hover and active states of the inverted version of the link text. Use on dark background only.',
            },
          },
          visited: {
            value: violet.at(L_TEXT_SECONDARY),
            description: 'Visited link text.',
          },
        },
        hint: {
          DEFAULT: {
            value: neutral.opaqueAt(L_TEXT_SECONDARY),
            description: 'Hint link text.',
          },
          hover: {
            active: {
              value: neutral.opaqueAt(L_TEXT_SECONDARY_HOVER),
              description: 'Hover and active states of the hint link text.',
            },
          },
          invert: {
            DEFAULT: {
              value: neutral.at(L_INV_TEXT_SECONDARY),
              description: 'Inverted version of the hint link text.',
            },
            hover: {
              active: {
                value: neutral.at(L_INV_TEXT_SECONDARY_HOVER),
                description: 'Hover and active states of the inverted version of the hint link text.',
              },
            },
          },
        },
        large: {
          secondary: {
            value: '{semanticTokens.colors.text.secondary}',
            description: 'Secondary text. Use with font-size ≥20px.',
          },
          info: {
            DEFAULT: {
              value: '{semanticTokens.colors.text.link}',
              description: 'Link text with font-size ≥20px.',
            },
            hover: {
              active: {
                value: '{semanticTokens.colors.text.link.hover.active}',
                description: 'Hover and active states of the link text with font-size ≥20px.',
              },
            },
          },
          success: {
            DEFAULT: {
              value: '{semanticTokens.colors.text.success}',
              description: 'Text with font-size ≥20px associated with success states and data.',
            },
            hover: {
              active: {
                value: '{semanticTokens.colors.text.success.hover.active}',
                description: 'Hover and active states of the text with font-size ≥20px associated with success states and data.',
              },
            },
          },
          critical: {
            DEFAULT: {
              value: '{semanticTokens.colors.text.critical}',
              description: 'Text with font-size ≥20px associated with critical states and data.',
            },
            hover: {
              active: {
                value: '{semanticTokens.colors.text.critical.hover.active}',
                description: 'Hover and active states of the text with font-size ≥20px associated with critical states and data.',
              },
            },
          },
        },
        advertising: {
          value: advertising.at(L_TEXT_PRIMARY),
          description: 'Advertising text.',
        },
      },
      border: {
        primary: {
          DEFAULT: {
            value: neutral.opaqueAt(L_BORDER_PRIMARY),
            description: 'Neutral primary border.',
          },
          invert: {
            value: neutral.opaqueInvAt(L_INV_BORDER_PRIMARY),
            description: 'Inverted version of the neutral primary border. Use it for borders on the dark or color background.',
          },
        },
        secondary: {
          DEFAULT: {
            value: neutral.opaqueAt(L_BORDER_SECONDARY),
            description: 'Subtle secondary border.',
          },
          invert: {
            value: neutral.opaqueInvAt(L_INV_BORDER_SECONDARY),
            description: 'Inverted version of the neutral secondary border. Use it for borders on the dark or color background.',
          },
        },
        info: {
          DEFAULT: {
            value: info.opaqueAt(L_BORDER_PRIMARY),
            description: 'Subtle secondary border in the informational message.',
          },
          active: {
            value: info.opaqueAt(L_BORDER_ACTIVE),
            description: 'Active border in focused input filed.',
          },
        },
        success: {
          DEFAULT: {
            value: success.opaqueAt(L_BORDER_PRIMARY),
            description: 'Subtle secondary border in the successful message and input field.',
          },
          active: {
            value: success.opaqueAt(L_BORDER_ACTIVE),
            description: 'Active border in the focused input field with valid state.',
          },
        },
        critical: {
          DEFAULT: {
            value: error.opaqueAt(L_BORDER_PRIMARY),
            description: 'Subtle secondary border in the critical message and invalid input field.',
          },
          active: {
            value: error.opaqueAt(L_BORDER_ACTIVE),
            description: 'Active border in the focused input field with invalid state, and active state of the other components with invalid state.',
          },
          pattern: {
            value: 'repeating-linear-gradient(315deg, {semanticTokens.colors.border.critical.active} 0, {semanticTokens.colors.border.critical.active} 1px, transparent 0, transparent 50%)',
            description: 'Used for the invalidStatePattern utils component to mark all kinds of inputs with invalid states.',
          },
        },
        warning: {
          DEFAULT: {
            value: warning.opaqueAt(L_BORDER_PRIMARY),
            description: 'Subtle secondary border in the warning message.',
          },
          active: {
            value: warning.opaqueAt(L_BORDER_ACTIVE),
            description: 'Active border in components with warning intention.',
          },
        },
        tooltip: {
          invert: {
            value: neutral.opaqueInvAt(L_INV_BORDER_SECONDARY),
            description: 'Border of the Tooltip with dark theme.',
          },
        },
        table: {
          accent: {
            value: neutral.opaqueAt(L_BORDER_PRIMARY),
            description: 'Accent borders in the Table: for the accordion in the table and for the header of the secondary table.',
          },
        },
        date: {
          picker: {
            range: {
              comparison: {
                value: highlight.at(L_BORDER_ACTIVE),
                description: 'Border color of the second period for the comparison mode in the DatePicker.',
              },
            },
          },
        },
      },
      control: {
        switch: {
          bg: {
            value: neutral.at(L_BG_MEDIUM),
            description: 'Subtle background of the Switch control.',
          },
        },
        primary: {
          info: {
            DEFAULT: {
              value: neutral.at(L_BG_BUTTON_STRONG),
              description: 'Background of the regular primary control.',
            },
            hover: {
              value: neutral.at(L_BG_BUTTON_STRONG_HOVER),
              description: 'Hover state of the regular primary control.',
            },
            active: {
              value: neutral.at(L_BG_BUTTON_STRONG_ACTIVE),
              description: 'Active (selected) state of the regular primary control.',
            },
          },
          success: {
            DEFAULT: {
              value: green.at(L_BG_BUTTON),
              description: 'Background of the primary control with successful theme.',
            },
            hover: {
              value: green.at(L_BG_BUTTON_HOVER),
              description: 'Hover state of the primary control with successful theme.',
            },
            active: {
              value: green.at(L_BG_BUTTON_ACTIVE),
              description: 'Active (selected) state of the primary control with successful theme.',
            },
          },
          critical: {
            DEFAULT: {
              value: error.at(L_BG_BUTTON),
              description: 'Background of the primary control with danger theme.',
            },
            hover: {
              value: error.at(L_BG_BUTTON_HOVER),
              description: 'Hover state of the primary control with danger theme.',
            },
            active: {
              value: error.at(L_BG_BUTTON_ACTIVE),
              description: 'Active (selected) state of the primary control with danger theme.',
            },
          },
          brand: {
            DEFAULT: {
              value: brand.at(L_BG_BUTTON),
              description: 'Background of the primary brand colored control.',
            },
            hover: {
              value: brand.at(L_BG_BUTTON_HOVER),
              description: 'Hover state of the primary brand colored control.',
            },
            active: {
              value: brand.at(L_BG_BUTTON_ACTIVE),
              description: 'Active state of the primary brand colored control.',
            },
          },
          advertising: {
            DEFAULT: {
              value: advertising.at(L_BG_BUTTON),
              description: 'Background of the advertising primary control.',
            },
            hover: {
              value: advertising.at(L_BG_BUTTON_HOVER),
              description: 'Hover state of the advertising primary control.',
            },
            active: {
              value: advertising.at(L_BG_BUTTON_ACTIVE),
              description: 'Active (selected) state of the advertising primary control.',
            },
          },
          invert: {
            DEFAULT: {
              value: neutral.at(L_INV_BG_BUTTON),
              description: 'Inverted background of the primary control.',
            },
            hover: {
              value: neutral.at(L_INV_BG_BUTTON_HOVER),
              description: 'Hover state of the inverted primary control.',
            },
            active: {
              value: neutral.at(L_INV_BG_BUTTON_ACTIVE),
              description: 'Active (selected) state of the inverted primary control.',
            },
          },
        },
        secondary: {
          neutral: {
            DEFAULT: {
              value: neutral.opaqueAt(L_BG_SECONDARY),
              description: 'Background of the regular secondary control.',
            },
            hover: {
              value: neutral.opaqueAt(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the regular secondary control.',
            },
            active: {
              value: neutral.opaqueAt(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the regular secondary control.',
            },
          },
          info: {
            DEFAULT: {
              value: info.opaqueAt(L_BG_SECONDARY),
              description: 'Background of the accent secondary control.',
            },
            hover: {
              value: info.opaqueAt(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the accent secondary control.',
            },
            active: {
              value: info.opaqueAt(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the accent secondary control.',
            },
          },
          invert: {
            DEFAULT: {
              value: neutral.opaqueInvAt(L_INV_BG_SECONDARY),
              description: 'Background of the inverted version of the secondary control.',
            },
            hover: {
              value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
              description: 'Hover state of the inverted version of the secondary control.',
            },
            active: {
              value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the inverted version of the secondary control.',
            },
          },
        },
        tertiary: {
          neutral: {
            DEFAULT: {
              value: 'transparent',
              description: 'Background of the regular tertiary control.',
            },
            hover: {
              value: neutral.opaqueAt(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the regular tertiary control.',
            },
            active: {
              value: neutral.opaqueAt(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the regular tertiary control.',
            },
          },
          info: {
            DEFAULT: {
              value: 'transparent',
              description: 'Background of the accent and link-lookalike tertiary control.',
            },
            hover: {
              value: info.opaqueAt(L_BG_SECONDARY_HOVER),
              description: 'Hover state of the accent and link-lookalike tertiary control.',
            },
            active: {
              value: info.opaqueAt(L_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the accent and link-lookalike tertiary control.',
            },
          },
          invert: {
            DEFAULT: {
              value: 'transparent',
              description: 'Background of the inverted version of the tertiary control.',
            },
            hover: {
              value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_HOVER),
              description: 'Hover state of the inverted version of the tertiary control.',
            },
            active: {
              value: neutral.opaqueInvAt(L_INV_BG_SECONDARY_ACTIVE),
              description: 'Active (selected) state of the inverted version of the tertiary control.',
            },
          },
        },
      },
      icon: {
        primary: {
          neutral: {
            DEFAULT: {
              value: neutral.opaqueAt(L_ICON_PRIMARY),
              description: 'Primary neutral icon.',
            },
            hover: {
              active: {
                value: neutral.opaqueAt(L_ICON_PRIMARY_HOVER),
                description: 'Hover and active (selected) states of the primary neutral icon.',
              },
            },
          },
          info: {
            DEFAULT: {
              value: info.opaqueAt(L_ICON_PRIMARY),
              description: 'Primary link-lookalike icon.',
            },
            hover: {
              active: {
                value: info.opaqueAt(L_ICON_PRIMARY_HOVER),
                description: 'Hover and active (selected) states of the primary link-lookalike icon.',
              },
            },
          },
          success: {
            DEFAULT: {
              value: success.opaqueAt(L_ICON_PRIMARY),
              description: 'Primary success icon.',
            },
            hover: {
              active: {
                value: success.opaqueAt(L_ICON_PRIMARY_HOVER),
                description: 'Hover and active (selected) states of the primary successful icon.',
              },
            },
          },
          critical: {
            DEFAULT: {
              value: error.opaqueAt(L_ICON_PRIMARY),
              description: 'Primary critical icon.',
            },
            hover: {
              active: {
                value: error.opaqueAt(L_ICON_PRIMARY_HOVER),
                description: 'Hover and active (selected) states of the primary critical icon.',
              },
            },
          },
          warning: {
            DEFAULT: {
              value: warning.opaqueAt(L_ICON_PRIMARY + 0.15),
              description: 'Primary warning icon.',
            },
            hover: {
              active: {
                value: warning.opaqueAt(L_ICON_PRIMARY_HOVER),
                description: 'Hover and active (selected) states of the primary warning icon.',
              },
            },
          },
          invert: {
            DEFAULT: {
              value: neutral.opaqueInvAt(L_INV_ICON_PRIMARY),
              description: 'Inverted version of the primary icon.',
            },
            hover: {
              active: {
                value: neutral.opaqueInvAt(L_INV_ICON_PRIMARY_HOVER),
                description: 'Hover and active (selected) states of the inverted version of the primary icon.',
              },
            },
          },
        },
        secondary: {
          neutral: {
            DEFAULT: {
              value: neutral.opaqueAt(L_ICON_SECONDARY),
              description: 'Secondary neutral icon.',
            },
            hover: {
              active: {
                value: neutral.opaqueAt(L_ICON_SECONDARY_HOVER),
                description: 'Hover and active (selected) states of the secondary neutral icon.',
              },
            },
          },
          info: {
            DEFAULT: {
              value: info.opaqueAt(L_ICON_SECONDARY),
              description: 'Secondary link-lookalike icon.',
            },
            hover: {
              active: {
                value: info.at(L_ICON_SECONDARY_HOVER),
                description: 'Hover and active (selected) states of the secondary link-lookalike icon.',
              },
            },
          },
          success: {
            DEFAULT: {
              value: success.opaqueAt(L_ICON_SECONDARY),
              description: 'Secondary success icon.',
            },
            hover: {
              active: {
                value: success.opaqueAt(L_ICON_SECONDARY_HOVER),
                description: 'Hover and active (selected) states of the secondary successful icon.',
              },
            },
          },
          critical: {
            DEFAULT: {
              value: error.opaqueAt(L_ICON_SECONDARY),
              description: 'Secondary critical icon.',
            },
            hover: {
              active: {
                value: error.opaqueAt(L_ICON_SECONDARY_HOVER),
                description: 'Hover and active (selected) states of the secondary critical icon.',
              },
            },
          },
          warning: {
            DEFAULT: {
              value: warning.opaqueAt(L_ICON_SECONDARY),
              description: 'Secondary warning icon.',
            },
            hover: {
              active: {
                value: warning.opaqueAt(L_ICON_SECONDARY_HOVER),
                description: 'Hover and active (selected) states of the secondary warning icon.',
              },
            },
          },
        },
        non: {
          interactive: {
            value: neutral.opaqueAt(L_ICON_NON_INTERACTIVE),
            description: 'Color for the default non-interactive icon.',
          },
        },
      },
      illustration: {
        red: {
          value: red.at(0.737),
          description: '⚠️ Use only for illustrations.',
        },
        orange: {
          value: orange.at(0.823),
          description: '⚠️ Use only for illustrations.',
        },
        yellow: {
          value: yellow.at(0.924),
          description: '⚠️ Use only for illustrations.',
        },
        salad: {
          value: salad.at(0.922),
          description: '⚠️ Use only for illustrations.',
        },
        green: {
          value: green.at(0.812),
          description: '⚠️ Use only for illustrations.',
        },
        blue: {
          value: blue.at(0.84),
          description: '⚠️ Use only for illustrations.',
        },
        violet: {
          value: violet.at(0.709),
          description: '⚠️ Use only for illustrations.',
        },
        pink: {
          value: pink.at(0.76),
          description: '⚠️ Use only for illustrations.',
        },
      },
      date: {
        picker: {
          cell: {
            DEFAULT: {
              value: neutral.at(L_BG_PRIMARY),
              description: 'Default date-picker cell background.',
            },
            current: {
              DEFAULT: {
                value: neutral.opaqueAt(L_BORDER_ACTIVE),
                description: 'Color for marking the cell with the current date, month or year in the date-picker.',
              },
              invert: {
                value: neutral.opaqueInvAt(L_INV_BORDER_PRIMARY),
                description: 'Color for marking the active cell with the current date, month or year in the date-picker.',
              },
            },
            hover: {
              value: neutral.at(L_BG_PRIMARY_HOVER),
              description: 'Hover state of the default date-picker cell background.',
            },
            range: {
              DEFAULT: {
                value: focus.at(L_BG_SELECTED),
                description: 'Background for the cell which is included in the date range in the date-picker.',
              },
              hover: {
                value: focus.at(L_BG_SELECTED_HOVER),
                description: 'Hover state of the background for the cell which is included in the date range in the date-picker.',
              },
            },
            active: {
              DEFAULT: {
                value: focus.at(L_BG_BUTTON),
                description: 'Active (selected) date-picker cell background.',
              },
              hover: {
                value: focus.at(L_BG_BUTTON_HOVER),
                description: 'Hover for the active (selected) date-picker cell background.',
              },
            },
            comparison: {
              active: {
                DEFAULT: {
                  value: highlight.at(L_BG_BUTTON),
                  description: 'Active (selected) date-picker cell background for comparison periods.',
                },
                hover: {
                  value: highlight.at(L_BG_BUTTON_HOVER),
                  description: 'Hover for the active (selected) date-picker cell background for comparison periods.',
                },
              },
            },
          },
        },
      },
      dropdown: {
        menu: {
          item: {
            DEFAULT: {
              value: neutral.at(L_BG_PRIMARY),
              description: 'Default background color for the list item in the dropdown-menu.',
            },
            hover: {
              value: neutral.opaqueAt(L_BG_PRIMARY_HOVER),
              description: 'Hover state of the default background color for the list item in the dropdown-menu.',
            },
            selected: {
              DEFAULT: {
                value: focus.opaqueAt(L_BG_SELECTED),
                description: 'Active (selected) state of the default background color for the list item in the dropdown-menu.',
              },
              hover: {
                value: focus.opaqueAt(L_BG_SELECTED_HOVER),
                description: 'Hover state for the selected state of the default background color for the list item in the dropdown-menu.',
              },
            },
          },
        },
      },
      feature: {
        popover: {
          bg: {
            DEFAULT: {
              value: '{semanticTokens.colors.bg.primary.highlight}',
              description: 'Color of the FeaturePopover background with accent theme.',
            },
            neutral: {
              value: neutral.at(L_INV_BG_PRIMARY),
              description: 'Color of the FeaturePopover background with neutral theme.',
            },
          },
          dot: {
            outer: {
              border: {
                value: '{semanticTokens.colors.bg.primary.highlight}',
                description: 'Color of the outer border of the FeaturePopover.Spot for FeaturePopover with accent theme.',
              },
            },
            neutral: {
              DEFAULT: {
                value: '{semanticTokens.colors.bg.primary.highlight}',
                description: 'Color of the FeaturePopover.Spot for FeaturePopover with neutral theme.',
              },
              outer: {
                border: {
                  value: '{semanticTokens.colors.feature.popover.dot.neutral}',
                  description: 'Color of the outer border of the FeaturePopover.Spot for FeaturePopover with neutral theme.',
                },
              },
            },
          },
        },
      },
      progress: {
        bar: {
          bg: {
            DEFAULT: {
              value: neutral.at(L_BG_LIGHT),
              description: 'Background color of the ProgressBar.',
            },
            hover: {
              value: neutral.at(L_BG_MEDIUM),
              description: 'Hover state of the background color of the ProgressBar.',
            },
            invert: {
              DEFAULT: {
                value: neutral.at(L_INV_BG_LIGHT),
                description: 'Inverted version of the background color of the ProgressBar.',
              },
              hover: {
                value: neutral.at(L_INV_BG_MEDIUM),
                description: 'Hover state for the inverted version of the background color of the ProgressBar.',
              },
            },
          },
          value: {
            gradient: {
              value: `linear-gradient(-45deg, oklch(from ${highlight.at(0.74)} calc(l - 0.05) c h) 25%, ${highlight.at(0.74)} 0%, ${highlight.at(0.74)} 50%, oklch(from ${highlight.at(0.74)} calc(l - 0.05) c h) 0%, oklch(from ${highlight.at(0.74)} calc(l - 0.05) c h) 75%, ${highlight.at(0.74)} 0%)`,
              description: 'Value with gradient for the ProgressBar.',
            },
            bg: {
              value: 'oklch(1 0 0)',
              description: 'Base value background for the ProgressBar. It is used to create gradients for the values.',
            },
          },
          pattern: {
            gradient: {
              value: 'linear-gradient(-45deg, oklch(0 0 0 / 0.1) 25%, {semanticTokens.colors.progress.bar.bg} 0%, {semanticTokens.colors.progress.bar.bg} 50%, oklch(0 0 0 / 0.1) 0%, oklch(0 0 0 / 0.1) 75%, {semanticTokens.colors.progress.bar.bg} 0%)',
              description: 'Null value gradient for the ProgressBar.',
            },
          },
        },
      },
      skeleton: {
        bg: {
          DEFAULT: {
            value: neutral.at(L_BG_SKELETON),
            description: 'Default color for the Skeleton.',
          },
          invert: {
            value: neutral.at(L_INV_BG_SKELETON),
            description: 'Inverted version of the default color for the Skeleton.',
          },
        },
      },
      table: {
        th: {
          primary: {
            cell: {
              DEFAULT: {
                value: neutral.at(L_BG_SECONDARY),
                description: 'Background of the header cell in the primary Table.',
              },
              hover: {
                value: neutral.at(L_BG_SECONDARY_ACTIVE),
                description: 'Background of the hovered header cell in the primary Table.',
              },
              active: {
                value: neutral.at(L_BG_SECONDARY_ACTIVE),
                description: 'Background of the active header cell in the primary Table.',
              },
            },
          },
          secondary: {
            cell: {
              value: neutral.at(L_BG_PRIMARY),
              description: 'Background of the header cell in the secondary Table.',
            },
          },
          gradient: {
            value: 'linear-gradient(to right, transparent 0%, var(--gray-100) 100%)',
            description: 'Background gradient for sorting icon that absolute positioned in the table head.',
          },
        },
        td: {
          cell: {
            DEFAULT: {
              value: neutral.at(L_BG_PRIMARY),
              description: 'Background of the default cell in the Table.',
            },
            hover: {
              value: neutral.opaqueAt(L_BG_PRIMARY_HOVER),
              description: 'Background of the default hovered cell in the Table.',
            },
            active: {
              value: neutral.opaqueAt(L_BG_PRIMARY_ACTIVE),
              description: 'Background of the default active cell in the Table.',
            },
            unread: {
              value: neutral.at(L_BG_SECONDARY),
              description: 'Background of the unread cell in the Table.',
            },
            accordion: {
              value: neutral.at(L_BG_PRIMARY),
              description: 'Background of the cell inside an Accordion in the Table.',
            },
            selected: {
              DEFAULT: {
                value: info.at(L_BG_SECONDARY),
                description: 'Background of the selected cell in the Table.',
              },
              hover: {
                value: info.at(L_BG_SECONDARY_HOVER),
                description: 'Background of the hovered selected cell in the Table.',
              },
              active: {
                value: info.at(L_BG_SECONDARY_ACTIVE),
                description: 'Background of the active selected cell in the Table.',
              },
            },
            new: {
              DEFAULT: {
                value: success.at(L_BG_SECONDARY),
                description: 'Background of the cell with new information in the Table.',
              },
              hover: {
                value: success.at(L_BG_SECONDARY_HOVER),
                description: 'Background of the hovered cell with new information in the Table.',
              },
              active: {
                value: success.at(L_BG_SECONDARY_ACTIVE),
                description: 'Background of the active cell with new information in the Table.',
              },
            },
            critical: {
              DEFAULT: {
                value: error.at(L_BG_SECONDARY),
                description: 'Background of the cell with critical information in the Table.',
              },
              hover: {
                value: error.at(L_BG_SECONDARY_HOVER),
                description: 'Background of the hovered cell with critical information in the Table.',
              },
              active: {
                value: error.at(L_BG_SECONDARY_ACTIVE),
                description: 'Background of the active cell with critical information in the Table.',
              },
            },
            warning: {
              DEFAULT: {
                value: warning.at(L_BG_SECONDARY),
                description: 'Background of the cell with warning information in the Table.',
              },
              hover: {
                value: warning.at(L_BG_SECONDARY_HOVER),
                description: 'Background of the hovered cell with warning information in the Table.',
              },
              active: {
                value: warning.at(L_BG_SECONDARY_ACTIVE),
                description: 'Background of the active cell with warning information in the Table.',
              },
            },
          },
        },
      },
      brand: {
        primary: {
          value: violet.at(0.74),
          description: 'Primary brand color.',
        },
        secondary: {
          value: gray.at(0.22),
          description: 'Secondary brand color.',
        },
        pinterest: {
          value: '#bd081c',
          description: 'Pinterest brand color.',
        },
        instagram: {
          value: '#e4405f',
          description: 'Instagram brand color.',
        },
        youtube: {
          value: '#ff0000',
          description: 'Youtube brand color.',
        },
        facebook: {
          value: '#1877f2',
          description: 'Facebook brand color.',
        },
        linkedIn: {
          value: '#0a66c2',
          description: 'LinkedIn brand color.',
        },
        twitter: {
          value: '#1d9bf0',
          description: 'Twitter brand color.',
        },
        google: {
          blue: {
            value: '#1a0dab',
            description: 'Google brand color for the link.',
          },
          green: {
            value: '#016723',
            description: 'Google green brand color for the link.',
          },
          my: {
            business: {
              value: '#1a73e8',
              description: 'Google My Business brand color.',
            },
          },
        },
      },
      keyboard: {
        focus: {
          outline: {
            value: focus.opaqueAt(L_BORDER_FOCUS),
            description: 'Color for default keyboard focus outline styles.',
          },
          invalid: {
            outline: {
              value: error.opaqueAt(L_BORDER_FOCUS),
              description: 'Color for keyboard focus outline styles for elements with invalid state.',
            },
          },
          valid: {
            outline: {
              value: success.opaqueAt(L_BORDER_FOCUS),
              description: 'Color for keyboard focus outline styles for elements with valid state.',
            },
          },
          invert: {
            outline: {
              value: 'oklch(from var(--white) l c h / 0.7)',
              description: 'Color for keyboard focus outline styles to use on the dark and color background.',
            },
          },
        },
      },
      overlay: {
        primary: {
          value: neutral.opaqueAt(0.74),
          description: 'Use for cover the content under the modal dialogs.',
        },
        secondary: {
          value: neutral.opaqueAt(0.8),
          description: 'Use for the secondary modal dialogs that were opened upon the other modal dialogs.',
        },
        limitation: {
          primary: {
            value: neutral.at(L_BG_SECONDARY),
            description: 'Use as a primary cover of the content under the messages about limitations.',
          },
          secondary: {
            value: 'oklch(1 0 0 / 0.85)',
            description: 'Use as a secondary cover of the content under the messages about limitations.',
          },
        },
      },
      tooltip: {
        default: {
          value: neutral.at(L_BG_PRIMARY),
          description: 'Default Tooltip background.',
        },
        warning: {
          value: error.at(L_BG_LIGHT),
          description: 'Warning Tooltip background.',
        },
        invert: {
          value: neutral.at(L_INV_BG_PRIMARY),
          description: 'Inverted version of the default Tooltip background.',
        },
      },
      neighbor: {
        location: {
          neutral: {
            value: 'oklch(from var(--white) l c h / 0.5)',
            description: 'Neutral border of the components that are combined with neighbor-location property.',
          },
          invert: {
            value: 'oklch(0 0 0 / 0.5)',
            description: 'Inverted border of the components that are combined with neighbor-location property.',
          },
        },
      },
      scroll: {
        area: {
          shadow: {
            left: {
              value: 'linear-gradient(to right, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
              description: 'Left-to-right fade shadow for the ScrollArea.',
            },
            right: {
              value: 'linear-gradient(to left, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
              description: 'Right-to-left fade shadow for the ScrollArea.',
            },
            top: {
              value: 'linear-gradient(to bottom, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
              description: 'Top-to-bottom fade shadow for the ScrollArea.',
            },
            bottom: {
              value: 'linear-gradient(to top, oklch(0 0 0 / 0.08) 0%, transparent 100%)',
              description: 'Bottom-to-top fade shadow for the ScrollArea.',
            },
          },
          dropdown: {
            menu: {
              left: {
                value: 'linear-gradient(to right, oklch(1 0 0) 0%, transparent 100%)',
                description: 'Left-to-right fade shadow for the ScrollArea inside the DropdownMenu.',
              },
              right: {
                value: 'linear-gradient(to left, oklch(1 0 0) 0%, transparent 100%)',
                description: 'Right-to-left fade shadow for the ScrollArea inside the DropdownMenu.',
              },
              bottom: {
                value: 'linear-gradient(to top, oklch(1 0 0) 0%, transparent 100%)',
                description: 'Bottom-to-top fade shadow for the ScrollArea inside the DropdownMenu.',
              },
              top: {
                value: 'linear-gradient(to bottom, oklch(1 0 0) 0%, transparent 100%)',
                description: 'Top-to-bottom fade shadow for the ScrollArea inside the DropdownMenu.',
              },
            },
          },
        },
        bar: {
          background: {
            value: neutral.opaqueAt(L_BORDER_PRIMARY),
            description: 'Background color for ScrollBar.',
          },
        },
      },
      tag: {
        primary: {
          gray: {
            normal: {
              value: 'rgba(69, 70, 81, 1)',
              description: 'Gray background color for the primary tag.',
            },
            hover: {
              active: {
                value: '#e0e1e9',
                description: 'Gray background color for the hover and active states of the primary tag.',
              },
            },
            text: {
              value: '#f4f5f9',
              description: 'Gray text for the primary gray tag.',
            },
          },
          blue: {
            normal: {
              value: 'rgba(7, 77, 141, 1)',
              description: 'Blue background color for primary tag.',
            },
            hover: {
              active: {
                value: '#c4e5fe',
                description: 'Blue background color for the hover and active states of the primary tag.',
              },
            },
            text: {
              value: '#e9f7ff',
              description: 'Blue text for the primary blue tag.',
            },
          },
          green: {
            normal: {
              value: 'rgba(9, 99, 82, 1)',
              description: 'Green background color for the primary tag.',
            },
            hover: {
              active: {
                value: '#9ef2c9',
                description: 'Green background color for the hover and active states of the primary tag.',
              },
            },
            text: {
              value: '#dbfee8',
              description: 'Green text for the primary green tag.',
            },
          },
          orange: {
            normal: {
              value: 'rgba(156, 49, 11, 1)',
              description: 'Orange background color for the primary tag.',
            },
            hover: {
              active: {
                value: '#ffdca2',
                description: 'Orange background color for the hover and active states of the primary tag.',
              },
            },
            text: {
              value: '#fff3d9',
              description: 'Orange text for the primary orange tag.',
            },
          },
          red: {
            normal: {
              value: 'rgba(160, 13, 42, 1)',
              description: 'Red background color for the primary tag.',
            },
            hover: {
              active: {
                value: '#ffd7df',
                description: 'Red background color for the hover and active states of the primary tag.',
              },
            },
            text: {
              value: '#fff0f7',
              description: 'Red text for the primary red tag.',
            },
          },
          violet: {
            normal: {
              value: 'rgba(95, 62, 157, 1)',
              description: 'Violet background color for the primary tag.',
            },
            hover: {
              active: {
                value: '#edd9ff',
                description: 'Violet background color for the hover and active states of the primary tag.',
              },
            },
            text: {
              value: 'rgba(244, 245, 249, 1)',
              description: 'Violet text for the primary violet tag.',
            },
          },
          yellow: {
            normal: {
              value: 'rgba(252, 224, 129, 0.5)',
              description: 'Yellow background color for the primary tag.',
            },
            hover: {
              active: {
                value: '#fce081',
                description: 'Yellow background color for the hover and active states of the primary tag.',
              },
            },
            text: {
              value: '#a75800',
              description: 'Yellow text for the primary yellow tag.',
            },
          },
          white: {
            normal: {
              value: 'rgba(255, 255, 255, 0.15)',
              description: 'Primary white tag.',
            },
            hover: {
              active: {
                value: 'rgba(255, 255, 255, 0.3)',
                description: 'Hover and active (selected) state of the primary white tag.',
              },
            },
            text: {
              value: '#ffffff',
              description: 'White text for the primary white tag.',
            },
          },
        },
        secondary: {
          normal: {
            value: '#ffffff',
            description: 'Background color for the default secondary tag.',
          },
          hover: {
            active: {
              value: '#f4f5f9',
              description: 'Hover and active (selected) states of the background color for the default secondary tag.',
            },
          },
          white: {
            normal: {
              value: 'rgba(255, 255, 255, 0)',
              description: 'White secondary tag.',
            },
            hover: {
              active: {
                value: 'rgba(255, 255, 255, 0.1)',
                description: 'Active state of the secondary white tag.',
              },
            },
            text: {
              value: '#ffffff',
              description: 'White text for the secondary white tag.',
            },
          },
          gray: {
            text: {
              value: '#6c6e79',
              description: 'Gray text for the default secondary tag.',
            },
          },
        },
      },
      chart: {
        palette: {
          order: {
            1: {
              value: 'var(--blue-400)',
              description: '1 color in the default list of colors for charts.',
            },
            2: {
              value: 'var(--violet-300)',
              description: '2 color in the default list of colors for charts.',
            },
            3: {
              value: 'var(--green-200)',
              description: '3 color in the default list of colors for charts.',
            },
            4: {
              value: 'var(--yellow-200)',
              description: '4 color in the default list of colors for charts.',
            },
            5: {
              value: 'var(--blue-300)',
              description: '5 color in the default list of colors for charts.',
            },
            6: {
              value: 'var(--salad-200)',
              description: '6 color in the default list of colors for charts.',
            },
            7: {
              value: 'var(--red-300)',
              description: '7 color in the default list of colors for charts.',
            },
            8: {
              value: 'var(--green-400)',
              description: '8 color in the default list of colors for charts.',
            },
            9: {
              value: 'var(--violet-200)',
              description: '9 color in the default list of colors for charts.',
            },
            10: {
              value: 'var(--yellow-300)',
              description: '10 color in the default list of colors for charts.',
            },
            11: {
              value: 'var(--red-400)',
              description: '11 color in the default list of colors for charts.',
            },
            12: {
              value: 'var(--salad-300)',
              description: '12 color in the default list of colors for charts.',
            },
            13: {
              value: 'var(--blue-200)',
              description: '13 color in the default list of colors for charts.',
            },
            14: {
              value: 'var(--pink-400)',
              description: '14 color in the default list of colors for charts.',
            },
            15: {
              value: 'var(--green-300)',
              description: '15 color in the default list of colors for charts.',
            },
            16: {
              value: 'var(--violet-400)',
              description: '16 color in the default list of colors for charts.',
            },
            17: {
              value: 'var(--blue-500)',
              description: '17 color in the default list of colors for charts.',
            },
            18: {
              value: 'var(--pink-300)',
              description: '18 color in the default list of colors for charts.',
            },
            19: {
              value: 'var(--yellow-400)',
              description: '19 color in the default list of colors for charts.',
            },
            20: {
              value: 'var(--red-200)',
              description: '20 color in the default list of colors for charts.',
            },
            21: {
              value: 'var(--salad-400)',
              description: '21 color in the default list of colors for charts.',
            },
            22: {
              value: 'var(--yellow-500)',
              description: '22 color in the default list of colors for charts.',
            },
            23: {
              value: 'var(--pink-200)',
              description: '23 color in the default list of colors for charts.',
            },
            24: {
              value: 'var(--green-500)',
              description: '24 color in the default list of colors for charts.',
            },
            total: {
              amount: {
                value: 'var(--gray-400)',
                description: 'Use it to show total value.',
              },
            },
            other: {
              data: {
                value: 'var(--gray-200)',
                description: 'Use it to indicate voids, missing or some other data.',
              },
            },
            null: {
              value: 'var(--gray-100)',
              description: 'Use it to show null value.',
            },
          },
        },
        grid: {
          line: {
            value: neutral.at(L_BORDER_SECONDARY),
            description: 'Default chart grid line.',
          },
          x: {
            axis: {
              value: neutral.at(L_BORDER_PRIMARY),
              description: 'X-axis line on the chart grid.',
            },
          },
          y: {
            accent: {
              hover: {
                line: {
                  value: neutral.at(L_BORDER_PRIMARY),
                  description: 'Accent line for the hover state on the chart grid.',
                },
              },
            },
          },
          text: {
            label: {
              value: neutral.opaqueAt(L_TEXT_SECONDARY),
              description: 'Text label on the chart grid.',
            },
          },
          bar: {
            chart: {
              hover: {
                value: neutral.opaqueAt(L_BG_PRIMARY_HOVER),
                description: 'Background color for the hover state of a bar on the chart grid.',
              },
              base: {
                bg: {
                  value: neutral.at(L_BG_LIGHT),
                  description: 'Default background color of a bar in the BarChart.',
                },
              },
            },
          },
          period: {
            bg: {
              value: neutral.at(L_BG_LIGHT),
              description: 'Use for highlighting a period on the chart grid.',
            },
            pattern: {
              value: neutral.at(L_BORDER_SECONDARY),
              description: 'Stripe color for diagonal pattern background.',
            },
          },
          border: {
            value: 'var(--white)',
            description: 'Border for distinguishing data sets and chart dots on the chart grid.',
          },
        },
        x: {
          axis: {
            accent: {
              period: {
                active: {
                  value: neutral.opaqueAt(L_BG_LIGHT),
                  description: 'Background color for the clickable date on the X-axis of the chart grid.',
                },
              },
              data: {
                start: {
                  tracking: {
                    value: success.opaqueAt(L_BG_LIGHT),
                    description: 'Background color for the "Start tracking" date on the X-axis of the chart grid.',
                  },
                },
              },
            },
          },
        },
      },
      header: {
        bg: {
          value: '#382E5E',
        },
        border: {
          primary: {
            value: '#382E5E',
          },
          secondary: {
            value: 'rgba(255,255,255, 0.15)',
          },
        },
      },
      sidebar: {
        nav: {
          control: {
            hover: {
              value: 'rgba(224, 225, 233, 0.7)',
            },
            active: {
              value: '#E2DDFF',
            },
            text: {
              normal: {
                value: '#6D619F',
              },
              active: {
                value: '#4D407E',
              },
            },
            icon: {
              normal: {
                value: '#9083C5',
              },
              active: {
                value: '#4D407E',
              },
            },
          },
        },
      },
      slider: {
        rating: {
          normal: {
            value: neutral.at(L_ICON_SECONDARY),
            description: 'Icon color for the SliderRating component in its normal state.',
          },
          hover: {
            active: {
              value: neutral.at(L_ICON_SECONDARY_HOVER),
              description: 'Icon color for the SliderRating component in its hovered and active states.',
            },
          },
        },
      },
    },
    opacity: {
      disabled: {
        value: '0.3',
        description: 'Use for the disabled state of all kind of the controls and elements.',
      },
    },
    shadows: {
      box: {
        shadow: {
          card: {
            DEFAULT: {
              value: `0px 0px 1px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}, 0px 1px 3px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
              description: 'Default shadow of the Card.',
            },
            hover: {
              value: `3px 3px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
              description: 'Hover state for the shadow of the Card with hover state.',
            },
          },
          dnd: {
            value: `3px 3px 30px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
            description: 'Shadow for show that element are being drag-and-drop.',
          },
          modal: {
            value: `0px 1px 5px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
            description: 'Default shadow if the Modal window.',
          },
          popper: {
            value: `1px 1px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
            description: 'Default shadow of all Poppers, Dropdowns and Tooltips.',
          },
          float: {
            control: {
              DEFAULT: {
                value: `0px 0px 1px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}, 0px 1px 5px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
              },
              hover: {
                value: `3px 3px 10px 0px ${neutral.opaqueAt(L_BORDER_SECONDARY)}`,
              },
            },
          },
        },
      },
      keyboard: {
        focus: {
          invalid: {
            value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.invalid.outline}',
            description: 'Keyboard focus styles for elements with invalid state.',
          },
          valid: {
            value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.valid.outline}',
            description: 'Keyboard focus styles for elements with valid state.',
          },
          invert: {
            value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.invert.outline}',
            description: 'Keyboard focus styles for use on dark backgrounds.',
          },
          DEFAULT: {
            value: '0px 0px 0px 3px {semanticTokens.colors.keyboard.focus.outline}',
            description: 'Default keyboard focus box-shadow styles.',
          },
        },
      },
    },
    sizes: {
      form: {
        control: {
          s: {
            value: 'calc({baseTokens.spacing.scale-indent} * 5)',
            description: 'Small size of the controls. Use it for small interactive addons. Avoid using it with the main actions.',
          },
          m: {
            value: 'calc({baseTokens.spacing.scale-indent} * 7)',
            description: 'Default size of the controls.',
          },
          l: {
            value: 'calc({baseTokens.spacing.scale-indent} * 10)',
            description: 'Large size of the controls.',
          },
        },
      },
    },
    radii: {
      'addon': {
        value: '{baseTokens.radii.small}',
        description: 'Use for rounding addons and small controls like Checkbox.',
      },
      'badge': {
        value: '{baseTokens.radii.medium}',
        description: 'Use for rounding Badge.',
      },
      'chart': {
        value: '{baseTokens.radii.extra-small}',
        description: 'Use for rounding big and small charts like bar, histogram and others.',
      },
      'counter': {
        value: '{baseTokens.radii.large}',
        description: 'Use for rounding Counter.',
      },
      'tag': {
        value: '{baseTokens.radii.extra-large}',
        description: 'Use for rounding Tag.',
      },
      'switch': {
        value: '{baseTokens.radii.extra-large}',
        description: 'Use for rounding Switch.',
      },
      'control': {
        value: '{baseTokens.radii.medium}',
        description: 'Use for rounding all form controls: Button, FilterTrigger, Input, Textarea, Pills, etc.',
      },
      'progress-bar': {
        value: '{baseTokens.radii.medium}',
        description: 'Use for rounding bars: ProgressBar, SliderBar, etc.',
      },
      'surface': {
        value: 'calc({baseTokens.radii.medium} + 2px)',
        description: 'Use for rounding surfaces like Card, blocks, widgets, Notice, etc.',
      },
      'popper': {
        value: '{baseTokens.radii.medium}',
        description: 'Use for rounding all kinds of poppers and dropdowns.',
      },
      'modal': {
        value: 'calc({baseTokens.radii.large} + 2px)',
        description: 'Use for rounding all kinds of big modal dialogs (e.g., Modal, Wizard).',
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
};

type FontSize = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800';
type LineHeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800';
type FontWeight = 'semi-bold' | 'bold' | 'regular' | 'medium';
type Spacing = '05x' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '8x' | '10x' | '14x' | '20x' | '24x' | '30x';
type Radii = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
type Breakpoints = 'extra-small' | 'small' | 'medium' | 'large';
type Durations = 'extra-slow' | 'slow' | 'medium' | 'fast' | 'extra-fast';

type Value<T = string> = {
  value: T;
  description?: string;
  pandaKey?: string;
  cssKey?: string;
} | {
  DEFAULT: Value<T>;
  hover: Value<T>;
  active?: Value<T>;
};

export type BaseTokens = {
  colors: Record<Colors, Record<Lightness, Value>> & Record<'gray', Record<'white', Value>>;
  fonts: { base: Value };
  fontSizes: Record<FontSize, Value>;
  lineHeights: Record<LineHeight, Value>;
  fontWeights: Record<FontWeight, Value>;
  letterSpacings: { compact: Value };
  spacing: {
    'scale-indent': Value;
  } & Record<Spacing, Value>;
  radii: Record<Radii, Value>;
  breakpoints: Record<Breakpoints, Value>;
  durations: Record<Durations, Value>;
};

export type SemanticTokens = {
  colors: {
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
        invert: Value;
        // feature: {
        //   highlight: {
        //     hover: {
        //       active: Value;
        //     };
        //   };
        // };
      };
      secondary: {
        neutral: Value;
        info: Value;
        success: Value;
        critical: Value;
        warning: Value;
        highlight: Value;
        advertising: Value;
        // feature: {
        //   highlight: Value;
        // };
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
        DEFAULT: Value;
        hover: {
          active: Value;
        };
        invert: {
          DEFAULT: Value;
          hover: Value;
        };
        visited: Value;
      };
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
      // feature: {
      //   highlight: {
      //     DEFAULT: Value;
      //     hover: {
      //       active: Value;
      //     };
      //   };
      // };
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
      tooltip: {
        invert: Value;
      };
      table: {
        accent: Value;
      };
      date: {
        picker: {
          range: {
            comparison: Value;
          };
        };
      };
      // feature: {
      //   highlight: {
      //     DEFAULT: Value;
      //     active: Value;
      //     secondary: Value;
      //   };
      // };
    };
    control: {
      switch: {
        bg: Value;
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
        // feature: {
        //   highlight: {
        //     DEFAULT: Value;
        //     hover: Value;
        //     active: Value;
        //   };
        // };
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
        // feature: {
        //   highlight: {
        //     DEFAULT: Value;
        //     hover: Value;
        //     active: Value;
        //   };
        // };
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
        // feature: {
        //   highlight: {
        //     DEFAULT: Value;
        //     hover: {
        //       active: Value;
        //     };
        //   };
        // };
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
          };
        };
      };
    };
    feature: {
      popover: {
        bg: {
          DEFAULT: Value;
          neutral: Value;
        };
        dot: {
          outer: {
            border: Value;
          };
          neutral: {
            DEFAULT: Value;
            outer: {
              border: Value;
            };
          };
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
        // feature: {
        //   highlight: {
        //     outline: Value;
        //   };
        // };
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
      default: Value;
      warning: Value;
      invert: Value;
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
        white: {
          normal: Value;
          hover: {
            active: Value;
          };
          text: Value;
        };
      };
      secondary: {
        normal: Value;
        hover: {
          active: Value;
        };
        white: {
          normal: Value;
          hover: {
            active: Value;
          };
          text: Value;
        };
        gray: {
          text: Value;
        };
      };
    };
    chart: {
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
    sidebar: {
      nav: {
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
    slider: {
      rating: {
        normal: Value;
        hover: {
          active: Value;
        };
      };
    };
  };
  opacity: {
    disabled: Value;
  };
  shadows: {
    box: {
      shadow: {
        card: {
          DEFAULT: Value;
          hover: Value;
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
  sizes: {
    form: {
      control: Record<'s' | 'm' | 'l', Value>;
    };
  };
  radii: {
    'addon': Value;
    'badge': Value;
    'chart': Value;
    'counter': Value;
    'tag': Value;
    'switch': Value;
    'control': Value;
    'progress-bar': Value;
    'surface': Value;
    'popper': Value;
    'modal': Value;
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
};
