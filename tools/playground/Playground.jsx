import React from 'react';
import PropTypes from 'prop-types';
import examples from 'examples-loader!examples';
import Nav from './ui/Nav';
import ErrorBoundary from './ui/ErrorBoundary';

class Playground extends React.Component {
  static childContextTypes = {
    playground: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      example: null,
    };
    this.loadState(false);
  }

  loadState(mounted = true) {
    try {
      const state = JSON.parse(localStorage['playground']);
      if (mounted) this.setState(state);
      else this.state = { ...this.state, ...state };
    } catch (err) {}
  }

  persistState() {
    localStorage['playground'] = JSON.stringify(this.state);
  }

  getChildContext() {
    return {
      playground: this,
    };
  }

  componentDidUpdate() {
    this.persistState();
  }

  showExample = (example) => {
    this.setState({ example: example });
  };

  render() {
    let example = 'DEMO NOT FOUND 🤷‍♂️';

    if (this.state.example) {
      const Example = examples[this.state.example];
      if (Example && Example.default) {
        example = (
          <ErrorBoundary example={this.state.example}>
            <Example.default />
          </ErrorBoundary>
        );
      }
    }

    return (
      <>
        <header className="header">
          <div className="header__logo">
            <img
              className="header__icon"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABpFBMVEX///////////////+hrs3///9GX53////////d4e39/f6+x93c4e1QaKKWpccoRY21v9iyvNZGX54xUJlsgLHr7vT4+v/Z4/7F1f3S3v7z9v/W3/Zuk/DV4Prj6/6GqPtTg/lMfflRgfl2nPrT3/7V4P5Rgfplj/qsw/zU4P7V4f6xxvxrlPpijvtmkPhRgvpJe/lHevlnkfre5/5Ie/lJfPlSgvlLffmOrPiNoM1whrpph9FRgPZKfPmVsvvj6v5biPpmkPyjs9lNZZ/X3Ommss9SeNhLfftJe/pwl/p9ofttlvyVps4/WZnT2eiZpsdOc85Ke/c9a+B2nPnD0/1QgPlKfftTg/uiuO9acac8VpZQaqxXgeg5ZtYuVbapwPf6+/+duf1OgPtHePI+bN9BcedYhfaHpvR+m+ZXetE1X8gjSadxjdPw9P7W3e5UdccgRaAYOYkZOo0uWL9JfPs+buc5YsiEoOjr8f+dqsskQYoUM4EVNYIuTJVSedxdivtokvqKq/zH1//3+PvK0eOlsc+otNHZ3+3p7//m7f7w9P/8/f/sDeMcAAAACHRSTlMMe+f25eX+/lyg/ZEAAAABYktHRACIBR1IAAAAB3RJTUUH4gsTCiUUXZpYBQAAAN1JREFUGNNjYGBk4oADJkYGBkZmDiTAzMjAwsnFzYMQYWVg4+XjF0AIsDMICgmLiIKYYuISklIcHAwc0jKyIL6cvIKikrIKUEBVTV1DU0tbR1dP38DQyJiBQ0XJxNTMzNzC0sraxtbAjoHD3sHA1tbE0cnZxdXN3cOTgUPMyxAo4O3j6+cfEBgUzMDBERJqYBsWHhEZFR0TGxcPFEhITEpOSU1Lz8jMys7JZWDn4MjLLygsKjYsKS0rr2BnYOXgqKyqrqmtq29obBIDOh3oueaW1rb2js6ubrDn0L0PAGboK9xB1119AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTExLTE5VDEwOjM3OjIwKzAxOjAwN8r7WgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMS0xOVQxMDozNzoyMCswMTowMEaXQ+YAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII="
              alt="ui-whale"
            />
            <h1 className="header__title">UI-kit playground</h1>
          </div>
          <Nav defaultExample={this.state.example} />
        </header>
        <div className="example">{example}</div>
      </>
    );
  }
}

export default Playground;
