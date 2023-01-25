---
title: Motion
---

@## Description

Motion can improve user experience when employed correctly. It can guide users, attracting their attention to events and actions, and reflecting their progress. You can use it to spice up your interface — from microinteractions with small elements, to the behaviour of major components — but always remember that motion must have a **purpose**.

@## Principles

**Motion is Functional**

Motion helps users maintain flow, drawing attention to screen changes both small and large, and increasing the perceived speed of the task.

**Motion is Intentional**

Objects must have a motivation for their movement. There should be a reason for why something moves the way it does.

**Motion is Expressive**

Motion delights users with unexpected details that turn mundane moments into something special and memorable. These details remind users that experiences are crafted by people, not machines.

**Connect actions to outcomes**

Motion provides a visual response to an action, seamless transitions between states help focus and guide users to complete tasks.

@## Duration

| token | value | usage |

@## Easing

@## Accessibility

When using animation, you want to avoid the following effects:

1. Provoking seizures in people with [photosensitive epilepsy](https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity#:~:text=For%20about%203%25%20of%20people,is%20known%20as%20photosensitive%20epilepsy).
2. Distracting users and breaking their workflow.
3. Trapping them in animation sequences.

To prevent these issues, we recommend you follow these best practices:

- Don't use flashing of more than 3 times per second in your animation.
- Limit component animation to no more than a couple of seconds at a time.
- Let users [opt out of animation](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) altogether, if that's what they prefer.
