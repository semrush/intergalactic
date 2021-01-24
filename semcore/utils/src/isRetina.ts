/* eslint-disable */
export default function isRetina() {
  if (!window) return false;
  if (window.matchMedia)
    return window.matchMedia(`(-webkit-min-device-pixel-ratio: 1.25),
    (min--moz-device-pixel-ratio: 1.25),
    (-o-min-device-pixel-ratio: 1.25/1),
    (min-device-pixel-ratio: 1.25),
    (min-resolution: 200dpi),
    (min-resolution: 1.25dppx)`).matches;
  if (window.devicePixelRatio) {
    return window.devicePixelRatio > 1;
  }
  return false;
}
