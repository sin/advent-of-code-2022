library(tidyverse)

read_lines("data/01.txt") %>%
  tibble(calories = ., elf = cumsum(calories == "")) |>
  count(elf, wt = as.numeric(calories)) |>
  top_n(3) |>
  summarize(top1 = max(n), top3 = sum(n))
