import { Box } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import InfoM from '@semcore/icon/Info/m';
import { DescriptionTooltip } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSCard } from './Card.type';
import style from './style/card.shadow.css';

class CardRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSCard.Component>
> {
  static displayName = 'Card';

  static style = style;

  render() {
    const SCard = Root;
    const { Children, styles } = this.asProps;

    const advancedMode = isAdvanceMode(Children, [Card.Header.displayName, Card.Body.displayName]);

    return sstyled(styles)(
      <SCard render={Box}>
        {advancedMode
          ? (
              <Children />
            )
          : (
              <Card.Body>
                <Children />
              </Card.Body>
            )}
      </SCard>,
    );
  }
}

function Title(
  props: Intergalactic.InternalTypings.InferComponentProps<NSCard.Title.Component>,
) {
  const { styles, innerHint, innerHintAriaLabel, hintAfterAriaLabel, Children } = props;
  const hintAfter = props.hintAfter;
  const STitle = Root;
  const SInfo = DescriptionTooltip;
  const SInfoTrigger = SInfo.Trigger;

  return sstyled(styles)(
    <>
      <STitle render={Text}>
        <Children />
        {innerHint && (
          <SInfo>
            <SInfoTrigger
              tag={ButtonLink}
              ml={1}
              use='secondary'
              size={300}
              aria-label={innerHintAriaLabel}
              color='--intergalactic-icon-secondary-neutral'
            >
              <ButtonLink.Addon>
                <InfoM />
              </ButtonLink.Addon>
            </SInfoTrigger>
            <SInfo.Popper aria-label={innerHintAriaLabel as string}>{innerHint}</SInfo.Popper>
          </SInfo>
        )}
      </STitle>
      {hintAfter && (
        <SInfo>
          <SInfoTrigger
            tag={ButtonLink}
            use='secondary'
            size={300}
            aria-label={hintAfterAriaLabel}
            color='--intergalactic-icon-secondary-neutral'
          >
            <ButtonLink.Addon>
              <InfoM />
            </ButtonLink.Addon>
          </SInfoTrigger>
          <SInfo.Popper aria-label={hintAfterAriaLabel as string}>{hintAfter}</SInfo.Popper>
        </SInfo>
      )}
    </>,
  );
}

function Description(props: Intergalactic.InternalTypings.InferComponentProps<NSCard.Description.Component>) {
  const { styles } = props;
  const SDescription = Root;
  return sstyled(styles)(<SDescription render={Text} tag='p' />);
}

function Header(props: Intergalactic.InternalTypings.InferComponentProps<NSCard.Header.Component>) {
  const { styles } = props;
  const SHeader = Root;
  return sstyled(styles)(<SHeader render={Box} {...props} />);
}

function Body(props: Intergalactic.InternalTypings.InferComponentProps<NSCard.Body.Component>) {
  const { styles } = props;
  const SBody = Root;
  return sstyled(styles)(<SBody render={Box} {...props} />);
}

const Card = createComponent(CardRoot, {
  Title,
  Description,
  Header,
  Body,
}) as NSCard.Component;

export default Card;
