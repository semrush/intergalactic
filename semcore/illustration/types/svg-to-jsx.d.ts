declare module 'svg-to-jsx' {
  const svgToJsx: (html: string, options?: {}, callback?: (error: Error, result: string) => void) => Promise<string>;
  export default svgToJsx;
}