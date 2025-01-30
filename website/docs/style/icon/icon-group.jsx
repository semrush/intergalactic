import React from 'react';

import Tooltip from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import Pills from '@semcore/pills';
import SidePanel from '@semcore/side-panel';
import Copy from '@components/Copy';
import styles from './styles.module.css';

const iconLetterToNumericSize = { l: 24, m: 16 };

const DownloadIconButton = ({ size, name, action, dataIcons, icon: Icon }) => {
  const iconSize = iconLetterToNumericSize[size] || '';
  let nameSvg = `${name}/${size}`;

  const filterIcons = dataIcons.icons.filter((icon) => icon.name === name)[0];
  const groupName = filterIcons.group.toLowerCase();
  const haveGroupName = ['pay', 'external', 'color'].includes(groupName);
  let includeGroupName = haveGroupName ? `/${groupName}` : '';

  const getImportText = React.useCallback(() => {
    const lib = '@semcore/ui';
    const haveSizeIcon = filterIcons.size.length > 1;
    const includeName = haveSizeIcon ? `${name}${size.toUpperCase()}` : name;
    const includeSize = haveSizeIcon ? `/${size}` : '';
    const importText = `import ${includeName} from '${lib}/icon${includeGroupName}/${name}${includeSize}'`;

    return importText;
  }, [name, size, filterIcons.size]);

  if (action === 'download') {
    includeGroupName = haveGroupName ? `${groupName}` : 'icon';
    // external
    if (Number(size) === 20) {
      nameSvg = name.replace(/([A-Z])/g, '/$1').slice(1);
    }

    const url = `semcore/icon/svg/${includeGroupName}/${nameSvg}.svg`;
    return (
      <Tooltip title='Download!'>
        <a
          className={styles.previewChangeIcon}
          rel='noopener noreferrer'
          download={url}
          target='_blank'
          href={`https://github.com/semrush/intergalactic/raw/master/${url}?inline=false`}
          data-container='body'
          data-original-title='Download'
        >
          <Icon width={20} height={20} />
          <span className={styles.iconSizes}>
            <span className={styles.iconSizeTitle}>{size.toUpperCase()}</span>
            {` (${iconSize}x${iconSize}px)`}
          </span>
        </a>
      </Tooltip>
    );
  }

  return (
    <Copy toCopy={getImportText} trigger='click' title='Copy import'>
      <button type='button' className={styles.previewChangeIcon}>
        <Icon width={20} height={20} />
        <span className={styles.iconSizes}>
          <span className={styles.iconSizeTitle}>{size.toUpperCase()}</span>
          {` (${iconSize}x${iconSize}px)`}
        </span>
      </button>
    </Copy>
  );
};

const IconDetailsPanel = ({ name, json: dataIcons, icon: Icon, visible, onClose }) => {
  const [action, setAction] = React.useState('copy');

  return (
    <SidePanel visible={visible} placement='bottom' onClose={onClose}>
      <SidePanel.Panel id={`${name}-dialog`} aria-label={`Get ${name} icon`} aria-modal={false}>
        <Flex gap={10} justifyContent='center'>
          <Flex direction='column'>
            <b>{name}</b>
            <Pills
              value={action}
              style={{ marginTop: 13 }}
              onChange={setAction}
              aria-label={`Get ${name} icon`}
            >
              <Pills.Item value='copy'>Copy import</Pills.Item>
              <Pills.Item value='download'>Download SVG</Pills.Item>
            </Pills>
          </Flex>
          <Flex gap={6}>
            {visible &&
              dataIcons.icons
                .filter((icon) => icon.name === name)[0]
                .size.map((size) => {
                  return (
                    <DownloadIconButton
                      key={size}
                      size={size}
                      name={name}
                      action={action}
                      dataIcons={dataIcons}
                      icon={Icon}
                    />
                  );
                })}
          </Flex>
        </Flex>
      </SidePanel.Panel>
    </SidePanel>
  );
};

export const ListIcons = ({ data, icons, json, ...props }) => {
  const [showPanel, setShowPanel] = React.useState(null);
  const triggerRef = React.useRef(null);

  return (
    <>
      <ul
        className={styles.list}
        aria-labelledby={props['aria-labelledby'] ?? undefined}
        aria-label={props['aria-label'] ?? undefined}
      >
        {data.map((icon) => {
          const Icon = icons[icon.name];
          if (!Icon) {
            throw new Error(`Icon ${icon.name} not found in import from @icons`);
          }

          return (
            <li className={styles.previewIcon} key={icon.name} data-name={icon.name}>
              <button
                type='button'
                aria-haspopup='dialog'
                aria-expanded={showPanel === icon.name}
                aria-controls={showPanel === icon.name ? `${icon.name}-dialog` : undefined}
                ref={showPanel === icon.name ? triggerRef : undefined}
                onClick={() => setShowPanel(icon.name)}
              >
                <Icon width={20} height={20} />
                <span>{icon.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <IconDetailsPanel
        name={showPanel}
        icon={icons[showPanel]}
        json={json}
        visible={showPanel !== null}
        onClose={() => {
          setShowPanel(null);
          setTimeout(() => triggerRef.current?.focus(), 10);
        }}
      />
    </>
  );
};

const Context = React.createContext();

export const IconGroups = ({ children, ...props }) => {
  return <Context.Provider value={props} children={children} />;
};
export default function ({ title }) {
  const context = React.useContext(Context);
  const dataIcons = context.json;
  const filterIcons = dataIcons.icons.filter((icon) => icon.group === title);

  return (
    <div className={styles.section}>
      <h3 id={`${title}-heading`}>{title}</h3>
      <ListIcons data={filterIcons} aria-labelledby={`${title}-heading`} {...context} />
    </div>
  );
}
