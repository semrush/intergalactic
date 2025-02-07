import React from 'react';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import SidePanel from '@semcore/side-panel';
import Ellipsis from '@semcore/ellipsis';
import Copy from '@components/Copy';
import Button from '@semcore/button';
import FileDownloadM from '@semcore/icon/FileDownload/m';
import CopyM from '@semcore/icon/Copy/m';
import styles from './styles.module.css';

export const IllustrationDetailsPanel = ({ name, visible, onClose }) => {
  const getImportText = React.useCallback(() => {
    const lib = '@semcore/ui';
    const importText = `import ${name} from '${lib}/illustration/${name}'`;

    return importText;
  }, [name]);
  const repoPath = `semcore/illustration/svg/${name}.svg`;

  return (
    <SidePanel visible={visible} placement='bottom' onClose={onClose}>
      <SidePanel.Panel
        id={`${name}-dialog`}
        aria-label={`Get ${name} illustration`}
        aria-modal={false}
        zIndex='var(--intergalactic-z-index-modal)'
      >
        <Flex justifyContent='center' alignItems='center' gap={4} flexWrap>
          <Text bold wMin={180} textAlign='center'>
            {name}
          </Text>
          <Flex gap={4}>
            <Copy toCopy={getImportText} onlyToast>
              <Button use='tertiary' theme='muted' addonLeft={CopyM}>
                Copy import
              </Button>
            </Copy>
            <Button
              tag='a'
              use='tertiary'
              theme='muted'
              addonLeft={FileDownloadM}
              rel='noopener noreferrer'
              download={repoPath}
              target='_blank'
              href={`https://github.com/semrush/intergalactic/raw/master/${repoPath}?inline=false`}
            >
              Download SVG
            </Button>
          </Flex>
        </Flex>
      </SidePanel.Panel>
    </SidePanel>
  );
};

export const ListIllustrations = ({ data, ...props }) => {
  const { illustrations, selectedIllustration, setSelectedIllustration } =
    React.useContext(Context);

  return (
    <ul
      className={styles.list}
      aria-labelledby={props['aria-labelledby']}
      aria-label={props['aria-label']}
    >
      {data.map((illustration, index) => {
        const Illustration = illustrations[illustration.name];
        if (!Illustration) {
          throw new Error(
            `Illustration ${illustration.name} not found in import from @illustrations`,
          );
        }

        return (
          <li className={styles.previewIllustration} key={illustration.name}>
            <button
              type='button'
              aria-haspopup='dialog'
              aria-expanded={selectedIllustration === illustration.name}
              aria-controls={
                selectedIllustration === illustration.name
                  ? `${illustration.name}-dialog`
                  : undefined
              }
              onClick={() => {
                setSelectedIllustration(illustration.name);
              }}
              data-id={illustration.name}
            >
              <Ellipsis
                data-name='PanelTrigger'
                placement='bottom'
                includeTooltipProps={['placement']}
              >
                <Illustration width={80} height={80} />
                {illustration.name}
              </Ellipsis>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const Context = React.createContext();

export const IllustrationGroups = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <div className={styles.contextWrapper} ref={forwardedRef}>
      <Context.Provider value={props} children={children} />
    </div>
  );
});

export default function ({ title }) {
  const { json } = React.useContext(Context);
  const filterIllustrations = json.illustrations.filter(
    (illustration) => illustration.group === title,
  );
  const id = title.replace(' ', '-');

  return (
    <div className={styles.section}>
      <h3 id={`${id}-heading`}>{title}</h3>
      <ListIllustrations data={filterIllustrations} aria-labelledby={`${id}-heading`} />
    </div>
  );
}
