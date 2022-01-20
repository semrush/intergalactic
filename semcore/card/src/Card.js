import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import Info from '@semcore/icon/Info/m';

import style from './style/card.shadow.css';

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
  const SIcon = Info;
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

export default createComponent(Card, {
  Title,
  Description,
});
