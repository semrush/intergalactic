import { Box, ScreenReaderOnly, Hint } from '@semcore/base-components';
import { Root, sstyled } from '@semcore/core';
import CloseM from '@semcore/icon/Close/m';
import React from 'react';

type ItemAsProps = {
  styles?: React.CSSProperties;
  value?: string;
  displayLabel?: boolean;
  editable?: boolean;
  selected?: boolean;
  onRemove?: React.MouseEventHandler | React.KeyboardEventHandler;
  Children?: React.FC;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
  uid: string;
};

const interaction = {
  trigger: [
    ['onMouseEnter', 'onKeyboardFocus', 'onTouchStart', 'onFocus'],
    ['onMouseLeave', 'onBlur'],
  ],
  popper: [
    ['onMouseEnter', 'onFocusCapture', 'onTouchStart'],
    ['onMouseLeave', 'onBlur'],
  ],
};

export default function Item(props: ItemAsProps) {
  const { Children, styles, value, displayLabel, editable, selected, onRemove, getI18nText, uid } =
    props as any;
  const SItemContainer = Root;
  const SLabel = Box;
  const SCloseIcon = Box;
  const deleteDescriber = `delete_${value}_${uid}`;

  const triggerRef = React.useRef<HTMLElement | null>(null);

  const handleKeydown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Backspace') {
      onRemove?.(event);
    }
  }, []);

  return sstyled(styles)(
    <>
      <SItemContainer
        render={Box}
        interaction={interaction}
        selected={selected}
        value={value}
        displayLabel={displayLabel}
        role='option'
        aria-selected={selected}
        ref={triggerRef}
        aria-label={value ?? getI18nText('clearColor')}
        aria-describedby={editable ? deleteDescriber : undefined}
        onKeyDown={handleKeydown}
        timeout={[250, 50]}
        tabIndex={0}
      >
        {displayLabel && <SLabel data-value={value || '#6C6E79'}>A</SLabel>}
        <Children />
        {editable && (
          <>
            <SCloseIcon tabIndex={-1} aria-hidden={true} onClick={onRemove}>
              <CloseM color='icon-primary-neutral' width='10' height='10' />
            </SCloseIcon>
            <ScreenReaderOnly aria-hidden={true} id={deleteDescriber}>
              {getI18nText('deleteColorDescriber')}
            </ScreenReaderOnly>
          </>
        )}
      </SItemContainer>
      <Hint triggerRef={triggerRef}>
        {value ?? getI18nText('clearColor')}
      </Hint>
    </>,
  );
}
