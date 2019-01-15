class Animal {
  constructor(age){
    this.age = age;
  }

  eat(){
    console.log("Nom nom nom");
  }

  sleep(){
    console.log("Zzzzz");
  }
}

class Cat extends Animal {
  constructor(age){
    super(age);
  }

  meow(){
    console.log("Meow!");
  }

  spit(){
    console.log("Hissssss");
  }

  purr(){
    console.log("Purrrrr");
  }
}

class Dog extends Animal {
  constructor(age){
    super(age);
  }

  eat() {
    super.eat();
    console.log("*Makes a huge mess*");
  }

  bark(){
    console.log("Bark!");
  }
}
