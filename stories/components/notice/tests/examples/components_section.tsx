import { Box, Flex } from '@semcore/ui/base-components';
import Notice from '@semcore/ui/notice';
import React from 'react';

export default function ComponentsSectionNotice() {
  return (
    <Box
      p={4}
      style={{
        background: 'var(--intergalactic-bg-secondary-neutral)',
      }}
    >
      <Flex gap={4} flexWrap direction='column' alignItems='stretch'>
        {(['info', 'warning', 'danger', 'success', 'muted'] as const).map((theme) => (
          <Notice
            key={theme}
            aria-label={`${theme} notice`}
            theme={theme}
            wMax={400}
          >
            <Notice.Content>
              <Notice.Title>
                {theme.charAt(0).toUpperCase() + theme.slice(1)} notice
              </Notice.Title>
              <Notice.Text>Short message for theme playground.</Notice.Text>
            </Notice.Content>
            <Notice.Close />
          </Notice>
        ))}
      </Flex>
    </Box>
  );
}
