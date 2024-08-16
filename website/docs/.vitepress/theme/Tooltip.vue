<template>
  <div class="vp-tooltip-container">

    <slot />
    <div class="vp-tooltip" aria-hidden="true">
      <div class="vp-tooltip-arrow"></div>
      {{ tooltipText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tooltipText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.vp-tooltip-container {
  position: relative;
  display: inline-block;
  outline: none;
}

.vp-tooltip {
  opacity: 0;
  transition: calc(var(--intergalactic-duration-popper, 200) * 1ms) all ease-in-out;
  color: var(--intergalactic-text-primary-invert, #ffffff);
  background-color: var(--intergalactic-tooltip-invert, #191b23);
  font-size: var(--intergalactic-fs-100, 12px);
  line-height: var(--intergalactic-lh-100, 133%);
  text-align: center;
  padding: var(--intergalactic-spacing-3x, 12px);
  border-radius: var(--intergalactic-popper-rounded, 6px);
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  white-space: nowrap;
  pointer-events: none;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
}

.vp-tooltip-arrow {
  position: absolute;
  border-width: 6px;
  border-style: solid;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-color: transparent transparent var(--intergalactic-tooltip-invert, #191b23) transparent;
}

.vp-tooltip-container:has(:focus-visible) .vp-tooltip,
.vp-tooltip-container>*:first-child:hover+.vp-tooltip {
  opacity: 1;
  transition-delay: 200ms;
}

body:has(.vp-tooltip-container > *:first-child:hover + .vp-tooltip) .vp-tooltip-container:has(:focus-visible):not(:has(:hover)) .vp-tooltip {
  opacity: 0;
}

.VPNavScreen .vp-tooltip {
  display: none;
}

.VPMenu.VPMenu:has(.vp-tooltip) {
  overflow-x: visible;
  overflow-y: visible;
}

.appearance-action:has(.vp-tooltip) {
  margin-right: -2px;
  display: flex;
  align-items: center;
}

.dark .vp-tooltip {
  color: var(--intergalactic-text-primary, #191b23);
  background-color: var(--intergalactic-tooltip-default, #ffffff);
}

.dark .vp-tooltip-arrow {
  border-color: transparent transparent var(--intergalactic-tooltip-default, #ffffff) transparent;
}
</style>
