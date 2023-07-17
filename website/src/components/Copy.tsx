import React from 'react';
import Tooltip, { TooltipProps } from '@semcore/tooltip';
import styles from './Copy.module.css';
import cx from 'classnames';

const Copy: React.FC<
  {
    copiedToast: string;
    toCopy: string;
    children: React.ReactElement;
    className?: string;
    onClick?: () => void;
  } & TooltipProps
> = (props) => {
  const [view, setView] = React.useState<string | undefined>(undefined);
  const handleClick = React.useCallback(async () => {
    await navigator.clipboard.writeText(props.toCopy);

    setView(props.copiedToast ?? 'Copied! You are awesome!');
  }, [props.copiedToast, props.toCopy, props.onClick]);
  React.useEffect(() => {
    if (!view) return;
    const timeout = setTimeout(() => {
      if (!view) return;
      setView(undefined);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [view, props.toCopy]);

  return (
    <Tooltip
      {...props}
      className={cx(props.className, styles.tooltipStyle)}
      title={view ?? props.title ?? 'Click to copy'}
      aria-label='Click to copy'
      {...({
        selfProps: {
          popupTransitionName: 'popup-fade',
        },
      } as any)}
    >
      {React.cloneElement(props.children, {
        onClick: handleClick,
      })}
    </Tooltip>
  );
};

export default Copy;
