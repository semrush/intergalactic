import highlightsDesignThemeJson from '@semcore/theme/highlights-light';
import defaultDesignThemeJson from '@semcore/theme/light';

import logger from '../logger';
import { useContextTokens } from '../ThemeProvider';

const defaultDesignTheme: Record<string, string> = {
  ...defaultDesignThemeJson,
  ...highlightsDesignThemeJson,
};
const deprecatedPalette: Record<string, string> = {
  '--denim-blue': '#006dca',
  '--light-blue': '#008ff8',
  '--neon-blue': '#8ecdff',
  '--cyan': '#2bb3ff',
  '--green': '#009f81',
  '--dark-green': '#007c65',
  '--yellow': '#fdc23c',
  '--light-orange': '#ff8c43',
  '--orange': '#ff642d',
  '--dark-orange': '#c33909',
  '--red': '#ff4953',
  '--dark-red': '#d1002f',
  '--violet': '#ab6cfe',
  '--dark-violet': '#8649e1',
  '--pink': '#e14adf',
  '--asphalt': '#6c6e79',
  '--wall': '#8a8e9b',
  '--mist': '#a9abb6',
  '--mist-light': '#c4c7cf',
  '--stone': '#a9abb6',
  '--stone-light': '#c4c7cf',
  '--gray20': '#191b23',
  '--gray30': '#191b23',
  '--gray40': '#484a54',
  '--gray60': '#6c6e79',
  '--gray70': '#a9abb6',
  '--gray80': '#c4c7cf',
  '--gray94': '#e0e1e9',
  '--gray96': '#f4f5f9',
  '--mystic': '#f4f5f9',
  '--mercury': '#e0e1e9',
  '--blue50': '#e9f7ff',
  '--blue100': '#c4e5fe',
  '--blue400': '#008ff8',
  '--blue600': '#044792',
  '--green50': '#dbfee8',
  '--green100': '#9ef2c9',
  '--green200': '#59ddaa',
  '--green300': '#00c192',
  '--green600': '#055345',
  '--red50': '#fff0f7',
  '--red100': '#ffd7df',
  '--red200': '#ffaeb5',
  '--red300': '#ff8786',
  '--red600': '#8e0016',
  '--orange50': '#fff3d9',
  '--orange100': '#ffdca2',
  '--orange200': '#ffb26e',
  '--yellow100': '#fce081',
  '--iceberg-blue': '#6fafd4',
  '--salad': '#8bc835',
  '--granitic': '#2f3439',
  '--gray10': '#222222',
  '--sky': '#e1f2ff',
  '--lily': '#e6f9fd',
  '--marble': '#f1f6f8',
  '--googleplus': '#e14b3f',
  '--linkedin': '#1a7ab2',
};

const makeDeprecationMessage = (color: string) =>
  `You are using ${color} color in your app. It's deprecated and will be removed from palette in the next major release. Please use colors from https://developer.semrush.com/intergalactic/style/design-tokens/ instead.`;

export const useColorResolver = () => {
  const contextTheme = useContextTokens();

  return (color?: string) => {
    if (!color) return undefined as any;
    if (color.startsWith('--')) {
      if (deprecatedPalette[color]) {
        logger.warn(true, makeDeprecationMessage(color), undefined);
        return deprecatedPalette[color];
      }
      let resolvedColor: string | undefined;

      if (contextTheme?.[color]) {
        resolvedColor = contextTheme[color];
      }
      if (defaultDesignTheme[color]) {
        resolvedColor = defaultDesignTheme[color];
      }

      if (resolvedColor) {
        return `var(${color}, ${resolvedColor})`;
      }

      return `var(${color})`;
    }
    if (defaultDesignTheme[`--intergalactic-${color}`]) {
      return `var(--intergalactic-${color}, ${defaultDesignTheme[`--intergalactic-${color}`]})`;
    }
    if (defaultDesignTheme[`--${color}`]) {
      return `var(--${color}, ${defaultDesignTheme[`--${color}`]})`;
    }
    if (deprecatedPalette[`--${color}`]) {
      logger.warn(true, makeDeprecationMessage(color), undefined);
      return deprecatedPalette[`--${color}`];
    }
    return color;
  };
};
