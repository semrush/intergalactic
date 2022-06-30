import { useParams } from 'react-router-dom';
import { usePromise } from '../utils/usePromise';
import { routes } from '@navigation';

export const useRouting = () => {
  const params = useParams();
  let route = `${params.category}/${params.page}`;
  if (params.tab) route = `${route}/${params.tab}`;
  const { category, page } = params;

  if (globalThis.__ssr_route) {
    route = globalThis.__ssr_route;
  }

  return {
    route,
    category,
    page,
  };
};

export const usePageData = (route) => {
  if (!routes[route]) {
    const developerError = new Error(`Unable to match route "${route}" to any navigation node`);
    const displayError = new Error('404');
    /* eslint-disable no-console */
    console.error({ route, routes: Object.keys(routes) });
    console.error(developerError);
    /* eslint-enable no-console */

    return { data: null, loading: false, error: displayError };
  }

  const { data, loading, error } = usePromise(routes[route].loadPage);

  return { loading, error, page: data?.default };
};
