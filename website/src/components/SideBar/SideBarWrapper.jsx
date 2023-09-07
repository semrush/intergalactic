import React from 'react';

const SideBarContext = React.createContext({});

const { Provider } = SideBarContext;

const SidebarWrapper = (props) => {
  const [typing, setTyping] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState(null);
  const [, setHistory] = React.useState([]);

  const inspectTyping = React.useCallback(
    (typing) => async () => {
      if (loading) return;
      setLoading(true);
      try {
        setHistory((history) => [...history, typing]);
        setVisible(true);
        setTyping(typing);
      } catch (error) {
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
