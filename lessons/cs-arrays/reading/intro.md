---
title: Arrays and Lists
---

## Arrays

So far we have only been able to store a single value inside a variable. Take
our `var name = "Mark";` example. What if we were writing an application to keep
track of all the names of the students on a work or sports team? We could try
something like:

```csharp
var name1 = "Mark";
var name2 = "Paula";
var name3 = "Sandy";
var name4 = "Bill";
```

But we'd have to keep inventing variable names as our team grew, and we'd have
unused names if we removed someone from the team.

This is a great case for using a type called an `array`. An array allows us to
store more than one value and maintains the order of the items.

```csharp
string[] names = new string[] { "Mark", "Paula", "Sandy" , "Bill" };
```

In this case we **do** need to tell `C#` the type of the variable on the
left-hand side. So we use the syntax `string[]` to indicate this is an array of
elements. On the right-hand side we list the initial elements of the array and
place them inside `{ }` braces.

Now we can access the elements of the array much like we did the individual
characters of the string.

```csharp
var firstName = names[0];
var secondName = names[1];
```

We can also ask for the length of the array.

```csharp
var nameCount = names.Length;
```

Unfortunately `array`s come with some limitations:

- Once an array is created, it's size cannot change
- If we access an index that does not exist our program will crash. For example
  `names[42]` will cause our program to have an exception and stop.
- Arrays can only store data of the same type

Luckily there is a more flexible type that provides the features we'd want from
a list of data. Even more fortunate, it is conveniently named: `List`

## Lists

Lists are more flexible than arrays while maintaining some of their key
features.

To create a list of strings with some data:

```csharp
var names = new List<string>()  { "Mark", "Paula", "Sandy" , "Bill" };
```

You will notice some new syntax here. First is the `List<string>` and the `()`
that follows.

The `new` keyword indicates to `C#` that we are creating a new `object` of a
specific `class`. We cover objects and classes in another lesson, so for now
just remember that this is the syntax for creating a new `List`. The `()`
afterward are where we would put information about how to create the list and is
part of the required syntax.

Now that we have our list we can work with it.

The `List` is still accessed with the `[]` bracket syntax and is still zero
indexed:

```csharp
var firstName = names[0];
var secondName = names[0];
```

We can find out how many elements are in the list but we must use a new syntax:

```csharp
var numberOfNamesInList = names.Count();
```

Finally, since these `List`s are more flexible we can **add** elements to the
list.

```csharp
names.Add("George");
```

We can create `List`s of other types as well.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);
```

We will be using `List` quite a lot in our time with `C#`.
