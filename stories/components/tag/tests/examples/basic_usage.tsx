import { Flex } from '@semcore/ui/flex-box';
import CheckM from '@semcore/ui/icon/Check/m';
import CloseM from '@semcore/ui/icon/Close/m';
import Tag from '@semcore/ui/tag';
import React from 'react';

export type BasicTagProps = {
  text?: string;
  disabled?: boolean;
  active?: boolean;
  interactive?: boolean;
  theme?: 'primary' | 'secondary' | 'muted' | 'invert';
  color?: string;
  size?: 'xl' | 'l' | 'm';
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  locale?: string;
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
  locale: undefined,
};

const Demo: React.FC<BasicTagProps> = ({
  text = defaultProps.text,
  disabled = defaultProps.disabled,
  active = defaultProps.active,
  interactive = defaultProps.interactive,
  theme = defaultProps.theme,
  color,
  size = defaultProps.size,
  showAddonLeft = defaultProps.showAddonLeft,
  showAddonRight = defaultProps.showAddonRight,
  locale,
}) => {
  return (
    <Flex>
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
    </Flex>
  );
};

export default Demo;
