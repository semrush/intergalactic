import lightThemeTokens from '../../../semcore/utils/src/themes/light.json';
import darkThemeTokens from '../../../semcore/utils/src/themes/dark.json';
import darkWebsiteTokens from './dark-theme.json';
import lightWebsiteTokens from './light-theme.json';

export const THEME_STORAGE_KEY = 'theme-preference';

export const getThemePreference = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem(THEME_STORAGE_KEY)) {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }
};

export const addTheme = () => {
  const currentTheme = getThemePreference();
  const tokens =
    currentTheme === 'light'
      ? Object.entries({ ...lightThemeTokens, ...lightWebsiteTokens })
      : Object.entries({ ...darkThemeTokens, ...darkWebsiteTokens });
  if (typeof window !== 'undefined') {
    const r = document.querySelector('html') as HTMLElement;
    for (const token in tokens) {
      r.style.setProperty(tokens[token][0], tokens[token][1]);
    }
  }
};
