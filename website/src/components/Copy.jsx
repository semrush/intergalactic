import React, { PureComponent } from 'react';
import Tooltip from '@semcore/tooltip';
import styles from './Copy.module.css';
import cx from 'classnames';

const copiedText = 'Copied! You are awesome!';
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

    this.setState({ textTooltip: copiedText });

    setTimeout(() => {
      this.setState((prevState) => {
        if (prevState.textTooltip !== copiedText) return prevState;
        return { textTooltip: this.props.textTooltip };
      });
    }, 2000);
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
