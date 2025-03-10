import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { render, cleanup, fireEvent, act } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Tooltip from '@semcore/tooltip';
import { axe } from '@semcore/testing-utils/axe';

import InputTags from '../src';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('input-tags Dependency imports', () => {
  runDependencyCheckTests('input-tags');
}); 

describe('InputTags', () => {
  beforeEach(cleanup);

  test.concurrent('renders different sizes', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 150 }}>
        <InputTags size='m'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
        </InputTags>
        <InputTags size='l'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
        </InputTags>
      </snapshot.ProxyProps>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('renders basic example', async ({ task }) => {
    const tags = ['vk', 'fk', 'twitter', 'instagram'];
    const Component = () => {
      return (
        <InputTags size='l'>
          {tags.map((tag, idx) => (
            <InputTags.Tag key={idx} theme='primary' editable data-id={idx}>
              <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
              <InputTags.Tag.Close />
            </InputTags.Tag>
          ))}
          <InputTags.Value />
        </InputTags>
      );
    };
    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test("renders url's example", async ({ task }) => {
    const isValidEmail = (value: string) => /.+@.+\..+/i.test(value.toLowerCase());

    const component = (
      <InputTags size='l'>
        {['bob_vk.com', 'wolf@instagram.dot'].map((tag, idx) => (
          <InputTags.Tag
            key={idx}
            style={{ textDecoration: !isValidEmail(tag) ? 'line-through' : 'none' }}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close data-id={idx} />
          </InputTags.Tag>
        ))}
        <InputTags.Value value='' />
      </InputTags>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('renders prop hMin', async ({ task }) => {
    const component = (
      <InputTags hMin={100}>
        {['bob_vk.com', 'wolf@instagram.dot'].map((tag, idx) => (
          <InputTags.Tag key={idx}>{tag}</InputTags.Tag>
        ))}
        <InputTags.Value value='' />
      </InputTags>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should call onClick', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <InputTags>
        <InputTags.Tag theme='primary' editable data-testid='tag' onClick={onClick}>
          <InputTags.Tag.Text>tag</InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>
        <InputTags.Value aria-label='input with tags' value='' />
      </InputTags>,
    );

    act(() => {
      fireEvent.keyDown(getByTestId('tag'), { key: 'Enter' });
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test.skip('a11y', async () => {
    vi.useFakeTimers();
    const { container } = render(
      <InputTags size='l'>
        {['vk', 'fk', 'twitter', 'instagram'].map((tag, idx) => (
          <InputTags.Tag theme='primary' editable data-id={idx} key={idx}>
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>
        ))}
        <InputTags.Value aria-label='input with tags' value='' />
      </InputTags>,
    );
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
