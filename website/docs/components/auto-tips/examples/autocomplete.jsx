import React from 'react';
import Select from '@semcore/select';
import Input from '@semcore/input';

function setUnderlineWord(searchValue, value) {
  const re = new RegExp(searchValue.toLowerCase(), 'g');
  const title = {
    __html: value
      .toLowerCase()
      .replace(
        re,
        `<span style="text-decoration: underline; padding: 2px 0">${searchValue}</span>`,
      ),
  };

  return <h3 dangerouslySetInnerHTML={title} />;
}

class Demo extends React.PureComponent {
  timer = null;
  state = { value: null, options: [] };
  changeValue = (value) => this.setState({ value });
  handleChange = (value) => {
    this.changeValue(value);
    this.debounceSend(value);
  };

  debounceSend = (value) => {
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.timer = null;
        this.sendData(value);
      }, 250);
    }
  };

  sendData = (value) => {
    fetch(`https://suggestions.semrush.com/?type=domain&q=${value}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let options = json.results.map((item) => ({
          value: item.value,
          title: item.value,
        }));

        if (!value.length) {
          options = [];
        }
        this.setState({ options });
      })
      .catch(console.error);
  };

  componentWillUnmount() {
    this.timer = null;
  }

  render() {
    const { value, options } = this.state;
    return (
      <Select interaction="focus" value={value} onChange={this.changeValue}>
        <Select.Trigger tag={Input}>
          {() => (
            <Input.Value
              value={value || ''}
              placeholder="Type domain or URL"
              onChange={this.handleChange}
            />
          )}
        </Select.Trigger>
        {options.length > 0 && value && (
          <Select.Menu>
            {options.map((option, idx) => {
              const { value: valueOption, title } = option;
              return (
                <Select.Option value={valueOption} key={idx}>
                  {setUnderlineWord(value, title)}
                </Select.Option>
              );
            })}
          </Select.Menu>
        )}
      </Select>
    );
  }
}

export default Demo;
