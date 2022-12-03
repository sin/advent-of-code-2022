library(tidyverse)

data <- readLines("data/03.txt") %>%
  tibble(rucksack = .)

find_common_items <- function(data) {
  data |>
    mutate(items = strsplit(rucksack, "")) |>
    mutate(sacks = map(items, ~ split(., cut(seq_along(.), 2)))) |>
    transmute(common = map_chr(sacks, ~ Reduce(intersect, .)))
}

find_group_badges <- function(data) {
  data |>
    mutate(items = strsplit(rucksack, "")) |>
    group_by(group = gl(n(), 3, n())) |>
    summarize(common = Reduce(intersect, as.list(items)))
}

calculate_priority <- function(common_items) {
  common_items |>
    mutate(priority = match(common, c(letters, LETTERS))) |>
    summarize(sum(priority))
}

data |>
  find_common_items() |>
  calculate_priority()

data |>
  find_group_badges() |>
  calculate_priority()
