import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import FormatText from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('format-text Dependency imports', () => {
  runDependencyCheckTests('format-text');
});

describe('FormatText', () => {
  beforeEach(cleanup);

  shouldSupportClassName(FormatText);
  shouldSupportRef(FormatText);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <FormatText>
        <strong>strong</strong>
        <br />
        <em>em element</em>
        <br />
        <s>s element</s>
        <br />
        <abbr>abbr element</abbr>
        <br />
        <a href='/'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae cum cumque dolor dolore
          doloribus ducimus est, et exercitationem in laboriosam maiores molestiae mollitia
          perferendis quisquam repellat saepe soluta, vero vitae.
        </a>
        <br />
        <blockquote>
          Not the great one who is not great, but the great one who is great.
          <cite>- The Great Sage</cite>
        </blockquote>
        <h1>test</h1>
        <h1>
          test <small>small</small>
        </h1>
        <h2>test</h2>
        <h2>
          test <small>small</small>
        </h2>
        <h3>test</h3>
        <h3>
          test <small>small</small>
        </h3>
        <h4>test</h4>
        <h4>
          test <small>small</small>
        </h4>
        <h5>test</h5>
        <h5>
          test <small>small</small>
        </h5>
        <h6>test</h6>
        <h6>
          test <small>small</small>
        </h6>
        <ul>
          <li>doggo 1</li>
          <li>doggo 2</li>
          <li>doggo 3</li>
        </ul>
        <ol>
          <li>doggo</li>
          <li>doggo</li>
          <li>doggo</li>
        </ol>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci, atque, autem
          eveniet fugiat incidunt laudantium maiores minus molestias necessitatibus neque obcaecati
          perferendis possimus quibusdam rerum sequi tenetur ut voluptas?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci, atque, autem
          eveniet fugiat incidunt laudantium maiores minus molestias necessitatibus neque obcaecati
          perferendis possimus quibusdam rerum sequi tenetur ut voluptas?
        </p>
      </FormatText>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Lists support sizes', async ({ task }) => {
    const Inner = () => (
      <>
        <ul>
          <li>doggo</li>
          <li>doggo</li>
          <li>
            doggo
            <ul>
              <li>doggo</li>
              <li>doggo</li>
              <li>doggo</li>
            </ul>
          </li>
        </ul>
        <ol>
          <li>doggo</li>
          <li>doggo</li>
          <li>
            doggo
            <ol>
              <li>doggo</li>
              <li>doggo</li>
              <li>
                <ol>
                  <li>doggo</li>
                  <li>doggo</li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </>
    );
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <FormatText size='s'>
          <Inner />
        </FormatText>
        <FormatText size='m'>
          <Inner />
        </FormatText>
        <FormatText size='l'>
          <Inner />
        </FormatText>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Paragraphs supports sizes', async ({ task }) => {
    const Inner = () => (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, molestiae, ut!
          Accusantium aliquam architecto consequuntur debitis delectus, dolorem, eaque
          exercitationem explicabo illum inventore modi nam optio quae, rerum similique voluptatem.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, molestiae, ut!
          Accusantium aliquam architecto consequuntur debitis delectus, dolorem, eaque
          exercitationem explicabo illum inventore modi nam optio quae, rerum similique voluptatem.
        </p>
      </>
    );

    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <FormatText size='s'>
          <Inner />
        </FormatText>
        <FormatText size='m'>
          <Inner />
        </FormatText>
        <FormatText size='l'>
          <Inner />
        </FormatText>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Abbr should correct render', async ({ task }) => {
    const component = (
      <FormatText>
        <abbr id='element'>abbr element</abbr>
      </FormatText>
    );
    await expect(
      await snapshot(component, {
        actions: { hover: '#element' },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(component, {
        actions: { active: '#element' },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(component, {
        actions: { focus: '#element' },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Link should correct render', async ({ task }) => {
    const component = (
      <FormatText>
        <a href='/' id='element'>
          link
        </a>
      </FormatText>
    );
    await expect(
      await snapshot(component, {
        actions: { hover: '#element' },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(component, {
        actions: { active: '#element' },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(component, {
        actions: { focus: '#element' },
      }),
    ).toMatchImageSnapshot(task);
  });
});
