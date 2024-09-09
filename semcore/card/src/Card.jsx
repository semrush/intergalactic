import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { ButtonLink } from '@semcore/button';
import { DescriptionTooltip } from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';

import style from './style/card.shadow.css';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';

class CardRoot extends Component {
  static displayName = 'Card';

  static style = style;

  render() {
    const SCard = Root;
    const { Children, styles, forcedAdvancedMode } = this.asProps;

    const advancedMode =
      forcedAdvancedMode ||
      isAdvanceMode(Children, [Card.Header.displayName, Card.Body.displayName]);

    return sstyled(styles)(
      <SCard render={Box}>
        {advancedMode ? (
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
  const { styles, innerHint, Children, innerHintAriaLabel, hintAfterAriaLabel } = props;
  const hintAfter = props.hintAfter || props.hint;
  const STitle = Root;
  const SIcon = ButtonLink;
  const STooltip = DescriptionTooltip;
  return sstyled(styles)(
    <>
      <STitle render={Text}>
        <Children />
        {innerHint && (
          <STooltip ml={1} title={innerHint}>
            <SIcon
              use={'secondary'}
              aria-label={innerHintAriaLabel}
              color={'--intergalactic-icon-secondary-neutral'}
            >
              <SIcon.Addon>
                <InfoM />
              </SIcon.Addon>
            </SIcon>
          </STooltip>
        )}
      </STitle>
      {hintAfter && (
        <STooltip title={hintAfter}>
          <SIcon
            use={'secondary'}
            aria-label={hintAfterAriaLabel}
            color={'--intergalactic-icon-secondary-neutral'}
          >
            <SIcon.Addon>
              <InfoM />
            </SIcon.Addon>
          </SIcon>
        </STooltip>
      )}
    </>,
  );
}

function Description(props) {
  const { styles } = props;
  const SDescription = Root;
  return sstyled(styles)(<SDescription render={Text} tag='p' />);
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
