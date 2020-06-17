"use strict";

// Tache T1s

const fs = require("fs");

const file = "toto.txt";

function appendFile(f, str) {
  return new Promise((resolve, reject) => {
    fs.appendFile(f, str, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

console.log("tache T1");

async function main() {
  try {
    await appendFile(file, "hello\n");
    console.log("tache T2");
    await appendFile(file, "hello\n");
    console.log("tache T3");
    await appendFile(file, "hello\n");
    console.log("tache T4");
    await appendFile(file, "hello\n");
    console.log("tache T5");
  } catch (err) {
    console.log("err: ", err);
  }
}

main();
