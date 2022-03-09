import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  list: {
    margin: '0px',
    padding: '0px',
    listStyle: 'none',
  },
  title: {
    display: 'block',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    lineHeight: '1.4em',
    fontWeight: 'normal',
    margin: '20px 10px 10px',
    padding: '0px 0px 10px',
    borderBottom: '1px solid rgba(255, 255, 255, .2)',
  },
  subtitle: {
    fontSize: '15px',
    borderBottom: 'none',
    padding: '0px',
    margin: '20px 10px 10px',
  },
  item: {
    display: 'block',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    lineHeight: '1.2em',
    fontWeight: 'normal',
    margin: 0,
    padding: '2px 10px',
    cursor: 'pointer',
  },
  itemSelect: {
    color: '#6FFFFD',
    fontWeight: 'bold',
  },
};

class Demo extends React.Component {
  static contextTypes = {
    playground: PropTypes.object,
  };

  static propTypes = {
    defaultExample: PropTypes.string,
    list: PropTypes.object,
  };

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      selected: props.defaultExample,
    };
  }

  handleClick = (category, key) => {
    key = category + key;
    this.context.playground.showExample(key);
    this.setState({ selected: key });
  };

  handleKeyDown = (e, path, prop) => {
    if (![32, 13].includes(e.keyCode)) return;
    e.preventDefault();
    this.handleClick(path, prop);
  };

  render() {
    return <ul className="examples">{this.renderItem(this.props.list)}</ul>;
  }

  renderItem(list) {
    return Object.keys(list).map((prop) => {
      const path = '/examples/';
      const selected = path + prop === this.state.selected;
      return (
        <li className="examples__item" key={prop}>
          <a
            tabIndex={0}
            key={path}
            className={`examples__link ${selected && 'examples__link--selected'}`}
            onClick={() => this.handleClick(path, prop)}
            onKeyDown={(e) => this.handleKeyDown(e, path, prop)}
          >
            {prop}
          </a>
        </li>
      );
    });
  }
}

export default Demo;
