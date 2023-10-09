import React from 'react';
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

class LegendItemRoot extends Component<LegendItemProps> {
  static displayName = 'LegendItem';
  static style = style;

  static defaultProps = () => ({
    children: (
      <>
        {/*
          // @ts-ignore */}
        <LegendItemComponent.Shape />
        {/*
          // @ts-ignore */}
        <LegendItemComponent.Icon />
        {/*
          // @ts-ignore */}
        <LegendItemComponent.Label />
        {/*
          // @ts-ignore */}
        <LegendItemComponent.AdditionalLabel />
        {/*
          // @ts-ignore */}
        <LegendItemComponent.Count />
      </>
    ),
  });

  getShapeProps(): ShapeProps {
    const { checked, color, shape, label, id, size } = this.asProps;

    return {
      id,
      label,
      shape,
      checked,
      color,
      size,
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

function Shape(props: IRootComponentProps & ShapeProps) {
  const SPointShape = Root;
  const { styles, size, shape, checked, color, Children, children: hasChildren } = props;

  if (hasChildren) {
    return <Children />;
  }

  if (shape === 'Checkbox') {
    return <Checkbox size={size} checked={checked} theme={checked ? color : undefined} />;
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
    <SLabel render={TypographyText}>
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
