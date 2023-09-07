---
title: Example
tabs: Design('checkbox'), A11y('checkbox-a11y'), API('checkbox-api'), Example('checkbox-code'), Changelog('checkbox-changelog')
---

## Partial selection

Make sure to follow the guide's instructions on checkbox spacing.

::: sandbox

<script lang="tsx">
import React from 'react';
import Checkbox from '@semcore/ui/checkbox';

class Demo extends React.PureComponent {
  state = {
    checked: [false, false, false],
  };

  all = (checked) => {
    this.setState({
      checked: this.state.checked.map(() => checked),
    });
  };

  item = (checked, e) => {
    const { id } = e.currentTarget;

    this.setState({
      checked: this.state.checked.map((item, i) => {
        if (i === Number(id)) return !item;
        return item;
      }),
    });
  };

  indeterminate = (checked) => {
    return checked.includes(true) && checked.indexOf(false) >= 0;
  };

  render() {
    const { checked } = this.state;

    return (
      <>
        <div>
          <Checkbox mb={3}>
            <Checkbox.Value
              onChange={this.all}
              indeterminate={this.indeterminate(checked)}
              checked={checked.indexOf(false) < 0}
            />
            <Checkbox.Text>Select all</Checkbox.Text>
          </Checkbox>
        </div>
        {checked.map((_, i) => (
          <div key={i}>
            <Checkbox mb={3}>
              <Checkbox.Value id={`${i}`} checked={checked[i]} onChange={this.item} />
              <Checkbox.Text>{`Option ${i + 1}`}</Checkbox.Text>
            </Checkbox>
          </div>
        ))}
      </>
    );
  }
}


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
        <Checkbox mb={3}>
          <Checkbox.Value />
          <Checkbox.Text>{`Note ${item + 1}`}</Checkbox.Text>
        </Checkbox>
        <Tooltip title='There is information about point.' placement='right-start' ml={1}>
          <InfoM color='stone' interactive aria-label='Additional info' />
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

Checkbox.Value conceals a stylistic div and a real, hidden input. We typically aim to anticipate where certain properties
should be directed, but occasionally, this behavior needs to be modified.

::: sandbox

<script lang="tsx">
import React from 'react';
import Checkbox from '@semcore/ui/checkbox';
import { inputProps } from '@semcore/ui/utils/inputProps';

const Demo = () => {
  const includeInputProps = [...inputProps, 'data-test-id'];
  return (
    <Checkbox>
      <Checkbox.Value includeInputProps={includeInputProps} data-test-id='value' />
      <Checkbox.Text>Value</Checkbox.Text>
    </Checkbox>
  );
};


</script>

:::