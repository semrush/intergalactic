import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

/**
 * UIK-5995: an open tooltip must not cause a horizontal page scroll
 * when a vertical scroll bar appears on the page after the tooltip was opened.
 */
const readPage = () => {
  const root = document.documentElement;

  return {
    scrollBarWidth: window.innerWidth - root.clientWidth,
    horizontalScroll: root.scrollWidth > root.clientWidth,
  };
};

const Demo = () => {
  const [tooltipVisible, setTooltipVisible] = React.useState(true);
  const [longPage, setLongPage] = React.useState(false);
  const [page, setPage] = React.useState(readPage);

  React.useEffect(() => {
    const root = document.documentElement;
    const observer = new ResizeObserver(() => setPage(readPage()));

    // Storybook reserves space for the scroll bar (`scrollbar-gutter: stable`),
    // which hides the bug, so the reservation is turned off for this example.
    root.style.scrollbarGutter = 'auto';
    observer.observe(root);

    return () => {
      observer.disconnect();
      root.style.scrollbarGutter = '';
    };
  }, []);

  return (
    <Flex gap={4} direction='column' alignItems='flex-start'>
      <Text tag='p'>
        Press &quot;Make page long&quot; while the tooltip is open, then try it with the tooltip
        hidden and show it again.
        <br />
        In both cases the page must not get a horizontal scroll bar.
      </Text>

      <Flex gap={4}>
        <Tooltip title='Tooltip' visible={tooltipVisible} tag={Button}>
          Tooltip trigger
        </Tooltip>
        <Button w={120} onClick={() => setTooltipVisible((visible) => !visible)}>
          {tooltipVisible ? 'Hide tooltip' : 'Show tooltip'}
        </Button>
        <Button w={140} onClick={() => setLongPage((long) => !long)}>
          {longPage ? 'Make page short' : 'Make page long'}
        </Button>
      </Flex>

      <Text tag='p' color={page.horizontalScroll ? 'text-critical' : 'text-success'}>
        {page.horizontalScroll ? 'Horizontal scroll: yes (bug)' : 'Horizontal scroll: no (OK)'}
      </Text>

      {longPage && page.scrollBarWidth === 0 && (
        <Text tag='p' color='text-secondary'>
          Your system hides scroll bars, so the bug cannot show up. On macOS set System Settings →
          Appearance → Show scroll bars → Always.
        </Text>
      )}

      {longPage && (
        <>
          <Box h={3000} />
          <Text tag='p'>End of the long page</Text>
        </>
      )}
    </Flex>
  );
};

export default Demo;
