export default {
  Default: [
    {
      time: new Date(2025, 0, 1),
      stack1: 2,
      stack2: 3,
      stack3: 3,
    },
    {
      time: new Date(2025, 0, 6),
      stack1: 5,
      stack2: 1,
      stack3: 2,
    },
    {
      time: new Date(2025, 0, 11),
      stack1: 3,
      stack2: 2,
      stack3: 4,
    },
    {
      time: new Date(2025, 0, 16),
      stack1: 3,
      stack2: 3,
      stack3: 4,
    },
    {
      time: new Date(2025, 0, 21),
      stack1: 3,
      stack2: 2,
      stack3: 2,
    },
  ],
  EdgeCase: [
    { time: 0, stack1: 1, stack2: 4, stack3: 3 },
    { time: 1, stack1: 2, stack2: 3, stack3: 4 },
    { time: 2, stack1: 1, stack2: 4, stack3: 5 },
    { time: 3, stack1: null, stack2: null, stack3: null },
    { time: 4, stack1: null, stack2: null, stack3: null },
    { time: 5, stack1: 3, stack2: 4, stack3: 3 },
    { time: 6, stack1: null, stack2: null, stack3: null },
    { time: 7, stack1: 2, stack2: 5, stack3: 3 },
    { time: 8, stack1: 2, stack2: 6, stack3: 5 },
    { time: 9, stack1: 5, stack2: 5, stack3: 3 },
  ],
};
