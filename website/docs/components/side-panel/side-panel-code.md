---
title: SidePanel
fileSource: side-panel
tabs: Design('side-panel'), A11y('side-panel-a11y'), API('side-panel-api'), Example('side-panel-code'), Changelog('side-panel-changelog')
---

## Basic example

::: sandbox

<script lang="tsx" src="examples/basic_example.tsx"></script>

:::

## Advanced example

::: sandbox

<script lang="tsx" src="examples/advanced_example.tsx"></script>

:::

## Access to internal components

You can access the internal components by expanding `SidePanel` for `SidePanel.Overlay`, `SidePanel.Panel` or `SidePanel.Close`.

::: sandbox

<script lang="tsx" src="examples/access_to_internal_components.tsx"></script>

:::

## Placement

The component is supplied with three positioning options.

::: sandbox

<script lang="tsx" src="examples/placement.tsx"></script>

:::

## Disabling overlay

By default, the component is rendered with an overlay, but you can change this by not passing it.

::: sandbox

<script lang="tsx" src="examples/disabling_overlay.tsx"></script>

:::

## Portals

By default, the component is rendered to the portal, at the bottom of the body. You can redefine this behavior with [`PortalProvider`](/utils/portal/portal) and disable it with `disablePortal`.

::: sandbox

<script lang="tsx" src="examples/portals.tsx"></script>

:::

## Iframe

**We recommend not using this component inside an iframe.** Instead, use [modal window](/components/modal/modal) or [dropdown](/components/dropdown/dropdown).

