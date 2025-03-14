import React from 'react';
import Tooltip from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import Pills from '@semcore/pills';
import SidePanel from '@semcore/side-panel';
import Copy from '@components/Copy';
import styles from './styles.module.css';

const iconDimensions = {
  common: { l: 24, m: 16 },
  pay: { l: { w: 32, h: 24 }, m: { w: 21, h: 16 } },
  external: { 20: 20 },
};

const DownloadIconButton = ({ size, name, action, iconData, icon: Icon }) => {
  let nameSvg = `${name}/${size}`;
  const groupName = iconData.group.toLowerCase();
  const iconSize = iconDimensions[groupName]
    ? iconDimensions[groupName][size]
    : iconDimensions.common[size];
  const haveGroupName = ['pay', 'external', 'color'].includes(groupName);
  let includeGroupName = haveGroupName ? `/${groupName}` : '';

  const getImportText = React.useCallback(() => {
    const lib = '@semcore/ui';
    const haveSizeIcon = iconData.size.length > 1;
    const includeName = haveSizeIcon ? `${name}${size.toUpperCase()}` : name;
    const includeSize = haveSizeIcon ? `/${size}` : '';
    const importText = `import ${includeName} from '${lib}/icon${includeGroupName}/${name}${includeSize}'`;

    return importText;
  }, [name, size, iconData.size]);

  if (action === 'download') {
    includeGroupName = haveGroupName ? `${groupName}` : 'icon';
    // external
    if (Number(size) === 20) {
      nameSvg = name.replace(/([A-Z])/g, '/$1').slice(1);
    }

    const url = `semcore/icon/svg/${includeGroupName}/${nameSvg}.svg`;
    return (
      <Tooltip title='Download'>
        <a
          className={styles.previewChangeIcon}
          rel='noopener noreferrer'
          download={url}
          target='_blank'
          href={`https://github.com/semrush/intergalactic/raw/master/${url}?inline=false`}
          data-container='body'
          data-original-title='Download'
          data-icon-download-svg={name}
          data-icon-size={size}
        >
          <Icon width={20} height={20} />
          <span className={styles.iconSizes}>
            <span className={styles.iconSizeTitle}>{size.toUpperCase()}</span>
            {` (${iconSize.w || iconSize}x${iconSize.h || iconSize}px)`}
          </span>
        </a>
      </Tooltip>
    );
  }

  return (
    <Copy toCopy={getImportText} trigger='click' title='Copy import'>
      <button
        type='button'
        className={styles.previewChangeIcon}
        data-icon-copy-import={name}
        data-icon-size={size}
      >
        <Icon width={20} height={20} />
        <span className={styles.iconSizes}>
          <span className={styles.iconSizeTitle}>{size.toUpperCase()}</span>
          {` (${iconSize.w || iconSize}x${iconSize.h || iconSize}px)`}
        </span>
      </button>
    </Copy>
  );
};

export const IconDetailsPanel = ({ name, visible, onClose }) => {
  const [action, setAction] = React.useState('copy');
  const { json, icons } = React.useContext(Context);
  const iconData = json.icons.filter((icon) => icon.name === name)[0];

  return (
    <SidePanel visible={visible} placement='bottom' onClose={onClose}>
      <SidePanel.Panel
        id={`${name}-dialog`}
        aria-label={`Get ${name} icon`}
        aria-modal={false}
        zIndex='var(--intergalactic-z-index-modal)'
      >
        <Flex gap={10} justifyContent='center'>
          <Flex direction='column'>
            <b>{name}</b>
            <Pills value={action} mt={3} onChange={setAction} aria-label={`Get ${name} icon`}>
              <Pills.Item value='copy' data-icon-pill-copy-import={name}>
                Copy import
              </Pills.Item>
              <Pills.Item value='download' data-icon-pill-download-svg={name}>
                Download SVG
              </Pills.Item>
            </Pills>
          </Flex>
          <Flex gap={6}>
            {visible &&
              iconData.size.map((size) => {
                return (
                  <DownloadIconButton
                    key={size}
                    size={size}
                    name={name}
                    action={action}
                    iconData={iconData}
                    icon={icons[name]}
                  />
                );
              })}
          </Flex>
        </Flex>
      </SidePanel.Panel>
    </SidePanel>
  );
};

export const ListIcons = ({ data, ...props }) => {
  const { icons, selectedIcon, setSelectedIcon } = React.useContext(Context);

  return (
    <ul
      className={styles.list}
      aria-labelledby={props['aria-labelledby']}
      aria-label={props['aria-label']}
    >
      {data.map((icon) => {
        const Icon = icons[icon.name];
        if (!Icon) {
          throw new Error(`Icon ${icon.name} not found in import from @icons`);
        }

        return (
          <li className={styles.previewIcon} key={icon.name}>
            <button
              type='button'
              aria-haspopup='dialog'
              aria-expanded={selectedIcon === icon.name}
              aria-controls={selectedIcon === icon.name ? `${icon.name}-dialog` : undefined}
              onClick={() => {
                setSelectedIcon(icon.name);
              }}
              data-id={icon.name}
              data-name='PanelTrigger'
            >
              <Icon width={20} height={20} />
              {icon.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const Context = React.createContext();

export const IconGroups = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <div className={styles.contextWrapper} ref={forwardedRef}>
    <Context.Provider value={props} children={children} />
  </div>
));

export default function ({ title }) {
  const { json } = React.useContext(Context);
  const filterIcons = json.icons.filter((icon) => icon.group === title);
  const id = title.replace(' ', '-');

  return (
    <div className={styles.section}>
      <h3 id={`${id}-heading`}>{title}</h3>
      <ListIcons data={filterIcons} aria-labelledby={`${id}-heading`} />
    </div>
  );
}
