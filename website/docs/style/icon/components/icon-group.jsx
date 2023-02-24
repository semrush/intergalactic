import * as ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Tooltip from '@semcore/ui/tooltip';
import { Col, Row } from '@semcore/ui/grid';
import Pills from '@semcore/pills';
import OutsideClick from '@semcore/ui/outside-click';
import Copy from '@components/Copy';

const Section = styled.div`
  margin-top: ${({ mt }) => mt && `${mt}px`};
  margin-bottom: calc(9 * var(--intergalactic-spacing-1x));
  font-size: var(--intergalactic-fs-300);
  line-height: var(--intergalactic-lh-300);
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: var(--intergalactic-spacing-3x);
  border-radius: var(--intergalactic-rounded-medium);
  border: solid 1px #d1d4db;
`;

const PreviewIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 calc(var(--intergalactic-spacing-2x) + 2px) calc(var(--intergalactic-spacing-3x) + 2px);
  width: 118px;
  height: 82px;
  border-radius: var(--intergalactic-rounded-medium);
  border: 2px solid transparent;
  box-sizing: border-box;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: #e9ebef;
  }
  &:focus {
    border-color: #0071cd;
  }

  span {
    margin-top: calc(var(--intergalactic-spacing-2x) + 2px);
    width: 100%;
    font-size: var(--intergalactic-fs-200);
    line-height: var(--intergalactic-lh-100);
    color: #575c66;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const PanelIcon = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding: var(--intergalactic-spacing-5x) 70px;
  width: 100%;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);
  background: #fff;
  z-index: 2;
  box-sizing: border-box;
`;

const PreviewChangeIcon = styled.div`
  position: relative;
  display: flex;
  padding: 0 var(--intergalactic-spacing-4x);
  justify-content: center;
  align-items: center;
  height: 60px;
  border-radius: var(--intergalactic-rounded-medium);
  background-color: #e9ebef;
  font-size: calc(var(--intergalactic-fs-100) + 1px);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 112, 204, 0.15);
  }
`;

const PanelIconList = styled.div`
  display: flex;

  & div {
    margin-right: 12px;
  }
`;

const AreaLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

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
          <PreviewChangeIcon>
            <AreaLink
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
          </PreviewChangeIcon>
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
        <PreviewChangeIcon>
          <Icon width={20} height={20} />
          <span style={{ marginLeft: 8, color: '#898D9A' }}>
            <span style={{ color: '#171A22' }}>{size.toUpperCase()}</span>
            {` (${iconSize}x${iconSize}px)`}
          </span>
        </PreviewChangeIcon>
      </Copy>
    );
  };

  render() {
    const { name, json: dataIcons } = this.props;
    const { action } = this.state;

    return (
      <PanelIcon>
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
            <PanelIconList>
              {dataIcons.icons
                .filter((icon) => icon.name === name)[0]
                .size.map(this.renderIconSize)}
            </PanelIconList>
          </Col>
        </Row>
      </PanelIcon>
    );
  }
}

export const ListIcons = ({ data, icons, json, old = false }) => (
  <List>
    {data.map((icon, index) => {
      const Icon = icons[icon.name];
      if (!Icon) {
        new Error(`Icon ${icon.name} was not founded in import from @icons`);
        return null;
      }

      return (
        <PreviewIcon
          tabIndex={0}
          // active={this.state.activeIcon === icon.name}
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
        </PreviewIcon>
      );
    })}
  </List>
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
    <Section>
      <h3>{title}</h3>
      <ListIcons data={filterIcons} {...context} />
    </Section>
  );
}
