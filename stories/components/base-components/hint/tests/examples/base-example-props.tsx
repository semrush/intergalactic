import FileExportM from '@semcore/icon/FileExport/m';
import { Hint } from '@semcore/ui/base-components';
import type { SimpleHintPopperProps } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

const Demo = (props: Partial<SimpleHintPopperProps>) => {
  const ref = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={ref} m={30}>
        <Button.Addon tag={FileExportM} />
      </Button>
      <Hint
        placement={props.placement}
        timeout={props.timeout}
        visible={props.visible}
        defaultVisible={props.defaultVisible}
        triggerRef={ref}
        onVisibleChange={(visible) => console.log('Hint visibility changed:', visible)}
      >
        Export to PDF
      </Hint>
      {' '}
      {/* <=== will be shown when the button is hovered of focused */}
    </>
  );
};

export const defaultProps: Partial<SimpleHintPopperProps> = {
  placement: undefined,
  timeout: undefined,
  visible: undefined,
  defaultVisible: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
