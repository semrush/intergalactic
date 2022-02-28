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

// {

// const changelogAst = parseMarkdown(changelogText);

// const lastItem = changelogAst[changelogAst.length - 1];
// const isChangelogValid =
//   lastItem.type === 'list' &&
//   lastItem.body.length === 1 &&
//   lastItem.body[0].text.length === 2 &&
//   typeof lastItem.body[0].text[0] !== 'string' &&
//   'text' in lastItem.body[0].text[0] &&
//   lastItem.body[0].text[0].text.length === 1 &&
//   lastItem.body[0].text[0].text[0] === 'Added' &&
//   String(lastItem.body[0].text[1]).trim() === 'Initial release';

// if (!isChangelogValid) {
//   throw new Error(`Invalid changelog file ${changelogFilePath}`);
// }

// const handledVersions = new Map<string, true>();
// const changelogs: Changelog[] = [];

// let traversingComponent: string | null = null;
// let traversingVersion: string | null = null;
// let traversingDate: string | null = null;
// traversingComponent = null;
// traversingVersion = null;
// traversingDate = null;
// for (const token of changelogAst) {
//   if (token.type === 'heading' && token.level === 2) {
//     const [versionContainer, date] = token.text.join('').split(' - ');
//     if (!versionContainer || !date) {
//       throw new Error(
//         `Unable to process "${token.text.join('')}" row of changelog ${changelogFilePath}`,
//       );
//     }

//     const version = versionContainer.substring(1, versionContainer.length - 1);
//     if (!isValidSemver(version)) {
//       throw new Error(
//         `Invalid version in "${token.text.join('')}" row of changelog ${changelogFilePath}`,
//       );
//     }
//     traversingVersion = version;
//     traversingDate = date;

//     if (!dayjs(date).isValid() && date !== 'unreleased') {
//       const tokenText = token.text.join('');
//       const message = `Invalid date in "${tokenText}" (only YYYY-MM-DD or "unreleased" allowed) row of changelog ${changelogFilePath}`;
//       throw new Error(message);
//     }

//     if (handledVersions.has(version)) {
//       throw new Error(`Duplicated version "${version}" in changelog ${changelogFilePath}`);
//     }

//     handledVersions.set(version, true);
//   } else if (token.type === 'heading' && token.level === 3 && traversingVersion !== null) {
//     const component = token.text.join();
//     if (component !== 'Global' && !knownComponents.includes(component)) {
//       const stringifiedKnownComponentsList = knownComponents
//         .map((component) => `"${component}"`)
//         .join(', ');

//       throw new Error(
//         `Found unknown component "${component}" in changelog ${changelogFilePath}. Allowed names: "Global" and [${stringifiedKnownComponentsList}]`,
//       );
//     }
//     traversingComponent = component;
//   } else if (
//     traversingVersion &&
//     traversingDate &&
//     traversingComponent &&
//     token.type === 'list'
//   ) {
//     for (const item of token.body) {
//       if (item.type !== 'listitem') {
//         throw new Error(
//           `Unexpected list item token ${JSON.stringify(item)} in changelog ${changelogFilePath}`,
//         );
//       }

//       const prefix = item.text[0];
//       const restText = item.text.slice(1);

//       if (typeof prefix === 'string' || prefix.type !== 'strong') {
//         throw new Error(
//           `Invalid prefix for changelog change. Expected strong text, ` +
//             `got ${JSON.stringify(prefix)} in changelog ${changelogFilePath}`,
//         );
//       }

//       const component = traversingComponent;
//       const label = (item.text[0] as any as { text: [ChangelogChangeLabel] }).text[0];
//       const description = restText
//         .map((token) => {
//           if (typeof token === 'string') return token;
//           if ('text' in token) return token.text;
//           return JSON.stringify(token);
//         })
//         .join('')
//         .trim();
//       const descriptionFormatted = restText as Token[];

//       if (changelogs[changelogs.length - 1]?.version !== traversingVersion) {
//         changelogs.push({
//           component: releasePackageName,
//           date: traversingDate,
//           version: traversingVersion,
//           changes: [],
//         });
//       }

//       changelogs[changelogs.length - 1].changes.push({
//         component,
//         label,
//         description,
//         descriptionFormatted,
//       });
//     }
//   } else {
//     throw new Error(
//       `Unexpected markdown token ${JSON.stringify(token)} in changelog ${changelogFilePath}`,
//     );
//   }
// }

// return changelogs;
// };
