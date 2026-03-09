import type { BoxProps } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import type { TextProps } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = TextProps & BoxProps & { formatTags: boolean };
const Demo = (props: ExampleProps) => (
  <>
    <div style={{ width: 200 }}>
      <Text

        size={props.size}
        noWrap={props.noWrap}
        display={props.display}
        formatTags={props.formatTags}
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

export const defaultProps: ExampleProps = {
  size: undefined,
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
  formatTags: true,

};

Demo.defaultProps = defaultProps;

export default Demo;
