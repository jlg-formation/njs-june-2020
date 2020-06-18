class Person {
  constructor(name, age) {
    console.log("I am the constructor");
    console.log("Creating a new person.");
    this.name = name;
    this.age = age;
  }

  introduceHimself() {
    console.log(
      "Hello, my name is " + this.name + " and I am " + this.age + " years old."
    );
  }

  increaseAge() {
    this.age++;
    console.log(
      this.name + ": Hey, it is my birthday. I am " + this.age + " years old."
    );
  }
}

const alice = new Person("Alice", 23);
const bob = new Person("Robert", 34);
alice.introduceHimself();
bob.introduceHimself();
alice.increaseAge();
alice.increaseAge();
alice.increaseAge();
alice.increaseAge();
bob.increaseAge();
