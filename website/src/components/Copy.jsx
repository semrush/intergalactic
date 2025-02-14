import React from 'react';
import Tooltip from '@semcore/tooltip';

const Copy = (props) => {
  const [copied, setCopied] = React.useState(false);
  const copiedText = props.copiedToast ?? 'Copied!';
  const copyText = props.title ?? 'Click to copy';

  const handleClick = React.useCallback(async () => {
    const toCopy = typeof props.toCopy === 'function' ? props.toCopy() : props.toCopy;
    await navigator.clipboard.writeText(toCopy);

    setCopied(true);
  }, [props.copiedToast, props.toCopy, props.onClick]);

  React.useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => {
      if (!copied) return;
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copied, props.toCopy]);

  return (
    <Tooltip visible={props.onlyToast && copied}>
      <Tooltip.Trigger aria-describedby={undefined}>
        {({ popperId }) =>
          React.cloneElement(props.children, {
            onClick: handleClick,
            'aria-describedby': popperId,
          })
        }
      </Tooltip.Trigger>
      <Tooltip.Popper>{copied || props.onlyToast ? copiedText : copyText}</Tooltip.Popper>
    </Tooltip>
  );
};

export default Copy;
