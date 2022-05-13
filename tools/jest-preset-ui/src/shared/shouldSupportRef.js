const React = require('react');
const { render } = require('@testing-library/react');

module.exports = {
  shouldSupportRef: function shouldSupportRef(Component, Wrapper = React.Fragment, props = {}) {
    test('ref should return DOM-node', () => {
      const ref = React.createRef();

      render(
        <Wrapper>
          <Component {...props} ref={ref} />
        </Wrapper>,
      );

      expect(ref.current.nodeName).toBeDefined();
    });
  },
};
