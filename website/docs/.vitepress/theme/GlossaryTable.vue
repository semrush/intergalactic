<script setup lang="ts">
const terms = [
  { use: 'about', not: 'approximately' },
  { use: 'adult', not: 'middle-aged' },
  { use: 'afterward', not: 'afterwards' },
  { use: 'allowlist', not: 'whitelist' },
  { use: 'analyze', not: 'analyse' },
  { use: 'backward', not: 'backwards' },
  { use: 'behavior', not: 'behaviour' },
  { use: 'blocklist', not: 'blacklist' },
  { use: 'buy', not: 'purchase (in buttons)' },
  { use: 'canceled', not: 'cancelled' },
  { use: 'catalog', not: 'catalogue' },
  { use: 'center', not: 'centre' },
  { use: 'child', not: 'kid' },
  { use: 'color', not: 'colour' },
  { use: 'defense', not: 'defence' },
  { use: 'easy, a breeze', not: 'cakewalk' },
  { use: 'end', not: 'terminate' },
  { use: 'enough', not: 'sufficient' },
  { use: 'favorite', not: 'favourite' },
  { use: 'forward', not: 'forwards' },
  { use: 'fulfill', not: 'fulfil' },
  { use: 'help', not: 'assist' },
  { use: "it's not possible", not: 'no can do' },
  { use: 'mature, older', not: 'aging' },
  { use: 'minor', not: 'underaged' },
  { use: 'primary, superior', not: 'master' },
  { use: 'regenerate', not: 're-generate' },
  { use: 'secondary, follower', not: 'slave' },
  { use: 'senior, older adult', not: 'old, elderly' },
  { use: 'start, begin', not: 'commence' },
  { use: 'teen, teenager', not: 'youngster' },
  { use: 'they', not: 'she or he' },
  { use: 'toward', not: 'towards' },
  { use: 'use', not: 'utilize' },
  { use: 'rerun', not: 're-run' },
  { use: 'enter', not: 'specify' },
  { use: 'click', not: 'press' },
  { use: 'reply', not: 'respond' },
  { use: 'learn more', not: 'read more' },
  { use: 'go to', not: 'open' },
  { use: 'issue', not: 'error' },
  { use: 'continue, next step', not: 'proceed' },
  { use: 'select', not: 'choose' },
];
</script>

<template>
  <table class="glossary-table">
    <thead>
      <tr>
        <th scope="col">
          <span class="glossary-table-mark" aria-hidden="true">✗</span>
          Not this
        </th>
        <th scope="col">
          <span class="glossary-table-mark" aria-hidden="true">✓</span>
          Use this
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="term in terms" :key="term.use">
        <td>{{ term.not }}</td>
        <td>{{ term.use }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.vp-doc table.glossary-table {
  display: table;
  width: 100%;
  max-width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 20px 0 40px;
  border: 1px solid var(--intergalactic-border-secondary, #e0e1e9);
  border-radius: var(--intergalactic-surface-rounded, 6px);
  overflow: hidden;
}

.vp-doc table.glossary-table tr {
  border-bottom: none;
  background: transparent;
}

.vp-doc table.glossary-table tr:hover,
.vp-doc table.glossary-table tbody tr:hover,
.dark .vp-doc table.glossary-table tr:hover,
.dark .vp-doc table.glossary-table tbody tr:hover {
  background: transparent;
}

.vp-doc table.glossary-table th,
.vp-doc table.glossary-table td {
  box-sizing: border-box;
  vertical-align: top;
  border: none;
}

.vp-doc table.glossary-table th {
  width: 50%;
  padding: var(--intergalactic-spacing-2x, 8px) var(--intergalactic-spacing-4x, 16px);
  font-size: var(--intergalactic-fs-300, 16px);
  line-height: var(--intergalactic-lh-300, 140%);
  font-weight: var(--intergalactic-bold, 700);
  text-align: left;
  border-bottom: 1px solid var(--intergalactic-border-secondary, #e0e1e9);
}

.vp-doc table.glossary-table th:first-child,
.vp-doc table.glossary-table td:first-child {
  background: color-mix(
    in srgb,
    var(--intergalactic-bg-secondary-critical, #fef1ee) 40%,
    transparent
  );
  border-right: 1px solid var(--intergalactic-border-secondary, #e0e1e9);
}

.vp-doc table.glossary-table th:last-child,
.vp-doc table.glossary-table td:last-child {
  background: color-mix(
    in srgb,
    var(--intergalactic-bg-secondary-success, #edf7f2) 40%,
    transparent
  );
}

.vp-doc table.glossary-table th:first-child {
  color: var(--intergalactic-text-critical, #d1002f);
}

.vp-doc table.glossary-table th:last-child {
  color: var(--intergalactic-text-success, #007c65);
}

.vp-doc table.glossary-table .glossary-table-mark {
  margin-right: var(--intergalactic-spacing-1x, 4px);
}

.vp-doc table.glossary-table td {
  width: 50%;
  padding: 10px var(--intergalactic-spacing-4x, 16px);
  font-size: var(--intergalactic-fs-200, 14px);
  line-height: var(--intergalactic-lh-200, 142%);
  border-bottom: 1px solid var(--intergalactic-border-secondary, #e0e1e9);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.vp-doc table.glossary-table td:first-child {
  color: var(--intergalactic-text-primary, #191919);
}

.vp-doc table.glossary-table td:last-child {
  color: var(--intergalactic-text-primary, #191919);
  font-weight: var(--intergalactic-medium, 500);
}

.vp-doc table.glossary-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
