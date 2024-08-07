// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme';
import './style.css';
import Sandbox from './Sandbox.vue';
import LegacyEmailsView from './LegacyEmailsView.vue';
import PageTopTabs from './PageTopTabs.vue';
import TypesView from './TypesView.vue';
import Page404 from './Page404.vue';
import DevportalLogo from './DevportalLogo.vue';
import DocFooter from './DocFooter.vue';
import PreferenceSwitch from './PreferenceSwitch.vue';
import BlogPosts from './blog/BlogPosts.vue';
import BlogPostsMainPage from './blog/BlogPostsMainPage.vue';
import DosDonts from './DosDonts.vue';
import mediumZoom from 'medium-zoom';
import { h, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'nav-screen-content-after': () => h(PreferenceSwitch),
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
    app.component('BlogPosts', BlogPosts);
    app.component('BlogPostsMainPage', BlogPostsMainPage);
    app.component('DosDonts', DosDonts);
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
