import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, fireEvent, queryByAttribute } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Button from '../../button/src';
import Modal from '../src';

describe('modal Dependency imports', () => {
  runDependencyCheckTests('modal');
});

describe('Modal', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Modal,
    props: { visible: true },
    expectedDataUiName: 'Modal',
    preset: 'root',
  });

  runComponentContractTests({
    Component: Modal.Window,
    Wrapper: (props: any) => <Modal {...props} visible />,
    preset: [],
    include: ['className', 'ref'],
  });

  test.sequential('Verify onClose event for Escape', () => {
    const spy = vi.fn();
    const { getByTestId } = render(<Modal onClose={spy} data-testid='modal' visible />);
    fireEvent.keyDown(getByTestId('modal'), { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.anything());
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

    getByTestId('close-modal').click();
    await new Promise((r) => setTimeout(r, 50));
    expect(queryByText('Hello world')).toBeNull();
  });

  test.concurrent('Verify supports onClose for OutsideClick', async () => {
    const spy = vi.fn();
    const { baseElement } = render(
      <Modal onClose={spy} visible>
        <Modal.Overlay />
      </Modal>,
    );

    const overlayContentWrapper = queryByAttribute('data-ui-name', baseElement, 'Modal.Overlay.ContentWrapper');
    expect(overlayContentWrapper).not.toBeNull();

    fireEvent.mouseUp(overlayContentWrapper!);
    expect(spy).toBeCalledWith('onOutsideClick', expect.anything());
  });

  test.sequential('Verify supports render function for children', async () => {
    const component = <Modal visible>{() => <Modal.Overlay />}</Modal>;
    render(component);

    expect(
      document.querySelectorAll('[data-ui-name^="Modal"][data-ui-name$="Overlay"]').length,
    ).toBe(1);
  });

  test.sequential('Verify blocks global scroll when visible', async () => {
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
