import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import { Box, Flex } from '../src';

const styleBox = {
  border: '1px solid',
  background: '#ccc',
};

describe('Flex', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Flex);
  shouldSupportRef(Flex);

  test.concurrent('Should gaps', async ({ task }) => {
    const component = (
      <div>
        <Flex columnGap={2} scaleIndent={10}>
          <Box inline style={styleBox} w={100} h={100}>
            column gap left
          </Box>
          <Box inline style={styleBox} w={100} h={100}>
            column gap right
          </Box>
        </Flex>

        <br />
        <br />
        <br />

        <Flex rowGap={5} w={100} direction="column">
          <Box inline style={styleBox} w={100} h={100}>
            row gap upper
          </Box>
          <Box inline style={styleBox} w={100} h={100}>
            row gap lower
          </Box>
        </Flex>

        <br />
        <br />
        <br />

        <Flex gap={5} w={225} h={225} flexWrap={true}>
          <Box inline style={styleBox} w={100} h={100}>
            gap left-upper
          </Box>
          <Box inline style={styleBox} w={100} h={100}>
            gap right-upper
          </Box>
          <Box inline style={styleBox} w={100} h={100}>
            gap left-lower
          </Box>
          <Box inline style={styleBox} w={100} h={100}>
            gap right-lower
          </Box>
        </Flex>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support css property', async ({ task }) => {
    const MAP_CSS = {
      reverse: {
        css: 'flex-direction',
        name: 'flexDirection',
        values: ['row-reverse', 'column-reverse'],
      },
      flexWrap: { css: 'flex-wrap', name: 'flexWrap', values: ['wrap'] },
      direction: {
        css: 'flex-direction',
        name: 'flexDirection',
        values: ['column', 'row'],
        tests: ['column', 'row'],
      },
      alignItems: { css: 'align-items', name: 'alignItems', values: ['center'], tests: ['center'] },
      justifyContent: {
        css: 'justify-content',
        name: 'justifyContent',
        values: ['center'],
        tests: ['center'],
      },
    };
    const components = Object.keys(MAP_CSS).map((prop, id) => {
      const { tests } = MAP_CSS[prop];
      if (tests) {
        return tests.map((test, ind) => (
          <Flex key={`${id}-${ind}`} data-testid={`${prop}-${test}`} {...{ [prop]: [test] }}>
            Flex
          </Flex>
        ));
      }
      if (prop === 'reverse') {
        return [
          <Flex key={`${id}-row`} data-testid={`${prop}-row`} {...{ [prop]: true }} direction="row">
            Flex
          </Flex>,
          <Flex
            key={`${id}-column`}
            data-testid={`${prop}-column`}
            {...{ [prop]: true }}
            direction="column"
          >
            Flex
          </Flex>,
        ];
      }
      return (
        <Flex key={id} data-testid={prop} {...{ [prop]: true }}>
          Flex
        </Flex>
      );
    });
    const { getAllByText } = render(components);
    const nodes = await getAllByText('Flex');
    nodes.forEach((node) => {
      const { testid } = node.dataset;
      const [prop] = testid.split('-');
      const data = MAP_CSS[prop];
      const cssValue = node.style[data.name];
      expect(cssValue).toBe(MAP_CSS[prop].values.find((v) => v === cssValue));
    });
  });
});

describe('Box', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Box);
  shouldSupportRef(Box);

  test.concurrent('Should support size', async ({ task }) => {
    const component = (
      <div>
        <Box style={styleBox} w={100} h="100px">
          Box
        </Box>
        <br />
        <Box style={styleBox} w={2 / 5} h="auto">
          Box
        </Box>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size min limits', async ({ task }) => {
    const style = {
      width: 0,
      height: 0,
      ...styleBox,
    };
    const component = (
      <div>
        <Box style={style} wMin="30px" hMin="30px">
          Box
        </Box>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size max limits', async ({ task }) => {
    const style = {
      width: '100%',
      height: '100%',
      ...styleBox,
    };
    const wrapStyle = {
      width: '100px',
      height: '100px',
    };
    const component = (
      <div style={wrapStyle}>
        <Box style={style} wMax="30px" hMax="30px">
          Box
        </Box>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support indent', async ({ task }) => {
    const component = (
      <div>
        <Box inline style={styleBox}>
          Box
        </Box>
        <Box inline style={styleBox} ml={10}>
          Box
        </Box>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test("Should support Box 'tag' prop", () => {
    const { getByTestId } = render(
      <Box tag="span" data-testid="box">
        tag
      </Box>,
    );
    expect(getByTestId('box').tagName).toBe('SPAN');
  });

  test("Should support Box 'tag' prop component", () => {
    const Span = function (props) {
      return <span {...props} />;
    };
    const { getByTestId } = render(
      <Box tag={Span} data-testid="box">
        tag
      </Box>,
    );
    expect(getByTestId('box').tagName).toBe('SPAN');
  });

  test('Should support clear non html props', () => {
    const { getByTestId } = render(<Box custom={true} data-testid="box" />);
    expect(getByTestId('box').getAttribute('custom')).toBeFalsy();
  });

  test('Should support html props', () => {
    const { getByTestId } = render(<Box aria-label="Box" data-testid="box" />);
    expect(getByTestId('box').getAttribute('aria-label')).toBe('Box');
  });

  test('Should support scaleIndent for calculate offset', () => {
    const { getByTestId } = render(<Box scaleIndent={10} mt={2} data-testid="box" />);
    expect(getByTestId('box').style.marginTop).toBe('20px');
  });

  test('Should support css property', async ({ task }) => {
    const MAP_CSS = {
      inline: { css: 'display', values: ['inline-block'] },
      boxSizing: { css: 'box-sizing', values: ['border-box'] },
      flex: { css: 'flex', values: ['0 0 auto'], tests: ['0 0 auto'] },
      m: { css: 'margin', values: ['8px', '2px'], tests: [2, '2px'] },
      mt: { css: 'margin-top', values: ['8px', '2px'], tests: [2, '2px'] },
      mb: { css: 'margin-bottom', values: ['8px', '2px'], tests: [2, '2px'] },
      ml: { css: 'margin-left', values: ['8px', '2px'], tests: [2, '2px'] },
      mr: { css: 'margin-right', values: ['8px', '2px'], tests: [2, '2px'] },
      mx: { css: 'margin-left', values: ['8px', '2px'], tests: [2, '2px'] },
      my: { css: 'margin-top', values: ['8px', '2px'], tests: [2, '2px'] },
      p: { css: 'padding', values: ['8px', '2px'], tests: [2, '2px'] },
      pt: { css: 'padding-top', values: ['8px', '2px'], tests: [2, '2px'] },
      pb: { css: 'padding-bottom', values: ['8px', '2px'], tests: [2, '2px'] },
      pl: { css: 'padding-left', values: ['8px', '2px'], tests: [2, '2px'] },
      pr: { css: 'padding-right', values: ['8px', '2px'], tests: [2, '2px'] },
      px: { css: 'padding-left', values: ['8px', '2px'], tests: [2, '2px'] },
      py: { css: 'padding-top', values: ['8px', '2px'], tests: [2, '2px'] },
      w: { css: 'width', values: ['8px', '2px'], tests: [2, '2px'] },
      wMin: { css: 'min-width', values: ['8px', '2px'], tests: [2, '2px'] },
      wMax: { css: 'max-width', values: ['8px', '2px'], tests: [2, '2px'] },
      h: { css: 'height', values: ['8px', '2px'], tests: [2, '2px'] },
      hMin: { css: 'height-width', values: ['8px', '2px'], tests: [2, '2px'] },
      hMax: { css: 'height-width', values: ['8px', '2px'], tests: [2, '2px'] },
      position: { css: 'position', values: ['relative'], tests: ['relative'] },
      top: { css: 'top', values: ['2px'], tests: [2, '2px'] },
      left: { css: 'left', values: ['2px'], tests: [2, '2px'] },
      right: { css: 'right', values: ['2px'], tests: [2, '2px'] },
      bottom: { css: 'bottom', values: ['2px'], tests: [2, '2px'] },
      zIndex: { css: 'z-index', values: ['5'], tests: [5] },
    };
    const components = Object.keys(MAP_CSS).map((prop, id) => {
      const { tests } = MAP_CSS[prop];
      if (tests) {
        return tests.map((test, ind) => (
          <Box key={`${id}-${ind}`} data-testid={`${prop}-${test}`} {...{ [prop]: test }}>
            Box
          </Box>
        ));
      }
      return (
        <Box key={id} data-testid={prop} {...{ [prop]: true }}>
          Box
        </Box>
      );
    });
    const { getAllByText } = render(components);
    const nodes = await getAllByText('Box');
    nodes.forEach((node) => {
      const { testid } = node.dataset;
      const [prop] = testid.split('-');
      const data = MAP_CSS[prop];
      const cssValue = getComputedStyle(node)[data.css];
      expect(cssValue).toBe(MAP_CSS[prop].values.find((v) => v === cssValue));
    });
  });
});

describe('FlexBox', () => {
  beforeEach(cleanup);

  test.concurrent('Correctly render Flex, Box', async ({ task }) => {
    const component = (
      <Flex w={500} justifyContent="space-between">
        <Box style={styleBox} w={100}>
          Box
        </Box>
        <Box style={styleBox} w={100}>
          Box
        </Box>
        <Box style={styleBox} w={100}>
          Box
        </Box>
      </Flex>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
