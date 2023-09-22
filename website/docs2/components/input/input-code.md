---
title: Input
fileSource: input
tabs: Design('input'), A11y('input-a11y'), API('input-api'), Example('input-code'), Changelog('input-changelog')
---

## Password input

Button with the `ShowYes` icon enables the password display. `ShowNo` hides the password and shows bullets, respectively.

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import ShowYesM from '@semcore/ui/icon/ShowYes/m';
import ShowNoM from '@semcore/ui/icon/ShowNo/m';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [type, setType] = React.useState('password');

  return (
    <>
      <Text tag='label' htmlFor='password-example' size={200}>
        Your password
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            defaultValue='I_like_cats'
            placeholder='Password'
            type={type}
            id='password-example'
          />
          <Input.Addon
            aria-label={type === 'password' ? 'View password' : 'Hide password'}
            tag={Button}
            tabIndex={0}
            onClick={() => setType((type) => (type === 'password' ? 'text' : 'password'))}
          >
            {type === 'password' ? <ShowYesM /> : <ShowNoM />}
          </Input.Addon>
        </Input>
      </Box>
    </>
  );
};


</script>

:::

## Loading state in the input

If the input is in a loading state while searching, sending, or entering data dynamically, add a [spin](/components/spin/spin) to the right addon. The [spin](/components/spin/spin) takes the place of the icon that is normally in the addon slot. During this time, the input may also be `disabled`.

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  function handlerInput(v) {
    setLoading(true);
    setValue(v);
  }

  return (
    <>
      <Text tag='label' htmlFor='loading-example' size={200}>
        Input with loading state
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            id='loading-example'
            placeholder='Type something to see world spinning...'
            value={value}
            onChange={handlerInput}
          />
          {loading && (
            <Input.Addon>
              <Spin size='xs' />
            </Input.Addon>
          )}
        </Input>
      </Box>
    </>
  );
};


</script>

:::

## Input with the clearing ability

The input field may have a clickable `Close` icon inside it to clear the entered value. This icon is only visible when there is some typed text or values in the input field, regardless of its status.

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import CloseM from '@semcore/ui/icon/Close/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Text tag='label' htmlFor='clear-example' size={200}>
        Clearable input
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            placeholder='Type something to clear something'
            value={value}
            onChange={(v) => setValue(v)}
            id='clear-example'
          />
          {value && (
            <Input.Addon
              tag={CloseM}
              interactive
              aria-label='Clear field'
              onClick={() => setValue('')}
            />
          )}
        </Input>
      </Box>
    </>
  );
};


</script>

:::

## Input with a submit icon

In the focused state, a clickable send/confirm icon can be placed inside the input alongside the typed text. It is only visible when the input is `focused`.

::: tip
Please note that this is an outdated pattern. Now we use it only in the input inside the [pagination](/components/pagination/pagination).
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import CheckM from '@semcore/ui/icon/Check/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [focus, setFocus] = React.useState(false);

  return (
    <>
      <Text tag='label' htmlFor='submit-example' size={200}>
        Input with submit button
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            placeholder='Focus right here'
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            id='submit-example'
          />
          {focus && <Input.Addon interactive tag={CheckM} aria-label='Submit field value' />}
        </Input>
      </Box>
    </>
  );
};


</script>

:::

## Input with a text addon

You can add text to the input as an addon that the user cannot modify. This can be useful when you need a fixed placeholder text in the input.

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Text tag='label' htmlFor='permanent-placeholder-l-example' size={300}>
        Input with L size and permanent placeholder text
      </Text>
      <Box mt={2}>
        <Input size='l' w={300}>
          <Input.Addon pr='3px' id='permanent-placeholder-l-addon'>
            <Text color='gray70'>Permanent text:</Text>
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            id='permanent-placeholder-l-example'
            aria-labelledby='permanent-placeholder-l-addon'
          />
        </Input>
      </Box>
      <br />
      <br />
      <Text tag='label' htmlFor='permanent-placeholder-m-example' size={200}>
        Input with M size and permanent placeholder text
      </Text>
      <Box mt={2}>
        <Input size='m' w={300}>
          <Input.Addon pr='2px' id='permanent-placeholder-m-addon'>
            <Text color='gray70'>Permanent text:</Text>
          </Input.Addon>
          <Input.Value
            placeholder='Placeholder'
            id='permanent-placeholder-m-example'
            aria-labelledby='permanent-placeholder-m-addon'
          />
        </Input>
      </Box>
    </>
  );
};


</script>

:::

## Input with multiple addons

When stacking two addons, the indents of the adjacent addons should be divided in half. This ensures that there is enough space around them for normal interaction.

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import CloseM from '@semcore/ui/icon/Close/m';
import ShowYesM from '@semcore/ui/icon/ShowYes/m';
import ShowNoM from '@semcore/ui/icon/ShowNo/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [type, setType] = React.useState('password');

  return (
    <>
      <Text tag='label' htmlFor='2addon-example' size={200}>
        Your password
      </Text>
      <Box mt={2}>
        <Input w={360}>
          <Input.Value
            defaultValue='I_like_cats'
            type={type}
            value={value}
            onChange={(v) => setValue(v)}
            id='2addon-example'
          />
          {value && (
            <Input.Addon
              tag={CloseM}
              pl={2}
              pr={1}
              interactive
              aria-label='Clear password field'
              onClick={() => setValue('')}
            />
          )}
          <Input.Addon px={2}>
            <Link>Forgot?</Link>
          </Input.Addon>
          <Input.Addon
            aria-label={type === 'password' ? 'View password' : 'Hide password'}
            tag={Button}
            tabIndex={0}
            onClick={() => setType((type) => (type === 'password' ? 'text' : 'password'))}
          >
            {type === 'password' ? <ShowYesM /> : <ShowNoM />}
          </Input.Addon>
        </Input>
      </Box>
    </>
  );
};


</script>

:::

## Input with other component inside

You can also place a [Badge](/components/badge/badge) or a [Tag](/components/tag/tag) inside the input field. All input sizes have the same size for badges.

::: sandbox

<script lang="tsx">
import React from 'react';
import Input from '@semcore/ui/input';
import Badge from '@semcore/ui/badge';
import Tag from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('heh');

  return (
    <div>
      <Text tag='label' htmlFor='count-example' size={200}>
        Input with symbols counter
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value
            placeholder='Count some words right here'
            value={value}
            onChange={(v) => setValue(v)}
            maxLength={10}
            id='count-example'
          />
          <Input.Addon>
            <Tag size='m'>{value.length}/10</Tag>
          </Input.Addon>
        </Input>
      </Box>
      <br />
      <br />
      <Text tag='label' htmlFor='badge-example' size={200}>
        Input with badge
      </Text>
      <Box mt={2}>
        <Input w={240}>
          <Input.Value placeholder='Wow! Such input. So new.' id='badge-example' />
          <Input.Addon>
            <Badge bg='green-300'>new</Badge>
          </Input.Addon>
        </Input>
      </Box>
    </div>
  );
};


</script>

:::
