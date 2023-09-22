---
title: Illustration
fileSource: illustration
tabs: Design('illustration'), A11y('illustration-a11y'), API('illustration-api'), Example('illustration-code'), Changelog('illustration-changelog')
---

## Description

**Illustration** is a component for importing illustrations from our library to your project.

## Illustrations

::: react-view

<script lang="tsx">
import React from 'react';
import Components from './illustrations-view';
import dataIllustrations from './illustrations-list';

import illustrations from '@illustrations';
const App = () => <Components illustrations={illustrations} json={dataIllustrations} />;
</script>

:::

## Sizes

We use illustrations of three sizes.

| Size (px)  | Illustration example         | Usage                           |
| ---------- | ---------------------------- | ------------------------------- |
| Large (130px * 130px) | ![](static/large-size.png)    | Use this size for advertising messages.    |
| Medium (80px * 80px)  | ![](static/medium-size.png) ![example of a medium illustration](static/medium-size2.png) | Use this size for error messages and empty states.     |
| Small (40px * 40px)   | ![](static/small-size.png)    | Use this size for secondary messages that shouldn't draw much attention. |

