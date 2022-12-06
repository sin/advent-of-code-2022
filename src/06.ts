const data = (await Deno.readTextFile("./data/06.txt")).split("");

const findUniqSequenceEndIndex = (n: number) =>
  data.findIndex((_, i) => new Set(data.slice(i, i + n)).size == n) + n;

console.log(findUniqSequenceEndIndex(4));
console.log(findUniqSequenceEndIndex(14));
