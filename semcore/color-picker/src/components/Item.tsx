import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import CloseM from '@semcore/icon/Close/m';
import { ScreenReaderOnly } from '@semcore/flex-box';
import { Hint } from '@semcore/tooltip';

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

export function Item(props: ItemAsProps) {
  const { Children, styles, value, displayLabel, editable, selected, onRemove, getI18nText, uid } =
    props as any;
  const SItemContainer = Root;
  const SLabel = Box;
  const SCloseIcon = Box;
  const SLine = 'svg';
  const deleteDescriber = `delete_${value}_${uid}`;

  const handleKeydown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Backspace') {
      onRemove?.(event);
    }
  }, []);

  return sstyled(styles)(
    <SItemContainer
      render={Hint}
      interaction={interaction}
      selected={selected}
      value={value}
      displayLabel={displayLabel}
      role='option'
      aria-selected={selected}
      title={value ?? getI18nText('clearColor')}
      aria-describedby={editable ? deleteDescriber : undefined}
      onKeyDown={handleKeydown}
      __excludeProps={['title']}
      timeout={[250, 50]}
    >
      {!value && (
        <SLine
          width='17'
          height='17'
          viewBox='0 0 17 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            width='1'
            height='22'
            transform='matrix(-0.707107 -0.707107 -0.707107 0.707107 16.4854 0.928925)'
            fill='#e0e1e9'
          />
        </SLine>
      )}
      {displayLabel && <SLabel data-value={value || '#6C6E79'}>A</SLabel>}
      <Children />
      {editable && (
        <>
          <SCloseIcon tabIndex={-1} aria-hidden={true} onClick={onRemove}>
            <CloseM color='icon-primary-neutral' w={10} h={10} />
          </SCloseIcon>
          <ScreenReaderOnly aria-hidden={true} id={deleteDescriber}>
            {getI18nText('deleteColorDescriber')}
          </ScreenReaderOnly>
        </>
      )}
    </SItemContainer>,
  ) as React.ReactElement;
}

Item.enhance = [keyboardFocusEnhance()];
