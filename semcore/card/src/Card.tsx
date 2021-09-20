import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { ITextProps, Text } from '@semcore/typography';
// eslint-disable-next-line import/no-named-as-default
import Tooltip from '@semcore/tooltip';
import InfoXS from '@semcore/icon/lib/Info/xs';

import style from './style/card.shadow.css';

export interface ITitleProps extends ITextProps {
  /**
   * Tooltip text
   */
  hint?: React.ReactNode;
}

class Card extends Component {
  static displayName = 'Card';

  static style = style;

  render() {
    const SCard = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<SCard render={Box} />);
  }
}

function Title(props) {
  const { styles, hint } = props;
  const STitle = Root;
  const SIcon = InfoXS;
  return sstyled(styles)(
    <>
      <STitle render={Text} />
      {hint && (
        <Tooltip title={hint}>
          <SIcon />
        </Tooltip>
      )}
    </>,
  );
}

function Description(props) {
  const { styles } = props;
  const SDescription = Root;
  return sstyled(styles)(<SDescription render={Text} tag="p" />);
}

export default createComponent<
  ComponentProps<typeof Box>,
  {
    Title: Merge<ITitleProps, HTMLAttributes<HTMLSpanElement>>;
    Description: ComponentProps<typeof Text>;
  }
>(Card, {
  Title,
  Description,
});
