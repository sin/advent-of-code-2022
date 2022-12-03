library(tidyverse)

moves <- c(
  "A" = 1, "B" = 2, "C" = 3,
  "X" = 1, "Y" = 2, "Z" = 3
)

res <- c(0, 3, 6)
wins <- c(2, 3, 1)
loses <- c(3, 1, 2)

df <- read_delim("data/02.txt", col_names = FALSE, col_types = c("c", "c")) |>
  mutate(X1 = moves[X1], X2 = moves[X2])

r1 <- df |>
  mutate(res = case_when(X2 == wins[X1] ~ 6, X1 == X2 ~ 3, TRUE ~ 0) + X2)

r2 <- df |>
  mutate(res = case_when(X2 == 3 ~ wins[X1], X2 == 1 ~ loses[X1], TRUE ~ X1) + res[X2])

sum(r1$res)
sum(r2$res)
