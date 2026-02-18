import darkThemeTokens from '@semcore/core/lib/theme/themes/dark';
import defaultThemeTokens from '@semcore/core/lib/theme/themes/default';
import newThemeTokens from '@semcore/core/lib/theme/themes/new';
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';
import MathPlusM from '@semcore/icon/MathPlus/m';
import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Checkbox from '@semcore/ui/checkbox';
import { DatePicker } from '@semcore/ui/date-picker';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import FeaturePopover from '@semcore/ui/feature-popover';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import Notice from '@semcore/ui/notice';
import Pills from '@semcore/ui/pills';
import ProgressBar from '@semcore/ui/progress-bar';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Select from '@semcore/ui/select';
import Slider from '@semcore/ui/slider';
import Switch from '@semcore/ui/switch';
import TabLine from '@semcore/ui/tab-line';
import Tag from '@semcore/ui/tag';
import Textarea from '@semcore/ui/textarea';
import Tooltip from '@semcore/ui/tooltip';
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

const SELECT_OPTIONS = [
  { value: '1', label: 'Option 1', children: 'Option 1' },
  { value: '2', label: 'Option 2', children: 'Option 2' },
  { value: '3', label: 'Option 3', children: 'Option 3' },
];

const FILTER_TRIGGER_OPTIONS = ['Blue', 'Gray', 'Green', 'Orange', 'Pink', 'Red', 'Salad', 'Violet', 'Yellow'];

function ThemePlaygroundContent() {
  const [themeIndex, setThemeIndex] = React.useState(0);
  const [radioValue, setRadioValue] = React.useState('1');
  const [pillsValue, setPillsValue] = React.useState<string | null>(null);
  const [tabValue, setTabValue] = React.useState(1);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [dateValue, setDateValue] = React.useState<Date | undefined>(new Date());
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
      <Box
        position='fixed'
        top={0}
        right={0}
        zIndex={1000}
        p={2}
        style={{ background: 'var(--intergalactic-bg-primary-neutral)' }}
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
      <Box p={6} style={{ background: 'var(--intergalactic-bg-primary-neutral)' }}>
        <Flex alignItems='center' mb={10}>
          <Text tag='h1' semibold size={600} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            Theme playground
          </Text>
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

        <Text tag='h2' size={400} semibold mb={6} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Link
        </Text>
        <Flex gap={8} flexWrap alignItems='center' mb={10}>
          <Link href='#' color='text-primary' size={300}>
            Primary link
          </Link>
          <Link href='#' color='text-critical' size={300}>
            Critical link
          </Link>
          <Link href='#' color='text-success' size={300}>
            Success link
          </Link>
          <Link href='#' color='text-secondary' size={300}>
            Secondary link
          </Link>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Tooltip
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <Tooltip
            title='Short tooltip text for theme playground.'
            tag={Button}
            use='secondary'
          >
            Hover me
          </Tooltip>
          <Tooltip
            title='Another tooltip with theme styles.'
            tag={Button}
            use='tertiary'
          >
            Button with tooltip
          </Tooltip>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Badge
        </Text>
        <Flex gap={8} alignItems='center'>
          <Flex gap={2} alignItems='center'>
            <Badge type='admin' />
            <Badge type='alpha' />
            <Badge type='beta' />
            <Badge type='new' />
            <Badge type='soon' />
          </Flex>
          <Box
            p={4}
            style={{
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
              width: 'fit-content',
            }}
          >
            <Flex gap={2} alignItems='center'>
              <Badge type='admin' inverted />
              <Badge type='alpha' inverted />
              <Badge type='beta' inverted />
              <Badge type='new' inverted />
              <Badge type='soon' inverted />
            </Flex>
          </Box>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Checkbox & Radio
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <Flex direction='column' gap={4}>
            <Checkbox label='Checkbox option 1' />
            <Checkbox label='Checkbox option 2' defaultChecked />
            <Checkbox label='Checkbox disabled' disabled />
          </Flex>
          <RadioGroup name='theme-playground-radio' value={radioValue} onChange={setRadioValue}>
            <Flex direction='column' gap={2}>
              <Radio value='1' label='Radio option 1' />
              <Radio value='2' label='Radio option 2' />
              <Radio value='3' label='Radio disabled' disabled />
            </Flex>
          </RadioGroup>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Input
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' direction='column'>
          <Flex gap={6} flexWrap alignItems='center'>
            <Input size='m' w={240}>
              <Input.Value placeholder='Placeholder' />
            </Input>
            <Input size='l' w={240}>
              <Input.Value placeholder='Placeholder' />
            </Input>
          </Flex>
          <Flex gap={6} flexWrap alignItems='center'>
            <Input size='m' w={240} state='invalid'>
              <Input.Value placeholder='Invalid state' />
            </Input>
            <Input size='m' w={240} disabled>
              <Input.Value placeholder='Disabled' />
            </Input>
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Select
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <Select options={SELECT_OPTIONS} placeholder='Select option' w={240} />
          <Select options={SELECT_OPTIONS} placeholder='Disabled' w={240} disabled />
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          DatePicker
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <Flex direction='column' gap={2} alignItems='flex-start'>
            <Text tag='label' size={200} htmlFor='theme-playground-date-picker' color='text-primary'>
              Select date
            </Text>
            <DatePicker value={dateValue} onChange={setDateValue}>
              <DatePicker.Trigger id='theme-playground-date-picker' />
              <DatePicker.Popper />
            </DatePicker>
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Switch
        </Text>
        <Flex gap={8} flexWrap alignItems='center' mb={10}>
          <Switch size='m'>
            <Switch.Value />
            <Switch.Addon>Switch M</Switch.Addon>
          </Switch>
          <Switch size='m' theme='success'>
            <Switch.Value defaultChecked />
            <Switch.Addon>Checked</Switch.Addon>
          </Switch>
          <Switch size='l'>
            <Switch.Value />
            <Switch.Addon>Switch L</Switch.Addon>
          </Switch>
          <Switch size='m' disabled>
            <Switch.Value />
            <Switch.Addon>Disabled</Switch.Addon>
          </Switch>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Tag
        </Text>
        <Flex gap={2} flexWrap alignItems='center' mb={10}>
          <Tag theme='primary' size='m'>
            <Tag.Text>Primary</Tag.Text>
          </Tag>
          <Tag theme='secondary' size='m'>
            <Tag.Text>Secondary</Tag.Text>
          </Tag>
          <Tag theme='additional' size='m'>
            <Tag.Text>Additional</Tag.Text>
          </Tag>
          <Tag theme='primary' size='m' disabled>
            <Tag.Text>Disabled</Tag.Text>
          </Tag>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Pills
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <Pills value={pillsValue} onChange={setPillsValue} size='m'>
            <Pills.Item value='1'>Option 1</Pills.Item>
            <Pills.Item value='2'>Option 2</Pills.Item>
            <Pills.Item value='3'>Option 3</Pills.Item>
          </Pills>
          <Pills value={pillsValue} onChange={setPillsValue} size='l'>
            <Pills.Item value='1'>Option 1</Pills.Item>
            <Pills.Item value='2'>Option 2</Pills.Item>
          </Pills>
          <Pills value='1' size='m' disabled>
            <Pills.Item value='1'>Disabled</Pills.Item>
            <Pills.Item value='2'>Option 2</Pills.Item>
          </Pills>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Textarea
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <Textarea w={280} size='m' placeholder='Placeholder' minRows={3} />
          <Textarea w={280} size='l' placeholder='Placeholder' minRows={3} />
          <Textarea w={280} size='m' placeholder='Disabled' minRows={2} disabled />
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Slider
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <Box w={200}>
            <Slider value={sliderValue} onChange={setSliderValue} step={1} min={0} max={100}>
              <Slider.Bar />
              <Slider.Knob />
            </Slider>
          </Box>
          <Box w={200}>
            <Slider value={30} step={1} min={0} max={100} disabled>
              <Slider.Bar />
              <Slider.Knob />
            </Slider>
          </Box>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          TabLine
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10} wMax={400}>
          <TabLine value={tabValue} onChange={setTabValue}>
            <TabLine.Item value={1}>Tab 1</TabLine.Item>
            <TabLine.Item value={2}>Tab 2</TabLine.Item>
            <TabLine.Item value={3}>Tab 3</TabLine.Item>
          </TabLine>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          FilterTrigger
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <Flex direction='column' gap={2} alignItems='flex-start'>
            <Text tag='label' id='color-filter-label' htmlFor='color-filter-trigger' size={200} color='text-primary'>
              Color
            </Text>
            <Select>
              <Select.Trigger tag={FilterTrigger} id='color-filter-trigger' />
              <Select.Menu aria-labelledby='color-filter-label'>
                {FILTER_TRIGGER_OPTIONS.map((option, idx) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select.Menu>
            </Select>
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          ProgressBar
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' direction='column' mb={10}>
          <Box w={240}>
            <ProgressBar value={0} aria-label='Progress 0%' />
          </Box>
          <Box w={240}>
            <ProgressBar value={40} aria-label='Progress 40%' />
          </Box>
          <Box w={240}>
            <ProgressBar value={100} aria-label='Progress 100%' />
          </Box>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Notice
        </Text>
        <Flex gap={4} flexWrap direction='column' alignItems='stretch' mb={10}>
          <Notice aria-label='Info notice' theme='info' wMax={400}>
            <Notice.Content>
              <Notice.Title>Info notice</Notice.Title>
              <Notice.Text>Short message for theme playground.</Notice.Text>
            </Notice.Content>
            <Notice.Close />
          </Notice>
          <Notice aria-label='Warning notice' theme='warning' wMax={400}>
            <Notice.Content>
              <Notice.Title>Warning notice</Notice.Title>
              <Notice.Text>Short message for theme playground.</Notice.Text>
            </Notice.Content>
            <Notice.Close />
          </Notice>
          <Notice aria-label='Danger notice' theme='danger' wMax={400}>
            <Notice.Content>
              <Notice.Title>Danger notice</Notice.Title>
              <Notice.Text>Short message for theme playground.</Notice.Text>
            </Notice.Content>
            <Notice.Close />
          </Notice>
          <Notice aria-label='Success notice' theme='success' wMax={400}>
            <Notice.Content>
              <Notice.Title>Success notice</Notice.Title>
              <Notice.Text>Short message for theme playground.</Notice.Text>
            </Notice.Content>
            <Notice.Close />
          </Notice>
          <Notice aria-label='Muted notice' theme='muted' wMax={400}>
            <Notice.Content>
              <Notice.Title>Muted notice</Notice.Title>
              <Notice.Text>Short message for theme playground.</Notice.Text>
            </Notice.Content>
            <Notice.Close />
          </Notice>
        </Flex>

        <Text tag='h2' size={400} semibold mb={6} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          FeaturePopover
        </Text>
        <Flex gap={4} flexWrap alignItems='flex-start' mb={10}>
          <FeaturePopover visible disablePortal placement='right-start'>
            <FeaturePopover.Trigger>
              <Button>Open popover</Button>
            </FeaturePopover.Trigger>
            <FeaturePopover.Popper wMax={320} aria-label='Feature popover'>
              <Text size={300} bold tag='h3' mb={1} mt={0}>
                Feature title
              </Text>
              <Text size={200} tag='p'>
                Short description for theme playground.
              </Text>
            </FeaturePopover.Popper>
          </FeaturePopover>
        </Flex>
      </Box>
    </ThemeProvider>
  );
}

export const Default: Story = {
  render: () => <ThemePlaygroundContent />,
};
