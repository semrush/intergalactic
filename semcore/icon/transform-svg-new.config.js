const getConfig = () => {
  return {
    tasks: ({ generateIcons, getDescriptionIcons, getDescriptionExternalIcons }) => {
      return [
        generateIcons('svg-new/color', './color', getDescriptionIcons),
        generateIcons('svg-new/external', './external', getDescriptionExternalIcons),
        generateIcons('svg-new/pay', './pay', getDescriptionIcons),
        generateIcons('svg-new/icon', '.', getDescriptionIcons),
      ];
    },
  };
};

module.exports = getConfig;
