import { ListItem, Token } from 'marked-ast-markdown';
import { Changelog, ChangelogChange, ChangelogChangeLabel } from '../types';

export const serializeComponentChangelog = (changelogs: Changelog[]): Token[] => {
  const heading: Token[] = [
    { type: 'heading', text: ['Changelog'], level: 1, raw: 'Changelog' },
    {
      type: 'paragraph',
      text: [
        'CHANGELOG.md standards are inspired by ',
        {
          type: 'link',
          href: 'https://keepachangelog.com/en/1.0.0/',
          title: null,
          text: ['keepachangelog.com'],
        },
        '.',
      ],
    },
  ];
  const body: Token[] = changelogs
    .map((changelog): Token[] => {
      const versionHeading: Token = {
        type: 'heading',
        level: 2,
        text: [`[${changelog.version}] - ${changelog.date}`],
        tokens: [
          {
            type: 'text',
            text: [`[${changelog.version}] - ${changelog.date}`],
          },
        ],
      };
      const byLabel = changelog.changes.reduce(
        (acc, change) => ({
          ...acc,
          [change.label]: [...(acc[change.label] || []), change],
        }),
        {} as Partial<{ [changeLabel in ChangelogChangeLabel]: ChangelogChange[] }>,
      );
      const changes = Object.values(byLabel);

      const sorted = changes.sort(([a], [b]) => {
        if (a.label !== b.label) {
          if (a.label === 'BREAK') return -1;
          if (b.label === 'BREAK') return 1;
        }
        return 0;
      });

      const changesList = sorted
        .map((changes): Token[] => {
          const label = changes[0].label;

          return [
            {
              type: 'heading',
              level: 3,
              text: [label],
              tokens: [{ type: 'text', text: [label] }],
            },
            {
              type: 'list',
              ordered: false,
              body: changes.map(
                (change): ListItem => ({
                  type: 'listitem',
                  text: change.descriptionFormatted,
                }),
              ),
            },
          ];
        })
        .flat();

      return [versionHeading, ...changesList];
    })
    .flat();

  return [...heading, ...body];
};
