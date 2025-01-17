---
title: Motion (animation)
---

## Description

Motion can improve user experience when employed correctly. It can guide users, attracting their attention to events and actions, and reflecting their progress. You can use it to spice up your interface – from microinteractions with small elements, to the behavior of major components – but always remember that motion must have a **purpose**.

## Principles

**Motion is Functional**

Motion helps users maintain flow, drawing attention to screen changes both small and large, and increasing the perceived speed of the task.

**Motion is Intentional**

Objects must have a motivation for their movement. There should be a reason for why something moves the way it does.

**Motion is Expressive**

Motion delights users with unexpected details that turn mundane moments into something special and memorable. These details remind users that experiences are crafted by people, not machines.

**Connect actions to outcomes**

Motion provides a visual response to an action, seamless transitions between states help focus and guide users to complete tasks.

## Durations

Refer to [semantic tokens list](/style/design-tokens/design-tokens#semantic-tokens), to find tokens we use for controlling motion in the components.

Table: Durations

| Token            | Value   | Usage                                                                                                                             |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| extra-slow       | `500ms` | Should be used for more complex effects and larger scale animations (such as page transitions or moving objects on and offscreen) |
| slow             | `400ms` | Should be used for more larger scale animations (such as page transitions)                                                        |
| medium           | `300ms` | Should be used for more complex effects (such as Modal)                                                                           |
| fast             | `200ms` | Should be used for more complex effects (such as Dropdown or Accordion)                                                           |
| extra-fast       | `100ms` | Should be used for simpler effects and relatively small-sized animations (such as fades or color changes)                         |

<!-- hidden because value isn't clear right now, we use standard CSS values for timing-function
## Animation functions

Hover or focus the following blocks to play the animations.

::: react-view

<script lang="tsx">
import React from 'react';
import styles from './easing.module.css';
import cx from 'classnames';

// Example of usage: <Easing props={
//  "cssFunc": "cubic-bezier(0.37, 0, 0.63, 1)",
//  "jsFunc": " -(Math.cos(Math.PI * x) - 1) / 2",
//  "name": "ease-in-out-sine",
//  "description": "Lorem ipsum"
// } />

const chartSize = 200;

const Easing = ({ cssFunc, jsFunc, name, description }) => {
  const pathD = React.useMemo(() => {
    const x = Array(chartSize)
      .fill(0)
      .map((_, index) => index);
    const y = x
      .map((x) => x / chartSize)
      .map(jsFunc)
      .map((y) => chartSize - y * chartSize + 1);
    const points = x.map((x, i) => ({ x, y: y[i] }));
    return `M${points.map(({ x, y }) => `${x} ${y}`).join(' L')}`;
  }, [jsFunc]);

  return (
    <div className={styles.container} tabIndex={0}>
      <svg width={chartSize} height={chartSize + 2} className={styles.chart}>
        <path d={pathD} strokeWidth={2} />
      </svg>
      <div className={styles.aside}>
        <div className={styles.details}>
          <div className={styles.title}>
            animation-timing-function: <strong>{name}</strong>
          </div>
          <div className={styles.description}>
            <div>{cssFunc}</div>
            <div>{description}</div>
          </div>
        </div>
        <div className={styles.slider}>
          <div className={styles.sliderLine} />
          <div className={styles.sliderThumb} style={{ transitionTimingFunction: name }} />
        </div>
      </div>
    </div>
  );
};

// Take easings from https://easings.net/
const EasingsDemo = () => {
  return (
    <div aria-hidden='true' className={styles.demo}>
      <Easing
        cssFunc='cubic-bezier(0.5, 0, 0.75, 0)'
        jsFunc={(x) => x * x * x * x}
        name='ease-in'
        description='moves from slow to fast.'
      />
      <Easing
        cssFunc='cubic-bezier(0.45, 0, 0.55, 1)'
        jsFunc={(x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)}
        name='ease-in-out'
        description='moves slowly on both ends.'
      />
    </div>
  );
};

const App = EasingsDemo;
</script>

:::
-->

## Accessibility

When using animation, you want to avoid the following effects:

1. Provoking seizures in people with [photosensitive epilepsy](https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity#:~:text=For%20about%203%25%20of%20people,is%20known%20as%20photosensitive%20epilepsy).
2. Distracting users and breaking their workflow.
3. Trapping them in animation sequences.

To prevent these issues, we recommend you follow these best practices:

- Don't use flashing of more than 3 times per second in your animation.
- Limit component animation to no more than a couple of seconds at a time.
- Let users [opt out of animation](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) altogether, if that's what they prefer. Use `preferes-reduced-motion` CSS media feature for this.
