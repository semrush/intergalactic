const React = require('react');
const { render } = require('@testing-library/react');

module.exports = {
  shouldSupportRef: function shouldSupportRef(Component, WrapperComponent) {
    test('ref should return DOM-node', () => {
      const ref = React.createRef();
      const Wrapper = WrapperComponent || React.Fragment;

      render(
        <Wrapper>
          <Component ref={ref} />
        </Wrapper>,
      );

      expect(ref.current.nodeName).toBeDefined();
    });
  },
};
