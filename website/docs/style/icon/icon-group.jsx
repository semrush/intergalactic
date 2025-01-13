import React from 'react';

import Tooltip from 'intergalactic/tooltip';
import { Col, Row } from 'intergalactic/grid';
import Pills from '@semcore/pills';
import OutsideClick from 'intergalactic/outside-click';
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
        <div className={styles.previewChangeIcon}>
          <a
            className={styles.areaLink}
            rel='noopener noreferrer'
            download={url}
            target='_blank'
            href={`https://github.com/semrush/intergalactic/raw/master/${url}?inline=false`}
            data-container='body'
            data-original-title='Download'
          />
          <Icon width={20} height={20} />
          <span className={styles.iconSizes}>
            <span className={styles.iconSizeTitle}>{size.toUpperCase()}</span>
            {` (${iconSize}x${iconSize}px)`}
          </span>
        </div>
      </Tooltip>
    );
  }

  return (
    <Copy copiedToast='Copied!' toCopy={getImportText} trigger='click'>
      <div className={styles.previewChangeIcon}>
        <Icon width={20} height={20} />
        <span className={styles.iconSizes}>
          <span className={styles.iconSizeTitle}>{size.toUpperCase()}</span>
          {` (${iconSize}x${iconSize}px)`}
        </span>
      </div>
    </Copy>
  );
};

const IconDetailsPanel = ({ name, json: dataIcons, icon: Icon, onClose }) => {
  const [action, setAction] = React.useState('copy');
  const ref = React.useRef(null);

  return (
    <div className={styles.panelIcon} ref={ref}>
      <OutsideClick onOutsideClick={onClose} excludeRefs={[ref]} />
      <Row>
        <Col style={{ display: 'flex', flexDirection: 'column', marginRight: 40 }}>
          <b>{name}</b>
          <Pills value={action} style={{ marginTop: 13 }} onChange={setAction}>
            <Pills.Item value='copy'>Copy import</Pills.Item>
            <Pills.Item value='download'>Download SVG</Pills.Item>
          </Pills>
        </Col>
        <Col>
          <div className={styles.panelIconList}>
            {dataIcons.icons
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const ListIcons = ({ data, icons, json }) => {
  const [showPanel, setShowPanel] = React.useState(null);

  return (
    <div className={styles.list}>
      {showPanel && (
        <IconDetailsPanel
          name={showPanel}
          icon={icons[showPanel]}
          json={json}
          onClose={() => setShowPanel(null)}
        />
      )}
      {data.map((icon) => {
        const Icon = icons[icon.name];
        if (!Icon) {
          throw new Error(`Icon ${icon.name} was not founded in import from @icons`);
        }

        return (
          // biome-ignore lint/a11y/useKeyWithClickEvents:
          <div
            className={styles.previewIcon}
            tabIndex={0}
            key={icon.name}
            data-name={icon.name}
            onClick={() => setShowPanel(icon.name)}
          >
            <Icon width={20} height={20} />
            <span>{icon.name}</span>
          </div>
        );
      })}
    </div>
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
      <h3>{title}</h3>
      <ListIcons data={filterIcons} {...context} />
    </div>
  );
}
