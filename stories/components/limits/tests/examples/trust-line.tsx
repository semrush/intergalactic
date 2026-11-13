import { Box } from '@semcore/ui/base-components';
import { TrustLine } from '@semcore/ui/limits';
import React from 'react';

type Props = {
  description: string;
  locale: string;
};

const Demo = (props: Props) => {
  const { description, locale } = props;

  return (
    <Box p={3}>
      <TrustLine description={description || undefined} locale={locale} />
    </Box>
  );
};

export const defaultProps: Props = {
  description: 'Test description',
  locale: 'en',
};

export default Demo;
