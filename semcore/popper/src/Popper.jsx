import React from 'react';

import canUseDOM from '@semcore/utils/lib/canUseDOM';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import OutsideClick from '@semcore/outside-click';
import Portal, { PortalProvider } from '@semcore/portal';
import NeighborLocation from '@semcore/neighbor-location';
import { setRef } from '@semcore/utils/lib/ref';
import { useFocusLock, isFocusInside } from '@semcore/utils/lib/use/useFocusLock';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import pick from '@semcore/utils/lib/pick';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { Scale, animationContext } from '@semcore/animation';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import { useContextTheme } from '@semcore/utils/lib/ThemeProvider';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import keyboardFocusEnhance, {
  useFocusSource,
  enforcedKeyboardFocusEnhanceContext,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import createPopper from './createPopper';

import style from './style/popper.shadow.css';

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

const MODIFIERS_OPTIONS = [
  'offset',
  'preventOverflow',
  'arrow',
  'flip',
  'computeStyles',
  'eventListeners',
];

class Popper extends Component {
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
        ['onMouseEnter', 'onKeyboardFocus'],
        ['onMouseLeave', 'onBlur'],
      ],
      popper: [['onMouseEnter', 'onFocusCapture'], ['onMouseLeave']],
    },
    focus: {
      trigger: [['onFocus'], ['onBlur']],
      // to intercept faster than onBlur on the trigger
      popper: [['onFocusCapture'], ['onBlur']],
    },
    none: {
      trigger: [],
      popper: [],
    },
  };

  // timer: ReturnType<typeof setTimeout>;
  // observer: ResizeObserver;
  triggerRef = React.createRef();
  popperRef = React.createRef();
  popper = React.createRef();

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

    const modifiersMerge = [...modifiersFallback, ...modifiersOptions].concat(modifiers);

    return {
      placement,
      strategy,
      onFirstUpdate: callAllEventHandlers(onFirstUpdate, () => {
        this.observer?.observe(this.triggerRef.current);
        this.observer?.observe(this.popperRef.current);
      }),
      modifiers: modifiersMerge,
    };
  };

  createPopper() {
    if (!this.triggerRef.current || !this.popperRef.current) return;
    if (this.asProps.__disablePopper) return;

    this.popper.current = createPopper(
      this.triggerRef.current,
      this.popperRef.current,
      this.getPopperOptions(),
    );
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
      handlers[action] = this.bindHandlerChangeVisibleWithTimer(true, component);
    });
    hideEvents.forEach((action) => {
      handlers[action] = this.bindHandlerChangeVisibleWithTimer(false, component);
    });
    crossEvents.forEach((action) => {
      handlers[action] = visible
        ? this.bindHandlerChangeVisibleWithTimer(false, component)
        : this.bindHandlerChangeVisibleWithTimer(true, component);
    });
    return handlers;
  }

  handlerKeyDown = (e) => {
    const { visible } = this.asProps;
    if (visible && e.key === 'Escape') {
      e.stopPropagation();

      this.bindHandlerChangeVisibleWithTimer(false)(e);
    }
  };
  bindHandlerKeyDown = (onKeyDown) => callAllEventHandlers(onKeyDown, this.handlerKeyDown);

  bindHandlerChangeVisibleWithTimer = (visible, component) => (e) => {
    const currentTarget = e?.currentTarget;
    this.handlerChangeVisibleWithTimer(visible, e, () => {
      clearTimeout(this.timerMultiTrigger);
      // instance popper is not here yet because the popperRef did not have time to come
      this.timerMultiTrigger = setTimeout(() => {
        if (visible && component === 'trigger' && this.popper.current && currentTarget) {
          if (this.popper.current.state.elements.reference !== currentTarget) {
            this.popper.current.state.elements.reference = currentTarget;
            // for update
            this.popper.current.setOptions({});
          }
        }
      }, 0);
    });
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
      cb();
    }, latency);
  };

  getTriggerProps() {
    const { visible, interaction, disableEnforceFocus, autoFocus, focusMaster, focusLoop } =
      this.asProps;
    // @ts-ignore
    const { onKeyDown, ...interactionProps } = this.handlersFromInteraction(
      interaction,
      'trigger',
      visible,
    );
    return {
      ref: this.createTriggerRef,
      active: visible,
      interaction,
      ...interactionProps,
      onKeyDown: this.bindHandlerKeyDown(onKeyDown),
      disableEnforceFocus,
      popperRef: this.popperRef,
      autoFocus,
      focusMaster,
      closePopper: this.bindHandlerChangeVisibleWithTimer(false, 'trigger'),
      focusLoop,
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
      onKeyDown: this.bindHandlerKeyDown(onKeyDown),
      placement,
      duration,
      animationsDisabled,
      popper: this.popper,
      disableEnforceFocus,
    };
  }

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

const getElementNestingIndexes = (element, chain = new Set([element, document.body])) => {
  if (!element?.parentElement) return [];
  const index = Array.from(element.parentElement.children).indexOf(element);
  if (chain.has(element.parentElement)) return [index];
  chain.add(element.parentElement);
  return [...getElementNestingIndexes(element.parentElement, chain), index];
};

const getElementsRelativePosition = (focused, blurred) => {
  if (!blurred) return undefined;
  const focusedNesting = getElementNestingIndexes(focused);
  const blurredNesting = getElementNestingIndexes(blurred);

  if (focusedNesting.length === 0) return undefined;
  if (blurredNesting.length === 0) return undefined;

  const nestingLength = Math.max(focusedNesting.length, blurredNesting.length);
  for (let i = 0; i < nestingLength; i++) {
    if (blurredNesting[i] === undefined) {
      return 'after'; // <div tabIndex="0" id="focus1" /> <input id="focus2" /> </div>
    }
    if (blurredNesting[i] > focusedNesting[i]) {
      return 'before'; // <input id="focus2" /> <input id="focus1" />
    }
  }

  return 'after'; // <input id="focus1" /> <input id="focus2" />
};

const hasParent = (element, parent) => {
  if (!element) return false;
  if (element === document.body) return parent === document.body;
  if (element === parent) return true;
  return hasParent(element.parentElement, parent);
};

const useReturnFocusEl = (interaction, onKeyboardFocus, disable) => {
  const [keyboardFocused, setKeyboardFocused] = React.useState(false);
  const [focusMoveDirection, setFocusMoveDirection] = React.useState(null);
  const [returnFocusEl, setReturnFocusEl] = React.useState(null);
  const focusSourceRef = useFocusSource();
  const handleFocus = React.useCallback(
    (event) => {
      if (focusSourceRef.current !== 'keyboard') return;
      onKeyboardFocus?.();
      if (disable) return;
      if (interaction === 'click') return;

      const focusMoveDirection = getElementsRelativePosition(event.target, event.relatedTarget);
      setReturnFocusEl(focusMoveDirection || 'after');
      if (focusMoveDirection) setFocusMoveDirection(focusMoveDirection);
    },
    [interaction, onKeyboardFocus, disable],
  );
  const handleFocusReturnElFocus = React.useCallback(() => {
    if (focusSourceRef.current !== 'keyboard') return;
    setKeyboardFocused(true);
  }, []);
  const handleFocusReturnElBlur = React.useCallback(() => {
    setTimeout(() => setReturnFocusEl(null), 0);
    setKeyboardFocused(false);
  }, []);

  return {
    returnFocusEl,
    handleFocus,
    handleFocusReturnElFocus,
    handleFocusReturnElBlur,
    keyboardFocused,
    setReturnFocusEl,
    setKeyboardFocused,
    focusMoveDirection,
  };
};
const useFocusCatch = (active, interaction, triggerRef, popperRef) => {
  const activeRef = React.useRef(active);
  activeRef.current = active;

  const [keyboardFocused, setKeyboardFocused] = React.useState(false);
  const [focusCatch, setFocusCatch] = React.useState(false);
  const focusSourceRef = useFocusSource();
  const handleFocusCatchFocus = React.useCallback(() => {
    if (focusSourceRef.current !== 'keyboard') return;
    setKeyboardFocused(true);
  }, []);
  const handleFocusCatchBlur = React.useCallback(() => {
    setFocusCatch(false);
    setKeyboardFocused(false);
  }, []);
  const handleFocusCatchRef = React.useCallback((node) => {
    if (activeRef.current) return setFocusCatch(false);
    if (!isFocusInside(popperRef.current) && document.activeElement !== document.body)
      return setFocusCatch(false);
    node?.focus();
  }, []);

  React.useEffect(() => {
    if (!active) return;
    if (!popperRef.current) return;
    return () => {
      setTimeout(() => {
        if (activeRef.current) return;
        if (!isFocusInside(popperRef.current) && document.activeElement !== document.body) return;

        if (interaction === 'hover' || interaction === 'focus') {
          setFocusCatch(true);
        } else {
          triggerRef.current?.focus();
        }
      }, 1);
    };
  }, [active, interaction]);

  return {
    focusCatch,
    handleFocusCatchFocus,
    handleFocusCatchBlur,
    handleFocusCatchRef,
    keyboardFocused,
  };
};

const focusCatcherStyles = { position: 'fixed' };
function Trigger(props) {
  const STrigger = Root;
  const SFocusHint = 'span';
  const {
    Children,
    interaction,
    focusHint,
    onKeyboardFocus,
    disableEnforceFocus,
    active,
    popperRef,
    highlighted,
    autoFocus,
    focusMaster,
    closePopper,
    focusLoop,
  } = props;

  const triggerRef = React.useRef();
  const focusableTriggerReturnFocusToRef = React.useRef();

  const {
    focusMoveDirection,
    returnFocusEl,
    setReturnFocusEl,
    handleFocusReturnElBlur,
    handleFocus,
    keyboardFocused: returnElKeyboardFocused,
    setKeyboardFocused: setReturnElKeyboardFocused,
  } = useReturnFocusEl(interaction, onKeyboardFocus, disableEnforceFocus, handleFocusOut);
  const {
    focusCatch,
    handleFocusReturnElFocus,
    handleFocusCatchFocus,
    handleFocusCatchBlur,
    handleFocusCatchRef,
    keyboardFocused: focusCatchKeyboardFocused,
  } = useFocusCatch(active, interaction, triggerRef, popperRef);

  const enforceKeyboardFocused = returnElKeyboardFocused || focusCatchKeyboardFocused;

  React.useEffect(() => {
    if (highlighted === true) {
      onKeyboardFocus({ currentTarget: triggerRef.current });
    }
  }, [highlighted]);

  const handleFocusOut = React.useCallback(
    (event) => {
      if (focusLoop) return;
      if (hasParent(event.relatedTarget, triggerRef.current)) return;
      closePopper();
      setReturnFocusEl(focusMoveDirection);
      setReturnElKeyboardFocused(true);
    },
    [focusMoveDirection, focusLoop],
  );

  useFocusLock(
    popperRef,
    autoFocus,
    interaction === 'focus' || interaction === 'hover'
      ? focusableTriggerReturnFocusToRef
      : triggerRef,
    !active || disableEnforceFocus,
    focusMaster,
    handleFocusOut,
  );

  return (
    <>
      {returnFocusEl === 'before' && (
        <div
          tabIndex='0'
          ref={focusableTriggerReturnFocusToRef}
          onBlur={handleFocusReturnElBlur}
          onFocus={handleFocusReturnElFocus}
          style={focusCatcherStyles}
        />
      )}
      <enforcedKeyboardFocusEnhanceContext.Provider value={enforceKeyboardFocused}>
        <STrigger
          render={Box}
          inline
          role='button'
          aria-haspopup={true}
          onFocus={handleFocus}
          ref={triggerRef}
        >
          <Children />
        </STrigger>
      </enforcedKeyboardFocusEnhanceContext.Provider>
      {focusHint && false && (
        <SFocusHint aria-live='polite'>
          <ScreenReaderOnly>{focusHint}</ScreenReaderOnly>
        </SFocusHint>
      )}
      {returnFocusEl === 'after' && (
        <div
          tabIndex='0'
          ref={focusableTriggerReturnFocusToRef}
          onBlur={handleFocusReturnElBlur}
          onFocus={handleFocusReturnElFocus}
          style={focusCatcherStyles}
        />
      )}
      {focusCatch && (
        <div
          tabIndex='0'
          ref={handleFocusCatchRef}
          onFocus={handleFocusCatchFocus}
          onBlur={handleFocusCatchBlur}
          style={focusCatcherStyles}
        />
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
    controlsLength,
    duration,
    animationsDisabled,
    popper,
  } = props;
  const ref = React.useRef(null);

  // https://github.com/facebook/react/issues/11387
  const stopPropagation = React.useCallback((event) => event.stopPropagation(), []);

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

  return sstyled(styles)(
    <Portal disablePortal={disablePortal} ignorePortalsStacking={ignorePortalsStacking}>
      <NeighborLocation controlsLength={controlsLength}>
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
          onKeyDown={stopPropagation}
          onKeyPress={stopPropagation}
          onKeyUp={stopPropagation}
          onFocus={stopPropagation}
          onBlur={stopPropagation}
          onChange={stopPropagation}
          onInput={stopPropagation}
          onInvalid={stopPropagation}
          onReset={stopPropagation}
          onSubmit={stopPropagation}
        >
          <PortalProvider value={ref}>
            <Children />
          </PortalProvider>
        </SPopper>
      </NeighborLocation>
    </Portal>,
  );
}

PopperPopper.enhance = [keyboardFocusEnhance()];

export default createComponent(Popper, {
  Trigger,
  Popper: PopperPopper,
});
