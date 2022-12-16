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

  handleClick = async () => {
    await navigator.clipboard.writeText(this.props.text);

    this.setState({ textTooltip: this.props.title || copiedText });

    setTimeout(() => {
      this.setState((prevState) => {
        if (prevState.textTooltip !== copiedText) return prevState;
        return { textTooltip: this.props.textTooltip };
      });
    }, 2000);
  };

  render() {
    const { children, className, ...other } = this.props;
    const { textTooltip } = this.state;

    return (
      <Tooltip
        {...other}
        className={cx(className, styles.tooltipStyle)}
        title={textTooltip}
        aria-label="Click to copy code"
        selfProps={{
          popupTransitionName: 'popup-fade',
        }}
      >
        {React.cloneElement(children, {
          onClick: this.handleClick,
        })}
      </Tooltip>
    );
  }
}

export default Copy;
