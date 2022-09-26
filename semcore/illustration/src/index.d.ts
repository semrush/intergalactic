export type TIllustrationNamesErrors =
  | 'access_denied'
  | 'blocked'
  | 'confirmation'
  | 'connection_lost'
  | 'deleted_account'
  | 'dns'
  | 'maintenance'
  | 'no_payment'
  | 'page_error'
  | 'page_not_found'
  | 'project_not_found'
  | 'timeout';

export type TIllustrationNamesWidgetEmpty =
  | 'area-chart'
  | 'choropleth-map-chart'
  | 'coffee'
  | 'combined-chart'
  | 'congrats'
  | 'deleted-page'
  | 'donut-chart'
  | 'duplicates'
  | 'funnel-chart'
  | 'good'
  | 'heat-map-chart'
  | 'horizontal-bar-chart'
  | 'kagi-chart'
  | 'line-chart'
  | 'lollipop-chart'
  | 'nexttime'
  | 'nothing-found'
  | 'other-data'
  | 'pie-chart'
  | 'processing'
  | 'radar-chart'
  | 'radial-tree-chart'
  | 'sankey-chart'
  | 'scatter-plot-chart'
  | 'stacked-area-chart'
  | 'suggestion'
  | 'suggestions'
  | 'table'
  | 'tag-cloud'
  | 'text-links-etc'
  | 'under-construction'
  | 'venn-chart'
  | 'vertical-bar-chart'
  | 'warning';

declare const getIllustrationPath: (
  name: TIllustrationNamesErrors | TIllustrationNamesWidgetEmpty,
) => string;

export { getIllustrationPath };
