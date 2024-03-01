import Bowser from 'bowser';
import { watch } from 'vue';
import { Router } from 'vitepress';
import amplitudeHttp from './amplitude-client';

const clickedPlaygrounds = new Set<string>();

export const initAmplitude = () => {
  const apiKey = '1e1d36fa96573d0839c6c3ccaffb7f62';

  amplitudeHttp.init(apiKey);
};

export const logEvent = (eventType: string, eventProperties: Record<string, any> = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('logEvent [disabled in dev mode]', eventType, eventProperties);
    return;
  }

  amplitudeHttp.logEvent(eventType, { event_properties: eventProperties });
};

const findParent = (
  node: HTMLElement,
  predicate: (node: HTMLElement) => boolean,
  maxDepth = 10,
): HTMLElement | null => {
  if (maxDepth === 0) return null;
  if (!node) return null;
  if (node === document.body) return null;
  if (predicate(node)) return node;
  if (!node.parentElement) return null;
  return findParent(node.parentElement, predicate, maxDepth - 1);
};

const findPreviousHeader = (node: Element): Element | null => {
  const prevElement = node.previousElementSibling;
  if (prevElement) {
    if (prevElement.tagName === 'H2') {
      return prevElement;
    } else {
      return findPreviousHeader(prevElement);
    }
  }
  return null;
};

const clickHandler = (event: MouseEvent & { target: HTMLElement }) => {
  const node = event.target;
  const pathname = window.location.pathname;
  if (!node) return;
  if (node.innerText) {
    if (node.innerText.toLowerCase() === 'get started')
      return logEvent('button_get-started:click', { pathname });
    if (node.innerText.toLowerCase() === 'explore github')
      return logEvent('button_github:click', { pathname });
  }
  if (findParent(node, (node) => node.classList.contains('VPHomeFeatures'))) {
    const feature = findParent(
      node,
      (node) => node.tagName === 'A' && node.classList.contains('VPFeature'),
    );

    if (feature?.getAttribute('href')?.includes('/components/accordion/accordion')) {
      return logEvent('card_components:click', { pathname });
    }
    if (feature?.getAttribute('href')?.includes('/data-display/chart-showcase/chart-showcase')) {
      return logEvent('card_charts:click', { pathname });
    }
    if (feature?.getAttribute('href')?.includes('/table-group/table-showcase/table-showcase')) {
      return logEvent('card_tables:click', { pathname });
    }
    if (feature?.getAttribute('href')?.includes('/style/icon/icon')) {
      return logEvent('card_icons:click', { pathname });
    }
    if (feature?.getAttribute('href')?.includes('/filter-group/filter-rules/filter-rules')) {
      return logEvent('card_filters:click', { pathname });
    }
    if (feature?.getAttribute('href')?.includes('/patterns/modal-content/modal-content')) {
      return logEvent('card_patterns:click', { pathname });
    }
    if (feature?.getAttribute('href')?.includes('/style/design-tokens/design-tokens')) {
      return logEvent('card_tokens:click', { pathname });
    }
    if (feature?.getAttribute('href')?.includes('/core-principles/a11y/a11y')) {
      return logEvent('card_a11y:click', { pathname });
    }
  }
  if (node.classList.contains('intergalactic-logo')) {
    return logEvent('link_main:click', { pathname });
  }
  if (node.classList.contains('devportal-logo')) {
    return logEvent('link_devportal:click', { pathname });
  }
  if (findParent(node, (node) => node.classList.contains('VPNavBarSearch'))) {
    return logEvent('search:click', { pathname });
  }
  {
    const navbarMenuLink = findParent(node, (node) => node.classList.contains('VPNavBarMenuLink'));
    if (navbarMenuLink) {
      if (navbarMenuLink.innerText.toLowerCase() === 'roadmap') {
        return logEvent('link_roadmap:click', { pathname });
      }
      if (navbarMenuLink.innerText.toLowerCase() === 'releases') {
        return logEvent('link_releases:click', { pathname });
      }
      if (navbarMenuLink.innerText.toLowerCase().includes('report')) {
        return logEvent('link_report:click', { pathname });
      }
    }
    {
      const socialLink = findParent(node, (node) => node.classList.contains('VPSocialLink'));
      if (socialLink) {
        if (socialLink.getAttribute('href')?.includes('github.com')) {
          return logEvent('icon_github:click', { pathname });
        }
        if (socialLink.getAttribute('href')?.includes('figma.com')) {
          return logEvent('icon_figma:click', { pathname });
        }
      }
    }
  }
  {
    const themeSwitch = findParent(node, (node) => node.classList.contains('VPSwitchAppearance'));
    if (themeSwitch) {
      return logEvent('switch_theme:click', { pathname });
    }
  }
  {
    const sidebarItem = findParent(node, (node) => node.classList.contains('VPSidebarItem'));
    if (sidebarItem) {
      if (sidebarItem.classList.contains('level-1')) {
        return logEvent('left_menu-1-level:click', { pathname });
      }
    }
  }
  if (node.classList.contains('outline-link')) {
    return logEvent('right_menu:click', { pathname, link: (node as any)?.href });
  }
  if (node.classList.contains('header-anchor')) {
    return logEvent('title:click', { pathname, link: (node as any)?.href });
  }
  if (node.classList.contains('header-anchor')) {
    return logEvent('title:click', { pathname, link: (node as any)?.href });
  }
  if (node.textContent) {
    if (node.textContent?.toLowerCase().includes('edit this page on github')) {
      return logEvent('edit_page:click', { pathname, link: (node as any)?.href });
    }
    if (node.classList.contains('page-top-tabs-tab')) {
      if (node.textContent?.toLowerCase() === 'design') {
        return logEvent('tab_design:click', { pathname });
      }
      if (node.textContent?.toLowerCase() === 'a11y') {
        return logEvent('tab_a11y:click', { pathname });
      }
      if (node.textContent?.toLowerCase() === 'api') {
        return logEvent('tab_api:click', { pathname });
      }
      if (node.textContent?.toLowerCase() === 'example') {
        return logEvent('tab_examples:click', { pathname });
      }
      if (node.textContent?.toLowerCase() === 'changelog') {
        return logEvent('tab_changelog:click', { pathname });
      }
    }
  }
  if (node.title) {
    if (node.title === 'Copy Code') {
      return logEvent('tab_examples:copy_code:click', { pathname });
    }
    if (node.title === 'Open CodeSandbox') {
      return logEvent('tab_examples:open_sandbox:click', { pathname });
    }
  }
  if (node.classList.contains('types-view-reference')) {
    return logEvent('tab_examples:open_sandbox:click', { pathname, type: node.textContent });
  }

  {
    // Examples
    const playground = findParent(node, (node) => {
      return (
        node.classList.contains('playground-runtime') &&
        node.classList.contains('documentation-sandbox')
      );
    });

    // we store only first click on the playground, that's why skip if already clicked
    if (playground && node.getAttribute('data-ui-name') && !clickedPlaygrounds.has(playground.id)) {
      const titleElement = findPreviousHeader(playground);
      const exampleTitle = titleElement?.textContent;
      logEvent('example_example:click', { pathname, exampleTitle });
      clickedPlaygrounds.add(playground.id);
    }
  }

  {
    // Playground in design
    const widgetBar = findParent(node, (node) => {
      return node.classList.contains('playground-widgets-bar');
    });

    if (widgetBar) {
      const playground = findParent(widgetBar, (node) => {
        return node.classList.contains('documentation-sandbox');
      });

      // we store only first click on the playground, that's why skip if already clicked
      if (playground && !clickedPlaygrounds.has(playground.id)) {
        logEvent('design_example:click', { pathname });
        clickedPlaygrounds.add(playground.id);
      }
    }
  }

  {
    // Search item
    const searchItem = findParent(node, (node) => {
      return node.classList.contains('DocSearch-Hit-Container');
    });
    const searchItemA = searchItem?.parentElement;

    if (searchItemA?.tagName === 'A') {
      const item = searchItemA.parentElement;
      const itemId = item.id.split('-');
      const index = itemId[itemId.length - 1];

      return logEvent('search:item_selected', {
        item: index + 1,
        link: searchItemA.getAttribute('href'),
      });
    }
  }

  {
    // External links
    if (node.tagName === 'A' && !node.classList.contains('page-top-tabs-tab')) {
      const link = node.getAttribute('href');

      if (link && new URL(link).host !== window.location.host) {
        return logEvent('links:click', { pathname, link });
      }
    }
  }
};

let dispatchChangeRoute: (() => void) | undefined;

const handleChangeRoute = (to: string, from: string) => {
  // url has /intergalactic/${SECTION}/${SUB_SECTION}/${TAB_ITEM}
  // here we need to check only Section and SubSection, for tabs we have another handler
  const fromItems = from.split('/');
  const toItems = to.split('/');

  if (from !== '/' && to !== '/' && (fromItems[2] !== toItems[2] || fromItems[3] !== toItems[3])) {
    return logEvent('left_menu-2-level:click', { pathname: from, link: to });
  }
};

export const initGlobalEventsHandler = (router: Router) => {
  dispatchChangeRoute = watch(() => router.route.path, handleChangeRoute);

  document.addEventListener('click', clickHandler as any, { capture: true });
};
export const disposeGlobalEventsHandler = () => {
  if (dispatchChangeRoute) {
    dispatchChangeRoute();
  }

  document.removeEventListener('click', clickHandler as any, { capture: true });
};
