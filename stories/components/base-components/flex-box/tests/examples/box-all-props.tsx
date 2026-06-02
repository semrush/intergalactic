import { Box } from '@semcore/ui/base-components';
import type { BoxProps } from '@semcore/ui/base-components';
import React from 'react';

type ExampleProps = BoxProps & {
  tag?: React.ElementType;
  focusRingTopOffset?: string;
  focusRingRightOffset?: string;
  focusRingBottomOffset?: string;
  focusRingLeftOffset?: string;
};

const Demo = (props: ExampleProps) => {
  const isPositioned =
    props.position === 'absolute' || props.position === 'fixed' || props.position === 'sticky';

  return (
    <div
      style={{
        position: 'relative',
        padding: 20,
        border: '2px dashed #aaa',
        minHeight: 300,
        width: 500,
        background: '#f9f9f9',
      }}
    >
      <div style={{ color: '#999', fontSize: 12, marginBottom: 8 }}>
        Parent container (position: relative, 500x300)
      </div>

      {isPositioned && !props.inset && !props.top && !props.left && !props.bottom && !props.right && (
        <div style={{ color: '#e67700', fontSize: 12, marginBottom: 8 }}>
          Hint: set inset (e.g. &quot;10px&quot; or &quot;0&quot;) or top/left/bottom/right to see positioning effect
        </div>
      )}

      {isPositioned && props.inset && (props.w || props.h) && (
        <div style={{ color: '#e67700', fontSize: 12, marginBottom: 8 }}>
          Hint: clear w and h to let inset stretch the Box to fill the parent
        </div>
      )}

      <Box
        tag={props.tag}
        display={props.display}
        inline={props.inline}
        boxSizing={props.boxSizing}
        flex={props.flex}
        w={props.w}
        wMin={props.wMin}
        wMax={props.wMax}
        h={props.h}
        hMin={props.hMin}
        hMax={props.hMax}
        m={props.m}
        mt={props.mt}
        mr={props.mr}
        mb={props.mb}
        ml={props.ml}
        mx={props.mx}
        my={props.my}
        p={props.p}
        pt={props.pt}
        pr={props.pr}
        pb={props.pb}
        pl={props.pl}
        px={props.px}
        py={props.py}
        scaleIndent={props.scaleIndent}
        position={props.position}
        top={props.top}
        left={props.left}
        bottom={props.bottom}
        right={props.right}
        inset={props.inset}
        zIndex={props.zIndex}
        textAlign={props.textAlign}
        bg={props.bg}
        color={props.color}
        border={props.border}
        borderRadius={props.borderRadius}
        innerOutline={props.innerOutline}
        invertOutline={props.invertOutline}
        inAfterOutline={props.inAfterOutline}
        {...({
          focusRingTopOffset: props.focusRingTopOffset,
          focusRingRightOffset: props.focusRingRightOffset,
          focusRingBottomOffset: props.focusRingBottomOffset,
          focusRingLeftOffset: props.focusRingLeftOffset,
        } as Record<string, unknown>)}
        hoverCursor={props.hoverCursor}
        style={{ background: '#e0e0ff', border: '1px solid #7b68ee' }}
      >
        Box content
      </Box>
    </div>
  );
};

export const defaultProps: ExampleProps = {
  tag: 'div',
  inline: false,
  boxSizing: false,

  scaleIndent: 4,

  innerOutline: false,
  invertOutline: false,
  inAfterOutline: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
