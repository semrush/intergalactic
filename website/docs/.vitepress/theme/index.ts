// https://vitepress.dev/guide/custom-theme
import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';
import Theme from 'vitepress/theme';
import './style.css';
import { h, onMounted, watch, nextTick } from 'vue';

import DevportalLogo from './DevportalLogo.vue';
import DocFooter from './DocFooter.vue';
import DosDonts from './DosDonts.vue';
import DosDontsCopy from './DosDontsCopy.vue';
import GlossaryTable from './GlossaryTable.vue';
import LegacyEmailsView from './LegacyEmailsView.vue';
import Page404 from './Page404.vue';
import PageTopTabs from './PageTopTabs.vue';
import Playground from './Playground.vue';
import Sandbox from './Sandbox.vue';
import TypesView from './TypesView.vue';

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-top': () => h(PageTopTabs),
      'not-found': () => h(Page404),
      'nav-bar-title-before': () => h(DevportalLogo),
      'doc-after': () => h(DocFooter),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Sandbox', Sandbox);
    app.component('LegacyEmailsView', LegacyEmailsView);
    app.component('TypesView', TypesView);
    app.component('DosDonts', DosDonts);
    app.component('DosDontsCopy', DosDontsCopy);
    app.component('GlossaryTable', GlossaryTable);
    app.component('Playground', Playground);
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    );
  },
};
