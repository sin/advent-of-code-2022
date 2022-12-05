import range from "https://esm.sh/js-range@1.0.0";

const data = (await Deno.readTextFile("./data/05.txt")).split("\n");
const heaps = Array.from(Array(9), () => [] as string[]);

for (const line of range(7, -1, -1)) {
  for (const char of range(0, 9)) {
    const crate = data[line][char * 4 + 1];
    if (/[A-Z]/.test(crate)) heaps[char].push(crate);
  }
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
