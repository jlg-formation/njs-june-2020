const a = [1, 23, 34];
console.log("a: ", a);

const b = a.map((n, i) => "$" + (i + 1));
console.log("b: ", b);

const c = b.join(",");
console.log("c: ", c);

const str = "asdfa'sdfa";
console.log("str: ", str);

const str2 = `1+2=${c}`;
console.log("str2: ", str2);
