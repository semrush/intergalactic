import FileExportM from '@semcore/icon/FileExport/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={3} alignItems='center'>
      <Button addonLeft={FileExportM} title='Export to PDF' />
      <Link
        href='https://semrush.com/'
        addonLeft={LinkExternalM}
        aria-label='semrush.com'
        hintPlacement='right'
      />
    </Flex>
  );
};

export default Demo;
