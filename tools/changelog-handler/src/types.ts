import { Token } from 'marked-ast';

export type ChangelogChangeLabel = 'Added' | 'Changed' | 'Fixed' | 'BREAK';

export type ChangelogChange = {
  component: string;
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
