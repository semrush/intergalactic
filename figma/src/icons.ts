import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import * as Figma from 'figma-js';

// create .env file in the root of the project and put this line there:
// FIGMA_ACCESS_TOKEN=yourFigmaToken
dotenv.config({ path: './.env' });

const accessToken = process.env.FIGMA_ACCESS_TOKEN;

const figma = Figma.Client({ personalAccessToken: accessToken });
// const axiosOptions = { headers: { "X-FIGMA-TOKEN": accessToken } };

const fileid = 'lVX2dKnVFtcSTQV7eSS5j1';

const sets = await figma.fileComponentSets(fileid);
const components = await figma.fileComponents(fileid);

let str = `import figma from '@figma/code-connect';
`;

for (const set of sets.data.meta.component_sets) {
  let folder = '';
  switch (set.containing_frame.nodeId) {
    case '4738:24': folder = 'icon/color';
      break;
    case '3940:14': folder = 'icon/pay';
      break;
    default: folder = 'icon';
  }
  const sizes = ['M', 'L'];

  for (const size of sizes) {
    const iconSubpath = folder === 'icon' ? '' : `${folder.replace(/^icon\//, '')}/`;
    str += `
import ${set.name}${size} from '@semcore/icon/${iconSubpath}${set.name}/${size.toLowerCase()}';
figma.connect(${set.name}${size}, 'https://www.figma.com/design/lVX2dKnVFtcSTQV7eSS5j1/%F0%9F%94%8D-Icons?node-id=${set.node_id}', {
  variant: { ${folder === 'icon/pay' ? 'size' : 'Size'}: '${folder === 'icon/pay' ? size.toLowerCase() : size}' },
  example: () => <${set.name}${size} />,
});
`;
  }
}

for (const component of components.data.meta.components) {
  if (component.containing_frame.nodeId !== '7776:24') continue;
  str += `
import ${component.name} from '@semcore/icon/platform/${component.name}';
figma.connect(${component.name}, 'https://www.figma.com/design/lVX2dKnVFtcSTQV7eSS5j1/%F0%9F%94%8D-Icons?node-id=${component.node_id}');
`;
}

const outFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '../mappings/Icon.figma.jsx');
await fs.writeFile(outFile, str);
