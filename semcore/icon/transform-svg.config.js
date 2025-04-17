const getConfig = () => {
  return {
    tasks: ({ generateIcons, getDescriptionIcons, getDescriptionExternalIcons, getDescriptionPlatformIcons }) => {
      return [
        generateIcons('svg/color', './color', getDescriptionIcons),
        generateIcons('svg/pay', './pay', getDescriptionIcons),
        generateIcons('svg/platform', './platform', getDescriptionPlatformIcons),
        generateIcons('svg/icon', '.', getDescriptionIcons),
      ];
    },
  };
};

module.exports = getConfig;

