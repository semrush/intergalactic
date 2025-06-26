import Checkbox from '@semcore/checkbox';
import type { IRootComponentProps } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import findComponent from '@semcore/core/lib/utils/findComponent';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './checbox.shadow.css';
import type { CheckboxComponent } from './Checkbox.type';
import Sparkle from '../../inner-components/sparkle/Sparkle';

class CheckboxAFRoot extends Component {
  static displayName = 'CheckboxAF';
  static style = style;

  inputRef = React.createRef<HTMLInputElement>();

  getValueProps() {
    return {
      ref: this.inputRef,
      onChange: () => {
        setTimeout(() => {
          this.forceUpdate();
        });
      },
    };
  }

  getAddonProps() {
    const checked = this.inputRef.current?.checked;

    return {
      checked,
    };
  }

  render() {
    const SCheckboxAF = Root;
    const { styles, Children, children: hasChildren } = this.asProps;

    const hasAddon = findComponent(Children, [CheckboxAF.Addon.displayName]);

    return sstyled(styles)(
      <SCheckboxAF render={Checkbox}>
        {hasChildren
          ? <Children />
          : (
              <>
                <CheckboxAF.Value />
                <CheckboxAF.Text />
              </>
            )}
        {!hasAddon && <CheckboxAF.Addon />}
      </SCheckboxAF>,
    );
  }
}

function Addon(props: IRootComponentProps & { animatedSparkleCount?: number; checked: boolean }) {
  const { Children, children, animatedSparkleCount, checked } = props;

  if (children !== undefined) {
    return <Children />;
  }

  return (
    <>
      <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -2 }} />
      {checked && [...new Array(animatedSparkleCount)].map((_, index) => {
        return (
          <Sparkle key={index} index={index} num={animatedSparkleCount!} curve={9} />
        );
      })}
    </>
  );
}

export const CheckboxAF = createComponent(CheckboxAFRoot, {
  Text: Checkbox.Text,
  Value: Checkbox.Value,
  Addon,
}) as CheckboxComponent;
