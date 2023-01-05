import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';

import style from './style/card.shadow.css';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';

class CardRoot extends Component {
  static displayName = 'Card';

  static style = style;

  render() {
    const SCard = Root;
    const { Children, styles } = this.asProps;

    const advanceMode = isAdvanceMode(Children, [Card.Header.displayName, Card.Body.displayName]);

    return sstyled(styles)(
      <SCard render={Box}>
        {advanceMode ? (
          <Children />
        ) : (
          <Card.Body>
            <Children />
          </Card.Body>
        )}
      </SCard>,
    );
  }
}

function Title(props) {
  const { styles, hint } = props;
  const SWrapper = 'div';
  const STitle = Root;
  const SIcon = InfoM;
  const STooltip = Tooltip;
  return sstyled(styles)(
    <SWrapper>
      <STitle render={Text} />
      {hint && (
        <STooltip title={hint}>
          <SIcon />
        </STooltip>
      )}
    </SWrapper>,
  );
}

function Description(props) {
  const { styles } = props;
  const SDescription = Root;
  return sstyled(styles)(<SDescription render={Text} tag="p" />);
}

function Header(props) {
  const { styles } = props;
  const SHeader = Root;
  return sstyled(styles)(<SHeader render={Box} {...props} />);
}

function Body(props) {
  const { styles } = props;
  const SBody = Root;
  return sstyled(styles)(<SBody render={Box} {...props} />);
}

const Card = createComponent(CardRoot, {
  Title,
  Description,
  Header,
  Body,
});

export default Card;
