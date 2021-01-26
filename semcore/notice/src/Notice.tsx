import React, { HTMLAttributes, SVGAttributes } from 'react';
import { CSSTransition } from 'react-transition-group';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { IIconProps } from '@semcore/icon';
import CloseAltS from '@semcore/icon/lib/CloseAlt/s';
import logger from '@semcore/utils/lib/logger';

import style from './style/notice.shadow.css';

export type NoticeTheme = 'danger' | 'warning' | 'success' | 'info';

export interface INoticeProps extends IBoxProps {
  /** Property for managing visibility of Notice */
  hidden?: boolean;
  /**
   * Notice theme
   * @default info
   */
  theme?: NoticeTheme;
  /** Duration of animation, ms
   * @default 200
   */
  duration?: number;
  /**
   * Property for managing visibility of Notice
   * @deprecated v2.0.0 {@link INoticeProps.hidden}
   *  */
  invisible?: boolean;
}

export interface INoticeLabelProps extends IBoxProps {
  theme?: NoticeTheme;
}

export interface INoticeContext extends INoticeProps {
  getLabelProps: PropGetter<RootNotice['getLabelProps']>;
}

class RootNotice extends Component<INoticeProps> {
  static displayName = 'Notice';
  static style = style;
  static defaultProps = {
    theme: 'info',
    duration: 200,
  };

  getLabelProps() {
    const { theme } = this.asProps;
    return {
      theme,
    };
  }

  render() {
    const SNotice = this.Root;
    const { styles, hidden, theme, duration, invisible, ...other } = this.asProps;

    logger.warn(
      invisible !== undefined,
      "The 'invisible' property is deprecated, use 'hidden'",
      other['data-ui-name'] || RootNotice.displayName,
    );

    const transitionDuration = `${duration}ms`;
    return styled(styles)`
      .animate--exit-active,
      .animate--enter-active {
        transition: opacity ${transitionDuration} ease-out;
      }
    `(
      <CSSTransition
        in={invisible !== undefined ? !invisible : !hidden}
        timeout={duration}
        classNames={{
          enterActive: styled.styles['animate--enter-active'],
          exitActive: styled.styles['animate--exit-active'],
          enter: styled.styles['animate--enter'],
          exit: styled.styles['animate--exit'],
        }}
        unmountOnExit
      >
        <SNotice render={Box} theme={theme} />
      </CSSTransition>,
    );
  }
}

function Label(props: IFunctionProps<INoticeLabelProps>) {
  const { Root: SLabel, styles, theme } = props;
  return styled(styles)(<SLabel render={Box} theme={theme} />);
}

function Actions(props: IFunctionProps<IBoxProps>) {
  const { Root: SActions, styles } = props;
  return styled(styles)(<SActions render={Box} />);
}

function Content(props: IFunctionProps<IBoxProps>) {
  const { Root: SContent, styles } = props;
  return styled(styles)(<SContent render={Box} />);
}

function CloseIcon(props: IFunctionProps<IBoxProps & IIconProps>) {
  const { Root: SCloseIcon, styles } = props;
  return styled(styles)(<SCloseIcon render={Box} tag={CloseAltS} color="stone" interactive />);
}

export default createComponent<
  Merge<INoticeProps, HTMLAttributes<HTMLDivElement>>,
  {
    Label: Merge<INoticeLabelProps, HTMLAttributes<HTMLDivElement>>;
    Actions: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>>;
    Content: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>>;
    CloseIcon: Merge<IBoxProps & IIconProps, SVGAttributes<SVGElement>>;
  },
  INoticeContext
>(RootNotice, {
  Label,
  Actions,
  Content,
  CloseIcon,
});
