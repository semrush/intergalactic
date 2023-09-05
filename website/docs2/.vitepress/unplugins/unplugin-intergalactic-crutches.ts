import { Plugin } from 'esbuild';
import { createUnplugin } from 'unplugin';

// export const esbuildPluginCrutches = (): Plugin => ({
//   name: 'esbuild-plugin-intergalactic-crutches',
//   setup(build) {
//     // https://github.com/bvaughn/react-virtualized/issues/1632

//     build.onResolve({ filter: /^\.\.\/WindowScroller\.js$/ }, async ({ path }) => ({
//       path,
//       namespace: 'windowScrolledStub',
//     }));
//     build.onLoad(
//       { filter: /^\.\.\/WindowScroller\.js$/, namespace: 'windowScrolledStub' },
//       async () => ({
//         contents: 'export const bpfrpt_proptype_WindowScroller = {};',
//       }),
//     );
//   },
// });

export const unpluginCrutches = createUnplugin(() => ({
  name: 'unplugin-intergalactic-crutches',
  async load(id) {
    if (!id.endsWith('/WindowScroller.js')) return null;
    // https://github.com/bvaughn/react-virtualized/issues/1632
    return `
      export const bpfrpt_proptype_WindowScroller = {};
      export default bpfrpt_proptype_WindowScroller;
      export const IS_SCROLLING_TIMEOUT = false;
    `;
  }
}));
