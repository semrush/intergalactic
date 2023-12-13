import React from 'react';

const svg = {
  chevron: {
    pattern: {
      viewBox: '0 0 10 10',
      children: <path d='M0 0 l5 3 l5 -3 v5 l-5 3 l-5 -3 z' />,
    },
    symbol: {
      viewBox: '-1 -1 12 12',
      children: <path d='M0 0 l5 3 l5 -3 v5 l-5 3 l-5 -3 z' />,
    },
  },
  checkerBoard: {
    pattern: {
      viewBox: '0 0 20 20',
      children: (
        <>
          <rect x='0' width='10' height='10' y='0' />
          <rect x='10' width='10' height='10' y='10' />
        </>
      ),
    },
    symbol: {
      viewBox: '-1 -1 12 12',
      children: (
        <>
          <rect x='0' width='10' height='10' y='0' />
        </>
      ),
    },
  },
};

const defaultPatternsList = Object.values(svg);
const patternsSync = new WeakMap();
patternsSync.set(defaultPatternsList, []);

const getPatternByKey = (patternKey, patternsConfig = true) => {
  const patterns = patternsConfig === true ? defaultPatternsList : patternsConfig;
  if (!patternsSync.has(patterns)) {
    patternsSync.set(patterns, []);
  }
  const patternsSyncList = patternsSync.get(patterns);
  let index = patternsSyncList.indexOf(patternKey);
  if (index === -1) {
    index = patternKey.length;
    patternsSyncList.push(patternKey);
  }
  const defaultPatternIndex = index % defaultPatternsList.length;
  return defaultPatternsList[defaultPatternIndex];
};
export const Pattern = ({ id, color, patternKey, patterns = defaultPatternsList }) => {
  const DefaultPattern = React.useMemo(() => {
    const { pattern } = getPatternByKey(patternKey, patterns);
    // return () => pattern.children;
    return () => (
      <pattern
        id={id}
        fill={color}
        x='0'
        y='0'
        width='10'
        height='10'
        viewBox={pattern.viewBox}
        patternUnits='userSpaceOnUse'
      >
        {pattern.children}
      </pattern>
    );
  }, [patternKey]);

  return <DefaultPattern id={id} color={color} />;
};

export const PatternSymbol = ({
  color,
  patternKey,
  solidCircle,
  patterns = defaultPatternsList,
  ...props
}) => {
  const DefaultSymbol = React.useMemo(() => {
    let children = <circle cx='5' cy='5' r='5' />;
    let viewBox = '0 0 10 10';
    if (!solidCircle) {
      const patternData = getPatternByKey(patternKey, patterns);
      children = patternData.symbol.children;
      viewBox = patternData.symbol.viewBox;
    }
    return (props) => (
      <svg
        fill={color}
        x='0'
        y='0'
        width='10'
        height='10'
        viewBox={viewBox}
        strokeWidth='1'
        {...props}
      >
        {children}
      </svg>
    );
  }, [patternKey, solidCircle]);

  return <DefaultSymbol {...props} />;
};
export const getPatternSymbolSize = ({ patternKey, patterns }) => [10, 10];

export const SolidPattern = ({ id }) => {
  return (
    <pattern id={id} x='0' y='0' width='10' height='10' patternUnits='userSpaceOnUse'>
      <rect x='0' width='10' height='10' y='0' fill='currentColor' />
    </pattern>
  );
};
