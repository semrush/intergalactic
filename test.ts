const a = [1, 2, 3];
const b = [a, a, a];
a.push(b);

console.log(a.flat(Infinity));