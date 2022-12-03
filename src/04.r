library(tidyverse)

data <- read_csv("data/04.txt",
  col_names = c("e1", "e2"),
  col_types = c("c", "c")
)

find_overlaps <- function(fn = all) {
  mutate(data,
    across(1:2, ~ strsplit(., "-")),
    across(1:2, ~ map(., ~ seq(from = .[1], to = .[2]))),
    overlaps = map2_lgl(e1, e2, ~ fn(.x %in% .y) | fn(.y %in% .x))
  ) |>
    summarize(overlaps = sum(overlaps))
}

find_overlaps(all)
find_overlaps(any)
