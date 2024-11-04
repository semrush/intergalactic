export const renderIframe = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];

    if (token.type === 'container_iframe_open') {
      const data = token.info.split(' ');
      const url = data[2];
      const height = data[3] ?? '180px';
      if (!url) return [];

      return `
        <iframe
          src="${url}" 
          class="embedded-documentation-iframe" 
          title='documentation'
          height="${height}"
        />
      `;
    }
    return [];
  };
  return renderFunc(tokenList, index);
};
