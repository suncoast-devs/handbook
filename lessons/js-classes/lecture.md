Theme: Next, 1

# [fit] JavaScript Classes

---

# Relatively new (2015)

---

# How we used to write code

[.column]

```javascript
function Dog() {
  this.bark = function () {
    return 'bark'
  }
  this.eat = function () {
    return 'mmmmmm'
  }
}
```

[.column]

```javascript
const riley = new Dog()
const roxy = new Dog()
const rover = new Dog()

riley.bark()
roxy.eat()
rover.bark()
```

---

# JavaScript is an Object Prototypical language

- Works on `prototypes` (the attributes of an object)

---

# Along come classes

- Allows for a more common syntax
- Familiar to Object Oriented developers from other languages (C++, C#, Java, Python, Ruby, etc)

---

# Redefining Dogs

Let's redefine our `Dog`

```javascript
class Dog {
  bark() {
    return 'bark'
  }

  eat() {
    return 'mmmm'
  }
}
```

---

# Public field declarations

- Do we have `properties` as we do in C#?
- Yes, called `public field declarations`

```javascript
class Dog {
  name = 'Not Named'

  bark() {
    return `${this.name} says bark!`
  }

  eat() {
    return 'mmmm'
  }
}
```

---

# Usage

```javascript
const newDog = new Dog()
newDog.bark() // Not Named says bark!
newDog.name // Not Named
newDog.name = 'Fluffy'
newDog.bark() // Fluffy says bark!
newDog.name // Fluffy
```

---

# Notice the use of `this`

Inside a function of a class, `this` refers to the `current object` and must be used to distinguish a local variable `name` versus the field `this.name`

> NOTE: The idea of `this` in JavaScript can be perplexing and we'll return to it later.

---

# Constructors

Like `C#`, JavaScript classes also have constructors. We can allow the constructor to accept arguments and use them to fill in our public fields (and other data).

```javascript
class Dog {
  name = 'Not Named'

  constructor(newName) {
    this.name = newName
  }

  bark() {
    return `${this.name} says bark!`
  }

  eat() {
    return 'mmmm'
  }
}
```

---

# Now when we create a new dog we must give it a proper name.

```javascript
const myPal = new Dog('Fluffy')

myPal.bark() // Fluffy says bark!
myPal.name // Fluffy
```

---

# Subclasses

Again, like `C#` we have the idea of subclasses.

> NOTE: This idea is used _heavily_ in React as we will see.

```javascript
class LoudDog extends Dog {
  bark() {
    return `${this.name.toUpperCase()} SAYS BARK!!!!!`
  }

  yell() {
    return 'I am a loud dog, so I yell!'
  }
}
```

---

# Instantiating subclasses

```javascript
const jack = new LoudDog('Jack')
jack.bark()
```

---

# Constructors in subclasses and super

Subclasses can also have constructors. To ensure the _parent_ constructor is called, we use `super`

```javascript
class LoudDog extends Dog {
  constructor(name) {
    super(name.toUpperCase())
  }

  bark() {
    return `${this.name} SAYS BARK!!!!!`
  }

  yell() {
    return 'I am a loud dog, so I yell!'
  }
}
```

---

```javascript
const barkeyMcBarkson = new LoudDog('Barkey McBarkson')
barkeyMcBarkson.name // 'BARKEY MCBARKSON'
```

---

# Arrow function methods

There is another way to define methods for a class, to use the public field definition syntax.

```javascript
class Dog {
  name = 'Not Named'

  constructor(newName) {
    this.name = newName
  }

  greet = () => {
    return `Hello I am ${this.name}`
  }

  bark() {
    return `${this.name} says bark!`
  }

  eat() {
    return 'mmmm'
  }
}
```

---
