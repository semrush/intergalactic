import React, {
  DOMAttributes,
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import FocusLock from 'react-focus-lock';
import { getFocusabledIn } from 'focus-lock';
import ResizeObserver from 'resize-observer-polyfill';
import createPopper from './createPopper';
// eslint-disable-next-line import/named
import { Instance, Modifier, Options } from '@popperjs/core';
import { Options as OptionsOffset } from '@popperjs/core/lib/modifiers/offset';
import { Options as OptionsPreventOverflow } from '@popperjs/core/lib/modifiers/preventOverflow';
import { Options as OptionsArrow } from '@popperjs/core/lib/modifiers/arrow';
import { Options as OptionsFlip } from '@popperjs/core/lib/modifiers/flip';
import { Options as OptionsComputeStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import { Options as OptionsEventListeners } from '@popperjs/core/lib/modifiers/eventListeners';
import createComponent, { Component, Merge, PropGetterFn, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import OutsideClick, { IOutsideClickProps } from '@semcore/outside-click';
import Portal, { IPortalProps, PortalProvider } from '@semcore/portal';
import If from '@semcore/utils/lib/if';
import NeighborLocation, { INeighborLocationProps } from '@semcore/neighbor-location';
import { setRef, useCallbackRef, useForkRef } from '@semcore/utils/lib/ref';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import pick from '@semcore/utils/lib/pick';
import useEventListener from '@semcore/utils/lib/use/useEventListener';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement, { IUniqueIDProps } from '@semcore/utils/lib/uniqueID';

import style from './style/popper.shadow.css';

export type eventInteraction = {
  trigger: [Array<keyof DOMAttributes<unknown>>, Array<keyof DOMAttributes<unknown>>];
  popper: [Array<keyof DOMAttributes<unknown>>, Array<keyof DOMAttributes<unknown>>];
};

export type Strategy = Options['strategy'];
export type Modifiers = Options['modifiers'];
export type Placement = Options['placement'];

export interface IPopperProps extends IOutsideClickProps, IPortalProps, IUniqueIDProps {
  /**
   * Popper может иметь разные варианты позиционирования
   * @default absolute
   */
  strategy?: Strategy;
  /**
   * Модификаторы для popper.js
   */
  modifiers?: Modifiers;
  /**
   * Положение всплывающего окна относительно тригера его вызвавшего.
   * 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
   * @default auto
   */
  placement?: Placement;
  /**
   * Взаимодействие с триггером для отображения и скрытия всплывающего окна
   * @default click
   */
  interaction?: 'click' | 'hover' | 'focus' | 'none' | eventInteraction;
  /** Таймер для отображения и скрытия всплывающего окна */
  timeout?: number | [number, number];
  /** Значение видимости всплывающего окна */
  visible?: boolean;
  /** Значение видимости всплывающего окна по умолчанию
   * @default false */
  defaultVisible?: boolean;
  /** Функция вызывающаяся при изменении видимости */
  onVisibleChange?: (visible: boolean, e?: Event) => boolean | void;
  /** Настройки PopperJS модикифкатора, отвечающие за отступ пеппера */
  offset?: Partial<OptionsOffset> | number | [number, number];
  /** Настройки PopperJS модикифкатора, отвечающие нахождение границ */
  preventOverflow?: Partial<OptionsPreventOverflow>;
  /** Настройки PopperJS модикифкатора, отвечающие за стрелочку */
  arrow?: Partial<OptionsArrow>;
  /** Настройки PopperJS модикифкатора, отвечающие за разворот поппера при недостатке места */
  flip?: Partial<OptionsFlip>;
  /** Настройки PopperJS модикифкатора, отвечающие за применение стилей */
  computeStyles?: Partial<OptionsComputeStyles>;
  /** Настройки PopperJS модикифкатора, отвечающие за подписку на глобальные события */
  eventListeners?: Partial<OptionsEventListeners>;
  /** @ignore */
  onFirstUpdate?: Options['onFirstUpdate'];

  /**
   * По дефолту Popper стилизован как position: absolute. Позволяет переключить на fixed
   * @deprecated v4.0.0 {@link IPopperProps.strategy}
   */
  positionFixed?: boolean;

  /**
   * Выключает подписку на глобальные события `resize/scroll`
   * @deprecated v4.0.0 {@link IPopperProps.eventListeners}
   */
  eventsDisabled?: boolean;

  /**
   * События на тригер для отображения и скрытия всплывающего окна
   * @deprecated v4.0.0 {@link IPopperProps.interaction}
   */
  displayEvents?: {
    show: string[];
    hide: string[];
  };

  /**
   * Таймер на тригер для отображения и скрытия всплывающего окна
   * @deprecated v4.0.0 {@link IPopperProps.timeout}
   */
  displayTimeout?: {
    show: number;
    hide: number;
  };

  /**
   * z-index Popper.Popper
   * @deprecated v4.0.0
   */
  popperZIndex?: string | number;

  /**
   * Определяет граничный элемент, используемый Popper для его flip и preventOverflow модификаторов. Поддерживаются три сокращенных ключевых слова; Popper найдет правильный элемент DOM.
   * `'scrollParent' | 'viewport' | 'window' | HTMLElement`
   * @deprecated v4.0.0 {@link IPopperProps.preventOverflow}
   */
  boundary?: 'scrollParent' | 'viewport' | 'window' | HTMLElement;
}

export interface IPopperTriggerProps extends IBoxProps {}

export interface IPopperPopperProps extends IBoxProps, INeighborLocationProps {}

export interface IPopperContext {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
}

function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj);
}

function someArray(arr1, arr2) {
  return arr1.filter(function (i) {
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

class Popper extends Component<IPopperProps> {
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
      // что бы быстрее перехватывать чем onBlur на триггере
      popper: [['onFocusCapture'], ['onBlur']],
    },
    none: {
      trigger: [],
      popper: [],
    },
  };

  timer: ReturnType<typeof setTimeout>;
  observer: ResizeObserver;
  triggerRef = React.createRef<HTMLElement>();
  popperRef = React.createRef<HTMLElement>();
  popper: MutableRefObject<Instance> = React.createRef();

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
    const optionsModifiers = pick(other, MODIFIERS_OPTIONS) as any;
    const modifiersFallback = [];

    /* START positionFixed */
    logger.warn(
      positionFixed !== undefined,
      "Свойство 'positionFixed' является устаревшим, используйте 'strategy=\"fixed\"'",
      other['data-ui-name'] || Popper.displayName,
    );
    if (positionFixed) {
      strategy = 'fixed';
    }
    /* END positionFixed */
    /* START eventsDisabled */
    logger.warn(
      eventsDisabled !== undefined,
      "Свойство 'eventsDisabled' является устаревшим, используйте 'eventListeners={{scroll: false, resize: false}}'",
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
      "Свойство 'boundary' является устаревшим, используйте 'preventOverflow={{rootBoundary: \"document\", boundary: HTMLElement}}'",
      other['data-ui-name'] || Popper.displayName,
    );
    if (boundary !== undefined) {
      const options = {} as any;
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
    const modifiersOptions: Partial<Modifier<any, any>>[] = MODIFIERS_OPTIONS.filter(
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
      "Свойство 'displayEvents' является устаревшим, используйте 'interaction'",
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

  bindHandlerChangeVisibleWithTimer = (visible, component?) => (e) => {
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
      "Свойство 'displayTimeout' является устаревшим, используйте 'timeout'",
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
      'aria-pressed': visible,
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
      "Свойство 'popperZIndex' является устаревшим, используйте стили напрямую в '<Popper.Popper/>'",
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
    };
  }

  componentWillUnmount() {
    this.destroyPopper();
  }

  render() {
    const { Children, visible, onOutsideClick, excludeRefs } = this.asProps;
    return (
      <>
        <If condition={visible}>
          <OutsideClick
            excludeRefs={[this.triggerRef, this.popperRef, ...excludeRefs]}
            onOutsideClick={callAllEventHandlers(
              onOutsideClick,
              this.bindHandlerChangeVisibleWithTimer(false),
            )}
          />
        </If>
        <Children />
      </>
    );
  }
}

function Trigger(props) {
  const { Root: STrigger } = props;
  return (
    <STrigger
      render={Box}
      inline
      // Потому что появляются бордеры
      // tabIndex={interaction === 'focus' ? undefined : 0}
    />
  );
}

const FocusLockWrapper = React.forwardRef<HTMLElement, any>(function (
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
      {...other}
    />
  );
});

function PopperPopper(props) {
  const {
    Root: SPopper,
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

  return styled(styles)(
    <If condition={visible}>
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
      </Portal>
    </If>,
  );
}

export default createComponent<
  Popper,
  {
    Trigger: Merge<IPopperTriggerProps, HTMLAttributes<HTMLSpanElement>>;
    Popper: Merge<IPopperPopperProps, HTMLAttributes<HTMLDivElement>>;
  },
  Merge<IPopperContext, IPopperProps>
>(Popper, {
  Trigger,
  Popper: PopperPopper,
});
