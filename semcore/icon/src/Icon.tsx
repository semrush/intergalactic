import React from 'react';
import { createBaseComponent, Merge, styled, use } from '@semcore/core';
import { IBoxProps, useBox } from '@semcore/flex-box';
import resolveColor, { shade } from '@semcore/utils/lib/color';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import styles from './style/icon.shadow.css';

export interface IIconProps extends IBoxProps, IKeyboardFocusProps {
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  /** Make an icon interactive */
  interactive?: boolean;
  /** Icon color */
  color?: string;
}

// TODO: сделать useIcon?
function Icon(props, ref) {
  const [SIcon, other] = useBox(
    {
      tag: 'svg',
      'data-ui-name': 'Icon',
      width: 16,
      height: 16,
      viewBox: '0 0 16 16',
      ...props,
    },
    ref,
  );

  const { interactive, color: colorProps } = props;
  const color = resolveColor(colorProps);
  const { keyboardFocused, ...propsWithKeyboardEnhance } = keyboardFocusEnhance()({
    disabled: !interactive,
    ...other,
  });

  return styled(styles)`
    SIcon[use|color] {
      color: ${color};
    }
    SIcon[use|interactive] {
      cursor: pointer;
      &:hover {
        color: ${shade(color, -0.12)};
      }
    }
  `(<SIcon {...use({ color, interactive, keyboardFocused })} {...propsWithKeyboardEnhance} />);
}

Icon.displayName = 'Icon';

export default createBaseComponent<Merge<IIconProps, React.SVGAttributes<SVGElement>>>(Icon);
