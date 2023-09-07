---
title: Grid system
fileSource: grid
tabName: Example
tabs: Grid and page layout('grid-system'), API('grid-api'), Grid system('grid-code'), Changelog('grid-changelog')
---

## Description

It's a component for building a 12-column grid.

::: tip
In the product interface we use a 12-column grid with a fixed 24px gutter between columns. The columns stretch.
:::

## Example use

The `Row` component accepts all the properties of the `Flex` component, and the `Col` component accepts all the properties of the `Box` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Col, Row } from '@semcore/ui/grid';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    padding: '16px',
  };
  return (
    <Row gutter={4}>
      <Col span={12}>
        <Box style={styleBox} />
      </Col>
      <Col span={6}>
        <Box style={styleBox} />
      </Col>
      <Col span={6}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};


</script>

:::

## Change in general offset

Arranging offsets for each column to the left.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Col, Row } from '@semcore/ui/grid';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    borderRadius: '2px',
    padding: '16px',
  };
  return (
    <Row gutter={4}>
      <Col offset={11} span={1}>
        <Box style={styleBox} />
      </Col>
      <Col offset={10} span={2}>
        <Box style={styleBox} />
      </Col>
      <Col offset={9} span={3}>
        <Box style={styleBox} />
      </Col>
      <Col offset={8} span={4}>
        <Box style={styleBox} />
      </Col>
      <Col offset={7} span={5}>
        <Box style={styleBox} />
      </Col>
      <Col offset={6} span={6}>
        <Box style={styleBox} />
      </Col>
      <Col offset={5} span={7}>
        <Box style={styleBox} />
      </Col>
      <Col offset={4} span={8}>
        <Box style={styleBox} />
      </Col>
      <Col offset={3} span={9}>
        <Box style={styleBox} />
      </Col>
      <Col offset={2} span={10}>
        <Box style={styleBox} />
      </Col>
      <Col offset={1} span={11}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};


</script>

:::

## Change in the general gutter between the columns

You can change gutters between the columns, which gives flexibility in use.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Col, Row } from '@semcore/ui/grid';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    padding: '16px',
    marginBottom: '16px',
  };
  return (
    <Row gutter={8}>
      <Col span={12}>
        <Box style={styleBox} />
      </Col>
      <Col span={6}>
        <Box style={styleBox} />
      </Col>
      <Col span={6}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
      <Col span={3}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};


</script>

:::

## Automatic column size detection

::: sandbox

<script lang="tsx">
import React from 'react';
import { Col, Row } from '@semcore/ui/grid';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    padding: '16px',
  };
  return (
    <>
      <Row gutter={4}>
        <Col span>
          <Box style={styleBox} />
        </Col>
        <Col span>
          <Box style={styleBox} />
        </Col>
      </Row>
      <Row gutter={4}>
        <Col span>
          <Box style={styleBox} />
        </Col>
        <Col span>
          <Box style={styleBox} />
        </Col>
        <Col span>
          <Box style={styleBox} />
        </Col>
      </Row>
    </>
  );
};


</script>

:::

## Responsive

The grid has functionality for responsive layouts. You can change width and offsets of the columns depending on the screen size.

::: tip
The grid works as desktop first, as our core products are designed to work primarily on the desktop.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Col, Row } from '@semcore/ui/grid';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    borderRadius: '2px',
    padding: '16px',
  };
  return (
    <Row gutter={4}>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};


</script>

:::

## Responsive alternative API

We have added an alternative API for responsive grids. It's more laconic.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Col, Row } from '@semcore/ui/grid';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    borderRadius: '2px',
    padding: '16px',
  };
  return (
    <Row gutter={4}>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};


</script>

:::
