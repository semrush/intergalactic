<template>
  <table class="dosdonts">
    <thead>
      <tr>
        <th scope="col">Don't</th>
        <th scope="col">Do</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="dosdonts-cell">
            <slot name="dont"></slot>
          </div>
        </td>
        <td>
          <div class="dosdonts-cell">
            <slot name="do"></slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.vp-doc table.dosdonts {
  display: table;
  width: 100%;
  max-width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  margin: 20px 0 40px;
  border-radius: var(--intergalactic-surface-rounded, 6px);
  padding-top: var(--intergalactic-spacing-4x, 16px);
  padding-bottom: var(--intergalactic-spacing-4x, 16px);
  background: var(--intergalactic-bg-secondary-neutral, #f4f5f9);
  overflow: hidden;
}

.vp-doc table.dosdonts tr {
  border-bottom: none;
  background: transparent;
}

.vp-doc table.dosdonts tr:hover,
.vp-doc table.dosdonts tbody tr:hover,
.dark .vp-doc table.dosdonts tr:hover,
.dark .vp-doc table.dosdonts tbody tr:hover {
  background: transparent;
}

.vp-doc table.dosdonts th,
.vp-doc table.dosdonts td {
  width: 50%;
  box-sizing: border-box;
  vertical-align: middle;
  text-align: center;
  border: none;
}

.vp-doc table.dosdonts th {
  padding: 0 var(--intergalactic-spacing-10x, 40px) var(--intergalactic-spacing-2x, 8px);
  font-size: var(--intergalactic-fs-400, 20px);
  line-height: var(--intergalactic-lh-400, 120%);
  font-weight: var(--intergalactic-bold, 700);
  background: var(--intergalactic-bg-secondary-neutral, #f4f5f9);
}

.vp-doc table.dosdonts th:first-child,
.vp-doc table.dosdonts td:first-child {
  border-right: 1px solid var(--intergalactic-border-secondary, #e0e1e9);
}

.vp-doc table.dosdonts th:first-child {
  color: var(--intergalactic-text-critical, #d1002f);
}

.vp-doc table.dosdonts th:last-child {
  color: var(--intergalactic-text-success, #007c65);
}

.vp-doc table.dosdonts td {
  padding: 0;
  font-size: var(--intergalactic-fs-200, 14px);
  line-height: var(--intergalactic-lh-200, 142%);
}

.vp-doc table.dosdonts .dosdonts-cell {
  padding: var(--intergalactic-spacing-6x, 24px) var(--intergalactic-spacing-10x, 40px);
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.vp-doc table.dosdonts .dosdonts-cell > * {
  width: 100%;
  max-width: 100%;
  text-align: center;
}

.vp-doc table.dosdonts .dosdonts-cell p {
  margin-top: 0;
  margin-bottom: var(--intergalactic-spacing-2x, 8px);
}

.vp-doc table.dosdonts .dosdonts-cell p:last-child {
  margin-bottom: 0;
}
</style>
