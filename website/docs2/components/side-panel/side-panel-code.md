---
title: Example
fileSource: side-panel
---

## Basic example

@example basic

## Advanced example

@example fullset

## Access to internal components

You can access the internal components by expanding `SidePanel` for `SidePanel.Overlay`, `SidePanel.Panel` or `SidePanel.Close`.

@example advance

## Placement

The component is supplied with three positioning options.

@example placement

## Disabling overlay

By default, the component is rendered with an overlay, but you can change this by not passing it.

@example overlay

## Portals

By default, the component is rendered to the portal, at the bottom of the body. You can redefine this behavior with [`PortalProvider`](/utils/portal/) and disable it with `disablePortal`.

@example portal

## Iframe

**We recommend not using this component inside an iframe.** Instead, use [modal window](/components/modal/) or [dropdown](/components/dropdown/).
