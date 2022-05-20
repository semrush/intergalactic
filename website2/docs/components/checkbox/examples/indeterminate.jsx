import React from 'react';
import Checkbox from '@semcore/checkbox';

class Demo extends React.PureComponent {
  state = {
    checked: [false, false, false],
  };

  all = (checked) => {
    this.setState({
      checked: this.state.checked.map(() => checked),
    });
  };

  item = (checked, e) => {
    const { id } = e.currentTarget;

    this.setState({
      checked: this.state.checked.map((item, i) => {
        if (i === Number(id)) return !item;
        return item;
      }),
    });
  };

  indeterminate = (checked) => {
    return !!(checked.includes(true) && checked.indexOf(false) >= 0);
  };

  render() {
    const { checked } = this.state;

    return (
      <>
        <div>
          <Checkbox mb={2}>
            <Checkbox.Value
              onChange={this.all}
              indeterminate={this.indeterminate(checked)}
              checked={checked.indexOf(false) < 0}
            />
            <Checkbox.Text>All</Checkbox.Text>
          </Checkbox>
        </div>
        {checked.map((_, i) => (
          <div key={i}>
            <Checkbox mb={2}>
              <Checkbox.Value id={i} checked={checked[i]} onChange={this.item} />
              <Checkbox.Text>{`Пункт ${i + 1}`}</Checkbox.Text>
            </Checkbox>
          </div>
        ))}
      </>
    );
  }
}

export default Demo;
