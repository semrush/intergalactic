import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import { Text as SemcoreText } from '@semcore/typography';
import React from 'react';

import type { NSPills } from './Pills.type';
import style from './style/pills.shadow.css';

const TRANSITION_SLOW_THRESHOLD = 1;

type RootProps = Intergalactic.InternalTypings.InferComponentProps<NSPills.Component>;
class RootPills extends Component<
  RootProps,
  typeof RootPills.enhance,
  NSPills.Handlers,
  {},
  {},
  NSPills.DefaultProps
> {
  static displayName = 'Pills';
  static style = style;
  static defaultProps = ({ behavior }: RootProps) => ({
    size: 'm',
    defaultValue: null,
    behavior: behavior ?? 'auto',
  } as const);

  itemValues: Array<NSPills.Pill.Props['value']> = [];

  lastSelectedIndex: number | null = null;
  currentSelectedIndex: number | null = null;

  rootRef: React.MutableRefObject<HTMLDivElement | null> = React.createRef();
  pills: Array<HTMLButtonElement> = [];
  segmentIndicatorRef: React.MutableRefObject<HTMLSpanElement | null> = React.createRef();

  ro: ResizeObserver | null = null;

  static enhance = [a11yEnhance({
    onNeighborChange: (neighborElement, props) => {
      if (neighborElement) {
        neighborElement.focus();
        if (props.behavior === 'auto') {
          neighborElement.click();
        }
      }
    },
    childSelector: (props) => {
      const selector = props.behavior === 'auto' ? ['role', 'radio'] : ['role', 'tab'];

      return selector as [string, string];
    },
  })] as const;

  constructor(props: RootProps) {
    super(props);
    if (canUseDOM()) {
      this.ro = new ResizeObserver(trottle(() => this.updateSegmentIndicator()));
    }
  }

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  componentDidUpdate() {
    this.updateSegmentIndicator();
  }

  componentDidMount() {
    this.updateSegmentIndicator();
  }

  componentWillUnmount() {
    this.ro?.disconnect();
  }

  updateSegmentIndicator() {
    if (this.currentSelectedIndex === null) return;

    const root = this.rootRef?.current;
    const pill = this.pills[this.currentSelectedIndex];
    const indicator = this.segmentIndicatorRef?.current;

    if (!pill || !root || !indicator) return;

    const pillRect = pill.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();

    const speed = this.lastSelectedIndex === null
      ? '--transition-slow'
      : Math.abs(this.currentSelectedIndex - this.lastSelectedIndex) > TRANSITION_SLOW_THRESHOLD
        ? '--transition-slow'
        : '--transition-fast';
    const left = pillRect.left - rootRect.left;
    const width = pillRect.width;
    const height = pillRect.height;

    indicator.style.setProperty('--global-speed', `var(${speed})`);
    indicator.style.setProperty('--global-left', `${left}px`);
    indicator.style.setProperty('--global-width', `${width}px`);
    indicator.style.setProperty('--global-height', `${height}px`);
  }

  bindHandlerClick = (value: NSPills.Pill.Props['value']) => (e: React.MouseEvent) => {
    this.handlers.value(value, e);
  };

  bindHandleKeyDown = (value: NSPills.Pill.Props['value']) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handlers.value(value, e);
    }
  };

  getItemProps(props: NSPills.Pill.Props, index: number) {
    const { value, size, disabled, behavior } = this.asProps;
    const isSelected = value === props.value;

    this.itemValues[index] = props.value;

    if (isSelected) {
      this.lastSelectedIndex = this.currentSelectedIndex;
      this.currentSelectedIndex = index;
    }

    return {
      index: index,
      size,
      disabled,
      selected: isSelected,
      behavior,
      tabIndex: isSelected ? 0 : -1,
      onClick: this.bindHandlerClick(props.value),
      onKeyDown: this.bindHandleKeyDown(props.value),
      ref: (node: HTMLButtonElement | null) => {
        const prevPill = this.pills[index];

        if (prevPill) {
          this.ro?.unobserve(prevPill);
        }

        if (node === null) return;

        this.pills[index] = node;

        this.ro?.observe(node);
      },
    };
  }

  getItemTextProps() {
    const { size } = this.asProps;

    return {
      size: size === 'm' ? 200 : 300,
    };
  }

  render() {
    const SPills = Root;
    const SSegmentIndicator = Box;
    const { Children, styles, disabled, behavior, value } = this.asProps;

    return sstyled(styles)(
      <SPills
        render={Box}
        role={behavior === 'auto' ? 'radiogroup' : 'tablist'}
        aria-disabled={disabled}
        use:tabIndex={value !== null ? -1 : 0}
        ref={this.rootRef}
      >
        <SSegmentIndicator
          tag='span'
          ref={this.segmentIndicatorRef}
          aria-hidden
        />
        <Children />
      </SPills>,
    );
  }
}

function Pill(props: Intergalactic.InternalTypings.InferChildComponentProps<NSPills.Pill.Component, typeof RootPills, 'Item'>) {
  const SPill = Root;
  const SPillContainer = Box;
  const SPillSeparator = Box;
  const { Children, styles, addonLeft, addonRight, selected, disabled, behavior, size } = props;

  const roleAreaProps = {
    'role': behavior === 'auto' ? 'radio' : 'tab',
    'aria-checked': behavior === 'auto' ? selected : undefined,
    'aria-selected': behavior !== 'auto' ? selected : undefined,
  };

  return sstyled(styles)(
    <SPillContainer>
      <SPill
        render={Box}
        tag='button'
        type='button'
        tabIndex={0}
        aria-disabled={disabled}
        {...roleAreaProps}
      >
        {addonLeft ? <Pills.Item.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Pills.Item.Text, Pills.Item.Addon)}
        {addonRight ? <Pills.Item.Addon tag={addonRight} /> : null}
      </SPill>
      <SPillSeparator
        // @ts-ignore
        size={size}
        aria-hidden
      />
    </SPillContainer>,
  );
}

function Text(props: Intergalactic.InternalTypings.InferComponentProps<NSPills.Pill.Text.Component>) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={SemcoreText} />);
}

function Addon(props: Intergalactic.InternalTypings.InferComponentProps<NSPills.Pill.Addon.Component>) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

export const wrapPills = <PropsExtending extends {}>(wrapper: (
  props: Intergalactic.InternalTypings.UntypeRefAndTag<
    Intergalactic.InternalTypings.ComponentPropsNesting<NSPills.WrapComponent>
  > &
  PropsExtending,
) => React.ReactNode) => wrapper as NSPills.WrapComponent<PropsExtending>;

/**
 * Pills
 *
 * {@link https://developer.semrush.com/intergalactic/components/pills/pills-api/|API} | {@link https://developer.semrush.com/intergalactic/components/pills/pills-code/|Examples}
 */
const Pills = createComponent<
  NSPills.Component,
  typeof RootPills
>(RootPills, {
  Item: [Pill, { Text, Addon }],
});

export default Pills;
