<template>
  <table class="dosdonts-copy">
    <tbody>
      <tr>
        <td class="dosdonts-copy-mark dosdonts-copy-mark--dont">
          <span aria-hidden="true">✗</span>
        </td>
        <td class="dosdonts-copy-content dosdonts-copy-content--dont">
          <slot name="dont"></slot>
        </td>
        <td class="dosdonts-copy-mark dosdonts-copy-mark--do">
          <span aria-hidden="true">✓</span>
        </td>
        <td class="dosdonts-copy-content dosdonts-copy-content--do">
          <slot name="do"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.vp-doc table.dosdonts-copy {
  display: table;
  width: 100%;
  max-width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  margin: var(--intergalactic-spacing-2x, 8px) 0 var(--intergalactic-spacing-6x, 24px);
  border-radius: var(--intergalactic-surface-rounded, 6px);
  overflow: hidden;
}

.vp-doc table.dosdonts-copy tr {
  border-bottom: none;
  background: transparent;
}

.vp-doc table.dosdonts-copy tr:hover,
.vp-doc table.dosdonts-copy tbody tr:hover,
.dark .vp-doc table.dosdonts-copy tr:hover,
.dark .vp-doc table.dosdonts-copy tbody tr:hover {
  background: transparent;
}

.vp-doc table.dosdonts-copy td {
  box-sizing: border-box;
  vertical-align: top;
  border: none;
  font-size: var(--intergalactic-fs-200, 14px);
  line-height: var(--intergalactic-lh-200, 142%);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.vp-doc table.dosdonts-copy .dosdonts-copy-mark {
  width: 34px;
  padding: var(--intergalactic-spacing-4x, 16px) 0 var(--intergalactic-spacing-4x, 16px)
    var(--intergalactic-spacing-4x, 16px);
}

.vp-doc table.dosdonts-copy .dosdonts-copy-mark span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: calc(var(--intergalactic-fs-200, 14px) * 1.42);
  font-size: 18px;
  line-height: 1;
  font-weight: var(--intergalactic-bold, 700);
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content {
  width: calc(50% - 34px);
  padding: var(--intergalactic-spacing-4x, 16px) var(--intergalactic-spacing-4x, 16px)
    var(--intergalactic-spacing-4x, 16px) var(--intergalactic-spacing-2x, 8px);
}

.vp-doc table.dosdonts-copy .dosdonts-copy-mark--dont,
.vp-doc table.dosdonts-copy .dosdonts-copy-content--dont {
  background: color-mix(
    in srgb,
    var(--intergalactic-bg-secondary-critical, #fef1ee) 40%,
    transparent
  );
}

.vp-doc table.dosdonts-copy .dosdonts-copy-mark--dont {
  color: var(--intergalactic-text-critical, #b03010);
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content--dont {
  color: var(--intergalactic-text-primary, #191b23);
}

/* .vp-doc table.dosdonts-copy .dosdonts-copy-content--dont {
  border-right: 1px solid var(--intergalactic-border-secondary, #e0e1e9);
} */

.vp-doc table.dosdonts-copy .dosdonts-copy-mark--do,
.vp-doc table.dosdonts-copy .dosdonts-copy-content--do {
  background: color-mix(
    in srgb,
    var(--intergalactic-bg-secondary-success, #edf7f2) 40%,
    transparent
  );
}

.vp-doc table.dosdonts-copy .dosdonts-copy-mark--do {
  color: var(--intergalactic-text-success, #1b6b3a);
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content--do {
  color: var(--intergalactic-text-primary, #191b23);
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content > * {
  width: 100%;
  max-width: 100%;
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content p {
  margin-top: 0;
  margin-bottom: var(--intergalactic-spacing-2x, 8px);
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content p:last-child {
  margin-bottom: 0;
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content ol,
.vp-doc table.dosdonts-copy .dosdonts-copy-content ul {
  margin: 0;
  padding-left: 1.25em;
}

.vp-doc table.dosdonts-copy .dosdonts-copy-content li + li {
  margin-top: var(--intergalactic-spacing-1x, 4px);
}
</style>
