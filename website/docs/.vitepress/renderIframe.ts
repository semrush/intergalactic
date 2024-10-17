export const renderIframe = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];

    if (token.type === 'container_iframe_open') {
      const url = token.info.split(' ')[2];
      if (!url) return [];

      return `
        <iframe
          src="${url}" 
          class="embedded-documentation-iframe" 
          title='documentation'
        />
      `;
    }
    return [];
  };
  return renderFunc(tokenList, index);
};
