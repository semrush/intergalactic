import { Hint } from '@semcore/base-components';
import type { SimpleHintPopperProps } from '@semcore/base-components';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';
import React from 'react';

const Demo = (props: SimpleHintPopperProps) => {
  const ref = React.useRef();

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
        includeTooltipProps={['onVisibleChange']}
      >
        Export to PDF
      </Hint>
      {' '}
      {/* <=== will be shown when the button is hovered of focused */}
    </>
  );
};

export const defaultProps: SimpleHintPopperProps = {

  placement: undefined,
  timeout: undefined,
  visible: undefined,
  defaultVisible: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
