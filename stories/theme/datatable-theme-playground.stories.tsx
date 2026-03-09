import darkThemeTokens from '@semcore/core/lib/theme/themes/dark';
import defaultThemeTokens from '@semcore/core/lib/theme/themes/default';
import newThemeTokens from '@semcore/core/lib/theme/themes/new';
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import './theme-playground-fonts.css';

const LAZZER_FONT = '\'Lazzer\', sans-serif';

const meta: Meta = {
  title: 'Theme/DataTable Theme Playground',
};

export default meta;

type Story = StoryObj;

const THEMES = [
  { id: 'light', label: 'Light', tokens: defaultThemeTokens },
  { id: 'new', label: 'New', tokens: newThemeTokens },
  { id: 'dark', label: 'Dark', tokens: darkThemeTokens },
] as const;

const BG_PRIMARY_TOKEN = '--intergalactic-bg-primary-neutral';

const dataTableData: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.40', vol: '65,457,920' },
  { keyword: 'ebay store', kd: '10.0', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0.00', vol: '21,644,290' },
];

function DataTableThemePlaygroundContent() {
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
            DataTable theme playground
          </Text>
          <Box
            position='fixed'
            top={0}
            right={0}
            zIndex={10000}
            p={4}
          >
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
          </Box>
        </Flex>

        <Flex direction='column' gap={10} alignItems='flex-start'>
          <Box wMin={500}>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              DataTable
            </Text>
            <DataTable
              data={dataTableData}
              aria-label='Theme playground table'
              wMax='600px'
              columns={[
                { name: 'keyword', children: 'Keyword' },
                { name: 'kd', children: 'KD %', justifyContent: 'end' },
                { name: 'cpc', children: 'CPC', justifyContent: 'end' },
                { name: 'vol', children: 'Vol.', justifyContent: 'end' },
              ]}
            />
          </Box>
          <Box wMin={500}>
            <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
              DataTable (secondary)
            </Text>
            <DataTable
              use='secondary'
              data={dataTableData}
              aria-label='Theme playground table secondary'
              wMax='600px'
              columns={[
                { name: 'keyword', children: 'Keyword' },
                { name: 'kd', children: 'KD %', justifyContent: 'end' },
                { name: 'cpc', children: 'CPC', justifyContent: 'end' },
                { name: 'vol', children: 'Vol.', justifyContent: 'end' },
              ]}
            />
          </Box>
        </Flex>
      </Box>
    </ThemeProvider>
  );
}

export const Default: Story = {
  render: () => <DataTableThemePlaygroundContent />,
};
