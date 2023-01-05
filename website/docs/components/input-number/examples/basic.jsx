import React from 'react';
import InputNumber from '@semcore/ui/input-number';
import NeighborLocation from '@semcore/ui/neighbor-location';
import { Flex } from '@semcore/ui/flex-box';

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.minRange = 1;
    this.maxRange = 8;
    this.revertValues = false;
  }

  state = {
    from: '',
    to: '',
  };
  handleChange = (changeState) => (value) => {
    if (this.revertValues) {
      this.revertValues = false;
    } else {
      this.setState({ [changeState]: value });
    }
  };

  handleBlur = () => {
    const { from, to } = this.state;
    if (from > to) {
      this.revertValues = true;
      this.setState({
        from: Math.max(to, this.minRange),
        to: Math.min(from, this.maxRange),
      });
    }
  };

  render() {
    const { from, to } = this.state;
    return (
      <Flex w="20%">
        <NeighborLocation>
          <InputNumber>
            <InputNumber.Value
              min={this.minRange}
              max={this.maxRange}
              placeholder="From"
              value={from}
              onChange={this.handleChange('from')}
              onBlur={this.handleBlur}
            />
            <InputNumber.Controls />
          </InputNumber>
          <InputNumber>
            <InputNumber.Value
              min={this.minRange}
              max={this.maxRange}
              placeholder="to"
              value={to}
              onChange={this.handleChange('to')}
              onBlur={this.handleBlur}
            />
            <InputNumber.Controls />
          </InputNumber>
        </NeighborLocation>
      </Flex>
    );
  }
}

export default Demo;
