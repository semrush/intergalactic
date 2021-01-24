import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Tooltip from '@semcore/tooltip';

//Установка 1px/1em не работает, так как это дает отрицательный w/h для некоторых браузеров.
const TextArea = styled.textarea`
  position: fixed;
  bottom: -2em;
  left: -2em;
  width: 2em;
  height: 2em;
  padding: 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
`;

const fadeOut = keyframes`
  0% { opacity: 1;}
  100% {opacity: 0;}
`;

const fadeIn = keyframes`
  0% { opacity: 0;}
  100% {opacity: 1;}
`;

const TooltipStyle = styled(Tooltip)`
  &.popup-fade-enter,
  &.popup-fade-appear {
    opacity: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;

    &.popup-fade-enter-active,
    &.popup-fade-appear-active {
      animation-name: ${fadeIn};
      animation-play-state: running;
    }
  }

  &.popup-fade-leave {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
    animation-play-state: paused;

    &.popup-fade-leave-active {
      animation-name: ${fadeOut};
      animation-play-state: running;
    }
  }
`;

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
    const { text, children, textTooltip: _tooltip, ...other } = this.props;
    const { textTooltip } = this.state;

    return (
      <TooltipStyle
        {...other}
        title={textTooltip}
        selfProps={{
          afterVisibleChange: this.handlerAfterVisibleChange,
          popupTransitionName: 'popup-fade',
        }}
      >
        <TextArea
          type="text"
          value={text}
          ref={(node) => (this.inputRef = node)}
          onChange={() => {}}
        />
        {React.cloneElement(children, {
          onClick: this.handleClick,
        })}
      </TooltipStyle>
    );
  }
}

export default Copy;
