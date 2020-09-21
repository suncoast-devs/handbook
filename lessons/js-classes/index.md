---
title: JavaScript classes
---

# JavaScript as an Object Prototype language

Before 2015, JavaScript was an object-based language that did not have the
concept of `classes`. What JavaScript did have was the idea of a `prototype`. An
object's `prototype` was the collection of methods that the object could do.

You could define a prototype like this:

```javascript
function Dog() {
  return
   {
    bark: function() { console.log('bark') },
    eat: function() { console.log('mmmmmm') }
  }
}
```

This is a function named `Dog` that returns a new object which contains keys of
the names of the methods we can execute and values that are the function
definitions themselves.

We could create new instances of `Dog` as such:

```javascript
const riley = new Dog()
const roxy = new Dog()
const rover = new Dog()
```

And we could call methods on these objects like:

```javascript
riley.bark()
roxy.eat()
rover.bark()
```

However, defining instance data on these objects wasn't always easy and the
format for defining object prototypes was very unfamiliar to developers coming
from class-based object-oriented languages like `Java`, `C#`, `Ruby`, and
others.

# Enter `class`

In 2015, the `class` syntax was added to JavaScript and we could now use a more
familiar syntax for defining new objects. Realistically the implementation is
the same, this new syntax is a form of
[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar). That is, a new
syntax that exists only to make an existing feature easier to use.

Let's redefine our `Dog`

```javascript
class Dog {
  bark() {
    console.log('bark')
  }

  eat() {
    console.log('mmmm')
  }
}
```

Ahhhhh, much better. A new object created from this via
`const buster = new Dog()` will act the same way as our previous prototypes
would.

# Public field declarations

Programmers of languages such as `C#` might recognize these as property
definitions.

Within a class declaration, we can identify new properties of objects created
from this class. For instance, we can give these dogs a name property by:

```javascript
class Dog {
  name = 'Not Named'

  bark() {
    console.log(`${this.name} says bark!`)
  }

  eat() {
    console.log('mmmm')
  }
}
```

Notice we can use `this` within a method to refer to the current object and
access it's `name` property.

The `name` property is available outside of the class as well:

```javascript
const newDog = new Dog()
newDog.bark() // Not Named says bark!
newDog.name // Not Named
newDog.name = 'Fluffy'
newDog.bark() // Fluffy says bark!
newDog.name // Fluffy
```

# Constructors

We can even apply default values in the `constructor`. The `constructor` is the
method called when we say `new Dog()` -- we get a `default constructor` for
free. That is we haven't had to declare one yet!

```javascript
class Dog {
  name = 'Not Named'

  constructor(newName) {
    this.name = newName
  }

  bark() {
    console.log(`${this.name} says bark!`)
  }

  eat() {
    console.log('mmmm')
  }
}
```

Now when we create a new dog we must give it a proper name.

```javascript
const myPal = new Dog('Fluffy')

myPal.bark() // Fluffy says bark!
myPal.name // Fluffy
```

# Subclasses

Let's say we have specific kinds of dogs that bark very loudly. We could define
a **subclass** of `Dog` that has a unique `bark` method.

```javascript
class LoudDog extends Dog {
  bark() {
    console.log(`${this.name.toUpperCase(0)} SAYS BARK!!!!!`)
  }

  yell() {
    console.log('I am a loud dog, so I yell!')
  }
}
```

Now when creating this kind of `Dog` all the functions and properties of `Dog`
are available as well as this changed `bark` method and a **new** `yell` method.

```javascript
const jack = new LoudDog('Jack')
jack.bark()
```

## Constructors in subclasses and super

In a subclass, we may also implement a constructor. If so we may want to call
the _parent_ class constructor as well. We can do that via the `super` method.

```javascript
class LoudDog extends Dog {
  constructor(name) {
    super(name.toUpperCase())
  }

  bark() {
    console.log(`${this.name.toUpperCase(0)} SAYS BARK!!!!!`)
  }

  yell() {
    console.log('I am a loud dog, so I yell!')
  }
}
```

Now if we create a new `LoudDog` the `name` property will be all uppercase since
we are passing, to `Dog`, an uppercase dog name.

```javascript
const barkeyMcBarkson = new LoudDog('Barkey McBarkson')
barkeyMcBarkson.name // 'BARKEY MCBARKSON'
```

# Arrow function methods

There is another way to define methods for a class, to use the public field
definition syntax.

Let's add a `greet` method of that style.

```javascript
class Dog {
  name = 'Not Named'

  constructor(newName) {
    this.name = newName
  }

  greet = () => {
    console.log(`Hello I am ${this.name}`)
  }

  bark() {
    console.log(`${this.name} says bark!`)
  }

  eat() {
    console.log('mmmm')
  }
}
```

This `greet` method works exactly like the other methods of the class, except
for one small difference we don't yet see. That is, the value of `this` is
handled slightly differently. In the case of the arrow function, the `this`
value is **always** the instance of the object itself. However, for our normally
defined methods like `bark` and `eat` it isn't the case. The subtle difference
here won't make a big impact on us until we get to dealing with things like
event callback functions in [React](/lessons/react-intro) so we'll hold off any
further discussion of the concept of `this`.

If you are very curious about the subject of `this`, an often discussed and
confusing feature of the language, you can read
[this excellent MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
on the matter.
