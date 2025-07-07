import figma from '@figma/code-connect/react';
import Badge from '@semcore/badge';
import React from 'react';

figma.connect(
  Badge,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/%E2%9D%96-Core-Components-(Refactoring)?node-id=10059-44175&t=hkjybGSILqRb6bQU-4',
  {
    props: {
      label: figma.textContent('↳ text'),
      bg: figma.enum('type', {
        '🔵 admin': figma.boolean('invert', { false: 'blue-400', true: 'white' }),
        '🔴 alpha': figma.boolean('invert', { false: 'red-400', true: 'white' }),
        '🟠 beta': figma.boolean('invert', { false: 'orange-400', true: 'white' }),
        '🟢 new': figma.boolean('invert', { false: 'green-400', true: 'white' }),
        '🟣 for you': figma.boolean('invert', { false: 'violet-400', true: 'white' }),
        '⚫️ soon': figma.boolean('invert', { false: 'gray-400', true: 'white' }),
      }),
      color: figma.boolean('invert', {
        true: 'text-primary',
      }),
    },
    example: ({ label, bg, color }) => <Badge bg={bg} color={color}>{label}</Badge>,
  },
);
