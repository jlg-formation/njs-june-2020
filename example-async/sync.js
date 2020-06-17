"use strict";

const fs = require("fs");

const file = "toto.txt";

fs.appendFileSync(file, "hello\n");
fs.appendFileSync(file, "hello\n");
fs.appendFileSync(file, "hello\n");
fs.appendFileSync(file, "hello\n");
