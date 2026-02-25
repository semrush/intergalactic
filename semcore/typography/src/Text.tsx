import { Ellipsis, Hint, Box } from '@semcore/base-components';
import { Root, sstyled, Component, createComponent } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { TextProps } from './index';
import styles from './style/text.shadow.css';

type DefaultProps = {
  ellipsis: TextProps['ellipsis'] | false;
};

type State = {
  isEllipsized: boolean;
};

class TextRoot extends Component<TextProps, typeof TextRoot.enhance, {}, DefaultProps, State> {
  private ellipsis: Ellipsis | null = null;
  private innerRef = React.createRef<HTMLElement | null>();

  static enhance = [resolveColorEnhance()] as const;
  static styles = styles;
  static displayName = 'Text';

  static defaultProps: DefaultProps = {
    ellipsis: false,
  };

  state = {
    isEllipsized: false,
  };

  constructor(props: TextProps) {
    super(props);

    this.handleEllipsized = this.handleEllipsized.bind(this);
  }

  componentDidMount(): void {
    this.initEllipsis();
  }

  componentDidUpdate(prevProps: TextProps) {
    if (prevProps.ellipsis !== this.asProps.ellipsis) {
      this.cleanUpEllipsis();

      this.initEllipsis();
    }
  }

  componentWillUnmount() {
    this.cleanUpEllipsis();
  }

  render(): React.ReactNode {
    const SText = Root;
    const { color, underline, lineThrough, hintProps, children, ellipsis, resolveColor } = this.asProps;
    const { isEllipsized } = this.state;

    const cropPosition = typeof ellipsis === 'object' ? (ellipsis.cropPosition ?? 'end') : (ellipsis === true ? 'end' : undefined);
    let withHint = hintProps !== false;

    const maxLineValue = typeof ellipsis === 'object' && ellipsis.maxLine !== undefined ? ellipsis.maxLine : undefined;
    if (hintProps === undefined && maxLineValue !== undefined && maxLineValue > 1) {
      withHint = false;
    }

    return sstyled(styles)(
      <>
        <SText
          render={Box}
          tag='span'
          data-ui-name='Text'
          ref={this.innerRef}
          use:decoration={this.getTextDecoration(underline, lineThrough)}
          use:color={resolveColor(color)}
          use:ellipsis={Boolean(ellipsis)}
          isEllipsized={isEllipsized}
          maxLine={maxLineValue}
          trim={cropPosition}
        />
        {isEllipsized && withHint && <Hint triggerRef={this.innerRef} {...hintProps}>{children}</Hint>}
      </>,
    );
  }

  private handleEllipsized(isEllipsized: boolean) {
    this.setState({ isEllipsized: isEllipsized });
  }

  private initEllipsis() {
    const ellipsis = this.asProps.ellipsis;
    if (ellipsis && this.innerRef.current) {
      this.ellipsis = ellipsis instanceof Ellipsis ? ellipsis : new Ellipsis(this.innerRef.current, ellipsis === true ? {} : ellipsis);

      this.ellipsis.on('isEllipsized', this.handleEllipsized);
    }
  }

  private cleanUpEllipsis() {
    this.ellipsis?.off('isEllipsized', this.handleEllipsized);
    this.ellipsis?.cleanUp();
    this.setState({ isEllipsized: false });
  }

  private getTextDecoration(underline?: boolean, lineThrough?: boolean) {
    if (underline) {
      return 'underline';
    }

    if (lineThrough) {
      return 'line-through';
    }
  }
}

export default createComponent(TextRoot);
