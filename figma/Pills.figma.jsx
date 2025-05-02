import React from 'react';
import Pills from '@semcore/pills';
import figma from '@figma/code-connect/react';

figma.connect(
  Pills.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/%E2%9D%96-Core-Components-(Refactoring)?node-id=10174-91951&t=hkjybGSILqRb6bQU-4',
  {
    props: {
      disabled: figma.enum('state', { disabled: true }),
      selected: figma.boolean('selected'),
      addonLeft: figma.enum('pill type', {
        default: figma.boolean('← addon', {
          true: <Pills.Item.Addon tag={addonTag} {...addonProps} />,
        }),
      }),
      addonRight: figma.enum('pill type', {
        default: figma.boolean('addon →', {
          true: <Pills.Item.Addon tag={addonTag} {...addonProps}>{/* addon text */}</Pills.Item.Addon>,
        }),
      }),
      content: figma.enum('pill type', {
        default: figma.boolean('← addon', {
          true: <Pills.Item.Text>{/* pill text */}</Pills.Item.Text>,
          false: figma.boolean('addon →', {
            true: <Pills.Item.Text>{/* pill text */}</Pills.Item.Text>,
            false: '{/* pill text */}',
          }),
        }),
        'icon only': <Pills.Item.Addon tag={iconName} {...iconProps} />,
        king: <Pills.Item.Text
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--intergalactic-spacing-1x)',
              margin: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-5x)',
            }}
          >
            {/* first line */}
            {/* second line */}
          </Pills.Item.Text>,
      }),
      style: figma.enum('pill type', {
        king: {
          height: 'inherit',
          alignItems: 'stretch',
          textAlign: 'inherit',
          whiteSpace: 'normal',
        },
      })
    },
    example: ({ disabled, selected, content, addonLeft, addonRight, style }) => (
      <Pills.Item disabled={disabled} selected={selected} style={style}>
        {addonLeft}
        {content}
        {addonRight}
      </Pills.Item>
    ),
  },
);

figma.connect(
  Pills,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/%E2%9D%96-Core-Components-(Refactoring)?node-id=10174-91970&t=hkjybGSILqRb6bQU-4',
  {
    props: {
      size: figma.enum('size', { L: 'l' }),
      style: figma.enum('type', { king: { alignItems: 'stretch' } }),
    },
    example: (props) => <Pills {...props}>{/* list of pills */}</Pills>,
  },
);
