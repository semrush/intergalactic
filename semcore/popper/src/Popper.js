import React, { useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { getFocusabledIn } from 'focus-lock';
import ResizeObserver from 'resize-observer-polyfill';

import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import OutsideClick from '@semcore/outside-click';
import Portal, { PortalProvider } from '@semcore/portal';
import NeighborLocation from '@semcore/neighbor-location';
import { setRef, useCallbackRef, useForkRef } from '@semcore/utils/lib/ref';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import pick from '@semcore/utils/lib/pick';
import useEventListener from '@semcore/utils/lib/use/useEventListener';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import createPopper from './createPopper';

import style from './style/popper.shadow.css';

function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj);
}

function someArray(arr1, arr2) {
  return arr1.filter(function(i) {
    return arr2.indexOf(i) !== -1;
  });
}

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
      padding: 12,
    },
    strategy: 'absolute',
    interaction: 'click',
    timeout: 0,
    excludeRefs: [],
  };

  static enhance = [uniqueIDEnhancement()];

  eventsInteractionMap = {
    click: {
      trigger: [['onClick'], ['onClick']],
      popper: [],
    },
    hover: {
      trigger: [['onMouseEnter'], ['onMouseLeave']],
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
      'The \'positionFixed\' property is deprecated, use \'strategy="fixed"\'',
      other['data-ui-name'] || Popper.displayName,
    );
    if (positionFixed) {
      strategy = 'fixed';
    }
    /* END positionFixed */
    /* START eventsDisabled */
    logger.warn(
      eventsDisabled !== undefined,
      'The \'eventsDisabled\' property is deprecated, use \'eventListeners={{scroll: false, resize: false}}\'',
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
      'The \'boundary\' property is deprecated, use \'preventOverflow={{rootBoundary: "document", boundary: HTMLElement}}\'',
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

    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.popper.current) {
      this.popper.current.destroy();
      this.popper.current = null;
    }
  }

  handlersFromInteraction(interaction, component, visible) {
    /* START displayEvents */
    const { displayEvents, ...other } = this.asProps;
    logger.warn(
      displayEvents !== undefined,
      'The \'displayEvents\' property is deprecated, use \'interaction\'',
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
    /* END displayEvents */

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
    const currentTarget = e.currentTarget;
    this.handlerChangeVisibleWithTimer(visible, e, () => {
      if (visible && component === 'trigger' && this.popper.current) {
        if (this.popper.current.state.elements.reference !== currentTarget) {
          this.popper.current.state.elements.reference = currentTarget;
          // for update
          this.popper.current.setOptions({});
        }
      }
    });
  };

  handlerChangeVisibleWithTimer = (visible, e, cb) => {
    let { timeout, displayTimeout, ...other } = this.asProps;
    const handlers = this.handlers;

    /* START displayTimeout */
    logger.warn(
      displayTimeout !== undefined,
      '\'DisplayTimeout\' property is deprecated, use \'timeout\'',
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
    const { visible, interaction, uid } = this.asProps;
    // @ts-ignore
    const { onKeyDown, ...interactionProps } = this.handlersFromInteraction(
      interaction,
      'trigger',
      visible,
    );
    return {
      ref: this.createTriggerRef,
      active: visible,
      // interaction,
      'aria-describedby': uid,
      ...interactionProps,
      onKeyDown: this.bindHandlerKeyDown(onKeyDown),
    };
  }

  getPopperProps() {
    const { visible, disablePortal, interaction, popperZIndex, uid, ...other } = this.asProps;
    // @ts-ignore
    const { onKeyDown, ...interactionProps } = this.handlersFromInteraction(
      interaction,
      'popper',
      visible,
    );

    /* START popperZIndex */
    logger.warn(
      popperZIndex !== undefined,
      'The \'popperZIndex\' property is deprecated, use styles directly in \'<Popper.Popper/>\'',
      other['data-ui-name'] || Popper.displayName,
    );
    /* END popperZIndex */

    return {
      ref: this.createPopperRef,
      triggerRef: this.triggerRef,
      id: uid,
      visible,
      interaction,
      disablePortal,
      ...interactionProps,
      onKeyDown: this.bindHandlerKeyDown(onKeyDown),
      style: popperZIndex !== undefined ? { zIndex: popperZIndex } : null,
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
    const { Children, visible, onOutsideClick, excludeRefs } = this.asProps;
    return (
      <>
        {visible ? (
          <OutsideClick
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

function Trigger() {
  const STrigger = Root;
  return (
    <STrigger
      render={Box}
      inline
      // Because the borders appear
      // tabIndex={interaction === 'focus' ? undefined : 0}
    />
  );
}

const FocusLockWrapper = React.forwardRef(function(
  { tag, disableEnforceFocus, returnFocusRef, returnFocus, ...other },
  ref,
) {
  const [eventLock, setEventLock] = useState(false);
  const [nodesLock, setNodesLock] = useState(false);

  const popperRef = useCallbackRef(null, (node) => {
    setNodesLock(node ? !getFocusabledIn(node).length : false);
  });

  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
  useEventListener(window, 'mousedown', () => setEventLock(true), true);
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
  useEventListener(window, 'keydown', () => setEventLock(false), true);

  useEffect(() => {
    return () => {
      if (!returnFocus || !eventLock || !canUseDOM()) return;
      setTimeout(() => {
        if (!document.activeElement || document.activeElement === document.body) {
          returnFocusRef.current?.focus();
        }
      }, 0);
    };
  }, [returnFocus, eventLock]);

  return (
    <FocusLock
      ref={useForkRef(popperRef, ref)}
      as={tag}
      disabled={disableEnforceFocus || nodesLock || eventLock}
      lockProps={other}
      returnFocus={returnFocus}
      {...other}
    />
  );
});

function PopperPopper(props) {
  const SPopper = Root;
  const {
    Children,
    styles,
    visible,
    disablePortal,
    disableEnforceFocus,
    triggerRef,
    interaction,
    controlsLength,
  } = props;
  const ref = useRef(null);

  // https://github.com/facebook/react/issues/11387
  const handlerStopPropagation = useCallback((e) => e.stopPropagation(), []);

  if (!visible) return null;

  return sstyled(styles)(
    <Portal disablePortal={disablePortal}>
      <NeighborLocation controlsLength={controlsLength}>
        <SPopper
          render={FocusLockWrapper}
          tag={Box}
          ref={ref}
          disableEnforceFocus={disableEnforceFocus}
          shards={[triggerRef]}
          returnFocus={interaction === 'click'}
          returnFocusRef={triggerRef}
          autoFocus={false}
          tabIndex={-1}
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
          onMouseEnter={handlerStopPropagation}
          onMouseLeave={handlerStopPropagation}
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
