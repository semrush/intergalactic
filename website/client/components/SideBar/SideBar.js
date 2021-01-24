import React, { useContext } from 'react';
import styled from 'styled-components';
import Modal from '@semcore/modal';
import { useQuery } from '@apollo/client';
import { Flex } from '@semcore/flex-box';
import ChevronLeft from '@semcore/icon/lib/ChevronLeft/m';
import Button from '@semcore/button';
import { INTERFACE_QUERY } from 'tags/interfaceQuery';
import Interface, { InterfaceHeader } from '../Interface';
import { SideBarContext } from './SidebarWrapper';

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
  @media (max-width: 768px) {
    width: 70%;
  }
`;

export default function SideBar() {
  const {
    interfaceName,
    visible,
    changeVisible,
    isHistoryEmpty,
    handleHistoryBack,
    clearHistory,
  } = useContext(SideBarContext);

  if (!interfaceName) {
    return null;
  }

  const topLevelCloseHandler = () => {
    changeVisible(false);
    clearHistory();
  };

  return (
    <Modal visible={visible} onClose={topLevelCloseHandler}>
      <Modal.Overlay style={{ padding: 0 }}>
        <Modal.Window tag={ModalWindow}>
          <InterfaceTable
            name={interfaceName}
            onBackBtnClick={handleHistoryBack}
            showBackBtn={!isHistoryEmpty}
          />
        </Modal.Window>
      </Modal.Overlay>
    </Modal>
  );
}

const Loading = (props) => {
  if (props.error) {
    console.error(props.error, props.value);
    return <p>Error "{props.value}" :(</p>;
  } else if (props.pastDelay) {
    return <p>Loading...</p>;
  } else {
    return null;
  }
};

function InterfaceTable(props) {
  const { name, onBackBtnClick, showBackBtn } = props;
  const { loading, error, data } = useQuery(INTERFACE_QUERY, {
    variables: { name },
    pollInterval: process.env.NODE_ENV === 'production' ? 60 * 1000 : 2 * 1000,
  });
  if (loading || error) {
    return <Loading error={error} pastDelay={loading} value={name} />;
  } else {
    return (
      <>
        <Flex alignItems="center" h="42px">
          {showBackBtn && (
            <Button size="xl" use="tertiary" theme="muted" mr={4} onClick={onBackBtnClick}>
              <Button.Addon>
                <ChevronLeft />
              </Button.Addon>
            </Button>
          )}
          <InterfaceHeader {...data.interface} />
        </Flex>
        <Interface data={data.interface} {...props} />
      </>
    );
  }
}
