import React, { HTMLAttributes } from 'react';
import createComponent, {
  CHILDREN_COMPONENT,
  Component,
  INHERITED_NAME,
  sstyled,
  Root,
} from '@semcore/core';
import { FadeInOut } from '@semcore/animation';
import Spin from '@semcore/spin';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

import style from './style/spin-container.shadow.css';

class SpinContainerRoot extends Component {
  static displayName = 'SpinContainer';
  static style = style;
  static defaultProps = {
    size: 'xxl',
    theme: 'dark',
    duration: 200,
  };

  getOverlayProps() {
    const { background, size, theme } = this.asProps;
    return {
      background,
      size,
      theme,
    };
  }

  render() {
    const SSpinContainer = Root;
    const SContent = Box;
    const { styles, Children: ChildrenRoot, loading, duration } = this.asProps;

    const [Children, Overlay] = overlayChildren(ChildrenRoot, SpinContainer.Overlay);

    return sstyled(styles)(
      <SSpinContainer render={Box}>
        <SContent>{Children}</SContent>
        <FadeInOut visible={loading} duration={duration}>
          {Overlay || <SpinContainer.Overlay />}
        </FadeInOut>
      </SSpinContainer>,
    );
  }
}

function overlayChildren(Children, Overlay) {
  const children = getOriginChildren(Children);
  if (typeof children === 'function') {
    return [<Children />, null];
  }

  let OverlayChildren = null;
  return [
    React.Children.toArray(children).map((element) => {
      if (!React.isValidElement(element)) return element;
      if (element.type === React.Fragment) return element;
      if (element.type[CHILDREN_COMPONENT]) {
        return overlayChildren(element.type, Overlay);
      }

      const inheritedNames = element.type[INHERITED_NAME] || [element.type.displayName];
      if (inheritedNames.includes(Overlay.displayName)) {
        OverlayChildren = element;
        return null;
      }
      return element;
    }),
    OverlayChildren,
  ];
}

class Overlay extends Component {
  static defaultProps = ({ size, theme }) => ({
    children: <Spin size={size} theme={theme} />,
  });

  render() {
    const SOverlay = Root;
    const { background, styles } = this.asProps;

    return sstyled(styles)(<SOverlay render={Box} use:background={resolveColor(background)} />);
  }
}

const SpinContainer = createComponent(SpinContainerRoot, { Overlay });

export default SpinContainer;
