import React, { DOMAttributes } from 'react';
import { createComponent, Component, sstyled, Root, IRootComponentProps } from '@semcore/core';
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
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { PatternSymbol } from '../../../Pattern';
import { getChartDefaultColorName } from '../../../utils';

const enhance = [resolveColorEnhance(), uniqueIDEnhancement()] as const;
class LegendItemRoot extends Component<LegendItemProps, {}, {}, typeof enhance> {
  static displayName = 'LegendItem';
  static style = style;

  static enhance = enhance;

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

  getUniqueID() {
    const { uid } = this.asProps;
    return `chart-legend-item-${uid}`;
  }

  getShapeProps() {
    const { checked, color, shape, label, id, size, resolveColor, patterns, onChangeLegendItem } =
      this.asProps;
    return {
      label,
      shape,
      checked,
      color: resolveColor(color),
      patternKey: color,
      patterns,
      size,
      onChange: (value: boolean) => {
        onChangeLegendItem(id, value);
      },
      'aria-labelledby': shape === 'Checkbox' ? this.getUniqueID() : null,
    };
  }

  getIconProps(): LegendItem & IRootComponentProps {
    const props = this.asProps;

    return {
      ...props,
      children: props.icon,
    };
  }

  getLabelProps(): Omit<LegendItem, 'color'> & IRootComponentProps & { onClick: () => void } {
    const { id, checked, color, onChangeLegendItem, shape, ...props } = this.asProps;

    return {
      ...props,
      id: this.getUniqueID(),
      checked,
      onClick: () => onChangeLegendItem(id, !checked),
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
      <SLegendItem render={Flex} disabled={disabled} __excludeProps={['id']}>
        <Children />
      </SLegendItem>,
    );
  }
}

function Shape(props: IRootComponentProps & ShapeProps & DOMAttributes<HTMLLabelElement>) {
  const SPointShape = Root;
  const SPatternSymbol = PatternSymbol;
  const {
    styles,
    size,
    shape,
    checked,
    color,
    patternKey = getChartDefaultColorName(0),
    Children,
    children: hasChildren,
    patterns,
    onChange,
  } = props;

  if (hasChildren) {
    return <Children />;
  }

  if (shape === 'Pattern') {
    return sstyled(styles)(
      <Box mr={1}>
        <SPatternSymbol color={color} patternKey={patternKey} aria-hidden />
      </Box>,
    );
  }

  if (shape === 'Checkbox') {
    return sstyled(styles)(
      <>
        <Checkbox
          size={size}
          checked={checked}
          theme={checked ? color : undefined}
          onChange={onChange}
          aria-labelledby={props['aria-labelledby']}
        />
        {patterns && (
          <Box mt={'2px'} mr={1}>
            <SPatternSymbol color={color} patternKey={patternKey} aria-hidden />
          </Box>
        )}
      </>,
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
