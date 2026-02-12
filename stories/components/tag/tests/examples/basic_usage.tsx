import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Tag, { TagContainer } from '@semcore/ui/tag';
import type { TagProps } from '@semcore/ui/tag';
import React from 'react';
export type BasicTagProps = TagProps & {
  text?: string;
  disabled?: boolean;
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
  color,
  size = defaultProps.size,
  showAddonLeft = defaultProps.showAddonLeft,
  showAddonRight = defaultProps.showAddonRight,
  showClose = defaultProps.showClose,
  useTagContainer = defaultProps.useTagContainer,
  locale,
}: BasicTagProps) => {
  if (useTagContainer && showClose) {
    return (
      <Box style={{ backgroundColor: '#8b9bddff' }} m={3} p={3}>
        <TagContainer
          disabled={disabled}
          active={active}
          interactive={interactive}
          theme={theme}
          color={color}
          size={size}
          locale={locale}
        >
          <TagContainer.Tag>
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
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: '#8b9bddff' }} m={3} p={3}>

      <Tag
        disabled={disabled}
        active={active}
        interactive={interactive}
        theme={theme}
        color={color}
        size={size}
        locale={locale}
      >
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
      </Tag>
    </Box>
  );
};

export default Demo;
