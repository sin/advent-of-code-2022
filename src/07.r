library(tidyverse)

input <- read_lines("data/07.txt")

sizes <- integer()
stack <- integer()

for (line in input) {
  if (grepl("^\\d", line)) stack <- stack + as.integer(str_extract(line, "\\d+"))
  if (line == "$ ls") stack <- append(stack, 0)
  if (line == "$ cd ..") {
    sizes <- append(sizes, tail(stack, 1))
    stack <- head(stack, -1)
  }
}

sizes <- append(sizes, stack)

sum(sizes[sizes < 100000])
min(sizes[sizes > max(sizes) - 40000000])
