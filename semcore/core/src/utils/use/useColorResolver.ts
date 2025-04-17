import { useContextTokens } from '../ThemeProvider';
import logger from '../logger';

import defaultDesignThemeJson from '../../theme/themes/default';
const defaultDesignTheme = defaultDesignThemeJson as Record<string, string>;
const basicPalette: Record<string, string> = {
  '--white': '#ffffff',
  '--black': '#000000',
  '--gray-50': '#f4f5f9',
  '--gray-100': '#e0e1e9',
  '--gray-200': '#c4c7cf',
  '--gray-300': '#a9abb6',
  '--gray-400': '#8a8e9b',
  '--gray-500': '#6c6e79',
  '--gray-600': '#484a54',
  '--gray-700': '#2b2e38',
  '--gray-800': '#191b23',
  '--blue-50': '#e9f7ff',
  '--blue-100': '#c4e5fe',
  '--blue-200': '#8ecdff',
  '--blue-300': '#2bb3ff',
  '--blue-400': '#008ff8',
  '--blue-500': '#006dca',
  '--blue-600': '#044792',
  '--blue-700': '#002b5f',
  '--blue-800': '#001b3d',
  '--green-50': '#dbfee8',
  '--green-100': '#9ef2c9',
  '--green-200': '#59ddaa',
  '--green-300': '#00c192',
  '--green-400': '#009f81',
  '--green-500': '#007c65',
  '--green-600': '#055345',
  '--green-700': '#00342d',
  '--green-800': '#00201e',
  '--salad-50': '#ecfbcd',
  '--salad-100': '#c7ee96',
  '--salad-200': '#9bd85d',
  '--salad-300': '#66c030',
  '--salad-400': '#35a21e',
  '--salad-500': '#0a7e22',
  '--salad-600': '#005613',
  '--salad-700': '#003509',
  '--salad-800': '#002203',
  '--orange-50': '#fff3d9',
  '--orange-100': '#ffdca2',
  '--orange-200': '#ffb26e',
  '--orange-300': '#ff8c43',
  '--orange-400': '#ff642d',
  '--orange-500': '#c33909',
  '--orange-600': '#8b1500',
  '--orange-700': '#551200',
  '--orange-800': '#351000',
  '--yellow-50': '#fdf7c8',
  '--yellow-100': '#fce081',
  '--yellow-200': '#fdc23c',
  '--yellow-300': '#ef9800',
  '--yellow-400': '#d87900',
  '--yellow-500': '#a75800',
  '--yellow-600': '#743a00',
  '--yellow-700': '#462500',
  '--yellow-800': '#2c1600',
  '--red-50': '#fff0f7',
  '--red-100': '#ffd7df',
  '--red-200': '#ffaeb5',
  '--red-300': '#ff8786',
  '--red-400': '#ff4953',
  '--red-500': '#d1002f',
  '--red-600': '#8e0016',
  '--red-700': '#58000a',
  '--red-800': '#410101',
  '--pink-50': '#fff0ff',
  '--pink-100': '#ffd3ff',
  '--pink-200': '#ffa9fa',
  '--pink-300': '#f67cf2',
  '--pink-400': '#e14adf',
  '--pink-500': '#b229b9',
  '--pink-600': '#7d0480',
  '--pink-700': '#4d0050',
  '--pink-800': '#340439',
  '--violet-50': '#f9f2ff',
  '--violet-100': '#edd9ff',
  '--violet-200': '#dcb8ff',
  '--violet-300': '#c695ff',
  '--violet-400': '#ab6cfe',
  '--violet-500': '#8649e1',
  '--violet-600': '#5925ab',
  '--violet-700': '#421983',
  '--violet-800': '#220358',
  '--brand-color': '#ff642d',
  '--pinterest': '#bd081c',
  '--instagram': '#e4405f',
  '--youtube': '#ff0000',
  '--facebook': '#3b5998',
  '--linkedIn': '#1a7ab2',
  '--twitter': '#2bafeb',
  '--google-my-business': '#1a73e8',
  '--google-blue': '#1a0dab',
  '--google-green': '#016723',
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
      if (basicPalette[color]) {
        return basicPalette[color];
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
    if (deprecatedPalette[`--${color}`]) {
      logger.warn(true, makeDeprecationMessage(color), undefined);
      return deprecatedPalette[`--${color}`];
    }
    if (basicPalette[`--${color}`]) {
      return `var(--${color}, ${basicPalette[`--${color}`]})`;
    }
    return color;
  };
};
