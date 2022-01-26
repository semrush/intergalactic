import React from 'react';
import { cleanup, fireEvent, render, axe } from '@semcore/jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import Modal from '../src';

describe('Modal', () => {
  afterEach(cleanup);

  shouldSupportClassName(Modal.Window, (props) => <Modal {...props} visible />);
  shouldSupportRef(Modal.Window, (props) => <Modal {...props} visible />);

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Modal visible data-testid="modal" name="modal" />);

    expect(getByTestId('modal').attributes['name'].value).toBe('modal');
  });

  test('should support onClose for CloseIcons', () => {
    const spy = jest.fn();
    const { getByTitle } = render(<Modal onClose={spy} visible />);
    fireEvent.click(getByTitle('Close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test('should support onClose for OutsideClick', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Modal onClose={spy} visible>
        <Modal.Overlay data-testid="outside" />
      </Modal>,
    );
    fireEvent.mouseUp(getByTestId('outside'));
    expect(spy).toBeCalledWith('onOutsideClick', expect.anything());
  });

  test('should support onClose for Escape', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Modal onClose={spy} data-testid="modal" visible />);
    fireEvent.keyDown(getByTestId('modal'), { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.anything());
  });

  test('should support children', () => {
    const component = (
      <Modal visible>
        <p data-testid="child">Test</p>
      </Modal>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });

  test('should support render function for children', () => {
    const component = <Modal visible>{() => <Modal.Overlay />}</Modal>;
    render(component);

    expect(document.querySelectorAll('[data-ui-name="Modal.Overlay"]').length).toBe(1);
  });

  test('should block global scroll when visible', () => {
    const component = render(<Modal visible>Content</Modal>);
    expect(document.body).toHaveStyle('overflow: hidden');
    component.unmount();
    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  test('a11y', async () => {
    const { container } = render(
      <Modal visible disablePortal>
        <p data-testid="child">Test</p>
      </Modal>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
