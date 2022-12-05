import range from "https://esm.sh/js-range@1.0.0";

const data = (await Deno.readTextFile("./data/05.txt")).split("\n");
const heaps: string[][] = [];

for (const position of range(1, data[0].length, 4)) {
  const stack: string[] = [];

  for (const line of range(7, -1, -1)) {
    const crate = data[line][position];
    if (/[A-Z]/.test(crate)) stack.push(crate);
  }

  heaps.push(stack);
}

function rearrange(reverse = true) {
  const stacks = heaps.map((stack) => [...stack]);

  for (const move of range(10, data.length - 1)) {
    const [n, from, to] = data[move].match(/\d+/g)!.map(Number);

    const crates = stacks[from - 1].splice(stacks[from - 1].length - n, n);
    stacks[to - 1].push(...(reverse ? crates.reverse() : crates));
  }

  return stacks.map((stack) => stack.at(-1)).join("");
}

console.log(rearrange());
console.log(rearrange(false));
