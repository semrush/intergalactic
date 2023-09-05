import React from 'react';
import Checkbox from '@semcore/ui/checkbox';

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: [false, false, false],
    };
    this.all = (checked) => {
      this.setState({
        checked: this.state.checked.map(() => checked),
      });
    };

    this.item = (checked, e) => {
      const { id } = e.currentTarget;

      this.setState({
        checked: this.state.checked.map((item, i) => {
          if (i === Number(id)) return !item;
          return item;
        }),
      });
    };

    this.indeterminate = (checked) => {
      return checked.includes(true) && checked.indexOf(false) >= 0;
    };
  }

  render() {
    const { checked } = this.state;

    return (
      <>
        <div>
          <Checkbox mb={3}>
            <Checkbox.Value
              onChange={this.all}
              indeterminate={this.indeterminate(checked)}
              checked={checked.indexOf(false) < 0}
            />
            <Checkbox.Text>Select all</Checkbox.Text>
          </Checkbox>
        </div>
        {checked.map((_, i) => (
          <div key={i}>
            <Checkbox mb={3}>
              <Checkbox.Value id={`${i}`} checked={checked[i]} onChange={this.item} />
              <Checkbox.Text>{`Option ${i + 1}`}</Checkbox.Text>
            </Checkbox>
          </div>
        ))}
      </>
    );
  }
}
