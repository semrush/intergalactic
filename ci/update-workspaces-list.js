const fs = require('fs');
const path = require('path');

const excludeWorkspaces = { ['semcore/ui']: true, ['tools/@types']: true };

const packageFilePath = path.resolve(__dirname, '..', 'package.json');
const packageFile = JSON.parse(fs.readFileSync(packageFilePath, 'utf-8'));

const workspaces = [
  ...fs
    .readdirSync(path.resolve(__dirname, '..', 'semcore'))
    .filter((dirname) => !dirname.startsWith('.'))
    .map((dirname) => `semcore/${dirname}`),
  ...fs
    .readdirSync(path.resolve(__dirname, '..', 'tools'))
    .filter((dirname) => !dirname.startsWith('.'))
    .map((dirname) => `tools/${dirname}`),
];
packageFile.workspaces = workspaces.filter((workspace) => !excludeWorkspaces[workspace]);

fs.writeFileSync(packageFilePath, JSON.stringify(packageFile, null, 2));
