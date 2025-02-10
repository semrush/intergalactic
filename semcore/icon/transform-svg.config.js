const getConfig = () => {
  return {
    tasks: ({ generateIcons, getDescriptionIcons, getDescriptionExternalIcons }) => {
      return [
        generateIcons('svg/color', './color', getDescriptionIcons),
        generateIcons('svg/pay', './pay', getDescriptionIcons),
        generateIcons('svg/icon', '.', getDescriptionIcons),
      ];
    },
  };
};

module.exports = getConfig;

