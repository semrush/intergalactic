import React, { PureComponent } from 'react';
import Tooltip from '@semcore/tooltip';
import styles from './Copy.module.css';
import cx from 'classnames';

class Copy extends PureComponent {
  static defaultProps = {
    textTooltip: 'Click to copy',
  };

  constructor(props) {
    super(props);
    this.state = { textTooltip: props.textTooltip };
  }

  handleClick = (e) => {
    this.inputRef && this.inputRef.select();
    document && document.execCommand('copy');

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.setState({ textTooltip: 'Copied! You are awesome!' });
  };

  handlerAfterVisibleChange = (visible) => {
    if (!visible) {
      this.setState({ textTooltip: this.props.textTooltip });
    }
  };

  render() {
    const { text, children, textTooltip: _tooltip, className, ...other } = this.props;
    const { textTooltip } = this.state;

    return (
      <Tooltip
        {...other}
        className={cx(className, styles.tooltipStyle)}
        title={textTooltip}
        selfProps={{
          afterVisibleChange: this.handlerAfterVisibleChange,
          popupTransitionName: 'popup-fade',
        }}
      >
        <textarea
          className={styles.textArea}
          type="text"
          value={text}
          ref={(node) => (this.inputRef = node)}
          onChange={() => {}}
        />
        {React.cloneElement(children, {
          onClick: this.handleClick,
        })}
      </Tooltip>
    );
  }
}

export default Copy;
