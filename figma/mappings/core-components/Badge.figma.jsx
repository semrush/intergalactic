import figma from '@figma/code-connect/react';
import Badge from '@semcore/ui/badge';

figma.connect(
  Badge,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/%E2%9D%96-Core-Components-(Refactoring)?node-id=10059-44175',
  {
    props: {
      label: figma.textContent('↳ text'),
      type: figma.enum('type', {
        '🔵 admin': 'admin',
        '🔴 alpha': 'alpha',
        '🟠 beta': 'beta',
        '🟢 new': 'new',
        '⚫️ soon': 'soon',
      }),
      inverted: figma.boolean('inverted'),
    },
    example: ({ label, type, inverted }) => <Badge type={type} inverted={inverted}>{label}</Badge>,
  },
);
