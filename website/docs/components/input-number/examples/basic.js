import React from 'react';
import InputNumber from '@semcore/input-number';
import NeighborLocation from '@semcore/neighbor-location';

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
      <div>
        <h3>Custom range</h3>
        <NeighborLocation>
          <InputNumber style={{ width: '10%' }}>
            <InputNumber.Value
              min={this.minRange}
              max={this.maxRange}
              placeholder="From"
              value={from}
              onChange={this.handleChange('From')}
              onBlur={this.handleBlur}
            />
            <InputNumber.Controls />
          </InputNumber>
          <InputNumber style={{ width: '10%' }}>
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
      </div>
    );
  }
}

export default Demo;
