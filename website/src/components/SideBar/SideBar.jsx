import React from 'react';
import Modal from '@semcore/modal';
import ChevronLeft from '@semcore/icon/ChevronLeft/m';
import Button from '@semcore/button';
import Spin from '@semcore/spin';
// import Interface, { InterfaceHeader } from '../TypescriptDeclaration';
import { SideBarContext } from './SideBarWrapper';
import { TypescriptDeclarationView } from '../TypescriptDeclaration';
import styles from './SideBar.module.css';

export default function SideBar() {
  const { typing, visible, setVisible, loading, loadingError, handleHistoryBack, clearHistory } =
    React.useContext(SideBarContext);

  const topLevelCloseHandler = React.useCallback(() => {
    setVisible(false);
    clearHistory();
  }, [setVisible, clearHistory]);

  return (
    <Modal visible={visible} onClose={topLevelCloseHandler}>
      <Modal.Overlay style={{ padding: 0 }}>
        <Modal.Window className={styles.modalWindow}>
          {loading && <Spin />}
          {loadingError && <Spin />}

          {!loading && !loadingError && typing && (
            <>
              <TypescriptDeclarationView
                namePrefix={
                  <Button size="l" use="tertiary" theme="muted" mr={4} onClick={handleHistoryBack}>
                    <Button.Addon>
                      <ChevronLeft />
                    </Button.Addon>
                  </Button>
                }
                declaration={typing.declaration}
                dependencies={typing.dependencies}
              />
            </>
          )}
        </Modal.Window>
      </Modal.Overlay>
    </Modal>
  );
}
