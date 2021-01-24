import React, { useState } from 'react';

const SideBarContext = React.createContext({});

const { Provider } = SideBarContext;

const SidebarWrapper = (props) => {
  const [interfaceName, changeInterfaceName] = useState(null);
  const [visible, changeVisible] = useState(false);
  const [history, updateHistory] = useState([]);

  const handleLinkClick = (name) => (e) => {
    visible ? updateHistory([...history, interfaceName]) : changeVisible(true);
    changeInterfaceName(name);
  };

  const handleHistoryBack = () => {
    const historyClone = [...history];
    const prevHistoryItem = historyClone.pop();
    changeInterfaceName(prevHistoryItem);
    updateHistory(historyClone);
  };

  const clearHistory = () => {
    updateHistory([]);
  };

  const isHistoryEmpty = history.length === 0;

  return (
    <Provider
      value={{
        interfaceName,
        visible,
        changeVisible,
        handleLinkClick,
        isHistoryEmpty,
        handleHistoryBack,
        clearHistory,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default SidebarWrapper;
export { SideBarContext };
