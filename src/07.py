input = open('./data/07.txt', 'r').read().splitlines()

sizes = []
stack = []

for line in input:
  match line.split():
    case ["$", "ls"]:
      stack.append(0)
    case ["$", "cd", ".."]:
      sizes.append(stack.pop())
    case [size, name] if size.isnumeric():
      stack = list(map(lambda sum: sum + int(size), stack))

sizes = stack + sizes

sum(filter(lambda size: size <= 100_000, sizes))
min(filter(lambda size: size >= max(sizes) - 40_000_000, sizes))
