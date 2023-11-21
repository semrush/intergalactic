import React, { DOMAttributes } from 'react';
import createComponent, { Component, sstyled, Root, IRootComponentProps } from '@semcore/core';
import { Flex, Box } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';
import { Text as TypographyText } from '@semcore/typography';

import style from './legend-item.shadow.css';
import {
  ShapeProps,
  LegendItemProps,
  LegendItemType,
  LegendItem,
  StaticShapes,
} from './LegendItem.type';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';

class LegendItemRoot extends Component<
  LegendItemProps & { resolveColor: ReturnType<typeof resolveColorEnhance> }
> {
  static displayName = 'LegendItem';
  static style = style;

  static enhance = [resolveColorEnhance()];

  static defaultProps = () => ({
    children: (
      <>
        <LegendItemComponent.Shape />
        <LegendItemComponent.Icon />
        <LegendItemComponent.Label />
        <LegendItemComponent.AdditionalLabel />
        <LegendItemComponent.Count />
      </>
    ),
  });

  getShapeProps(): ShapeProps & DOMAttributes<HTMLLabelElement> {
    const { checked, color, shape, label, id, size, onClick, resolveColor } = this.asProps;

    return {
      id,
      label,
      shape,
      checked,
      color: resolveColor(color),
      size,
      onKeyUp: (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if (onClick && e.key === ' ') {
          onClick();
        }
      },
    };
  }

  getIconProps(): LegendItem & IRootComponentProps {
    const props = this.asProps;

    return {
      ...props,
      children: props.icon,
    };
  }

  getLabelProps(): Omit<LegendItem, 'color'> & IRootComponentProps {
    const { color, ...props } = this.asProps;

    return {
      ...props,
      children: props.label,
    };
  }

  getAdditionalLabelProps(): LegendItem & IRootComponentProps {
    const props = this.asProps;

    const { additionalInfo } = props;

    return {
      ...props,
      children: additionalInfo && 'label' in additionalInfo ? `${additionalInfo.label}` : undefined,
    };
  }

  getCountProps(): LegendItem & IRootComponentProps {
    const props = this.asProps;

    const { additionalInfo } = props;

    return {
      ...props,
      children:
        additionalInfo && 'count' in additionalInfo ? `(${additionalInfo.count})` : undefined,
    };
  }

  render() {
    const SLegendItem = Root;
    const { styles, Children, shape } = this.asProps;

    // @ts-ignore
    const disabled = StaticShapes.includes(shape);

    return sstyled(styles)(
      <SLegendItem render={Flex} disabled={disabled}>
        <Children />
      </SLegendItem>,
    );
  }
}

function Shape(props: IRootComponentProps & ShapeProps & DOMAttributes<HTMLLabelElement>) {
  const SPointShape = Root;
  const {
    styles,
    size,
    shape,
    checked,
    color,
    Children,
    children: hasChildren,
    onKeyUp,
    label,
  } = props;

  if (hasChildren) {
    return <Children />;
  }

  if (shape === 'Checkbox') {
    return (
      <Checkbox
        size={size}
        checked={checked}
        theme={checked ? color : undefined}
        onKeyUp={onKeyUp}
        aria-label={label}
      />
    );
  }

  return sstyled(styles)(
    <SPointShape render={Box}>
      <Children />
    </SPointShape>,
  );
}

function Icon({ styles, children: hasChildren, Children }: IRootComponentProps) {
  const SIcon = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SIcon render={Box} tag={'span'}>
      <Children />
    </SIcon>,
  );
}
Icon.displayName = 'Icon';

function Label({ styles, children: hasChildren, Children }: IRootComponentProps) {
  const SLabel = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SLabel render={TypographyText} use={'primary'}>
      <Children />
    </SLabel>,
  );
}
Label.displayName = 'Label';

function AdditionalLabel({ styles, children: hasChildren, Children }: IRootComponentProps) {
  const SAdditionalLabel = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SAdditionalLabel render={TypographyText} use={'secondary'}>
      <Children />
    </SAdditionalLabel>,
  );
}
AdditionalLabel.displayName = 'AdditionalLabel';

function Count({ styles, children: hasChildren, Children }: IRootComponentProps) {
  const SCount = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SCount render={TypographyText} use={'secondary'}>
      <Children />
    </SCount>,
  );
}
Count.displayName = 'Count';

export const LegendItemComponent: LegendItemType = createComponent(LegendItemRoot, {
  Shape,
  Icon,
  Label,
  AdditionalLabel,
  Count,
});
