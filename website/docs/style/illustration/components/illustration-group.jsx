import * as ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Row } from '@semcore/grid';
import OutsideClick from '@semcore/outside-click';
import Copy from '@components/Copy';
import Button from '@semcore/button';
import FileDownloadM from '@semcore/icon/FileDownload/m';
import CopyM from '@semcore/icon/Copy/m';

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

const PreviewIllustration = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px 14px;
  width: 118px;
  height: 140px;
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

const PanelIllustration = styled.div`
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

const NameIllustration = styled.span`
  font-weight: bold;
  margin-right: 40px;
`;

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

class PanelChangeIllustration extends PureComponent {
  render() {
    const { name } = this.props;
    const importText = `import ${name} from '@semcore/illustration/${name}'`;
    const url = `semcore/illustration/svg/${name}.svg`;

    return (
      <PanelIllustration>
        <OutsideClick
          onOutsideClick={() => {
            const node = modalLayout();
            if (!node) return;
            ReactDOM.unmountComponentAtNode(node);
          }}
          excludeRefs={modalLayout() ? [modalLayout()] : []}
        />
        <Row alignItems="center">
          <NameIllustration>{name}</NameIllustration>
          <Copy title="Copied" text={importText} trigger="click">
            <Button size="m" theme="muted" use="tertiary" mr={4}>
              <Button.Addon>
                <CopyM />
              </Button.Addon>
              <Button.Text>Copy import</Button.Text>
            </Button>
          </Copy>
          <Button
            size="m"
            theme="muted"
            use="tertiary"
            tag="a"
            rel="noopener noreferrer"
            download={url}
            target="_blank"
            href={`https://github.com/semrush/intergalactic/raw/master/${url}?inline=false`}
          >
            <Button.Addon>
              <FileDownloadM />
            </Button.Addon>
            <Button.Text>Download SVG</Button.Text>
          </Button>
        </Row>
      </PanelIllustration>
    );
  }
}

export const ListIllustrations = ({ data, illustrations, json }) => (
  <List>
    {data.map((illustration, index) => {
      const Illustration = illustrations[illustration.name];
      if (!Illustration) {
        new Error(
          `Illustration ${illustration.name} was not founded in import from @illustrations`,
        );
        return null;
      }

      return (
        <PreviewIllustration
          tabIndex={0}
          key={index}
          data-name={illustration.name}
          onClick={() => {
            const node = modalLayout();
            if (!node) return;
            ReactDOM.render(
              <PanelChangeIllustration
                name={illustration.name}
                icon={illustrations[illustration.name]}
                json={json}
              />,
              node,
            );
          }}
        >
          <Illustration width={80} height={80} />
          <span>{illustration.name}</span>
        </PreviewIllustration>
      );
    })}
  </List>
);

const Context = React.createContext();

export const IllustrationGroups = ({ children, ...props }) => {
  return <Context.Provider value={props} children={children} />;
};
export default function ({ title }) {
  const context = React.useContext(Context);
  const dataIllustrations = context.json;
  const filterIllustrations = dataIllustrations.illustrations.filter(
    (illustration) => illustration.group === title,
  );

  return (
    <Section>
      <h3>{title}</h3>
      <ListIllustrations data={filterIllustrations} {...context} />
    </Section>
  );
}
