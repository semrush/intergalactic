import { Box, ScreenReaderOnly } from '@semcore/base-components';
import { Root, sstyled } from '@semcore/core';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import CloseM from '@semcore/icon/Close/m';
import { Hint } from '@semcore/tooltip';
import React from 'react';

import type { ItemProps } from '../ColorPicker.types';

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

export function Item(props: ItemProps) {
  const { Children, styles, value, displayLabel, editable, selected, onRemove, getI18nText, uid } = props;
  const SItemContainer = Root();
  const SLabel = Box;
  const SCloseIcon = Box;
  const deleteDescriber = `delete_${value}_${uid}`;

  const handleKeydown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Backspace') {
      // @ts-ignore
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
  );
}

Item.enhance = [keyboardFocusEnhance()];
