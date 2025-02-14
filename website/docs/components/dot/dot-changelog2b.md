---
title: Dot
fileSource: dot
tabs: Design('dot'), Changelog('dot-changelog'), Changelog('dot-changelog2'), Changelog('dot-changelog2c'), Changelog('dot-changelog2b'), Changelog('dot-changelog3'), Changelog('dot-changelog4')
---

::: react-view

<script lang="tsx">
import React, { useState } from 'react';
import Switch from '@semcore/ui/switch';
import Check from '@semcore/ui/icon/check/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const App = () => {
    const boxStyles = {
        background: 'var(--intergalactic-bg-secondary-neutral)',
        padding: 'var(--intergalactic-spacing-4x)',
        borderRadius: 'var(--intergalactic-surface-rounded)',
        lineHeight: 'var(--intergalactic-lh-200)',
        fontSize: 'var(--intergalactic-fs-200)',
    };
    const [checked, setChecked] = useState(true);
    return (
        <Box style={boxStyles}>
            <Switch size="l">
                <Switch.Value onChange={setChecked} checked={checked}>
                    {checked && <Check />}
                </Switch.Value>
                <Switch.Addon>
                    <Text size={300} tag='div'>Expand dependency updates</Text>
                </Switch.Addon>
            </Switch>
            <Text size={200} use={'secondary'} tag='div' ml={11} mt={1}>Automatic version updates are collapsed by default to make changelogs easier to read</Text>
        </Box>
)};
</script>

:::

<div style="color: var(--vp-c-text-3)">

## 5.39.1 (February 5, 2025)
</div>

<div style="color: var(--vp-c-text-2)">

- Version patch update due to children dependencies update (`@semcore/animation` [2.40.0 ~> 2.40.1], `@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/utils` [4.45.0 ~> 4.45.1], `@semcore/core` [2.38.0 ~> 2.38.1]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.39.0 (February 3, 2025)

</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.39.1 ~> 2.40.0], `@semcore/utils` [4.44.1 ~> 4.45.0], `@semcore/core` [2.37.1 ~> 2.38.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.38.1 (December 30, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version patch update due to children dependencies update (`@semcore/animation` [2.39.0 ~> 2.39.1], `@semcore/utils` [4.44.0 ~> 4.44.1], `@semcore/core` [2.37.0 ~> 2.37.1]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.38.0 (November 29, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.38.2 ~> 2.39.0], `@semcore/flex-box` [5.38.2 ~> 5.39.0], `@semcore/utils` [4.43.3 ~> 4.44.0], `@semcore/core` [2.36.2 ~> 2.37.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.37.2 (November 22, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version patch update due to children dependencies update (`@semcore/animation` [2.38.1 ~> 2.38.2], `@semcore/utils` [4.43.2 ~> 4.43.3], `@semcore/core` [2.36.1 ~> 2.36.2]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.37.1 (November 8, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version patch update due to children dependencies update (`@semcore/animation` [2.38.0 ~> 2.38.1], `@semcore/utils` [4.43.0 ~> 4.43.2], `@semcore/core` [2.36.0 ~> 2.36.1]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.37.0 (November 1, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.37.0 ~> 2.38.0], `@semcore/utils` [4.42.0 ~> 4.43.0], `@semcore/core` [2.35.0 ~> 2.36.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.36.0 (October 28, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.36.0 ~> 2.37.0], `@semcore/utils` [4.41.0 ~> 4.42.0], `@semcore/core` [2.34.0 ~> 2.35.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.35.0 (October 18, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.35.0 ~> 2.36.0], `@semcore/utils` [4.39.0 ~> 4.41.0], `@semcore/core` [2.33.0 ~> 2.34.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.34.0 (October 11, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.34.0 ~> 2.35.0], `@semcore/utils` [4.38.0 ~> 4.39.0], `@semcore/core` [2.32.0 ~> 2.33.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.33.0 (October 4, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.33.1 ~> 2.34.0], `@semcore/utils` [4.36.2 ~> 4.38.0], `@semcore/core` [2.31.1 ~> 2.32.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.32.1 (September 27, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version patch update due to children dependencies update (`@semcore/animation` [2.33.0 ~> 2.33.1], `@semcore/utils` [4.36.0 ~> 4.36.2], `@semcore/core` [2.31.0 ~> 2.31.1]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.32.0 (September 20, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.32.0 ~> 2.33.0], `@semcore/utils` [4.35.0 ~> 4.36.0], `@semcore/core` [2.30.0 ~> 2.31.0]).
</div>
<div style="color: var(--vp-c-text-3)">

## 5.31.0 (September 6, 2024)


</div>
<div style="color: var(--vp-c-text-2)">

- Version minor update due to children dependencies update (`@semcore/animation` [2.31.2 ~> 2.32.0], `@semcore/utils` [4.32.2 ~> 4.35.0], `@semcore/core` [2.29.2 ~> 2.30.0]).

</div>

