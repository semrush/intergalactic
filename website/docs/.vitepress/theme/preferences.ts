import { ref } from 'vue';

const inBrowser = typeof window !== 'undefined';
const get = (key: string, defaultValue = false): boolean =>
  inBrowser ? JSON.parse(localStorage.getItem(key) || String(defaultValue)) : defaultValue;

export const preferSemcoreUiKey = 'prefer-semcore-ui-package';
export const preferSemcoreUi = ref(get(preferSemcoreUiKey, false));
