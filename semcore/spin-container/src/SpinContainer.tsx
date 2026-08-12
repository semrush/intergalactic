import { FadeInOut, Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import Spin from '@semcore/spin';
import React from 'react';

import type { NSSpinContainer } from './SpinContainer.type';
import style from './style/spin-container.shadow.css';

type State = {
  inert?: boolean;
};

class SpinContainerRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSSpinContainer.Component>,
  typeof SpinContainerRoot.enhance,
  {},
  {},
  State,
  NSSpinContainer.DefaultProps
> {
  static displayName = 'SpinContainer';
  static style = style;
  static defaultProps = {
    size: 'xxl',
    theme: 'default',
    duration: 200,
  } as const;

  static enhance = [resolveColorEnhance()] as const;

  state: State = {
    inert: this.props.loading,
  };

  private inertTimer: ReturnType<typeof setTimeout> | null = null;

  componentDidUpdate(prevProps: typeof this.asProps) {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      if (this.inertTimer) {
        clearTimeout(this.inertTimer);
      }

      if (loading) {
        this.setState({ inert: true });
      } else {
        this.inertTimer = setTimeout(() => {
          this.setState({ inert: false });
        }, this.asProps.duration + 50);
      }
    }
  }

  getOverlayProps() {
    const { loading, background, duration, size, theme, resolveColor, invert } = this.asProps;
    return {
      background,
      // for Animated
      loading,
      duration,
      // for Spin
      size,
      theme,
      resolveColor,
      invert,
    };
  }

  getContentProps() {
    const { inert } = this.state;

    return { inert: inert ? '' : undefined };
  }

  render() {
    const SSpinContainer = Root;
    const { styles, Children, forcedAdvancedMode } = this.asProps;

    const advancedMode =
      forcedAdvancedMode || isAdvanceMode(Children, [SpinContainer.Overlay.displayName]);

    return sstyled(styles)(
      <SSpinContainer render={Box}>
        {advancedMode
          ? (
              <Children />
            )
          : (
              <>
                <SpinContainer.Content>
                  <Children />
                </SpinContainer.Content>
                <SpinContainer.Overlay />
              </>
            )}
      </SSpinContainer>,
    );
  }
}

type OverlayProps = Intergalactic.InternalTypings.InferChildComponentProps<NSSpinContainer.Overlay.Component, typeof SpinContainerRoot, 'Overlay'>;

class Overlay extends Component<OverlayProps> {
  static defaultProps = ({ size, theme }: OverlayProps) => ({
    children: <Spin size={size} theme={theme} />,
  });

  render() {
    const SOverlay = Root;
    const { styles, theme, background, loading, duration, resolveColor } = this.asProps;
    const useTheme = background ? 'custom' : theme;

    return sstyled(styles)(
      <FadeInOut visible={loading} duration={duration}>
        <SOverlay render={Box} use:theme={useTheme} use:background={resolveColor(background)} />
      </FadeInOut>,
    );
  }
}

function Content(props: Intergalactic.InternalTypings.InferComponentProps<NSSpinContainer.Content.Component>) {
  const SContent = Root;
  const { styles } = props;
  return sstyled(styles)(<SContent render={Box} />);
}

/**
 * SpinContainer
 *
 * {@link https://developer.semrush.com/intergalactic/components/spin-container/spin-container-api/|API} | {@link https://developer.semrush.com/intergalactic/components/spin-container/spin-container-code/|Examples}
 */
const SpinContainer = createComponent<
  NSSpinContainer.Component,
  typeof SpinContainerRoot
>(SpinContainerRoot, {
  Overlay,
  Content,
});

export default SpinContainer;
