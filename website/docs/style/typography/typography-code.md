---
title: Typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Basic usage

Our typography primitives have no margins as they may differ in the end products. You may add them yourself according to your specific requirements.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Blockquote, Hint, List, Text } from '@semcore/ui/typography';

const Demo = () => (
  <div>
    <Text size={800} tag='h1' mb={6} mt={0}>
      H1, 48px
    </Text>
    <Text tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text tag='strong'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={700} tag='h2' mb={4} mt={0}>
      H2, 36px
    </Text>
    <Text tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text tag='em'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={600} tag='h3' fontWeight={500} mb={4} mt={0}>
      H3, 32px
    </Text>
    <Text tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text color='text-success'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={500} tag='h4' fontWeight={500} mb={3} mt={0}>
      H4, 24px
    </Text>
    <Text tag='p' mb={2} mt={0}>
      But I do love the taste of a <Hint>good burger</Hint>. Mm-mm-mm.
    </Text>
    <Text size={400} tag='h5' fontWeight={500} mb={2} mt={0}>
      H5, 20px
    </Text>
    <Text tag='p' mb={2} mt={0}>
      But I do love the taste of a <Text tag='s'>good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag='h6' mb={1} mt={0}>
      H6, 16px
    </Text>
    <Text size={200} tag='p' mb={3} mt={0}>
      Text, 14px
    </Text>
    <Text size={100} tag='p' mb={2} mt={0}>
      Text, 12px
    </Text>
    <List mb={2}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
    </List>
    <List tag='ol' mb={2}>
      <List.Item marker={1}>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={2}>
        Carpe diem. Seize the day, boys. Make your lives extraordinary.
      </List.Item>
    </List>
    <Blockquote author='Author Author' my={4.5}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod
      tincidunt ut lacreet dolore magna aliguam erat volutpat. Ut wisis enim ad minim veniam, quis
      nostrud exerci tution ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
    </Blockquote>
  </div>
);
</script>

:::

## List with custom bullets

Using the example below, you can easily create lists with custom bullets.

::: sandbox

<script lang="tsx">
import React from 'react';
import { List } from '@semcore/ui/typography';
import CheckM from '@semcore/ui/icon/Check/m';

const Demo = () => (
  <div>
    <List size={300} marker={<CheckM color='icon-secondary-success' mt={1} />}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={<CheckM color='icon-secondary-success' mt={1} />}>
        (Uncheck icon) Carpe diem. Seize the day, boys. Make your lives extraordinary.
      </List.Item>
      <List.Item>Listen to them. Children of the night. What music they make.</List.Item>
    </List>
  </div>
);
</script>

:::

## Native typography tags

To style native tags, use the `FormatText` component from the `@semcore/ui/format-text` package.

It's acceptable to style third-party HTML. However, in other cases, we recommend using the `Text` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import FormatText from '@semcore/ui/format-text';

const Demo = () => (
  <FormatText>
    <h1>
      H1, <small>48px</small>
    </h1>
    <p>
      But I do love the taste of a <strong>good burger</strong>. Mm-mm-mm.
    </p>
    <h2>
      H2, <small>36px</small>
    </h2>
    <p>
      But I do love the taste of a <em>good burger</em>. Mm-mm-mm.
    </p>
    <h3>
      H3, <small>32px</small>
    </h3>
    <p>
      But I do love the taste of a <a href='/'>good burger</a> . Mm-mm-mm.
    </p>
    <h4>
      H4, <small>24px</small>
    </h4>
    <p>
      But I do love the taste of a <abbr>good burger</abbr>. Mm-mm-mm.
    </p>
    <h5>
      H5, <small>20px</small>
    </h5>
    <p>
      But I do love the taste of a <s>good burger</s>. Mm-mm-mm.
    </p>
    <h6>
      H6, <small>16px</small>
    </h6>
    <p>
      But I do love the taste of a <code>good burger</code>. Mm-mm-mm.
    </p>
    <ul>
      <li>I'm gonna make him an offer he can't refuse.</li>
      <li>Carpe diem. Seize the day, boys. Make your lives extraordinary.</li>
    </ul>
    <ol>
      <li>I'm gonna make him an offer he can't refuse.</li>
      <li>Carpe diem. Seize the day, boys. Make your lives extraordinary.</li>
    </ol>
    <blockquote>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod
      tincidunt ut lacreet dolore magna aliguam erat volutpat. Ut wisis enim ad minim veniam, quis
      nostrud exerci tution ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
      <cite>Author Author</cite>
    </blockquote>
  </FormatText>
);
</script>

:::

## FormatText nested lists

For proper nested ordered lists counting, you need to explicitly specify the `start`, `reversed`, or `type` attribute.

::: sandbox

<script lang="tsx">
import React from 'react';
import FormatText from '@semcore/ui/format-text';

const Demo = () => (
  <FormatText>
    <ol start="1">
      <li>List item one</li>
      <li>List item two with subitems:
        <ul>
          <li>Subitem 1</li>
          <li>Subitem 2</li>
        </ul>
      </li>
      <li>Final list item</li>
    </ol>
  </FormatText>
);
</script>

:::

## Hint with button role

For `Hint` with `role=button` your need to add `onKeyDown` handler yourself for correct working from the keyboard.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Hint } from '@semcore/ui/typography';

const Demo = () => {
  /**
   * Common logic for handle click or keypress Enter/Space
   */
  const handler = () => {
    console.log('click or keyDown');
  };

  const handleClick = React.useCallback(() => {
    handler();
  }, []);

   const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      handler();
    }
  }, []);

  return (
    <Hint onClick={handleClick} onKeyDown={handleKeyDown} role="button">
      <Hint.Text>
        Some hint text
      </Hint.Text>
    </Hint>
  );
}
</script>

:::
