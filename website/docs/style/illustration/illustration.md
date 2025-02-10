---
title: Illustration
fileSource: illustration
tabs: Design('illustration'), A11y('illustration-a11y'), API('illustration-api'), Example('illustration-code'), Changelog('illustration-changelog')
---

## Description

**Illustration** is a component for importing illustrations from our library to your project.

## Search illustrations

::: react-view

<script lang="tsx">
import React from 'react';
import Components from './illustrations-view';
import dataIllustrations from './illustrations-list';
import icons from '@illustrations';
const App = () => <Components illustrations={icons} json={dataIllustrations} />;
</script>

:::

## Sizes

We use illustrations of three sizes.

| Size                  | Usage                           |
| --------------------- | ------------------------------- |
| Large (130px * 130px) | Use this size for advertising messages. ![](static/large-size.png)   |
| Medium (80px * 80px)  | Use this size for error messages and empty states. ![](static/medium-size2.png){width=300px}    |
| Small (40px * 40px)   | Use this size for secondary messages that shouldn't draw much attention. ![](static/small-size.png) |

