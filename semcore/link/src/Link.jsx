import { Box, Hint } from '@semcore/base-components';
import { createComponent, Component, Root, sstyled, CORE_INSTANCE } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './style/link.shadow.css';

class RootLink extends Component {
  static displayName = 'Link';
  static defaultProps = {
    noWrap: true,
  };

  static style = style;
  static enhance = [resolveColorEnhance()];
  containerRef = React.createRef();

  state = {
    ariaLabelledByContent: '',
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

  render() {
    const {
      styles,
      noWrap,
      color,
      resolveColor,
      disabled,
      href,
      children,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      Children,
      title,
      'aria-label': ariaLabel,
      hintPlacement,
    } = this.asProps;
    // @ts-ignore
    const Link = this[CORE_INSTANCE];
    const SLink = Root;
    const hintContent = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    return sstyled(styles)(
      <>
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
          aria-label={children === undefined ? hintContent : undefined}
        >
          {AddonLeft
            ? (
                <Link.Addon>
                  <AddonLeft />
                </Link.Addon>
              )
            : null}
          {addonTextChildren(Children, Link.Text, Link.Addon)}
          {AddonRight
            ? (
                <Link.Addon>
                  <AddonRight />
                </Link.Addon>
              )
            : null}
        </SLink>
        {(children === undefined || title) && (
          <Hint
            triggerRef={this.containerRef}
            timeout={[250, 50]}
            placement={hintPlacement}
          >
            {hintContent}
          </Hint>
        )}
      </>,
    );
  }
}

function LinkText(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Text} tag='span' />);
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
