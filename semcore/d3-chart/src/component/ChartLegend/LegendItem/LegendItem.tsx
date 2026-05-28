import { Flex, Box } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { type Intergalactic, createComponent, Component, sstyled, Root } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { Text as TypographyText } from '@semcore/typography';
import React from 'react';

import style from './legend-item.shadow.css';
import {
  type LegendItemShapeType,
  type LegendItemDefaultProps,
  type LegendItemType,
  StaticShapes,
  type LegendItemIconType,
  type LegendItemLabelType,
  type LegendItemAdditionalLabelType,
  type LegendItemCountType,
} from './LegendItem.type';
import { PatternSymbol } from '../../../Pattern';
import { getChartDefaultColorName } from '../../../utils';

const enhance = [resolveColorEnhance(), uniqueIDEnhancement()] as const;
class LegendItemRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<LegendItemType>,
  typeof enhance,
  {},
  {},
  {},
  LegendItemDefaultProps
> {
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
    const { checked, color, shape, label, id, size, resolveColor, patterns, onChangeLegendItem, onFocusLegendItem, onBlurLegendItem } =
      this.asProps;
    return {
      label,
      shape,
      checked,
      'color': resolveColor(color),
      'patternKey': color,
      patterns,
      size,
      'onChange': (value: boolean) => {
        if (onChangeLegendItem && id) {
          onChangeLegendItem(id, value);
        }
      },
      'onFocus': () => {
        if (onFocusLegendItem && id) {
          onFocusLegendItem(id);
        }
      },
      'onBlur': () => {
        if (onBlurLegendItem && id) {
          onBlurLegendItem(id);
        }
      },
      'aria-labelledby': shape === 'Checkbox' ? this.getUniqueID() : null,
    };
  }

  getIconProps() {
    const props = this.asProps;

    return {
      ...props,
      children: props.icon,
      onClick: () => {
        if (props.onChangeLegendItem && props.id) {
          props.onChangeLegendItem(props.id, !props.checked);
        }
      },
    };
  }

  getLabelProps() {
    const { id, checked, color: _color, onChangeLegendItem, shape: _shape, ...props } = this.asProps;

    return {
      ...props,
      id: this.getUniqueID(),
      checked,
      onClick: () => {
        if (onChangeLegendItem && id) {
          onChangeLegendItem(id, !checked);
        }
      },
      children: props.label,
    };
  }

  getAdditionalLabelProps() {
    const props = this.asProps;

    const { additionalInfo, onChangeLegendItem, id, checked } = props;

    return {
      ...props,
      children: additionalInfo && 'label' in additionalInfo ? `${additionalInfo.label}` : undefined,
      onClick: () => {
        if (onChangeLegendItem && id) {
          onChangeLegendItem(id, !checked);
        }
      },
    };
  }

  getCountProps() {
    const props = this.asProps;

    const { additionalInfo, onChangeLegendItem, id, checked } = props;

    return {
      ...props,
      children:
        additionalInfo && 'count' in additionalInfo ? `(${additionalInfo.count})` : undefined,
      onClick: () => {
        if (onChangeLegendItem && id) {
          onChangeLegendItem(id, !checked);
        }
      },
    };
  }

  render() {
    const SLegendItem = Root;
    const { styles, Children, shape } = this.asProps;

    // @ts-ignore
    const disabled = StaticShapes.includes(shape) || shape === undefined;

    return sstyled(styles)(
      <SLegendItem render={Flex} disabled={disabled} __excludeProps={['id']}>
        <Children />
      </SLegendItem>,
    );
  }
}

function Shape(
  props: Intergalactic.InternalTypings.InferChildComponentProps<LegendItemShapeType, typeof LegendItemRoot, 'Shape'>,
) {
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
    onFocus,
    onBlur,
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
          theme={color}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-labelledby={props['aria-labelledby']}
        />
        {patterns && (
          <Box mt='2px' mr={1} onClick={() => onChange(!checked)}>
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

function Icon(
  props: Intergalactic.InternalTypings.InferChildComponentProps<LegendItemIconType, typeof LegendItemRoot, 'Icon'>,
) {
  const { styles, children: hasChildren, Children } = props;
  const SIcon = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SIcon render={Box} tag='span'>
      <Children />
    </SIcon>,
  );
}
Icon.displayName = 'Icon';

function Label(
  props: Intergalactic.InternalTypings.InferChildComponentProps<LegendItemLabelType, typeof LegendItemRoot, 'Label'>,
) {
  const { styles, children: hasChildren, Children } = props;
  const SLabel = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SLabel render={TypographyText} use='primary'>
      <Children />
    </SLabel>,
  );
}
Label.displayName = 'Label';

function AdditionalLabel(
  props: Intergalactic.InternalTypings.InferChildComponentProps<LegendItemAdditionalLabelType, typeof LegendItemRoot, 'AdditionalLabel'>,
) {
  const { styles, children: hasChildren, Children } = props;
  const SAdditionalLabel = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SAdditionalLabel render={TypographyText} use='secondary'>
      <Children />
    </SAdditionalLabel>,
  );
}
AdditionalLabel.displayName = 'AdditionalLabel';

function Count(
  props: Intergalactic.InternalTypings.InferChildComponentProps<LegendItemCountType, typeof LegendItemRoot, 'Count'>,
) {
  const { styles, children: hasChildren, Children } = props;
  const SCount = Root;

  if (!hasChildren) {
    return null;
  }

  return sstyled(styles)(
    <SCount render={TypographyText} use='secondary'>
      <Children />
    </SCount>,
  );
}
Count.displayName = 'Count';

/**
 * LegendItemComponent
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/chart-legend/chart-legend-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/chart-legend/chart-legend-code/|Examples}
 */
export const LegendItemComponent = createComponent<
  LegendItemType,
  typeof LegendItemRoot
>(LegendItemRoot, {
  Shape,
  Icon,
  Label,
  AdditionalLabel,
  Count,
});
