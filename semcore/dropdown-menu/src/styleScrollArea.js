/* THIS IS CRUNCH because the order of loading styles in mini-css-extract-plugin is different from style-loader and our loader
 * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/555
 *
 * We will figure out what to do with it and remove it.
 *  */
import scrollStyles from './style/scroll-area.shadow.css';
export default scrollStyles;
