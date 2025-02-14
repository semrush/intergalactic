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
    const [checked, setChecked] = useState(false);
    return (
        <Box style={boxStyles}>
            <Switch size="l">
                <Switch.Value onChange={setChecked} checked={checked}>
                    {checked && <Check />}
                </Switch.Value>
                <Switch.Addon>
                    <Text size={300} tag='div'>Show dependency updates</Text>
                </Switch.Addon>
            </Switch>
            <Text size={200} use={'secondary'} tag='div' ml={11} mt={1}>Automatic version updates are hidden by default to make changelogs easier to read</Text>
        </Box>
)};
</script>

:::

<div style="margin-top: 32px">

**5.39.1 – 5.1.0 — dependency updates**
</div>

## 5.0.0 ❌ (July 17, 2023)

### Break

* Strict, backward incompatible typings.

<div style="margin-top: 32px">

**4.2.41 – 4.2.27 — dependency updates**
</div>

## 4.2.25 (May 2, 2023)

### Changed

* Removed `aria-flowto` because it has bad screen readers support and often confuse users in supporting screen readers.

<div style="margin-top: 32px">

**4.2.24 – 4.2.19 — dependency updates**
</div>

## 4.2.18 (March 24, 2023)

### Fixed

* Fixed local themes on dot.

## 4.2.9 (January 28, 2023)

### Fixed

* Fixed `m` and `l` sizes rounding.

## 4.2.1 (December 13, 2022)

### Changed

* Added `react-dom` to peer dependencies.

## 4.2.0 (December 12, 2022)

### Added

* Design tokens based theming.

## 4.1.5 (November 25, 2022)

### Added

* Added CSS property `isolation` to container.

<!-- ::: changelog dot ::: -->
