import React from 'react';
import TrashS from '@semcore/icon/lib/Trash/s';
import Button from '@semcore/button';
import Dot from '@semcore/dot';

class Demo extends React.PureComponent {
  state = { hidden: false };

  componentDidMount() {
    this.timer = setInterval(() => this.setState({ hidden: !this.state.hidden }), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Button>
        <TrashS />
        <Dot up hidden={this.state.hidden} size="l" />
      </Button>
    );
  }
}

export default Demo;
