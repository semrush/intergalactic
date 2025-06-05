import React from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render, userEvent } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import Modal from '../src';
import Button from '../../button/src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('modal Dependency imports', () => {
  runDependencyCheckTests('modal');
});

describe('Modal', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Modal.Window, (props: any) => <Modal {...props} visible />);
  shouldSupportRef(Modal.Window, (props: any) => <Modal {...props} visible />);

  test.concurrent('Verify supports custom attributes', () => {
    const { getByTestId } = render(<Modal visible data-testid='modal' data-name='modal' />);

    expect((getByTestId('modal').attributes as any)['data-name'].value).toBe('modal');
  });

  test.sequential('Verify supports onClose for CloseIcons', () => {
    const spy = vi.fn();
    const { getByTitle } = render(<Modal onClose={spy} visible />);
    fireEvent.click(getByTitle('Close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test.sequential('Verify mount on open', () => {
    const spy = vi.fn();
    const Component = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <React.Fragment>
          <Button onClick={() => setVisible(true)} data-testid='open-modal'>
            Open modal
          </Button>
          <Modal visible={visible} onClose={spy}>
            <div data-testid='modal-content'>Hello world</div>
          </Modal>
        </React.Fragment>
      );
    };
    const { getByTestId } = render(<Component />);
    fireEvent.click(getByTestId('open-modal'));
    expect(getByTestId('modal-content')).toBeTruthy();
  });

  test.sequential('Verify unmount on close', async () => {
    const spy = vi.fn();
    const Component = () => {
      const [visible, setVisible] = React.useState(true);
      return (
        <React.Fragment>
          <Button onClick={() => setVisible(true)} data-testid='open-modal'>
            Open modal
          </Button>
          <Modal visible={visible} onClose={spy} animationsDisabled>
            <div data-testid='modal-content'>Hello world</div>
            <Button onClick={() => setVisible(false)} data-testid='close-modal'>
              Close modal
            </Button>
          </Modal>
        </React.Fragment>
      );
    };
    const { getByTestId, queryByText } = render(<Component />);
    fireEvent.click(getByTestId('close-modal'));
    await new Promise((r) => setTimeout(r, 0));
    expect(queryByText('Hello world')).toBeNull();
  });

  test.concurrent('Verify supports onClose for OutsideClick', async ({ expect }) => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Modal onClose={spy} visible>
        <Modal.Overlay data-testid='outside' />
      </Modal>,
    );
    fireEvent.mouseUp(getByTestId('outside'));
    expect(spy).toBeCalledWith('onOutsideClick', expect.anything());
  });

  test.concurrent('Verify supports children', () => {
    const component = (
      <Modal visible>
        <p data-testid='child'>Test</p>
      </Modal>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });

  test.sequential('Verify supports render function for children', async ({ expect }) => {
    const component = <Modal visible>{() => <Modal.Overlay />}</Modal>;
    render(component);

    expect(
      document.querySelectorAll('[data-ui-name^="Modal"][data-ui-name$="Overlay"]').length,
    ).toBe(1);
  });

  test.sequential('Verify blocks global scroll when visible', async ({ expect }) => {
    const component = render(<Modal visible>Content</Modal>);
    expect(document.body).toHaveStyle('overflow: hidden');
    component.unmount();
    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  test.sequential('Verify default aria-label when no title is provided', () => {
    const { getByRole } = render(<Modal visible />);
    const dialog = getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Modal window');
  });
});
