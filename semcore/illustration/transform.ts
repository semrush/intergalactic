import fs from 'fs/promises';
import { resolve as resolvePath } from 'path';
import svgToJsx from 'svg-to-jsx';
import { Window } from 'happy-dom';
import esbuild from 'esbuild';

const illustrations = await fs.readdir('svg');

await Promise.all(
  illustrations.map(async (fileName) => {
    if (!fileName.endsWith('.svg')) return;
    const illustration = fileName.replace('.svg', '');
    const svg = await fs.readFile(resolvePath('svg', fileName), 'utf-8');

    const window = new Window();
    const document = window.document;
    document.body.innerHTML = svg;
    [...document.querySelectorAll('path')].forEach((element) =>
      element.setAttribute('shape-rendering', 'geometricPrecision'),
    );
    const allIds = [
      ...new Set([...document.querySelectorAll('[id]').map((element) => element.id)]),
    ];
    const idReplacements: Record<string, string> = {};
    for (let i = 0; i < allIds.length; i++) {
      const oldId = allIds[i];
      const newId = `igc-${illustration.toLowerCase()}-el-${i}`;
      document.getElementById(oldId).setAttribute('id', newId);
      idReplacements[oldId] = newId;
    }

    const {
      fill = 'none',
      width,
      height,
      viewBox: { baseVal: viewBox },
    } = document.querySelector('svg') as any;
    const html = '<svg>' + document.body.querySelector('svg').innerHTML + '</svg>';

    let jsx: string = await new Promise((resolve, reject) =>
      svgToJsx(html, {}, (error, result) => (error ? reject(error) : resolve(result))),
    );

    jsx = jsx.replace('<svg>', '').replace('</svg>', '');
    for (const oldId in idReplacements) {
      while (jsx.includes(`url(#${oldId})`)) {
        jsx = jsx.replace(`url(#${oldId})`, `url(#${idReplacements[oldId]})`);
      }
    }

    const component = `
import React from 'react';
import { createBaseComponent } from '@semcore/core';
import { Box } from '@semcore/flex-box';

const ${illustration} = ({fill = '${fill}', width = '${width}', height = '${height}', viewBox = '${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}', ...props}, ref) => (
  <Box 
    ref={ref}
    width={width}
    height={height}
    viewBox={viewBox}
    fill={fill}
    tag="svg"
    {...props}
  >${jsx}</Box>
);

${illustration}.displayName = '${illustration}'

export default createBaseComponent(${illustration})
    `;

    const typesDeclaration = `
import { Box } from '@semcore/flex-box';
declare const _default: typeof Box;
export default _default;    
`;

    const { code: cjs } = await esbuild.transform(component, { format: 'cjs', loader: 'tsx' });
    const { code: esm } = await esbuild.transform(component, { format: 'esm', loader: 'tsx' });

    try {
      await fs.access(illustration);
    } catch {
      await fs.mkdir(illustration);
    }

    await fs.writeFile(resolvePath(illustration, 'index.js'), cjs);
    await fs.writeFile(resolvePath(illustration, 'index.mjs'), esm);
    await fs.writeFile(resolvePath(illustration, 'index.d.ts'), typesDeclaration);
  }),
);
