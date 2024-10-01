import React from 'react';
import { Field } from 'react-final-form';
import Tooltip from '@semcore/tooltip';
import pick from '@semcore/utils/lib/pick';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { assignProps } from '@semcore/utils/lib/core';
import propsForElement from '@semcore/utils/lib/propsForElement';

const deafultTooltipPropsList = [
  'title',
  'theme',
  'strategy',
  'modifiers',
  'placement',
  'interaction',
  'timeout',
  'visible',
  'defaultVisible',
  'onVisibleChange',
  'offset',
  'preventOverflow',
  'arrow',
  'flip',
  'computeStyles',
  'eventListeners',
  'onFirstUpdate',
];

export function FeedbackItem({
  Children,
  tag,
  uid,
  tooltipProps: tooltipPropsList = deafultTooltipPropsList,
  ...props
}: any) {
  const tooltipProps = pick(props, tooltipPropsList);
  const lastErrorRef = React.useRef(undefined);

  return (
    <Field {...props}>
      {({ input, meta, ...other }) => {
        const showError = other.validateOnBlur === false ? meta.submitFailed : true;
        const invalid = meta.invalid && meta.touched;
        const errorState = showError && invalid;
        const popperId = `${uid}-error-description`;
        const inputProps = assignProps(
          {
            ...propsForElement(other),
            state: errorState ? 'invalid' : 'normal',
            'aria-invalid': errorState ? true : false,
            'aria-errormessage': popperId,
            'aria-describedby': errorState && meta.active ? popperId : undefined,
          },
          input,
        );
        if (meta?.error) lastErrorRef.current = meta.error;

        return (
          <Tooltip
            visible={errorState && meta.active}
            theme='warning'
            placement='left'
            flip={{
              fallbackPlacements: ['right', 'bottom'],
            }}
            {...tooltipProps}
          >
            <Tooltip.Trigger inline={false} role={undefined} tag={tag} {...(tag ? inputProps : {})}>
              {typeof Children.origin === 'function' &&
                Children.origin({
                  input: inputProps,
                  meta,
                  ...other,
                })}
            </Tooltip.Trigger>
            <Tooltip.Popper w={'100%'} id={popperId}>
              {meta.error ?? lastErrorRef.current}
            </Tooltip.Popper>
          </Tooltip>
        );
      }}
    </Field>
  );
}
FeedbackItem.enhance = [uniqueIDEnhancement()];
