import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import Tag, { TagContainer } from '../src';

import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('tag Dependency imports', () => {
  runDependencyCheckTests('tag');
});

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
        </Tag>
      )),
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders without focus ring when non interactive', async ({ task }) => {
    const component = (
      <Tag id='non-interactive-tag'>
        <Tag.Text>Tag name</Tag.Text>
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

  test.concurrent('Renders correctly with keyboardFocused', async ({ task }) => {
    const component = (
      <Tag interactive id={'interactive-tag'}>
        <Tag.Text>Tag name</Tag.Text>
      </Tag>
    );

    await expect(
      await snapshot(component, { actions: { focus: '#interactive-tag' } }),
    ).toMatchImageSnapshot(task);
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
      </Tag>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <Tag key={`${theme}-${color}`} theme={theme} color={color} active>
          <Tag.Text>Tag name</Tag.Text>
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
      </Tag>
    ));

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support theme props', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <Tag key={`${theme}-${color}`} theme={theme} color={color}>
          <Tag.Text>Tag name</Tag.Text>
        </Tag>
      )),
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should display ellipsis if text is too long', async ({ task }) => {
    const component = <Tag w={80}>Lorem ipsum dolor sit amet</Tag>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
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
        </Tag>
        <Tag>Test</Tag>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('TagContainer', () => {
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
        <TagContainer key={`${theme}-${color}`} theme={theme} color={color}>
          <TagContainer.Tag>
            <TagContainer.Tag.Text>Tag name</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
      )),
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders without focus ring when non interactive', async ({ task }) => {
    const component = (
      <TagContainer>
        <TagContainer.Tag id='non-interactive-tag'>
          <TagContainer.Tag.Text>Tag name</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close />
      </TagContainer>
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
      <TagContainer>
        <TagContainer.Tag id='interactive-tag' interactive>
          <TagContainer.Tag.Text>Tag name</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close />
      </TagContainer>
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
    const theme = themes[0];
    const color = colors[0];
    const component = (
      <TagContainer key={`${theme}-${color}`} theme={theme} color={color}>
        <TagContainer.Tag id='focused-interactive' interactive>
          <TagContainer.Tag.Text>Tag name</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close />
      </TagContainer>
    );

    await expect(
      await snapshot(component, { actions: { focus: '#focused-interactive' } }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders text correctly with focused close button', async ({ task }) => {
    const component = (
      <TagContainer>
        <TagContainer.Tag>
          <TagContainer.Tag.Text>Tag name</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close id='focused_close1' />
      </TagContainer>
    );

    await expect(
      await snapshot(component, {
        actions: {
          focus: '#focused_close1',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Addon and Text', async ({ task }) => {
    const component = (
      <TagContainer>
        <TagContainer.Tag>
          <TagContainer.Tag.Addon id='hover'>Addon</TagContainer.Tag.Addon>
          <TagContainer.Tag.Text id='hover-1'>Test</TagContainer.Tag.Text>
          <TagContainer.Tag.Addon id='hover-3'>Addon</TagContainer.Tag.Addon>
        </TagContainer.Tag>
      </TagContainer>
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
      <TagContainer>
        <TagContainer.Tag addonLeft={Addon} addonRight={Addon}>
          Test
        </TagContainer.Tag>
      </TagContainer>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support disabled full tag', async ({ task }) => {
    const component = (
      <TagContainer disabled>
        <TagContainer.Tag>
          <TagContainer.Tag.Text>disabled</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close />
      </TagContainer>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support disabled tag content only', async ({ task }) => {
    const component = (
      <TagContainer>
        <TagContainer.Tag disabled>
          <TagContainer.Tag.Text>disabled</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close />
      </TagContainer>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support disabled close only', async ({ task }) => {
    const component = (
      <TagContainer>
        <TagContainer.Tag>
          <TagContainer.Tag.Text>enabled</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close disabled />
      </TagContainer>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <TagContainer key={`${theme}-${color}`} theme={theme} color={color} active>
          <TagContainer.Tag>
            <TagContainer.Tag.Text>Tag name</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
      )),
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size props', async ({ task }) => {
    const component = (['xl', 'l', 'm'] as const).map((size) => (
      <TagContainer size={size} key={size}>
        <TagContainer.Tag>
          <TagContainer.Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </TagContainer.Tag.Circle>
          <TagContainer.Tag.Text>{size}</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close />
      </TagContainer>
    ));

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support theme props', async ({ task }) => {
    const component = themes.flatMap((theme) =>
      colors.map((color) => (
        <TagContainer key={`${theme}-${color}`} theme={theme} color={color}>
          <TagContainer.Tag>
            <TagContainer.Tag.Text>Tag name</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
      )),
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should display ellipsis if text is too long', async ({ task }) => {
    const component = (
      <TagContainer>
        <TagContainer.Tag w={80}>Lorem ipsum dolor sit amet</TagContainer.Tag>
        <TagContainer.Close />
      </TagContainer>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should call onClick', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <TagContainer>
        <TagContainer.Tag>
          <TagContainer.Tag.Text>Tag</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close data-testid='close' onClick={onClick} />
      </TagContainer>,
    );

    fireEvent.keyDown(getByTestId('close'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('should not call onClick with onKeydown', async () => {
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const { getByTestId } = render(
      <TagContainer>
        <TagContainer.Tag>
          <TagContainer.Tag.Text>Tag</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close data-testid='close' onClick={onClick} onKeyDown={onKeyDown} />
      </TagContainer>,
    );

    fireEvent.keyDown(getByTestId('close'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('should work as Button from keyboard', async ({ expect }) => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <TagContainer>
        <TagContainer.Tag interactive onClick={onClick} data-testid={'tagAsButton'}>
          some tag
        </TagContainer.Tag>
      </TagContainer>,
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
      <TagContainer>
        <TagContainer.Tag interactive onKeyDown={onKeyDown} data-testid={'tagKeyboardTest'}>
          some tag
        </TagContainer.Tag>
      </TagContainer>,
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
        <TagContainer>
          <TagContainer.Tag theme='primary'>
            <TagContainer.Tag.Text>primary</TagContainer.Tag.Text>
            <TagContainer.Close />
          </TagContainer.Tag>
        </TagContainer>
        <TagContainer>
          <Tag>Test</Tag>
        </TagContainer>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
