import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import propsForElement from '@semcore/utils/lib/propsForElement';
import Tag from '../src';

const { axe, render, fireEvent, cleanup } = testing;

describe('Tag', () => {
  afterEach(cleanup);

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
  const themes = ['primary', 'secondary'];

  test('Renders correctly', async () => {
    const component = <Tag>Tag</Tag>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with Addon and Text', async () => {
    const component = (
      <Tag>
        <Tag.Addon id="hover">Addon</Tag.Addon>
        <Tag.Text id="hover-1">Test</Tag.Text>
        <Tag.Addon id="hover-3">Addon</Tag.Addon>
      </Tag>
    );
    expect(
      await snapshot(component, {
        actions: {
          hover: ['#hover', '#hover-1', '#hoveer-3'],
          focus: ['#hover', '#hover-1', '#hoveer-3'],
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Renders correctly with Addon as props', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support disabled', async () => {
    const component = (
      <Tag disabled>
        <Tag.Text>disabled</Tag.Text>
        <Tag.Close />
      </Tag>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support active', async () => {
    const component = themes
      .map((theme) =>
        colors.map((color) => (
          <Tag key={`${theme}-${color}`} theme={theme} color={color} active>
            <Tag.Text>Tag name</Tag.Text>
            <Tag.Close />
          </Tag>
        )),
      )
      .flat();

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size props', async () => {
    const component = ['xl', 'l', 'm'].map((size) => (
      <Tag size={size} key={size}>
        <Tag.Circle>
          <div style={{ width: 100, height: 100, background: 'black' }} />
        </Tag.Circle>
        <Tag.Text>{size}</Tag.Text>
        <Tag.Close />
      </Tag>
    ));

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support theme props', async () => {
    const component = themes
      .map((theme) =>
        colors.map((color) => (
          <Tag key={`${theme}-${color}`} theme={theme} color={color}>
            <Tag.Text>Tag name</Tag.Text>
            <Tag.Close />
          </Tag>
        )),
      )
      .flat();
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  xtest('should support custom theme', async () => {
    const component = (
      <>
        <Tag theme="blanchedalmond">
          <Tag.Text>blanchedalmond</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag theme="#3eeb4c">
          <Tag.Text>#3eeb4c</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag theme="dark-violet">
          <Tag.Text>dark-violet</Tag.Text>
          <Tag.Close />
        </Tag>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  xtest('should support color text', async () => {
    const component = (
      <Tag theme="dark-violet" color="white">
        dark-violet
      </Tag>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should display ellipsis if text is too long', async () => {
    const component = <Tag w={80}>Lorem ipsum dolor sit amet</Tag>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should call onClick', async () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Tag>
        <Tag.Text>Tag</Tag.Text>
        <Tag.Close data-testid="close" onClick={onClick} />
      </Tag>,
    );

    fireEvent.keyDown(getByTestId('close'), { code: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('should not call onClick with onKeydown', async () => {
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Tag>
        <Tag.Text>Tag</Tag.Text>
        <Tag.Close data-testid="close" onClick={onClick} onKeyDown={onKeyDown} />
      </Tag>,
    );

    fireEvent.keyDown(getByTestId('close'), { code: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('a11y', async () => {
    const { container } = render(
      <>
        <Tag theme="green-500">
          <Tag.Text>green-500</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag>Test</Tag>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
