import React from 'react';
import propsForElement from '@semcore/core/lib/utils/propsForElement';

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
  starSmall: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <>
          <path d='M9.062 2.535c.322-.871 1.554-.871 1.876 0l1.603 4.333a1 1 0 0 0 .591.59l4.333 1.604c.871.322.871 1.554 0 1.876l-4.333 1.603a1 1 0 0 0-.59.591l-1.604 4.333c-.322.871-1.554.871-1.876 0L7.46 13.132a1 1 0 0 0-.591-.59l-4.334-1.604c-.87-.322-.87-1.554 0-1.876L6.868 7.46a1 1 0 0 0 .59-.591l1.604-4.333Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 33 32',
      size: [16, 16],
      children: (
        <>
          <path d='M15.062 2.534c.322-.87 1.554-.87 1.876 0l3.224 8.713a1 1 0 0 0 .59.591l8.713 3.224c.871.322.871 1.554 0 1.876l-8.712 3.224a1 1 0 0 0-.591.59l-3.224 8.713c-.322.871-1.554.871-1.876 0l-3.224-8.712a1 1 0 0 0-.59-.591l-8.713-3.224c-.871-.322-.871-1.554 0-1.876l8.712-3.224a1 1 0 0 0 .591-.59l3.224-8.713Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[0],
  },
  romb: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <>
          <path d='M19.828 10 10 .172.172 10 10 19.828 19.828 10Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [14, 14],
      children: (
        <>
          <path d='M20 10 10 0 0 10l10 10 10-10Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[1],
  },
  circleOutline: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 10 10',
      size: [14, 14],
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM0 5a5 5 0 1 1 10 0A5 5 0 0 1 0 5Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    dasharray: defaultDasharrays[2],
  },
  triangleDown: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <>
          <path d='M7.99998 14L14.0622 3.5H1.93781L7.99998 14Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 33 32',
      size: [16, 12],
      children: (
        <>
          <path d='M16.56 26.755 29.12 5H4l12.56 21.755Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[3],
  },
  rombOutline: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10 0.17157L19.8284 10L10 19.8284L0.17157 10L10 0.17157ZM5.82842 10L10 14.1716L14.1716 10L10 5.82842L5.82842 10Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 25 24',
      size: [16.61, 16.61],
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M12.536 0 24.07 11.536 12.535 23.07 1 11.535 12.536 0ZM8.07 11.536 12.536 16 17 11.536 12.536 7.07 8.07 11.536Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    dasharray: defaultDasharrays[4],
  },
  square: {
    fill: {
      viewBox: '0 0 28 28',
      children: (
        <>
          <path d='M18 2H2v16h16V2Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [18, 18],
      children: (
        <>
          <path d='M17 3H3v14h14V3Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[5],
  },
  trees: {
    fill: {
      viewBox: '0 0 21 20',
      children: (
        <>
          <path d='m19.536 12.456-9.415-9.415-9.415 9.415L5.21 16.96l4.912-4.913 4.913 4.913 4.502-4.503Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [16.14, 14],
      children: (
        <>
          <path d='m19.536 12.456-9.415-9.415-9.415 9.415L5.21 16.96l4.912-4.913 4.913 4.913 4.502-4.503Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[6],
  },
  wave: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3 5.5C2.4683 5.5 1.80116 5.78854 1.28624 6.64674L0.514495 7.93298L-2.05798 6.3895L-1.28624 5.10326C-0.30116 3.46146 1.2817 2.5 3 2.5C4.7183 2.5 6.30116 3.46146 7.28624 5.10326C7.80116 5.96146 8.4683 6.25 9 6.25C9.5317 6.25 10.1988 5.96146 10.7138 5.10326L11.4855 3.81702L14.058 5.3605L13.2862 6.64674C12.3012 8.28854 10.7183 9.25 9 9.25C7.2817 9.25 5.69884 8.28854 4.71376 6.64674C4.19884 5.78854 3.5317 5.5 3 5.5Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [17.14, 14],
      children: (
        <>
          <path d='m20.121 6.457-.027-.017-1.43 2.383c-.954 1.59-2.19 2.125-3.176 2.125-.985 0-2.22-.534-3.175-2.125C10.488 5.781 7.555 4 4.372 4c-1.503 0-2.95.397-4.25 1.136v8.339l1.074-1.792c.954-1.59 2.19-2.125 3.176-2.125.985 0 2.22.535 3.175 2.125 1.825 3.042 4.758 4.823 7.942 4.823 1.651 0 3.235-.479 4.632-1.365V6.457Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[7],
  },
  star: {
    fill: {
      viewBox: '0 0 21 20',
      children: (
        <>
          <path d='M9.17 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .951.69h3.461c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L3.1 8.72c-.784-.57-.381-1.81.587-1.81H7.15a1 1 0 0 0 .95-.69l1.07-3.292Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 33 32',
      size: [16.41, 15.66],
      children: (
        <>
          <path d='M15.049.927c.3-.921 1.603-.921 1.902 0l2.866 8.82a1 1 0 0 0 .95.69h9.274c.97 0 1.372 1.24.588 1.81l-7.502 5.45a1 1 0 0 0-.364 1.119l2.866 8.82c.3.92-.755 1.687-1.539 1.117l-7.502-5.45a1 1 0 0 0-1.176 0l-7.502 5.45c-.784.57-1.838-.196-1.54-1.118l2.867-8.82a1 1 0 0 0-.364-1.117l-7.502-5.451c-.784-.57-.381-1.81.588-1.81h9.273a1 1 0 0 0 .951-.69L15.05.927Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[0],
  },
  cogwheel: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.0622 1L18.1244 5.6547V14.9641L10.0622 19.6188L2 14.9641V5.6547L10.0622 1ZM6 7.9641V12.6547L10.0622 15L14.1244 12.6547V7.9641L10.0622 5.6188L6 7.9641Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [16.95, 16.95],
      children: (
        <>
          <path
            fillRule='evenodd'
            d='m10.121.113 8.562 4.944v9.886l-8.562 4.944-8.562-4.944V5.057L10.121.113ZM6.56 7.943v4.114l3.562 2.056 3.563-2.056V7.943L10.12 5.887 6.56 7.943Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    dasharray: defaultDasharrays[1],
  },
  crossesDiagonal: {
    fill: {
      viewBox: '0 0 20 20',
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M3.683 3.683a2.333 2.333 0 0 1 3.3 0L10 6.7l3.017-3.017a2.333 2.333 0 1 1 3.3 3.3L13.3 10l3.017 3.017a2.333 2.333 0 0 1-3.3 3.3L10 13.3l-3.017 3.017a2.333 2.333 0 0 1-3.3-3.3L6.7 10 3.683 6.983a2.333 2.333 0 0 1 0-3.3Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 20 20',
      size: [18, 18],
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M3.683 3.683a2.333 2.333 0 0 1 3.3 0L10 6.7l3.017-3.017a2.333 2.333 0 1 1 3.3 3.3L13.3 10l3.017 3.017a2.333 2.333 0 0 1-3.3 3.3L10 13.3l-3.017 3.017a2.333 2.333 0 0 1-3.3-3.3L6.7 10 3.683 6.983a2.333 2.333 0 0 1 0-3.3Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    dasharray: defaultDasharrays[2],
  },
  triangleOutline: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.99998 2L16.7942 15.5H1.20575L8.99998 2ZM6.4019 12.5H11.5981L8.99998 8L6.4019 12.5Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 33 32',
      size: [18, 18],
      children: (
        <>
          <path
            fillRule='evenodd'
            d='m15.99 4 13.99 24.231H2L15.99 4Zm0 12.923-2.798 4.847h5.596l-2.798-4.847Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    dasharray: defaultDasharrays[3],
  },
  chain: {
    fill: {
      viewBox: '0 0 24 14',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.8453 -2H17.1547L21.1547 4.9282H26V8.9282H21.1547L17.1547 15.8564H6.8453L2.8453 8.9282H-2V4.9282H2.8453L6.8453 -2ZM6.3094 6.9282L9.1547 11.8564H14.8453L17.6906 6.9282L14.8453 2H9.1547L6.3094 6.9282Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 25 24',
      size: [17.28, 17.28],
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M6.557 2.572h10.886l4 6.928h2.678v5h-2.678l-4 6.928H6.557l-4-6.928H.12v-5h2.436l4-6.928ZM6.887 12l2.556 4.428h5.114L17.113 12l-2.556-4.428H9.443L6.887 12Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    dasharray: defaultDasharrays[4],
  },
  squama: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <>
          <path d='M12.314 12a8 8 0 0 0 0-11.314L1 12a8 8 0 0 0 11.314 0Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 18 18',
      size: [13.66, 13.66],
      children: (
        <>
          <path d='M12.314 12a8 8 0 0 0 0-11.314L1 12a8 8 0 0 0 11.314 0Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[5],
  },
  linesDouble: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <>
          <path d='M11 0H14V16H11V0Z' />
          <path d='M5 0H8V16H5V0Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 17 16',
      size: [16, 16],
      children: (
        <>
          <path d='M9.121 2h4v12h-4V2ZM4.121 2h4v12h-4V2Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[6],
  },
  zigzagVertical: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path d='M12 1.94 7.84 6.151l4.16 4.06V1.94ZM0 10.18V1.972L1.948 0h4.217L.128 6.112 6.16 12H1.865L0 10.18Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [15.85, 17.14],
      children: (
        <>
          <path d='m1.757 10 10-10h8.486l-10 10 10 10h-8.486l-10-10Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[7],
  },
  triangleDownOutline: {
    fill: {
      viewBox: '0 0 18 18',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.99998 17L16.7942 3.5H1.20575L8.99998 17ZM6.4019 6.5H11.5981L8.99998 11L6.4019 6.5Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 33 32',
      size: [16, 13.22],
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M15.99 28 29.98 3.769H2L15.99 28Zm0-12.923-2.798-4.847h5.596l-2.798 4.847Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    dasharray: defaultDasharrays[0],
  },
  crosses: {
    fill: {
      viewBox: '0 0 22 22',
      children: (
        <>
          <path d='M8 0a2.286 2.286 0 0 0-2.286 2.286v3.428H2.286a2.286 2.286 0 0 0 0 4.572h3.428v3.428a2.286 2.286 0 1 0 4.572 0v-3.428h3.428a2.286 2.286 0 1 0 0-4.572h-3.428V2.286A2.286 2.286 0 0 0 8 0Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 16 16',
      size: [18, 18],
      children: (
        <>
          <path d='M8 0a2.286 2.286 0 0 0-2.286 2.286v3.428H2.286a2.286 2.286 0 0 0 0 4.572h3.428v3.428a2.286 2.286 0 1 0 4.572 0v-3.428h3.428a2.286 2.286 0 1 0 0-4.572h-3.428V2.286A2.286 2.286 0 0 0 8 0Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[1],
  },
  linesDoubleHorizontal: {
    fill: {
      viewBox: '0 0 16 16',
      children: (
        <>
          <path d='M16 11v3H0v-3h16ZM16 5v3H0V5h16Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 17 16',
      size: [16, 16],
      children: (
        <>
          <path d='M2 8V4h12v4H2ZM2 13V9h12v4H2Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[2],
  },
  waveVertical: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.625 8.875C5.625 9.4067 5.91354 10.0738 6.77174 10.5888L8.05798 11.3605L6.5145 13.933L5.22826 13.1612C3.58646 12.1762 2.625 10.5933 2.625 8.875C2.625 7.1567 3.58646 5.57384 5.22826 4.58876C6.08646 4.07384 6.375 3.4067 6.375 2.875C6.375 2.3433 6.08646 1.67616 5.22826 1.16124L3.94202 0.389496L5.4855 -2.18298L6.77174 -1.41124C8.41354 -0.42616 9.375 1.1567 9.375 2.875C9.375 4.5933 8.41354 6.17616 6.77174 7.16124C5.91354 7.67616 5.625 8.3433 5.625 8.875Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [16, 17.14],
      children: (
        <>
          <path d='M8.823 1.336 6.596 0h8.62a8.593 8.593 0 0 1 1.29 4.512c0 3.183-1.78 6.116-4.823 7.941-1.59.954-2.125 2.19-2.125 3.176 0 .985.535 2.22 2.125 3.175L13.677 20H5.206A8.578 8.578 0 0 1 4 15.629c0-3.184 1.781-6.117 4.823-7.942 1.59-.954 2.125-2.19 2.125-3.175 0-.986-.534-2.222-2.125-3.176Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[3],
  },
  squareOutline: {
    fill: {
      viewBox: '0 0 22 22',
      children: (
        <>
          <path
            fillRule='evenodd'
            d='M2 2h16v16H2V2Zm4.364 4.364v7.272h7.272V6.364H6.364Z'
            clipRule='evenodd'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [18, 18],
      children: (
        <>
          <path fillRule='evenodd' d='M1.5 1.5h17v17h-17v-17Zm5 5v7h7v-7h-7Z' clipRule='evenodd' />
        </>
      ),
    },
    dasharray: defaultDasharrays[4],
  },
  triangle: {
    fill: {
      viewBox: '0 0 21 20',
      children: (
        <>
          <path d='m10 2 8.66 15H1.34L10 2Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 33 32',
      size: [16, 16],
      children: (
        <>
          <path d='m15.66 5 12.66 21.928H3L15.66 5Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[5],
  },
  crescent: {
    fill: {
      viewBox: '0 0 21 20',
      children: (
        <>
          <path d='M18.501 16.748c.269-.293.018-.748-.38-.748A9 9 0 0 1 11.466.94c.32-.35.13-.941-.345-.941-5.523 0-10 4.477-10 10s4.477 10 10 10a9.974 9.974 0 0 0 7.38-3.252Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [14.99, 17.14],
      children: (
        <>
          <path d='M18.501 16.748c.269-.293.018-.748-.38-.748A9 9 0 0 1 11.466.94c.32-.35.13-.941-.345-.941-5.523 0-10 4.477-10 10s4.477 10 10 10a9.974 9.974 0 0 0 7.38-3.252Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[6],
  },
  zigzag: {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path d='M6 4.621 1.379 0H5.62L6 .379 6.379 0h4.242L6 4.621ZM0 10.621 1.379 12H5.62L0 6.379v4.242ZM6.379 12h4.242L12 10.621V6.38L6.379 12Z' />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 21',
      size: [17.14, 16.02],
      children: (
        <>
          <path d='m20.121 1.284-9.797 9.797L.121.88v8.485l10.203 10.203 9.797-9.797V1.284Z' />
        </>
      ),
    },
    dasharray: defaultDasharrays[7],
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
export const PatternFill = ({
  id,
  color,
  patternKey,
  patterns = defaultPatternsList,
}: { id: string; color: string; patternKey: string; patterns?: PatternsConfig }) => {
  const DefaultPattern = React.useMemo(() => {
    const { fill } = resolvePattern(patternKey, patterns);
    return () => (
      <pattern
        id={id}
        fill={color}
        x='0'
        y='0'
        width='12'
        height='12'
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

  return patternData.symbol.size;
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
        width={width}
        height={height}
        viewBox={viewBox}
        strokeWidth='1'
        {...propsForElement(props, 'svg')}
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
