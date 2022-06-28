// // import React from 'react';
// import { test } from 'uvu';
// import * as assert from 'uvu/assert';
// import { extractDataInsights } from '../../src/a11y/insights';

// test('summarization/base/general-trends/static', () => {
//   const data = [
//     { x: 0, y: 1 },
//     { x: 1, y: 1 },
//     { x: 2, y: 1 },
//     { x: 3, y: 1 },
//     { x: 4, y: 1 },
//     { x: 5, y: 1 },
//     { x: 6, y: 1 },
//     { x: 7, y: 1 },
//     { x: 8, y: 1 },
//     { x: 9, y: 1 },
//     { x: 10, y: 1 },
//   ];
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'general-trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: 1,
//         to: 1,
//         strength: 'static',
//       },
//       from: '0',
//       to: '10',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/general-trends/weak-growth', () => {
//   const data = [
//     { x: 0, y: 1 },
//     { x: 1, y: 1.1 },
//     { x: 2, y: 1.2 },
//     { x: 3, y: 1.3 },
//     { x: 4, y: 1.4 },
//     { x: 5, y: 1.5 },
//     { x: 6, y: 1.6 },
//     { x: 7, y: 1.7 },
//     { x: 8, y: 1.8 },
//     { x: 9, y: 1.9 },
//     { x: 10, y: 2 },
//   ];
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'general-trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: (insights[0] as any).change.from,
//         to: (insights[0] as any).change.to,
//         strength: 'weak-growth',
//       },
//       from: '0',
//       to: '10',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/general-trends/growth', () => {
//   const data = [
//     { x: 0, y: 1 },
//     { x: 1, y: 2 },
//     { x: 2, y: 3 },
//     { x: 3, y: 4 },
//     { x: 4, y: 5 },
//     { x: 5, y: 6 },
//     { x: 6, y: 7 },
//     { x: 7, y: 8 },
//     { x: 8, y: 9 },
//     { x: 9, y: 10 },
//     { x: 10, y: 11 },
//   ];
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'general-trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: (insights[0] as any).change.from,
//         to: (insights[0] as any).change.to,
//         strength: 'strong-growth',
//       },
//       from: '0',
//       to: '10',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/general-trends/strong-growth', () => {
//   const data = [
//     { x: 0, y: 1 },
//     { x: 1, y: 3 },
//     { x: 2, y: 5 },
//     { x: 3, y: 7 },
//     { x: 4, y: 9 },
//     { x: 5, y: 11 },
//     { x: 6, y: 13 },
//     { x: 7, y: 15 },
//     { x: 8, y: 17 },
//     { x: 9, y: 19 },
//     { x: 10, y: 21 },
//   ];
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'general-trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: (insights[0] as any).change.from,
//         to: (insights[0] as any).change.to,
//         strength: 'strong-growth',
//       },
//       from: '0',
//       to: '10',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/general-trends/weak-reduction', () => {
//   const data = [
//     { x: 0, y: 2 },
//     { x: 1, y: 1.9 },
//     { x: 2, y: 1.8 },
//     { x: 3, y: 1.7 },
//     { x: 4, y: 1.6 },
//     { x: 5, y: 1.5 },
//     { x: 6, y: 1.4 },
//     { x: 7, y: 1.3 },
//     { x: 8, y: 1.2 },
//     { x: 9, y: 1.1 },
//     { x: 10, y: 1 },
//   ];
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'general-trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: (insights[0] as any).change.from,
//         to: (insights[0] as any).change.to,
//         strength: 'weak-reduction',
//       },
//       from: '0',
//       to: '10',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/trends/peak', () => {
//   const data = [
//     { x: 0, y: 0 },
//     { x: 1, y: 1 },
//     { x: 2, y: 2 },
//     { x: 3, y: 3 },
//     { x: 4, y: 4 },
//     { x: 5, y: 5 },
//     { x: 6, y: 4 },
//     { x: 7, y: 3 },
//     { x: 8, y: 2 },
//     { x: 9, y: 1 },
//     { x: 10, y: 0 },
//   ];
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: (insights[0] as any).change.from,
//         to: (insights[0] as any).change.to,
//         strength: 'strong-growth',
//       },
//       from: '0',
//       to: '5',
//       label: 'y',
//     },
//     {
//       type: 'trend',
//       priority: (insights[1] as any).priority,
//       change: {
//         from: (insights[1] as any).change.from,
//         to: (insights[1] as any).change.to,
//         strength: 'strong-reduction',
//       },
//       from: '5',
//       to: '10',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/trends/random-data', () => {
//   const data = [
//     { x: 0, y: 10 },
//     { x: 1, y: -10 },
//     { x: 2, y: 10 },
//     { x: 3, y: -10 },
//     { x: 4, y: 10 },
//     { x: 5, y: -10 },
//     { x: 6, y: 10 },
//     { x: 7, y: -10 },
//     { x: 8, y: 10 },
//     { x: 9, y: -10 },
//     { x: 10, y: 10 },
//   ];
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'general-trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: 0,
//         to: 0,
//         strength: 'static',
//       },
//       from: '0',
//       to: '10',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/trends/sin', () => {
//   const data = Array(501)
//     .fill(0)
//     .map((_, x) => ({ x, y: Math.sin(Math.exp(x)) }));
//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'general-trend',
//       priority: (insights[0] as any).priority,
//       change: {
//         from: (insights[0] as any).change.from,
//         to: (insights[0] as any).change.to,
//         strength: 'static',
//       },
//       from: '0',
//       to: '500',
//       label: 'y',
//     },
//   ]);
// });

// test('summarization/base/clusters/base', () => {
//   const space = `
//   AAA
//   AA      FFF
//             AA

//   BBBBB
//   CCAABB  DD
//   EEE
//   `;

//   const data = space
//     .split('\n')
//     .map((line, lineIndex) =>
//       line.split('').map((char, index) => {
//         if (char === ' ') return null;
//         const x = index;
//         const y = lineIndex;
//         const label = char;
//         return { x, y, label };
//       }),
//     )
//     .flat()
//     .filter((point) => point !== null);

//   const insights = extractDataInsights(data, {});
//   assert.equal(insights, [
//     {
//       type: 'cluster',
//       priority: 1,
//       size: 14,
//       labels: ['B', 'C', 'E', 'A'],
//       relativeSize: 'significantly-bigger',
//     },
//     {
//       type: 'cluster',
//       priority: 1,
//       size: 5,
//       labels: ['A'],
//       relativeSize: 'bigger',
//     },
//     {
//       type: 'cluster',
//       priority: 1,
//       size: 5,
//       labels: ['F', 'A'],
//       relativeSize: 'average',
//     },
//     {
//       type: 'cluster',
//       priority: 1,
//       size: 2,
//       labels: ['D'],
//       relativeSize: 'smaller',
//     },
//   ]);
// });

// /* test */

// // const LikeM: React.FC = () => <div>LikeM</div>;
// // const date = new Date('05-16-2022');
// // export const dataExamples = [
// //   [...Array(10).keys()].map((d, i) => ({
// //     x: i,
// //     y: Math.abs(Math.sin(Math.exp(i))) * i,
// //   })),

// //   [
// //     { x: 1, y: 'test' },
// //     { x: 2, y: 'describe' },
// //   ],

// //   [
// //     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
// //     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
// //     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
// //     { time: 3, stack1: 3, stack2: 2, stack3: 6 },
// //     { time: 4, stack1: 2, stack2: 4, stack3: 4 },
// //     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
// //     { time: 6, stack1: 4, stack2: 1, stack3: 5 },
// //     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
// //     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
// //     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
// //   ],

// //   [
// //     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
// //     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
// //     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
// //     { time: 3, stack1: null, stack2: null, stack3: null },
// //     { time: 4, stack1: null, stack2: null, stack3: null },
// //     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
// //     { time: 6, stack1: null, stack2: null, stack3: null },
// //     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
// //     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
// //     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
// //   ],

// //   [
// //     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
// //     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
// //     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
// //     { time: 3, stack1: 3, stack2: 2, stack3: 6 },
// //     { time: 4, stack1: 2, stack2: 4, stack3: 4 },
// //     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
// //     { time: 6, stack1: 4, stack2: 1, stack3: 5 },
// //     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
// //     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
// //     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
// //   ],

// //   Array(10)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: (i / 10) * 10,
// //       y: ((10 - i) / 10) * 10,
// //       value: i,
// //     })),

// //   [
// //     { x: 0, y: 1 },
// //     { x: 1, y: 4 },
// //     { x: 2, y: null },
// //     { x: 3, y: null },
// //     { x: 4, y: 1 },
// //     { x: 5, y: null },
// //   ],

// //   Array(10)
// //     .fill({})
// //     .map((d, i) => {
// //       return {
// //         time: new Date(date.setDate(date.getDate() + 5)),
// //         line: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       };
// //     }),

// //   Array(5)
// //     .fill({})
// //     .map((d, i) => ({
// //       category: `Category ${i}`,
// //       bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   Array(5)
// //     .fill({})
// //     .map((d, i) => ({
// //       category: `Category ${i}`,
// //       bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       bar2: -Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   Array(10)
// //     .fill({})
// //     .map((d, i) => ({
// //       category: i,
// //       bar: Math.abs(Math.sin(Math.exp(i))) * i,
// //     })),

// //   Array(5)
// //     .fill({})
// //     .map((d, i) => ({
// //       category: `Category ${i}`,
// //       bar: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   [...Array(5).keys()].map((d, i) => ({
// //     category: `Category ${i}`,
// //     bar: Math.abs(Math.sin(Math.exp(i))) * 10,
// //   })),

// //   [...Array(5).keys()].map((d, i) => ({
// //     category: `Category ${i}`,
// //     bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
// //   })),

// //   [...Array(5).keys()].map((d, i) => ({
// //     category: `Category ${i}`,
// //     bar: Math.abs(Math.sin(Math.exp(i))) * 10,
// //   })),

// //   [...Array(5).keys()].map((d, i) => ({
// //     category: `Category ${i}`,
// //     bar: i + 10 * Math.abs(Math.sin(Math.exp(i))),
// //   })),

// //   Array(10)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       y: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       value: Math.abs(Math.sin(Math.exp(i))) * 1000,
// //     })),

// //   [
// //     { x: 2, y: 3, value: 5040, label: 'label 1', color: '#2BB3FF' },
// //     { x: 1, y: 9, value: 40, label: 'label 2', color: '#59DDAA' },
// //     { x: 6, y: 2, value: 45634, label: 'label 3', color: '#FF4953' },
// //     { x: 4, y: 7, value: 245, label: 'label 4', color: '#AB6CFE' },
// //     { x: 9, y: 5, value: 7462, label: 'label 5', color: '#66C030' },
// //   ],

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y: (Math.abs(Math.sin(Math.exp(i))) > 0.5 ? 1 : -1) * Math.abs(Math.sin(Math.exp(i))),
// //     })),

// //   Array(5)
// //     .fill({})
// //     .map((d, i) => ({
// //       category: `Category ${i}`,
// //       bar: Math.abs(Math.sin(Math.exp(i))) * 1000000,
// //     })),

// //   Array(21)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   [...Array(10).keys()].map((d, i) => ({
// //     x: i,
// //     y: Math.abs(Math.sin(Math.exp(i))) * i,
// //     y2: Math.abs(Math.sin(Math.exp(i))) * (i + 2),
// //   })),

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   {
// //     a: 0,
// //     b: 0,
// //     c: 0,
// //   },

// //   {
// //     a: 3,
// //     b: 1,
// //     c: 2,
// //   },

// //   {
// //     speed: 3,
// //     other: 200,
// //   },

// //   {
// //     a: 3,
// //     b: 1,
// //     c: 2,
// //   },

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   Array(12)
// //     .fill({})
// //     .map((_, i) => ({
// //       label: `Sheep ${i + 1}`,
// //       icon: LikeM,
// //     })),

// //   Array(12)
// //     .fill({})
// //     .map((_, index) => ({
// //       label: [
// //         'consectetur\nadipiscing',
// //         'elit, sed do\neiusmod tempor',
// //         'incididunt ut\nlabore et\ndolore',
// //         'magna aliqua',
// //         'Ut enim',
// //         'ad minim veniam',
// //         'quis nostrud\nexercitation',
// //         'ullamco\nlaboris\nnisi',
// //         'ut aliquip ex',
// //         'ea commodo',
// //         'consequat',
// //         'Duis aute',
// //         'irure dolor\nin',
// //         'reprehenderit',
// //       ][index],
// //       icon: LikeM,
// //     })),

// //   Array(12)
// //     .fill({})
// //     .map((_, i) => ({
// //       label: `Sheep ${i + 1}`,
// //       icon: LikeM,
// //     })),

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y1: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       y2: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       value: i,
// //     })),

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y1: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       y2: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     })),

// //   Array(20)
// //     .fill({})
// //     .map((d, i) => ({
// //       x: i,
// //       y: Math.abs(Math.sin(Math.exp(i))) * 10,
// //       value: i,
// //     })),

// //   [
// //     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
// //     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
// //     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
// //     { time: 3, stack1: null, stack2: null, stack3: null },
// //     { time: 4, stack1: null, stack2: null, stack3: null },
// //     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
// //     { time: 6, stack1: null, stack2: null, stack3: null },
// //     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
// //     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
// //     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
// //   ],

// //   [...Array(5).keys()].map((d, i) => ({
// //     category: `Category ${i}`,
// //     stack1: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     stack2: Math.abs(Math.sin(Math.exp(i))) * 10,
// //   })),

// //   [...Array(5).keys()].map((d, i) => ({
// //     category: `Category ${i}`,
// //     bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
// //     bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
// //   })),

// //   {
// //     G: 200,
// //     F: 200,
// //     C: 200,
// //     'G/F': 100,
// //     'G/C': 100,
// //     'F/C': 100,
// //     'G/F/C': 100,
// //   },

// //   {
// //     F: 5,
// //     S: 7,
// //     'F/S': 3,
// //   },

// //   {
// //     G: 200,
// //     F: 200,
// //     C: 500,
// //     U: 1,
// //     'G/F': 100,
// //     'G/C': 100,
// //     'F/C': 100,
// //     'G/F/C': 100,
// //   },
// // ];

// // // describe('d3-chart extract insights', () => {
// // //   test('Should support render null', () => {
// // //     const { queryByText } = render(<Plot>Test</Plot>);
// // //     expect(queryByText(/Test/)).toBeNull();
// // //   });
// // // });
// test.run();
