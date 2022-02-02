// TODO: update it to handle @semcore/ui changelog handling

// import { parse as parseMarkdown } from 'marked-ast';
// import { toMarkdown, Token } from 'marked-ast-markdown';
// import { VersionPatch } from './makeVersionPatches';
// import { resolve as resolvePath } from 'path';
// import fs from 'fs-extra';
// import dayjs from 'dayjs';

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
