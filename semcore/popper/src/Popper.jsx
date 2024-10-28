import React from 'react';

import canUseDOM from '@semcore/utils/lib/canUseDOM';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import OutsideClick from '@semcore/outside-click';
import Portal, { PortalProvider } from '@semcore/portal';
import NeighborLocation from '@semcore/neighbor-location';
import { setRef } from '@semcore/utils/lib/ref';
import {
  useFocusLock,
  isFocusInside,
  setFocus,
  makeFocusLockSyntheticEvent,
} from '@semcore/utils/lib/use/useFocusLock';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import pick from '@semcore/utils/lib/pick';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { Scale, animationContext } from '@semcore/animation';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import { useContextTheme } from '@semcore/utils/lib/ThemeProvider';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import keyboardFocusEnhance, {
  useFocusSource,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { hasParent } from '@semcore/utils/lib/hasParent';
import logger from '@semcore/utils/lib/logger';

import createPopper from './createPopper';

import style from './style/popper.shadow.css';
import {
  useZIndexStacking,
  ZIndexStackingContextProvider,
} from '@semcore/utils/lib/zIndexStacking';
import { forkRef } from '@semcore/utils/lib/ref';

function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj);
}

function someArray(arr1, arr2) {
  return arr1.filter(function (i) {
    return arr2.indexOf(i) !== -1;
  });
}

const useUpdatePopperEveryFrame = (popperRef) => {
  const nextAnimationFrameRef = React.useRef(-1);
  const handleAnimationFrame = React.useCallback((until) => {
    if (until < Date.now()) return;
    popperRef.current?.update();
    nextAnimationFrameRef.current = requestAnimationFrame(() => handleAnimationFrame(until));
  }, []);
  React.useEffect(() => () => cancelAnimationFrame(nextAnimationFrameRef.current), []);
  return handleAnimationFrame;
};

export const isInputTriggerTag = (tag) => {
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
];

class PopperRoot extends Component {
  static displayName = 'Popper';

  static style = style;

  static defaultProps = {
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
      map: Number.parseInt,
      prop: 'duration',
    }),
  ];

  eventsInteractionMap = {
    click: {
      trigger: [['onClick'], ['onClick']],
      popper: [],
    },
    hover: {
      trigger: [
        ['onMouseEnter', 'onKeyboardFocus', 'onTouchStart'],
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

  triggerRef = React.createRef();
  popperRef = React.createRef();
  popper = React.createRef();
  lastPopperReference = null;
  ignoreTriggerFocus = false;

  constructor(props) {
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

  mouseEnterCursorPositionRef = { current: null };

  createTriggerRef = (ref) => {
    if (ref && this.triggerRef.current !== ref) {
      setRef(this.triggerRef, ref);
      this.createPopper();
    }
  };

  createPopperRef = (ref) => {
    if (ref && this.popperRef.current !== ref) {
      setRef(this.popperRef, ref);
      this.createPopper();
    }
  };

  getPopperOptions = () => {
    const { placement, modifiers, strategy, onFirstUpdate, ...other } = this.asProps;
    const optionsModifiers = pick(other, MODIFIERS_OPTIONS);
    const modifiersFallback = [];

    if (typeof optionsModifiers.offset === 'number') {
      optionsModifiers.offset = [0, optionsModifiers.offset];
    }
    const modifiersOptions = MODIFIERS_OPTIONS.filter(
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

    const modifiersMerge = [...modifiersFallback, ...modifiersOptions].concat(modifiers);

    return {
      placement,
      strategy,
      onFirstUpdate: callAllEventHandlers(onFirstUpdate, () => {
        this.observer?.observe(this.triggerRef.current);
        this.observer?.observe(this.popperRef.current);
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
    if (this.asProps.__disablePopper) return;

    const lastPopperReferenceMounted = Boolean(this.lastPopperReference?.parentElement);

    this.popper.current = createPopper(
      lastPopperReferenceMounted ? this.lastPopperReference : this.triggerRef.current,
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

  componentDidUpdate(prevProps) {
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

  handlersFromInteraction(interaction, component, visible) {
    const eventInteraction =
      typeof interaction === 'string' ? this.eventsInteractionMap[interaction] : interaction;

    const [showEvents = [], hideEvents = []] = eventInteraction[component];
    const crossEvents = someArray(showEvents, hideEvents);
    const handlers = {};

    showEvents.forEach((action) => {
      handlers[action] = this.bindHandlerChangeVisibleWithTimer(true, component, action);
    });
    hideEvents.forEach((action) => {
      handlers[action] = this.bindHandlerChangeVisibleWithTimer(false, component, action);
    });
    crossEvents.forEach((action) => {
      handlers[action] = visible
        ? this.bindHandlerChangeVisibleWithTimer(false, component, action)
        : this.bindHandlerChangeVisibleWithTimer(true, component, action);
    });
    return handlers;
  }

  makeKeyDownHandler = (component) => (e) => {
    const { visible } = this.asProps;
    if (visible && e.key === 'Escape') {
      e.stopPropagation();

      this.bindHandlerChangeVisibleWithTimer(false, component, 'onKeyDown')(e);
    }
  };
  bindHandlerKeyDown = (onKeyDown, component) =>
    callAllEventHandlers(onKeyDown, this.makeKeyDownHandler(component));

  lastPopperClick = 0;
  bindHandlerChangeVisibleWithTimer = (visible, component, action) => (e) => {
    const trigger = this.triggerRef.current;
    if (component === 'trigger' && action === 'onBlur') {
      const focused = e.relatedTarget;
      const blurred = e.target;
      if (focused && blurred && hasParent(focused, trigger) && hasParent(blurred, trigger)) {
        return;
      }
    }

    if (component === 'trigger' && action === 'onClick') {
      const triggerClick = hasParent(e.target, trigger);
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
      this.timerMultiTrigger = setTimeout(() => {
        if (visible && component === 'trigger' && this.popper.current && this.lastPopperReference) {
          if (this.popper.current.state.elements.reference !== this.lastPopperReference) {
            this.popper.current.state.elements.reference = this.lastPopperReference;
            // for update
            this.popper.current.setOptions({});
          }
        }
        if (!visible && component === 'popper') {
          setTimeout(() => {
            this.ignoreTriggerFocus = false;
          }, 0);
        }
      }, 0);
    });
    if (component === 'popper' && !visible && ['onClick', 'onBlur', 'onKeyDown'].includes(action)) {
      this.ignoreTriggerFocus = true;
    }
  };

  handlerChangeVisibleWithTimer = (visible, e, cb) => {
    const { timeout, disabled } = this.asProps;
    if (typeof disabled === 'boolean' && disabled && visible) return;
    const handlers = this.handlers;

    const timeoutConfig = typeof timeout === 'number' ? [timeout, timeout] : timeout;
    const latency = visible ? timeoutConfig[0] : timeoutConfig[1];
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
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
      visible,
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
      visible,
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

  handlePopperFocusOut = (event) => {
    if (this.asProps.focusLoop) return;
    if (hasParent(event.target, this.triggerRef.current)) return;

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
    const { Children, visible, root, onOutsideClick, excludeRefs } = this.asProps;
    return (
      <>
        {visible ? (
          <OutsideClick
            root={root}
            excludeRefs={[this.triggerRef, this.popperRef, ...excludeRefs]}
            onOutsideClick={callAllEventHandlers(
              onOutsideClick,
              this.bindHandlerChangeVisibleWithTimer(false),
            )}
          />
        ) : null}
        <Children />
      </>
    );
  }
}

function Trigger(props) {
  const STrigger = Root;
  const SFocusHint = 'span';
  const { Children, focusHint, onKeyboardFocus, highlighted, active, popperRef, forwardRef } =
    props;

  const triggerRef = React.useRef();

  React.useEffect(() => {
    if (highlighted === true) {
      onKeyboardFocus({ currentTarget: triggerRef.current });
    }
  }, [highlighted]);

  const focusSourceRef = useFocusSource();
  const handleFocus = React.useCallback(
    (e) => {
      if (focusSourceRef.current === 'keyboard' && hasParent(e.target, triggerRef.current)) {
        onKeyboardFocus?.();
      }
    },
    [onKeyboardFocus, focusSourceRef.current, triggerRef.current],
  );

  React.useEffect(() => {
    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  const activeRef = React.useRef(active);
  activeRef.current = active;
  React.useEffect(() => {
    if (!active) return;
    if (!popperRef.current) return;
    return () => {
      setTimeout(() => {
        if (activeRef.current) return;
        if (!isFocusInside(popperRef.current) && document.activeElement !== document.body) return;
        if (focusSourceRef.current !== 'keyboard') return;

        setFocus(triggerRef.current);
      }, 1);
    };
  }, [active]);

  return (
    <>
      <STrigger
        render={Box}
        inline
        aria-haspopup={true}
        ref={forkRef(triggerRef, forwardRef)}
        onBlur={props.onBlur}
      >
        <Children />
      </STrigger>
      {focusHint && false && (
        <SFocusHint aria-live='polite'>
          <ScreenReaderOnly>{focusHint}</ScreenReaderOnly>
        </SFocusHint>
      )}
    </>
  );
}

function PopperPopper(props) {
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
  } = props;
  const ref = React.useRef(null);
  const zIndex = useZIndexStacking('z-index-popper');

  // https://github.com/facebook/react/issues/11387
  const stopPropagation = React.useCallback((event) => {
    event.stopPropagation();
  }, []);
  const propagateFocusLockSyntheticEvent = React.useCallback((event) => {
    event.nativeEvent.stopImmediatePropagation();
    ref.current?.dispatchEvent(makeFocusLockSyntheticEvent(event));
  }, []);

  const [portalMounted, setPortalMounted] = React.useState(disablePortal);
  useFocusLock(
    ref,
    autoFocus,
    triggerRef,
    !visible || disableEnforceFocus || !portalMounted,
    focusMaster,
    handleFocusOut,
  );

  useContextTheme(ref, visible);

  const updatePopperEveryFrame = useUpdatePopperEveryFrame(popper);
  const handleAnimationStart = React.useCallback(
    (duration) => {
      if (duration > 0) {
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
      const hasTitle = (node) => {
        if (node.hasAttribute('aria-label')) return true;
        if (node.hasAttribute('aria-labelledby')) return true;
        if (node.hasAttribute('title')) return true;

        return false;
      };

      logger.warn(
        ref.current && !hasTitle(ref.current),
        `'title' or 'aria-label' or 'aria-labelledby' are required props for popper with role dialog`,
        props['data-ui-name'] || PopperPopper.displayName,
      );
    }
  }, [visible, role]);

  return sstyled(styles)(
    <Portal
      disablePortal={disablePortal}
      ignorePortalsStacking={ignorePortalsStacking}
      onMount={setPortalMounted}
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

PopperPopper.enhance = [keyboardFocusEnhance(false)];

const Popper = createComponent(PopperRoot, {
  Trigger,
  Popper: PopperPopper,
});

export default Popper;
