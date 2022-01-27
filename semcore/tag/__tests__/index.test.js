import React from 'react';
import { cleanup, fireEvent, render } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import propsForElement from '@semcore/utils/lib/propsForElement';
import Tag from '../src';

describe('Tag', () => {
  afterEach(cleanup);

  shouldSupportClassName(Tag);
  shouldSupportRef(Tag);

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Tag data-testid="tag" name="tag" />);

    expect(getByTestId('tag').attributes['name'].value).toBe('tag');
  });

  test('should support children', async () => {
    const component = (
      <Tag use="primary">
        <Tag.Text data-testid="child">Test</Tag.Text>
      </Tag>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support Close icon', async () => {
    const component = (
      <Tag data-testid="tag" use="primary">
        <Tag.Text>Tag</Tag.Text>
        <Tag.Close />
      </Tag>
    );
    const { queryByTestId } = render(component);
    expect(queryByTestId('tag').querySelectorAll('[data-ui-name*="Tag.Close"]')).toHaveLength(1);

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support mouse click Close icon', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Tag>
        <Tag.Close data-testid="tag" onClick={spy} />
      </Tag>,
    );
    fireEvent.click(getByTestId('tag'));

    expect(spy).toBeCalled();
  });

  test('should support size props', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Tag size="xl">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size="l">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size="m">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size="s">
          <Tag.Circle>
            <div style={{ width: 100, height: 100, background: 'black' }} />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support theme props', async () => {
    const component = (
      <div style={{ background: 'black' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Tag use="primary">
            <Tag.Text>Tag</Tag.Text>
          </Tag>
          <Tag use="primary" theme="invert">
            <Tag.Text>Tag</Tag.Text>
          </Tag>
          <Tag use="primary" theme="warning">
            <Tag.Text>Tag</Tag.Text>
          </Tag>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Tag use="secondary">
            <Tag.Text>Tag</Tag.Text>
          </Tag>
          <Tag use="secondary" theme="invert">
            <Tag.Text>Tag</Tag.Text>
          </Tag>
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support addon elements', async () => {
    const Addon = React.forwardRef(function(props, ref) {
      return (
        <span ref={ref} {...propsForElement(props)}>
          Addon prop
        </span>
      );
    });
    const component = (
      <div>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Tag use="primary" addonLeft={Addon} addonRight={Addon}>
            Tag
          </Tag>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Tag use="primary">
            <Tag.Addon tag={Addon} />
            <Tag.Text>Tag</Tag.Text>
            <Tag.Addon tag={Addon} />
          </Tag>
        </snapshot.ProxyProps>
        <br />
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Tag use="primary">
            <Tag.Circle>
              <div style={{ width: 100, height: 100, background: 'black' }} />
            </Tag.Circle>
            <Tag.Text>Tag</Tag.Text>
          </Tag>
        </snapshot.ProxyProps>
      </div>
    );

    const { queryAllByText } = render(component);
    const additional = queryAllByText('Addon prop');

    expect(additional).toHaveLength(4);
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support change tag name', () => {
    const { getByTestId } = render(<Tag data-testid="link" tag="span" />);
    expect(getByTestId('link').tagName).toBe('SPAN');
  });
});
