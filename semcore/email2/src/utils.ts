export const getAttrs = (element) => {
  const attrsNames = element.getAttributeNames();
  const attrs = {};

  for (let i = 0; i < attrsNames.length; i++) {
    const attrValue = element.getAttribute(attrsNames[i]);
    attrs[attrsNames[i]] = attrValue;
  }

  return attrs;
};

export const setAttrs = (element, attrs) => {
  const attrsKeys = Object.keys(attrs);
  const attrsValues = Object.values(attrs);

  for (let i = 0; i < attrsKeys.length; i++) {
    element.setAttribute(attrsKeys[i], attrsValues[i]);
  }
};
