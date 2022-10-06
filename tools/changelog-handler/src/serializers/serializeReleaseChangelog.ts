import { ListItem, Token } from 'marked-ast-markdown';
import { Changelog, ChangelogChange } from '../types';

export const serializeReleaseChangelog = (changelogs: Changelog[]): Token[] =>
  changelogs
    .map((changelog): Token[] => {
      const versionHeading: Token = {
        type: 'heading',
        level: 2,
        text: [`[${changelog.version}] - ${changelog.date}`],
        tokens: [
          {
            type: 'text',
            text: [`[${changelog.version}] - ${changelog.date}`],
          },
        ],
      };
      const byComponent = changelog.changes.reduce(
        (acc, change) => ({
          ...acc,
          [change.component]: [...(acc[change.component] || []), change],
        }),
        {} as { [componentName: string]: ChangelogChange[] },
      );
      const changes = Object.values(byComponent);
      const sorted = changes.sort((aChanges, bChanges) => {
        const { component: aComponent } = aChanges[0];
        const { component: bComponent } = bChanges[0];
        if (aComponent !== bComponent) {
          if (aComponent === 'Global') return -1;
          if (bComponent === 'Global') return 1;
        }
        const aBreaks = aChanges.filter((change) => change.label === 'BREAK').length;
        const bBreaks = bChanges.filter((change) => change.label === 'BREAK').length;
        if (aBreaks !== bBreaks) {
          return bBreaks - aBreaks;
        }
        return aComponent.localeCompare(bComponent);
      });
      const changesLists = sorted
        .map((changes) => {
          const { component } = changes[0];
          const componentHeading: Token = {
            type: 'heading',
            level: 3,
            text: [component],
            tokens: [{ type: 'text', text: [component] }],
          };
          const sortedChanges = changes.sort((a, b) => {
            if (a.label !== b.label) {
              if (a.label === 'BREAK') return -1;
              if (b.label === 'BREAK') return 1;
            }
            return 0;
          });
          const componentChanges = sortedChanges.map((change): ListItem => {
            if (!change.description) {
              throw new Error(`Got empty change description ${JSON.stringify(change)}`);
            }
            return {
              type: 'listitem',
              text: [
                {
                  type: 'strong',
                  text: [change.label],
                  tokens: [{ type: 'text', text: [change.label] }],
                },
                ' ',
                ...change.descriptionFormatted,
              ],
            };
          });
          const componentChangesList: Token = {
            type: 'list',
            ordered: false,
            body: componentChanges,
          };

          return [componentHeading, componentChangesList];
        })
        .flat();

      return [versionHeading, ...changesLists];
    })
    .flat();
