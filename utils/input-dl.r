#!/usr/bin/env Rscript

library(dotenv)
library(optparse)
library(glue)
library(stringr)

load_dot_env(file = ".env")

parser <- OptionParser()
parser <- add_option(
  parser, c("-d", "--day"),
  type = "integer", default = FALSE,
  help = "Download input for a given day in 2022"
)

options <- parse_args(parser)

year <- 2022
day <- options$day

if (!day) {
  print("The day was not provided. Use the -d, --day option.")
  quit()
}

cookie <- Sys.getenv("COOKIE")
session_cookie <- glue("session={cookie}")
url <- glue("https://adventofcode.com/{year}/day/{day}/input")

save_filename <- str_pad(day, 2, pad = "0")
save_path <- glue("./data/{save_filename}.txt")

if (!file.exists(save_path)) {
  download.file(
    url, save_path,
    headers = c("Cookie" = session_cookie)
  )
} else {
  print(glue("File {save_filename}.txt already exists."))
}
