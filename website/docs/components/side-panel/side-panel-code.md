---
title: Code
---

@## Basic example

@example basic

@## Advanced example, access to internal components

You can access the internal components by deploying `SideBar` at `Overlay/Panel/Close`.

@example advance

@## Placement

The component is supplied with three positioning options.

@example placement

@## Disabling overlay

By default, the component is rendered with an overlay, but you can change this without passing it.

@example overlay

@## Portals 🧙🏻‍

By default, the component is rendered to the portal, to the end of the body. You can redefine this behavior with [`PortalProvider`](/utils/portal/) and disable it with `disablePortal`.

@example portal

@## Iframe

**We recommend you not to use this component inside the iframe.** Use [modal window](/components/modal/) or [dropdown](/components/dropdown/) instead.
