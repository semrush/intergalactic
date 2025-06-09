import type { ChangelogChangeLabel } from '@semcore/changelog-handler';

const type2SectionLabel: Record<string, string> = {
  added: ':white_check_mark: ADDED',
  changed: ':recycle: CHANGED',
  fixed: ':hammer_and_wrench: FIXED',
  removed: ':wastebasket: REMOVED',
  break: ':interrobang: BREAK',
};

type Changelog = {
  component: string;
  version: string;
  changes: {
    component: string;
    version: string;
    label: 'Added' | 'Changed' | 'Fixed' | 'BREAK';
    description: string;
  }[];
};

export const makeMessageFromChangelogs = (changelogs: Changelog[], withVersions: boolean) =>
  changelogs.flatMap(({ changes }) => bodyTemplate(changes, withVersions)).join('\n');

const titleTemplate = (name: string, version: string | null) =>
  `\n-------- \n:black_heart: *${name}* ${version ? `v${version}` : ''} \n\n`;

const bodyTemplate = (changes: Changelog['changes'], withVersions: boolean) => {
  const components: Partial<{ [componentName: string]: Changelog['changes'] }> = {};
  for (const change of changes) {
    components[change.component] = components[change.component] || [];
    components[change.component]?.push(change);
  }

  return Object.values(components).map((changes) => {
    const { component, version } = changes![0];
    const sections: Partial<{ [label in ChangelogChangeLabel]: string[] }> = {};
    for (const change of changes!) {
      sections[change.label] = sections[change.label] || [];
      sections[change.label]?.push(change.description);
    }

    return (
      titleTemplate(component, withVersions ? version : null) +
      Object.entries(sections)
        .map(([label, changeDescriptions]) => {
          const title = label in type2SectionLabel ? type2SectionLabel[label] : label.toUpperCase();

          return (
            title +
            '\n' +
            changeDescriptions.map((changeDescription) => `- ${changeDescription}`).join('\n')
          );
        })
        .join('\n')
    );
  });
};
