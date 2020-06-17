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

appendFile(file, "hello\n")
  .then(() => {
    console.log("tache T2");
    return appendFile(file, "hello\n");
  })
  .then(() => {
    console.log("tache T3");
    return appendFile(file, "hello\n");
  })
  .then(() => {
    console.log("tache T4");
    return appendFile(file, "hello\n");
  })
  .then(() => {
    console.log("tache T5");
  })
  .catch((err) => console.log("err: ", err));
