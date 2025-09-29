import fs from 'fs/promises';

import * as Figma from 'figma-js';

const accessToken = 'your token here';

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
    str += `
import ${set.name}${size} from '@semcore/${folder}/${set.name}/${size.toLowerCase()}';
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

await fs.writeFile(`../Icon.figma.jsx`, str);
