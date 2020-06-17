"use strict";

// Tache T1s

const fs = require("fs");

const file = "toto.txt";

console.log("tache T1");
fs.appendFile(file, "hello\n", () => {
  // tache T2
  console.log("tache T2");
  fs.appendFile(file, "hello\n", () => {
    // tache T3
    console.log("tache T3");
    fs.appendFile(file, "hello\n", () => {
      // tache T4
      console.log("tache T4");
      fs.appendFile(file, "hello\n", () => {
        // tache T5
        console.log("tache T5");
      });
      console.log("tache T4 bis");
    });
    console.log("tache T3 bis");
  });
  console.log("tache T2 bis");
});

console.log("tache T1 bis");
