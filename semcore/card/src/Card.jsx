import { ButtonLink } from '@semcore/button';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import { Box } from '@semcore/flex-box';
import InfoM from '@semcore/icon/Info/m';
import { DescriptionTooltip } from '@semcore/tooltip';
import { Text } from '@semcore/typography';

import style from './style/card.shadow.css';

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

function Title(props) {
  const { styles, innerHint, Children, innerHintAriaLabel, hintAfterAriaLabel } = props;
  const hintAfter = props.hintAfter || props.hint;
  const STitle = Root;

  return sstyled(styles)(
    <>
      <STitle render={Text}>
        <Children />
        {innerHint && (
          <DescriptionTooltip>
            <DescriptionTooltip.Trigger
              tag={ButtonLink}
              ml={1}
              use='secondary'
              aria-label={innerHintAriaLabel}
              color='--intergalactic-icon-secondary-neutral'
            >
              <ButtonLink.Addon>
                <InfoM />
              </ButtonLink.Addon>
            </DescriptionTooltip.Trigger>
            <DescriptionTooltip.Popper>{innerHint}</DescriptionTooltip.Popper>
          </DescriptionTooltip>
        )}
      </STitle>
      {hintAfter && (
        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={ButtonLink}
            use='secondary'
            aria-label={hintAfterAriaLabel}
            color='--intergalactic-icon-secondary-neutral'
          >
            <ButtonLink.Addon>
              <InfoM />
            </ButtonLink.Addon>
          </DescriptionTooltip.Trigger>
          <DescriptionTooltip.Popper>{hintAfter}</DescriptionTooltip.Popper>
        </DescriptionTooltip>
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
