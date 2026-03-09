import darkThemeTokens from '@semcore/core/lib/theme/themes/dark';
import defaultThemeTokens from '@semcore/core/lib/theme/themes/default';
import newThemeTokens from '@semcore/core/lib/theme/themes/new';
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';
import MathPlusM from '@semcore/icon/MathPlus/m';
import SettingsM from '@semcore/icon/Settings/m';
import Accordion from '@semcore/ui/accordion';
import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Button, { ButtonLink } from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import Counter from '@semcore/ui/counter';
import { DatePicker } from '@semcore/ui/date-picker';
import Divider from '@semcore/ui/divider';
import Dot from '@semcore/ui/dot';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Flag from '@semcore/ui/flags';
import InlineInput from '@semcore/ui/inline-input';
import Input from '@semcore/ui/input';
import InputMask from '@semcore/ui/input-mask';
import InputNumber from '@semcore/ui/input-number';
import InputTags from '@semcore/ui/input-tags';
import Link from '@semcore/ui/link';
import Notice from '@semcore/ui/notice';
import Pills from '@semcore/ui/pills';
import ProgressBar from '@semcore/ui/progress-bar';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Select from '@semcore/ui/select';
import Skeleton from '@semcore/ui/skeleton';
import Slider from '@semcore/ui/slider';
import Spin from '@semcore/ui/spin';
import Switch from '@semcore/ui/switch';
import TabLine from '@semcore/ui/tab-line';
import Tag, { TagContainer } from '@semcore/ui/tag';
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

/** List of themes for switching. To add a new theme: add JSON to semcore/core/src/theme, run process-theme, add the export to core/package.json and add an entry here. */
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

function ButtonLinkRow({
  use,
  size = 300,
}: {
  use: 'primary' | 'secondary';
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
}) {
  return (
    <Flex gap={2}>
      <ButtonLink use={use} size={size}>
        ButtonLink
      </ButtonLink>
      <ButtonLink use={use} size={size} addonLeft={MathPlusM}>
        ButtonLink
      </ButtonLink>
      <ButtonLink use={use} size={size} addonLeft={MathPlusM} title='Icon only' />
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
  const [bulkTextareaValue, setBulkTextareaValue] = React.useState('');
  const [colorValue, setColorValue] = React.useState('#2DAF00');
  const [inputRangeFrom, setInputRangeFrom] = React.useState('');
  const [inputRangeTo, setInputRangeTo] = React.useState('');
  const [inputPhoneCountry, setInputPhoneCountry] = React.useState<'DE' | 'GB'>('DE');
  const [inputPhoneValue, setInputPhoneValue] = React.useState('+49');
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
        p={4}
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
        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Accordion
        </Text>
        <Flex gap={4} direction='column' flexWrap alignItems='flex-start' mb={10}>
          <Box wMin={280}>
            <Accordion use='primary'>
              {[1, 2].map((index) => (
                <Accordion.Item value={index} key={index}>
                  <Accordion.Item.Toggle>
                    <Accordion.Item.ToggleButton gap={2}>
                      <Accordion.Item.Chevron />
                      Section
                      {' '}
                      {index}
                    </Accordion.Item.ToggleButton>
                  </Accordion.Item.Toggle>
                  <Accordion.Item.Collapse>
                    <Box py={2} pl={6}>
                      Content for section
                      {' '}
                      {index}
                      .
                    </Box>
                  </Accordion.Item.Collapse>
                </Accordion.Item>
              ))}
            </Accordion>
          </Box>
          <Box wMin={280}>
            <Accordion use='secondary'>
              {[1, 2].map((index) => (
                <Accordion.Item value={index} key={index}>
                  <Accordion.Item.Toggle>
                    <Accordion.Item.ToggleButton gap={2}>
                      <Accordion.Item.Chevron />
                      Section
                      {' '}
                      {index}
                    </Accordion.Item.ToggleButton>
                  </Accordion.Item.Toggle>
                  <Accordion.Item.Collapse>
                    <Box py={2} pl={6}>
                      Content for section
                      {' '}
                      {index}
                      .
                    </Box>
                  </Accordion.Item.Collapse>
                </Accordion.Item>
              ))}
            </Accordion>
          </Box>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Breadcrumbs
        </Text>
        <Flex gap={8} flexWrap alignItems='center' mb={10}>
          <Breadcrumbs>
            <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#'>Dashboard</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#' active>
              Current page
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Button
        </Text>

        <Flex gap={8} alignItems='flex-start'>
          {/* Column 1: buttons with themes except invert */}
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

          {/* Column 2: buttons with invert theme only on dark background */}
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          ButtonLink
        </Text>
        <Flex gap={8} alignItems='flex-start' flexWrap>
          <Flex direction='column' gap={6}>
            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonLinkRow use='primary' />
              <ButtonLinkRow use='secondary' />
            </Flex>
            <Flex gap={8} flexWrap alignItems='center'>
              <ButtonLinkRow use='primary' size={400} />
              <ButtonLinkRow use='secondary' size={400} />
            </Flex>
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Link
        </Text>
        <Flex gap={8} flexWrap alignItems='center' mb={10}>
          <Link href='#' size={300}>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Card
        </Text>
        <Box wMax={400} mb={10}>
          <Card tag='section' aria-labelledby='card-title'>
            <Card.Header>
              <Flex justifyContent='space-between' alignItems='center'>
                <Card.Title
                  innerHint='When drawing comparisons between different classes of animals.'
                  innerHintAriaLabel='About fastest animals'
                  tag='h3'
                  id='card-title'
                >
                  Fastest animals
                </Card.Title>
                <Button addonLeft={SettingsM} use='tertiary' theme='muted' aria-label='Settings' />
              </Flex>
              <Card.Description>
                This is a list of the fastest animals in the world, by types of animal.
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <Text size={200}>
                The peregrine falcon is the fastest bird, and the fastest member of the animal
                kingdom, with a diving speed of over 300 km/h (190 mph). The fastest land animal is
                the cheetah.
              </Text>
            </Card.Body>
          </Card>
        </Box>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          ColorPicker
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <Flex direction='column'>
            <Text tag='label' size={200} htmlFor='theme-playground-color'>
              Main theme color
            </Text>
            <ColorPicker value={colorValue} onChange={setColorValue}>
              <ColorPicker.Trigger mt={2} id='theme-playground-color' />
              <ColorPicker.Popper>
                <ColorPicker.Colors />
                <PaletteManager>
                  <PaletteManager.Colors />
                  <PaletteManager.InputColor />
                </PaletteManager>
              </ColorPicker.Popper>
            </ColorPicker>
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Counter
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <Counter size='m'>42</Counter>
          <Counter size='m' theme='info'>42</Counter>
          <Counter size='m' theme='warning'>42</Counter>
          <Counter size='m' theme='danger'>42</Counter>
          <Counter size='m' theme='bg-primary-neutral'>42</Counter>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Divider
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <Flex direction='column' w={200} gap={2}>
            <Text size={200} color='text-secondary'>Horizontal</Text>
            <Divider />
          </Flex>
          <Flex alignItems='center' h={40} gap={2}>
            <Text size={200} color='text-secondary'>Vertical</Text>
            <Divider orientation='vertical' />
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Dot
        </Text>
        <Flex gap={6} flexWrap alignItems='center' mb={10}>
          <Dot size='m' aria-label='Notifications'>3</Dot>
          <Dot size='l' aria-label='Notifications'>12</Dot>
          <Button>
            Button
            <Dot up size='m' aria-label='New'>1</Dot>
          </Button>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          InputNumber & InputRange
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <Flex direction='column' gap={2}>
            <Text tag='label' size={200} htmlFor='theme-playground-input-number'>
              Number
            </Text>
            <InputNumber w={160} size='m'>
              <InputNumber.Value
                id='theme-playground-input-number'
                placeholder='0'
                min={0}
                max={100}
                step={1}
              />
              <InputNumber.Controls />
            </InputNumber>
          </Flex>
          <Flex direction='column' gap={2}>
            <Text tag='label' size={200}>
              Range (From – To)
            </Text>
            <Flex>
              <InputNumber neighborLocation='right' w={100}>
                <InputNumber.Value
                  placeholder='From'
                  min={0}
                  max={100}
                  value={inputRangeFrom}
                  onChange={(v) => setInputRangeFrom(String(v ?? ''))}
                />
                <InputNumber.Controls />
              </InputNumber>
              <InputNumber neighborLocation='left' w={100}>
                <InputNumber.Value
                  placeholder='To'
                  min={0}
                  max={100}
                  value={inputRangeTo}
                  onChange={(v) => setInputRangeTo(String(v ?? ''))}
                />
                <InputNumber.Controls />
              </InputNumber>
            </Flex>
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          InputTags
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <InputTags w={280} size='m' placeholder='Add tag'>
            <InputTags.Tag theme='primary'>
              <InputTags.Tag.Text>tag 1</InputTags.Tag.Text>
              <InputTags.Tag.Close />
            </InputTags.Tag>
            <InputTags.Tag theme='primary'>
              <InputTags.Tag.Text>tag 2</InputTags.Tag.Text>
              <InputTags.Tag.Close />
            </InputTags.Tag>
            <InputTags.Value />
          </InputTags>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          InputPhone
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <Flex direction='column' gap={2}>
            <Text tag='label' size={200} htmlFor='theme-playground-phone'>
              Phone
            </Text>
            <Flex>
              <Select
                value={inputPhoneCountry}
                onChange={(v: 'DE' | 'GB') => {
                  setInputPhoneCountry(v);
                  setInputPhoneValue(v === 'DE' ? '+49' : '+44');
                }}
              >
                <Select.Trigger aria-label='Country' neighborLocation='right' wMin={70}>
                  <Select.Trigger.Addon>
                    <Flag iso2={inputPhoneCountry} />
                  </Select.Trigger.Addon>
                </Select.Trigger>
                <Select.Menu>
                  <Select.Option value='DE'>DE +49</Select.Option>
                  <Select.Option value='GB'>GB +44</Select.Option>
                </Select.Menu>
              </Select>
              <InputMask w={200} neighborLocation='left'>
                <InputMask.Value
                  id='theme-playground-phone'
                  value={inputPhoneValue}
                  onChange={setInputPhoneValue}
                  mask={inputPhoneCountry === 'DE' ? '+49 (___)___-____' : '+44 ____ ______'}
                  aliases={{ _: /\d/ }}
                  type='tel'
                />
              </InputMask>
            </Flex>
          </Flex>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          InlineInput
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <InlineInput wMax={220}>
            <InlineInput.Value placeholder='Click to edit' defaultValue='Editable text' />
            <InlineInput.ConfirmControl />
            <InlineInput.CancelControl />
          </InlineInput>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Textarea
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <Textarea w={280} size='m' placeholder='Placeholder' minRows={3} />
          <Textarea w={280} size='l' placeholder='Placeholder' minRows={3} />
          <Textarea w={280} size='m' placeholder='Disabled' minRows={2} disabled />
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          BulkTextarea
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <BulkTextarea w={400} value={bulkTextareaValue} onChange={setBulkTextareaValue}>
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag='label' size={300} id='bulk-textarea-label'>
                Keywords
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby='bulk-textarea-label'
              commonErrorMessage=''
              placeholder='Enter or paste lines'
            />
            <Flex alignItems='center' justifyContent='space-between' mt={2}>
              <BulkTextarea.ErrorsNavigation />
              <BulkTextarea.ClearAll />
            </Flex>
          </BulkTextarea>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Select
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <Select options={SELECT_OPTIONS} placeholder='Select option' w={240} />
          <Select options={SELECT_OPTIONS} placeholder='Disabled' w={240} disabled />
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Skeleton
        </Text>
        <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
          <Skeleton h={48} w={200}>
            <Skeleton.Text amount={2} />
            <Skeleton.Text w='60%' />
          </Skeleton>
          <Box
            p={4}
            style={{
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            }}
          >
            <Skeleton h={48} w={200} theme='invert'>
              <Skeleton.Text amount={2} />
              <Skeleton.Text w='60%' />
            </Skeleton>
          </Box>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Tag
        </Text>
        <Flex gap={2} flexWrap alignItems='center' mb={10}>
          <Tag theme='primary' size='m'>
            <Tag.Text>Primary</Tag.Text>
          </Tag>
          <Tag theme='secondary' size='m'>
            <Tag.Text>Secondary</Tag.Text>
          </Tag>
          <Tag theme='additional' size='m' addonLeft={MathPlusM}>
            <Tag.Text>Additional</Tag.Text>
          </Tag>
          <Tag theme='primary' size='m' disabled>
            <Tag.Text>Disabled</Tag.Text>
          </Tag>
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={4}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <Tag key={color} theme='primary' color={`${color}-500`} size='m'>
                <Tag.Text>{color}</Tag.Text>
              </Tag>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={4}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <Tag key={color} theme='primary' color={`${color}-500`} size='l'>
                <Tag.Text>{color}</Tag.Text>
              </Tag>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={10}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <Tag key={color} theme='primary' color={`${color}-500`} size='xl'>
                <Tag.Text>{color}</Tag.Text>
              </Tag>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={4}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <Tag key={color} theme='primary' color={`${color}-500`} size='m' addonLeft={MathPlusM}>
                <Tag.Text>{color}</Tag.Text>
              </Tag>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={4}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <Tag key={color} theme='primary' color={`${color}-500`} size='l' addonLeft={MathPlusM}>
                <Tag.Text>{color}</Tag.Text>
              </Tag>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={10}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <Tag key={color} theme='primary' color={`${color}-500`} size='xl' addonLeft={MathPlusM}>
                <Tag.Text>{color}</Tag.Text>
              </Tag>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={4}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <TagContainer key={color} theme='primary' color={`${color}-500`} size='m' interactive>
                <TagContainer.Tag>
                  <TagContainer.Tag.Text>{color}</TagContainer.Tag.Text>
                </TagContainer.Tag>
                <TagContainer.Close />
              </TagContainer>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={4}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <TagContainer key={color} theme='primary' color={`${color}-500`} size='l' interactive>
                <TagContainer.Tag>
                  <TagContainer.Tag.Text>{color}</TagContainer.Tag.Text>
                </TagContainer.Tag>
                <TagContainer.Close />
              </TagContainer>
            ),
          )}
        </Flex>
        <Flex gap={2} flexWrap alignItems='center' mb={10}>
          {(['gray', 'blue', 'green', 'red', 'orange', 'yellow', 'violet', 'pink', 'salad'] as const).map(
            (color) => (
              <TagContainer key={color} theme='primary' color={`${color}-500`} size='xl' interactive>
                <TagContainer.Tag>
                  <TagContainer.Tag.Text>{color}</TagContainer.Tag.Text>
                </TagContainer.Tag>
                <TagContainer.Close />
              </TagContainer>
            ),
          )}
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          TabLine
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10} wMax={400}>
          <TabLine value={tabValue} onChange={setTabValue}>
            <TabLine.Item value={1}>Tab 1</TabLine.Item>
            <TabLine.Item value={2}>Tab 2</TabLine.Item>
            <TabLine.Item value={3}>Tab 3</TabLine.Item>
          </TabLine>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Spin
        </Text>
        <Flex gap={8} alignItems='flex-start'>
          <Flex direction='column' gap={6}>
            <Flex gap={8} flexWrap alignItems='center'>
              <Spin size='xs' />
              <Spin size='s' />
              <Spin size='m' />
            </Flex>
            <Flex gap={8} flexWrap alignItems='center'>
              <Spin size='l' />
              <Spin size='xl' />
              <Spin size='xxl' />
            </Flex>
          </Flex>
          <Box
            p={4}
            style={{
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            }}
          >
            <Flex direction='column' gap={6}>
              <Flex gap={8} flexWrap alignItems='center'>
                <Spin size='xs' theme='invert' />
                <Spin size='s' theme='invert' />
                <Spin size='m' theme='invert' />
              </Flex>
              <Flex gap={8} flexWrap alignItems='center'>
                <Spin size='l' theme='invert' />
                <Spin size='xl' theme='invert' />
                <Spin size='xxl' theme='invert' />
              </Flex>
            </Flex>
          </Box>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
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
      </Box>
    </ThemeProvider>
  );
}

export const Default: Story = {
  render: () => <ThemePlaygroundContent />,
};
