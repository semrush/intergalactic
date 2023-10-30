---
title: Checkbox
tabs: Design('checkbox'), A11y('checkbox-a11y'), API('checkbox-api'), Example('checkbox-code'), Changelog('checkbox-changelog')
---

## Partial selection

Make sure to follow the guide's instructions on checkbox spacing.

::: sandbox

<script lang="tsx">
import React from 'react';
import Checkbox from '@semcore/ui/checkbox';

const Demo = () => {
  const [checked, setChecked] = React.useState([false, false, false]);
  const handleGroupChange = React.useCallback(
    (value: boolean) => {
      setChecked((checked) => checked.map(() => value));
    },
    [setChecked],
  );
  const handleItemChange = React.useCallback(
    (index: number) => (value: boolean) => {
      setChecked((checked) => checked.map((item, i) => (i === index ? value : item)));
    },
    [setChecked],
  );

  return (
    <>
      <div>
        <Checkbox
          mb={3}
          label='Select all'
          onChange={handleGroupChange}
          indeterminate={checked.includes(false) && checked.includes(true)}
          checked={checked.includes(true)}
        />
      </div>
      {checked.map((value, index) => (
        <div key={index}>
          <Checkbox
            mb={3}
            key={index}
            checked={value}
            onChange={handleItemChange(index)}
            label={`Option ${index + 1}`}
          />
        </div>
      ))}
    </>
  );
};


</script>

:::

## Checkbox with other components

::: sandbox

<script lang="tsx">
import React from 'react';
import Checkbox from '@semcore/ui/checkbox';
import Tooltip from '@semcore/ui/tooltip';
import InfoM from '@semcore/ui/icon/Info/m';
import Link from '@semcore/ui/link';

function noop(e) {
  e.preventDefault();
}

const Demo = () => (
  <>
    {[0, 1, 2].map((item) => (
      <div key={item}>
        <Checkbox mb={3} label={`Note ${item + 1}`} />
        <Tooltip title='There is information about point.' placement='right-start' ml={1}>
          <InfoM color='icon-secondary-neutral' interactive aria-label='Additional info' />
        </Tooltip>
      </div>
    ))}

    {[3, 4, 5].map((item) => (
      <div key={item}>
        <Checkbox mb={3}>
          <Checkbox.Value />
          <Checkbox.Text>
            {`Note ${item + 1}`}{' '}
            <Link href='#' onClick={noop}>
              Link to somewhere
            </Link>
          </Checkbox.Text>
        </Checkbox>
      </div>
    ))}
  </>
);


</script>

:::

## Additional props for input

`Checkbox.Value` is made of a check-mark div and a hidden input-tag. When you pass props to Checkbox.Value, it passes specific set of them to input props and all others goes to check-mark div.
If you need more control over input-tag, you can pass props to Checkbox.Value.Control.

::: warning
:rotating_light: `Checkbox.Value.CheckMark` should always be the next element after `Checkbox.Value.Control` in DOM.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Checkbox from '@semcore/ui/checkbox';

const Demo = () => {
  return (
    <Checkbox>
      <Checkbox.Value>
        <Checkbox.Value.Control data-testid='checkbox_input_tag' />
        <Checkbox.Value.CheckMark />
      </Checkbox.Value>
      <Checkbox.Text>Value</Checkbox.Text>
    </Checkbox>
  );
};


</script>

:::