const getConfig = () => {
  return {
    tasks: ({ generateIcons, getDescriptionIcons, getDescriptionExternalIcons }) => {
      const getDescriptionPlatformIcons = (iconPath, outLib) => {
        const name = iconPath.split('/').pop().replace('.svg', '');
        return {
          name,
          location: `${outLib}/${name}/index.js`,
          group: 'platform',
          type: null
        };
      };

      return [
        generateIcons('svg/color', './color', getDescriptionIcons),
        generateIcons('svg/external', './external', getDescriptionExternalIcons),
        generateIcons('svg/pay', './pay', getDescriptionIcons),
        generateIcons('svg/platform', './platform', getDescriptionPlatformIcons),
        generateIcons('svg/icon', '.', getDescriptionIcons),
      ];
    },
  };
};

module.exports = getConfig;
