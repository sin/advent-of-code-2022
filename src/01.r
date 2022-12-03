library(tidyverse)

snacks <- readLines("data/01.txt") %>%
  tibble(calories = .) %>%
  group_by(elf = cumsum(calories == "")) %>%
  filter(calories != "") %>%
  summarize(calories = sum(as.integer(calories)))

snacks %>%
  top_n(1, calories)

snacks %>%
  top_n(3, calories) %>%
  summarize(sum(calories))
