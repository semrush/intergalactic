import MathPlusM from '@semcore/icon/MathPlus/m';
import SettingsM from '@semcore/icon/Settings/m';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Accordion from '@semcore/ui/accordion';
import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Button, {
  ButtonLink,
  type ButtonProps,
  type ButtonLinkProps,
} from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
import Counter from '@semcore/ui/counter';
import { DatePicker, DateRangePicker, DateRangeComparator } from '@semcore/ui/date-picker';
import Divider from '@semcore/ui/divider';
import Dot from '@semcore/ui/dot';
import DnD from '@semcore/ui/drag-and-drop';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import {
  BadgeFH,
  ButtonFH,
  CheckboxFH,
  InputFH,
  NoticeFH,
  PillsFH,
  RadioFH,
  SelectFH,
  SwitchFH,
  TabLineFH,
} from '@semcore/ui/feature-highlight';
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
import { List, Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { ThemePlaygroundLayout } from './theme-playground-switcher';
import './theme-playground-fonts.css';

const LAZZER_FONT = '\'Lazzer\', sans-serif';

function FeatureHighlightDemo() {
  const [selectValue, setSelectValue] = React.useState('');
  return (
    <Flex gap={4} direction='column'>
      <Flex flexWrap gap={4}>
        <Flex flexWrap gap={4} data-testid='buttons'>
          <ButtonFH use='primary' addonLeft={SummaryAI}>
            Primary
          </ButtonFH>
          <ButtonFH>
            <ButtonFH.Addon />
            <ButtonFH.Text>Secondary</ButtonFH.Text>
            <ButtonFH.Addon>
              <BadgeFH>AI powered</BadgeFH>
            </ButtonFH.Addon>
          </ButtonFH>
        </Flex>
        <Flex flexWrap gap={4} data-testid='pills'>
          <PillsFH defaultValue={1} aria-label='Pills with AI accent'>
            <PillsFH.Item value={1}>One</PillsFH.Item>
            <PillsFH.HighlightedItem value={2}>
              <PillsFH.HighlightedItem.Addon />
              <PillsFH.HighlightedItem.Text>Two</PillsFH.HighlightedItem.Text>
            </PillsFH.HighlightedItem>
          </PillsFH>
        </Flex>
        <SelectFH onChange={setSelectValue}>
          <SelectFH.Trigger aria-label='Select with AI theme' wMax={160} wMin={160}>
            <SelectFH.Trigger.Addon />
            <SelectFH.Trigger.Text>{selectValue}</SelectFH.Trigger.Text>
          </SelectFH.Trigger>
          <SelectFH.Menu>
            <SelectFH.Option value='One'>One</SelectFH.Option>
            <SelectFH.Option value='Two'>Two</SelectFH.Option>
            <SelectFH.Option value='Three'>Three</SelectFH.Option>
          </SelectFH.Menu>
        </SelectFH>
        <Flex flexWrap gap={4} data-testid='input'>
          <InputFH w={250}>
            <InputFH.Addon />
            <InputFH.Value placeholder='Your domain' aria-label='Input with AI theme' />
            <InputFH.Addon>
              <BadgeFH>AI powered</BadgeFH>
            </InputFH.Addon>
          </InputFH>
        </Flex>
        <SwitchFH>
          <SwitchFH.Value ml={0} />
          <SwitchFH.Addon>Receive updates</SwitchFH.Addon>
        </SwitchFH>
      </Flex>
      <Flex gap={12}>
        <RadioGroup name='radio-fh' aria-labelledby='radioGroup'>
          <Text id='radioGroup' size={200} mb={2}>
            Radio button with AI accent
          </Text>
          <Flex gap={3} direction='column'>
            <RadioFH value='1'>
              <RadioFH.Value />
              <RadioFH.Text>
                First option
                <Box
                  tag={SummaryAI}
                  color='--intergalactic-icon-primary-feature-highlight'
                  ml={2}
                  style={{ verticalAlign: -3 }}
                />
              </RadioFH.Text>
            </RadioFH>
            <Radio value='2' label='Second option' />
          </Flex>
        </RadioGroup>
        <fieldset style={{ border: 'none' }}>
          <Text tag='legend' size={200} mb={3}>
            Checkbox with AI accent
          </Text>
          <List marker='' m={0} p={0}>
            <List.Item p={0} mb={2}>
              <CheckboxFH>
                <CheckboxFH.Value />
                <CheckboxFH.Text>
                  First option
                  <Box
                    tag={SummaryAI}
                    color='--intergalactic-icon-primary-feature-highlight'
                    ml={2}
                    style={{ verticalAlign: -3 }}
                  />
                </CheckboxFH.Text>
              </CheckboxFH>
            </List.Item>
            <List.Item p={0}>
              <Checkbox label='Second option' />
            </List.Item>
          </List>
        </fieldset>
      </Flex>
      <TabLineFH aria-label='Tab with AI accent' defaultValue={1} wMax={400}>
        <TabLineFH.Item value={1}>First option</TabLineFH.Item>
        <TabLineFH.HighlightedItem value={2}>
          <TabLineFH.HighlightedItem.Addon />
          <TabLineFH.HighlightedItem.Text>Second option</TabLineFH.HighlightedItem.Text>
        </TabLineFH.HighlightedItem>
        <TabLineFH.Item value={3}>Third option</TabLineFH.Item>
      </TabLineFH>
      <NoticeFH closable aria-label='Notice with AI theme' wMax={400}>
        How would you rate this update?
      </NoticeFH>
    </Flex>
  );
}

const meta: Meta = {
  title: 'Theme/Theme Playground',
};

export default meta;

type Story = StoryObj;

type ButtonRowProps = Pick<ButtonProps, 'use' | 'theme' | 'size'>;

function ButtonRow({ use, theme, size = 'm' }: ButtonRowProps) {
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

type ButtonLinkRowProps = Pick<ButtonLinkProps, 'use' | 'size'>;

function ButtonLinkRow({ use, size = 300 }: ButtonLinkRowProps) {
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

const SELECT_OPTIONS = [
  { value: '1', label: 'Option 1', children: 'Option 1' },
  { value: '2', label: 'Option 2', children: 'Option 2' },
  { value: '3', label: 'Option 3', children: 'Option 3' },
];

const FILTER_TRIGGER_OPTIONS = ['Blue', 'Gray', 'Green', 'Orange', 'Pink', 'Red', 'Salad', 'Violet', 'Yellow'];

function ThemePlaygroundContent() {
  const [radioValue, setRadioValue] = React.useState('1');
  const [tabValue, setTabValue] = React.useState(1);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [dateValue, setDateValue] = React.useState<Date | undefined>(new Date());
  const [dateRangeValue, setDateRangeValue] = React.useState<[Date, Date] | undefined>([
    new Date(),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);
  const [bulkTextareaValue, setBulkTextareaValue] = React.useState('');
  const [bulkTextareaValueL, setBulkTextareaValueL] = React.useState('');
  const [colorValue, setColorValue] = React.useState('#2DAF00');
  const [inputRangeFrom, setInputRangeFrom] = React.useState('');
  const [inputRangeTo, setInputRangeTo] = React.useState('');
  const [inputPhoneCountry, setInputPhoneCountry] = React.useState<'DE' | 'GB'>('DE');
  const [inputPhoneValue, setInputPhoneValue] = React.useState('+49');

  return (
    <ThemePlaygroundLayout>
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
              {/* <ButtonRow use='secondary' theme='info' /> */}
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
              {/* <ButtonRow use='secondary' theme='info' size='l' /> */}
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
          <Flex direction='column' w={60} gap={2}>
            <Divider use='primary' />
          </Flex>
          <Flex direction='column' w={60} gap={2}>
            <Divider use='secondary' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='flex-start' mb={10}>
            <Flex alignItems='center' h={40} gap={2}>
              <Divider orientation='vertical' use='primary' h={32} />
            </Flex>
            <Flex alignItems='center' h={40} gap={2}>
              <Divider orientation='vertical' use='secondary' h={32} />
            </Flex>
          </Flex>
          <Box
            p={4}
            style={{
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            }}
          >
            <Flex gap={8} flexWrap alignItems='flex-start'>
              <Flex direction='column' w={60} gap={2}>
                <Divider use='primary' theme='invert' />
              </Flex>
              <Flex direction='column' w={60} gap={2}>
                <Divider use='secondary' theme='invert' />
              </Flex>
              <Flex alignItems='center' h={40} gap={2}>
                <Divider orientation='vertical' use='primary' theme='invert' h={32} />
              </Flex>
              <Flex alignItems='center' h={40} gap={2}>
                <Divider orientation='vertical' use='secondary' theme='invert' h={32} />
              </Flex>
            </Flex>
          </Box>
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
            Default
          </Tooltip>
          <Tooltip
            theme='warning'
            title='Warning tooltip — check this out.'
            tag={Button}
          >
            Warning
          </Tooltip>
          <Box
            p={4}
            style={{
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            }}
          >
            <Tooltip theme='invert' title='Invert tooltip on dark background.' tag={Button} use='secondary'>
              Invert
            </Tooltip>
          </Box>
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
            <Flex gap={6} flexWrap alignItems='center'>
              <Input size='m' w={240} state='valid'>
                <Input.Value placeholder='Placeholder' />
              </Input>
              <Input size='l' w={240} state='valid'>
                <Input.Value placeholder='Placeholder' />
              </Input>
            </Flex>
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
          <BulkTextarea w={400} size='l' value={bulkTextareaValueL} onChange={setBulkTextareaValueL}>
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag='label' size={300} id='bulk-textarea-label-l'>
                Keywords (L)
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby='bulk-textarea-label-l'
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
          <Select options={SELECT_OPTIONS} placeholder='Select option L' w={240} size='l' />
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
          <Flex direction='column' gap={2} alignItems='flex-start'>
            <Text tag='label' size={200} htmlFor='theme-playground-date-range-picker' color='text-primary'>
              Select date range
            </Text>
            <DateRangePicker
              value={dateRangeValue}
              onChange={(v) => setDateRangeValue(v as [Date, Date] | undefined)}
            >
              <DateRangePicker.Trigger id='theme-playground-date-range-picker' />
              <DateRangePicker.Popper />
            </DateRangePicker>
          </Flex>
          <Flex direction='column' gap={2} alignItems='flex-start'>
            <Text tag='label' size={200} htmlFor='theme-playground-date-comparator' color='text-primary'>
              Compare periods
            </Text>
            <DateRangeComparator>
              <DateRangeComparator.Trigger id='theme-playground-date-comparator' />
              <DateRangeComparator.Popper />
            </DateRangeComparator>
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
          DnD (DropdownMenu with drag & drop)
        </Text>
        <Box mb={10}>
          <DropdownMenuDnDExample />
        </Box>

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
          <Pills defaultValue='1' size='m'>
            <Pills.Item value='1'>Option 1</Pills.Item>
            <Pills.Item value='2'>Option 2</Pills.Item>
            <Pills.Item value='3'>Option 3</Pills.Item>
          </Pills>
          <Pills defaultValue='1' size='l'>
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

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          FeatureHighlight
        </Text>
        <Box mb={10}>
          <FeatureHighlightDemo />
        </Box>
      </Box>
    </ThemePlaygroundLayout>
  );
}

const defaultDnDColumns = [
  { id: 'uniquePageviews', label: 'Unique Pageviews' },
  { id: 'uniqueVisitors', label: 'Unique Visitors' },
  { id: 'entranceSources', label: 'Entrance Sources' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
];
const defaultDnDSelectedColumns = ['uniquePageviews', 'entranceSources'];

function DropdownMenuDnDExample() {
  const menuListRef = React.useRef<HTMLElement | null>(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
  const [columns, setColumns] = React.useState(defaultDnDColumns);
  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setColumns((cols) => {
        const newColumns = [...cols];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newColumns[i] = cols[i + shift];
        }
        newColumns[toIndex] = cols[fromIndex];
        return newColumns;
      });
      setHighlightedIndex(toIndex);
    },
    [],
  );
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(defaultDnDSelectedColumns);

  const resetToDefault = React.useCallback(() => {
    setSelectedColumns(defaultDnDSelectedColumns);
  }, []);
  const toggleAll = React.useCallback(() => {
    const allSelected = selectedColumns.length === columns.length;
    const allColumns = columns.map((c) => c.id);
    if (allSelected) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allColumns);
    }
  }, [selectedColumns, columns]);

  const handleMenuListRef = (node: HTMLElement | null) => {
    const scrollableContainer = node?.children.item(0);
    if (scrollableContainer instanceof HTMLElement) {
      menuListRef.current = scrollableContainer;
    }
  };

  return (
    <DropdownMenu
      selectable
      multiselect
      highlightedIndex={highlightedIndex}
      onHighlightedIndexChange={setHighlightedIndex}
    >
      <DropdownMenu.Trigger mt={2} mr='auto' id='dropdown-menu-dnd-theme' tag={Button}>
        <Button.Addon>
          <SettingsM />
        </Button.Addon>
        <Button.Text>Manage columns</Button.Text>
        <Button.Addon>
          <Counter>
            {selectedColumns.length}
            /
            {columns.length}
          </Counter>
        </Button.Addon>
      </DropdownMenu.Trigger>
      <DropdownMenu.Popper hMax={800} aria-labelledby='dropdown-menu-dnd-theme-label'>
        <Flex direction='column' alignItems='flex-start' p={2} gap={2}>
          <Text bold id='dropdown-menu-dnd-theme-label'>
            Show table columns
          </Text>
          <ButtonLink onClick={resetToDefault}>Reset to default</ButtonLink>
          <ButtonLink onClick={toggleAll}>
            {selectedColumns.length === columns.length ? 'Deselect' : 'Select'}
            {' '}
            all
          </ButtonLink>
        </Flex>
        <DropdownMenu.List hMax={300} ref={handleMenuListRef}>
          <DnD onDnD={handleDnD} aria-label='drag-and-drop container' scrollableContainerRef={menuListRef}>
            {columns.map((column, index) => (
              <DropdownMenu.Item
                tag={DnD.Draggable}
                isCustomFocus={true}
                key={column.id}
                selected={selectedColumns.includes(column.id)}
                onClick={(e) => {
                  if (
                    e.target instanceof HTMLElement &&
                    e.target.getAttribute('role') === 'menuitemcheckbox'
                  ) {
                    if (!selectedColumns.includes(column.id)) {
                      setSelectedColumns([...selectedColumns, column.id]);
                    } else {
                      setSelectedColumns(selectedColumns.filter((i) => i !== column.id));
                    }
                  }
                }}
              >
                {column.label}
              </DropdownMenu.Item>
            ))}
          </DnD>
        </DropdownMenu.List>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
}

export const Default: Story = {
  render: () => <ThemePlaygroundContent />,
};
