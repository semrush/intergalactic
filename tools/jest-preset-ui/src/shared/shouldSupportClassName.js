const React = require('react');
const { render } = require('@testing-library/react');

module.exports = {
  shouldSupportClassName: function shouldSupportClassName(
    Component,
    Wrapper = React.Fragment,
    props = {},
  ) {
    test('should support className extending', () => {
      const className = 'more-then one-class';

      const { getByTestId } = render(
        <Wrapper>
          <Component data-testid="component" {...props} className={className} />
        </Wrapper>,
      );

      expect(getByTestId('component').attributes.class.value).toContain(className);
    });
  },
};
