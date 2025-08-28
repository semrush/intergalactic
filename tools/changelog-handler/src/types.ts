import type { Token } from 'marked-ast';

export type ChangelogChangeLabel = 'Added' | 'Changed' | 'Fixed' | 'BREAK' | null;

export type ChangelogChange = {
  component: string;
  version: string;
  label: ChangelogChangeLabel;
  description: string;
  descriptionFormatted: (string | Token)[];
  isAutomatic: boolean;
};

export type Changelog = {
  component: string;
  date: string | 'unreleased';
  version: string;
  changes: ChangelogChange[];
};
