import type { Route } from 'vitepress/client';
import type { Ref } from 'vue';

const latest = import.meta.env.VITE_LATEST;

export function getCurrentVersion(theme: Ref<any, any>, route: Route) {
  const availableVersions = theme.value.versions.items;
  const versionInPath = route.path.split('/')[2];

  const currentVersion = availableVersions.find((v: string) => v === versionInPath) ?? theme.value.versions.currentVersion;

  return currentVersion;
}

export function getVersionedBaseLink(currentVersion: string): string {
  const link = currentVersion === latest ? '/intergalactic/' : `/intergalactic/${currentVersion}/`;

  return link;
}

export function getSwitcherData(theme: Ref<any, any>, route: Route, currentVersion: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const path = route.path.split('/');
  const isVersion = /v[0-9]+-[0-9]+-[0-9]+/.test(path[2]);

  return {
    text: currentVersion.replaceAll('-', '.'),
    items: theme.value.versions.items.map((v: string) => {
      const text = v === currentVersion ? theme.value.versions.currentVersion : v;
      const link = `${origin}/intergalactic/${text === latest ? '' : `${text}/`}${path.slice(isVersion ? 3 : 2).join('/')}${hash}`;

      return {
        text: text.replaceAll('-', '.'),
        target: '_blank',
        link,
        version: v.replace(' ', '_'),
      };
    }),
  };
}
