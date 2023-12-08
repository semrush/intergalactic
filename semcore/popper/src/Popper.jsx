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
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { Scale, animationContext } from '@semcore/animation';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import { useContextTheme } from '@semcore/utils/lib/ThemeProvider';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import keyboardFocusEnhance, {
  useFocusSource,
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
  focusableTriggerReturnFocusToRef = React.createRef();
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
    const { visible, interaction, disableEnforceFocus } = this.asProps;
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
      focusableTriggerReturnFocusToRef: this.focusableTriggerReturnFocusToRef,
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
      ...other
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
      focusableTriggerReturnFocusToRef: this.focusableTriggerReturnFocusToRef,
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

const useReturnFocusEl = (interaction, onKeyboardFocus, disable) => {
  const [returnFocusEl, setReturnFocusEl] = React.useState(null);
  const focusSourceRef = useFocusSource();
  const handleFocus = React.useCallback(
    (event) => {
      if (focusSourceRef.current !== 'keyboard') return;
      onKeyboardFocus?.();
      if (disable) return;
      if (interaction !== 'focus') return;
      if (!event.relatedTarget) {
        setReturnFocusEl('after');
      }
      const focusToNesting = getElementNestingIndexes(event.target);
      const focusFromNesting = getElementNestingIndexes(event.relatedTarget);
      const nestingLength = Math.max(focusToNesting.length, focusFromNesting.length);
      for (let i = 0; i < nestingLength; i++) {
        if (focusFromNesting[i] === undefined) {
          setReturnFocusEl('after'); // <div tabIndex="0" id="focus1" /> <input id="focus2" /> </div>
          return;
        }
        if (focusFromNesting[i] > focusToNesting[i]) {
          setReturnFocusEl('before'); // <input id="focus2" /> <input id="focus1" />
          return;
        }
      }

      setReturnFocusEl('after'); // <input id="focus1" /> <input id="focus2" />
    },
    [interaction, onKeyboardFocus, disable],
  );
  const handleFocusReturnElBlur = React.useCallback(() => {
    setTimeout(() => setReturnFocusEl(null), 0);
  }, []);

  return { returnFocusEl, handleFocus, handleFocusReturnElBlur };
};
const useFocusCatch = (active, popperRef) => {
  const activeRef = React.useRef(active);
  activeRef.current = active;

  const [focusCatch, setFocusCatch] = React.useState(false);
  const handleFocusCatchBlur = React.useCallback(() => setFocusCatch(false), []);
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
        setFocusCatch(true);
      }, 1);
    };
  }, [active]);

  return { focusCatch, handleFocusCatchBlur, handleFocusCatchRef };
};

const focusCatcherStyles = { position: 'fixed' };
function Trigger(props) {
  const STrigger = Root;
  const SFocusHint = 'span';
  const {
    Children,
    interaction,
    focusableTriggerReturnFocusToRef,
    focusHint,
    onKeyboardFocus,
    disableEnforceFocus,
    active,
    popperRef,
  } = props;

  const { returnFocusEl, handleFocusReturnElBlur, handleFocus } = useReturnFocusEl(
    interaction,
    onKeyboardFocus,
    disableEnforceFocus,
  );
  const { focusCatch, handleFocusCatchBlur, handleFocusCatchRef } = useFocusCatch(
    active,
    popperRef,
  );

  return (
    <>
      {returnFocusEl === 'before' && (
        <div
          tabIndex='0'
          ref={focusableTriggerReturnFocusToRef}
          onBlur={handleFocusReturnElBlur}
          style={focusCatcherStyles}
        />
      )}
      <STrigger render={Box} inline role='button' aria-haspopup={true} onFocus={handleFocus}>
        <Children />
      </STrigger>
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
          style={focusCatcherStyles}
        />
      )}
      {focusCatch && (
        <div
          tabIndex='0'
          ref={handleFocusCatchRef}
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
    disableEnforceFocus,
    triggerRef,
    interaction,
    autoFocus,
    controlsLength,
    duration,
    animationsDisabled,
    popper,
    focusableTriggerReturnFocusToRef,
    focusMaster = false,
  } = props;
  const ref = React.useRef(null);

  // https://github.com/facebook/react/issues/11387
  const stopPropagation = React.useCallback((event) => event.stopPropagation(), []);

  useFocusLock(
    ref,
    autoFocus,
    interaction === 'focus' ? focusableTriggerReturnFocusToRef : triggerRef,
    !visible || disableEnforceFocus,
    focusMaster,
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
