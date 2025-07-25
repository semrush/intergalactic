import type { BoxProps } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import type { TextProps } from '@semcore/typography';
import React from 'react';

type ExmapleProps = TextProps & BoxProps;
const Demo = (props: ExmapleProps) => (
  <>
    <div style={{ width: 200 }}>
      <Text
        size={props.size}
        noWrap={props.noWrap}
        display={props.display}

        bold={props.bold}
        semibold={props.semibold}
        medium={props.medium}
        italic={props.italic}
        underline={props.underline}
        monospace={props.monospace}
        lineThrough={props.lineThrough}
        uppercase={props.uppercase}
        lowercase={props.lowercase}
        capitalize={props.capitalize}
        color={props.color}
        fontSize={props.fontSize}
        lineHeight={props.lineHeight}
        fontWeight={props.fontWeight}
        textAlign={props.textAlign}
        use={props.use}
        disabled={props.disabled}
        mb={2}
        w={props.w}
      >
        Example sentence
      </Text>
    </div>

  </>
);

export const defaultProps: TextProps = {
  size: 100,
  noWrap: false,
  bold: false,
  semibold: false,
  medium: false,
  italic: false,
  underline: false,
  monospace: false,
  lineThrough: false,
  uppercase: false,
  lowercase: false,
  capitalize: false,
  color: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  fontWeight: undefined,
  textAlign: undefined,
  inline: false,
  use: undefined,
  disabled: false,
  display: undefined,
  w: undefined,

};

Demo.defaultProps = defaultProps;

export default Demo;
