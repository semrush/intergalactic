import React from 'react';
import PlaygroundGeneration from 'components/PlaygroundGeneration';
import Link from '@semcore/link';
import CheckXS from '@semcore/icon/Check/m';
import ArrowRightXS from '@semcore/icon/ArrowRight/m';

const SIZE = [
  { value: '100', name: '100 = 12px' },
  { value: '200', name: '200 = 14px' },
  { value: '300', name: '300 = 16px' },
  { value: '400', name: '400 = 19px' },
  { value: '500', name: '500 = 25px' },
  { value: '600', name: '600 = 33px' },
  { value: '700', name: '700 = 36px' },
  { value: '800', name: '800 = 48px' },
];

const Preview = (preview) => {
  const { bool, select, radio, text } = preview('Button');

  const size = select({
    key: 'size',
    defaultValue: '300',
    label: 'Size',
    options: SIZE,
  });

  const color = text({
    key: 'color',
    label: 'Color',
    defaultValue: '',
    placeholder: 'red',
  });

  const active = bool({
    key: 'active',
    defaultValue: false,
    label: 'Active',
  });

  // const noWrap = bool({
  //   key: 'noWrap',
  //   defaultValue: true,
  //   label: 'NoWrap',
  // });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const beforeIcon = bool({
    key: 'before',
    defaultValue: false,
    label: 'Before',
  });

  const afterIcon = bool({
    key: 'after',
    defaultValue: false,
    label: 'After',
  });

  const child = text({
    key: 'children',
    defaultValue: 'Link',
    label: 'Text',
  });

  const renderIcon = (position) => {
    switch (position) {
      case 'before':
        return <CheckXS />;
      case 'after':
        return <ArrowRightXS />;
      default:
        return false;
    }
  };

  return (
    <Link color={color} size={size} disabled={disabled} active={active}>
      {beforeIcon && <Link.Addon>{renderIcon('before')}</Link.Addon>}
      {beforeIcon || afterIcon ? <Link.Text>{child}</Link.Text> : child}
      {afterIcon && <Link.Addon>{renderIcon('after')}</Link.Addon>}
    </Link>
  );
};
export default PlaygroundGeneration(Preview);
