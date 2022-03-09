import React from 'react';
import Spin from '@semcore/spin';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
const THEMES = ['dark', 'invert'];
function getSizeText(sizeSpin) {
  if (sizeSpin.includes('l') || sizeSpin.includes('m')) {
    return 300;
  }
  if (sizeSpin.includes('s')) {
    return 200;
  }
  return 100;
}
function getMarginText(orientation = 'bottom', sizeSpin) {
  if (orientation === 'right') {
    if (sizeSpin.includes('xl')) {
      return '0 0 0 16px';
    }
    if (sizeSpin.includes('xs')) {
      return '0 0 0 4px';
    }
    return '0 0 0 8px';
  }
  if (sizeSpin.includes('s')) {
    return '4px 0 0';
  }

  return '8px 0 0';
}

export default PlaygroundGeneration((createGroupWidgets) => {
  const { bool, select, radio, text: textWidget } = createGroupWidgets('Spin');

  const size = select({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES.map((value) => ({
      name: value,
      value,
    })),
  });

  const theme = radio({
    key: 'theme',
    defaultValue: 'dark',
    label: 'Theme',
    options: THEMES,
  });

  const centered = bool({
    key: 'centered',
    defaultValue: true,
    label: 'Centered',
  });

  const text = textWidget({
    key: 'text',
    defaultValue: '',
    label: 'Text',
  });

  const textRight = bool({
    key: 'textRight',
    defaultValue: false,
    label: 'TextRight',
  });

  if (text.length) {
    return (
      <Flex
        m={centered ? 'auto' : 0}
        alignItems="center"
        justifyContent="center"
        direction={textRight ? 'row' : 'column'}
      >
        <Spin size={size} theme={theme} />
        {
          <Text
            tag="div"
            m={textRight ? getMarginText('right', size) : getMarginText('bottom', size)}
          >
            <Text size={getSizeText(size)} color="gray60">
              {text}
            </Text>
          </Text>
        }
      </Flex>
    );
  }

  return <Spin size={size} theme={theme} centered={centered} />;
});
