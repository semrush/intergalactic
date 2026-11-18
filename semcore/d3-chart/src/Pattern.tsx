import { sstyled } from '@semcore/core';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import React from 'react';

import style from './style/pattern.shadow.css';
/**
 * Object that is fully describes the pattern
 */
export type Pattern = {
  /**
   * SVG jsx element and svg viewbox of the SVG pattern
   * used to fill chart elements such bars or areas
   */
  fill: {
    viewBox: string;
    children: React.ReactNode;
  };
  /**
   * SVG jsx element, viewbox and render size of the single
   * pattern image used on line dots or caps
   */
  symbol: {
    viewBox: string;
    size: [width: number, height: number];
    children: React.ReactNode;
  };
  /**
   * SVG stroke-dasharray property that defines line chart
   * lines dash pattern
   */
  dasharray?: string;
};

const defaultDasharrays = ['4 4', '8 8', '2 4', '4 8', '8 2', '8 4', '12 4', '2 2'];

const defaultPatterns = {
  zigzag: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <path d='M12 9.91 9.91 12H7.1L12 7.09zM4.91 12H2.1L0 9.91V7.1zm0-12L6 1.09 7.09 0H9.9L6 3.91 2.09 0z' />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path d='M14.81 11.56 20 6.38v4.24l-5.23 5.23-7.38-7.71L0 15.54v-4.24l7.44-7.44z' />
      ),
    },
    dasharray: defaultDasharrays[7],
  },
  circleOutline: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <path
          fillRule='evenodd'
          d='M10 7.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0m2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path
          fillRule='evenodd'
          d='M14.8 10a4.8 4.8 0 1 0-9.6 0 4.8 4.8 0 0 0 9.6 0M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0'
        />
      ),
    },
    dasharray: defaultDasharrays[2],
  },
  linesDouble: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <path d='M7 16H5V0h2zm6 0h-2V0h2z' />
      ),
    },
    symbol: {
      viewBox: '0 0 16 16',
      size: [16, 16],
      children: (
        <path d='M8 15H6V2h2zm5 0h-2V2h2z' />
      ),
    },
    dasharray: defaultDasharrays[6],
  },
  trees: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <path d='m19.2 16.8-1.4 1.4-3.8-3.79-3.8 3.8-1.4-1.42 5.2-5.2zm-8-9L9.8 9.2 6 5.42l-3.8 3.8L.8 7.79 6 2.6z' />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <>
          <path d='m19.56 16.44-2.12 2.12L14 15.12l-3.44 3.44-2.12-2.12L14 10.88z' />
          <path d='m11.56 7.44-2.12 2.12L6 6.12 2.56 9.56.44 7.44 6 1.88z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[6],
  },
  rombOutline: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <path
          fillRule='evenodd'
          d='m16.83 9.41-7.41 7.42L2 9.42 9.41 2zm-12.34 0 4.92 4.93 4.93-4.93L9.4 4.5z'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 24 24',
      size: [16, 16],
      children: (
        <path
          fillRule='evenodd'
          d='M24 12 12 24 0 12 12 0zM4.24 12 12 19.76 19.76 12 12 4.24z'
        />
      ),
    },
    dasharray: defaultDasharrays[4],
  },
  square: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <path d='M12 4H4v8h8V4Z' />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path d='M16.88 3H2.88v14h14V3Z' />
      ),
    },
    dasharray: defaultDasharrays[5],
  },
  wave: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <path d='M3 3c1.52 0 2.95.85 3.86 2.36.6.99 1.41 1.39 2.14 1.39s1.55-.4 2.14-1.39q.38-.62.86-1.09v3.2c-.84.83-1.9 1.28-3 1.28-1.52 0-2.95-.85-3.86-2.36C4.54 5.4 3.73 5 3 5S1.45 5.4.86 6.39Q.48 7.01 0 7.48v-3.2C.84 3.44 1.9 3 3 3' />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path d='M6.5 6.5c1.84 0 3.62.94 4.75 2.68.61.93 1.47 1.32 2.25 1.32s1.63-.39 2.25-1.32C16.78 7.6 18.34 6.68 20 6.53v3.03c-.63.13-1.26.53-1.75 1.27-1.13 1.73-2.91 2.67-4.75 2.67s-3.62-.94-4.75-2.67C8.13 9.89 7.28 9.5 6.5 9.5s-1.63.39-2.25 1.32C3.22 12.4 1.66 13.32 0 13.47v-3.03c.63-.13 1.26-.53 1.75-1.27C2.88 7.44 4.66 6.5 6.5 6.5' />
      ),
    },
    dasharray: defaultDasharrays[7],
  },
  triangleDown: {
    fill: {
      viewBox: '0 0 21 16',
      children: (
        <path d='M10.56 12.63 16.12 3H5z' />
      ),
    },
    symbol: {
      viewBox: '0 0 24 20',
      size: [16, 13.33],
      children: (
        <path d='M12.06 18.42 22.12 1H2z' />
      ),
    },
    dasharray: defaultDasharrays[3],
  },
  star: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <path d='M8.04 3.47c.27-.98 1.65-.98 1.92 0l.64 2.27c.12.45.54.76 1 .74l2.36-.1c1.02-.05 1.44 1.27.6 1.83l-1.97 1.3c-.39.26-.55.75-.38 1.19l.82 2.21c.36.95-.76 1.76-1.56 1.13l-1.85-1.47c-.36-.29-.88-.29-1.24 0l-1.85 1.47c-.8.63-1.92-.18-1.56-1.13l.82-2.21c.17-.44 0-.93-.38-1.19l-1.97-1.3c-.84-.56-.42-1.88.6-1.84l2.36.1c.46.03.88-.28 1-.73z' />
      ),
    },
    symbol: {
      viewBox: '0 0 24 23',
      size: [16, 15.33],
      children: (
        <path d='M11.41 2.46c.2-.61 1.07-.61 1.27 0l1.91 5.89a1 1 0 0 0 .64.46h6.19c.65 0 .92.83.39 1.21l-5.01 3.64a1 1 0 0 0-.24.75l1.91 5.89c.2.61-.5 1.13-1.02.75l-5.01-3.64a1 1 0 0 0-.79 0l-5.01 3.64c-.52.38-1.23-.13-1.03-.75l1.91-5.89a1 1 0 0 0-.24-.75L2.28 10.02c-.52-.38-.26-1.21.39-1.21h6.19a1 1 0 0 0 .64-.46z' />
      ),
    },
    dasharray: defaultDasharrays[0],
  },
  cogwheel: {
    fill: {
      viewBox: '0 0 18 20',
      children: (
        <path
          fillRule='evenodd'
          d='M16.06 5.92v8.16L9 18.15l-7.06-4.07V5.92L9 1.85zM3.94 7.08v5.84L9 15.84l5.06-2.92V7.08L9 4.15z'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path
          fillRule='evenodd'
          d='M18.13 5.66v9.31L10.07 19.63 2 14.97V5.66L10.07 1zM5.2 7.5v5.62l4.87 2.81 4.86-2.81V7.5L10.07 4.69z'
        />
      ),
    },
    dasharray: defaultDasharrays[1],
  },
  crossesDiagonal: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <path
          fillRule='evenodd'
          d='M10.3 4.3c.38-.4 1.02-.4 1.4 0 .4.38.4 1.02 0 1.4L9.42 8l2.3 2.3c.39.38.39 1.02 0 1.4-.4.4-1.03.4-1.42 0L8 9.42l-2.3 2.3c-.38.39-1.02.39-1.4 0-.4-.4-.4-1.03 0-1.42L6.58 8l-2.3-2.3c-.39-.38-.39-1.02 0-1.4.4-.4 1.03-.4 1.42 0L8 6.58z'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path
          fillRule='evenodd'
          d='M13.59 3.59a2 2 0 0 1 2.82 2.82L12.83 10l3.58 3.59a2 2 0 1 1-2.82 2.82L10 12.83l-3.59 3.58a2 2 0 1 1-2.82-2.82L7.17 10 3.59 6.41a2 2 0 1 1 2.82-2.82L10 7.17z'
        />
      ),
    },
    dasharray: defaultDasharrays[2],
  },
  triangleOutline: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <path
          fillRule='evenodd'
          d='M15.93 15H2.07L9 3zm-10.4-2h6.93L9 7z'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 24 20',
      size: [16, 13.33],
      children: (
        <path
          fillRule='evenodd'
          d='M2 18.55 12.14 1 22.27 18.55zm10.14-11.84L6.95 15.7h10.37z'
        />
      ),
    },
    dasharray: defaultDasharrays[3],
  },
  chain: {
    fill: {
      viewBox: '0 0 26 24',
      children: (
        <path
          fillRule='evenodd'
          d='m17.58 4 4 6.93H26v2h-4.42l-4 6.93H8.42l-4-6.93H0v-2h4.42l4-6.93zM6.15 11.93l3.43 5.93h6.84l3.42-5.93L16.42 6H9.58z'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 24 24',
      size: [16, 16],
      children: (
        <path
          fillRule='evenodd'
          d='M20.87 10.43H24v3h-3.13l-4 6.93H7.13l-4-6.93H0v-3h3.13l4-6.93h9.74zM5.73 11.93l3.14 5.43h6.26l3.14-5.43L15.13 6.5H8.87z'
        />
      ),
    },
    dasharray: defaultDasharrays[4],
  },
  squama: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <path d='M10.94 10.63c2.75-2.75 2.75-7.2 0-9.94L1 10.63c2.75 2.74 7.2 2.74 9.94 0' />
      ),
    },
    symbol: {
      viewBox: '0 0 22 22',
      size: [16, 16],
      children: (
        <path d='M15.14 16c3.91-3.91 3.91-10.24 0-14.14L1 16c3.91 3.91 10.24 3.91 14.14 0z' />
      ),
    },
    dasharray: defaultDasharrays[5],
  },
  romb: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <path d='M16 9 9 2 2 9l7 7 7-7Z' />
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [16, 15.24],
      children: (
        <path d='M20 10 10 0 0 10l10 10 10-10Z' />
      ),
    },
    dasharray: defaultDasharrays[1],
  },
  zigzagVertical: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <path d='M5.44 12H2.58L0 9.48v-2.8zM12 5.5l-.61.62.61.6v2.8L8.55 6.13 12 2.65zM5.46 0 0 5.53V2.68L2.65 0z' />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path d='M13.56 0 8.24 5.31 15.98 13.05 8.71 20H4.37L11.69 13 4 5.31 9.31 0z' />
      ),
    },
    dasharray: defaultDasharrays[7],
  },
  triangleDownOutline: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <path
          fillRule='evenodd'
          d='M15.86 3H2l6.93 12zM5.46 5h6.93l-3.46 6z'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 24 20',
      size: [16, 13.33],
      children: (
        <path
          fillRule='evenodd'
          d='M22.27 1 12.14 18.55 2 1zm-10.14 11.84 5.18-8.98H6.95z'
        />
      ),
    },
    dasharray: defaultDasharrays[0],
  },
  crosses: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <path d='M9 5.76a1 1 0 1 1 2 0V9h3.24a1 1 0 0 1 0 2H11v3.24a1 1 0 0 1-2 0V11H5.76a1 1 0 1 1 0-2H9z' />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path d='M8.57 2.93a1.5 1.5 0 1 1 3 0v5.57h5.57a1.5 1.5 0 0 1 0 3h-5.57v5.57a1.5 1.5 0 0 1-3 0v-5.57H3a1.5 1.5 0 0 1 0-3h5.57z' />
      ),
    },
    dasharray: defaultDasharrays[1],
  },
  linesDoubleHorizontal: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <path d='M16 14H0v-2h16zm0-6H0V6h16z' />
      ),
    },
    symbol: {
      viewBox: '0 0 16 16',
      size: [16, 16],
      children: (
        <path d='M15 11v2H2v-2zm0-5v2H2V6z' />
      ),
    },
    dasharray: defaultDasharrays[2],
  },
  waveVertical: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <path d='M7.72 0c.75.82 1.16 1.83 1.16 2.88 0 1.52-.85 2.95-2.37 3.85-.98.6-1.38 1.42-1.38 2.14s.4 1.55 1.38 2.15q.71.42 1.21.98h-3.2c-.9-.86-1.4-1.97-1.4-3.12 0-1.53.85-2.96 2.37-3.86.98-.6 1.38-1.42 1.38-2.14S6.48 1.33 5.5.73Q4.95.41 4.52 0z' />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path d='M13.5 6.5c0 1.84-.94 3.62-2.68 4.75-.93.61-1.32 1.47-1.32 2.25s.39 1.63 1.32 2.25C12.4 16.78 13.32 18.34 13.47 20h-3.03c-.13-.63-.53-1.26-1.27-1.75C7.44 17.12 6.5 15.34 6.5 13.5s.94-3.62 2.67-4.75C10.11 8.13 10.5 7.28 10.5 6.5s-.39-1.63-1.32-2.25C7.6 3.22 6.68 1.66 6.53 0h3.03c.13.63.53 1.26 1.27 1.75C12.56 2.88 13.5 4.66 13.5 6.5' />
      ),
    },
    dasharray: defaultDasharrays[3],
  },
  squareOutline: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <path
          fillRule='evenodd'
          d='M14 4V14H4V4H14ZM6 12H12V6H6V12Z'
        />
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [16, 16],
      children: (
        <path fillRule='evenodd' d='M18 2v16H2V2zm-13 13h10V5H5z' />
      ),
    },
    dasharray: defaultDasharrays[4],
  },
  triangle: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <path d='m8 2 5.2 9H2.8z' />
      ),
    },
    symbol: {
      viewBox: '0 0 24 20',
      size: [16, 13.33],
      children: (
        <path d='M12.14 1 2 18.55h20.27z' />
      ),
    },
    dasharray: defaultDasharrays[5],
  },
  crescent: {
    fill: {
      viewBox: '0 0 24 24',
      children: (
        <path d='M17.07 13.43c.15-.29-.14-.59-.45-.5-3.84 1.03-7.79-1.25-8.82-5.1-.48-1.8-.23-3.62.56-5.16.17-.34-.1-.76-.46-.66-4.27 1.15-6.8 5.53-5.66 9.8s5.53 6.8 9.8 5.66c2.26-.6 4.03-2.12 5.03-4.04' />
      ),
    },
    symbol: {
      viewBox: '0 0 24 24',
      size: [16, 16],
      children: (
        <path d='M20.38 18.75c.27-.29.02-.75-.38-.75-4.97 0-9-4.03-9-9 0-2.33.89-4.46 2.34-6.06.32-.35.13-.94-.34-.94C7.48 2 3 6.48 3 12s4.48 10 10 10c2.92 0 5.55-1.25 7.38-3.25z' />
      ),
    },
    dasharray: defaultDasharrays[6],
  },
  starSmall: {
    fill: {
      viewBox: '0 0 22 22',
      children: (
        <path d='M9.17 3.9c.26-.81 1.4-.81 1.66 0l1.14 3.57c.08.27.3.48.56.56l3.57 1.14c.81.26.81 1.4 0 1.66l-3.57 1.14c-.26.08-.48.3-.56.56l-1.14 3.57c-.26.81-1.4.81-1.66 0l-1.14-3.57c-.08-.26-.3-.48-.56-.56L3.9 10.83c-.81-.26-.81-1.4 0-1.66l3.57-1.14c.27-.08.48-.3.56-.56z' />
      ),
    },
    symbol: {
      viewBox: '0 0 24 24',
      size: [16, 16],
      children: (
        <path d='M11.06 2.53c.32-.87 1.56-.87 1.88 0l2.14 5.8a1 1 0 0 0 .59.59l5.8 2.14c.87.32.87 1.56 0 1.88l-5.8 2.14a1 1 0 0 0-.59.59l-2.14 5.8c-.32.87-1.56.87-1.88 0l-2.14-5.8a1 1 0 0 0-.59-.59l-5.8-2.14c-.87-.32-.87-1.56 0-1.88l5.8-2.14a1 1 0 0 0 .59-.59z' />
      ),
    },
    dasharray: defaultDasharrays[0],
  },
} satisfies Record<string, Pattern>;

const defaultPatternsList = Object.values(defaultPatterns);
/**
 * Patterns list cache is a weak map based
 * cache that allows simmilar colors (when color is used as a pattern key)
 * to be rendered with the same pattern.
 */
const patternsKeysOrderCache = new WeakMap();
patternsKeysOrderCache.set(defaultPatternsList, []);
const resolvePatternIndex = (patternKey: string, patterns: Pattern[]) => {
  if (typeof patterns !== 'object') return 0;
  if (!patternsKeysOrderCache.has(patterns)) {
    patternsKeysOrderCache.set(patterns, []);
  }
  const patternsKeysCachedList = patternsKeysOrderCache.get(patterns);
  let index = patternsKeysCachedList.indexOf(patternKey);
  if (index === -1) {
    index = patternsKeysCachedList.length;
    patternsKeysCachedList.push(patternKey);
  }
  return index;
};

export type PatternsConfig = true | keyof typeof defaultPatterns | Pattern | Pattern[];

const resolvePattern = (patternKey: string, patternsConfig: PatternsConfig = true): Pattern => {
  if (typeof patternsConfig === 'object' && patternsConfig && !Array.isArray(patternsConfig))
    return patternsConfig;
  if (typeof patternsConfig === 'string') {
    if (!defaultPatterns[patternsConfig]) {
      const available = Object.keys(defaultPatterns).join(', ');
      throw new Error(
        `No default pattern ${patternsConfig} found. Options ${available} are available. If you want to use cusom pattern, pass it as object.`,
      );
    }
    return defaultPatterns[patternsConfig];
  }
  const patterns = patternsConfig === true ? defaultPatternsList : patternsConfig;

  let patternIndex = resolvePatternIndex(patternKey, patterns);
  patternIndex = patternIndex % patterns.length;
  return patterns[patternIndex];
};

export const DefaultStrokePattern = (props: { id: string; halfsize?: boolean }) => {
  return (
    <defs>
      <pattern
        id={`${props.id}-pattern`}
        width='6'
        height='6'
        patternUnits='userSpaceOnUse'
        patternTransform='rotate(-117)'
      >
        <rect width='6' height='6' fill='#fff' opacity={0.6}></rect>
        <line x1='0' y1='0' x2='0' y2='8' stroke='#fff' strokeWidth='6'></line>
      </pattern>

      <mask id={props.id}>
        <rect width='100%' height='100%' x='-50%' y={props.halfsize ? '-100%' : '-50%'} fill={`url(#${props.id}-pattern)`} />
      </mask>
    </defs>
  );
};
export const LightStrokePattern = (props: { id: string }) => {
  return (
    <defs>
      <pattern
        id={props.id}
        width='4'
        height='4'
        patternUnits='userSpaceOnUse'
        patternTransform='rotate(40)'
      >
        <line x1='3' y1='0' x2='3' y2='4' stroke='white' strokeWidth='2' />
      </pattern>
    </defs>
  );
};
export const StrokeMask = (props: { id: string; color: string }) => {
  return (
    <defs>
      <LightStrokePattern id={`${props.id}-stroke`} />

      <mask id={props.id}>
        <rect width='100%' height='100%' fill={props.color} />
        <rect width='100%' height='100%' fill={`url(#${props.id}-stroke)`} />
      </mask>
    </defs>
  );
};
export const ForecastGradient = (props: { id: string; color: string }) => {
  return (
    <defs>
      <linearGradient id={props.id} x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop offset='0%' stopColor={props.color} stopOpacity='0.4' />
        <stop offset='100%' stopColor='#fff' stopOpacity='0.1' />
      </linearGradient>
    </defs>
  );
};
export const PotentialGradient = (props: { id: string; type?: 'line' | 'area' }) => {
  const SLinearGradient = 'linearGradient';
  const SStopFrom = 'stop';
  const SStopTo = 'stop';
  const isLine = props.type === 'line';
  const isArea = props.type === 'area';

  let gradientTransform = 'rotate(-90 0.5 0.5)';

  if (isLine) {
    gradientTransform = '';
  } else if (isArea) {
    gradientTransform = 'rotate(-30 0.5 0.5)';
  }

  return sstyled(style)(
    <defs>
      <SLinearGradient
        id={props.id}
        x1='0%'
        y1='0%'
        x2={isLine ? '100%' : '0'}
        y2={isLine ? '0' : '100%'}
        gradientTransform={gradientTransform}
      >
        <SStopFrom offset='0%' stopOpacity={1} />
        <SStopTo offset='100%' stopOpacity={isArea ? 0 : 1} />
      </SLinearGradient>
    </defs>,
  );
};

export const PATTERN_FILL_TILE_SCALE = 0.5;

const getPatternFillTileSize = (viewBox: string): [number, number] => {
  const parts = viewBox.trim().split(/\s+/).map(Number);
  return [(parts[2] || 0) * PATTERN_FILL_TILE_SCALE, (parts[3] || 0) * PATTERN_FILL_TILE_SCALE];
};

export const PatternFill = ({
  id,
  color,
  patternKey,
  patterns = defaultPatternsList,
}: { id: string; color: string; patternKey: string; patterns?: PatternsConfig }) => {
  const DefaultPattern = React.useMemo(() => {
    const { fill } = resolvePattern(patternKey, patterns);
    const [tileWidth, tileHeight] = getPatternFillTileSize(fill.viewBox);
    return () => (
      <pattern
        id={id}
        // eslint-disable-next-line react/no-unknown-property
        fill={color}
        x='0'
        y='0'
        width={tileWidth}
        height={tileHeight}
        viewBox={fill.viewBox}
        patternUnits='userSpaceOnUse'
      >
        {fill.children}
      </pattern>
    );
  }, [patternKey, id, color, patterns]);

  return <DefaultPattern />;
};

export const getPatternSymbolSize = ({
  patternKey,
  patterns,
}: {
  patternKey: string;
  patterns?: PatternsConfig;
}): [width: number, height: number] => {
  const patternData = resolvePattern(patternKey, patterns);
  if (!patternData?.symbol?.size) return [10, 10];

  return [patternData.symbol.size[0], patternData.symbol.size[1]];
};

export const PatternSymbol: React.FC<
  {
    color: string;
    patternKey: string;
    patterns?: PatternsConfig;
  } & React.ComponentProps<'svg'>
> = ({ color, patternKey, patterns, ...props }) => {
  const DefaultSymbol = React.useMemo(() => {
    const patternData = resolvePattern(patternKey, patterns);
    const children = patternData?.symbol.children;
    const viewBox = patternData?.symbol.viewBox;
    const width = patternData?.symbol.size[0];
    const height = patternData?.symbol.size[1];
    return (props: React.ComponentProps<'svg'>) => (
      <svg
        fill={color}
        x='0'
        y='0'
        {...propsForElement(props, 'svg')}
        width={width}
        height={height}
        viewBox={viewBox}
        aria-hidden={true}
      >
        {children}
      </svg>
    );
  }, [patternKey, color, patterns]);

  return <DefaultSymbol {...props} />;
};

export const resolvePatternDasharray = (
  patternKey: string,
  patterns: PatternsConfig,
): string | undefined => {
  const pattern = resolvePattern(patternKey, patterns);
  return pattern?.dasharray;
};
