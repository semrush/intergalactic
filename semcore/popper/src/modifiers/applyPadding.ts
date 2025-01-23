import { Modifier } from '@popperjs/core';
import { CSSProperties } from 'react';
import { getAutoOrScaleIndent } from '@semcore/flex-box';

type ApplyPaddingsOptions = {
  p: CSSProperties['padding'];
  pt: CSSProperties['paddingTop'];
  pb: CSSProperties['paddingBottom'];
  pr: CSSProperties['paddingRight'];
  pl: CSSProperties['paddingLeft'];
  px: CSSProperties['padding'];
  py: CSSProperties['padding'];
  scaleIndent: number;
  popperCtx?: React.Component;
};

export const applyPaddings: Modifier<'applyPaddings', ApplyPaddingsOptions> = {
  name: 'applyPaddings',
  enabled: false,
  phase: 'beforeWrite',
  fn({ state, options }) {
    const { p, pl, pr, pt, pb, px, py, scaleIndent = 4, popperCtx } = options;

    const styles = {
      ...state.styles.popper,
      padding: getAutoOrScaleIndent(p, scaleIndent),
      paddingTop: getAutoOrScaleIndent(pt, scaleIndent) || getAutoOrScaleIndent(py, scaleIndent),
      paddingBottom: getAutoOrScaleIndent(pb, scaleIndent) || getAutoOrScaleIndent(py, scaleIndent),
      paddingLeft: getAutoOrScaleIndent(pl, scaleIndent) || getAutoOrScaleIndent(px, scaleIndent),
      paddingRight: getAutoOrScaleIndent(pr, scaleIndent) || getAutoOrScaleIndent(px, scaleIndent),
    };

    state.styles.popper = styles;

    popperCtx?.forceUpdate();
  },
};
