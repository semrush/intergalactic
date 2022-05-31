import { Plugin } from 'esbuild';

export const esbuildPluginCrutches = (): Plugin => ({
  name: 'esbuild-plugin-intergalactic-crutches',
  setup(build) {
    // https://github.com/bvaughn/react-virtualized/issues/1632

    build.onResolve({ filter: /^\.\.\/WindowScroller\.js$/ }, async ({ path }) => ({
      path,
      namespace: 'windowScrolledStub',
    }));
    build.onLoad(
      { filter: /^\.\.\/WindowScroller\.js$/, namespace: 'windowScrolledStub' },
      async () => ({
        contents: 'export const bpfrpt_proptype_WindowScroller = {};',
      }),
    );
  },
});
