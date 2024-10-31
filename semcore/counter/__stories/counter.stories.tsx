import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Counter, { AnimatedNumber } from '@semcore/counter';
import { FilterTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';
import SettingsM from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Textarea from '@semcore/textarea';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import Pills from '@semcore/pills';
import ProgressBar from '@semcore/progress-bar';
import WarningM from '@semcore/icon/Warning/m';
import NotificationM from '@semcore/icon/Notification/m';
import Dot from '@semcore/dot';
import { Hint } from '@semcore/tooltip';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const CounterInFilters: Story = {
  render: (props) => {
    return (
      <FilterTrigger>
        <FilterTrigger.Text>Link to website</FilterTrigger.Text>
        <FilterTrigger.Addon>
          <Counter theme='info'>
            <AnimatedNumber
              value={500}
              delay={1000}
              formatValue={(x) => Math.round(x).toString()}
            />
          </Counter>
        </FilterTrigger.Addon>
      </FilterTrigger>
    );
  },
};

export const CounterInButton: Story = {
  render: (props) => {
    return (
      <>
        <Button mr={4}>
          <Button.Addon>
            <SettingsM />
          </Button.Addon>
          <Button.Text>Manage columns</Button.Text>
          <Button.Addon>
            <Counter>23</Counter>
          </Button.Addon>
        </Button>
        <Button use='primary'>
          <Button.Addon>
            <SettingsM />
          </Button.Addon>
          <Button.Text>Manage columns</Button.Text>
          <Button.Addon>
            <Counter theme='bg-primary-neutral'>23</Counter>
          </Button.Addon>
        </Button>
      </>
    );
  },
};

const maxSymbols = 150;

export const CounterInForms: Story = {
  render: (props) => {
    const [value, setValue] = React.useState('');
    const [valueLength, setValueLength] = React.useState(0);
    const [theme, setTheme] = React.useState<string>('');
    const handleChange = React.useCallback((value: string) => {
      setValue(value);
    }, []);

    const valueTimer = React.useRef<number>();

    React.useEffect(() => {
      if (valueTimer.current) {
        window.clearTimeout(valueTimer.current);
      }

      valueTimer.current = window.setTimeout(() => {
        setValueLength(value.length);
      }, 1000);
    }, [value]);

    React.useEffect(() => {
      if (value.length >= 140) {
        if (value.length <= maxSymbols) {
          setTheme('warning');
        } else {
          setTheme('danger');
        }
      } else {
        setTheme('');
      }
    }, [value]);
    return (
      <Flex direction='column' w={350}>
        <Flex mb={2} justifyContent='space-between'>
          <Flex alignItems={'center'}>
            <Text size={200} tag='label' htmlFor='limited-text-field'>
              Project description
            </Text>
            <Counter ml={1} theme={theme} id={'counter-for-textarea'}>
              {value.length}
              <span aria-hidden='true'>/</span>
              <ScreenReaderOnly>of</ScreenReaderOnly>
              {maxSymbols}
              <ScreenReaderOnly>allowed characters</ScreenReaderOnly>
              {theme === 'warning' && <ScreenReaderOnly>Limit is almost reached</ScreenReaderOnly>}
              {theme === 'danger' && <ScreenReaderOnly>Limit is exceeded</ScreenReaderOnly>}
            </Counter>
          </Flex>
          <Text size={200} color='text-secondary' id={'optional-for-textarea'}>
            optional
          </Text>
        </Flex>
        <Textarea
          placeholder='The goal of your project, required resources, and so on'
          id='limited-text-field'
          aria-describedby='optional-for-textarea counter-for-textarea'
          onChange={handleChange}
        />
        <ScreenReaderOnly aria-live={'polite'} aria-atomic={true}>
          {valueLength} of {maxSymbols} allowed characters
          {valueLength >= 140 && valueLength <= 150 && (
            <ScreenReaderOnly>Limit is almost reached</ScreenReaderOnly>
          )}
          {valueLength > 150 && <ScreenReaderOnly>Limit is exceeded</ScreenReaderOnly>}
        </ScreenReaderOnly>
      </Flex>
    );
  },
};

export const CounterAndTypography: Story = {
  render: (props) => {
    return (
      <>
        <Text size={300}>
          Lorem ipsum <Text color='text-secondary'>12,457</Text>
        </Text>
        <br />
        <Text size={300}>
          Dolor sit amet: <Text color='text-secondary'>149</Text>
        </Text>
      </>
    );
  },
};

export const CounterInPills: Story = {
  render: (props) => {
    return (
      <Pills defaultValue='all'>
        <Pills.Item value='all'>
          <Pills.Item.Text>All</Pills.Item.Text>
          <Pills.Item.Addon>
            <Text color='text-secondary'>1,259</Text>
          </Pills.Item.Addon>
        </Pills.Item>
        <Pills.Item value='follow'>
          <Pills.Item.Text>Follow</Pills.Item.Text>
          <Pills.Item.Addon>
            <Text color='text-secondary'>557</Text>
          </Pills.Item.Addon>
        </Pills.Item>
        <Pills.Item value='not-follow'>
          <Pills.Item.Text>Not Follow</Pills.Item.Text>
          <Pills.Item.Addon>
            <Text color='text-secondary'>736</Text>
          </Pills.Item.Addon>
        </Pills.Item>
      </Pills>
    );
  },
};

const limitsMax = 10;
const limitsUsed = 10;
const warning = limitsUsed >= limitsMax;

export const CounterInLimits: Story = {
  render: (props) => {
    return (
      <Flex direction='column' w={350}>
        <Flex mb={1} justifyContent='space-between'>
          <Text size={200}>SEO Ideas Units</Text>
          <Flex alignItems='center'>
            {warning ? <WarningM color='icon-primary-warning' /> : null}
            <Text size={200} ml={1} bold aria-hidden>
              {limitsUsed}
              <Text color='text-secondary'>/{limitsMax}</Text>
            </Text>
          </Flex>
        </Flex>
        <ProgressBar
          value={(limitsUsed / limitsMax) * 100}
          aria-valuetext={`${limitsUsed} out of ${limitsMax}`}
          aria-label={`limits used ${warning ? ', warning' : ''}`}
          size='s'
        >
          <ProgressBar.Value theme={warning ? 'bg-primary-warning' : 'bg-primary-success'} />
        </ProgressBar>
      </Flex>
    );
  },
};

const notificationsCount = 18;
export const CounterInDot: Story = {
  render: (props) => {
    return (
      <Hint tag={Button} title={`${notificationsCount} notifications`}>
        <Button.Addon>
          <NotificationM />
          <Dot up>
            <AnimatedNumber
              initValue={10}
              value={notificationsCount}
              duration={1000}
              delay={500}
              formatValue={(x) => Math.round(x).toString()}
            />
          </Dot>
        </Button.Addon>
      </Hint>
    );
  },
};

export const AnimatedNumber1: Story = {
  render: (props) => {
    const [value, setValue] = React.useState(20);
    const handleClick = () => {
      setValue(value + 20);
    };
    return (
      <>
        <AnimatedNumber value={value} />
        <Button onClick={handleClick} mt={2}>
          Rerender value
        </Button>
      </>
    );
  },
};
