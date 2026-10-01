import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

/**
 * Tooltip stretches its portalled wrapper to the full viewport width. `100vw` includes the scroll
 * bar, so the wrapper has to be compensated by `useScrollBarWidth` — otherwise it overflows the
 * viewport and the page gets a horizontal scroll bar (UIK-5995).
 *
 * The readout below reports the measurement the hook is expected to make, so the compensation can
 * be checked without opening DevTools.
 */
const readMetrics = () => {
  const root = document.documentElement;

  return {
    innerWidth: window.innerWidth,
    clientWidth: root.clientWidth,
    scrollBarWidth: window.innerWidth - root.clientWidth,
    hasHorizontalOverflow: root.scrollWidth > root.clientWidth,
  };
};

const Demo = () => {
  const [tallContent, setTallContent] = React.useState(false);
  const [tooltipVisible, setTooltipVisible] = React.useState(true);
  const [metrics, setMetrics] = React.useState(readMetrics);

  React.useEffect(() => {
    const timer = setInterval(() => setMetrics(readMetrics()), 250);

    return () => clearInterval(timer);
  }, []);

  return (
    <Flex gap={4} direction='column'>
      <Flex gap={4} alignItems='center'>
        <Tooltip
          title='The wrapper of this tooltip must stay inside the viewport.'
          visible={tooltipVisible}
          tag={Button}
        >
          Tooltip anchor
        </Tooltip>

        <Button onClick={() => setTooltipVisible((visible) => !visible)}>
          {tooltipVisible ? 'Hide tooltip' : 'Show tooltip'}
        </Button>

        <Button onClick={() => setTallContent((tall) => !tall)}>
          {tallContent ? 'Remove tall content' : 'Add tall content'}
        </Button>
      </Flex>

      <Flex gap={1} direction='column'>
        <Text tag='p'>
          {'window.innerWidth: '}
          {metrics.innerWidth}
        </Text>
        <Text tag='p'>
          {'documentElement.clientWidth: '}
          {metrics.clientWidth}
        </Text>
        <Text tag='p'>
          {'measured scroll bar width: '}
          {metrics.scrollBarWidth}
        </Text>
        <Text tag='p' color={metrics.hasHorizontalOverflow ? 'text-critical' : 'text-success'}>
          {'horizontal overflow: '}
          {metrics.hasHorizontalOverflow ? 'yes — scroll bar is not compensated' : 'no'}
        </Text>
      </Flex>

      <Text tag='p'>
        1. Keep the tooltip visible and press &quot;Add tall content&quot; — a vertical scroll bar
        appears after the tooltip mounted, and the wrapper must shrink to
        {' '}
        <code>calc(100vw - scrollBarWidth)</code>
        {' '}
        instead of staying at
        {' '}
        <code>100vw</code>
        .
        <br />
        2. Hide the tooltip, resize the window, then show it again — the re-mounted tooltip must use
        the fresh measurement, not the one taken on the very first mount.
        <br />
        3. In every case &quot;horizontal overflow&quot; must stay
        {' '}
        <b>no</b>
        .
      </Text>

      {tallContent && <Box h={3000} />}
    </Flex>
  );
};

export default Demo;
