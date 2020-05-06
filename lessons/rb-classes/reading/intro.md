---
title: Intro to Ruby Classes
---

So far we have seen how Ruby tracks information (also called "data") via
variables. We have also seen how Ruby can implement behaviors in methods.

For instance we can keep information about a person such as their name (a
`String`) and their test score (an `Integer`) in variables.

```ruby
name = "Gavin"
test_score = 42
```

We've also seen how we can have a method that returns a description that
combines the name and the score:

```ruby
def description(person_name, person_test_score)
  return "The person named #{person_name} scored #{person_test_score}"
end

name = "Gavin"
test_score = 42

puts description(name, test_score)
```

However, both of these pieces of information _and_ the behavior relate to each
other. Right now there is nothing that helps _combine_ this into a _single_
representation. In order to associate the variables and the behavior into a
single concept (maybe named a `Person`) we need to introduce the idea of a
`class`

## Classes

- Classes combine data (values) and behavior (methods) into one concept
- `Class`es are the template that describes what data, and what behavior we have
- `Object`s are _instances_ of a class.
- `Class`es are like cookie cutters, where `object`s are like the cookies
- Instances of objects
  - We have already created many objects, just using the _literal_ form of
    creating them.
  - e.g. `name = "Gavin"`
  - e.g. `score = 42`
  - e.g. instance of a string: `name = String.new("Gavin")`
- But we can make our own classes. Lets make one to keep track of information
  about my dog.

  ```ruby
  class Dog
  end

  riley = Dog.new
  ```

- and we can define methods

  ```ruby
  class Dog
    def age
      return 1
    end
  end
  ```

  And then call them:

  ```ruby
  riley = Dog.new

  p riley.age
  # => 1
  ```

- But what if there are two dogs with different ages?
- Same behavior, different data.
- Must provide the data to the object
- We can give information to a new instance of an object via the `initialize`
  method.
- _NOTE_: This is similar to the `constructor` from JavaScript

```ruby
class Dog
  def initialize(age)
    @age = age
  end

  def age
    return @age
  end
end
```

- New type of variable, the _instance_ variable, noted by the fact that it
  starts with an `@`
- Every _instance_ of a `Dog` has it's _own_ instance variables.
- Now that we have an initialize method we _must_ supply the age when creating
  each _instance_ of a Dog.

```ruby
riley = Dog.new(1)
roscoe = Dog.new(7)
```

- We also added a _behavior_ (method) to ask for the age of a `Dog`
- `age` simply returns _this_ `Dog` instances `@age` _instance_ variable.
- Thus the same behavior (knowing a `Dog`'s age) but different data (the actual
  age of the dog) results in different action.
- `attr_accessor` allows us to shortcut the defining of methods to return the
  value of the data (attribute) as well as _set_ the value.

```ruby
class Dog
  attr_accessor :age, :sound, :color

  def initialize(age, sound, color)
    @age   = age
    @sound = sound
    @color = color
  end
end

riley = Dog.new(1, "woof", "piebald")
puts "Riley is #{riley.age} years old, sounds like #{riley.sound} and is #{riley.color} in color"
# Riley is 1 years old, sounds like woof and is piebald in color"

# Riley gets a little older
riley.age = 2
puts "Riley is now #{riley.age} years old, sounds like #{riley.sound} and is #{riley.color} in color"
# Riley is 2 years old, sounds like woof and is piebald in color"
```

## Inheritance

- Classes can have a `parent` class from which they gain all the data and
  behavior from but can extend with new data and behavior.

```ruby
class GoodDog < Dog
  def toys
    ["bone", "tennis ball", "blanket"]
  end
end

goodie = GoodDog.new(4, "woof", "brown")
p goodie.toys
# ["bone", "tennis ball", "blanket"]

regular_dog = Dog.new(8, "aroooo", "black")
p regular_dog.toys
# NoMethodError (undefined method `toys' for #<Dog:0x00007fcede920090 @age=8, @sound="aroooo", @color="black">)
```

- Inheritance can be thought of as "is a" or "is a kind of"
