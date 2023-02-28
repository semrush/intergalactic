import * as ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';

import Tooltip from '@semcore/ui/tooltip';
import { Col, Row } from '@semcore/ui/grid';
import Pills from '@semcore/pills';
import OutsideClick from '@semcore/ui/outside-click';
import Copy from '@components/Copy';
import styles from './styles.module.css';

// 😩
function modalLayout() {
  if (!document) return false;
  let node = document.getElementById('modal-layout');
  if (!node) {
    node = document.createElement('div');
    node.id = 'modal-layout';
    document.body.appendChild(node);
  }
  return node;
}

class PanelChangeIcon extends PureComponent {
  state = { action: 'copy' };
  get SIZE() {
    return this.props.old
      ? { L: 44, M: 22, S: 16, XS: 12, XXS: 8, 32: 32, 20: 20 }
      : { L: 24, M: 16 };
  }

  renderIconSize = (size, index) => {
    const { name, old, json: dataIcons, icon: Icon } = this.props;
    const { action } = this.state;

    const iconSize = this.SIZE[size.toUpperCase()] || '';
    let nameSvg = `${name}/${size}`;

    const filterIcons = dataIcons.icons.filter((icon) => icon.name === name)[0];
    const groupName = filterIcons.group.toLowerCase();
    const haveGroupName = ['pay', 'external', 'color'].includes(groupName);
    let includeGroupName = haveGroupName ? `/${groupName}` : '';

    if (action === 'download') {
      includeGroupName = haveGroupName ? `${groupName}` : 'icon';
      // external
      if (Number(size) === 20) {
        nameSvg = name.replace(/([A-Z])/g, '/$1').slice(1);
      }

      const url = `semcore/icon/${old ? 'svg' : 'svg-new'}/${includeGroupName}/${nameSvg}.svg`;
      return (
        <Tooltip title="Download!" key={index}>
          <div className={styles.previewChangeIcon}>
            <a
              className={styles.areaLink}
              rel="noopener noreferrer"
              download={url}
              target="_blank"
              href={`https://github.com/semrush/intergalactic/raw/master/${url}?inline=false`}
              data-container="body"
              data-original-title="Download"
            />
            <Icon width={20} height={20} />
            <span style={{ marginLeft: 8, color: '#898D9A' }}>
              <span style={{ color: '#171A22' }}>{size.toUpperCase()}</span>
              {` (${iconSize}x${iconSize}px)`}
            </span>
          </div>
        </Tooltip>
      );
    }

    const haveSizeIcon = filterIcons.size.length > 1;
    const includeName = haveSizeIcon ? `${name}${size.toUpperCase()}` : name;
    const includeSize = haveSizeIcon ? `/${size}` : '';
    const includeLib = old ? `/lib` : '';
    const importText = `import ${includeName} from '@semcore/ui/icon${includeLib}${includeGroupName}/${name}${includeSize}'`;

    return (
      <Copy copiedToast="Copied!" toCopy={importText} key={index} trigger="click">
        <div className={styles.previewChangeIcon}>
          <Icon width={20} height={20} />
          <span style={{ marginLeft: 8, color: '#898D9A' }}>
            <span style={{ color: '#171A22' }}>{size.toUpperCase()}</span>
            {` (${iconSize}x${iconSize}px)`}
          </span>
        </div>
      </Copy>
    );
  };

  render() {
    const { name, json: dataIcons } = this.props;
    const { action } = this.state;

    return (
      <div className={styles.panelIcon}>
        <OutsideClick
          onOutsideClick={() => {
            const node = modalLayout();
            if (!node) return;
            ReactDOM.unmountComponentAtNode(node);
          }}
          excludeRefs={modalLayout() ? [modalLayout()] : []}
        />
        <Row>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 40,
            }}
          >
            <b>{name}</b>
            <Pills
              value={action}
              style={{ marginTop: 13 }}
              onChange={(value) => this.setState({ action: value })}
            >
              <Pills.Item value="copy">Copy import</Pills.Item>
              <Pills.Item value="download">Download SVG</Pills.Item>
            </Pills>
          </Col>
          <Col>
            <div className={styles.panelIconList}>
              {dataIcons.icons
                .filter((icon) => icon.name === name)[0]
                .size.map(this.renderIconSize)}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export const ListIcons = ({ data, icons, json, old = false }) => (
  <div className={styles.list}>
    {data.map((icon, index) => {
      const Icon = icons[icon.name];
      if (!Icon) {
        new Error(`Icon ${icon.name} was not founded in import from @icons`);
        return null;
      }

      return (
        <div
          className={styles.previewIcon}
          tabIndex={0}
          key={index}
          data-name={icon.name}
          onClick={() => {
            const node = modalLayout();
            if (!node) return;
            ReactDOM.render(
              <PanelChangeIcon name={icon.name} icon={icons[icon.name]} old={old} json={json} />,
              node,
            );
          }}
        >
          <Icon width={20} height={20} />
          <span>{icon.name}</span>
        </div>
      );
    })}
  </div>
);

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
