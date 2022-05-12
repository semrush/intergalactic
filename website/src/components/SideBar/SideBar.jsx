import React from 'react';
import styled from 'styled-components';
import Modal from '@semcore/modal';
import ChevronLeft from '@semcore/icon/ChevronLeft/m';
import Button from '@semcore/button';
import Spin from '@semcore/spin';
// import Interface, { InterfaceHeader } from '../TypescriptDeclaration';
import { SideBarContext } from './SideBarWrapper';
import { TypescriptDeclarationView } from '../TypescriptDeclaration';

const ModalWindow = styled.div`
  width: 50%;
  height: 100%;
  color: #171a22;
  margin-right: initial;
  background: white;
  padding: 24px 32px 32px;
  position: relative;
  box-sizing: border-box;
  border-radius: 0;
  overflow: scroll;
  @media (max-width: 992px) {
    width: 60%;
  }
  @media (max-width: 767px) {
    width: 70%;
  }
`;

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
        <Modal.Window tag={ModalWindow}>
          {loading && <Spin />}
          {loadingError && <Spin />}

          {!loading && !loadingError && typing && (
            <>
              <TypescriptDeclarationView
                namePrefix={
                  <Button size="xl" use="tertiary" theme="muted" mr={4} onClick={handleHistoryBack}>
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
