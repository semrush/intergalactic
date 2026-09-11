import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import { Box } from '@semcore/ui/base-components';
import Tag, { TagContainer } from '@semcore/ui/tag';
import type { NSTag } from '@semcore/ui/tag';
import React from 'react';

export type BasicTagProps = {
  text?: string;
  disabled?: boolean;
  active?: boolean;
  interactive?: boolean;
  theme?: NSTag.Theme;
  /** Supported by all themes. Renders the tag for dark backgrounds. */
  invert?: boolean;
  /** Only supported by the `primary` theme. */
  color?: string;
  size?: NSTag.Size;
  locale?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  showClose?: boolean;
  useTagContainer?: boolean;
};

export const defaultProps: BasicTagProps = {
  text: 'Tag',
  disabled: false,
  active: false,
  interactive: false,
  theme: 'primary',
  invert: false,
  color: undefined,
  size: 'm',
  showAddonLeft: false,
  showAddonRight: false,
  showClose: false,
  useTagContainer: false,
  locale: undefined,
};

const Demo = ({
  text = defaultProps.text,
  disabled = defaultProps.disabled,
  active = defaultProps.active,
  interactive = defaultProps.interactive,
  theme = defaultProps.theme,
  invert = defaultProps.invert,
  color,
  size = defaultProps.size,
  showAddonLeft = defaultProps.showAddonLeft,
  showAddonRight = defaultProps.showAddonRight,
  showClose = defaultProps.showClose,
  useTagContainer = defaultProps.useTagContainer,
  locale,
}: BasicTagProps) => {
  const commonProps = { disabled, active, interactive, invert, size, locale };
  const backgroundColor = invert ? 'var(--intergalactic-bg-primary-invert)' : '#8b9bddff';

  const content = (
    <>
      {showAddonLeft && (
        <Tag.Addon>
          <CheckM />
        </Tag.Addon>
      )}
      <Tag.Text>{text}</Tag.Text>
      {showAddonRight && (
        <Tag.Addon>
          <CloseM />
        </Tag.Addon>
      )}
    </>
  );

  if (useTagContainer && showClose) {
    return (
      <Box style={{ backgroundColor }} m={3} p={3}>
        {theme === 'primary'
          ? (
              <TagContainer {...commonProps} theme='primary' color={color}>
                <TagContainer.Tag>{content}</TagContainer.Tag>
                <TagContainer.Close />
              </TagContainer>
            )
          : (
              <TagContainer {...commonProps} theme={theme}>
                <TagContainer.Tag>{content}</TagContainer.Tag>
                <TagContainer.Close />
              </TagContainer>
            )}
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor }} m={3} p={3}>
      {theme === 'primary'
        ? (
            <Tag {...commonProps} theme='primary' color={color}>
              {content}
            </Tag>
          )
        : (
            <Tag {...commonProps} theme={theme}>
              {content}
            </Tag>
          )}
    </Box>
  );
};

export default Demo;
