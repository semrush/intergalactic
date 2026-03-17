import aquaGreenThemeTokens from '@semcore/core/lib/theme/themes/aqua-green';
import darkThemeTokens from '@semcore/core/lib/theme/themes/dark';
import defaultThemeTokens from '@semcore/core/lib/theme/themes/default';
import highlightsAquaGreen from '@semcore/core/lib/theme/themes/highlights-aqua-green';
import highlightsDark from '@semcore/core/lib/theme/themes/highlights-dark';
import highlightsLight from '@semcore/core/lib/theme/themes/highlights-light';
import highlightsLightNew from '@semcore/core/lib/theme/themes/highlights-light-new';
import highlightsLightNew2ver from '@semcore/core/lib/theme/themes/highlights-light-new-2ver';
import highlightsLimeGreen from '@semcore/core/lib/theme/themes/highlights-lime-green';
import highlightsNew from '@semcore/core/lib/theme/themes/highlights-new';
import highlightsNewAdjusted from '@semcore/core/lib/theme/themes/highlights-new-adjusted';
import lightNewThemeTokens from '@semcore/core/lib/theme/themes/light-new';
import lightNew2verThemeTokens from '@semcore/core/lib/theme/themes/light-new-2ver';
import limeGreenThemeTokens from '@semcore/core/lib/theme/themes/lime-green';
import newThemeTokens from '@semcore/core/lib/theme/themes/new';
import newAdjustedThemeTokens from '@semcore/core/lib/theme/themes/new-adjusted';
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';
import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import React from 'react';

export const THEMES = [
  { id: 'light-new', label: '[new] light-new', tokens: lightNewThemeTokens },
  { id: 'light-new-2ver', label: '[new] light-new-crazy', tokens: lightNew2verThemeTokens },
  { id: 'light', label: '[current] light', tokens: defaultThemeTokens },
  { id: 'new-adjusted', label: '[new] light-new adjusted from Lesha', tokens: newAdjustedThemeTokens },
  { id: 'new', label: '[new] product test', tokens: newThemeTokens },
  { id: 'aqua-green', label: '[marketing] 🟦 aqua green', tokens: aquaGreenThemeTokens },
  { id: 'lime-green', label: '[marketing] 🟩 lime green', tokens: limeGreenThemeTokens },
  { id: 'dark', label: '[current] dark (for website)', tokens: darkThemeTokens },
] as const;

/** Feature Highlight tokens per theme (border, bg, control, etc. for NoticeFH, ButtonFH, etc.) */
const HIGHLIGHTS_BY_THEME_ID: Record<(typeof THEMES)[number]['id'], Record<string, string>> = {
  'light-new': highlightsLightNew,
  'light-new-2ver': highlightsLightNew2ver,
  'light': highlightsLight,
  'new-adjusted': highlightsNewAdjusted,
  'new': highlightsNew,
  'aqua-green': highlightsAquaGreen,
  'lime-green': highlightsLimeGreen,
  'dark': highlightsDark,
};

export const BG_PRIMARY_TOKEN = '--intergalactic-bg-primary-neutral';

type ThemePlaygroundContextValue = {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  currentTheme: (typeof THEMES)[number];
  themes: readonly (typeof THEMES)[number][];
};

const ThemePlaygroundContext = React.createContext<ThemePlaygroundContextValue | null>(null);

function useThemePlaygroundContext() {
  const ctx = React.useContext(ThemePlaygroundContext);
  if (!ctx) {
    throw new Error('ThemeSwitcherDropdown must be used inside ThemePlaygroundLayout');
  }
  return ctx;
}

type ThemeSwitcherDropdownProps = {
  dropdownMenuProps?: Partial<React.ComponentProps<typeof DropdownMenu>>;
  triggerProps?: Partial<React.ComponentProps<typeof Button>>;
};

/** Renders only the theme dropdown. Use inside ThemePlaygroundLayout when switcherVariant="inline" to place the switcher in your own layout (e.g. ProductHead.Buttons). */
export function ThemeSwitcherDropdown({
  dropdownMenuProps,
  triggerProps = {},
}: ThemeSwitcherDropdownProps) {
  const { themeIndex, setThemeIndex, currentTheme, themes } = useThemePlaygroundContext();
  const defaultTriggerProps = { use: 'secondary' as const, size: 'l' as const };
  const mergedTriggerProps = { ...defaultTriggerProps, ...triggerProps };

  return (
    <DropdownMenu {...dropdownMenuProps}>
      <DropdownMenu.Trigger tag={Button} {...mergedTriggerProps}>
        Theme: {currentTheme.label}
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {themes.map((theme, index) => (
          <DropdownMenu.Item
            key={theme.id}
            selected={themeIndex === index}
            onClick={() => setThemeIndex(index)}
          >
            {theme.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}

type ThemePlaygroundLayoutProps = {
  children: React.ReactNode;
  /**
   * - 'fixed' (default): switcher in a fixed box top-right.
   * - 'inline': no fixed box; render ThemeSwitcherDropdown inside children where you need it (e.g. ProductHead.Buttons).
   */
  switcherVariant?: 'fixed' | 'inline';
  /** Props for the theme dropdown (e.g. disablePortal for use inside modals). Only used when switcherVariant='fixed'. */
  dropdownMenuProps?: Partial<React.ComponentProps<typeof DropdownMenu>>;
  /** z-index for the fixed switcher box (default 1000). Only used when switcherVariant='fixed'. */
  switcherZIndex?: number;
};

export function ThemePlaygroundLayout({
  children,
  switcherVariant = 'fixed',
  dropdownMenuProps,
  switcherZIndex = 1000,
}: ThemePlaygroundLayoutProps) {
  const [themeIndex, setThemeIndex] = React.useState(0);
  const currentTheme = THEMES[themeIndex];
  const tokensWithHighlights = React.useMemo(
    () => ({
      ...currentTheme.tokens,
      ...(HIGHLIGHTS_BY_THEME_ID[currentTheme.id] ?? {}),
    }),
    [currentTheme],
  );

  React.useEffect(() => {
    const prevBackground = document.body.style.background;
    document.body.style.background = `var(${BG_PRIMARY_TOKEN})`;
    document.body.style.setProperty(BG_PRIMARY_TOKEN, currentTheme.tokens[BG_PRIMARY_TOKEN] ?? '');
    return () => {
      document.body.style.background = prevBackground;
      document.body.style.removeProperty(BG_PRIMARY_TOKEN);
    };
  }, [currentTheme.tokens]);

  const contextValue: ThemePlaygroundContextValue = {
    themeIndex,
    setThemeIndex,
    currentTheme,
    themes: THEMES,
  };

  return (
    <ThemeProvider tokens={tokensWithHighlights}>
      <ThemePlaygroundContext.Provider value={contextValue}>
        {switcherVariant === 'fixed' && (
          <Box
            position='fixed'
            top={0}
            right={0}
            zIndex={switcherZIndex}
            p={4}
            style={{ overflow: 'visible' }}
          >
            <ThemeSwitcherDropdown
              dropdownMenuProps={{
                ...dropdownMenuProps,
                zIndex: Math.max(switcherZIndex + 1, 99999),
              }}
            />
          </Box>
        )}
        {children}
      </ThemePlaygroundContext.Provider>
    </ThemeProvider>
  );
}
