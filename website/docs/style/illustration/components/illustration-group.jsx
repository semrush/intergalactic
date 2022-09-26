import * as ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';

import { Row } from '@semcore/grid';
import OutsideClick from '@semcore/outside-click';
import Copy from '@components/Copy';
import Button from '@semcore/button';
import FileDownloadM from '@semcore/icon/FileDownload/m';
import CopyM from '@semcore/icon/Copy/m';
import styles from './styles.module.css';

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
    const importText = `import ${name} from '@semcore/ui/illustration/${name}'`;
    const url = `semcore/illustration/svg/${name}.svg`;

    return (
      <div className={styles.panelIllustration}>
        <OutsideClick
          onOutsideClick={() => {
            const node = modalLayout();
            if (!node) return;
            ReactDOM.unmountComponentAtNode(node);
          }}
          excludeRefs={modalLayout() ? [modalLayout()] : []}
        />
        <Row alignItems="center">
          <span className={styles.nameIllustration}>{name}</span>
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
      </div>
    );
  }
}

export const ListIllustrations = ({ data, illustrations, json }) => (
  <div className={styles.list}>
    {data.map((illustration, index) => {
      const Illustration = illustrations[illustration.name];
      if (!Illustration) {
        new Error(
          `Illustration ${illustration.name} was not founded in import from @illustrations`,
        );
        return null;
      }

      return (
        <div
          className={styles.previewIllustration}
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
        </div>
      );
    })}
  </div>
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
    <div className={styles.section}>
      <h3>{title}</h3>
      <ListIllustrations data={filterIllustrations} {...context} />
    </div>
  );
}
