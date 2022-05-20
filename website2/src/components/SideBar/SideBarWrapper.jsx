import React, { useState } from 'react';

const SideBarContext = React.createContext({});

const { Provider } = SideBarContext;

const SidebarWrapper = (props) => {
  const [typing, setTyping] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [, setHistory] = useState([]);

  const inspectTyping = React.useCallback(
    (getImport) => async () => {
      if (loading) return;
      setLoading(true);
      try {
        const importedModule = await getImport();
        const typing = importedModule.default;
        setHistory((history) => [...history, typing]);
        setVisible(true);
        setTyping(typing);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setLoadingError(error);
      } finally {
        setLoading(false);
      }
    },
    [loading, setLoading, visible, setVisible, setHistory, setTyping, setLoadingError],
  );

  const handleHistoryBack = React.useCallback(() => {
    setHistory((history) => {
      history.pop();
      setTyping(history[history.length - 1]);
      if (history.length === 0) {
        setVisible(null);
      }
      return [...history];
    });
  }, [setHistory, setTyping]);

  const clearHistory = React.useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return (
    <Provider
      value={{
        typing,
        visible,
        setVisible,
        loading,
        loadingError,
        inspectTyping,
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
