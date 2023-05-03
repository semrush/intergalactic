import React, { useCallback, useRef } from 'react';

import ResizeObserver from 'resize-observer-polyfill';

import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import OutsideClick from '@semcore/outside-click';
import Portal, { PortalProvider } from '@semcore/portal';
import NeighborLocation from '@semcore/neighbor-location';
import { setRef } from '@semcore/utils/lib/ref';
import { useFocusLock } from '@semcore/utils/lib/use/useFocusLock';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import pick from '@semcore/utils/lib/pick';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { Scale, animationContext } from '@semcore/animation';
import { cssVariableEnhance } from '@semcore/utils/lib/useCssVariable';
import { useContextTheme } from '@semcore/utils/lib/ThemeProvider';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import { useFocusSource } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

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
      popper: [['onMouseEnter'], ['onMouseLeave']],
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
    this.observer = new ResizeObserver(() => {
      this.popper.current?.update();
    });
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

  createPopper() {
    if (!this.triggerRef.current || !this.popperRef.current) return;

    let {
      placement,
      modifiers,
      strategy,
      onFirstUpdate,
      positionFixed,
      eventsDisabled,
      boundary,
      ...other
    } = this.asProps;
    const optionsModifiers = pick(other, MODIFIERS_OPTIONS);
    const modifiersFallback = [];

    /* START positionFixed */
    logger.warn(
      positionFixed !== undefined,
      "The 'positionFixed' property is deprecated, use 'strategy=\"fixed\"'",
      other['data-ui-name'] || Popper.displayName,
    );
    if (positionFixed) {
      strategy = 'fixed';
    }
    /* END positionFixed */
    /* START eventsDisabled */
    logger.warn(
      eventsDisabled !== undefined,
      "The 'eventsDisabled' property is deprecated, use 'eventListeners={{scroll: false, resize: false}}'",
      other['data-ui-name'] || Popper.displayName,
    );
    if (eventsDisabled !== undefined) {
      modifiersFallback.push({
        name: 'eventListeners',
        options: {
          scroll: false,
          resize: false,
        },
      });
    }
    /* END eventsDisabled */
    /* START boundary */
    logger.warn(
      boundary !== undefined,
      "The 'boundary' property is deprecated, use 'preventOverflow={{rootBoundary: \"document\", boundary: HTMLElement}}'",
      other['data-ui-name'] || Popper.displayName,
    );
    if (boundary !== undefined) {
      const options = {};
      if (typeof boundary !== 'string') {
        options.boundary = boundary;
        options.rootBoundary = 'document';
      } else if (boundary === 'window') {
        options.rootBoundary = 'document';
      } else if (boundary === 'viewport') {
        options.rootBoundary = 'viewport';
      } else if (boundary === 'scrollParent') {
        options.boundary = 'clippingParents';
        options.altBoundary = true;
      }
      modifiersFallback.push({
        name: 'preventOverflow',
        options,
      });
    }
    /* END boundary */

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
    this.popper.current = createPopper(this.triggerRef.current, this.popperRef.current, {
      placement,
      strategy,
      onFirstUpdate: callAllEventHandlers(onFirstUpdate, () => {
        this.observer.observe(this.triggerRef.current);
        this.observer.observe(this.popperRef.current);
      }),
      modifiers: modifiersMerge,
    });
  }

  destroyPopper() {
    clearTimeout(this.timer);
    clearTimeout(this.timerMultiTrigger);

    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.popper.current) {
      this.popper.current.destroy();
      this.popper.current = null;
    }
  }

  handlersFromInteraction(interaction, component, visible) {
    const { displayEvents, ...other } = this.asProps;
    logger.warn(
      displayEvents !== undefined,
      "The 'displayEvents' property is deprecated, use 'interaction'",
      other['data-ui-name'] || Popper.displayName,
    );
    if (displayEvents !== undefined) {
      interaction = {
        trigger: [displayEvents.show, displayEvents.hide],
        popper: [],
      };
      if (displayEvents.hide.includes('onMouseLeave')) {
        interaction.popper = interaction.trigger;
      }
    }

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

      this.triggerRef.current?.focus();

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
    let { timeout, displayTimeout, ...other } = this.asProps;
    const handlers = this.handlers;

    /* START displayTimeout */
    logger.warn(
      displayTimeout !== undefined,
      "'DisplayTimeout' property is deprecated, use 'timeout'",
      other['data-ui-name'] || Popper.displayName,
    );
    if (displayTimeout !== undefined) {
      timeout = [displayTimeout.show, displayTimeout.hide];
    }
    /* END displayTimeout */

    const timeoutConfig = typeof timeout === 'number' ? [timeout, timeout] : timeout;
    const latency = visible ? timeoutConfig[0] : timeoutConfig[1];
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      handlers.visible(visible, e);
      cb();
    }, latency);
  };

  getTriggerProps() {
    const { visible, interaction } = this.asProps;
    const { focusableTriggerReturnFocusToRef } = this;
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
      focusableTriggerReturnFocusToRef,
    };
  }

  getPopperProps() {
    const { focusableTriggerReturnFocusToRef } = this;
    const {
      visible,
      disablePortal,
      interaction,
      popperZIndex,
      placement,
      duration,
      animationsDisabled,
      ...other
    } = this.asProps;
    // @ts-ignore
    const { onKeyDown, ...interactionProps } = this.handlersFromInteraction(
      interaction,
      'popper',
      visible,
    );

    /* START popperZIndex */
    logger.warn(
      popperZIndex !== undefined,
      "The 'popperZIndex' property is deprecated, use styles directly in '<Popper.Popper/>'",
      other['data-ui-name'] || Popper.displayName,
    );
    /* END popperZIndex */

    return {
      ref: this.createPopperRef,
      triggerRef: this.triggerRef,
      visible,
      interaction,
      disablePortal,
      ...interactionProps,
      onKeyDown: this.bindHandlerKeyDown(onKeyDown),
      style: popperZIndex !== undefined ? { zIndex: popperZIndex } : null,
      placement,
      duration,
      animationsDisabled,
      popper: this.popper,
      focusableTriggerReturnFocusToRef,
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

function Trigger(props) {
  const STrigger = Root;
  const SFocusHint = 'span';
  const { Children, interaction, focusableTriggerReturnFocusToRef, focusHint, onKeyboardFocus } =
    props;

  const [returnFocusEl, setReturnFocusEl] = React.useState(null);
  const focusSourceRef = useFocusSource();
  const handleFocus = React.useCallback(
    (event) => {
      if (focusSourceRef.current !== 'keyboard') return;
      onKeyboardFocus?.();
      if (interaction !== 'focus') return;
      const targetNesting = getElementNestingIndexes(event.target);
      const sourceNesting = getElementNestingIndexes(event.relatedTarget ?? document.body);
      const focusMovesBackwards = sourceNesting.every(
        (nestingIndex, arrIndex) => nestingIndex >= targetNesting[arrIndex],
      );
      if (focusMovesBackwards) setReturnFocusEl('before');
      else setReturnFocusEl('after');
    },
    [interaction, onKeyboardFocus],
  );
  const handleFocusReturnElBlur = React.useCallback(() => {
    setTimeout(() => setReturnFocusEl(null), 0);
  }, []);

  return (
    <>
      {returnFocusEl === 'before' && (
        <div tabIndex="0" ref={focusableTriggerReturnFocusToRef} onBlur={handleFocusReturnElBlur} />
      )}
      <STrigger render={Box} inline role="button" aria-haspopup={true} onFocus={handleFocus}>
        <Children />
      </STrigger>
      {focusHint && false && (
        <SFocusHint aria-live="polite">
          <ScreenReaderOnly>{focusHint}</ScreenReaderOnly>
        </SFocusHint>
      )}
      {returnFocusEl === 'after' && (
        <div tabIndex="0" ref={focusableTriggerReturnFocusToRef} onBlur={handleFocusReturnElBlur} />
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
  } = props;
  const ref = useRef(null);

  // https://github.com/facebook/react/issues/11387
  const handlerStopPropagation = useCallback((e) => e.stopPropagation(), []);

  useFocusLock(
    ref,
    autoFocus,
    interaction === 'focus' ? focusableTriggerReturnFocusToRef : triggerRef,
    !visible || disableEnforceFocus,
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
          onClick={handlerStopPropagation}
          onContextMenu={handlerStopPropagation}
          onDoubleClick={handlerStopPropagation}
          onDrag={handlerStopPropagation}
          onDragEnd={handlerStopPropagation}
          onDragEnter={handlerStopPropagation}
          onDragExit={handlerStopPropagation}
          onDragLeave={handlerStopPropagation}
          onDragOver={handlerStopPropagation}
          onDragStart={handlerStopPropagation}
          onDrop={handlerStopPropagation}
          onMouseDown={handlerStopPropagation}
          onMouseMove={handlerStopPropagation}
          onMouseOver={handlerStopPropagation}
          onMouseOut={handlerStopPropagation}
          onMouseUp={handlerStopPropagation}
          onKeyDown={handlerStopPropagation}
          onKeyPress={handlerStopPropagation}
          onKeyUp={handlerStopPropagation}
          onFocus={handlerStopPropagation}
          onBlur={handlerStopPropagation}
          onChange={handlerStopPropagation}
          onInput={handlerStopPropagation}
          onInvalid={handlerStopPropagation}
          onReset={handlerStopPropagation}
          onSubmit={handlerStopPropagation}
        >
          <PortalProvider value={ref}>
            <Children />
          </PortalProvider>
        </SPopper>
      </NeighborLocation>
    </Portal>,
  );
}

export default createComponent(Popper, {
  Trigger,
  Popper: PopperPopper,
});
