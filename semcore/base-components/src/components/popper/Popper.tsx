import type { Instance, Modifier } from '@popperjs/core/lib/types';
import type { Intergalactic } from '@semcore/core';
import {
  createComponent,
  Component,
  Root,
  sstyled,
  lastInteraction,
} from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import logger from '@semcore/core/lib/utils/logger';
import pick from '@semcore/core/lib/utils/pick';
import { forkRef } from '@semcore/core/lib/utils/ref';
import setRef from '@semcore/core/lib/utils/setRef';
import { useContextTheme } from '@semcore/core/lib/utils/ThemeProvider';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import {
  useFocusLock,
  isFocusInside,
  setFocus,
  makeFocusLockSyntheticEvent,
} from '@semcore/core/lib/utils/use/useFocusLock';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import {
  useZIndexStacking,
  ZIndexStackingContextProvider,
} from '@semcore/core/lib/utils/zIndexStacking';
import React from 'react';

import { Scale, animationContext } from '../animation';
import { Box } from '../flex-box';
import { NeighborLocation } from '../neighbor-location';
import { OutsideClick } from '../outside-click';
import { Portal, PortalProvider } from '../portal';
import createPopper from './createPopper';
import type { NSPopper } from './Popper.types';
import style from './style/popper.shadow.css';

function isObject(obj: unknown) {
  return typeof obj === 'object' && !Array.isArray(obj);
}

function someArray(arr1: unknown[], arr2: unknown[]) {
  return arr1.filter(function (i) {
    return arr2.indexOf(i) !== -1;
  });
}

const useUpdatePopperEveryFrame = (popperRef: React.RefObject<Instance>) => {
  const nextAnimationFrameRef = React.useRef(-1);
  const handleAnimationFrame = React.useCallback((until: number) => {
    if (until < Date.now()) return;
    popperRef.current?.update();
    nextAnimationFrameRef.current = requestAnimationFrame(() => handleAnimationFrame(until));
  }, []);
  React.useEffect(() => () => cancelAnimationFrame(nextAnimationFrameRef.current), []);
  return handleAnimationFrame;
};

export const isInputTriggerTag = (tag: null | string | Record<any, any>) => {
  if (typeof tag === 'string') return tag.toLowerCase().includes('input');
  if (typeof tag === 'object' && tag !== null && typeof tag.displayName === 'string')
    return tag.displayName.toLowerCase().includes('input');
  if (typeof tag === 'object' && tag !== null && typeof tag.render?.displayName === 'string')
    return tag.render.displayName.toLowerCase().includes('input');
  return false;
};

let mouseMoveListenerAdded = false;
let lastMouseMove = 0;

const MODIFIERS_OPTIONS = [
  'offset',
  'preventOverflow',
  'arrow',
  'flip',
  'computeStyles',
  'eventListeners',
  'cursorAnchoring',
] as const;

class PopperRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSPopper.Component>,
  typeof PopperRoot.enhance,
  NSPopper.Handlers,
  {},
  {},
  NSPopper.DefaultProps
> {
  static displayName = 'Popper';

  static style = style;

  static defaultProps: NSPopper.DefaultProps = {
    defaultVisible: false,
    placement: 'auto',
    modifiers: [],
    arrow: {
      padding: 6,
    },
    strategy: 'absolute',
    interaction: 'click',
    timeout: 0,
    excludeRefs: [],
    focusLoop: true,
    cursorAnchoring: false,
  };

  static enhance = [
    uniqueIDEnhancement(),
    cssVariableEnhance({
      variable: '--intergalactic-duration-popper',
      fallback: '200',
      map: (v: string) => Number.parseInt(v, 10).toString(),
      prop: 'duration',
    }),
  ] as const;

  eventsInteractionMap = {
    click: {
      trigger: [['onClick'], ['onClick']],
      popper: [],
    },
    hover: {
      trigger: [
        ['onMouseEnter', 'onFocus', 'onKeyboardFocus', 'onTouchStart'],
        ['onMouseLeave', 'onBlur'],
      ],
      popper: [['onMouseEnter', 'onFocusCapture', 'onTouchStart'], ['onMouseLeave']],
    },
    focus: {
      trigger: [['onFocus', 'onClick'], ['onBlur']],
      // to intercept faster than onBlur on the trigger
      popper: [['onFocusCapture'], ['onBlur']],
    },
    none: {
      trigger: [],
      popper: [],
    },
  };

  observer: ResizeObserver | null = null;

  triggerRef = React.createRef<HTMLElement>();
  popperRef = React.createRef<HTMLElement>();
  popper = React.createRef() as React.MutableRefObject<Instance | null>;
  lastPopperReference: HTMLElement | null = null;
  ignoreTriggerFocus = false;

  timer = 0;
  timerMultiTrigger = 0;

  constructor(props: NSPopper.Props) {
    super(props);
    if (canUseDOM()) {
      this.observer = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          this.popper.current?.update();
        });
      });
    }
  }

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  mouseEnterCursorPositionRef: React.MutableRefObject<any> = { current: null };

  createTriggerRef = (ref?: HTMLElement) => {
    if (ref && this.triggerRef.current !== ref) {
      setRef(this.triggerRef, ref);
      this.createPopper();
    }
  };

  createPopperRef = (ref?: HTMLElement) => {
    if (ref && this.popperRef.current !== ref) {
      setRef(this.popperRef, ref);
      this.createPopper();
    }
  };

  getPopperOptions = () => {
    const { placement, modifiers = [], strategy, onFirstUpdate, ...other } = this.asProps;

    const optionsModifiers: Record<any, any> = pick(
      other,
      // @ts-ignore
      MODIFIERS_OPTIONS,
    );
    const modifiersFallback: Array<Partial<Modifier<any, any>>> = [];

    if (typeof optionsModifiers.offset === 'number') {
      optionsModifiers.offset = [0, optionsModifiers.offset];
    }
    const modifiersOptions: Array<Partial<Modifier<any, any>>> = MODIFIERS_OPTIONS.filter(
      (name) => optionsModifiers[name] !== undefined,
    ).map((name) => ({
      name,
      options: isObject(optionsModifiers[name])
        ? optionsModifiers[name]
        : { [name]: optionsModifiers[name] },
    }));

    modifiersOptions.push({
      name: 'computeStyles',
      options: { gpuAcceleration: false },
    });
    if (this.asProps.cursorAnchoring) {
      modifiersOptions.push({
        name: 'cursorAnchoring',
        options: {
          cursorAnchoring: this.asProps.cursorAnchoring,
          mouseEnterCursorPositionRef: this.mouseEnterCursorPositionRef,
        },
      });
    }

    if (this.asProps.popperMargin) {
      modifiersOptions.push({
        name: 'applyMaxSize',
        enabled: true,
        options: {
          margin: this.asProps.popperMargin,
          popperCtx: this,
        },
      });
    }

    const modifiersMerge = modifiersFallback.concat(...modifiersOptions, modifiers);

    return {
      placement,
      strategy,
      onFirstUpdate: callAllEventHandlers(onFirstUpdate, () => {
        this.observer?.observe(this.triggerRef.current!);
        this.observer?.observe(this.popperRef.current!);
        if (this.asProps.disablePortal) return;
        let parent = this.popperRef.current?.parentElement;
        const traversingLimit = 10;
        for (let i = 0; i < traversingLimit; i++) {
          if (!parent) break;
          this.observer?.observe(parent);
          if (parent === document.body) break;
          parent = parent.parentElement;
        }
      }),
      modifiers: modifiersMerge,
    };
  };

  createPopper() {
    if (!this.triggerRef.current || !this.popperRef.current) return;
    // @ts-ignore
    if (this.asProps.__disablePopper) return; // for datepicker tests

    const lastPopperReferenceMounted = Boolean(this.lastPopperReference?.parentElement);

    this.popper.current = createPopper(
      lastPopperReferenceMounted ? this.lastPopperReference! : this.triggerRef.current!,
      this.popperRef.current,
      this.getPopperOptions(),
    );
  }

  componentDidMount() {
    if (canUseDOM() && !mouseMoveListenerAdded) {
      mouseMoveListenerAdded = true;
      document.addEventListener(
        'mousemove',
        () => {
          lastMouseMove = Date.now();
        },
        { capture: true },
      );
    }
  }

  componentDidUpdate(prevProps: typeof this.asProps) {
    const popperProps = [
      'strategy',
      'placement',
      'offset',
      'preventOverflow',
      'arrow',
      'flip',
      'computeStyles',
      'eventListeners',
      'onFirstUpdate',
      'cursorAnchoring',
    ];
    if (
      this.popper.current &&
      // @ts-ignore
      popperProps.some((propName) => prevProps[propName] !== this.asProps[propName])
    ) {
      this.popper.current.setOptions(this.getPopperOptions());
    }
  }

  destroyPopper() {
    clearTimeout(this.timer);
    clearTimeout(this.timerMultiTrigger);

    this.observer?.disconnect();

    if (this.popper.current) {
      this.popper.current.destroy();
      this.popper.current = null;
    }
  }

  handlersFromInteraction(
    interaction: NSPopper.Props['interaction'],
    component: NSPopper.PopperComponent,
    visible: boolean,
  ) {
    const eventInteraction =
      typeof interaction === 'string' ? this.eventsInteractionMap[interaction] : interaction;

    if (!eventInteraction) return;

    const [showEvents = [], hideEvents = []] = eventInteraction[component];
    const crossEvents = someArray(showEvents, hideEvents);
    const handlers: Record<any, any> = {};

    showEvents.forEach((action) => {
      handlers[action] = this.bindHandlerChangeVisibleWithTimer(true, component, action);
    });
    hideEvents.forEach((action) => {
      handlers[action] = this.bindHandlerChangeVisibleWithTimer(false, component, action);
    });
    crossEvents.forEach((action: any) => {
      handlers[action] = visible
        ? this.bindHandlerChangeVisibleWithTimer(false, component, action)
        : this.bindHandlerChangeVisibleWithTimer(true, component, action);
    });
    return handlers;
  }

  makeKeyDownHandler = (component: NSPopper.PopperComponent) => (e: React.KeyboardEvent) => {
    const { visible } = this.asProps;
    if (visible && e.key === 'Escape') {
      e.stopPropagation();

      this.bindHandlerChangeVisibleWithTimer(false, component, 'onKeyDown')(e);
    }
  };

  bindHandlerKeyDown = (
    onKeyDown: (event: React.KeyboardEvent) => void | false,
    component: NSPopper.PopperComponent,
  ) => callAllEventHandlers(onKeyDown, this.makeKeyDownHandler(component));

  lastPopperClick = 0;
  bindHandlerChangeVisibleWithTimer =
    (visible: boolean, component?: NSPopper.PopperComponent, action?: any) => (e: React.SyntheticEvent) => {
      const trigger = this.triggerRef.current;
      if (
        component === 'trigger' &&
        action === 'onBlur' &&
        e.target instanceof HTMLElement &&
        'relatedTarget' in e &&
        e.relatedTarget instanceof HTMLElement
      ) {
        const focused = e.relatedTarget;
        const blurred = e.target;
        if (
          focused &&
          trigger &&
          blurred &&
          hasParent(focused, trigger) &&
          hasParent(blurred, trigger)
        ) {
          return;
        }
      }

      if (
        visible &&
        component === 'trigger' &&
        action === 'onFocus' &&
        this.asProps.interaction === 'hover' &&
        !lastInteraction.isKeyboard() &&
        e.target instanceof HTMLElement &&
        e.target.dataset.hideFocusHoverPopper === 'true'
      ) {
        return;
      }

      if (component === 'trigger' && action === 'onClick' && e.target instanceof HTMLElement) {
        const triggerClick = hasParent(e.target, trigger!);
        // @ts-ignore
        const associatedLabels = [...(trigger?.labels || [])];
        const popperInsideOfLabel = associatedLabels.some((label) =>
          hasParent(this.popperRef.current, label),
        );

        if (triggerClick && popperInsideOfLabel && Date.now() - this.lastPopperClick < 100) {
          return;
        }
      }
      /**
       * When popper appears right under mouse that doesn't move, it gets undesired onMouseEnter event.
       * That may cause hover interaction poppers to display two closely placed poppers.
       * That check ensures that onMouseEnter means mouse entered the popper, not popper entered the mouse.
       */
      if (component === 'popper' && action === 'onMouseEnter' && Date.now() - lastMouseMove > 100)
        return;

      if (action === 'onMouseEnter') {
        // @ts-ignore
        this.mouseEnterCursorPositionRef.current = { x: e.clientX, y: e.clientY };
      }

      const focusAction = ['onFocus', 'onKeyboardFocus', 'onFocusCapture'].includes(action);
      if (this.ignoreTriggerFocus && visible && component === 'trigger' && focusAction) {
        return;
      }
      if (!visible) {
        /**
         * When sibling popovers triggers with hover/focus interactions are navigated fast,
         * sometimes focus moves into closing popovers and prevents it from closing. It may cause
         * multiple popovers to be opened at the same time.
         */
        setTimeout(() => {
          const node = this.popperRef.current;
          if (node?.getAttribute('tabindex') === '0') {
            node.setAttribute('tabindex', '-1');
          }
        }, 0);
      }

      const target = e?.currentTarget;
      if (component === 'trigger' && target && target instanceof HTMLElement) {
        this.lastPopperReference = target;
      }
      this.handlerChangeVisibleWithTimer(visible, e, () => {
        clearTimeout(this.timerMultiTrigger);
        // instance popper is not here yet because the popperRef did not have time to come
        this.timerMultiTrigger = window.setTimeout(() => {
          if (
            visible &&
            component === 'trigger' &&
            this.popper.current &&
            this.lastPopperReference
          ) {
            if (this.popper.current.state.elements.reference !== this.lastPopperReference) {
              this.popper.current.state.elements.reference = this.lastPopperReference;
              // for update
              this.popper.current.setOptions({});
            }
          }
          if (!visible && component === 'popper') {
            const { timeout } = this.asProps;
            const latency = Array.isArray(timeout) ? timeout[1] : timeout;
            setTimeout(() => {
              this.ignoreTriggerFocus = false;
            }, latency + 20);
          }
        }, 0);
      });
      if (
        component === 'popper' &&
        !visible &&
        ['onClick', 'onBlur', 'onKeyDown'].includes(action)
      ) {
        this.ignoreTriggerFocus = true;
      }
    };

  handlerChangeVisibleWithTimer = (visible: boolean, e: React.SyntheticEvent, cb: () => void) => {
    const { timeout, disabled } = this.asProps;
    if (typeof disabled === 'boolean' && disabled && visible) return;
    const handlers = this.handlers;

    const timeoutConfig = typeof timeout === 'number' ? [timeout, timeout] : timeout!;
    const latency = visible ? timeoutConfig[0] : timeoutConfig[1];
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      handlers.visible(visible, e);
    }, latency);
    cb();
  };

  getTriggerProps() {
    const { visible, interaction, disableEnforceFocus, explicitTriggerSet } = this.asProps;
    // @ts-ignore
    const { onKeyDown, ...interactionProps } = this.handlersFromInteraction(
      interaction,
      'trigger',
      Boolean(visible),
    );

    return {
      ref: explicitTriggerSet ? undefined : this.createTriggerRef,
      active: visible,
      interaction,
      ...interactionProps,
      onKeyDown: this.bindHandlerKeyDown(onKeyDown, 'trigger'),
      disableEnforceFocus,
      popperRef: this.popperRef,
    };
  }

  getPopperProps() {
    const {
      visible,
      disablePortal,
      interaction,
      placement,
      duration,
      animationsDisabled,
      disableEnforceFocus,
    } = this.asProps;
    // @ts-ignore
    const { onKeyDown, ...interactionProps } = this.handlersFromInteraction(
      interaction,
      'popper',
      Boolean(visible),
    );

    return {
      ref: this.createPopperRef,
      triggerRef: this.triggerRef,
      visible,
      interaction,
      disablePortal,
      ...interactionProps,
      onKeyDown: this.bindHandlerKeyDown(onKeyDown, 'popper'),
      placement,
      duration,
      animationsDisabled,
      popper: this.popper,
      disableEnforceFocus,
      handleFocusOut: this.handlePopperFocusOut,
      onClick: this.handlePopperClick,
    };
  }

  handlePopperFocusOut = (event: React.SyntheticEvent) => {
    if (this.asProps.focusLoop) return;
    if (
      this.triggerRef.current &&
      event.target instanceof HTMLElement &&
      hasParent(event.target, this.triggerRef.current)
    )
      return;

    this.bindHandlerChangeVisibleWithTimer(false, 'popper', 'onBlur')(event);
  };

  handlePopperClick = () => {
    this.lastPopperClick = Date.now();
  };

  setContext() {
    return {
      popper: this.popper,
      setTrigger: this.createTriggerRef,
      setPopper: this.createPopperRef,
    };
  }

  componentWillUnmount() {
    this.destroyPopper();
  }

  render() {
    const { Children, visible, root, onOutsideClick, excludeRefs = [] } = this.asProps;
    return (
      <>
        {visible
          ? (
              <OutsideClick
                root={root}
                excludeRefs={[this.triggerRef, this.popperRef, ...excludeRefs]}
                onOutsideClick={callAllEventHandlers(
                  onOutsideClick,
                  this.bindHandlerChangeVisibleWithTimer(false),
                )}
              />
            )
          : null}
        <Children />
      </>
    );
  }
}

function Trigger(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSPopper.Trigger.Component, typeof PopperRoot, 'Trigger'> & NSPopper.Trigger.InnerProps,
) {
  const STrigger = Root;
  const { Children, onKeyboardFocus, highlighted, active, popperRef, forwardRef } = props;

  const triggerRef = React.useRef<HTMLElement>();

  React.useEffect(() => {
    if (highlighted === true && onKeyboardFocus) {
      onKeyboardFocus({ currentTarget: triggerRef.current });
    }
  }, [highlighted]);

  const activeRef = React.useRef(active);
  activeRef.current = active;
  React.useEffect(() => {
    if (!active) return;
    return () => {
      setTimeout(() => {
        if (activeRef.current) return;
        if (popperRef.current === null || !isFocusInside(popperRef.current) && document.activeElement !== document.body) return;
        if (!lastInteraction.isKeyboard()) return;

        if (triggerRef.current) {
          setFocus(triggerRef.current);
        }
      }, 1);
    };
  }, [active]);

  return (
    <>
      <STrigger
        render={Box}
        inline
        aria-haspopup={true}
        ref={forkRef(triggerRef, forwardRef!)}
        onBlur={props.onBlur}
      >
        <Children />
      </STrigger>
    </>
  );
}

function PopperPopper(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSPopper.Popper.Component, typeof PopperRoot, 'Popper'> & NSPopper.Popper.InnerProps,
) {
  const SPopper = Root;
  const {
    Children,
    styles,
    visible,
    disablePortal,
    ignorePortalsStacking,
    disableEnforceFocus,
    triggerRef,
    autoFocus,
    controlsLength,
    duration,
    animationsDisabled,
    popper,
    focusMaster = false,
    handleFocusOut,
    role,
    zIndex: providedZIndex,
    nodeToMount,
  } = props;
  const ref = React.useRef<HTMLElement>(null);
  const zIndex = useZIndexStacking('z-index-popper');

  // https://github.com/facebook/react/issues/11387
  const stopPropagation = React.useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation();
  }, []);
  const propagateFocusLockSyntheticEvent = React.useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation();
    // @ts-ignore
    ref.current?.dispatchEvent(makeFocusLockSyntheticEvent(event));
  }, []);

  const [portalMounted, setPortalMounted] = React.useState(disablePortal);
  useFocusLock(
    ref,
    autoFocus ?? false,
    triggerRef,
    !visible || disableEnforceFocus || !portalMounted,
    focusMaster,
    handleFocusOut,
  );

  useContextTheme(ref, visible);

  const updatePopperEveryFrame = useUpdatePopperEveryFrame(popper);
  const handleAnimationStart = React.useCallback(
    (duration?: number) => {
      if (duration && duration > 0) {
        updatePopperEveryFrame(Date.now() + Math.min(duration, 2000));
      }
    },
    [updatePopperEveryFrame],
  );
  const handleAnimationEnd = React.useCallback(() => {
    popper.current?.update();
  }, []);
  const animationCtx = React.useContext(animationContext);
  React.useEffect(() => {
    if (!ignorePortalsStacking) return;
    if (!animationCtx) return;
    const unsubscribeAnimationStart = animationCtx.onAnimationStart(handleAnimationStart);
    const unsubscribeAnimationEnd = animationCtx.onAnimationEnd(handleAnimationEnd);
    return () => {
      unsubscribeAnimationStart();
      unsubscribeAnimationEnd();
    };
  }, [animationCtx, ignorePortalsStacking]);

  React.useEffect(() => {
    if (role === 'dialog' && visible && process.env.NODE_ENV !== 'production') {
      const hasTitle = (node: HTMLElement) => {
        if (node.hasAttribute('aria-label')) return true;
        if (node.hasAttribute('aria-labelledby')) return true;
        if (node.hasAttribute('title')) return true;

        return false;
      };

      logger.warn(
        ref.current && !hasTitle(ref.current),
        `'title' or 'aria-label' or 'aria-labelledby' are required props for popper with role dialog`,
        // @ts-ignore
        props['data-ui-name'] || PopperPopper.displayName,
      );
    }
  }, [visible, role]);

  return sstyled(styles)(
    <Portal
      disablePortal={disablePortal}
      ignorePortalsStacking={ignorePortalsStacking}
      onMount={setPortalMounted}
      nodeToMount={nodeToMount}
    >
      <NeighborLocation controlsLength={controlsLength}>
        <ZIndexStackingContextProvider designToken='z-index-popper'>
          <SPopper
            render={Scale}
            animationsDisabled={animationsDisabled}
            visible={visible}
            duration={[duration, duration / 2]}
            ref={ref}
            onClick={stopPropagation}
            onContextMenu={stopPropagation}
            onDoubleClick={stopPropagation}
            onDrag={stopPropagation}
            onDragEnd={stopPropagation}
            onDragEnter={stopPropagation}
            onDragExit={stopPropagation}
            onDragLeave={stopPropagation}
            onDragOver={stopPropagation}
            onDragStart={stopPropagation}
            onDrop={stopPropagation}
            onMouseDown={stopPropagation}
            onMouseMove={stopPropagation}
            onMouseOver={stopPropagation}
            onMouseOut={stopPropagation}
            onMouseUp={stopPropagation}
            onKeyDown={propagateFocusLockSyntheticEvent}
            onKeyPress={stopPropagation}
            onKeyUp={stopPropagation}
            onFocus={stopPropagation}
            onBlur={propagateFocusLockSyntheticEvent}
            onChange={stopPropagation}
            onInput={stopPropagation}
            onInvalid={stopPropagation}
            onReset={stopPropagation}
            onSubmit={stopPropagation}
            use:zIndex={providedZIndex ?? zIndex}
          >
            <PortalProvider value={ref}>
              <Children />
            </PortalProvider>
          </SPopper>
        </ZIndexStackingContextProvider>
      </NeighborLocation>
    </Portal>,
  );
}

/**
 * Popper
 *
 * {@link https://developer.semrush.com/intergalactic/utils/popper/popper-api|API}
 */
export const Popper = createComponent<
  NSPopper.Component,
  typeof PopperRoot
>(PopperRoot, {
  Trigger,
  Popper: PopperPopper,
});
