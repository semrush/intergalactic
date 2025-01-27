import React from 'react';
import Playground from './Playground';

class PlaygroundState extends React.Component {
  state = {
    controls: [],
  };

  onChangeControls = (controls) => {
    this.setState({ controls });
  };

  render() {
    const { preview, LayoutPlayground, filterProps, ...others } = this.props;
    const { controls } = this.state;
    return (
      <Playground
        preview={preview}
        filterProps={filterProps}
        controls={controls}
        onChangeControls={this.onChangeControls}
      >
        {(playgroundProps) => (
          <LayoutPlayground
            changeControls={this.onChangeControls}
            {...playgroundProps}
            {...others}
          />
        )}
      </Playground>
    );
  }
}

const createPlayground = (LayoutPlayground) => (preview, settings) => (props) => (
  <PlaygroundState LayoutPlayground={LayoutPlayground} preview={preview} {...settings} {...props} />
);

export { Playground, createPlayground };
