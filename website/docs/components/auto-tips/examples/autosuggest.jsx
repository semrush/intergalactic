import React from 'react';
import Select from '@semcore/ui/select';
import Input from '@semcore/ui/input';

function setBoldWord(searchValue, value) {
  const title = {
    __html: value.toLowerCase(),
  };
  if (searchValue) {
    const re = new RegExp(searchValue.toLowerCase(), 'g');
    title.__html = title.__html.replace(
      re,
      `<span style="font-weight: bold; padding: 2px 0">${searchValue}</span>`,
    );
  }
  return <span dangerouslySetInnerHTML={title} />;
}

class Demo extends React.PureComponent {
  timer = null;
  state = { value: '', options: [] };
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
          value: item.value.replace(/.\w+$/g, ''),
          title: item.value.replace(/.\w+$/g, ''),
        }));
        if (!options.length && value.length > 0) {
          options = [
            {
              value: null,
              title: `Nothing found`,
            },
          ];
        }
        if (!value.length) {
          options = [];
        }
        this.setState({ options });
      })
      .catch(console.error);
  };
  handleSelect = (value) => {
    this.changeValue(value);
    this.debounceSend(value);
    return false;
  };
  componentWillUnmount() {
    this.timer = null;
  }
  render() {
    const { value, options } = this.state;

    return (
      <Select interaction="focus" onChange={this.handleSelect} value={null}>
        <Select.Trigger tag={Input}>
          {() => (
            <Input.Value
              value={value}
              placeholder="Type domain or URL"
              onChange={this.handleChange}
            />
          )}
        </Select.Trigger>
        {options.length > 0 && (
          <Select.Menu>
            {options.map((option, idx) => {
              const { value: optionValue, title } = option;
              return (
                <Select.Option value={optionValue} key={idx}>
                  {setBoldWord(value, title)}
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
