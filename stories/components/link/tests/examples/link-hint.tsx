import VideoListL from '@semcore/icon/VideoList/l';
import { Flex } from '@semcore/ui/base-components';
import Link, { type LinkProps } from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type LinkHintProps = {
  /** Truncated text sitting next to the link — the link itself has no text of its own. */
  text?: string;
  /** Hint content. `showHint` is true when the link has no children OR a title is set. */
  title?: string;
  ariaLabel?: string;
  /** Renders a Link.Text child, which switches off the no-children hint branch. */
  showText?: boolean;
  /** An external href adds target=_blank, the external icon and the new-tab announcement. */
  href?: string;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  /** Picking a `theme` drops `color`, since a custom color would override it. */
  theme?: 'default' | 'light' | 'accent' | 'invert';
  /** Ignored while `use` is set. */
  color?: string;
  size?: LinkProps['size'];
  disabled?: boolean;
  active?: boolean;
  /** How many rows to render — several links let you check that hints don't overlap. */
  count?: number;
};

const Demo = (props: LinkHintProps) => {
  const {
    text = ' cndskjnvd vnkfdlnbklfdnb bfndklbnkld',
    title = 'test',
    ariaLabel,
    showText = false,
    href = '#',
    hintPlacement,
    theme,
    color = 'gray-300',
    size,
    disabled,
    active,
    count = 3,
  } = props;

  // `color` and `use` collide: SLink[text-color] sits below the [use] blocks in
  // link.shadow.css with equal specificity, so a custom color always wins and the `use`
  // control would look broken. Picking a `use` therefore drops the color.
  const resolvedColor = theme ? undefined : color;

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Flex key={index} columnGap={2} mb={4}>
          <Text ellipsis={true} w={200}>{text}</Text>
          <Link
            href={href}
            addonLeft={VideoListL}
            theme={theme}
            color={resolvedColor}
            size={size}
            disabled={disabled}
            active={active}
            ml={1}
            title={title}
            aria-label={ariaLabel}
            hintPlacement={hintPlacement}
          >
            {showText ? <Link.Text>{`Link ${index + 1}`}</Link.Text> : undefined}
          </Link>
        </Flex>
      ))}
    </>
  );
};

export const defaultLinkHintProps: LinkHintProps = {
  text: ' cndskjnvd vnkfdlnbklfdnb bfndklbnkld',
  title: 'test',
  showText: false,
  href: '#',
  color: 'gray-300',
  count: 3,
};

Demo.defaultProps = defaultLinkHintProps;

export default Demo;
