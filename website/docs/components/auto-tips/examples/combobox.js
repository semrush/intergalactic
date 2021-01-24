import React from 'react';
import Select from '@semcore/select';
import Input from '@semcore/input';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    value: `00:0${idx}`,
    title: `00:0${idx}`,
  }));

class Demo extends React.PureComponent {
  state = { value: '' };
  changeValue = (value) => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <Select interaction="focus" onChange={this.changeValue} value={value}>
        <Select.Trigger tag={Input}>
          <Input.Value value={value} onChange={this.changeValue} />
        </Select.Trigger>
        <Select.Menu>
          {options.map((option, idx) => {
            const { value, title } = option;
            return (
              <Select.Option value={value} key={idx}>
                {title}
              </Select.Option>
            );
          })}
        </Select.Menu>
      </Select>
    );
  }
}

export default Demo;
