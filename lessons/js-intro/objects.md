---
title: Objects
order: 9
---

# Overview

Objects in JavaScript, just as in other languages like `C#`, can be compared to
objects in real life. The concept of objects in JavaScript can be understood
with real life, tangible objects.

In JavaScript, an object is a standalone entity, with properties and type.
Compare it with a cup, for example. A cup is an object, with properties. A cup
has a color, a design, weight, a material it is made of, etc. The same way,
JavaScript objects can have properties, which define their characteristics.

# Properties

A JavaScript object has properties associated with it. A property of an object
can be explained as a variable that is attached to the object. Object properties
are basically the same as ordinary JavaScript variables, except for the
attachment to objects. The properties of an object define the characteristics of
the object. You access the properties of an object with a simple dot-notation:

```javascript
objectName.propertyName
```

Like all JavaScript variables, both the object name (which could be a normal
variable) and property name are case sensitive. You can define a property by
assigning it a value. For example, let's create an object named myCar and give
it properties named make, model, and year as follows:

```javascript
let myCar = new Object()
myCar.make = 'Ford'
myCar.model = 'Mustang'
myCar.year = 1969
```

The above example could also be written using an object initializer, which is a
comma-delimited list of zero or more pairs of property names and associated
values of an object, enclosed in curly braces ({}):

```javascript
let myCar = {
  make: 'Ford',
  model: 'Mustang',
  year: 1969,
}
```

> Unassigned properties of an object are `undefined` (and not `null`).

```javascript
myCar.color // undefined
```

# Accessing properties using bracket notation (and by string)

Properties of JavaScript objects can also be accessed or set using a bracket
notation. So, for example, you could access the properties of the `myCar` object
as follows:

```javascript
myCar['make'] = 'Ford'
myCar['model'] = 'Mustang'
myCar['year'] = 1969
```

An object property name can be any valid JavaScript string, or anything that can
be converted to a string, including the empty string.

**However, any property name that is not a valid JavaScript identifier (for
example, a property name that has a space or a hyphen, or that starts with a
number) can only be accessed using the square bracket notation.**

This notation is also very useful when property names are to be dynamically
determined (when the property name is not determined until runtime). Examples
are as follows:


```javascript
let anObject = new Object()
let someString = 'stringProperty'
let randomNumber = Math.random()
let anotherObject = new Object()

anObject.type = 'Dot syntax'
anObject['date created'] = 'String with space'
anObject[someString] = 'String value'
anObject[randomNumber] = 'Random Number'
anObject[anotherObject] = 'Object'
anObject[''] = 'Even an empty string'

console.log(anObject)

// Output looks like:
// {
//   type: 'Dot syntax',
//   'date created': 'String with space',
//   stringProperty: 'String value',
//   '0.6854535624185345': 'Random Number',
//   '[object Object]': 'Object',
//   '': 'Even an empty string'
// }
```

You can also access properties by using a string value that is stored in a
variable:

```javascript
let propertyName = 'make'
myCar[propertyName] = 'Ford'

propertyName = 'model'
myCar[propertyName] = 'Mustang'
```

# Using a variable to indicate a property name

Let's say we had, in a string variable, the name of a property we wish to set on
an object. However, instead of the case above where we set the value of an
existing object, (e.g. `myCar[propertyName] = 'Mustang'`) we wanted to create a
new object and use the variable to indicate what property to set.

We could do something like this:

```javascript
let propertyName = 'model'

let myOtherCar = {
  [propertyName] = 'Mustang'
}
```

In this case, `myOtherCar` would be `{ model: 'Mustang'}`.

While this doesn't seem particularly powerful, when combined with the technique
below we get a fairly powerful pair of features we'll be using later.

# Making a new object from an existing one

Let's take our car example again:

```javascript
let myCar = {
  make: 'Ford',
  model: 'Mustang',
  year: 1969,
}
```

If we wanted to make another instance of this object, but with a different
`year`, we could do something like this:

```javascript
let myOtherCar = {
  make: myCar.make,
  model: myCar.model,
  year: 1971,
}
```

And now we would have a new object, independent of the first, with a different
year. However, you could imagine that if we had many properties it would be
cumbersome to repeat all the keys and values. Fortunately, recent JavaScript
allows for a shortcut to "expand" all the keys and values. This is known as the
`spread` operator and is noted as `...`

So let's write this again using the spread operator:

```javascript
let myOtherCar = {
  ...myCar,
  year: 1971,
}
```

Much better, we've saved one line of code, however, it now doesn't matter how
many property/value pairs `myCar` has since they are all now part of
`myOtherCar` since this is effectively what JavaScript is doing for us:

```javascript
let myOtherCar = {
  ...myCar,
  year: 1971,
}

// is the same as:

let myOtherCar = {
  make: myCar.make,
  model: myCar.model,
  year: myCar.year,

  year: 1971,
}
```

You'll notice that the `year` from `myCar` is added to the object. However our
code outside of the `...myCar` introduces a value for `year` again. Since this
comes **after** the spread operator, our value of `1971` overrides the one from
`year: myCar.year`

> NOTE: The order is important!

If we wrote the code like this:

```javascript
let myOtherCar = {
  year: 1971,

  ...myCar,
}

// is the same as:

let myOtherCar = {
  year: 1971,

  make: myCar.make,
  model: myCar.model,
  year: myCar.year,
}
```

In this case, our property/value pair of `year: 1971` would be lost since the
`...` spread would reintroduce the value from `myCar`

# Spread operator and bracket operator together.

Let's define a function called `copyCar` which will make a copy of an object and
allow us to change a specific property to a supplied value.

The function will look like this:

```javascript
function copyCar(existingCar, propertyName, propertyValue) {
  // Code here
}
```

We'd like to be able to call it like this:

```javascript
let myCar = {
  make: 'Ford',
  model: 'Mustang',
  year: 1969,
}

let myNewerCar = copyCar(myCar, 'year', 2014)
let myOtherCar = copyCar(myCar, 'model', 'Bronco')
```

In order to have this code work let's implement `copyCar`. We'll start by using
the `...` operator to make our new car.

```javascript
function copyCar(existingCar, propertyName, propertyValue) {
  let newCarObject = {
    ...existingCar,
  }

  return newCarObject
}
```

However, that is not enough, we need to set the property given by `propertyName`
to the value given by `propertyValue`. We could do this:

```javascript
function copyCar(existingCar, propertyName, propertyValue) {
  let newCarObject = {
    ...existingCar,
  }

  newCarObject[propertyName] = propertyValue

  return newCarObject
}
```

However, using the same `[]` bracket syntax we can specify the value directly
when we create the object:

```javascript
function copyCar(existingCar, propertyName, propertyValue) {
  let newCarObject = {
    ...existingCar,
    [propertyName]: propertyValue,
  }

  return newCarObject
}
```

And now we do not need the extra line of code in our method. The `[]:` style
syntax allows us to put a variable name inside the `[]` to indicate what
property we want to change and then specify the value on the right hand side. We
could have called our variable anything, but `propertyName` was a nice name, we
could have called this: `name`, `thingToChange`, `tacoTuesday` or anything else.
Since JavaScript is taking the **value** of that variable to determine which
property to change. We are supplying this when we call the method (e.g. `make`,
`year`, etc.)

To refactor this code a little more, we can remove the need to create the
temporary variable just to return it one line later:

```javascript
function copyCar(existingCar, propertyName, propertyValue) {
  return {
    ...existingCar,
    [propertyName]: propertyValue,
  }
}
```

# Resources

For more details on objects, see
[this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
or this [quick reference guide](/lessons/misc-quick-reference/js-objects)
