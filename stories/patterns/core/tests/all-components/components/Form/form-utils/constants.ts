export const FORM_TAB_LOADING_MS = 3000;

export const FORM_TAB_COLUMN_STYLE = {
  flex: '1 1 calc(50% - 8px)',
  minWidth: 0,
  maxWidth: 'calc(50% - 8px)',
} as const;

export type FormTabColumnStyle = typeof FORM_TAB_COLUMN_STYLE;
