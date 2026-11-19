import { Flex } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled, type Intergalactic } from '@semcore/core';
import { List } from '@semcore/typography';
import React from 'react';

import style from './overlay.shadow.css';
import type { NSLimitsOverlay } from './Overlay.type';
import OverlayContent from '../../inner-components/OverlayContent/OverlayContent';
import TierCard from '../../inner-components/TierCard/TierCard';
import type { NSLimitsTierCard } from '../../inner-components/TierCard/TierCard.type';
import TrustLine from '../../inner-components/TrustLine/TrustLine';

class OverlayRoot extends Component<Intergalactic.InternalTypings.InferComponentProps<NSLimitsOverlay.Component>> {
  static style = style;
  static displayName = 'Limits.Overlay';

  render() {
    const SOverlay = Root;
    const SOverlayTiers = Flex;
    const SOverlayFooter = Flex;
    const SOverlayActions = Flex;

    const { trustLine, primaryCta, secondaryCta, locale, features, tiers, headingLevel = 3, styles } = this.asProps;

    const tierHeadingLevel = (headingLevel + 1) as NSLimitsTierCard.HeadingLevel;

    return sstyled(styles)(
      <SOverlay render={OverlayContent}>
        {tiers && (
          <SOverlayTiers>
            {tiers.map((tier) => (
              <TierCard key={tier.name} headingLevel={tierHeadingLevel} {...tier} />
            ))}
          </SOverlayTiers>
        )}
        {features && (
          <List>
            {features.map((feature, index) => (
              <List.Item key={index}>{feature}</List.Item>
            ))}
          </List>
        )}
        <SOverlayFooter>
          <SOverlayActions>
            {primaryCta}
            {secondaryCta}
          </SOverlayActions>
          {trustLine && <TrustLine locale={locale} {...(typeof trustLine === 'object' ? trustLine : {})} />}
        </SOverlayFooter>
      </SOverlay>,
    );
  }
}

const Overlay = createComponent<NSLimitsOverlay.Component, typeof OverlayRoot>(OverlayRoot);

export default Overlay;
