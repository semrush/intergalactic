import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import type { DropdownProps } from '@semcore/ui/dropdown';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: DropdownProps) => {
  return (
    <Dropdown
      strategy='absolute'
      interaction={props.interaction}
      modifiers={[]}
      onVisibleChange={(visible: any, e: any) => {
        console.log('Dropdown visibility changed:', visible, e);
      }}
      offset={[0, 8]}
      preventOverflow={{ boundary: 'clippingParents', padding: 8 }}
      arrow={{ element: '[data-popper-arrow]', padding: 5 }}
      flip={{ fallbackPlacements: ['top', 'bottom'] }}
      computeStyles={{ adaptive: true }}
      eventListeners={{ scroll: true, resize: true }}
      onFirstUpdate={(state: any) => {
        console.log('Popper first update', state);
      }}
    >
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='onVisibleChange onFirstUpdate'>
        onVisibleChange onFirstUpdate
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
        <Text size={200}>
          Hello there! I'm Dropdown's content
        </Text>
        <Tooltip
          title='Default tooltip contains short text explaining something about the trigger'
          tag={Button}
          aria-label='Export to PDF'
          addonLeft={FileExportM}
        />
      </Dropdown.Popper>
    </Dropdown>
  );
};

export const defaultVisibleUpdateProps: DropdownProps = {
  interaction: undefined,
};

Demo.defaultProps = defaultVisibleUpdateProps;
export default Demo;
