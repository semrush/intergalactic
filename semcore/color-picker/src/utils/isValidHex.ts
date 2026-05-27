function isValidHex(hex: string) {
  if (hex[0] !== '#' && hex.length === 7) return false;

  const reg = /^#([0-9a-f]{3,4}){1,2}$/i;
  return hex[0] === '#' ? reg.test(hex) : reg.test(`#${hex}`);
}

export default isValidHex;
