import { Ellipsis, Hint, Box } from '@semcore/base-components';
import { Root, sstyled, Component, createComponent } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { TextProps } from './index';
import styles from './style/text.shadow.css';

type State = {
  isEllipsized: boolean;
};

class TextRoot extends Component<TextProps, typeof TextRoot.enhance, {}, {}, State> {
  private ellipsis: Ellipsis | null = null;
  private innerRef = React.createRef<HTMLElement | null>();

  static enhance = [resolveColorEnhance()] as const;
  static styles = styles;
  static displayName = 'Text';

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
    if (
      ('ellipsis' in prevProps && prevProps.ellipsis !== this.asProps.ellipsis) ||
      ('ellipsisProps' in prevProps && prevProps.ellipsisProps !== this.asProps.ellipsisProps)
    ) {
      this.cleanUpEllipsis();

      this.initEllipsis();
    }
  }

  componentWillUnmount() {
    this.cleanUpEllipsis();
  }

  render(): React.ReactNode {
    const SText = Root;
    const { color, underline, lineThrough, hint, hintProps, children, ellipsis, ellipsisProps, resolveColor } = this.asProps;
    const { isEllipsized } = this.state;

    const cropPosition = ellipsisProps?.cropPosition ?? 'end';
    let withHint = hint !== false;

    const maxLineValue = ellipsisProps?.maxLine;
    if (hint !== true && hintProps === undefined && maxLineValue !== undefined && maxLineValue > 1) {
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
          use:ellipsis={ellipsis !== undefined ? ellipsis : Boolean(ellipsisProps)}
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
    const { ellipsis, ellipsisProps, hint } = this.asProps;
    const shouldInit = hint !== false || ellipsisProps?.cropPosition === 'middle';

    if (shouldInit && (ellipsis || ellipsisProps) && this.innerRef.current) {
      this.ellipsis = ellipsis instanceof Ellipsis ? ellipsis : new Ellipsis(this.innerRef.current, ellipsisProps ?? {});

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
