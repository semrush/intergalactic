import React from 'react';
import InputNumber from '@semcore/ui/input-number';
import NeighborLocation from '@semcore/ui/neighbor-location';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

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
      <>
        <Text tag="label" id="basic-example" size="200">
          Range label
        </Text>
        <Flex w="20%" mt={2}>
          <NeighborLocation>
            <InputNumber>
              <InputNumber.Value
                min={this.minRange}
                max={this.maxRange}
                value={from}
                placeholder="From"
                aria-labelledby='basic-example'
                onChange={this.handleChange('from')}
                onBlur={this.handleBlur}
              />
              <InputNumber.Controls />
            </InputNumber>
            <InputNumber>
              <InputNumber.Value
                min={this.minRange}
                max={this.maxRange}
                value={to}
                placeholder="to"
                aria-labelledby='basic-example'
                onChange={this.handleChange('to')}
                onBlur={this.handleBlur}
              />
              <InputNumber.Controls />
            </InputNumber>
          </NeighborLocation>
        </Flex>
      </>
    );
  }
}

export default Demo;
