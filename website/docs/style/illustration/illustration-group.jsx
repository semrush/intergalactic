import * as ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';

import { Row } from 'intergalactic/grid';
import OutsideClick from 'intergalactic/outside-click';
import Copy from '@components/Copy';
import Button from 'intergalactic/button';
import FileDownloadM from 'intergalactic/icon/FileDownload/m';
import CopyM from 'intergalactic/icon/Copy/m';
import styles from './styles.module.css';

const IllustrationDetailsPanel = ({ onClose, name }) => {
  const getImportText = React.useCallback(() => {
    const lib = '@semcore/ui';
    const importText = `import ${name} from '${lib}/illustration/${name}'`;

    return importText;
  }, [name]);
  const repoPath = `semcore/illustration/svg/${name}.svg`;
  const ref = React.useRef(null);

  return (
    <div className={styles.panelIllustration} ref={ref}>
      <OutsideClick onOutsideClick={onClose} excludeRefs={[ref]} />
      <Row alignItems='center'>
        <span className={styles.nameIllustration}>{name}</span>
        <Copy copiedToast='Copied' toCopy={getImportText} trigger='click'>
          <Button size='m' theme='muted' use='tertiary' mr={4}>
            <Button.Addon>
              <CopyM />
            </Button.Addon>
            <Button.Text>Copy import</Button.Text>
          </Button>
        </Copy>
        <Button
          size='m'
          theme='muted'
          use='tertiary'
          tag='a'
          rel='noopener noreferrer'
          download={repoPath}
          target='_blank'
          href={`https://github.com/semrush/intergalactic/raw/master/${repoPath}?inline=false`}
        >
          <Button.Addon>
            <FileDownloadM />
          </Button.Addon>
          <Button.Text>Download SVG</Button.Text>
        </Button>
      </Row>
    </div>
  );
};

export const ListIllustrations = ({ data, illustrations, json }) => {
  const [showPanel, setShowPanel] = React.useState(null);

  return (
    <div className={styles.list}>
      {showPanel && (
        <IllustrationDetailsPanel name={showPanel} onClose={() => setShowPanel(null)} />
      )}
      {data.map((illustration, index) => {
        const Illustration = illustrations[illustration.name];
        if (!Illustration) {
          throw new Error(
            `Illustration ${illustration.name} was not founded in import from @illustrations`,
          );
        }

        return (
          // biome-ignore lint/a11y/useKeyWithClickEvents:
          <div
            className={styles.previewIllustration}
            tabIndex={0}
            key={index}
            data-name={illustration.name}
            onClick={() => setShowPanel(illustration.name)}
          >
            <Illustration width={80} height={80} />
            <span>{illustration.name}</span>
          </div>
        );
      })}
    </div>
  );
};

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
