---
title: Select / Multiselect
fileSource: select
tabs: Design('select'), A11y('select-a11y'), API('select-api'), Example('select-code'), Changelog('select-changelog')
---

::: tip
If you need to customize the dropdown menu's behavior, please refer to the [@semcore/ui/popper](/utils/popper/popper) documentation.
:::

The Select component serves as a wrapper over [@semcore/ui/dropdown-menu](/components/dropdown-menu/dropdown-menu) with the additional functionality of item selection.

## Basic usage

In the simplest case, you can implement the select by passing an array of options. The `options` array consists of objects with the following fields:

- `value`: the value of the selected option.
- `label`: the value displayed in the trigger when selecting an option.
- `children`: represents nested options displayed in the dropdown list.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index, // value of the selected option
    label: `Label ${index}`, // the value displayed in the trigger when the option is selected
    children: `Option ${index}`, // option's children displayed in the dropdown
  }));

const Demo = () => (
  <Flex>
    <Select options={options} placeholder='Select an option, sir' m='auto' />
  </Flex>
);
</script>

:::

## Controlled and uncontrolled modes

The component can operate in either controlled or uncontrolled mode.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const { value: initialValue } = options[0];

const Demo = () => {
  const [value, setValue] = useState(initialValue);

  return (
    <Flex>
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder='Select an option, sir'
        m='auto'
      />
      <Select
        defaultValue={initialValue}
        onChange={setValue}
        options={options}
        placeholder='Select an option, sir'
        m='auto'
      />
    </Flex>
  );
};
</script>

:::

## Trigger customization

When you need to customize the trigger, you can pass the desired component to the `tag` property of the select. The property will be passed to `Select.Trigger` and replace its render.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';
import { ButtonTrigger, LinkTrigger } from '@semcore/ui/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Flex>
    {/* ButtonTrigger is the default trigger */}
    <Select tag={ButtonTrigger} options={options} placeholder='Select an option, sir' m='auto' />
    <Select tag={LinkTrigger} options={options} placeholder='Select an option, sir' m='auto' />
  </Flex>
);
</script>

:::

In cases when you require deeper customization, you can "unfold" the component into its constituents. The example below shows how to create a Select component for selecting a list of countries.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Select from '@semcore/ui/select';
import { Flex } from '@semcore/ui/flex-box';
import Flags, { iso2Name } from '@semcore/ui/flags';

const formatName = (name) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');

const Demo = () => {
  const [value, setValue] = useState(null);

  return (
    <Flex>
      <Select onChange={setValue} placeholder='Select country'>
        <Select.Trigger w={180}>
          <Select.Trigger.Addon>
            <Flags iso2={value} />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>{formatName(iso2Name[value])}</Select.Trigger.Text>
        </Select.Trigger>
        <Select.Menu hMax={180}>
          {Object.keys(iso2Name).map((value) => (
            <Select.Option key={value} value={value}>
              <Flags iso2={value as keyof typeof iso2Name} mr={2} />
              {formatName(iso2Name[value])}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
    </Flex>
  );
};
</script>

:::

## DropdownMenu customization

Similar to [@semcore/ui/dropdown-menu](/components/dropdown-menu/dropdown-menu), the dropdown menu can be implemented in two ways:

- `Select.Menu`
- `Select.Popper` + `Select.List`

These components serve as wrappers over the corresponding components of the [DropdownMenu](/components/dropdown-menu/dropdown-menu).

- `Select.Popper` is a layout for the dropdown window.
- `Select.List` is a component for the option list with the [ScrollArea](/components/scroll-area/scroll-area) inside.
- `Select.Menu` is a wrapper over `Select.Popper` and `Select.List`, and all props are passed to `Select.List`.

The example below shows how to insert a [Notice](/components/notice/notice) in the Select dropdown window.

::: sandbox

<script lang="tsx">
import React from 'react';
import Select from '@semcore/ui/select';
import { Flex } from '@semcore/ui/flex-box';
import Notice from '@semcore/ui/notice';

const options = Array(12)
  .fill('')
  .map((_, index) => `Option ${index}`);

const noticeStyle = {
  border: 'none',
  borderRadius: '0 0 6px 6px',
  padding: '12px 8px',
};

const Demo = () => (
  <Flex>
    <Select placeholder={'Select something'}>
      <Select.Trigger m='auto' />
      <Select.Popper>
        <Select.List hMax='240px'>
          {options.map((option, index) => (
            <Select.Option value={option} key={index}>
              {option}
            </Select.Option>
          ))}
        </Select.List>
        <Notice style={noticeStyle}>
          <Notice.Content aria-live='polite'>Woooop, it's simple magic!</Notice.Content>
        </Notice>
      </Select.Popper>
    </Select>
  </Flex>
);
</script>

:::

## Options

The component offers several variants of options layout:

- `Select.Option`: an element of the list (can be selected from the keyboard).
- `Select.OptionCheckbox`: an element of the list for multiple selections (can be selected from the keyboard).
- `Select.OptionTitle`: a title of the list (cannot be selected from the keyboard).
- `Select.OptionHint`: a subtitle of the list or a message with additional information (cannot be selected from the keyboard).

::: sandbox

<script lang="tsx">
import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

const Demo = () => (
  <Flex>
    <Select m='auto'>
      <Select.Trigger placeholder="I'll show u some options, buddy" />
      <Select.Menu>
        <Select.Option value={1}>I'm option</Select.Option>
        <Select.Option value={2}>
          <Select.Option.Checkbox />
          I'm option-checkbox
        </Select.Option>
        <Select.OptionTitle>I'm title</Select.OptionTitle>
        <Select.OptionHint>I'm hint</Select.OptionHint>
      </Select.Menu>
    </Select>
  </Flex>
);
</script>

:::

## Options filtering

The `InputSearch` is added to Select for filtering elements in the list. This is a stylized wrapper over the [Input](/components/input/input) component with clear button.

The example below shows one of the ways to implement filtering.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Select, { InputSearch } from '@semcore/ui/select';

const data = Array(26)
  .fill(0)
  .map((_, index) => ({
    label: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
    value: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
  }));

const Demo = () => {
  const [filter, setFilter] = useState('');
  const options = React.useMemo(
    () => data.filter((option) => option.value.toString().includes(filter)),
    [filter],
  );

  return (
    <Select placeholder='Select value'>
      <Select.Trigger />
      <Select.Popper>
        {({ highlightedIndex }) => (
          <>
            <InputSearch
              value={filter}
              onChange={setFilter}
              placeholder='Search'
              role='combobox'
              aria-autocomplete='list'
              aria-controls='search-list'
              aria-owns='search-list'
              aria-expanded='true'
              aria-activedescendant={`option-${highlightedIndex}`}
            />
            <Select.List hMax={'224px'} id='search-list'>
              {options.map(({ value, label }, index) => (
                <Select.Option
                  value={value}
                  key={value}
                  id={`option-${index}`}
                  aria-selected={index === highlightedIndex}
                >
                  {label}
                </Select.Option>
              ))}
              {!options.length && (
                <Select.OptionHint key='Nothing'>Nothing found</Select.OptionHint>
              )}
            </Select.List>
          </>
        )}
      </Select.Popper>
    </Select>
  );
};
</script>

:::

## Advanced filtering control

To get more control over the parts of `InputSearch` component, you can use children `InputSearch.SearchIcon`, `InputSearch.Value` and `InputSearch.Clear` components.

In the example below clear button handler is disabled.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Select, { InputSearch } from '@semcore/ui/select';

const data = Array(26)
  .fill(0)
  .map((_, index) => ({
    label: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
    value: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
  }));

const Demo = () => {
  const [filter, setFilter] = useState('');
  const options = React.useMemo(
    () => data.filter((option) => option.value.toString().includes(filter)),
    [filter],
  );

  return (
    <Select placeholder='Select value'>
      <Select.Trigger />
      <Select.Popper>
        {({ highlightedIndex }) => (
          <>
            <InputSearch value={filter} onChange={setFilter}>
              <InputSearch.SearchIcon />
              <InputSearch.Value
                placeholder='Search'
                role='combobox'
                aria-autocomplete='list'
                aria-controls='search-list'
                aria-owns='search-list'
                aria-expanded='true'
                aria-activedescendant={`option-${highlightedIndex}`}
              />
              <InputSearch.Clear
                onClick={() => {
                  return false;
                }}
              />
            </InputSearch>
            <Select.List hMax={'224px'} id='search-list'>
              {options.map(({ value, label }, index) => (
                <Select.Option
                  value={value}
                  key={value}
                  id={`option-${index}`}
                  aria-selected={index === highlightedIndex}
                >
                  {label}
                </Select.Option>
              ))}
              {!options.length && (
                <Select.OptionHint key='Nothing'>Nothing found</Select.OptionHint>
              )}
            </Select.List>
          </>
        )}
      </Select.Popper>
    </Select>
  );
};
</script>

:::

## Multiselect

The component has the ability to select several options. This functionality can be enabled by using the `multiselect` property.

The layout of options inside the component will be changed to `Select.OptionCheckbox`, and the `value` will become an array.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

const options = Array(20)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Flex>
    <Select options={options} multiselect m='auto' />
  </Flex>
);
</script>

:::

## Sorting multiselect options

The example below shows one of the ways to sort the selected options.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Select from '@semcore/ui/select';

const options = Array(20)
  .fill('')
  .map((i, idx) => ({
    value: idx,
    title: `Awesome option ${idx}`,
  }));

const Option = ({ value, title }) => (
  <Select.Option value={value} key={value}>
    <Select.Option.Checkbox />
    {title}
  </Select.Option>
);

const Demo = () => {
  const [selected, setSelected] = useState([]);
  const [prevSelected, setPrevSelected] = useState([]);

  const handleVisibleChange = (value) => {
    if (value) return;
    setPrevSelected(options.filter((o) => selected.includes(o.value)));
  };

  const renderOptions = () => {
    if (!prevSelected.length) {
      return options.map((props) => <Option key={props.value} {...props} />);
    }
    const [checked, unchecked] = options.reduce(
      (acc, o) => {
        prevSelected.find((v) => v.value === o.value) ? acc[0].push(o) : acc[1].push(o);
        return acc;
      },
      [[], []],
    );
    return [
      ...checked.map((props) => <Option key={props.value} {...props} />),
      <Select.Divider />,
      ...unchecked.map((props) => <Option key={props.value} {...props} />),
    ];
  };

  return (
    <Select
      value={selected}
      onChange={(v) => setSelected(v)}
      onVisibleChange={handleVisibleChange}
      multiselect
      placeholder='Select values'
    >
      <Select.Trigger />
      <Select.Menu hMax='240px'>{renderOptions()}</Select.Menu>
    </Select>
  );
};
</script>

:::

## Render-function

As with many of our components, you can access the logic of the component by passing a render-function to it.

The example below shows how to implement "Select all" and "Deselect all" buttons using this function.

::: sandbox

<script lang="tsx">
import React from 'react';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';

const options = Array(5)
  .fill('')
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

const Demo = () => (
  <Select placeholder='Select value' multiselect>
    {(props, handlers) => {
      const {
        getTriggerProps, // function encapsulating Select.Trigger logic
        getPopperProps, // function encapsulating Select.Popper logic
        getListProps, // function encapsulating Select.List logic
        getInputSearchProps, // function encapsulating Select.InputSearch logic
        getOptionProps, // function encapsulating Select.Option logic
        getOptionCheckboxProps, // function encapsulating Select.OptionCheckbox logic
        value: currentValue, // the current value of the select
      } = props;
      const {
        visible, // function that controls the internal state of visibility
        value, // function that controls the internal state of the selected value
      } = handlers;

      const handleClick = () => {
        const newValue = (currentValue as any).length ? [] : options.map(({ value }) => value);
        value(newValue);
        return false; // cancel the default handler
      };

      return (
        <React.Fragment>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value='%all%' onClick={handleClick}>
              <Text color='denim-blue'>
                {(currentValue as any).length ? 'Deselect all' : 'Select all'}
              </Text>
            </Select.Option>
            {options.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                <Select.Option.Checkbox />
                {option.value}
              </Select.Option>
            ))}
          </Select.Menu>
        </React.Fragment>
      );
    }}
  </Select>
);
</script>

:::
