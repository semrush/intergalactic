import * as ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Tooltip from '@semcore/tooltip';
import { Col, Row } from '@semcore/grid';
import Pills from '@semcore/pills';
import OutsideClick from '@semcore/outside-click';
import Copy from 'components/Copy';
import dataIcons from './icons.json';

const Section = styled.div`
  margin-top: ${({ mt }) => mt && `${mt}px`};
  margin-bottom: 36px;
  font-size: 16px;
  line-height: 1.5;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  border-radius: 6px;
  border: solid 1px #d1d4db;
`;

const PreviewIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px 14px;
  width: 118px;
  height: 82px;
  border-radius: 6px;
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
    margin-top: 10px;
    width: 100%;
    font-size: 14px;
    line-height: 1.33;
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
  padding: 20px 70px;
  width: 100%;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);
  background: #fff;
  z-index: 2;
  box-sizing: border-box;
`;

const PreviewChangeIcon = styled.div`
  position: relative;
  display: flex;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-radius: 6px;
  background-color: #e9ebef;
  font-size: 13px;
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

const Icons = importAll(require.context('@semcore/icon/lib', true, /^\.\/.*\.js$/));
const icons = {}; // {name, fn}
const SIZE = { L: 44, M: 22, S: 16, XS: 12, XXS: 8, 32: 32, 20: 20 };

Object.keys(Icons).forEach((nameFile) => {
  const fn = Icons[nameFile];
  const name = fn.displayName;
  if (fn && name && name !== 'Icon') {
    icons[name] = fn;
  }
});

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

function importAll(r) {
  return r.keys().reduce((components, key) => {
    const module = r(key);

    if (module.default) {
      components[key] = module.default;
    } else {
      components[key] = module;
    }
    return components;
  }, {});
}

class PanelChangeIcon extends PureComponent {
  state = { action: 'copy' };

  renderIconSize = (size, index) => {
    const { name } = this.props;
    const { action } = this.state;
    const Icon = icons[name];

    const iconSize = SIZE[size.toUpperCase()] || '';
    let nameSvg = `${name}/${size}`;

    const filterIcons = dataIcons.icons.filter((icon) => icon.name === name)[0];
    const groupName = filterIcons.group.toLowerCase();
    const haveGroupName = ['pay', 'external', 'color'].includes(groupName);
    let includeGroupName = haveGroupName ? `/${groupName}` : '';

    if (action === 'download') {
      let includeGroupName = haveGroupName ? `${groupName}` : 'icon';
      // external
      if (Number(size) === 20) {
        nameSvg = name.replace(/([A-Z])/g, '/$1').slice(1);
      }

      const url = `semcore/icon/svg/${includeGroupName}/${nameSvg}.svg`;
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

    const importText = `import ${includeName} from '@semcore/icon/lib${includeGroupName}/${name}${includeSize}'`;

    return (
      <Copy title="Copied!" text={importText} key={index} trigger="click">
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
    const { name } = this.props;
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

export const ListIcons = ({ data }) => (
  <List>
    {data.map((icon, index) => {
      const Icon = icons[icon.name];
      if (!Icon) {
        new Error(icon.name);
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
            ReactDOM.render(<PanelChangeIcon name={icon.name} />, node);
          }}
        >
          <Icon width={20} height={20} />
          <span>{icon.name}</span>
        </PreviewIcon>
      );
    })}
  </List>
);

export default function({ title }) {
  const filterIcons = dataIcons.icons.filter((icon) => icon.group === title);

  return (
    <Section>
      <h3>{title}</h3>
      <ListIcons data={filterIcons} />
    </Section>
  );
}
