import React from 'react';
import { cleanup, render } from '@semcore/jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import { Box, Flex } from '../src';

const styleBox = {
  border: '1px solid',
  background: '#ccc',
};

describe('Flex', () => {
  afterEach(cleanup);

  shouldSupportClassName(Flex);
  shouldSupportRef(Flex);
});

describe('Box', () => {
  afterEach(cleanup);

  shouldSupportClassName(Box);
  shouldSupportRef(Box);

  test('Should support z-index', async () => {
    const component = (
      <div>
        <Box inline style={styleBox} w={100} h={100} zIndex={2} position="relative">
          Box
        </Box>
        <Box inline style={styleBox} w={100} h={100} zIndex={1} position="relative" ml="-50px">
          Box
        </Box>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size min limits', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size max limits', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support indent', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
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
});

describe('FlexBox', () => {
  afterEach(cleanup);

  test('Correctly render Flex, Box', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
