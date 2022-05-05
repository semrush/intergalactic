import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

import InputTags from '../src';

describe('InputTags', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const Сomponent = (props) => (
      <InputTags {...props}>
        {[1, 2, 3, 4].map((item) => (
          <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
        ))}
      </InputTags>
    );

    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 150 }}>
        <Сomponent size="m" />
        <Сomponent size="l" />
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
