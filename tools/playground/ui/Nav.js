import * as React from 'react';
import examples from 'examples-loader!examples';
import Demo from './Demo';

class Nav extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      example: null,
    };
  }

  render() {
    let list = {};
    for (let prop in examples) {
      if (examples.hasOwnProperty(prop)) {
        let path = prop.replace(/^\/examples\//, '').split('/');
        path.forEach((item, index) => {
          if (index === path.length - 1) list[item] = examples[prop].default;
          else if (typeof list[item] === 'undefined') list[item] = {};
        });
      }
    }

    return (
      <nav>
        <Demo defaultExample={this.props.defaultExample} list={list} />
      </nav>
    );
  }
}

export default Nav;
