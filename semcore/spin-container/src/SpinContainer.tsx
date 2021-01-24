import React, { HTMLAttributes } from 'react';
import createComponent, {
  CHILDREN_COMPONENT,
  Component,
  INHERITED_NAME,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { CSSTransition } from 'react-transition-group';
import Spin, { ISpinProps } from '@semcore/spin';
import { Box, IBoxProps } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

import style from './style/spin-container.shadow.css';

export interface ISpinContainerProps extends IBoxProps, ISpinProps {
  /**
   * Color of container spinner; you can use your own color
   */
  background?: string;
  /** Duration of animation displaying in ms
   * @default 200
   */
  duration?: number;
  /**
   * Property responsible for displaying the spinner
   * */
  loading?: boolean;
}

export interface ISpinContainerContext extends ISpinContainerProps {
  getOverlayProps: PropGetter<SpinContainerRoot['getOverlayProps']>;
}

class SpinContainerRoot extends Component<ISpinContainerProps> {
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
    const SSpinContainer = this.Root;
    const SContent = Box;
    const { styles, Children: ChildrenRoot, duration, loading } = this.asProps;
    const transitionDuration = `${duration}ms`;

    const [Children, Overlay] = overlayChildren(ChildrenRoot, SpinContainer.Overlay);

    return styled(styles)`
      .animate--exit-active,
      .animate--enter-active {
        transition: opacity ${transitionDuration} ease-out;
      }
    `(
      <SSpinContainer render={Box}>
        <SContent>{Children}</SContent>
        <CSSTransition
          in={loading}
          timeout={duration}
          classNames={{
            enterActive: styled.styles['animate--enter-active'],
            exitActive: styled.styles['animate--exit-active'],
            enter: styled.styles['animate--enter'],
            exit: styled.styles['animate--exit'],
          }}
          unmountOnExit
        >
          {Overlay || <SpinContainer.Overlay />}
        </CSSTransition>
      </SSpinContainer>,
    );
  }
}

function overlayChildren(Children: any, Overlay: React.ComponentType) {
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
      // @ts-ignore
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

export interface ISpinContainerOverlayProps extends IBoxProps {
  background?: string;
}

class Overlay extends Component<ISpinContainerOverlayProps> {
  static defaultProps = ({ size, theme }) => ({
    children: <Spin size={size} theme={theme} />,
  });

  render() {
    const SOverlay = this.Root;
    const { background, styles } = this.asProps;

    return styled(styles)`
      SOverlay[background] {
        background: ${resolveColor(background)};
      }
    `(<SOverlay render={Box} background={background} />);
  }
}

const SpinContainer = createComponent<
  Merge<ISpinContainerProps, HTMLAttributes<HTMLDivElement>>,
  {
    Overlay: Merge<ISpinContainerOverlayProps, HTMLAttributes<HTMLDivElement>>;
  },
  ISpinContainerContext
>(SpinContainerRoot, { Overlay });

export default SpinContainer;
