import { Box } from '@semcore/ui/flex-box';
import type { BoxProps } from '@semcore/ui/flex-box';
import React from 'react';

type ExampleProps = BoxProps & {
  tag?: string;
};

const Demo = (props: ExampleProps) => {
  return (
    <div style={{ padding: 20, border: '1px dashed #ccc', minHeight: 200 }}>
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
        innerOutline={props.innerOutline}
        invertOutline={props.invertOutline}
        inAfterOutline={props.inAfterOutline}
        style={{ background: '#e0e0ff', border: '1px solid #7b68ee' }}
      >
        Box content
      </Box>
    </div>
  );
};

export const defaultProps: ExampleProps = {
  tag: 'div',
  display: undefined,
  inline: false,
  boxSizing: false,
  flex: undefined,
  w: undefined,
  wMin: undefined,
  wMax: undefined,
  h: undefined,
  hMin: undefined,
  hMax: undefined,
  m: undefined,
  mt: undefined,
  mr: undefined,
  mb: undefined,
  ml: undefined,
  mx: undefined,
  my: undefined,
  p: undefined,
  pt: undefined,
  pr: undefined,
  pb: undefined,
  pl: undefined,
  px: undefined,
  py: undefined,
  scaleIndent: 4,
  position: undefined,
  top: undefined,
  left: undefined,
  bottom: undefined,
  right: undefined,
  inset: undefined,
  zIndex: undefined,
  textAlign: undefined,
  innerOutline: false,
  invertOutline: false,
  inAfterOutline: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
