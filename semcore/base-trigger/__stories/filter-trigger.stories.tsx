import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box } from '@semcore/flex-box';
import { FilterTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';
import Dropdown from '@semcore/dropdown';
import Button from '@semcore/button';
import Tooltip from '@semcore/tooltip';

const meta: Meta<typeof FilterTrigger> = {
  title: 'Components/FilterTrigger',
  component: FilterTrigger,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FilterTrigger>;

const options = Array(6)
  .fill(0)
  .map((i, idx) => ({
    title: `Option ${idx}`,
  }));

export const UsageWithSelect: Story = {
  render: (props) => {
    return (
      <>
        <Text tag='label' htmlFor='filter-trigger' size={200}>
          Filter trigger with options
        </Text>
        <Box mt={2}>
          <Select>
            <Select.Trigger tag={FilterTrigger} id='filter-trigger' />
            <Select.Menu>
              {options.map((option, idx) => {
                const { title } = option;
                return (
                  <Select.Option value={title} key={idx}>
                    {title}
                  </Select.Option>
                );
              })}
            </Select.Menu>
          </Select>
        </Box>
      </>
    );
  },
};

export const UsageWithDropdown: Story = {
  render: (props) => {
    const [filters, setFilters] = React.useState(0);
    const [visible, setVisible] = React.useState(false);
    return (
      <>
        <Text tag='label' htmlFor='advance-trigger' size={200}>
          Filter trigger for several filters inside
        </Text>
        <Box mt={2}>
          <Dropdown visible={visible} onVisibleChange={(v) => setVisible(v)}>
            <Dropdown.Trigger
              placeholder='Advanced filters'
              active={visible}
              empty={!filters}
              onClear={() => {
                setFilters(0);
                setVisible(false);
              }}
              tag={FilterTrigger}
              id='advance-trigger'
            >
              <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
              {!!filters && (
                <FilterTrigger.Counter aria-label='Applied filters count'>
                  {filters}
                </FilterTrigger.Counter>
              )}
            </Dropdown.Trigger>
            <Dropdown.Popper aria-label='Dropdown popper description' p={5}>
              <Button
                onClick={() => {
                  setFilters(filters + 1);
                }}
              >
                Set filters
              </Button>
            </Dropdown.Popper>
          </Dropdown>
        </Box>
      </>
    );
  },
};

export const ProgrammaticFocus: Story = {
  render: (props) => {
    const triggerRef = React.useRef<HTMLButtonElement>();
    const [selectVisible, setSelectVisible] = React.useState(false);
    const focusTrigger = React.useCallback(() => {
      triggerRef.current?.focus();
      setSelectVisible(true);
    }, []);
    return (
      <>
        <Text tag='label' htmlFor='another-filter-trigger' size={200}>
          Filter trigger with options
        </Text>
        <Box mt={2}>
          <Select visible={selectVisible} onVisibleChange={setSelectVisible}>
            <Select.Trigger
              tag={FilterTrigger}
              triggerRef={triggerRef}
              id='another-filter-trigger'
            />
            <Select.Menu>
              {options.map((option, idx) => {
                const { title } = option;
                return (
                  <Select.Option value={title} key={idx}>
                    {title}
                  </Select.Option>
                );
              })}
            </Select.Menu>
          </Select>
        </Box>
        <Button mt={4} onClick={focusTrigger}>
          Focus on filter trigger
        </Button>
      </>
    );
  },
};

export const HintForClearButton: Story = {
  render: (props) => {
    const [filters, setFilters] = React.useState(0);
    const [visible, setVisible] = React.useState(false);

    return (
      <>
        <Text tag='label' htmlFor='advance-trigger' size={300}>
          Filter trigger for several filters inside
        </Text>
        <Box mt={2}>
          <Dropdown visible={visible} onVisibleChange={(v) => setVisible(v)}>
            <Dropdown.Trigger
              placeholder='Advanced filters'
              active={visible}
              empty={!filters}
              onClear={() => {
                setFilters(0);
                setVisible(false);
              }}
              tag={FilterTrigger}
              id='advance-trigger'
            >
              <FilterTrigger.TriggerButton>
                <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
                {!!filters && (
                  <FilterTrigger.Counter aria-label='Applied filters count'>
                    {filters}
                  </FilterTrigger.Counter>
                )}
              </FilterTrigger.TriggerButton>
              {Boolean(filters) && (
                <Tooltip title={'Clear value'}>
                  <FilterTrigger.ClearButton />
                </Tooltip>
              )}
            </Dropdown.Trigger>
            <Dropdown.Popper p={5} aria-label='Dropdown popper description'>
              <Button
                onClick={() => {
                  setFilters(filters + 1);
                }}
              >
                Set filters
              </Button>
            </Dropdown.Popper>
          </Dropdown>
        </Box>
      </>
    );
  },
};
