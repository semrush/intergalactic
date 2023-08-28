// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import './style.css';
import Sandbox from './Sandbox.vue';
import PageTopTabs from './PageTopTabs.vue';
import TypesView from './TypesView.vue';

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-top': () => h(PageTopTabs),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Sandbox', Sandbox);
    app.component('TypesView', TypesView);
  },
};
