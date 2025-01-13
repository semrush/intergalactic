import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import { Hint } from '@semcore/tooltip';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';
import hasLabels from '@semcore/utils/lib/hasLabels';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';

import style from './style/link.shadow.css';

class RootLink extends Component {
  static displayName = 'Link';
  static defaultProps = {
    noWrap: true,
  };
  static style = style;
  static enhance = [keyboardFocusEnhance(), resolveColorEnhance()];
  containerRef = React.createRef();

  state = {
    ariaLabelledByContent: '',
    visibleHint: false,
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      logger.warn(
        this.containerRef.current && !hasLabels(this.containerRef.current),
        `'title' or 'aria-label' or 'aria-labelledby' are required props for links without text content`,
        this.asProps['data-ui-name'] || RootLink.displayName,
      );
    }

    if (this.asProps['aria-labelledby']) {
      setTimeout(() => {
        this.setState({
          ariaLabelledByContent:
            document.getElementById(this.asProps['aria-labelledby'])?.textContent ?? '',
        });
      }, 0);
    }
  }

  handleMouseEnterOnlyAddon = () => {
    this.setState({ visibleHint: true });
  };
  handleMouseLeaveOnlyAddon = () => {
    this.setState({ visibleHint: false });
  };

  renderChildren() {
    const { Children, styles, addonLeft: AddonLeft, addonRight: AddonRight } = this.asProps;

    return sstyled(styles)(
      <>
        {AddonLeft ? <Link.Addon tag={AddonLeft} /> : null}
        {addonTextChildren(Children, Link.Text, Link.Addon)}
        {AddonRight ? <Link.Addon tag={AddonRight} /> : null}
      </>,
    );
  }

  renderOnlyAddons() {
    const {
      styles,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      title,
      ['aria-label']: ariaLabel,
      keyboardFocused,
    } = this.asProps;
    const { visibleHint } = this.state;

    const hintContent = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    return sstyled(styles)(
      <Link.Addon
        tag={Hint}
        title={hintContent}
        timeout={[250, 50]}
        visible={keyboardFocused || visibleHint}
      >
        {AddonLeft && <AddonLeft />}
        {AddonRight && <AddonRight />}
      </Link.Addon>,
    );
  }

  render() {
    const SLink = Root;
    const {
      styles,
      noWrap,
      color,
      resolveColor,
      disabled,
      href,
      children: hasChildren,
    } = this.asProps;

    return sstyled(styles)(
      <SLink
        role='link'
        tabIndex={disabled ? -1 : 0}
        use:href={disabled ? undefined : href}
        visually-disabled={disabled}
        render={Text}
        text-color={resolveColor(color)}
        tag='a'
        noWrapText={noWrap}
        use:noWrap={false}
        ref={this.containerRef}
        __excludeProps={['disabled', 'aria-disabled']}
        onMouseEnter={this.handleMouseEnterOnlyAddon}
        onMouseLeave={this.handleMouseLeaveOnlyAddon}
      >
        {hasChildren !== undefined ? this.renderChildren() : this.renderOnlyAddons()}
      </SLink>,
    );
  }
}

function LinkText(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag='span' />);
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

const Link = createComponent(RootLink, {
  Text: LinkText,
  Addon,
});

export default Link;
