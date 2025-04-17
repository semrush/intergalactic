import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import Calendar from '@semcore/icon/Calendar/m';

import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Link from '../src';
import CheckM from '@semcore/icon/Check/m';
import EditXS from '@semcore/icon/Edit/m';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('link Dependency imports', () => {
  runDependencyCheckTests('link');
});

describe('Link', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Link, React.Fragment, { children: 'Link' });
  shouldSupportRef(Link, React.Fragment, { children: 'Link' });

  test.concurrent('Should support custom attributes', () => {
    const { getByTestId } = render(
      <Link data-testid='link' data-name='test'>
        Link
      </Link>,
    );
    expect((getByTestId('link').attributes as any)['data-name'].value).toBe('test');
  });

  test.concurrent('Should support children', async () => {
    const component = (
      <Link>
        <p data-testid='child'>Test</p>
      </Link>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test.concurrent('Should support additional elements', async ({ task }) => {
    const component = (
      <Link>
        <Link.Addon>ICON</Link.Addon>
        <Link.Text>Link</Link.Text>
        <Link.Addon>ICON</Link.Addon>
      </Link>
    );
    const { queryAllByText } = render(component);
    const additional = queryAllByText('ICON');

    expect(additional).toHaveLength(2);
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support additional elements as props', async ({ task }) => {
    const component = (
      <Link addonLeft={Calendar} addonRight={Calendar}>
        Text
      </Link>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support change tag name', () => {
    const { getByTestId } = render(
      <Link data-testid='link' tag='span'>
        Link
      </Link>,
    );
    expect(getByTestId('link').tagName).toBe('SPAN');
  });

  test.concurrent('Should support normal state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Link active>Link</Link>
        <Link active>
          <Link.Addon tag={Calendar} />
          <Link.Text>Link</Link.Text>
          <Link.Addon>
            <Calendar />
          </Link.Addon>
        </Link>
        <Link disabled>Link</Link>
        <Link id='focused'>Link</Link>
      </snapshot.ProxyProps>
    );

    await expect(
      await snapshot(component, { actions: { focus: '#focused' } }),
    ).toMatchImageSnapshot(task);
  });

  test.sequential('Should support inline property', () => {
    const { rerender, getByTestId } = render(<Link data-testid='link'>Link</Link>);
    expect(getByTestId('link').className).not.toContain('inline');
    rerender(
      <Link data-testid='link' inline>
        Link
      </Link>,
    );
    expect(getByTestId('link').className).toContain('inline');
  });

  test.concurrent('Should support ellipsis links with addon', async ({ task }) => {
    const component = (
      <div style={{ width: '66%' }}>
        <Link w='100%' wMin={0}>
          <Flex alignItems='center'>
            <Link.Text w='100%' inline noWrap>
              <Text w='100%' inline noWrap>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
                Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
                Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
              </Text>
            </Link.Text>
            <Link.Addon>
              <EditXS />
            </Link.Addon>
          </Flex>
        </Link>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support noWrap property', () => {
    const { rerender, getByTestId } = render(<Link data-testid='link'>Link</Link>);
    expect(getByTestId('link').className).contains('noWrap');
    rerender(
      <Link data-testid='link' noWrap={false}>
        Link
      </Link>,
    );
    expect(getByTestId('link').className).not.contains('noWrap');
  });

  test.concurrent(
    'Should support sizes',
    async ({ task }) => {
      const component = (
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Link size={100}>Link</Link>
          <Link size={200}>Link</Link>
          <Link size={300}>Link</Link>
          <Link size={400}>Link</Link>
          <Link size={500}>Link</Link>
          <Link size={600}>Link</Link>
          <Link size={700}>Link</Link>
          <Link size={800}>Link</Link>
        </snapshot.ProxyProps>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
    { timeout: 20_000 },
  );

  test.concurrent('Should support hover', async ({ task }) => {
    const component = <Link id='link'>Link</Link>;
    await expect(
      await snapshot(component, {
        actions: {
          hover: '#link',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom color', async ({ task }) => {
    const component = <Link color='salad-400'>Link</Link>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover custom color', async ({ task }) => {
    const component = (
      <Link id='link' color='salad-400'>
        Link
      </Link>
    );
    await expect(
      await snapshot(component, {
        actions: {
          hover: '#link',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with one Addon as props', async ({ task }) => {
    const component = <Link addonLeft={CheckM} aria-label='Check' />;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(<Link disabled>Link</Link>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
