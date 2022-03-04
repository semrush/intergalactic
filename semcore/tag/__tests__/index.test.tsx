import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import propsForElement from '@semcore/utils/lib/propsForElement';
import Tag from '../src';

const { cleanup } = testing;

describe('Tag', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Tag>Tag</Tag>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with Addon and Text', async () => {
    const component = (
      <Tag>
        <Tag.Addon>Addon</Tag.Addon>
        <Tag.Text>Test</Tag.Text>
        <Tag.Addon>Addon</Tag.Addon>
      </Tag>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
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
    const component = (
      <div style={{ background: '#979797' }}>
        <Tag use="primary" active>
          <Tag.Text>primary+muted</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag use="primary" theme="invert" active>
          <Tag.Text>primary+invert</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag use="secondary" active>
          <Tag.Text>secondary+muted</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag use="secondary" theme="invert" active>
          <Tag.Text>secondary+invert</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag theme="dark-violet" color="white">
          <Tag.Text>dark-violet+white</Tag.Text>
          <Tag.Close />
        </Tag>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size props', async () => {
    const component = (
      <>
        <Tag size="xl">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>xl</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size="l">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>l</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size="m">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>m</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size="s">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>s</Tag.Text>
          <Tag.Close />
        </Tag>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support use-theme props', async () => {
    const component = (
      <div style={{ background: '#979797' }}>
        <Tag use="primary">
          <Tag.Text>primary+muted</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag use="primary" theme="invert">
          <Tag.Text>primary+invert</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag use="primary" theme="warning">
          <Tag.Text>primary+warning</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag use="secondary">
          <Tag.Text>secondary+muted</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag use="secondary" theme="invert">
          <Tag.Text>secondary+invert</Tag.Text>
          <Tag.Close />
        </Tag>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support custom theme', async () => {
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

  test('should support color text', async () => {
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
});
