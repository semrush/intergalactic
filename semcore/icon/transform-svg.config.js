const getConfig = () => {
  return {
    tasks: ({ generateIcons, getDescriptionIcons, getDescriptionExternalIcons }) => {
      const getDescriptionToolkitIcons = (iconPath, outLib) => {
        const name = iconPath.split('/').pop().replace('.svg', '');
        return {
          name,
          location: `${outLib}/${name}/index.js`,
          group: 'toolkit',
          type: null
        };
      };

      return [
        generateIcons('svg/color', './color', getDescriptionIcons),
        generateIcons('svg/external', './external', getDescriptionExternalIcons),
        generateIcons('svg/pay', './pay', getDescriptionIcons),
        generateIcons('svg/toolkit', './toolkit', getDescriptionToolkitIcons),
        generateIcons('svg/icon', '.', getDescriptionIcons),
      ];
    },
  };
};

module.exports = getConfig;
