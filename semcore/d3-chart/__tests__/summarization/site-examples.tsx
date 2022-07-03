// const LikeM: React.FC = () => <div>LikeM</div>;
// const date = new Date('05-16-2022');
// export const dataExamples = [
//   [...Array(10).keys()].map((d, i) => ({
//     x: i,
//     y: Math.abs(Math.sin(Math.exp(i))) * i,
//   })),

//   [
//     { x: 1, y: 'test' },
//     { x: 2, y: 'describe' },
//   ],

//   [
//     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
//     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
//     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
//     { time: 3, stack1: 3, stack2: 2, stack3: 6 },
//     { time: 4, stack1: 2, stack2: 4, stack3: 4 },
//     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
//     { time: 6, stack1: 4, stack2: 1, stack3: 5 },
//     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
//     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
//     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
//   ],

//   [
//     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
//     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
//     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
//     { time: 3, stack1: null, stack2: null, stack3: null },
//     { time: 4, stack1: null, stack2: null, stack3: null },
//     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
//     { time: 6, stack1: null, stack2: null, stack3: null },
//     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
//     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
//     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
//   ],

//   [
//     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
//     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
//     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
//     { time: 3, stack1: 3, stack2: 2, stack3: 6 },
//     { time: 4, stack1: 2, stack2: 4, stack3: 4 },
//     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
//     { time: 6, stack1: 4, stack2: 1, stack3: 5 },
//     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
//     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
//     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
//   ],

//   Array(10)
//     .fill({})
//     .map((d, i) => ({
//       x: (i / 10) * 10,
//       y: ((10 - i) / 10) * 10,
//       value: i,
//     })),

//   [
//     { x: 0, y: 1 },
//     { x: 1, y: 4 },
//     { x: 2, y: null },
//     { x: 3, y: null },
//     { x: 4, y: 1 },
//     { x: 5, y: null },
//   ],

//   Array(10)
//     .fill({})
//     .map((d, i) => {
//       return {
//         time: new Date(date.setDate(date.getDate() + 5)),
//         line: Math.abs(Math.sin(Math.exp(i))) * 10,
//       };
//     }),

//   Array(5)
//     .fill({})
//     .map((d, i) => ({
//       category: `Category ${i}`,
//       bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
//       bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   Array(5)
//     .fill({})
//     .map((d, i) => ({
//       category: `Category ${i}`,
//       bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
//       bar2: -Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   Array(10)
//     .fill({})
//     .map((d, i) => ({
//       category: i,
//       bar: Math.abs(Math.sin(Math.exp(i))) * i,
//     })),

//   Array(5)
//     .fill({})
//     .map((d, i) => ({
//       category: `Category ${i}`,
//       bar: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   [...Array(5).keys()].map((d, i) => ({
//     category: `Category ${i}`,
//     bar: Math.abs(Math.sin(Math.exp(i))) * 10,
//   })),

//   [...Array(5).keys()].map((d, i) => ({
//     category: `Category ${i}`,
//     bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
//     bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
//   })),

//   [...Array(5).keys()].map((d, i) => ({
//     category: `Category ${i}`,
//     bar: Math.abs(Math.sin(Math.exp(i))) * 10,
//   })),

//   [...Array(5).keys()].map((d, i) => ({
//     category: `Category ${i}`,
//     bar: i + 10 * Math.abs(Math.sin(Math.exp(i))),
//   })),

//   Array(10)
//     .fill({})
//     .map((d, i) => ({
//       x: Math.abs(Math.sin(Math.exp(i))) * 10,
//       y: Math.abs(Math.sin(Math.exp(i))) * 10,
//       value: Math.abs(Math.sin(Math.exp(i))) * 1000,
//     })),

//   [
//     { x: 2, y: 3, value: 5040, label: 'label 1', color: '#2BB3FF' },
//     { x: 1, y: 9, value: 40, label: 'label 2', color: '#59DDAA' },
//     { x: 6, y: 2, value: 45634, label: 'label 3', color: '#FF4953' },
//     { x: 4, y: 7, value: 245, label: 'label 4', color: '#AB6CFE' },
//     { x: 9, y: 5, value: 7462, label: 'label 5', color: '#66C030' },
//   ],

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y: (Math.abs(Math.sin(Math.exp(i))) > 0.5 ? 1 : -1) * Math.abs(Math.sin(Math.exp(i))),
//     })),

//   Array(5)
//     .fill({})
//     .map((d, i) => ({
//       category: `Category ${i}`,
//       bar: Math.abs(Math.sin(Math.exp(i))) * 1000000,
//     })),

//   Array(21)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   [...Array(10).keys()].map((d, i) => ({
//     x: i,
//     y: Math.abs(Math.sin(Math.exp(i))) * i,
//     y2: Math.abs(Math.sin(Math.exp(i))) * (i + 2),
//   })),

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   {
//     a: 0,
//     b: 0,
//     c: 0,
//   },

//   {
//     a: 3,
//     b: 1,
//     c: 2,
//   },

//   {
//     speed: 3,
//     other: 200,
//   },

//   {
//     a: 3,
//     b: 1,
//     c: 2,
//   },

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   Array(12)
//     .fill({})
//     .map((_, i) => ({
//       label: `Sheep ${i + 1}`,
//       icon: LikeM,
//     })),

//   Array(12)
//     .fill({})
//     .map((_, index) => ({
//       label: [
//         'consectetur\nadipiscing',
//         'elit, sed do\neiusmod tempor',
//         'incididunt ut\nlabore et\ndolore',
//         'magna aliqua',
//         'Ut enim',
//         'ad minim veniam',
//         'quis nostrud\nexercitation',
//         'ullamco\nlaboris\nnisi',
//         'ut aliquip ex',
//         'ea commodo',
//         'consequat',
//         'Duis aute',
//         'irure dolor\nin',
//         'reprehenderit',
//       ][index],
//       icon: LikeM,
//     })),

//   Array(12)
//     .fill({})
//     .map((_, i) => ({
//       label: `Sheep ${i + 1}`,
//       icon: LikeM,
//     })),

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y1: Math.abs(Math.sin(Math.exp(i))) * 10,
//       y2: Math.abs(Math.sin(Math.exp(i))) * 10,
//       value: i,
//     })),

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y1: Math.abs(Math.sin(Math.exp(i))) * 10,
//       y2: Math.abs(Math.sin(Math.exp(i))) * 10,
//     })),

//   Array(20)
//     .fill({})
//     .map((d, i) => ({
//       x: i,
//       y: Math.abs(Math.sin(Math.exp(i))) * 10,
//       value: i,
//     })),

//   [
//     { time: 0, stack1: 1, stack2: 4, stack3: 3 },
//     { time: 1, stack1: 2, stack2: 3, stack3: 4 },
//     { time: 2, stack1: 1, stack2: 4, stack3: 5 },
//     { time: 3, stack1: null, stack2: null, stack3: null },
//     { time: 4, stack1: null, stack2: null, stack3: null },
//     { time: 5, stack1: 3, stack2: 4, stack3: 3 },
//     { time: 6, stack1: null, stack2: null, stack3: null },
//     { time: 7, stack1: 2, stack2: 5, stack3: 3 },
//     { time: 8, stack1: 2, stack2: 6, stack3: 5 },
//     { time: 9, stack1: 5, stack2: 5, stack3: 3 },
//   ],

//   [...Array(5).keys()].map((d, i) => ({
//     category: `Category ${i}`,
//     stack1: Math.abs(Math.sin(Math.exp(i))) * 10,
//     stack2: Math.abs(Math.sin(Math.exp(i))) * 10,
//   })),

//   [...Array(5).keys()].map((d, i) => ({
//     category: `Category ${i}`,
//     bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
//     bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
//   })),

//   {
//     G: 200,
//     F: 200,
//     C: 200,
//     'G/F': 100,
//     'G/C': 100,
//     'F/C': 100,
//     'G/F/C': 100,
//   },

//   {
//     F: 5,
//     S: 7,
//     'F/S': 3,
//   },

//   {
//     G: 200,
//     F: 200,
//     C: 500,
//     U: 1,
//     'G/F': 100,
//     'G/C': 100,
//     'F/C': 100,
//     'G/F/C': 100,
//   },
// ];

// console.log(dataExamples.map((data) => extractDataInsights(data, makeHints(), makeConfig())));
