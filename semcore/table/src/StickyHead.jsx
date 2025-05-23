import React, { createContext } from 'react';

import { createPortal } from 'react-dom';

import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { fireFn } from '@semcore/core/lib/utils/fire';
import Table from './Table';
import ScrollAreaSmart from '@semcore/scroll-area';
import ContextTable from './context';
import throttle from '@semcore/core/lib/utils/rafTrottle';
import { getNodeByRef, setRef } from '@semcore/core/lib/utils/ref';
import useEventCallback from '@semcore/core/lib/utils/use/useEventCallback';
import { createBaseComponent, sstyled } from '@semcore/core';

const StickyHeadContext = createContext({
  container: null,
  tableDOM: null,
});

function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

function getScrollParent(element) {
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  const { overflow, overflowX, overflowY } = window.getComputedStyle(element, null);
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

function getOffsetWidth(node) {
  if (node == null) {
    return undefined;
  }

  if (node.getBoundingClientRect == null) {
    return node.offsetWidth;
  }

  return node.getBoundingClientRect().width;
}

function calculateWidthTh(nodeTable, disablePortal = false) {
  const thead = nodeTable?.getElementsByTagName('thead')[disablePortal ? 1 : 0];
  if (!nodeTable || !thead) return [];
  const listTrInsideHead = thead.getElementsByTagName('tr');
  // listWidthTh = [tr: {Array [width th, ...]}, ...]
  const listWidthTh = [];
  const amountTr = listTrInsideHead.length;

  for (let indexTr = 0; indexTr < amountTr; indexTr += 1) {
    const tr = listTrInsideHead[indexTr];
    let emptyCellIndex = 0;
    let currentCellCursor = 0;
    const listTdInsideTr = tr.getElementsByTagName('th');
    const amountTd = listTdInsideTr.length;

    for (let indexTd = 0; indexTd < amountTd; indexTd += 1) {
      const th = listTdInsideTr[indexTd];
      listWidthTh[indexTr] = listWidthTh[indexTr] || [];

      if (th.colSpan === 1 && th.rowSpan === 1) {
        if (indexTr === 0) {
          listWidthTh[indexTr].push(getOffsetWidth(th));
          currentCellCursor += 1;
        } else {
          while (
            listWidthTh[indexTr - 1][emptyCellIndex] !== undefined ||
            (listWidthTh[indexTr][emptyCellIndex] !== undefined &&
              emptyCellIndex < listWidthTh[indexTr].length)
          ) {
            emptyCellIndex += 1;
          }
          listWidthTh[indexTr][emptyCellIndex] = getOffsetWidth(th);
          currentCellCursor = emptyCellIndex;
        }
        continue;
      }
      if (th.rowSpan > 1) {
        [...new Array(th.rowSpan)].map((_, indexRowSpan) => {
          listWidthTh[indexRowSpan] = listWidthTh[indexRowSpan] || [];
          listWidthTh[indexRowSpan][currentCellCursor] = getOffsetWidth(th);
        });
        currentCellCursor += 1;
      }
      if (th.colSpan > 1) {
        listWidthTh[indexTr].push(...new Array(th.colSpan).fill(undefined));
        currentCellCursor += th.colSpan;
      }
    }
  }

  if (listTrInsideHead.length > 0) {
    const firstRowIndex = 0;
    const tr = listTrInsideHead[firstRowIndex];
    const listTdInsideTr = tr.getElementsByTagName('th');
    const amountTd = listTdInsideTr.length;

    for (let indexTd = 0; indexTd < amountTd; ) {
      const th = listTdInsideTr[indexTd];
      if (listWidthTh[firstRowIndex][indexTd] === undefined) {
        listWidthTh[firstRowIndex][indexTd] = getOffsetWidth(th);
      }
      indexTd += th.colSpan;
    }
  }

  return listWidthTh;
}

const renderColGroup = (listWidthTh = []) => {
  if (!listWidthTh.length) return null;

  return (
    <colgroup>
      {listWidthTh[listWidthTh.length - 1].map((col, index) => (
        <col key={`${col}_${index}`} width={`${col}px`} />
      ))}
    </colgroup>
  );
};

function Head(props, ref) {
  const { children, ...other } = props;
  const refTable = React.useRef(null);
  const { self, styles: tableStyles } = React.useContext(ContextTable);
  const { tableDOM, disablePortal } = React.useContext(StickyHeadContext);
  const [listWidthTh, setListWidthTh] = React.useState(calculateWidthTh(tableDOM, disablePortal));

  setRef(ref, refTable.current);

  const updateWithTh = () => {
    setListWidthTh(calculateWidthTh(tableDOM, disablePortal));
  };

  React.useEffect(() => {
    let mutationObserver = null;
    let resizeObserver = null;
    if (tableDOM && canUseDOM()) {
      mutationObserver = new MutationObserver(updateWithTh);
      resizeObserver = new ResizeObserver(updateWithTh);
      mutationObserver.observe(tableDOM, { subtree: true, childList: true });
      resizeObserver.observe(tableDOM);
    }

    return () => {
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, []);

  let ColGroup = null;
  let TheadElement = null;

  React.Children.toArray(self.props.children).forEach((element) => {
    if (React.isValidElement(element)) {
      if (element.type['displayName'] === 'Head') {
        TheadElement = element;
      }
      if (element.type === 'colgroup') {
        ColGroup = element;
      }
    }
  });

  const SStickyHeadTable = Table;
  const styles = sstyled.merge(tableStyles, other.styles);

  return (
    <>
      {sstyled(styles)(
        <SStickyHeadTable ref={refTable} {...self.props} {...other}>
          {ColGroup || renderColGroup(listWidthTh)}
          {TheadElement}
        </SStickyHeadTable>,
      )}
      {children}
    </>
  );
}

Head.displayName = 'StickyHead.Head';

const HeadCore = createBaseComponent(Head);

const SStickyHead = React.forwardRef(({ position, ...props }, ref) => (
  <ScrollAreaSmart ref={ref} {...props} />
));

function ContainerSticky(props, ref) {
  const {
    top = 0,
    bottom = 0,
    setRefContainer,
    children,
    positionFixed,
    style = {},
    ...other
  } = props;
  const { styles } = React.useContext(ContextTable);
  const { container, tableDOM, disablePortal } = React.useContext(StickyHeadContext);
  const thead = container.getElementsByTagName('thead')[disablePortal ? 1 : 0];
  const styleBar = {};

  if (tableDOM) {
    tableDOM.classList.toggle(styles['__Table-parent'], true);
  }

  if (thead) {
    thead.classList.toggle(styles['__Header-hidden'], true);
    styleBar['top'] = thead.offsetHeight - 10;
  }

  if (positionFixed === 'fixed') {
    style.top = `${top}px`;
  }

  if (positionFixed === 'bottom') {
    style.bottom = `${bottom}px`;
  }

  return sstyled(styles)(
    <SStickyHead
      ref={ref}
      style={style}
      position={positionFixed}
      container={() => container}
      inner={() => tableDOM}
      {...other}
    >
      <ScrollAreaSmart.Container className='_master-scroll' ref={setRefContainer} tabIndex={-1}>
        {typeof children === 'function' ? (
          children({ Head: HeadCore })
        ) : (
          <>
            <HeadCore>{children}</HeadCore>
          </>
        )}
      </ScrollAreaSmart.Container>
      <ScrollAreaSmart.Bar orientation='horizontal' style={styleBar} />
    </SStickyHead>,
  );
}
ContainerSticky.displayName = 'StickyHead.ContainerSticky';

const ContainerStickyCore = createBaseComponent(ContainerSticky);

function StickyHeadInner(props, ref) {
  const {
    onFixed,
    top: offsetTop = 0,
    bottom: offsetBottom = 0,
    container: propsContainer,
    disablePortal,
    ...other
  } = props;
  const top = typeof offsetTop === 'number' ? offsetTop : parseInt(offsetTop, 10);
  const bottom = typeof offsetBottom === 'number' ? offsetBottom : parseInt(offsetBottom, 10);

  const [positionFixed, setPositionFixed] = React.useState('top');
  const [refScrollContainer, setRefScrollContainer] = React.useState(null);
  const [container, setContainerNode] = React.useState(propsContainer);

  const { self } = React.useContext(ContextTable);
  const heightHeader = refScrollContainer ? refScrollContainer.offsetHeight : 0;
  let lastScrollLeft = 0;

  const getPositionContainer = (container) => {
    if (!container || !container.getBoundingClientRect) {
      return { top: undefined, bottom: undefined, left: undefined };
    }
    const { top, bottom, left } = container.getBoundingClientRect();

    return { top, bottom, left };
  };

  const setLeftPositionContainerSticky = (positionContainerLeft, positionFixed) => {
    if (!refScrollContainer) {
      return false;
    }

    const containerStickyNode = refScrollContainer.parentNode;
    let left = 'auto';

    if (positionFixed === 'fixed') {
      left = `${positionContainerLeft}px`;
    }

    containerStickyNode.style.left = left;
  };

  const updatePositionContainer = (coordinate, position) => {
    setPositionFixed(position);
    fireFn(onFixed, positionFixed);
    setLeftPositionContainerSticky(coordinate.left, position);
  };

  const setPositionContainer = useEventCallback(() => {
    const { scrollTop, scrollLeft } = document.documentElement;
    const { top: topContainer, bottom: bottomContainer, left } = getPositionContainer(container);

    const min = topContainer + scrollTop - top;
    const max = bottomContainer + scrollTop - top - heightHeader - bottom;

    if (scrollTop >= min && scrollTop <= max && positionFixed !== 'fixed') {
      updatePositionContainer({ left }, 'fixed');
    }
    if (scrollTop < min && positionFixed !== 'top') {
      updatePositionContainer({ left }, 'top');
    }
    if (scrollTop > max && positionFixed !== 'bottom') {
      updatePositionContainer({ left }, 'bottom');
    }

    if (lastScrollLeft !== scrollLeft) {
      lastScrollLeft = scrollLeft;
      setLeftPositionContainerSticky(left, positionFixed);
    }
  });

  const getScrollPage = throttle(setPositionContainer);

  let mainScrollActive = false;
  let controlledScrollActive = false;

  const handleScroll = throttle((e) => {
    if (!refScrollContainer || !container) return false;

    const { target } = e;
    const { scrollLeft } = target;

    mainScrollActive = [...target.classList].includes('_master-scroll');
    controlledScrollActive = !mainScrollActive;

    if (!controlledScrollActive) {
      controlledScrollActive = true;
      container.scrollLeft = scrollLeft;
      controlledScrollActive = false;
    }

    if (!mainScrollActive) {
      mainScrollActive = true;
      refScrollContainer.scrollLeft = scrollLeft;
      mainScrollActive = false;
    }
  });

  React.useEffect(
    function updateContainer() {
      if (!canUseDOM()) {
        return;
      }

      if (container) {
        getScrollPage();
        document.addEventListener('scroll', getScrollPage);
      } else {
        setContainerNode(getScrollParent(getNodeByRef(self.ref)));
      }
      return () => {
        getScrollPage.cancel();
        document.removeEventListener('scroll', getScrollPage);
      };
    },
    [container],
  );

  React.useEffect(
    function updateScrollContainer() {
      if (refScrollContainer) {
        refScrollContainer.addEventListener('scroll', handleScroll);
      }
      return () => {
        handleScroll.cancel();
        refScrollContainer?.removeEventListener('scroll', handleScroll);
      };
    },
    [refScrollContainer],
  );

  const updateSizeAndPositionContainer = useEventCallback(() => {
    setPositionContainer();

    if (refScrollContainer && container) {
      refScrollContainer.style.width = `${container.clientWidth}px`;
    }

    if (positionFixed === 'fixed') {
      const { left } = getPositionContainer(container);
      setLeftPositionContainerSticky(left, positionFixed);
    }
    setLeftPositionContainerSticky('auto', positionFixed);
  });

  React.useEffect(
    function addListenerToContainer() {
      if (refScrollContainer && container) {
        container.addEventListener('scroll', handleScroll);
      }

      return () => {
        container?.removeEventListener('scroll', handleScroll);
      };
    },
    [container, refScrollContainer],
  );

  React.useEffect(
    function addResizeObserverToContainer() {
      let resizeObserver = null;

      if (container) {
        resizeObserver = new ResizeObserver(updateSizeAndPositionContainer);
        resizeObserver.observe(container);
      }

      return () => {
        resizeObserver?.disconnect();
      };
    },
    [container],
  );

  if (!container) return null;

  const tableDOM = container.getElementsByTagName('table')[0];
  const stickyCore = (
    <ContainerStickyCore
      setRefContainer={setRefScrollContainer}
      positionFixed={positionFixed}
      top={top}
      bottom={bottom}
      ref={ref}
      {...other}
    />
  );

  return (
    <StickyHeadContext.Provider value={{ container, tableDOM, disablePortal }}>
      {disablePortal ? stickyCore : createPortal(stickyCore, container)}
    </StickyHeadContext.Provider>
  );
}
StickyHeadInner.displayName = 'StickyHead';

export default createBaseComponent(StickyHeadInner);
