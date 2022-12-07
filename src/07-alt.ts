const input = await Deno.readTextFile("./data/07.txt");
const lines = input.split("\n").map((line: string) => line.split(" "));

const sizes: number[] = [];
let stack: number[] = [];

lines.forEach(([size, command, path]) => {
  if (command == "ls") stack.push(0);
  if (!isNaN(Number(size))) stack = stack.map((total) => total + Number(size));
  if (path == "..") sizes.push(stack.pop() as number);
  if (!size) sizes.push(...stack);
});

sizes.filter((size) => size < 100_000).reduce((sum, size) => sum + size);
Math.min(...sizes.filter((size) => size > Math.max(...sizes) - 40_000_000));
