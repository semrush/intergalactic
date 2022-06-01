const getConfig = () => {
  return {
    tasks: ({
      generateIcons,
      getDescriptionIcons,
      getDescriptionExternalIcons,
      getDescriptionPayIcons,
    }) => {
      return [
        generateIcons('svg/color', 'lib/color', getDescriptionIcons),
        generateIcons('svg/external', 'lib/external', getDescriptionExternalIcons),
        generateIcons('svg/pay', 'lib/pay', getDescriptionPayIcons),
        generateIcons('svg/icon', 'lib', getDescriptionIcons),
      ];
    },

    template: (obj) => `
      import React from 'react';
      import { createBaseComponent } from '@semcore/core';
      import Icon from '@semcore/icon';
      import logger from '@semcore/utils/lib/logger';
      
      function ${obj.name}({width = '${obj.width}', height = '${obj.height}', viewBox = '${obj.viewBox}', ...props}, ref) {
        logger.warn(true, "you are using the old icon, use import from '@semcore/icon/Name/Size'", "${obj.name}")
        return (
            <Icon 
              ref={ref}
              data-name="${obj.dataName}" 
              data-group="${obj.dataGroup}"
              width={width}
              height={height}
              viewBox={viewBox}
              {...props}
            >
               ${obj.sourcePath}
            </Icon>
          );
      }
      
      ${obj.name}.displayName = '${obj.name}'
      
      export default createBaseComponent(${obj.name})
      `,
  };
};

module.exports = getConfig;
