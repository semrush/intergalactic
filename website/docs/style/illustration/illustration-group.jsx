import Copy from '@components/Copy';
import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import CopyM from '@semcore/icon/Copy/m';
import FileDownloadM from '@semcore/icon/FileDownload/m';
import SidePanel from '@semcore/side-panel';
import { Text } from '@semcore/typography';
import React from 'react';

import styles from './styles.module.css';

export const IllustrationDetailsPanel = ({ name, visible, onClose }) => {
  const getImportText = React.useCallback(() => {
    const lib = '@semcore';
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
            <Copy toCopy={getImportText} onlyCopiedToast>
              <Button
                use='tertiary'
                theme='muted'
                addonLeft={CopyM}
                data-illustration-copy-import={name}
              >
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
              href={`https://github.com/semrush/intergalactic/raw/HEAD/${repoPath}?inline=false`}
              data-illustration-download-svg={name}
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
        const buttonRef = React.useRef();

        return (
          <li className={styles.previewIllustration} key={illustration.name}>
            <button
              ref={buttonRef}
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
              data-name='PanelTrigger'
            >
              <Illustration width={80} height={80} />
              <Text
                w={80}
                ellipsis={true}
                size={200}
                use='secondary'
                hintProps={{ triggerRef: buttonRef, placement: 'bottom' }}
              >
                {illustration.name}
              </Text>
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
