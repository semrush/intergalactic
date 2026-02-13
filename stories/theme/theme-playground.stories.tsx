import darkThemeTokens from '@semcore/core/lib/theme/themes/dark';
import defaultThemeTokens from '@semcore/core/lib/theme/themes/default';
import newThemeTokens from '@semcore/core/lib/theme/themes/new';
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';
import MathPlusM from '@semcore/icon/MathPlus/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import './theme-playground-fonts.css';

const LAZZER_FONT = '\'Lazzer\', sans-serif';

const meta: Meta = {
  title: 'Theme/Theme Playground',
};

export default meta;

type Story = StoryObj;

/** Список тем для переключения. Чтобы добавить новую тему: добавьте JSON в semcore/core/src/theme, прогоните process-theme, добавьте экспорт в core/package.json и сюда запись. */
const THEMES = [
  { id: 'light', label: 'Light', tokens: defaultThemeTokens },
  { id: 'new', label: 'New', tokens: newThemeTokens },
  { id: 'dark', label: 'Dark', tokens: darkThemeTokens },
] as const;

function ButtonRow({
  use,
  theme,
  size = 'm',
}: {
  use: 'primary' | 'secondary' | 'tertiary';
  theme: 'info' | 'success' | 'danger' | 'brand' | 'muted' | 'invert';
  size?: 'm' | 'l';
}) {
  return (
    <Flex gap={1}>
      <Button use={use} theme={theme} size={size}>
        Button
      </Button>
      <Button use={use} theme={theme} size={size} addonLeft={MathPlusM}>
        Button
      </Button>
      <Button use={use} theme={theme} size={size} addonLeft={MathPlusM} title='Icon only' />
    </Flex>
  );
}

const BG_PRIMARY_TOKEN = '--intergalactic-bg-primary-neutral';

function ThemePlaygroundContent() {
  const [themeIndex, setThemeIndex] = React.useState(0);
  const currentTheme = THEMES[themeIndex];

  React.useEffect(() => {
    const prevBackground = document.body.style.background;
    document.body.style.background = `var(${BG_PRIMARY_TOKEN})`;
    document.body.style.setProperty(BG_PRIMARY_TOKEN, currentTheme.tokens[BG_PRIMARY_TOKEN] ?? '');
    return () => {
      document.body.style.background = prevBackground;
      document.body.style.removeProperty(BG_PRIMARY_TOKEN);
    };
  }, [currentTheme.tokens]);

  return (
    <ThemeProvider tokens={currentTheme.tokens}>
      <Box p={6} style={{ background: 'var(--intergalactic-bg-primary-neutral)' }}>
        <Flex justifyContent='space-between' alignItems='center' mb={10}>
          <Text tag='h1' semibold size={600} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            Theme playground
          </Text>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button} use='secondary' size='l'>
              Theme: {currentTheme.label}
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              {THEMES.map((theme, index) => (
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
        </Flex>
        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Button
        </Text>

        <Flex gap={8} alignItems='flex-start'>
          {/* Колонка 1: кнопки с темами кроме invert */}
          <Flex direction='column' gap={6}>
            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='primary' theme='info' />
              <ButtonRow use='primary' theme='success' />
            </Flex>

            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='primary' theme='danger' />
              <ButtonRow use='primary' theme='brand' />
            </Flex>

            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='secondary' theme='muted' />
            </Flex>

            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='tertiary' theme='muted' />
              <ButtonRow use='tertiary' theme='info' />
            </Flex>

            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='primary' theme='info' size='l' />
              <ButtonRow use='primary' theme='success' size='l' />
            </Flex>

            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='primary' theme='danger' size='l' />
              <ButtonRow use='primary' theme='brand' size='l' />
            </Flex>

            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='secondary' theme='muted' size='l' />
            </Flex>

            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonRow use='tertiary' theme='muted' size='l' />
              <ButtonRow use='tertiary' theme='info' size='l' />
            </Flex>
          </Flex>

          {/* Колонка 2: кнопки только с темой invert на тёмном фоне */}
          <Box
            p={4}
            style={{
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
              width: 'fit-content',
            }}
          >
            <Flex direction='column' gap={6}>
              <ButtonRow use='primary' theme='invert' />
              <ButtonRow use='secondary' theme='invert' />
              <ButtonRow use='tertiary' theme='invert' />
              <ButtonRow use='primary' theme='invert' size='l' />
              <ButtonRow use='secondary' theme='invert' size='l' />
              <ButtonRow use='tertiary' theme='invert' size='l' />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ThemeProvider>
  );
}

export const Default: Story = {
  render: () => <ThemePlaygroundContent />,
};
