import React, { HTMLAttributes } from 'react';
import {
  FontSizeProperty,
  FontWeightProperty,
  LineHeightProperty,
  TextAlignProperty,
} from 'csstype';
import { createBaseComponent, Merge, styled, use } from '@semcore/core';
import { IBoxProps, useBox } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

import styles from './style/text.shadow.css';

export interface ITextProps extends IBoxProps {
  /** Font size and line-heights */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  /** The text will not be wrapped on a new line and will be cut off with ellipsis */
  noWrap?: boolean;
  /** СSS property `font-weight: 700;` */
  bold?: boolean;
  /** СSS property `font-weight: 500;` */
  medium?: boolean;
  /** Italicized text */
  italic?: boolean;
  /** Underlined text */
  underline?: boolean;
  /** Strikethrough text */
  lineThrough?: boolean;
  /** Text color **/
  color?: string;
  /** Custom `font-size` */
  fontSize?: FontSizeProperty<any>;
  /** Custom `line-height` */
  lineHeight?: LineHeightProperty<any>;
  /** Custom `font-width` */
  fontWeight?: FontWeightProperty;
  /** Text alignment */
  textAlign?: TextAlignProperty;
}

function getTextDecoration(underline, lineThrough) {
  if (underline) {
    return 'underline';
  }

  if (lineThrough) {
    return 'line-through';
  }
}

function Text(props, ref) {
  const [SText, other] = useBox(
    {
      tag: 'span',
      'data-ui-name': 'Text',
      ...props,
    },
    ref,
  );
  const {
    size,
    bold,
    medium,
    italic,
    noWrap,
    color,
    underline,
    lineThrough,
    fontSize,
    lineHeight,
    fontWeight,
    textAlign,
  } = props;

  return styled(styles)`
    SText[use|decoration] {
      text-decoration: ${getTextDecoration(underline, lineThrough)};
    }
    SText[use|color] {
      color: ${resolveColor(color)};
    }
    SText[use|fontSize] {
      &[use|fontSize] {
        font-size: ${fontSize};
      }
    }
    SText[use|lineHeight] {
      &[use|lineHeight] {
        line-height: ${lineHeight};
      }
    }
    SText[use|fontWeight] {
      font-weight: ${fontWeight};
    }
    SText[use|textAlign] {
      text-align: ${textAlign};
    }
  `(
    <SText
      {...use({
        decoration: underline || lineThrough,
        size: size,
        bold: bold,
        medium: medium,
        italic: italic,
        noWrap: noWrap,
        color: color,
        fontSize: fontSize,
        lineHeight: lineHeight,
        fontWeight: fontWeight,
        textAlign: textAlign,
      })}
      {...other}
    />,
  );
}

Text.displayName = 'Text';

export default createBaseComponent<Merge<ITextProps, HTMLAttributes<HTMLSpanElement>>>(Text);
