import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import propsForElement from '@semcore/utils/lib/propsForElement';
import Tag from '../src';

import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('Tag', () => {
  beforeEach(cleanup);

  const colors = [
    'gray-500',
    'blue-500',
    'green-500',
    'salad-500',
    'orange-500',
    'yellow-500',
    'red-500',
    'pink-500',
    'violet-500',
  ];
  const themes = ['primary', 'secondary'] as const;

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <Tag key={`${theme}-${color}`} theme={theme} color={color}>
          <Tag.Text>Tag name</Tag.Text>
          <Tag.Close />
        </Tag>
      )),
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders without focus ring when non interactive', async ({ task }) => {
    const component = (
      <Tag id='non-interactive-tag' keyboardFocused>
        <Tag.Text>Tag name</Tag.Text>
        <Tag.Close />
      </Tag>
    );
    await expect(
      await snapshot(component, {
        actions: {
          focus: '#non-interactive-tag',
        },
      }),
    ).toMatchImageSnapshot(task);
  });
  test.concurrent('Renders with focus ring when interactive', async ({ task }) => {
    const component = (
      <Tag id='interactive-tag' interactive>
        <Tag.Text keyboardFocused>Tag name</Tag.Text>
        <Tag.Close />
      </Tag>
    );
    await expect(
      await snapshot(component, {
        actions: {
          focus: '#interactive-tag',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with keyboardFocused', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <Tag key={`${theme}-${color}`} theme={theme} color={color} keyboardFocused interactive>
          <Tag.Text>Tag name</Tag.Text>
        </Tag>
      )),
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders text correctly with keyboardFocused', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <Tag key={`${theme}-${color}`} theme={theme} color={color} interactive>
          <Tag.Text keyboardFocused>Tag name</Tag.Text>
          <Tag.Close />
        </Tag>
      )),
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Addon and Text', async ({ task }) => {
    const component = (
      <Tag>
        <Tag.Addon id='hover'>Addon</Tag.Addon>
        <Tag.Text id='hover-1'>Test</Tag.Text>
        <Tag.Addon id='hover-3'>Addon</Tag.Addon>
      </Tag>
    );
    await expect(
      await snapshot(component, {
        actions: {
          hover: '#hover',
          focus: '#hover',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Addon as props', async ({ task }) => {
    const Addon = React.forwardRef<HTMLSpanElement>((props, ref) => {
      return (
        <span ref={ref} {...propsForElement(props)}>
          Addon prop
        </span>
      );
    });
    const component = (
      <Tag addonLeft={Addon} addonRight={Addon}>
        Test
      </Tag>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support disabled', async ({ task }) => {
    const component = (
      <Tag disabled>
        <Tag.Text>disabled</Tag.Text>
        <Tag.Close />
      </Tag>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <Tag key={`${theme}-${color}`} theme={theme} color={color} active>
          <Tag.Text>Tag name</Tag.Text>
          <Tag.Close />
        </Tag>
      )),
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size props', async ({ task }) => {
    const component = (['xl', 'l', 'm'] as const).map((size) => (
      <Tag size={size} key={size}>
        <Tag.Circle>
          <div style={{ width: 100, height: 100, background: 'black' }} />
        </Tag.Circle>
        <Tag.Text>{size}</Tag.Text>
        <Tag.Close />
      </Tag>
    ));

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support theme props', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <Tag key={`${theme}-${color}`} theme={theme} color={color}>
          <Tag.Text>Tag name</Tag.Text>
          <Tag.Close />
        </Tag>
      )),
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  // test.skip('should support custom theme', async ({ task }) => {
  //   const component = (
  //     <>
  //       <Tag theme={'blanchedalmond'}>
  //         <Tag.Text>blanchedalmond</Tag.Text>
  //         <Tag.Close />
  //       </Tag>
  //       <Tag theme='#3eeb4c'>
  //         <Tag.Text>#3eeb4c</Tag.Text>
  //         <Tag.Close />
  //       </Tag>
  //       <Tag theme='dark-violet'>
  //         <Tag.Text>dark-violet</Tag.Text>
  //         <Tag.Close />
  //       </Tag>
  //     </>
  //   );
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });

  // test.skip('should support color text', async ({ task }) => {
  //   const component = (
  //     <Tag theme='dark-violet' color='white'>
  //       dark-violet
  //     </Tag>
  //   );
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });

  test.concurrent('should display ellipsis if text is too long', async ({ task }) => {
    const component = <Tag w={80}>Lorem ipsum dolor sit amet</Tag>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should call onClick', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Tag>
        <Tag.Text>Tag</Tag.Text>
        <Tag.Close data-testid='close' onClick={onClick} />
      </Tag>,
    );

    fireEvent.keyDown(getByTestId('close'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('should not call onClick with onKeydown', async () => {
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Tag>
        <Tag.Text>Tag</Tag.Text>
        <Tag.Close data-testid='close' onClick={onClick} onKeyDown={onKeyDown} />
      </Tag>,
    );

    fireEvent.keyDown(getByTestId('close'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('should work as Button from keyboard', async ({ expect }) => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Tag interactive onClick={onClick} data-testid={'tagAsButton'}>
        some tag
      </Tag>,
    );
    const tag = getByTestId('tagAsButton');
    await userEvent.keyboard('[Tab]');

    expect(tag).toHaveFocus();

    await userEvent.keyboard('[Enter]');
    expect(onClick).toHaveBeenCalledTimes(1);

    await userEvent.keyboard('[Space]');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('should call keydwon callback once per key down', async ({ expect }) => {
    const onKeyDown = vi.fn();
    const { getByTestId } = render(
      <Tag interactive onKeyDown={onKeyDown} data-testid={'tagKeyboardTest'}>
        some tag
      </Tag>,
    );
    const tag = getByTestId('tagKeyboardTest');
    await userEvent.keyboard('[Tab]');

    expect(tag).toHaveFocus();

    await userEvent.keyboard('[Enter]');
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    await userEvent.keyboard('[Space]');
    expect(onKeyDown).toHaveBeenCalledTimes(2);
  });

  test('a11y', async () => {
    const { container } = render(
      <>
        <Tag theme='primary'>
          <Tag.Text>primary</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag>Test</Tag>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
