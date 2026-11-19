import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { sstyled, Root, Component, createComponent } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { List, Text } from '@semcore/typography';
import React from 'react';

import style from './tier-card.shadow.css';
import type { NSLimitsTierCard } from './TierCard.type';

class TierCardRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSLimitsTierCard.Component>,
  typeof TierCardRoot.enhance
> {
  static style = style;
  static displayName = 'Limits.TierCard';

  static enhance = [uniqueIDEnhancement('limits-tier-card')] as const;

  render() {
    const {
      name,
      price: { value: priceValue, period },
      features,
      featuresMarker,
      theme = 'default',
      description,
      cta,
      promoLabel,
      headingLevel = 4,
      uid,
      styles,
    } = this.asProps;

    const nameId = `igc-${uid}-name`;

    const STierCard = Root;
    const SHeader = Flex;
    const STierName = Text;
    const STierPrice = Flex;
    const SDescription = Text;
    const SPromoLabel = Text;
    const SActions = Box;

    return sstyled(styles)(
      <STierCard render={Flex} role='group' aria-labelledby={nameId} __excludeProps={['name']}>
        {theme === 'accent' && promoLabel && <SPromoLabel size={100} medium>{promoLabel}</SPromoLabel>}
        <SHeader>
          <STierName tag={`h${headingLevel}`} id={nameId} size={400} semibold>
            {name}
          </STierName>
          <STierPrice>
            {priceValue}
            {period && <Text size={100}>/{period}</Text>}
          </STierPrice>
        </SHeader>
        {React.isValidElement(description) ? description : Boolean(description) && <SDescription size={200}>{description}</SDescription>}
        {features.length > 0 && (
          <List marker={featuresMarker}>
            {features.map((feature, index) => (
              <List.Item key={index}>
                {feature}
              </List.Item>
            ))}
          </List>
        )}
        {cta && <SActions>{cta}</SActions> }
      </STierCard>,
    );
  }
}

const TierCard = createComponent<NSLimitsTierCard.Component, typeof TierCardRoot>(TierCardRoot);

export default TierCard;
