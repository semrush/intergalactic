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
      viewBox: '0 0 21 21',
      size: [17.14, 16.02],
      children: (
        <path d='m20.12 1.28-9.8 9.8L.12.88v8.49l10.2 10.2 9.8-9.8z' />
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
      viewBox: '0 0 10 10',
      size: [14, 14],
      children: (
        <path
          fillRule='evenodd'
          d='M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM0 5a5 5 0 1 1 10 0A5 5 0 0 1 0 5Z'
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
      viewBox: '0 0 17 16',
      size: [16, 16],
      children: (
        <path d='M9.12 2h4v12h-4zm-5 0h4v12h-4z' />
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
      viewBox: '0 0 21 20',
      size: [16.14, 14],
      children: (
        <path d='m19.54 12.46-9.42-9.42-9.41 9.42 4.5 4.5 4.91-4.91 4.92 4.91z' />
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
      viewBox: '0 0 25 24',
      size: [16.61, 16.61],
      children: (
        <path
          fillRule='evenodd'
          d='m12.54 0 11.53 11.54-11.53 11.53L1 11.54zM8.07 11.54 12.54 16 17 11.54l-4.46-4.47z'
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
      viewBox: '0 0 21 20',
      size: [18, 18],
      children: (
        <path d='M17 3H3v14h14V3Z' />
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
      viewBox: '0 0 21 20',
      size: [17.14, 14],
      children: (
        <path d='m20.12 6.46-.03-.02-1.43 2.38c-.95 1.6-2.19 2.13-3.17 2.13-.99 0-2.22-.54-3.18-2.13C10.5 5.78 7.55 4 4.37 4c-1.5 0-2.95.4-4.25 1.14v8.34l1.08-1.8c.95-1.59 2.19-2.12 3.17-2.12.99 0 2.22.53 3.18 2.12 1.82 3.05 4.76 4.83 7.94 4.83 1.65 0 3.23-.48 4.63-1.37z' />
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
      viewBox: '4 5 25.12 21.755',
      size: [16, 14],
      children: (
        <path d='M16.56 26.76 29.12 5H4z' />
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
      viewBox: '0 0 33 32',
      size: [16.41, 15.66],
      children: (
        <path d='M15.05.93c.3-.92 1.6-.92 1.9 0l2.87 8.82a1 1 0 0 0 .95.69h9.27c.97 0 1.37 1.24.59 1.8l-7.5 5.46a1 1 0 0 0-.37 1.12l2.87 8.82c.3.92-.76 1.68-1.54 1.11l-7.5-5.45a1 1 0 0 0-1.18 0l-7.5 5.45c-.78.57-1.84-.2-1.54-1.11l2.87-8.82a1 1 0 0 0-.37-1.12l-7.5-5.45c-.78-.57-.38-1.81.59-1.81h9.27a1 1 0 0 0 .95-.7z' />
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
      viewBox: '0 0 21 20',
      size: [16.95, 16.95],
      children: (
        <path
          fillRule='evenodd'
          d='m10.12.11 8.56 4.95v9.88l-8.56 4.95-8.56-4.95V5.06zM6.56 7.94v4.12l3.56 2.05 3.57-2.05V7.94L10.12 5.9z'
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
      size: [18, 18],
      children: (
        <path
          fillRule='evenodd'
          d='M3.68 3.68a2.33 2.33 0 0 1 3.3 0L10 6.7l3.02-3.02a2.33 2.33 0 1 1 3.3 3.3L13.3 10l3.02 3.02a2.33 2.33 0 0 1-3.3 3.3L10 13.3l-3.02 3.02a2.33 2.33 0 0 1-3.3-3.3L6.7 10 3.68 6.98a2.33 2.33 0 0 1 0-3.3'
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
      viewBox: '2 4 27.98 24.231',
      size: [16, 14],
      children: (
        <path
          fillRule='evenodd'
          d='m15.99 4 13.99 24.23H2zm0 12.92-2.8 4.85h5.6z'
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
      viewBox: '0 0 25 24',
      size: [17.28, 17.28],
      children: (
        <path
          fillRule='evenodd'
          d='M6.56 2.57h10.88l4 6.93h2.68v5h-2.68l-4 6.93H6.56l-4-6.93H.12v-5h2.44zM6.89 12l2.55 4.43h5.12L17.1 12l-2.55-4.43H9.44z'
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
      viewBox: '0 0 18 18',
      size: [13.66, 13.66],
      children: (
        <path d='M12.31 12a8 8 0 0 0 0-11.31L1 12a8 8 0 0 0 11.31 0' />
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
      viewBox: '0 0 20 20',
      size: [14, 14],
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
      viewBox: '0 0 21 20',
      size: [15.85, 17.14],
      children: (
        <path d='m1.76 10 10-10h8.48l-10 10 10 10h-8.48z' />
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
      viewBox: '2 3.769 27.98 24.231',
      size: [16, 14],
      children: (
        <path
          fillRule='evenodd'
          d='M15.99 28 29.98 3.77H2zm0-12.92-2.8-4.85h5.6z'
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
      viewBox: '0 0 16 16',
      size: [18, 18],
      children: (
        <path d='M8 0a2.3 2.3 0 0 0-2.29 2.29V5.7H2.3a2.29 2.29 0 0 0 0 4.58h3.4v3.42a2.29 2.29 0 1 0 4.58 0v-3.4h3.42a2.29 2.29 0 1 0 0-4.58h-3.4V2.3A2.3 2.3 0 0 0 8 0' />
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
      viewBox: '0 0 17 16',
      size: [16, 16],
      children: (
        <path d='M2 8V4h12v4H2ZM2 13V9h12v4H2Z' />
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
      viewBox: '0 0 21 20',
      size: [16, 17.14],
      children: (
        <path d='M8.82 1.34 6.6 0h8.62a8.6 8.6 0 0 1 1.29 4.51c0 3.18-1.78 6.12-4.83 7.94-1.59.96-2.12 2.2-2.12 3.18s.53 2.22 2.12 3.17l2 1.2H5.2A8.6 8.6 0 0 1 4 15.63c0-3.19 1.78-6.12 4.82-7.94 1.6-.96 2.13-2.2 2.13-3.18S10.4 2.3 8.82 1.34' />
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
      viewBox: '0 0 21 20',
      size: [18, 18],
      children: (
        <path fillRule='evenodd' d='M1.5 1.5h17v17h-17v-17Zm5 5v7h7v-7h-7Z' />
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
      viewBox: '3 5 25.32 21.928',
      size: [16, 14],
      children: (
        <path d='m15.66 5 12.66 21.93H3z' />
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
      viewBox: '0 0 21 20',
      size: [14.99, 17.14],
      children: (
        <path d='M18.5 16.75c.27-.3.02-.75-.38-.75A9 9 0 0 1 11.47.94c.32-.35.13-.94-.35-.94-5.52 0-10 4.48-10 10s4.48 10 10 10a10 10 0 0 0 7.38-3.25' />
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
      viewBox: '0 0 33 32',
      size: [16, 16],
      children: (
        <path d='M15.06 2.53c.32-.87 1.56-.87 1.88 0l3.22 8.72a1 1 0 0 0 .6.59l8.7 3.22c.88.32.88 1.56 0 1.88l-8.7 3.22a1 1 0 0 0-.6.6l-3.22 8.7c-.32.88-1.56.88-1.88 0l-3.22-8.7a1 1 0 0 0-.6-.6l-8.7-3.22c-.88-.32-.88-1.56 0-1.88l8.7-3.22a1 1 0 0 0 .6-.6z' />
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
  scale = 1,
}: {
  patternKey: string;
  patterns?: PatternsConfig;
  scale?: number;
}): [width: number, height: number] => {
  const patternData = resolvePattern(patternKey, patterns);
  if (!patternData?.symbol?.size) return [10 * scale, 10 * scale];

  return [patternData.symbol.size[0] * scale, patternData.symbol.size[1] * scale];
};

export const PatternSymbol: React.FC<
  {
    color: string;
    patternKey: string;
    patterns?: PatternsConfig;
    scale?: number;
    sizeScale?: number;
  } & React.ComponentProps<'svg'>
> = ({ color, patternKey, patterns, scale = 1, sizeScale, ...props }) => {
  const DefaultSymbol = React.useMemo(() => {
    const patternData = resolvePattern(patternKey, patterns);
    const children = patternData?.symbol.children;
    const viewBox = patternData?.symbol.viewBox;
    const resolvedScale =
      typeof sizeScale === 'number' && Number.isFinite(sizeScale)
        ? sizeScale
        : typeof scale === 'number' && Number.isFinite(scale)
          ? scale
          : 1;
    const width = patternData?.symbol.size[0] * resolvedScale;
    const height = patternData?.symbol.size[1] * resolvedScale;
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
  }, [patternKey, color, patterns, scale, sizeScale]);

  return <DefaultSymbol {...props} />;
};

export const resolvePatternDasharray = (
  patternKey: string,
  patterns: PatternsConfig,
): string | undefined => {
  const pattern = resolvePattern(patternKey, patterns);
  return pattern?.dasharray;
};
