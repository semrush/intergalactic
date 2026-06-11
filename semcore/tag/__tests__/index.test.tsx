import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import Tag, { TagContainer } from '../src';

describe('tag Dependency imports', () => {
  runDependencyCheckTests('tag');
});

describe('Tag', () => {
  beforeEach(cleanup);

  test('Verify works as Button from keyboard', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Tag interactive onClick={onClick} data-testid='tagAsButton'>
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

  test('Verify calls keydwon callback once per key down', async () => {
    const onKeyDown = vi.fn();
    const { getByTestId } = render(
      <Tag interactive onKeyDown={onKeyDown} data-testid='tagKeyboardTest'>
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
});

describe('TagContainer', () => {
  beforeEach(cleanup);

  test.sequential('Verify calls onClick', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <TagContainer>
        <TagContainer.Tag>
          <TagContainer.Tag.Text>Tag</TagContainer.Tag.Text>
        </TagContainer.Tag>
        <TagContainer.Close data-testid='close' onClick={onClick} />
      </TagContainer>,
    );

    const close = getByTestId('close');
    await userEvent.tab();
    expect(close).toHaveFocus();
    await userEvent.keyboard('[Space>]');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Verify not calls onClick with onKeydown', async () => {
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

    const close = getByTestId('close');
    await userEvent.tab();
    expect(close).toHaveFocus();
    await userEvent.keyboard('[Space>]');

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('Verify works as Button from keyboard', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <TagContainer>
        <TagContainer.Tag interactive onClick={onClick} data-testid='tagAsButton'>
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

  test('Verify calls keydwon callback once per key down', async () => {
    const onKeyDown = vi.fn();
    const { getByTestId } = render(
      <TagContainer>
        <TagContainer.Tag interactive onKeyDown={onKeyDown} data-testid='tagKeyboardTest'>
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
});
