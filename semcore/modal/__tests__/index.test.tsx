import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

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

  test.concurrent('should support custom attributes', () => {
    const { getByTestId } = render(<Modal visible data-testid='modal' data-name='modal' />);

    expect((getByTestId('modal').attributes as any)['data-name'].value).toBe('modal');
  });

  test.sequential('should support onClose for CloseIcons', () => {
    const spy = vi.fn();
    const { getByTitle } = render(<Modal onClose={spy} visible />);
    fireEvent.click(getByTitle('Close'));
    expect(spy).toBeCalledWith('onCloseClick', expect.anything());
  });

  test.sequential('should mount on open', () => {
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

  test.sequential('should unmount on close', async () => {
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

  test.concurrent('should support onClose for OutsideClick', async ({ expect }) => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Modal onClose={spy} visible>
        <Modal.Overlay data-testid='outside' />
      </Modal>,
    );
    fireEvent.mouseUp(getByTestId('outside'));
    expect(spy).toBeCalledWith('onOutsideClick', expect.anything());
  });

  test.sequential('should support onClose for Escape', () => {
    const spy = vi.fn();
    const { getByTestId } = render(<Modal onClose={spy} data-testid='modal' visible />);
    fireEvent.keyDown(getByTestId('modal'), { key: 'Escape' });
    expect(spy).toBeCalledWith('onEscape', expect.anything());
  });

  test.concurrent('should support children', () => {
    const component = (
      <Modal visible>
        <p data-testid='child'>Test</p>
      </Modal>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });

  test.sequential('should support render function for children', async ({ expect }) => {
    const component = <Modal visible>{() => <Modal.Overlay />}</Modal>;
    render(component);

    expect(
      document.querySelectorAll('[data-ui-name^="Modal"][data-ui-name$="Overlay"]').length,
    ).toBe(1);
  });

  test.sequential('should block global scroll when visible', async ({ expect }) => {
    const component = render(<Modal visible>Content</Modal>);
    expect(document.body).toHaveStyle('overflow: hidden');
    component.unmount();
    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  test.concurrent('Should render correctly', async ({ expect, task }) => {
    const component = (
      <Modal disablePortal visible>
        Test
      </Modal>
    );

    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support closable prop', async ({ task }) => {
    const component = (
      <Modal closable={false} disablePortal visible>
        Test
      </Modal>
    );

    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover close icon', async ({ task }) => {
    const component = (
      <Modal closable={false} disablePortal visible>
        Test
        <Modal.Close id='icon' />
      </Modal>
    );

    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 300,
        height: 300,
        actions: {
          hover: '#icon',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test('Should support nested modal', async ({ task }) => {
    const component = (
      <Modal disablePortal visible>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam atque doloribus eius
        est harum impedit in inventore iusto magnam molestias nesciunt nobis perferendis, quia sit.
        Excepturi itaque officiis ullam?
        <Modal disablePortal visible>
          Test nested
        </Modal>
      </Modal>
    );

    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 300,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support small viewport', async ({ task }) => {
    const component = (
      <Modal disablePortal visible>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque facilis laudantium nam
        officiis ratione saepe. Asperiores atque eius enim error fuga impedit laudantium maxime
        nulla quae quidem. Consequatur, dolorum, ducimus!
      </Modal>
    );

    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 300,
        height: 400,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support big viewport', async ({ task }) => {
    const component = (
      <Modal disablePortal visible>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque facilis laudantium nam
        officiis ratione saepe. Asperiores atque eius enim error fuga impedit laudantium maxime
        nulla quae quidem. Consequatur, dolorum, ducimus!
      </Modal>
    );

    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 800,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom title color', async ({ task }) => {
    const component = (
      <Modal disablePortal visible>
        <Modal.Title color='text-critical'>Do you want to save your changes?</Modal.Title>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque facilis laudantium nam
        officiis ratione saepe. Asperiores atque eius enim error fuga impedit laudantium maxime
        nulla quae quidem. Consequatur, dolorum, ducimus!
      </Modal>
    );

    await expect(
      await snapshot(component, {
        selector: 'body',
        width: 800,
        height: 300,
      }),
    ).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(
      <Modal visible disablePortal>
        <p data-testid='child'>Test</p>
      </Modal>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Should support correct focusing inside modals in forward and reverse "tabs"', async ({
    expect,
  }) => {
    const { getByTestId } = render(
      <Modal visible={true} data-testid={'Modal'}>
        <Modal.Title>Do you want to save your changes?</Modal.Title>

        <Button use='primary' theme='success' size='l' data-testid={'SaveChangesButton'}>
          Save changes
        </Button>
        <Button size='l' ml={2} data-testid={'CancelButton'}>
          Don't save
        </Button>
      </Modal>,
    );

    const SaveButton = getByTestId('SaveChangesButton');
    const CancelButton = getByTestId('CancelButton');
    const CloseButton = getByTestId('Modal').children[0];

    await userEvent.keyboard('[Tab]');
    expect(SaveButton).toHaveFocus();

    await userEvent.keyboard('[Tab]');
    expect(CancelButton).toHaveFocus();

    await userEvent.keyboard('[Tab]');
    expect(CloseButton).toHaveFocus();

    await userEvent.keyboard('[Tab]');
    expect(SaveButton).toHaveFocus();

    await userEvent.keyboard('{Shift>}[Tab]');
    expect(CloseButton).toHaveFocus();

    await userEvent.keyboard('{Shift>}[Tab]');
    expect(CancelButton).toHaveFocus();
  });

  test('Should support correct returning focus to trigger if Modal removing from DOM', async ({
    expect,
  }) => {
    const ExternalModalComponent = ({ onClose }: any) => {
      const [visible, setVisible] = React.useState(true);
      const handleClose = React.useCallback(() => {
        onClose();

        setVisible(false);
      }, [onClose]);

      return (
        <Modal visible={visible} onClose={handleClose}>
          <Modal.Title data-testid={'modalTitle'}>Do you want to save your changes?</Modal.Title>
          <Button use='primary' theme='success' size='l' onClick={handleClose}>
            Save changes
          </Button>
          <Button size='l' ml={2} onClick={handleClose}>
            Don't save
          </Button>
        </Modal>
      );
    };

    const Component = () => {
      const [visible, setVisible] = React.useState(false);
      const handleOpen = React.useCallback(() => setVisible(true), []);

      return (
        <React.Fragment>
          <Button onClick={handleOpen} data-testid={'openModalButton'} autoFocus>
            Open modal dynamically
          </Button>

          {visible ? <ExternalModalComponent onClose={() => setVisible(false)} /> : undefined}
        </React.Fragment>
      );
    };

    const { getByTestId, getByText } = render(<Component />);

    expect(getByTestId('openModalButton')).toHaveFocus();

    await userEvent.keyboard('[Enter]');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(getByText('Do you want to save your changes?')).toBeTruthy();

    await userEvent.keyboard('[Escape]');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(getByTestId('openModalButton')).toHaveFocus();
  });
});
