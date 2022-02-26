import { parse as parseMarkdown } from 'marked-ast';
import { isValidSemver } from './utils';
import dayjs from 'dayjs';
import { Token } from 'marked-ast-markdown';

export type Version = {
  version: string;
  date: 'unreleased' | string;
  notes: { [noteType: string]: Token[] };
  isPrivate: boolean;
};

export const parseChangelog = (changelogText: string, changelogPath: string) => {
  const changelogAst = parseMarkdown(changelogText);
  const isChangelogValid =
    changelogAst[0].type === 'heading' &&
    changelogAst[0].level === 1 &&
    changelogAst[0].text.join('') === 'Changelog';

  if (!isChangelogValid) {
    throw new Error(`Invalid changelog file ${changelogPath}`);
  }

  const handledVersions = new Map<string, true>();
  const versions: Version[] = [];

  let traversingVersion: string | null = null;
  let traversingNoteType: string | null = null;

  for (const token of changelogAst) {
    if (token.type === 'heading' && token.level === 2) {
      const [versionContainer, date] = token.text.join('').split(' - ');
      if (!versionContainer || !date) {
        throw new Error(
          `Unable to process "${token.text.join('')}" row of changelog ${changelogPath}`,
        );
      }

      const version = versionContainer.substring(1, versionContainer.length - 1);
      if (!isValidSemver(version)) {
        throw new Error(
          `Invalid version in "${token.text.join('')}" row of changelog ${changelogPath}`,
        );
      }
      traversingVersion = version;
      traversingNoteType = null;

      let isPrivate = false;
      if (!dayjs(date).isValid()) {
        if (date === 'unreleased') {
          isPrivate = true;
        } else {
          const tokenText = token.text.join('');
          const message = `Invalid date in "${tokenText}" (only YYYY-MM-DD or "unreleased" allowed) row of changelog ${changelogPath}`;
          throw new Error(message);
        }
      }

      if (handledVersions.has(version)) {
        throw new Error(`Duplicated version "${version}" in changelog ${changelogPath}`);
      }

      versions.push({
        version,
        date,
        notes: {},
        isPrivate,
      });
      handledVersions.set(version, true);
    } else if (token.type === 'heading' && token.level === 3) {
      if (traversingVersion !== null) {
        traversingNoteType = token.text.join('');
      } else {
        throw new Error(
          `Unexpected heading of level 3 "${token.text.join('')}" in changelog ${changelogPath}`,
        );
      }
    } else if (traversingVersion && traversingNoteType) {
      const notesContainer = versions[versions.length - 1].notes;
      notesContainer[traversingNoteType] = notesContainer[traversingNoteType] || [];
      notesContainer[traversingNoteType].push(token);
    }
  }

  return versions;
};

// TODO: update it to handle @semcore/ui changelog handling

// export const updateChangelogs = async (versionPatches: VersionPatch[]) => {
//   for (const patch of versionPatches) {
//     if (patch.changelogUpdated) continue;

//     const changelogFilePath = resolvePath(patch.package.path, 'CHANGELOG.md');
//     const changelogFileContent = await fs.readFile(changelogFilePath, 'utf-8');
//     const ast = parseMarkdown(changelogFileContent);
//     const lastVersionIndex = ast.findIndex(
//       (token) =>
//         token.type === 'heading' && token.level === 2 && token.text.join('').startsWith('['),
//     );
//     const changeTitle = `[${patch.to}] - ${dayjs().format('YYYY-MM-DD')}`;
//     const newTokens: Token[] = [
//       {
//         type: 'heading',
//         level: 2,
//         text: [changeTitle],
//         tokens: [{ type: 'text', text: [changeTitle] }],
//       },
//     ];
//     for (const noteType in patch.notes) {
//       newTokens.push({
//         type: 'heading',
//         level: 3,
//         text: [noteType],
//         tokens: [{ type: 'text', text: [noteType] }],
//       });
//       newTokens.push(...patch.notes[noteType]);
//     }
//     ast.splice(lastVersionIndex, 0, ...newTokens);
//     const updatedChangelog = toMarkdown(ast);
//     await fs.writeFile(changelogFilePath, updatedChangelog);
//   }
// };
