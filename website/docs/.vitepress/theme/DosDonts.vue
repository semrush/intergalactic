<template>
  <table class="dosdonts">
    <tr>
      <th>Don't</th>
      <th>Do</th>
    </tr>
    <tr>
      <td>
        It makes us sound like Semrush &mdash; regardless of who the person behind the communication&nbsp;is.
      </td>
      <td>
        It makes us sound like Semrush&mdash;regardless of who the person behind the communication&nbsp;is.
      </td>
    </tr>
  </table>
</template>

<style>
.dosdonts {
  border-radius: var(--intergalactic-surface-rounded, 6px);
  padding-top: var(--intergalactic-spacing-4x, 16px);
  padding-bottom: var(--intergalactic-spacing-4x, 16px);
  background: var(--intergalactic-bg-secondary-neutral, #f4f5f9);
}
.dosdonts th {
  background: var(--intergalactic-bg-secondary-neutral, #f4f5f9);
}

.dosdonts td,
.dosdonts th {
  text-align: center;
}

.dosdonts tr {
  border-bottom: none;
}

.dosdonts th {
  padding-top: 0;
  font-size: var(--intergalactic-fs-400, 20px);
  line-height: var(--intergalactic-lh-400, 120%);
  font-weight: var(--intergalactic-bold, 700);
}

.dosdonts td {
  padding: var(--intergalactic-spacing-6x, 24px) var(--intergalactic-spacing-10x, 40px) var(--intergalactic-spacing-6x, 24px);
  font-size: var(--intergalactic-fs-200, 14px);
  line-height: var(--intergalactic-lh-200, 142%);
}

.dosdonts tr th:first-of-type, td:first-of-type {
  border-right: 1px solid var(--intergalactic-border-secondary,  #e0e1e9);
}

.dosdonts th:first-of-type {
  color: var(--intergalactic-text-critical, #d1002f);
}

.dosdonts th:last-of-type {
  color: var(--intergalactic-text-success, #007c65);
}
</style>