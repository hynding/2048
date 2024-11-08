# 2048

A library of simple, dependency-free 2048 games coded in various programming languages (currently just JavaScript and C). 

## Requirements (per language)
* C - Unix-like OS with a `make` utility installed
* JavaScript - ES2020 supported web browser

## Running the games

The games for each language is purposefully placed in their own directory within `languages` so be sure to navigate to the desired source code accordingly before getting started.

### C 

Run `make cli-2048 && ./cli-2048` on the command line

### JavaScript

In VSCode, I recommend using the "Live Preview" extension developed by Microsoft and starting it with the `index.html` file selected.

Alternatively, you could use any web server software pointing to the `javascript` directory. One simple option for users with Node.js and NPM installed on the system is to install the package `http-server` globally (`npm install -g http-server`) then run `http-server . -o`. This will open your default web browser and load the `index.html` file automatically.