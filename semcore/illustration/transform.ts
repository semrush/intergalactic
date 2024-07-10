import fs from 'fs/promises';
import { resolve as resolvePath } from 'path';
import svgToJsx from 'svg-to-jsx';
import { Window } from 'happy-dom';
import esbuild from 'esbuild';
import ColorJSIO from 'colorjs.io';
const Color = ColorJSIO as any;

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
    let illustrationColor: undefined | string;
    const traverseSvgChildren = (element: Element) => {
      if (element.tagName === 'MASK') return;
      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        traverseSvgChildren(child);
      }
      const color = element.getAttribute('fill') || element.getAttribute('stroke');
      if (color === 'none' || !color) return;
      if (String(color).toUpperCase() !== '#E0E1E9') {
        const saturation = new Color(color).to('hsl').coords[1];
        if (saturation < 20) return;
      }
      if (illustrationColor === undefined) {
        illustrationColor = color;
      } else if (illustrationColor !== color) {
        throw new Error(
          `Illustration ${illustration} has multiple fill colors: ${illustrationColor} and ${color}`,
        );
      }
    };
    traverseSvgChildren(document.querySelector('svg') as any);

    const {
      fill = 'none',
      width,
      height,
      viewBox: { baseVal: viewBox },
    } = document.querySelector('svg') as any;
    const html = `<svg>${document.body.querySelector('svg').innerHTML}</svg>`;

    let jsx = await svgToJsx(html);

    jsx = jsx.replace('<svg>', '').replace('</svg>', '');
    for (const oldId in idReplacements) {
      while (jsx.includes(`url(#${oldId})`)) {
        jsx = jsx.replace(`url(#${oldId})`, `url(#${idReplacements[oldId]})`);
      }
    }

    const prerenderLines: string[] = [];
    const props = [
      `fill = '${fill}'`,
      `width = '${width}'`,
      `height = '${height}'`,
      `viewBox = '${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}'`,
    ];
    if (illustrationColor) {
      while (jsx.includes(`"${illustrationColor}"`)) {
        jsx = jsx.replace(`"${illustrationColor}"`, '{resolvedColor}');
      }
      props.push(`color = '${illustrationColor}'`);
      prerenderLines.push('  const colorResolver = useColorResolver();');
      prerenderLines.push('  const resolvedColor = colorResolver(color);');
    }

    const component = `
import React from 'react';
import { createBaseComponent } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { useColorResolver } from '@semcore/utils/lib/use/useColorResolver';

const ${illustration} = ({${props.join(', ')}, ...props}, ref) => {
${prerenderLines.join('\n')}
  return (
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
}

${illustration}.displayName = '${illustration}'

export default createBaseComponent(${illustration})
    `;

    const typesDeclaration = `
import { BoxProps } from '@semcore/flex-box';
import { Intergalactic } from '@semcore/core';

type IllustrationProps = BoxProps & {
    /**
     * Controls color of colorful illustrations
     ** /
    color?: string;
    /**
     * Changes background fill of the illustration
     **/
    fill?: string;
    /**
     * Width of the illustration
     **/
    width?: string | number;
    /**
     * Height of the illustration
     **/
    height?: string | number;
}
declare const Illustration: Intergalactic.Component<'svg', IllustrationProps>;
export default Illustration;    
`;

    const { code: cjs } = await esbuild.transform(component, {
      format: 'cjs',
      loader: 'tsx',
    });
    const { code: esm } = await esbuild.transform(component, {
      format: 'esm',
      loader: 'tsx',
    });

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
