library(tidyverse)

moves <- c(
  "A" = 1, "B" = 2, "C" = 3,
  "X" = 1, "Y" = 2, "Z" = 3
)

wins <- c(2, 3, 1)
loses <- c(3, 1, 2)
scores <- c(0, 3, 6)

data <- read_delim("data/02.txt",
  col_names = c("opponent", "player"),
  col_types = c("c", "c")
) |> mutate(
  opponent = moves[opponent],
  strategy = moves[player]
)

data |>
  mutate(score = case_when(
    strategy == wins[opponent] ~ 6,
    strategy == loses[opponent] ~ 0,
    strategy == opponent ~ 3,
  ) + strategy) |>
  summarize(sum(score))

data |>
  mutate(score = case_when(
    strategy == 3 ~ wins[opponent],
    strategy == 1 ~ loses[opponent],
    strategy == 2 ~ opponent
  ) + scores[strategy]) |>
  summarize(sum(score))
