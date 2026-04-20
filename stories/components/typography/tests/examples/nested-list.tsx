import { List } from '@semcore/ui/typography';
import type { NSText } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: NSText.Props) => (
  <div>
    <List
      size={props.size}
      noWrap={props.noWrap}
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
    >
      <List.Item marker={1}>List item 1</List.Item>
      <List.Item marker={2}>List item 2</List.Item>
      <List.Item marker={null}>
        List item 3
        <List>
          <List.Item>List item</List.Item>
          <List.Item>
            List item
            <List>
              <List.Item>List item</List.Item>
              <List.Item>List item</List.Item>
              <List.Item>List item</List.Item>
            </List>
          </List.Item>
          <List.Item>List item</List.Item>
        </List>
      </List.Item>
      <List.Item marker={3}>
        List item 4
      </List.Item>
    </List>
  </div>
);

export const defaultProps: Omit<NSText.Props, 'formatTags'> = {
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
  use: undefined,
  disabled: false,

};

Demo.defaultProps = defaultProps;

export default Demo;
